from django.db import models
from .base import Event, EventType, Integration

class MobilizeAmericaIntegration(Integration):
    organization_id=models.IntegerField(null=True)

class MobilizeAmericaEvent(Event):
    description=models.TextField(null=True)
    summary=models.TextField(null=True)
    high_priority=models.BooleanField(null=True)
    visibility=models.CharField(max_length=100, null=True)
    virtual_action_url=models.CharField(max_length=500, null=True)
    featured_image_url=models.CharField(max_length=200, null=True)