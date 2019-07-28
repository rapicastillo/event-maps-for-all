from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import etl.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', etl.views.index, name='index'),
    url(r'^admin/', include(admin.site.urls)),
]
