# 🚇 SubteBoard - Estado en Tiempo Real

Una aplicación web interactiva que visualiza el estado y la frecuencia de la red de Subterráneos de Buenos Aires en tiempo real, utilizando datos oficiales y una estética de terminal de control.

![Snapshot del Proyecto](URL_DE_UNA_CAPTURA_DE_PANTALLA)

## 🌟 Características

* **Tablero de Arribos:** Tiempos de llegada calculados en tiempo real.
* **Mapa Interactivo:** Visualización geográfica de las estaciones mediante  OpenStreetMap
  [OSM](https://www.openstreetmap.org/)
* **Estética Retro:** Interfaz diseñada con temática de terminal de datos (inspirada en los tableros de control ferroviario).
* **Indicador de Actualización:** Sistema de alerta que informa la última actualización de los datos para garantizar transparencia.

## 🛠️ Stack Tecnológico

* **React + Vite:** Para una interfaz rápida y reactiva.
* **Vercel Rewrites:** Configuración de proxy inverso para gestionar peticiones a la API oficial evitando problemas de CORS.
* **CSS Moderno:** Uso de filtros y animaciones para la estética "terminal".

## 📊 Fuente de Datos

Este proyecto utiliza el **Programa de Datos Abiertos de la Ciudad de Buenos Aires**.
* API: [Transporte GTFS Realtime](https://buenosaires.gob.ar/gcaba_historico/infraestructura/movilidad/api-transporte)
* Formato: Protocol Buffers / JSON.



## 📝 Nota sobre el Proyecto

 **Atención:** El portal oficial indica que se está trabajando en una nueva versión de la API (aunque este aviso data de hace 2 años). En la práctica, esto se traduce en que actualmente no hay información disponible para las **Líneas C y H**.

 Desarrollé este proyecto porque me encanta escribir código que sea de utilidad pública. Creo en el valor de los **Datos Abiertos** y en crear herramientas que permitan a los usuarios verificar si la información oficial es fidedigna, demostrando el potencial que tiene la tecnología cuando se pone al servicio de la gente.


## 🚀 Instalación y Desarrollo

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/TU_USUARIO/tu-repositorio.git](https://github.com/TU_USUARIO/tu-repositorio.git)