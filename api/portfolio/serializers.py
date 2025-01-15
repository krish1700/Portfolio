from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Education, Work, Portfolio, Skills

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

class EducationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = ['id', 'school', 'degree', 'years', 'image', 'image_url', 'ordinal']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def validate_image(self, value):
        if value and not value.name.lower().endswith(('png', 'jpg', 'jpeg')):
            raise serializers.ValidationError("Only PNG, JPG, and JPEG formats are supported.")
        return value

class WorkSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Work
        fields = ['id', 'company', 'years', 'description', 'image', 'image_url', 'ordinal']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class PortfolioSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Portfolio
        fields = ['id', 'title', 'description', 'image', 'image_url', 'url', 'years', 'ordinal']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'
