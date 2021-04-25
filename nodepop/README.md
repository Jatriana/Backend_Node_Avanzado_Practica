# Nodepop

Aplicación que devuelve el listado de anuncios para ser mostrados desde cualquier cliente (iOS, Android, web, etc). Además gestiones el registro

## Instalacion

La aplicación está desarrollada sobre la versión de Node v14.15.2

Una vez clonado no colocarnos en el raiz del proyecto y ejecutamos ejecutar  ``` npm install ```

Arranca la  aplicación por defecto en el puerto 3000:

copiar .env.example  en .env revisar la configuracion

````sh
cp -i .env.example .env
````


### inicializar la BBDD 

```
npm run installDB
```

### Arranque de la aplicación en modo desarrollador: 

```
npm run dev
```
### Arranque de la  aplicación : 

```
npm start
```


***

### Documentación de uso:


Operaciones que debe realizar el API a crear:
- Lista de anuncios con posibilidad de paginación. Con filtros por tag, tipo de anuncio
(venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo

- Lista de tags existentes
- Creación de anuncio

*Para peticiones POST utilizar x-www-form-urlencoded*

### Listar anuncios:

GET // api/anuncios

    PARAMETRO:  http://localhost:3000/api/anuncios

* EJEMPLO DE RESPUESTA:

{
  "data": [
    {
      "tags": [
        "lifestyle",
        "motor",
        "articulos"
      ],
      "_id": "601ce2187469c608fc778b5b",
      "nombre": "bicicleta",
      "venta": true,
      "precio": 230.15,
      "foto": "bici.jpg",
      "__v": 0
    },
    {
      "tags": [
        "lifestyle",
        "mobile",
        "articulos"
      ],
      "_id": "601ce2187469c608fc778b5c",
      "nombre": "moto",
      "venta": false,
      "precio": 1650,
      "foto": "moto.jpg",
      "__v": 0
    },
    {
      "tags": [
        "lifestyle",
        "automotion",
        "articulos"
      ],
      "_id": "601ce2187469c608fc778b5d",
      "nombre": "coche",
      "venta": true,
      "precio": 11650,
      "foto": "cpche.jpg",
      "__v": 0
    },
    {
      "tags": [
        "lifestyle",
        "house",
        "articulos"
      ],
      "_id": "601ce2187469c608fc778b5e",
      "nombre": "cama",
      "venta": false,
      "precio": 650,
      "foto": "cama.jpg",
      "__v": 0
    },
    {
      "tags": [
        "programador",
        "html",
        "servicios",
        "ccs"
      ],
      "_id": "601d13d8c53a9a24d0d8dfac",
      "nombre": "maquetador",
      "venta": false,
      "precio": 500,
      "foto": "anuncioCreago.img",
      "__v": 0
    },
    {
      "tags": [
        "programador",
        "node",
        "servicios"
      ],
      "_id": "601d71ca2c91ea335c7b0dbc",
      "nombre": "programador java",
      "venta": false,
      "precio": 50000,
      "foto": "anuncioCreago.img",
      "__v": 0
    },
    {
      "tags": [
        "programador",
        "node"
      ],
      "_id": "601eb7687deab225e0baf12a",
      "nombre": "anuncioCreado2",
      "venta": true,
      "precio": 5000,
      "foto": "anuncioCreago.img",
      "__v": 0
    }
  ]
}

### listar anuncios con posibilidad de paginacion

GET  /apiv/anuncios

* PARÁMETROS :http://localhost:3000/api/anuncios?tags=articulos&sort&precio=100-50000&skip=2


	

* EJEMPLO DE RESPUESTA:

{
  "data": [
    {
      "tags": [
        "lifestyle",
        "automotion",
        "articulos"
      ],
      "_id": "601ce2187469c608fc778b5d",
      "nombre": "coche",
      "venta": true,
      "precio": 11650,
      "foto": "cpche.jpg",
      "__v": 0
    },
    {
      "tags": [
        "lifestyle",
        "house",
        "articulos"
      ],
      "_id": "601ce2187469c608fc778b5e",
      "nombre": "cama",
      "venta": false,
      "precio": 650,
      "foto": "cama.jpg",
      "__v": 0
    }
  ]
}

### Listar tag de anuncios existentes


GET /api/anuncios/tags

  PARAMETRO: http://localhost:3000/api/anuncios/tags

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


* EJEMPLO DE RESPUESTA


NODEPOP
Welcome to NODEPOP

articulo : bicicleta
venta : true
precio : 230.15
foto : bici.jpg
tags : lifestyle,motor,articulos


### Creacion de Anuncios


```
POST http://localhost:3000/api/anuncios
```

* PARÁMETROS 

    nombre:
    venta:
    precio:
    foto:
    tag

	



* EJEMPLO DE RESPUESTA


{
    "result": {
        "tags": [
            "articulos",
            "computacion",
            "programacion"
        ],
        "_id": "601ed34e84bd5d0c34d4d2b0",
        "nombre": "ordenado",
        "venta": true,
        "precio": 500,
        "foto": "ordenador.jpg",
        "__v": 0
    }
}

#### VISUALIZACION DE FOTOS 

http://localhost:3000/images/anuncios/bici.jpg
