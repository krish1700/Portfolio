# Generated by Django 5.1.4 on 2025-01-10 04:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0007_skills_level'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='skills',
            name='level',
        ),
    ]
