# Generated by Django 5.1.4 on 2024-12-30 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_alter_company_company_owner_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='company_total_employee',
            field=models.IntegerField(default=0),
        ),
    ]