# Generated by Django 5.1.4 on 2024-12-30 06:46

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('company_uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('company_name', models.CharField(max_length=250)),
                ('company_logo', models.ImageField(blank=True, default=None, null=True, upload_to='./main/static/img/company_logo')),
                ('company_total_employee', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('user_uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('user_fname', models.CharField(max_length=100)),
                ('user_lname', models.CharField(max_length=100)),
                ('user_picture', models.ImageField(blank=True, default=None, null=True, upload_to='./main/static/img/user_profile')),
                ('user_auth_credential', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CompanyEmployee',
            fields=[
                ('employee_uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('employee_department', models.CharField(max_length=100)),
                ('employee_team', models.CharField(max_length=100, null=True)),
                ('employee_company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.company')),
                ('employee_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.userinfo')),
            ],
        ),
        migrations.AddField(
            model_name='company',
            name='company_owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.userinfo'),
        ),
    ]