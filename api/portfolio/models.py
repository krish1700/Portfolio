from django.db import models
from cloudinary.models import CloudinaryField

class Education(models.Model):
    school = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    years = models.CharField(max_length=255)
    image = CloudinaryField('image', folder='education', blank=True, null=True)
    ordinal = models.IntegerField()

    class Meta:
        ordering = ['ordinal']

    def __str__(self):
        return f"{self.school} - {self.degree}"

    @property
    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            # Get the secure URL from Cloudinary
            return self.image.build_url(secure=True)
        return None

class Work(models.Model):
    company = models.CharField(max_length=255)
    years = models.CharField(max_length=255)
    description = models.TextField()
    image = CloudinaryField('image', folder='work', blank=True, null=True)
    ordinal = models.IntegerField()

    class Meta:
        ordering = ['ordinal']

    def __str__(self):
        return f"{self.company} - {self.years}"

    @property
    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.build_url(secure=True)
        return None

class Portfolio(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = CloudinaryField('image', folder='portfolio', blank=True, null=True)
    url = models.URLField()
    years = models.CharField(max_length=255, blank=True, null=True)
    ordinal = models.IntegerField()

    class Meta:
        ordering = ['ordinal']
        verbose_name_plural = "Portfolio entries"

    def __str__(self):
        return self.title

    @property
    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.build_url(secure=True)
        return None

class Skills(models.Model):
    skillName = models.CharField(max_length=255)
    ordinal = models.IntegerField()

    class Meta:
        ordering = ['ordinal']
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.skillName