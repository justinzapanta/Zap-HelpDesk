from django.urls import path
from . import views
from .API import auth


urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.register, name='register'),
    path('login/', views.sign_in, name='sign-in'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('ticket-routing/', views.ticket_routing, name='ticket-routing'),
    path('ticket-form/', views.ticket_form, name='ticket-form'),
    path('template/', views.template, name='template'),

    #Auth
    path('api/send-mail', auth.send_email, name='send-mail'),
    path('api/register', auth.register, name='api-register'),
    path('api/virification', auth.verify_code, name="verify-code")
]