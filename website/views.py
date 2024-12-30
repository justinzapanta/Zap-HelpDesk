from django.shortcuts import render, redirect
from django.contrib.auth.models import User
import requests


# Create your views here.

def index(request):
    return render(request, 'website/views/index.html')


def register(request):
    if request.method == 'POST':
        pass
    return render(request, 'website/views/register.html')


def login(request):
    return render(request, 'website/views/login.html')



def dashboard(request):
    if request.user.is_authenticated:
        return render(request, 'website/views/dashboard.html')
    else:
        return redirect(login)


def ticket_routing(request):
    return render(request, 'website/views/routing.html')


def ticket_form(request):
    if request.method == 'POST':
        return redirect('template')
    return render(request, 'website/views/ticket_form.html')


def template(request):
    return render(request, f'website/form_templates/regular.html')