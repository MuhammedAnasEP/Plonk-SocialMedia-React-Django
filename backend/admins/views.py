from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import User
from users.serializers import UserSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if user.is_superuser:
            token = super().get_token(user)
            token['username'] = user.username

            return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()

    serialzer = UserSerializer(users, many = True)
    return Response(serialzer.data)

@api_view(['PUT'])
def userBlock(request,id):
    user = User.objects.get(id=id)
    user.is_active = not user.is_active
    user.save()
    return Response(user.username) 