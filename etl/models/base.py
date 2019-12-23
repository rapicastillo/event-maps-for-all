
from django.db import models

class Integration(models.Model):
    alias=models.CharField(max_length=400)
    description = models.CharField(max_length=400)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return '%s' % (self.alias)

class EventTypeMapping(models.Model):
    display_name=models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.display_name

class EventType(models.Model):
    name = models.CharField(max_length=200, null=True)
    title = models.CharField(max_length=200, null=True)
    slug = models.CharField(max_length=200, null=True)
    integration=models.ForeignKey(Integration, on_delete=models.SET_NULL, null=True)
    event_type_mapping=models.ForeignKey(EventTypeMapping, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return "%s - %s" % (self.integration.alias, self.title)

class Event(models.Model):
    """
    This is the base event to be added by everyone
    """
    title=models.CharField(max_length=100,null=True)
    venue=models.CharField(max_length=100, null=True)
    information=models.TextField(null=True)
    address1=models.CharField(max_length=100,null=True)
    address2=models.CharField(max_length=100,null=True)
    city=models.CharField(max_length=100,null=True)
    state=models.CharField(max_length=20,null=True)
    country=models.CharField(max_length=200, default="US",null=True)
    zipcode=models.CharField(max_length=10, null=True)
    latitude=models.FloatField(null=True)
    longitude=models.FloatField(null=True)
    datetime_start=models.DateTimeField(null=True)
    datetime_end=models.DateTimeField(null=True)
    event_type = models.ForeignKey(EventType, on_delete=models.SET_NULL, null=True)
    is_hidden = models.BooleanField(default=False)
    url = models.CharField(max_length=700, null = True)
    integration=models.ForeignKey(Integration, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title