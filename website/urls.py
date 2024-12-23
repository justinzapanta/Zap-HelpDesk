from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('ticket-routing/', views.ticket_routing, name='ticket-routing'),
    path('ticket-form/', views.ticket_form, name='ticket-form'),
    path('template/', views.template, name='template'),
]