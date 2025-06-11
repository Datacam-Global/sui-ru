from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Add unique constraint to User model's email field
User._meta.get_field('email')._unique = True

class Alert(models.Model):
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    source = models.CharField(max_length=100)
    location = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.severity}"

class Report(models.Model):
    REPORT_TYPE_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('custom', 'Custom'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_public = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title} - {self.report_type}"

class ContentAnalysis(models.Model):
    content_type = models.CharField(max_length=50)  # text, image, video, etc.
    content_url = models.URLField()
    analysis_result = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    confidence_score = models.FloatField()
    tags = models.JSONField(default=list)
    
    def __str__(self):
        return f"{self.content_type} Analysis - {self.created_at}"

class GeographicData(models.Model):
    location_name = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    data_type = models.CharField(max_length=50)  # alert, report, analysis
    data_id = models.IntegerField()  # ID of the related object
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.location_name} - {self.data_type}"

class PlatformAnalytics(models.Model):
    platform_name = models.CharField(max_length=100)
    metrics = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    period = models.CharField(max_length=20)  # daily, weekly, monthly
    
    def __str__(self):
        return f"{self.platform_name} - {self.period}"

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_bot = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.timestamp}"

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    theme = models.CharField(max_length=20, default='dark')
    notifications_enabled = models.BooleanField(default=True)
    email_notifications = models.BooleanField(default=True)
    email_verified = models.BooleanField(default=False)
    dashboard_layout = models.JSONField(default=dict)
    
    def __str__(self):
        return f"{self.user.username}'s Settings"
