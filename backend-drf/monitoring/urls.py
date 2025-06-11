from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .auth import RegisterView, CustomTokenObtainPairView
from .verification import (
    RequestPasswordResetView, ResetPasswordView,
    VerifyEmailView, resend_verification_email
)

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'alerts', views.AlertViewSet)
router.register(r'reports', views.ReportViewSet)
router.register(r'content-analysis', views.ContentAnalysisViewSet)
router.register(r'geographic-data', views.GeographicDataViewSet)
router.register(r'platform-analytics', views.PlatformAnalyticsViewSet)
router.register(r'chat-messages', views.ChatMessageViewSet)
router.register(r'user-settings', views.UserSettingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Authentication URLs
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Password Reset URLs
    path('auth/password-reset-request/', RequestPasswordResetView.as_view(), name='password_reset_request'),
    path('auth/password-reset/', ResetPasswordView.as_view(), name='password_reset'),
    
    # Email Verification URLs
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('auth/resend-verification/', resend_verification_email, name='resend_verification'),
] 