from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, RegisterView, CustomAuthToken,
    CaseViewSet, CaseCommentViewSet, NotificationViewSet,
    DashboardView, DashboardTrendsView, DashboardActivityView,
    DashboardUserOverviewView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cases', CaseViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('cases/<int:case_pk>/comments/', CaseCommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='case-comments'),
    path('cases/<int:case_pk>/comments/<int:pk>/', CaseCommentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='case-comment-detail'),
    
    # Dashboard endpoints
    path('dashboard/stats/', DashboardView.as_view(), name='dashboard-stats'),
    path('dashboard/trends/', DashboardTrendsView.as_view(), name='dashboard-trends'),
    path('dashboard/activity/', DashboardActivityView.as_view(), name='dashboard-activity'),
    path('dashboard/users/overview/', DashboardUserOverviewView.as_view(), name='dashboard-users-overview'),
]