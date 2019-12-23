from etl.models import Event, EventType, EventTypeMapping
from rest_framework import serializers


class EventTypeMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTypeMapping
        fields = ('id', 'display_name')

class EventTypeSerializer(serializers.ModelSerializer):
    event_type_mapping = EventTypeMappingSerializer()
    class Meta:
        model = EventType
        fields = ('id', 'title', 'slug', 'event_type_mapping')

class EventSerializer(serializers.ModelSerializer):
    event_type = EventTypeSerializer()  
    datetime_start = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", required=False, read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'venue', 'information', 'address1', 'address2', 'url', \
                    'city', 'state', 'country', 'zipcode', \
                    'datetime_start', 'datetime_end', 'event_type', \
                    'latitude', 'longitude' )
