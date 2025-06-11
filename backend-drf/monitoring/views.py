from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import (
    Alert, Report, ContentAnalysis, GeographicData,
    PlatformAnalytics, ChatMessage, UserSettings
)
from .serializers import (
    UserSerializer, AlertSerializer, ReportSerializer,
    ContentAnalysisSerializer, GeographicDataSerializer,
    PlatformAnalyticsSerializer, ChatMessageSerializer,
    UserSettingsSerializer
)

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    
    list:
    Return a list of all users.
    
    retrieve:
    Return the details of a specific user.
    
    create:
    Create a new user.
    
    update:
    Update all fields of a user.
    
    partial_update:
    Update one or more fields of a user.
    
    destroy:
    Delete a user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class AlertViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing alerts.
    
    list:
    Return a list of all alerts assigned to the current user.
    
    retrieve:
    Return the details of a specific alert.
    
    create:
    Create a new alert.
    
    update:
    Update all fields of an alert.
    
    partial_update:
    Update one or more fields of an alert.
    
    destroy:
    Delete an alert.
    """
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Alert.objects.filter(assigned_to=self.request.user)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        """
        Update the status of an alert.
        
        Parameters:
        - status: string (new, in_progress, resolved, closed)
        
        Returns:
        - 200: Alert status updated successfully
        - 400: Invalid status provided
        """
        alert = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(Alert.STATUS_CHOICES):
            alert.status = new_status
            alert.save()
            return Response({'status': 'success'})
        return Response({'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)

class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing reports.
    
    list:
    Return a list of all reports created by the current user.
    
    retrieve:
    Return the details of a specific report.
    
    create:
    Create a new report.
    
    update:
    Update all fields of a report.
    
    partial_update:
    Update one or more fields of a report.
    
    destroy:
    Delete a report.
    """
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Report.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ContentAnalysisViewSet(viewsets.ModelViewSet):
    """
    API endpoint for content analysis.
    
    list:
    Return a list of all content analyses.
    
    retrieve:
    Return the details of a specific content analysis.
    
    create:
    Create a new content analysis.
    
    update:
    Update all fields of a content analysis.
    
    partial_update:
    Update one or more fields of a content analysis.
    
    destroy:
    Delete a content analysis.
    """
    queryset = ContentAnalysis.objects.all()
    serializer_class = ContentAnalysisSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def analyze_content(self, request):
        """
        Analyze content and return results.
        
        Parameters:
        - content_url: string (URL of the content to analyze)
        - content_type: string (Type of content: text, image, video)
        
        Returns:
        - 200: Content analysis completed successfully
        - 400: Invalid content provided
        """
        # Implement content analysis logic here
        return Response({'status': 'success'})

class GeographicDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint for geographic data.
    
    list:
    Return a list of all geographic data points.
    
    retrieve:
    Return the details of a specific geographic data point.
    
    create:
    Create a new geographic data point.
    
    update:
    Update all fields of a geographic data point.
    
    partial_update:
    Update one or more fields of a geographic data point.
    
    destroy:
    Delete a geographic data point.
    """
    queryset = GeographicData.objects.all()
    serializer_class = GeographicDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def get_heatmap_data(self, request):
        """
        Get heatmap data for visualization.
        
        Returns:
        - 200: Heatmap data retrieved successfully
        """
        # Implement heatmap data aggregation logic here
        return Response({'status': 'success'})

class PlatformAnalyticsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for platform analytics.
    
    list:
    Return a list of all platform analytics.
    
    retrieve:
    Return the details of specific platform analytics.
    
    create:
    Create new platform analytics.
    
    update:
    Update all fields of platform analytics.
    
    partial_update:
    Update one or more fields of platform analytics.
    
    destroy:
    Delete platform analytics.
    """
    queryset = PlatformAnalytics.objects.all()
    serializer_class = PlatformAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def get_dashboard_metrics(self, request):
        """
        Get dashboard metrics.
        
        Returns:
        - 200: Dashboard metrics retrieved successfully
        """
        # Implement dashboard metrics aggregation logic here
        return Response({'status': 'success'})

class ChatMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for chat messages.
    
    list:
    Return a list of all chat messages for the current user.
    
    retrieve:
    Return the details of a specific chat message.
    
    create:
    Create a new chat message.
    
    update:
    Update all fields of a chat message.
    
    partial_update:
    Update one or more fields of a chat message.
    
    destroy:
    Delete a chat message.
    """
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChatMessage.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def send_message(self, request):
        """
        Send a message and get bot response.
        
        Parameters:
        - message: string (Message to send)
        
        Returns:
        - 200: Message sent and response received successfully
        - 400: Invalid message provided
        """
        message = request.data.get('message')
        if message:
            chat_message = ChatMessage.objects.create(
                user=self.request.user,
                message=message,
                is_bot=False
            )
            # Implement bot response logic here
            bot_response = ChatMessage.objects.create(
                user=self.request.user,
                message="Bot response placeholder",
                is_bot=True
            )
            return Response({
                'user_message': ChatMessageSerializer(chat_message).data,
                'bot_response': ChatMessageSerializer(bot_response).data
            })
        return Response({'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)

class UserSettingsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for user settings.
    
    list:
    Return a list of all user settings for the current user.
    
    retrieve:
    Return the details of specific user settings.
    
    create:
    Create new user settings.
    
    update:
    Update all fields of user settings.
    
    partial_update:
    Update one or more fields of user settings.
    
    destroy:
    Delete user settings.
    """
    queryset = UserSettings.objects.all()
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserSettings.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
