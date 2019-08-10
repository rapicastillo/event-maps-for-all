from etl.models import MobilizeAmericaIntegration, \
                       MobilizeAmericaEvent, \
                       MobilizeAmericaEventType, \
                       EventType, \
                        EventTypeMapping
from django.utils.text import slugify
from dateutil.parser import parse
from datetime import datetime, timedelta
import requests
import json
import pytz

# EVENT_CAMPAIGNS_ENDPOINT = "https://api.mobilize.us/v1/organizations/1391/events"

def pull_mobilize_america_events(mobilize_america:MobilizeAmericaIntegration):
    """
    This is informaiton
    """
    # print("Getting Raw Event Campaigns...")
    raw_events = _get_events(mobilize_america.organization_id)

    # print("Storing Events...")
    _store_events(raw_events, mobilize_america)

def _get_event_type(event_type:str, mobilize_america:MobilizeAmericaIntegration):
    """
    Get Event Type
    """

    # try:
    mobilize_event_type = MobilizeAmericaEventType \
                        .objects \
                        .get_or_create( \
                            integration=mobilize_america,
                            name=event_type,
                            title=event_type,
                            slug=slugify(event_type),
                            mobilize_event_type=event_type, 
                            mobilize_america_integration=mobilize_america,
                        )
    
    is_created = mobilize_event_type[1]
    target = mobilize_event_type[0]
    if is_created:
        event_type_mapping = EventTypeMapping.objects.get_or_create(display_name=event_type)
        target.event_type_mapping = event_type_mapping[0]
        target.save()

    # print("mobilize_event_type --> ", mobilize_event_type[0])
    return target
    # except Exception as e:
    #     print("Error creating event type: ", str(e))

    
    

def _get_events(organization_id:str):
    """
    Pull Raw Events from OSDI
    """
    has_more = True
    data = []
    url = "https://api.mobilize.us/v1/organizations/%s/events" % organization_id

    while has_more:
        req = requests.get(url)
        # print("Pulling %s " % (url))

        # if page > 2:
        #     has_more=False 

        try:
            if req.status_code != 200:
                raise ValueError("Error in retrieving ", req.status_code)
            else:
                json_data = json.loads(req.text)

                events = json_data['data']
                data = data + events
                
                if json_data["next"] is not None:
                    print ("Going to %s ", json_data["next"])
                    has_more = True
                    url=json_data["next"]
                else:
                    # print ("End of data extraction")
                    has_more = False
                
        except: 
            has_more = False
    
    return data

def _store_events(events:list, integration:MobilizeAmericaIntegration):
    """
    This will store the event onto the database
    """

    # By Practice, we get and update events from 7 days ago
    days_ago = datetime.now() - timedelta(days=7)
    # days_ago = days_ago.replace(tzinfo=None)
    mobilize_events = []

    # print(json.dumps(events))
    utc_timezone = pytz.timezone('UTC')
    for event in events:
        locale = pytz.timezone(event['timezone'])
        # if "start_date" not in event:
        #     continue

        # Create an array of ActionNetworkEvents
        # created_date=parse(event["created_date"])
        # start_date=parse(event["start_date"])
        # start_date = start_date.replace(tzinfo=None)

        # print("event --- ", event)

        if "location" not in event or event['location'] is None:
            event["location"] = {}
            address_lines = []
        elif "address_lines" not in event["location"]:
            address_lines = []
        else:
            address_lines = event["location"]["address_lines"]

        event_type=event['event_type'] if 'event_type' in event else None
        mobilize_et = None

        if event_type is not None:
            mobilize_et = _get_event_type(event_type, integration)

        
        event_id = event['id']
        for timeslot in event['timeslots']:
            created_date = datetime.fromtimestamp(event['created_date'])
            created_date = utc_timezone.localize(created_date)

            datetime_start = datetime.fromtimestamp(timeslot['start_date'])

            datetime_start = utc_timezone.localize(datetime_start)
            datetime_start = datetime_start.astimezone(locale).replace(tzinfo=None)

            datetime_end = datetime.fromtimestamp(timeslot['end_date'])
            datetime_end = utc_timezone.localize(datetime_end)
            # datetime_end = locale.localize(datetime_end)
            # compare_time = utc_timezone.localize(days_ago)
            # compare_time = locale.localize(compare_time)
            if datetime_start < days_ago:
                continue

            timeslot_id = "%s-%s" % (event_id, timeslot['id'])

            mobilize_events.append(
                MobilizeAmericaEvent(
                    title=event["title"],
                    event_type=mobilize_et, 
                    venue=event["location"]["venue"] if "location" in event and "venue" in event["location"] else None,
                    address1=address_lines[0] if 0 < len(address_lines) else None,
                    address2=address_lines[1] if 1 < len(address_lines) else None,
                    city=event["location"]["locality"] if "location" in event and "locality" in event["location"] else None,
                    state=event["location"]["region"] if "location" in event and "region" in event["location"] else None,
                    country=event["location"]["country"] if "location" in event and "country" in event["location"] else None,
                    zipcode=event["location"]["postal_code"] if "location" in event and "postal_code" in event["location"] else None,
                    datetime_start=datetime_start, 
                    datetime_end=datetime_end, 
                    longitude=event["location"]["location"]["longitude"]  if 'location' in event and 'location' in event['location'] else None,
                    latitude=event['location']["location"]["latitude"] if 'location' in event and 'location' in event['location'] else None, 
                    is_hidden=event["visibility"] == 'PUBLIC' if "visibility" in event else False,
                    url=event["browser_url"] if "browser_url" in event else None,
                    created_date=created_date,
                    description=event["description"] if "description" in event else None,
                    visibility=event["visibility"],
                    timeslot_id=timeslot_id,
                    integration=integration
                )
            )

    for mobilize_event in mobilize_events:

        try:
            mobilize_event.save()
            # print("Creating :: ", mobilize_event, mobilize_event.url)
        except Exception as e:
            print("Creating Error :: ", str(e))
            try: 
                update_event = MobilizeAmericaEvent.objects.get(timeslot_id=mobilize_event.timeslot_id)
                mobilize_event.id = update_event.id
                mobilize_event.save()
            except Exception as e1:
                print("Update Error: ", str(e1))
            # print("Error: ", str(e))

def _store_event_type(event_type_name:str, integration:MobilizeAmericaIntegration):
    """
    MobilizeAmerica has distinct event types set
    """
