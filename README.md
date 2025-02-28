# Classroom project

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

## Requisitos

* Docker (si deseas realizar modificaciones)
* Docker Compose

## Configuración y ejecución del Backend

1.  **Navega al directorio `backend`**:

    ```bash
    cd Backend-Vinateria
    ```

2.  **Ejecuta Docker Compose**:

    ```bash
    docker-compose up -d
    ```

    **Explicación de las imágenes utilizadas:**

    * Este proyecto utiliza dos imágenes Docker para el backend:
        * **PostgreSQL (db):** La imagen `postgres:13` se descarga automáticamente de Docker Hub. Esta imagen proporciona la base de datos PostgreSQL necesaria para el proyecto.
        * **Aplicación Spring Boot (app):** La imagen `enemyemy01/back_services_crud:latest` se descarga automáticamente de Docker Hub. Esta imagen contiene la aplicación Spring Boot compilada y empaquetada.
        * **Nota importante**: Si se desea modificar la imagen de la aplicación Spring Boot, se debe modificar el Dockerfile existente en el directorio backend y construir la imagen, y subirla a docker hub, ya que el docker compose hace referencia a la imagen que se encuentra en docker hub.

    **Detalles del `docker-compose.yml`:**

    * El archivo `compose.yml` define los servicios `db` (PostgreSQL) y `app` (tu aplicación Spring Boot).
    * `depends_on: db` asegura que el servicio `db` se inicie antes que el servicio `app`.
    * Se configura una red llamada `mi-red` para que los contenedores puedan comunicarse entre sí.
    * Se configuran las variables de entorno necesarias para la conexión a la base de datos.

## Configuración y ejecución del Frontend


1.  **Navega al directorio `frontend`**:

    ```bash
    cd Frontend-Vinateria
    ```

2.  **Instala las dependencias**:

    ```bash
    npm install
    ```

3.  **Ejecuta el frontend**:

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo del frontend. Deberías poder acceder a la aplicación en tu navegador en `http://localhost:3000` (o el puerto que esté configurado en tu proyecto).

## Consideraciones Adicionales

* Asegúrate de tener una conexión a Internet para que Docker Compose pueda descargar las imágenes de Docker Hub.
* Si necesitas modificar la configuración de la base de datos o de la aplicación, consulta el archivo `compose.yml` y los archivos de configuración de tu aplicación Spring Boot.
* Si se quiere modificar la imagen de la aplicación Spring Boot, se debe modificar el Dockerfile existente en el directorio backend y construir la imagen, y subirla a docker hub.
