from django.db import models

# Create your models here.
class Education(models.Model):
    school = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    years = models.CharField(max_length=255)
    image = models.ImageField(upload_to='education_images/', blank=True, null=True)
    ordinal = models.IntegerField()
    
class Work(models.Model):
    company = models.CharField(max_length=255)
    years = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    ordinal = models.IntegerField()
    
class Portfolio(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='uploads/')
    url = models.URLField()
    years = models.CharField(max_length=255, blank=True, null=True)
    ordinal = models.IntegerField()
    
class Skills(models.Model):
    skillName = models.CharField(max_length=255)
    ordinal = models.IntegerField()