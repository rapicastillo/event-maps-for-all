from etl.models import ActionNetworkIntegration, \
                       ActionNetworkEvent, \
                       ActionNetworkEventCampaign, \
                       EventType, \
                       EventTypeMapping
from django.utils.text import slugify
from dateutil.parser import parse
from datetime import datetime, timedelta
import requests
import json


EVENT_CAMPAIGNS_ENDPOINT = "https://actionnetwork.org/api/v2/event_campaigns"
EVENTS_ENDPOINT = "https://actionnetwork.org/api/v2/events"

def pull_actionnetwork_events(action_network:ActionNetworkIntegration):
    """
    This is informaiton
    """
    # Get API
    api_key = action_network.api_key
    
    # Grab plain events
    print("Pulling data from API Key", api_key)
    raw_event_campaigns = _get_event_campaigns(api_key)
    _store_event_campaigns(raw_event_campaigns, action_network)

    # print("Raw Event Campaigns ", raw_event_campaigns)
    raw_events = _get_events(api_key, EVENTS_ENDPOINT)
    _store_events(raw_events, action_network)

    # Go through all event campaigns pull and save data
    event_campaigns = ActionNetworkEventCampaign.objects.all()
    for ec in event_campaigns: 
        ec_raw_events = _get_events(api_key, ec.events_url)
        _store_events(ec_raw_events, action_network, ec)


def _get_event_campaigns(api_key:str):
    """
    Pull Event Campaigns
    """
    page = 1
    has_more = True
    data = []

    while has_more:
        req = requests.get(EVENT_CAMPAIGNS_ENDPOINT, data={'page': page}, headers={"OSDI-API-Token": api_key})
        
        page = page + 1
        try:
            if req.status_code != 200:
                raise ValueError("Error in retrieving ", req.status_code)
            else:
                json_data = json.loads(req.text)
                campaigns = json_data['_embedded']['action_network:event_campaigns']
                data = data + campaigns
                
                if json_data["total_pages"] <= json_data["page"]:
                    has_more = False
                
        except: 
            has_more = False
    
    return data
    

def _get_events(api_key:str, url:str):
    """
    Pull Raw Events from OSDI
    """
    page = 1
    has_more = True
    data = []

    while has_more:
        req = requests.get(url, data={'page': page}, headers={"OSDI-API-Token": api_key})
        print("[Page %d] Pulling %s " % (page, url))
        page = page + 1

        # if page > 2:
        #     has_more=False 

        try:
            if req.status_code != 200:
                raise ValueError("Error in retrieving ", req.status_code)
            else:
                json_data = json.loads(req.text)

                events = json_data['_embedded']['osdi:events']
                data = data + events
                
                if json_data["total_pages"] <= json_data["page"]:
                    has_more = False
                
        except: 
            has_more = False
    
    return data

def _store_events(events:list, integration:ActionNetworkIntegration, event_campaign:ActionNetworkEventCampaign = None):
    """
    This will store the event onto the database
    """

    # By Practice, we get and update events from 7 days ago
    days_ago = datetime.now() - timedelta(days=7)
    days_ago = days_ago.replace(tzinfo=None)
    action_network_events = []

    print(json.dumps(events))

    for event in events:

        if "start_date" not in event:
            continue

        # Create an array of ActionNetworkEvents
        created_date=parse(event["created_date"])
        start_date=parse(event["start_date"])
        start_date = start_date.replace(tzinfo=None)

        if start_date < days_ago:
            continue

        if "location" not in event:
            event["location"] = {}
            address_lines = []
        elif "address_lines" not in event["location"]:
            address_lines = []
        else:
            address_lines = event["location"]["address_lines"]

        action_network_events.append(
            ActionNetworkEvent(
                title=event["title"],
                venue=event["location"]["venue"] if "location" in event and "venue" in event["location"] else None,
                address1=address_lines[0] if 0 < len(address_lines) else None,
                address2=address_lines[1] if 1 < len(address_lines) else None,
                city=event["location"]["locality"] if "location" in event and "locality" in event["location"] else None,
                state=event["location"]["region"] if "location" in event and "region" in event["location"] else None,
                country=event["location"]["country"] if "location" in event and "country" in event["location"] else None,
                zipcode=event["location"]["postal_code"] if "location" in event and "postal_code" in event["location"] else None,
                datetime_start=start_date, 
                datetime_end=None, 
                longitude=event["location"]["location"]["longitude"]  if 'location' in event and 'location' in event['location'] else None,
                latitude=event['location']["location"]["latitude"] if 'location' in event and 'location' in event['location'] else None,
                event_type=event_campaign, 
                is_hidden=event["action_network:hidden"] if "action_network:hidden" in event else None,
                url=event["browser_url"] if "browser_url" in event else None,
                created_date=created_date,
                description=event["description"] if "description" in event else None,
                total_accepted=0,
                status=event["status"],
                visibility=event["visibility"],
                name=event["name"] if "name" in event else None,
                instructions=event["instructions"] if "instructions" in event else None,
                actionnetwork_id=event["identifiers"][0] if 0 < len(event["identifiers"]) else None,
                integration=integration
            )
        )

    for an_event in action_network_events:
        print(an_event)
        try:
            an_event.save()
            print("Creating :: ", an_event, an_event.url)
        except Exception as e:
            try: 
                update_ev = ActionNetworkEvent.objects.get(actionnetwork_id=an_event.actionnetwork_id)
                an_event.id = update_ev.id
                an_event.save()
                print("Updating :: ", an_event)
            except Exception as e1:
                print("Error: ", str(e1))
            # print("Error: ", str(e))

def _store_event_campaigns(event_campaigns:list, integration:ActionNetworkIntegration=None):
    """
    This will store the event onto the database
    """
    print(json.dumps(event_campaigns))
    actionnetwork_ec = []

    for ec in event_campaigns:
        
        event_campaign = ActionNetworkEventCampaign.objects.get_or_create(
            name=ec["name"] if "name" in ec else None,
            slug=slugify(ec["title"]) if "title" in ec else None,
            integration=integration,
            title=ec["title"] if "title" in ec else None,
            actionnetwork_id=ec["identifiers"][0] if "identifiers" in ec else None,
            description=ec["description"] if "description" in ec else None,
            host_pitch=ec["host_pitch"] if "host_pitch" in ec else None,
            host_instructions=ec["host_instructions"] if "host_instructions" in ec else none,
            total_events=ec["total_events"] if "total_events" in ec else None,
            total_rsvps=ec["total_rsvps"] if "total_rsvps" in ec else None,
            events_url=ec["_links"]["osdi:events"]["href"],
            host_url=ec["host_url"] if "host_url" in ec else None,
            an_name=ec["name"] if "name" in ec else None,
            an_title=ec["title"] if "title" in ec else None,
        )

        created = event_campaign[1]
        if created:
            event_type_mapping = EventTypeMapping.objects.get_or_create(display_name=ec['name'])
            event_type_mapping = event_type_mapping[0]
            event_type_mapping.save()

    # for ec in actionnetwork_ec:
    #     try:
    #         ec.save()
    #         print("Creating :: ", ec.events_url)
    #     except Exception as e:
    #         print("Error: ", str(e))
            # try: 
            #     update_ec = ActionNetworkEventCampaign.objects.get(actionnetwork_id=ec.actionnetwork_id)
            #     ec.id = update_ec.id
            #     ec.save()
            #     print("Updating :: ", ec)
            # except Exception as e1:
            #     print("Error: ", ec, ec.actionnetwork_id, ec.title, str(e1))