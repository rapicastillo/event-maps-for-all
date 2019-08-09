from etl.data_source import mobilizeamerica
from etl.models import MobilizeAmericaIntegration
ma = MobilizeAmericaIntegration.objects.get(id=2)
mobilizeamerica.pull_mobilize_america_events(ma)
