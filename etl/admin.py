from django.contrib import admin
from .models import Event, EventType, Integration, ActionNetworkIntegration, ActionNetworkEventCampaign
# Register your models here.

admin.site.register(Integration)
admin.site.register(Event)
admin.site.register(EventType)
admin.site.register(ActionNetworkIntegration)
admin.site.register(ActionNetworkEventCampaign)