from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from etl.models import Event
# Create your views here.
def index(request):
    events = Event.objects.all()
    data = serializers.serialize('json', events)
    return HttpResponse(data, content_type='application/json')