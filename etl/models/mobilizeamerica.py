from django.db import models
from .base import Event, EventType, Integration

class MobilizeAmericaIntegration(Integration):
    organization_id=models.IntegerField(null=True)

class MobilizeAmericaEventType(EventType):
    """
    one of
    CANVASS, PHONE_BANK, TEXT_BANK, MEETING, COMMUNITY, 
    FUNDRAISER, MEET_GREET, HOUSE_PARTY, VOTER_REG, TRAINING, 
    FRIEND_TO_FRIEND_OUTREACH, DEBATE_WATCH_PARTY, OTHER
    """
    mobilize_event_type = models.CharField(max_length=200, null=True)
    mobilize_america_integration = models.ForeignKey(MobilizeAmericaIntegration, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return "%s - %s" % (self.mobilize_america_integration.alias, self.mobilize_event_type)

    class Meta:
        unique_together = ("mobilize_event_type", "mobilize_america_integration")

class MobilizeAmericaEvent(Event):
    created_date=models.DateTimeField(null=True)
    description=models.TextField(null=True)
    summary=models.TextField(null=True)
    high_priority=models.BooleanField(null=True)
    visibility=models.CharField(max_length=100, null=True)
    virtual_action_url=models.CharField(max_length=500, null=True)
    featured_image_url=models.CharField(max_length=200, null=True)
    timeslot_id=models.CharField(max_length=100, unique=True, null=True)