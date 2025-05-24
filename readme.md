# Lambda - Login de Usuario

Esta función Lambda permite iniciar sesión a un usuario registrado en la base de datos DynamoDB (Users). Verifica las credenciales ingresadas y retorna un token JWT para su uso en endpoints protegidos.

### Entrada (Request)

Método: POST 

Body esperado:

```json
{
  "email": "usuario@example.com",
  "password": "contraseñaSegura123"
}
```

### Salida (Response)

200 OK  
Credenciales válidas, login exitoso.

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# Despliegue

    
### Para desplegar esta Lambda en   AWS:

Compila el proyecto (por ejemplo, usando TypeScript con tsc).

 Comprime manualmente el contenido de la carpeta dist (o el output de build) en un archivo .zip utilizando WinRAR u otra herramienta.

 Asegúrate de que el archivo .zip contenga todos los archivos necesarios, incluyendo node_modules y dependencias.

Sube el archivo .zip a través de Terraform (terraform apply).