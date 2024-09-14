# Supermercados en Ciudades - API

## Descripción

Este proyecto tiene como objetivo crear un sistema de consulta de la oferta de supermercados en distintas ciudades. La aplicación permite gestionar ciudades, supermercados y las relaciones entre ellos. Se utiliza **Nest.js** como framework para construir una API RESTful que permite realizar operaciones CRUD para estas entidades y gestionar sus asociaciones.

## Enunciado del Proyecto

El propósito de esta aplicación es desarrollar un sistema para consultar la oferta de supermercados en distintas ciudades. A continuación se detallan los puntos claves del proyecto:

### Punto 1. Persistencia (6%)

1. Crear la entidad **Ciudad** en el módulo correspondiente. Una ciudad tiene los siguientes atributos:
   - `nombre`: Nombre de la ciudad.
   - `país`: País al que pertenece la ciudad.
   - `número de habitantes`: Población de la ciudad.

2. Crear la entidad **Supermercado** en el módulo correspondiente. Un supermercado tiene los siguientes atributos:
   - `nombre`: Nombre del supermercado.
   - `longitud`: Coordenada de longitud.
   - `latitud`: Coordenada de latitud.
   - `página web`: URL del sitio web del supermercado.

3. Definir la relación muchos a muchos entre **Ciudad** y **Supermercado**:
   - Una ciudad puede tener varios supermercados.
   - Un supermercado puede tener varias sedes en distintas ciudades.

### Punto 2. Lógica (43%)

1. Implementar la lógica CRUD para las entidades **Ciudad** y **Supermercado**:
   - `findAll`: Obtener todos los registros.
   - `findOne`: Obtener un registro por su ID.
   - `create`: Crear un nuevo registro (con validaciones).
   - `update`: Actualizar un registro (con validaciones).
   - `delete`: Eliminar un registro.

2. Implementar validaciones:
   - **Ciudad**: El país debe estar entre los siguientes valores: `Argentina`, `Ecuador`, `Paraguay`.
   - **Supermercado**: El nombre debe tener al menos 10 caracteres.

3. Implementar los métodos para la gestión de la relación entre **Ciudad** y **Supermercado**:
   - `addSupermarketToCity`: Asociar un supermercado a una ciudad.
   - `findSupermarketsFromCity`: Obtener los supermercados de una ciudad.
   - `findSupermarketFromCity`: Obtener un supermercado específico de una ciudad.
   - `updateSupermarketsFromCity`: Actualizar los supermercados de una ciudad.
   - `deleteSupermarketFromCity`: Eliminar un supermercado de una ciudad.

### Punto 3. API (24%)

1. Crear los controladores para **Ciudad** y **Supermercado** con los endpoints REST correspondientes:
   - `/cities`: Gestionar las ciudades.
   - `/supermarkets`: Gestionar los supermercados.

2. Crear el controlador para gestionar la relación **Ciudad-Supermercado**, con rutas como `/cities/:cityId/supermarkets/:supermarketId`.

### Punto 4. Pruebas de Postman (27%)

1. Definir colecciones en Postman para realizar pruebas:
   - Pruebas de creación, obtención, actualización y eliminación para las entidades **Ciudad** y **Supermercado**.
   - Pruebas para la relación entre ambas entidades (asociar, obtener, actualizar y eliminar supermercados de una ciudad).

## Requisitos

- [Node.js](https://nodejs.org/) v14 o superior
- [Nest.js](https://nestjs.com/) v7 o superior
- Base de datos (SQLite, MySQL, PostgreSQL, etc.) según la configuración.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/WillyBallesteros/SupermarketOffer.git
   



