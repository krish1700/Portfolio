from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Education, Work, Portfolio, Skills

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

class EducationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image = serializers.FileField(required=False)  # Allow optional updates for images

    class Meta:
        model = Education
        fields = ['id', 'school', 'degree', 'years', 'image', 'image_url', 'ordinal']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.build_url(secure=True)
        return None


class WorkSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image = serializers.FileField(required=False)  # Allow optional updates for images

    class Meta:
        model = Work
        fields = ['id', 'company', 'years', 'description', 'image', 'image_url', 'ordinal']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.build_url(secure=True)
        return None


class PortfolioSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image = serializers.FileField(required=False)  # Allow optional updates for images

    class Meta:
        model = Portfolio
        fields = ['id', 'title', 'description', 'image', 'image_url', 'url', 'years', 'ordinal']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.build_url(secure=True)
        return None

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills  # Update to match new model name
        fields = '__all__'
