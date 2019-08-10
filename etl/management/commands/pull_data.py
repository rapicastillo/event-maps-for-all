from django.core.management.base import BaseCommand, CommandError
from etl.models import Integration, ActionNetworkIntegration
from etl.data_source import actionnetwork, mobilizeamerica

class Command(BaseCommand):
    help = 'Calls the pull data command'

    def handle(self, *args, **options):

        # Get all active integrations
        integrations = Integration.objects.filter(is_active=True)

        for integration in integrations:
            if hasattr(integration, "actionnetworkintegration"):
                an = integration.actionnetworkintegration
                actionnetwork.pull_actionnetwork_events(an)
            elif hasattr(integration, "mobilizeamericaintegration"):
                ma = integration.mobilizeamericaintegration
                mobilizeamerica.pull_mobilize_america_events(ma)
