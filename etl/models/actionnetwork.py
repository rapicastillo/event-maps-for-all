from django.db import models
from .base import Event, EventType
# Create your models here.
class ActionNetworkIntegration(models.Model):
    alias=models.CharField(max_length=400)
    api_key=models.CharField(max_length=500)
    description = models.CharField(max_length=400)


class ActionNetworkEventCampaigns(models.Model):
    """
    This is the event campaign created from 
    """
    name = models.CharField(max_length=200)
    event_type = models.ForeignKey(EventType)

class ActionNetworkEvent(Event):
    event_campaign = models.ForeignKey(ActionNetworkEventCampaigns, on_delete=models.CASCADE, null=True, blank=True)
