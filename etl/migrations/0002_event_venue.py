# -*- coding: utf-8 -*-
# Generated by Django 1.11.22 on 2019-07-28 04:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('etl', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='venue',
            field=models.CharField(max_length=100, null=True),
        ),
    ]