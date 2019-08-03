from django.urls import include, re_path
from django.conf.urls import url
from django.contrib import admin

admin.autodiscover()

from etl.views import *

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    re_path(r'^events/list$', EventsListView.as_view()),
    re_path(r'^admin/', admin.site.urls),
]
