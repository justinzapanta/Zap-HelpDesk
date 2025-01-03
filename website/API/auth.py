from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.contrib.auth.models import User

from ..models import UserInfo, Company, CompanyEmployee
from .functions import generate_code
import uuid
import random


@api_view(['POST'])
def send_email(request):
    if request.data.get('subject') == 'Authentication Code':
        code = generate_code()

        email = User.objects.filter(username = request.data['to'])
        if not email and request.data['type'] == "register" or email and request.data['type'] == "login":
            send_mail(
                subject = request.data['subject'],
                message = code,
                from_email = 'zap.help.desk01@gmail.com',
                recipient_list = [request.data['to']]
            )

            request.session['code'] = code
            return Response({'result' : 'success'}, status=200)
        elif request.data['type'] == "register":
            return Response({'result' : 'The email address is already in use.'})
        elif request.data['type'] == "login":
            return Response({'result' : 'Invalid Email'})
    return Response({'result' : 'Error'})


@api_view(['POST'])
def register(request):
    code = request.data['code']
    if code == request.session['code']:
        email = User.objects.filter(username = request.data['company_email'])
        if not email:
            new_owner = User.objects.create_user(
                username = request.data['company_email'],
                password =  str(uuid.uuid4()),
                first_name = request.data['fname'],
                last_name = request.data['lname'],
            )

            owner_info = UserInfo(
                user_other_info = new_owner,
                user_role = "owner"
            )
            owner_info.save()

            register_company = Company(
                company_name = request.data['company_name'],
                company_owner = owner_info,
            )
            register_company.save()
            request.session['code'] = request.data['company_email']
            print('success')
            return Response({'result' : 'success'})
        return Response({'result' : 'Invalid Code'})
    return Response({'result' : 'Invalid Code'})


@api_view(['POST'])
def login(request):
    code = request.data['code']
    if code == request.session['code']:
        company_email = request.data['company_email']
        request.session['code'] = company_email
    else:
        return Response({'result' : 'Invalid Code'})

@api_view(['POST'])
def verify_code(request):
    print('running')
    if request.data.get('code') == request.session.get('code'):
        print(request.data['company_email'])
        request.session['code'] = request.data['company_email']
        return Response({'result' : 'success'})
    return Response({'result' : 'Invalid Code'})