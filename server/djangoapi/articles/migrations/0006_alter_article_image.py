# Generated by Django 3.2.2 on 2021-11-24 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0005_merge_20211125_0415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(blank=True, upload_to='uploads'),
        ),
    ]
