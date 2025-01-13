# from django.contrib.auth.models import User
# from rest_framework import serializers
# from .models import Education, Work, Portfolio, Skills

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'groups']

# class EducationSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(use_url=True)
    
#     class Meta:
#         model = Education
#         fields = '__all__'
        
# class WorkSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Work
#         fields = '__all__'
    
# class PortfolioSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(use_url=True)
#     class Meta:
#         model = Portfolio
#         fields = '__all__'
    
# class SkillSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Skills
#         fields = '__all__'

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Education, Work, Portfolio, Skills


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']


class EducationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None


class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'


class PortfolioSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'
