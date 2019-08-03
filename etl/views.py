from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError
from .serializers import EventSerializer

from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from etl.models import Event

# Create your views here.
class EventsListView(APIView):

    def get(self, request, format=None):

        districts = Event.objects.all()
        serializer = EventSerializer(districts, many=True)
        return Response(serializer.data)