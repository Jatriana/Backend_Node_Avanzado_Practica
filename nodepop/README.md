# Nodepop

Aplicación que devuelve el listado de anuncios para ser mostrados desde cualquier cliente (iOS, Android, web, etc). Además gestiones el registro

## Instalacion

La aplicación está desarrollada sobre la versión de Node v14.15.2

Una vez clonado no colocarnos en el raiz del proyecto y ejecutamos ejecutar `npm install`

Arranca la aplicación por defecto en el puerto 3000:

copiar .env.example en .env revisar la configuracion

```sh
cp -i .env.example .env
```

### inicializar la BBDD

```
npm run installDB
```

### Arranque de la aplicación en modo desarrollador:

```
npm run dev
```

### Arranque de la aplicación NODEPOP (primer terminal) :

```
npm start
```

---

### Arrancar microservicio generador de thumbnail(segunda terminal)

```
npm run micro
```

### Arrancar NODEPOP y microservicio generador de thumbnail con PM2

```
npx pm2 start
```

### Documentación de uso:

Operaciones que debe realizar el API a crear:

- Autenticación, para poder visializar el lista de auncios debe estar autenticado y en la cabecara debe tener un Token valido

- Internacionalización, la aplicacion cuenta con la posiblidad de cambiar idiomo selector (ES EN) en la website.

- Lista de anuncios (bajo Auntenticacion) con posibilidad de paginación debe estar autorizado (token). Con filtros por tag, tipo de anuncio
  (venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo

- Lista de tags existentes
- Creación de anuncio
- Subida de imagen con tarea en background

_Para peticiones POST utilizar x-www-form-urlencoded_

\*\*Para peticiones POST de subir fichero de foto utilizar form-data

### Autenticación JWT

POST /api/autenticacion

    PARAMETRO: localhost:3000/api/autenticacion

    se realiza un POST a la url con las KEY /VALUE

      email : admin@example.com
      password: 1234

    la API nos devuelve un Tokem valido
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCloI6IkpXVCJ9.eyJfaWQiOiI2MDg5MmY5ZTIzZTY1ZDUyODhlOTAwYjEiLCJpYXQiOjE2MjA1NDgwMzEsImV4cCI6MTYyMDU1NTIzMX0.nrl_gtzOGsjNn4ZAv5PfkTJnsWaXXHIZELwGLP1YWME"
      }

### Listar anuncios con autenticacion JWT:

GET // api/anuncios

    PARAMETRO:  http://localhost:3000/api/anuncios

    Headers KEY / VALUE

    Authorization:eyJhbGciOiJIUzI1NiIsInR5cCp6IkpXVCJ9.eyJfaWQiOiI2MDg5MmY5ZTIzZTY1ZDUyODhlOTAwYjEiLCJpYXQiOjE2MjA1NDgwMzEsImV4cCI6MTYyMDU1NTIzMX0.nrl_gtzOGsjNn4ZAv5PfkTJnsWaXXHIZELwGLP1YWME

- EJEMPLO DE RESPUESTA:

{
"data": [
{
"tags": [
"lifestyle",
"motor",
"articulos"
],
"\_id": "601ce2187469c608fc778b5b",
"nombre": "bicicleta",
"venta": true,
"precio": 230.15,
"foto": "bici.jpg",
"**v": 0
},
{
"tags": [
"lifestyle",
"mobile",
"articulos"
],
"\_id": "601ce2187469c608fc778b5c",
"nombre": "moto",
"venta": false,
"precio": 1650,
"foto": "moto.jpg",
"**v": 0
},
{
"tags": [
"lifestyle",
"automotion",
"articulos"
],
"\_id": "601ce2187469c608fc778b5d",
"nombre": "coche",
"venta": true,
"precio": 11650,
"foto": "cpche.jpg",
"**v": 0
},
{
"tags": [
"lifestyle",
"house",
"articulos"
],
"\_id": "601ce2187469c608fc778b5e",
"nombre": "cama",
"venta": false,
"precio": 650,
"foto": "cama.jpg",
"**v": 0
},
{
"tags": [
"programador",
"html",
"servicios",
"ccs"
],
"\_id": "601d13d8c53a9a24d0d8dfac",
"nombre": "maquetador",
"venta": false,
"precio": 500,
"foto": "anuncioCreago.img",
"**v": 0
},
{
"tags": [
"programador",
"node",
"servicios"
],
"\_id": "601d71ca2c91ea335c7b0dbc",
"nombre": "programador java",
"venta": false,
"precio": 50000,
"foto": "anuncioCreago.img",
"**v": 0
},
{
"tags": [
"programador",
"node"
],
"\_id": "601eb7687deab225e0baf12a",
"nombre": "anuncioCreado2",
"venta": true,
"precio": 5000,
"foto": "anuncioCreago.img",
"\_\_v": 0
}
]
}

### listar anuncios con posibilidad de paginacion

GET /apiv/anuncios

- PARÁMETROS :http://localhost:3000/api/anuncios?tags=articulos&sort&precio=100-50000&skip=2

Headers KEY / VALUE

    Authorization:eyJhbGciOiJIUzI1NiIsInR5cCp6IkpXVCJ9.eyJfaWQiOiI2MDg5MmY5ZTIzZTY1ZDUyODhlOTAwYjEiLCJpYXQiOjE2MjA1NDgwMzEsImV4cCI6MTYyMDU1NTIzMX0.nrl_gtzOGsjNn4ZAv5PfkTJnsWaXXHIZELwGLP1YWME

- EJEMPLO DE RESPUESTA:

{
"data": [
{
"tags": [
"lifestyle",
"automotion",
"articulos"
],
"\_id": "601ce2187469c608fc778b5d",
"nombre": "coche",
"venta": true,
"precio": 11650,
"foto": "cpche.jpg",
"**v": 0
},
{
"tags": [
"lifestyle",
"house",
"articulos"
],
"\_id": "601ce2187469c608fc778b5e",
"nombre": "cama",
"venta": false,
"precio": 650,
"foto": "cama.jpg",
"**v": 0
}
]
}

### Listar tag de anuncios existentes

GET /api/anuncios/tags

PARAMETRO: http://localhost:3000/api/anuncios/tags

Headers KEY / VALUE

    Authorization:eyJhbGciOiJIUzI1NiIsInR5cCp6IkpXVCJ9.eyJfaWQiOiI2MDg5MmY5ZTIzZTY1ZDUyODhlOTAwYjEiLCJpYXQiOjE2MjA1NDgwMzEsImV4cCI6MTYyMDU1NTIzMX0.nrl_gtzOGsjNn4ZAv5PfkTJnsWaXXHIZELwGLP1YWME

EJEMPLO DE RESOUESTA

[
"articulos",
"ccs",
"computacion",
"deport",
"elite",
"house",
"html",
"lifestyle",
"mobile",
"movilidad",
"node",
"programacion",
"programador",
"retro",
"servicios"
]

##### visualizacion de website

listado de anuncios , filtro, paginacion

GET / localhost:3000

PARÁMETROS ```http://localhost:3000/?tags=articulos&venta=true&precio=100-50000&limit=1

- EJEMPLO DE RESPUESTA

NODEPOP
Welcome to NODEPOP

articulo : bicicleta
venta : true
precio : 230.15
foto : bici.jpg
tags : lifestyle,motor,articulos

### Creacion de Anuncios con subida de imagen y tarea en background (thumbnails)

```
POST http://localhost:3000/api/anuncios
```

form-data

- PARÁMETROS

  nombre:
  venta:
  precio:
  foto:
  tag

- EJEMPLO DE RESPUESTA

{
"result": {
"tags": [
"articulos",
"computacion",
"programacion"
],
"\_id": "601ed34e84bd5d0c34d4d2b0",
"nombre": "ordenado",
"venta": true,
"precio": 500,
"foto": "ordenador.jpg",
"\_\_v": 0
}
}

### VISUALIZACION DE FOTOS

http://localhost:3000/images/anuncios/bici.jpg
