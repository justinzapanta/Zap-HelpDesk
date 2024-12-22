from django.shortcuts import render, redirect

# Create your views here.

def dashboard(request):
    return render(request, 'website/views/dashboard.html')


def ticket_routing(request):
    return render(request, 'website/views/routing.html')


def ticket_form(request):
    return render(request, 'website/views/ticket_form.html')


def template(request, name=None):
    try:
        return render(request, f'website/form_templates/{name}.html')
    except:
        return redirect('ticket-form')