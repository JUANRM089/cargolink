# Diagramas UML — CargoLink

**Versión:** 1.0  
**Fecha:** Mayo 2026

---

## Diagramas incluidos

| Diagrama | Propósito |
|---|---|
| Casos de uso | Qué puede hacer cada actor en el sistema |
| Secuencia | Cómo interactúan los componentes en cada flujo |
| Clases | Estructura de entidades y sus relaciones |

---

## Diagrama 1 — Casos de uso

**Actores:** Cliente, Conductor, Admin

| Actor | Casos de uso |
|---|---|
| Todos | Registrarse, iniciar/cerrar sesión |
| Cliente | Crear solicitud, ver activas, ver historial, ver estado del servicio |
| Conductor | Registrar vehículo, ver disponibles, aceptar solicitud, actualizar estado |
| Admin | Ver todos los usuarios, ver todos los servicios |

**Relación include:** Iniciar sesión incluye siempre → validar token JWT

---

## Diagrama 2 — Secuencia: flujo principal

**Flujo:** Cliente crea solicitud → Conductor acepta → Conductor entrega

### Paso 1: Login
```
Cliente → Frontend: credenciales
Frontend → Backend: POST /auth/login
Backend → BD: SELECT usuario
BD → Backend: usuario encontrado
Backend → Frontend: JWT token
Frontend → Cliente: redirige al dashboard
```

### Paso 2: Cliente crea solicitud
```
Cliente → Frontend: llena formulario
Frontend → Backend: POST /solicitudes
Backend → BD: INSERT solicitud (estado: pendiente)
BD → Backend: solicitud_id
Backend → Frontend: 201 Created
Frontend → Cliente: solicitud creada ✓
```

### Paso 3: Conductor acepta
```
Conductor → Backend: GET /solicitudes/disponibles
Backend → BD: SELECT WHERE estado=pendiente AND conductor_id IS NULL
BD → Backend: lista de solicitudes
Conductor → Backend: PATCH /solicitudes/:id/aceptar
Backend → BD: UPDATE estado=en_camino, conductor_id=X
Backend → Conductor: servicio asignado ✓
```

### Paso 4: Cliente consulta estado
```
Cliente → Backend: GET /solicitudes/mias
Backend → BD: SELECT WHERE cliente_id=X
BD → Backend: solicitudes con estado actual
Backend → Cliente: muestra "en camino" + nombre conductor
```

### Paso 5: Conductor entrega
```
Conductor → Backend: PATCH /solicitudes/:id/entregar
Backend → BD: UPDATE estado=entregado
Backend → Conductor: servicio completado ✓
```

---

## Diagrama 3 — Clases

### Usuario
```
- id: UUID (PK)
- nombre: string
- email: string (unique)
- passwordHash: string
- rol: enum(cliente, conductor, admin)
- creadoEn: timestamp
+ registrarse()
+ iniciarSesion()
```

### Vehiculo
```
- id: UUID (PK)
- conductorId: UUID (FK → Usuario)
- placa: string (unique)
- tipo: string
- capacidadKg: integer
+ registrar()
+ actualizar()
```

### Solicitud
```
- id: UUID (PK)
- clienteId: UUID (FK → Usuario)
- conductorId: UUID (FK → Usuario, nullable)
- origen: string
- destino: string
- descripcion: string
- estado: enum(pendiente, en_camino, entregado)
- creadoEn: timestamp
+ crear()
+ aceptar()
+ actualizar()
```

### EstadoServicio
```
- id: UUID (PK)
- solicitudId: UUID (FK → Solicitud)
- estado: string
- registradoEn: timestamp
```

### Relaciones
- Usuario 1 → 0..* Solicitud (como cliente: crea)
- Usuario 1 → 0..* Solicitud (como conductor: acepta)
- Usuario 1 → 0..1 Vehiculo (tiene)
- Solicitud 1 → 1..* EstadoServicio (registra historial de estados)

---

## Endpoints identificados (para semana 2)

| Método | Ruta | Historia |
|---|---|---|
| POST | /auth/registro | HU-01 |
| POST | /auth/login | HU-02 |
| POST | /vehiculos | HU-04 |
| POST | /solicitudes | HU-05 |
| GET | /solicitudes/mias | HU-06 |
| GET | /solicitudes/disponibles | HU-07 |
| PATCH | /solicitudes/:id/aceptar | HU-08 |
| PATCH | /solicitudes/:id/entregar | HU-09 |
| GET | /admin/usuarios | HU-11 |
| GET | /admin/servicios | HU-12 |

