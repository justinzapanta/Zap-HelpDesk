from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
import requests


# Create your views here.

def index(request):
    return render(request, 'website/views/index.html')


def register(request):
    if request.method == 'POST':
        try:
            if request.session.get('code'):
                user = User.objects.get(username = request.session.get('code'))
                if user:
                    login(request, user)
                    return redirect('dashboard')
        except:
            print('error')
    return render(request, 'website/views/register.html')


def sign_in(request):
    try:
        if request.method == 'POST':
            if request.session.get('code'):
                user = User.objects.get(username = request.session.get('code'))
                if user:
                    login(request, user)
                    return redirect('dashboard')
    except:
        print('error')
    return render(request, 'website/views/login.html')


def dashboard(request):
    if request.user.is_authenticated:
        return render(request, 'website/views/dashboard.html')
    else:
        return redirect("sign-in")


def ticket_routing(request):
    return render(request, 'website/views/routing.html')


def ticket_form(request):
    if request.method == 'POST':
        return redirect('template')
    return render(request, 'website/views/ticket_form.html')


def template(request):
    return render(request, f'website/form_templates/regular.html')