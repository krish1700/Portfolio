from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, parsers, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, EducationSerializer, PortfolioSerializer, WorkSerializer, SkillSerializer
from .models import Education, Work, Portfolio, Skills

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by('ordinal')
    serializer_class = EducationSerializer
    parser_classes = (MultiPartParser, FormParser)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Handle both PUT and PATCH
        instance = self.get_object()
        
        # Handle Cloudinary image upload
        image_file = request.FILES.get('image')
        if image_file:
            try:
                # Upload new image to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    image_file,
                    folder='education',  # Specify your folder
                    resource_type="image"
                )
                request.data['image'] = upload_result['public_id']
            except Exception as e:
                return Response({'error': f'Image upload failed: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update the instance
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all().order_by('ordinal')
    serializer_class = WorkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all().order_by('ordinal')
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all().order_by('ordinal')
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]