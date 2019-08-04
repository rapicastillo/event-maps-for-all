from etl.models import Event, EventType
from rest_framework import serializers



class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ('id', 'title', 'slug')

class EventSerializer(serializers.ModelSerializer):
    event_type = EventTypeSerializer()  
    datetime_start = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", required=False, read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'venue', 'address1', 'address2', 'url', \
                    'city', 'state', 'country', 'zipcode', \
                    'datetime_start', 'datetime_end', 'event_type', \
                    'latitude', 'longitude' )
