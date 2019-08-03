# -*- coding: utf-8 -*-
# Generated by Django 1.11.22 on 2019-07-28 04:19
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, null=True)),
                ('address1', models.CharField(max_length=100, null=True)),
                ('address2', models.CharField(max_length=100, null=True)),
                ('city', models.CharField(max_length=100, null=True)),
                ('state', models.CharField(max_length=20, null=True)),
                ('country', models.CharField(default='US', max_length=200, null=True)),
                ('full_address', models.CharField(max_length=200, null=True)),
                ('datetime_start', models.DateTimeField(null=True)),
                ('datetime_end', models.DateTimeField(null=True)),
                ('is_hidden', models.BooleanField(default=False)),
                ('url', models.CharField(max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, null=True)),
                ('slug', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Integration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alias', models.CharField(max_length=400)),
                ('description', models.CharField(max_length=400)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='ActionNetworkEvent',
            fields=[
                ('event_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='etl.Event')),
                ('created_date', models.DateTimeField(null=True)),
                ('description', models.TextField(null=True)),
                ('total_accepted', models.IntegerField(null=True)),
                ('status', models.CharField(max_length=100, null=True)),
                ('visibility', models.CharField(max_length=50, null=True)),
                ('name', models.CharField(max_length=100, null=True)),
                ('instructions', models.TextField(null=True)),
                ('actionnetwork_id', models.CharField(max_length=150, null=True)),
            ],
            bases=('etl.event',),
        ),
        migrations.CreateModel(
            name='ActionNetworkEventCampaign',
            fields=[
                ('eventtype_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='etl.EventType')),
                ('title', models.CharField(max_length=200, null=True)),
                ('actionnetwork_id', models.CharField(max_length=150, null=True)),
                ('description', models.CharField(max_length=500, null=True)),
                ('host_pitch', models.TextField(null=True)),
                ('host_instructions', models.TextField(null=True)),
                ('total_events', models.IntegerField(null=True)),
                ('total_rsvps', models.IntegerField(null=True)),
                ('events_url', models.CharField(max_length=400, null=True)),
                ('host_url', models.CharField(max_length=400, null=True)),
            ],
            bases=('etl.eventtype',),
        ),
        migrations.CreateModel(
            name='ActionNetworkIntegration',
            fields=[
                ('integration_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='etl.Integration')),
                ('api_key', models.CharField(max_length=500)),
            ],
            bases=('etl.integration',),
        ),
        migrations.AddField(
            model_name='event',
            name='event_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='etl.EventType'),
        ),
        migrations.AddField(
            model_name='actionnetworkeventcampaign',
            name='actionnetwork_integration',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='etl.ActionNetworkIntegration'),
        ),
        migrations.AddField(
            model_name='actionnetworkevent',
            name='event_campaign',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='etl.ActionNetworkEventCampaign'),
        ),
    ]