from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, parsers
from .serializers import UserSerializer, EducationSerializer, PortfolioSerializer, WorkSerializer, SkillSerializer
from .models import Education, Work, Portfolio, Skills

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]