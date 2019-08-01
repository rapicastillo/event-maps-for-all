from django.core.management.base import BaseCommand, CommandError
from etl.models import Integration, ActionNetworkIntegration
from etl.data_source import actionnetwork 

class Command(BaseCommand):
    help = 'Calls the pull data command'

    def handle(self, *args, **options):

        # Get all active integrations
        integrations = Integration.objects.filter(is_active=True)

        for integration in integrations:
            if hasattr(integration, "actionnetworkintegration"):
                print("Pulling action network events")
                an = integration.actionnetworkintegration
                actionnetwork.pull_actionnetwork_events(an)
