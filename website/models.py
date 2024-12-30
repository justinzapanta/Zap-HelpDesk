from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class UserInfo(models.Model):
    user_uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    user_picture = models.ImageField(upload_to='./main/static/img/user_profile', default=None, null=True, blank=True)
    user_address = models.CharField(max_length=250, null=True)
    user_phoneNumber = models.CharField(max_length=30, null=True)
    user_other_info = models.ForeignKey(User, on_delete=models.CASCADE)


class Company(models.Model):
    company_uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    company_name = models.CharField(max_length=250, null=False)
    company_owner = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    company_logo = models.ImageField(upload_to='./main/static/img/company_logo', default=None, null=True, blank=True)
    company_total_employee = models.IntegerField(default=0)


class CompanyEmployee(models.Model):
    employee_uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    employee_info = models.ForeignKey(UserInfo, on_delete=models.CASCADE, null=False)
    employee_company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    employee_department = models.CharField(max_length=100, null=False)
    employee_team = models.CharField(max_length=100, null=True)



    
