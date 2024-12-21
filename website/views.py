from django.shortcuts import render

# Create your views here.

def dashboard(request):
    return render(request, 'website/views/dashboard.html')


def ticket_routing(request):
    return render(request, 'website/views/routing.html')


