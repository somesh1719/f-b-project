from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer

# ---- POST (Submit Data) ----
@api_view(['POST'])
def submit_form(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Success"}, status=201)
    return Response(serializer.errors, status=400)

# ---- GET (Fetch All) + DELETE ALL ----
@api_view(['GET', 'DELETE'])
def get_submissions(request):
    if request.method == 'GET':
        submissions = Contact.objects.all().order_by('-id')
        serializer = ContactSerializer(submissions, many=True)
        return Response(serializer.data)

    if request.method == 'DELETE':  # DELETE ALL
        Contact.objects.all().delete()
        return Response({"message": "All submissions deleted"}, status=200)

# ---- DELETE One Submission ----
@api_view(['DELETE'])
def delete_submission(request, id):
    try:
        submission = Contact.objects.get(id=id)
        submission.delete()
        return Response({"message": "Submission deleted"}, status=200)
    except Contact.DoesNotExist:
        return Response({"error": "Submission not found"}, status=404)
