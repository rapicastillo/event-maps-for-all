from etl.models import Event
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('title', 'venue', 'address1', 'address2', 'url', \
                    'city', 'state', 'country', 'zipcode', \
                    'datetime_start', 'datetime_end', 'event_type' )
