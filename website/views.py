from django.shortcuts import render, redirect

# Create your views here.

def dashboard(request):
    return render(request, 'website/views/dashboard.html')


def ticket_routing(request):
    return render(request, 'website/views/routing.html')


def ticket_form(request):
    if request.method == 'POST':
        return redirect('template')
    return render(request, 'website/views/ticket_form.html')


def template(request):
    return render(request, f'website/form_templates/regular.html')