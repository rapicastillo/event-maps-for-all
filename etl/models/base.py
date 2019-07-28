
from django.db import models

class EventType(models.Model):
    name = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=500, null=True)

class Event(models.Model):
    """
    This is the base event to be added by everyone
    """
    title=models.CharField(max_length=100,null=True)
    address1=models.CharField(max_length=100,null=True)
    address2=models.CharField(max_length=100,null=True)
    city=models.CharField(max_length=100,null=True)
    state=models.CharField(max_length=20,null=True)
    country=models.CharField(max_length=200, default="US",null=True)
    full_address=models.CharField(max_length=200,null=True)
    event_date=models.DateField(null=True)
    time_start=models.TimeField(null=True)
    time_end=models.TimeField(null=True)
    event_type = models.ForeignKey(EventType, on_delete=models.SET_NULL, null=True)