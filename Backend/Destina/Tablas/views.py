# api
from rest_framework.permissions import IsAuthenticated
 
from rest_framework.response import Response
from rest_framework.views import APIView
 
class PruebaListApiView(APIView):
    # permission_required = 'clientes.view_cliente'
 
    
 
    def get(self, request):
        from .seriallizers import consulta_serializada_pruebas
        pruebas = consulta_serializada_pruebas(request)
        return Response(pruebas)
    