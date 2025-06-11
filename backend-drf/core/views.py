from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Case, CaseComment, Notification, ActivityLog
from .serializers import UserSerializer, CaseSerializer, CaseCommentSerializer, NotificationSerializer, ActivityLogSerializer, DashboardStatsSerializer, DashboardTrendSerializer, UserOverviewSerializer
from django.db.models import Count, Avg
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class RegisterView(APIView):
    """
    API endpoint for user registration.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'user': serializer.data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(ObtainAuthToken):
    """
    API endpoint for user authentication.
    """
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                         context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

class CaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing cases.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Case.objects.none()
        return Case.objects.filter(reporter=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(reporter=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CaseCommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing case comments.
    """
    queryset = CaseComment.objects.all()
    serializer_class = CaseCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return CaseComment.objects.none()
        return CaseComment.objects.filter(case_id=self.kwargs['case_pk'])

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            case_id=self.kwargs['case_pk'],
            user=request.user
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class NotificationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user notifications.
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Notification.objects.none()
        return Notification.objects.filter(user=self.request.user)

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Get stats
        active_users = User.objects.filter(is_active=True).count()
        total_reports = Case.objects.count()
        
        # Calculate trends (comparing last 7 days with previous 7 days)
        now = timezone.now()
        week_ago = now - timedelta(days=7)
        two_weeks_ago = now - timedelta(days=14)
        
        current_week_users = User.objects.filter(date_joined__gte=week_ago).count()
        previous_week_users = User.objects.filter(
            date_joined__gte=two_weeks_ago,
            date_joined__lt=week_ago
        ).count()
        
        current_week_reports = Case.objects.filter(created_at__gte=week_ago).count()
        previous_week_reports = Case.objects.filter(
            created_at__gte=two_weeks_ago,
            created_at__lt=week_ago
        ).count()
        
        # Calculate trends as percentages
        users_trend = ((current_week_users - previous_week_users) / previous_week_users * 100) if previous_week_users > 0 else 0
        reports_trend = ((current_week_reports - previous_week_reports) / previous_week_reports * 100) if previous_week_reports > 0 else 0
        
        # Calculate average response time
        avg_response = Case.objects.exclude(assigned_to=None).aggregate(
            avg_time=Avg('updated_at' - 'created_at')
        )['avg_time']
        
        avg_response_str = '< 5min' if avg_response and avg_response.total_seconds() < 300 else '> 5min'
        
        stats = {
            'active_users': active_users,
            'active_users_trend': int(users_trend),
            'total_reports': total_reports,
            'reports_trend': int(reports_trend),
            'platform_reach': '50+',  # This could be dynamic based on your needs
            'avg_response_time': avg_response_str,
            'response_time_trend': -15  # This could be calculated based on historical data
        }
        
        serializer = DashboardStatsSerializer(stats)
        return Response(serializer.data)

class DashboardTrendsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        now = timezone.now()
        week_ago = now - timedelta(days=7)
        
        # Get daily stats for the last 7 days
        trends = []
        for i in range(7):
            date = now.date() - timedelta(days=i)
            start = timezone.make_aware(timezone.datetime.combine(date, timezone.time.min))
            end = timezone.make_aware(timezone.datetime.combine(date, timezone.time.max))
            
            users = User.objects.filter(date_joined__range=(start, end)).count()
            reports = Case.objects.filter(created_at__range=(start, end)).count()
            
            trends.append({
                'date': date,
                'users': users,
                'reports': reports
            })
        
        serializer = DashboardTrendSerializer(trends, many=True)
        return Response(serializer.data)

class DashboardActivityView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        activities = ActivityLog.objects.all()[:10]  # Get last 10 activities
        serializer = ActivityLogSerializer(activities, many=True)
        return Response(serializer.data)

class DashboardUserOverviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserOverviewSerializer(users, many=True)
        return Response(serializer.data)
