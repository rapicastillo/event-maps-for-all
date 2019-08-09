# Generated by Django 2.2.4 on 2019-08-09 15:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('etl', '0008_auto_20190804_2028'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventTypeMapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_name', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='eventtype',
            name='event_type_mapping',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='etl.EventTypeMapping'),
        ),
    ]
