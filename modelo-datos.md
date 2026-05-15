# Modelo de datos — CargoLink

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Motor de base de datos:** PostgreSQL

---

## Tablas

### usuarios
| Columna | Tipo | Restricción | Descripción |
|---|---|---|---|
| id | UUID | PK | Identificador único |
| nombre | TEXT | NOT NULL | Nombre completo |
| email | TEXT | NOT NULL, UNIQUE | Correo electrónico |
| password_hash | TEXT | NOT NULL | Contraseña encriptada con bcrypt |
| rol | TEXT | NOT NULL | Valores: cliente, conductor, admin |
| creado_en | TIMESTAMP | DEFAULT NOW() | Fecha de registro |

---

### vehiculos
| Columna | Tipo | Restricción | Descripción |
|---|---|---|---|
| id | UUID | PK | Identificador único |
| conductor_id | UUID | FK → usuarios(id) | El conductor dueño del vehículo |
| placa | TEXT | NOT NULL, UNIQUE | Placa del vehículo |
| tipo | TEXT | NOT NULL | Tipo: camión, camioneta, tractomula, etc. |
| capacidad_kg | INTEGER | NOT NULL | Capacidad de carga en kilogramos |

---

### solicitudes
| Columna | Tipo | Restricción | Descripción |
|---|---|---|---|
| id | UUID | PK | Identificador único |
| cliente_id | UUID | FK → usuarios(id), NOT NULL | Cliente que creó la solicitud |
| conductor_id | UUID | FK → usuarios(id), NULLABLE | Conductor asignado (null si pendiente) |
| origen | TEXT | NOT NULL | Ciudad o dirección de origen |
| destino | TEXT | NOT NULL | Ciudad o dirección de destino |
| descripcion | TEXT | | Descripción de la carga |
| estado | TEXT | NOT NULL, DEFAULT 'pendiente' | pendiente, en_camino, entregado |
| creado_en | TIMESTAMP | DEFAULT NOW() | Fecha de creación |

---

### estados_servicio
| Columna | Tipo | Restricción | Descripción |
|---|---|---|---|
| id | UUID | PK | Identificador único |
| solicitud_id | UUID | FK → solicitudes(id), NOT NULL | Solicitud a la que pertenece |
| estado | TEXT | NOT NULL | Estado registrado en ese momento |
| registrado_en | TIMESTAMP | DEFAULT NOW() | Cuándo ocurrió el cambio |

---

## Relaciones

| Relación | Cardinalidad | Descripción |
|---|---|---|
| usuarios → solicitudes (cliente) | 1:N | Un cliente crea muchas solicitudes |
| usuarios → solicitudes (conductor) | 1:N | Un conductor acepta muchas solicitudes |
| usuarios → vehiculos | 1:0..1 | Un conductor tiene a lo sumo un vehículo |
| solicitudes → estados_servicio | 1:N | Una solicitud registra muchos cambios de estado |

---

## SQL de creación de tablas

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE usuarios (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  rol           TEXT NOT NULL CHECK (rol IN ('cliente', 'conductor', 'admin')),
  creado_en     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vehiculos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conductor_id UUID NOT NULL REFERENCES usuarios(id),
  placa        TEXT NOT NULL UNIQUE,
  tipo         TEXT NOT NULL,
  capacidad_kg INTEGER NOT NULL
);

CREATE TABLE solicitudes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id   UUID NOT NULL REFERENCES usuarios(id),
  conductor_id UUID REFERENCES usuarios(id),
  origen       TEXT NOT NULL,
  destino      TEXT NOT NULL,
  descripcion  TEXT,
  estado       TEXT NOT NULL DEFAULT 'pendiente'
               CHECK (estado IN ('pendiente', 'en_camino', 'entregado')),
  creado_en    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE estados_servicio (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes(id),
  estado       TEXT NOT NULL,
  registrado_en TIMESTAMP DEFAULT NOW()
);
```

---

## Decisiones de diseño

- Se usa UUID en lugar de INTEGER autoincremental para facilitar el escalado futuro
- La contraseña nunca se guarda en texto plano, solo el hash de bcrypt
- `conductor_id` en solicitudes es nullable: nulo = solicitud sin conductor asignado
- La tabla `estados_servicio` permite auditar todos los cambios de estado de cada servicio
- Se usan constraints CHECK para garantizar que los valores de enums sean válidos
