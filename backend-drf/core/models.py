from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """Custom user model extending Django's AbstractUser"""
    phone_number = models.CharField(max_length=15, blank=True)
    organization = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=50, choices=[
        ('admin', 'Administrator'),
        ('moderator', 'Moderator'),
        ('user', 'Regular User'),
    ], default='user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

class Case(models.Model):
    """Model for managing reported cases"""
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_review', 'In Review'),
        ('closed', 'Closed'),
    ]
    
    TYPE_CHOICES = [
        ('misinformation', 'Misinformation'),
        ('hate_speech', 'Hate Speech'),
        ('fake_news', 'Fake News'),
    ]

    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reported_cases')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    title = models.CharField(max_length=200)
    description = models.TextField()
    evidence = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_cases')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

class CaseComment(models.Model):
    """Model for case comments"""
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

class Notification(models.Model):
    """Model for user notifications"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=50, choices=[
        ('case_update', 'Case Update'),
        ('system', 'System Notification'),
        ('comment', 'New Comment'),
    ])
    related_case = models.ForeignKey(Case, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

class ActivityLog(models.Model):
    """Model for tracking user activities in the system"""
    ACTION_CHOICES = [
        ('report', 'Reported Misinformation'),
        ('resolve', 'Resolved Case'),
        ('join', 'Joined Platform'),
        ('flag', 'Flagged Content'),
        ('comment', 'Added Comment'),
        ('update', 'Updated Case'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    description = models.TextField()
    related_case = models.ForeignKey(Case, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('activity log')
        verbose_name_plural = _('activity logs')

    def __str__(self):
        return f"{self.user.username} - {self.action} - {self.created_at}"
