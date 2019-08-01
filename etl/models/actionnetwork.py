from django.db import models
from .base import Event, EventType, Integration

# Create your models here.
class ActionNetworkIntegration(Integration):
    api_key=models.CharField(max_length=500)


class ActionNetworkEventCampaign(EventType):
    """
    This is the event campaign created from 
    """
    an_name = models.CharField(max_length=200, null=True)
    an_title = models.CharField(max_length=200, null=True)
    actionnetwork_id = models.CharField(max_length=150, null=True, unique=True)
    description = models.TextField(null=True)
    host_pitch = models.TextField(null=True)
    host_instructions = models.TextField(null=True)
    total_events = models.IntegerField(null=True)
    total_rsvps = models.IntegerField(null=True)
    events_url = models.CharField(max_length=400, null=True)
    host_url = models.CharField(max_length=400, null=True)
    browser_url = models.CharField(max_length=400, null=True)

    def __str__(self):
        return '%s' % (self.an_title)

class ActionNetworkEvent(Event):
    created_date = models.DateTimeField(null=True)
    description = models.TextField(null=True)
    total_accepted = models.IntegerField(null=True)
    status = models.CharField(max_length=100, null=True)
    visibility = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=100, null=True)
    instructions = models.TextField(null=True)
    actionnetwork_id = models.CharField(max_length=150, null=True, unique=True)

    def __str__(self):
        return '%s' % (self.actionnetwork_id)
