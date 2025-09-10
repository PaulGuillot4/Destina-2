from rest_framework import serializers
from .models import Prueba
 
class PruebaSerializer(serializers.ModelSerializer):
    # Campos directos del modelo Cliente

 
    class Meta:
        model = Prueba
        fields = [
            # planos
            'name', 'description',
 
            #listas
            'created_at', 'updated_at',
 
        ]
 
 
 
def consulta_serializada_pruebas(request):
    user = request.user

    pruebas = Prueba.objects.all()
    serializer = PruebaSerializer(pruebas, many=True)
 
    return serializer.data