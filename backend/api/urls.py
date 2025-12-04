from django.urls import path
from .views import submit_form, get_submissions, delete_submission

urlpatterns = [
    path('submit/', submit_form),                # POST
    path('submissions/', get_submissions),       # GET + DELETE ALL
    path('submissions/<int:id>/', delete_submission),  # DELETE ONE
]
