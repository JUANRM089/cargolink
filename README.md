# Documento de Alcance — CargoLink

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Aprobado
**Equipo:** Juan Jose (Desarrollador principal)

---

## 1. Descripción general

CargoLink es una plataforma web que conecta a personas o empresas que necesitan transportar carga con conductores de camiones disponibles en Colombia. Funciona de forma similar a aplicaciones de transporte de personas, pero orientada al sector de carga y logística. El cliente publica una solicitud indicando el origen, el destino y el tipo de carga; los conductores disponibles pueden verla y aceptarla. La plataforma registra el estado del servicio desde que se crea hasta que la carga es entregada.

---

## 2. Problema que resuelve

El transporte de carga en Colombia, especialmente para pequeñas y medianas empresas, sigue siendo un proceso informal. Los clientes consiguen camiones a través de contactos personales, llamadas o grupos de WhatsApp, sin visibilidad del estado del envío ni garantías del servicio. Los conductores independientes, por su parte, dependen de intermediarios o de la suerte para conseguir trabajo.

CargoLink busca digitalizar este proceso, dando visibilidad, trazabilidad y acceso directo entre quien necesita el transporte y quien lo ofrece.

---

## 3. Objetivos del proyecto

### Objetivo general

Desarrollar un MVP funcional de una plataforma web que permita a clientes solicitar servicios de transporte de carga y a conductores aceptar y gestionar esos servicios, en un plazo de 4 semanas.

### Objetivos específicos

- Implementar un sistema de autenticación para tres roles: cliente, conductor y administrador.
- Permitir al cliente crear, visualizar y hacer seguimiento de solicitudes de carga.
- Permitir al conductor ver solicitudes disponibles, aceptar una y actualizar su estado.
- Construir un panel de administración básico para monitorear usuarios y servicios activos.
- Desplegar la aplicación en un servidor accesible por internet al finalizar la semana 4.

---

## 4. Alcance funcional (lo que SÍ se construye)


| Módulo               | Funcionalidades incluidas                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Autenticación        | Registro con nombre, email y contraseña · Inicio de sesión · Cierre de sesión · Diferenciación de roles (cliente / conductor / admin) |
| Perfil del conductor | Registro de datos del vehículo: placa, tipo de camión, capacidad en kg                                                                |
| Solicitudes          | Creación de solicitud con origen, destino y descripción de carga · Vista de solicitudes activas e historial del cliente               |
| Matching             | Vista de solicitudes disponibles para el conductor · Aceptación de solicitud (queda bloqueada para otros conductores)                 |
| Seguimiento          | Actualización de estado por el conductor: pendiente → en camino → entregado · Vista del estado actualizado para el cliente            |
| Panel admin          | Vista de todos los usuarios registrados con su rol · Vista de todos los servicios y sus estados actuales                              |


---

## 5. No-scope (lo que NO se construye en este MVP)

Las siguientes funcionalidades quedan explícitamente excluidas y documentadas para versiones futuras:


| Funcionalidad                        | Razón de exclusión                                                           |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| Pagos en línea                       | Requiere integración con pasarela de pago y validaciones legales adicionales |
| Chat entre cliente y conductor       | Aumenta complejidad del backend más allá del alcance del MVP                 |
| Calificaciones y reseñas             | Requiere lógica adicional post-servicio                                      |
| Notificaciones push o por email      | Requiere integración con servicio externo                                    |
| Aplicación móvil (iOS / Android)     | El MVP es exclusivamente web                                                 |
| Geolocalización en tiempo real (GPS) | El tracking del MVP es por estados manuales                                  |
| Múltiples idiomas                    | Solo español colombiano                                                      |
| Sistema de facturación               | Fuera del MVP                                                                |


---

## 6. Restricciones


| Restricción       | Detalle                                               |
| ----------------- | ----------------------------------------------------- |
| Tiempo            | 4 semanas calendario, 1 semana por módulo             |
| Equipo            | 1 a 2 personas, sin roles especializados separados    |
| Presupuesto       | $0 — todo el stack debe funcionar en capa gratuita    |
| Plataforma        | Web únicamente, compatible con Chrome, Firefox y Edge |
| Infraestructura   | Despliegue en Railway o Render (plan gratuito)        |
| Stack tecnológico | React.js · Node.js + Express · PostgreSQL · JWT       |


---

## 7. Stakeholders


| Stakeholder          | Rol en el sistema                      | Interés principal                                          |
| -------------------- | -------------------------------------- | ---------------------------------------------------------- |
| Cliente              | Usuario final que solicita el servicio | Encontrar conductor rápido y hacer seguimiento de su carga |
| Conductor            | Usuario final que presta el servicio   | Conseguir trabajo sin intermediarios                       |
| Administrador        | Rol interno durante el MVP             | Monitorear que el sistema funcione correctamente           |
| Equipo de desarrollo | Constructor del producto               | Aprender prácticas del proyecto grande y construir el MVP  |


---

## 8. Criterios de aceptación del MVP

El proyecto se considera terminado cuando:

- Un usuario puede registrarse e iniciar sesión con cualquiera de los tres roles.
- Un cliente puede crear una solicitud de carga y ver su estado.
- Un conductor puede ver solicitudes disponibles, aceptar una y actualizarla a "entregado".
- Un admin puede ver la lista de usuarios y servicios desde su panel.
- La aplicación está desplegada en internet y accesible desde un navegador.
- El repositorio en GitHub tiene un README claro con instrucciones para correr el proyecto.