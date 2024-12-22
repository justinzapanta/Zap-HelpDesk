from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('ticket-routing/', views.ticket_routing),
    path('form-customization/', views.ticket_form_customize, name='ticket_form_customize'),
    path('template/', views.template),
    path('template/<str:name>', views.template)
]