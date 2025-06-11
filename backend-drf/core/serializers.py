from rest_framework import serializers
from .models import User, Case, CaseComment, Notification, ActivityLog
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'organization', 'role', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class CaseSerializer(serializers.ModelSerializer):
    reporter = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)

    class Meta:
        model = Case
        fields = [
            'id', 'reporter', 'type', 'status', 'title', 'description',
            'evidence', 'location', 'assigned_to', 'created_at', 'updated_at', 'closed_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'closed_at']

class CaseCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CaseComment
        fields = ['id', 'case', 'user', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    related_case = CaseSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'title', 'message', 'is_read', 'created_at',
            'notification_type', 'related_case'
        ]
        read_only_fields = ['id', 'created_at']

class ActivityLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = ActivityLog
        fields = ['id', 'user', 'action', 'description', 'time_ago', 'created_at']

    def get_time_ago(self, obj):
        delta = timezone.now() - obj.created_at
        if delta < timedelta(minutes=1):
            return 'just now'
        elif delta < timedelta(hours=1):
            minutes = int(delta.total_seconds() / 60)
            return f'{minutes} min ago'
        elif delta < timedelta(days=1):
            hours = int(delta.total_seconds() / 3600)
            return f'{hours} hr ago'
        else:
            days = delta.days
            return f'{days} days ago'

class DashboardStatsSerializer(serializers.Serializer):
    active_users = serializers.IntegerField()
    active_users_trend = serializers.IntegerField()
    total_reports = serializers.IntegerField()
    reports_trend = serializers.IntegerField()
    platform_reach = serializers.CharField()
    avg_response_time = serializers.CharField()
    response_time_trend = serializers.IntegerField()

class DashboardTrendSerializer(serializers.Serializer):
    date = serializers.DateField()
    users = serializers.IntegerField()
    reports = serializers.IntegerField()

class UserOverviewSerializer(serializers.ModelSerializer):
    reports_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'is_active', 'reports_count']

    def get_reports_count(self, obj):
        return obj.reported_cases.count() 