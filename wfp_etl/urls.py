from django.conf.urls import url, re_path
from django.contrib import admin

admin.autodiscover()

from etl.views import *

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    re_path(r'^api/events/list$', EventsListView.as_view()),
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^', FrontendAppView.as_view()),
]
