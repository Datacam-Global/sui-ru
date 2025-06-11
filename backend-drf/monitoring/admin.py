from django.contrib import admin
from .models import (
    Alert, Report, ContentAnalysis, GeographicData,
    PlatformAnalytics, ChatMessage, UserSettings
)

@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ('title', 'severity', 'status', 'created_at', 'assigned_to')
    list_filter = ('severity', 'status', 'created_at')
    search_fields = ('title', 'description', 'source')

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'report_type', 'created_by', 'created_at', 'is_public')
    list_filter = ('report_type', 'created_at', 'is_public')
    search_fields = ('title', 'content')

@admin.register(ContentAnalysis)
class ContentAnalysisAdmin(admin.ModelAdmin):
    list_display = ('content_type', 'confidence_score', 'created_at')
    list_filter = ('content_type', 'created_at')
    search_fields = ('content_url', 'tags')

@admin.register(GeographicData)
class GeographicDataAdmin(admin.ModelAdmin):
    list_display = ('location_name', 'data_type', 'created_at')
    list_filter = ('data_type', 'created_at')
    search_fields = ('location_name',)

@admin.register(PlatformAnalytics)
class PlatformAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('platform_name', 'period', 'timestamp')
    list_filter = ('platform_name', 'period', 'timestamp')
    search_fields = ('platform_name',)

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_bot', 'timestamp')
    list_filter = ('is_bot', 'timestamp')
    search_fields = ('message', 'user__username')

@admin.register(UserSettings)
class UserSettingsAdmin(admin.ModelAdmin):
    list_display = ('user', 'theme', 'notifications_enabled')
    list_filter = ('theme', 'notifications_enabled')
    search_fields = ('user__username',)
