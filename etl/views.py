from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError
from .serializers import EventSerializer, EventTypeSerializer

from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from etl.models import Event

from django.conf import settings
import os 

# Create your views here.
class EventsListView(APIView):

    def get(self, request, format=None):

        events = Event.objects.filter(datetime_start__year=2019)
        event_types = set([e.event_type for e in events if not e.event_type is None])


        events_serializer = EventSerializer(events, many=True)
        event_type_serializer = EventTypeSerializer(event_types, many=True)
        return Response({
                "events": events_serializer.data,
                "event_types": event_type_serializer.data
        })

class FrontendAppView(APIView):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    build`).
    """
    index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')

    def get(self, request):
        print("!!!", self.index_file_path)
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `yarn start` on the frontend/ directory
                """,
                status=501,
            )
