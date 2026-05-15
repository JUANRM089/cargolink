# Historias de usuario — CargoLink

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Total de historias:** 12

---

## Formato

Cada historia sigue la estructura:
```
Como [rol], quiero [acción], para [beneficio].
```
Con criterios de aceptación verificables.

---

## Módulo 1 — Autenticación

### HU-01 — Registro de usuario
**Rol:** Visitante

Como visitante, quiero registrarme con mi nombre, email, contraseña y rol (cliente o conductor), para poder acceder a las funcionalidades de la plataforma.

**Criterios de aceptación:**
- [ ] El formulario solicita nombre, email, contraseña y selección de rol
- [ ] Si el email ya existe, muestra un mensaje de error claro
- [ ] La contraseña se almacena encriptada (nunca en texto plano)
- [ ] Tras registrarse exitosamente, redirige al dashboard según el rol
- [ ] Si algún campo está vacío, no permite enviar el formulario

---

### HU-02 — Inicio de sesión
**Rol:** Usuario registrado

Como usuario registrado, quiero iniciar sesión con mi email y contraseña, para acceder a mi cuenta y ver mis funcionalidades según mi rol.

**Criterios de aceptación:**
- [ ] El sistema valida email y contraseña correctamente
- [ ] Si las credenciales son incorrectas, muestra mensaje de error sin especificar cuál campo falló
- [ ] Al ingresar, redirige al dashboard del rol correspondiente
- [ ] La sesión se mantiene activa usando JWT
- [ ] Hay un botón de cerrar sesión visible en el dashboard

---

### HU-03 — Cierre de sesión
**Rol:** Usuario autenticado

Como usuario autenticado, quiero cerrar mi sesión, para proteger mi cuenta cuando termino de usar la plataforma.

**Criterios de aceptación:**
- [ ] Al cerrar sesión, el token JWT se invalida en el cliente
- [ ] Redirige automáticamente a la página de inicio de sesión
- [ ] No se puede acceder a rutas protegidas después de cerrar sesión

---

## Módulo 2 — Perfil del conductor

### HU-04 — Registro de vehículo
**Rol:** Conductor

Como conductor recién registrado, quiero agregar los datos de mi vehículo (placa, tipo de camión y capacidad), para aparecer disponible en la plataforma y recibir solicitudes de carga.

**Criterios de aceptación:**
- [ ] El formulario solicita placa, tipo de vehículo y capacidad en kg
- [ ] La placa debe tener formato válido colombiano (ej. ABC-123)
- [ ] Un conductor sin vehículo registrado no puede ver solicitudes disponibles
- [ ] Los datos del vehículo se pueden editar después de registrarlos

---

## Módulo 3 — Solicitudes

### HU-05 — Crear solicitud de carga
**Rol:** Cliente

Como cliente, quiero crear una solicitud indicando origen, destino y descripción de la carga, para encontrar un conductor disponible que la transporte.

**Criterios de aceptación:**
- [ ] El formulario solicita ciudad de origen, ciudad de destino y descripción de la carga
- [ ] Todos los campos son obligatorios
- [ ] Al crear la solicitud, queda en estado "pendiente" automáticamente
- [ ] El cliente ve la solicitud recién creada en su lista de servicios activos
- [ ] No se puede crear una solicitud si ya tiene una en estado "pendiente" o "en camino"

---

### HU-06 — Ver solicitudes activas e historial
**Rol:** Cliente

Como cliente, quiero ver mis solicitudes activas y el historial de servicios anteriores, para hacer seguimiento de mis envíos y consultar información pasada.

**Criterios de aceptación:**
- [ ] Las solicitudes activas (pendiente, en camino) aparecen separadas del historial
- [ ] Cada solicitud muestra origen, destino, estado actual y fecha de creación
- [ ] El historial muestra solicitudes con estado "entregado" o "cancelado"
- [ ] Si no hay solicitudes, muestra un mensaje invitando a crear la primera

---

## Módulo 4 — Matching

### HU-07 — Ver solicitudes disponibles
**Rol:** Conductor

Como conductor, quiero ver las solicitudes de carga que aún no tienen conductor asignado, para elegir cuál aceptar según mi disponibilidad y ubicación.

**Criterios de aceptación:**
- [ ] Solo aparecen solicitudes en estado "pendiente" (sin conductor asignado)
- [ ] Cada solicitud muestra origen, destino y descripción de la carga
- [ ] Si no hay solicitudes disponibles, muestra un mensaje indicándolo
- [ ] Un conductor con servicio activo no puede ver nuevas solicitudes

---

### HU-08 — Aceptar una solicitud
**Rol:** Conductor

Como conductor, quiero aceptar una solicitud de carga disponible, para quedar asignado al servicio y comenzar a gestionarlo.

**Criterios de aceptación:**
- [ ] Al aceptar, la solicitud cambia de estado "pendiente" a "en camino"
- [ ] La solicitud desaparece de la lista de disponibles para otros conductores
- [ ] El cliente ve en su seguimiento que ya hay un conductor asignado
- [ ] Si dos conductores intentan aceptar la misma solicitud al mismo tiempo, solo uno lo logra

---

## Módulo 5 — Seguimiento

### HU-09 — Actualizar estado del servicio
**Rol:** Conductor

Como conductor, quiero actualizar el estado de mi servicio activo a "entregado", para informar al cliente que la carga llegó a su destino.

**Criterios de aceptación:**
- [ ] El conductor puede marcar el servicio como "entregado" desde su dashboard
- [ ] Al marcar como entregado, el servicio pasa al historial de ambos
- [ ] No se puede revertir un servicio ya marcado como "entregado"
- [ ] El cliente ve el cambio de estado reflejado en su vista

---

### HU-10 — Ver estado del servicio
**Rol:** Cliente

Como cliente, quiero ver el estado actualizado de mi solicitud, para saber si mi carga está pendiente, en camino o ya fue entregada.

**Criterios de aceptación:**
- [ ] El estado visible es uno de tres: pendiente, en camino, entregado
- [ ] El estado se actualiza al recargar la página
- [ ] Se muestra el nombre del conductor asignado una vez aceptada la solicitud

---

## Módulo 6 — Panel admin

### HU-11 — Ver todos los usuarios
**Rol:** Admin

Como admin, quiero ver la lista completa de usuarios registrados con su rol y fecha de registro, para tener control y visibilidad sobre quién usa la plataforma.

**Criterios de aceptación:**
- [ ] La lista muestra nombre, email, rol y fecha de registro
- [ ] Se puede filtrar por rol (cliente / conductor)
- [ ] Solo el rol admin puede acceder a esta vista

---

### HU-12 — Ver todos los servicios
**Rol:** Admin

Como admin, quiero ver todos los servicios registrados en la plataforma con su estado actual, para monitorear la operación y detectar anomalías.

**Criterios de aceptación:**
- [ ] La lista muestra origen, destino, estado, cliente y conductor asignado
- [ ] Se puede filtrar por estado (pendiente / en camino / entregado)
- [ ] Solo el rol admin puede acceder a esta vista

---

## Resumen

| ID | Historia | Rol | Módulo |
|---|---|---|---|
| HU-01 | Registro de usuario | Visitante | Autenticación |
| HU-02 | Inicio de sesión | Usuario registrado | Autenticación |
| HU-03 | Cierre de sesión | Usuario autenticado | Autenticación |
| HU-04 | Registro de vehículo | Conductor | Perfil |
| HU-05 | Crear solicitud de carga | Cliente | Solicitudes |
| HU-06 | Ver historial de servicios | Cliente | Solicitudes |
| HU-07 | Ver solicitudes disponibles | Conductor | Matching |
| HU-08 | Aceptar solicitud | Conductor | Matching |
| HU-09 | Actualizar estado del servicio | Conductor | Seguimiento |
| HU-10 | Ver estado del servicio | Cliente | Seguimiento |
| HU-11 | Ver todos los usuarios | Admin | Panel admin |
| HU-12 | Ver todos los servicios | Admin | Panel admin |
