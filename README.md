# Emark GM — Tienda Virtual de Repuestos para Maquinaria Pesada

Proyecto web universitario desarrollado con arquitectura **MVC estricta** y principios **SOLID**, implementado en **Java 21**, **Spring Boot**, **Spring Security**, **Spring Data JDBC** y **PostgreSQL**.

---

## 🏛️ Arquitectura MVC

El proyecto sigue el patrón **Modelo-Vista-Controlador**. Cada capa del MVC tiene su propia carpeta en el paquete raíz `com.example.emarkGM`, de modo que la estructura del proyecto **es** la estructura del MVC:

| Capa MVC | Paquete Java | Carpeta de recursos | Responsabilidad |
| :--- | :--- | :--- | :--- |
| **C** — Controlador | `controlador/` | — | Expone los endpoints REST, valida la petición y coordina la respuesta. |
| **M** — Modelo | `modelo/` | — | Dominio, persistencia y contratos de datos (entidades, repositorios, DTO y servicios). |
| **V** — Vista | `vista/` | `resources/vista/` | Presenta la interfaz al usuario (HTML, CSS, JS) y publica sus rutas. |

La capa **Controlador** se subdivide según su rol, igual que en un proyecto MVC clásico:

| Subpaquete | Contenido |
| :--- | :--- |
| `controlador/api/` | Los endpoints REST de la tienda (`/api/...`). |
| `controlador/config/` | Configuración técnica: seguridad RBAC + JWT, CORS, BCrypt y el filtro de token. |
| `controlador/vista/` | Rutas amigables que muestran cada página HTML de la tienda. |

Y la capa **Modelo** agrupa todo lo que representa y manipula datos:

| Subpaquete | Contenido |
| :--- | :--- |
| `modelo/entidad/` | Las 5 entidades mapeadas a las tablas de PostgreSQL. |
| `modelo/repositorio/` | Persistencia ligera con Spring Data JDBC. |
| `modelo/solicitud/` | DTOs de entrada (lo que el cliente envía). |
| `modelo/respuesta/` | DTOs de salida (lo que el servidor devuelve). |
| `modelo/servicio/` | Lógica de negocio (interfaz + implementación de cada servicio). |

### Flujo de una petición

```
Navegador
   │  (V)  resources/vista/*.html  +  js/app.js
   ▼
controlador/api/  (ControladorAutenticacion, ControladorProducto, ...)   ← [C]
   │  invoca
   ▼
modelo/servicio/  (ServicioAutenticacion, ServicioProducto, ...)          ← lógica de negocio
   │  usa
   ▼
modelo/repositorio/  (RepositorioUsuario, RepositorioProducto, ...)       ← [M]
   │
   ▼
PostgreSQL
```

---

## 📁 Estructura del Proyecto

```
EMARK_GM_web/
├── pom.xml                                   # Configuración de dependencias Maven
├── mvnw / mvnw.cmd                           # Maven Wrapper portable
├── src/
│   ├── main/
│   │   ├── java/com/example/emarkGM/
│   │   │   ├── AplicacionEmarkGm.java        # Clase principal de arranque de Spring Boot
│   │   │   │
│   │   │   ├── controlador/                  # [C] CONTROLADOR
│   │   │   │   ├── api/                      # Endpoints REST de la tienda
│   │   │   │   │   ├── ControladorAutenticacion.java  # /api/autenticacion (inicio de sesión y registro)
│   │   │   │   │   ├── ControladorProducto.java      # /api/productos (Catálogo y gestión)
│   │   │   │   │   ├── ControladorCategoria.java     # /api/categorias (Categorías)
│   │   │   │   │   └── ControladorPedido.java        # /api/pedidos (Compra y pedidos)
│   │   │   │   ├── config/                   # Configuración técnica
│   │   │   │   │   ├── ConfiguracionSeguridad.java   # Autorización RBAC y CORS
│   │   │   │   │   ├── FiltroAutenticacionJwt.java  # Filtro de validación del token JWT
│   │   │   │   │   └── ConfiguracionAplicacion.java  # PasswordEncoder (BCrypt)
│   │   │   │   └── vista/                    # Rutas amigables hacia cada página HTML
│   │   │   │       └── ControladorVista.java
│   │   │   │
│   │   │   ├── modelo/                       # [M] MODELO
│   │   │   │   ├── entidad/                  # Entidades mapeadas a PostgreSQL
│   │   │   │   │   ├── Usuario.java              # Tabla 'usuarios'
│   │   │   │   │   ├── Categoria.java            # Tabla 'categorias'
│   │   │   │   │   ├── Producto.java             # Tabla 'productos'
│   │   │   │   │   ├── Pedido.java               # Tabla 'pedidos'
│   │   │   │   │   └── DetallePedido.java        # Tabla 'detalle_pedidos'
│   │   │   │   ├── repositorio/              # Persistencia ligera (Spring Data JDBC)
│   │   │   │   │   ├── RepositorioUsuario.java
│   │   │   │   │   ├── RepositorioCategoria.java
│   │   │   │   │   ├── RepositorioProducto.java
│   │   │   │   │   └── RepositorioPedido.java
│   │   │   │   ├── solicitud/                # DTOs de entrada (petición del cliente)
│   │   │   │   │   ├── SolicitudInicioSesion.java
│   │   │   │   │   ├── SolicitudRegistro.java
│   │   │   │   │   ├── SolicitudProducto.java
│   │   │   │   │   └── SolicitudCompra.java
│   │   │   │   ├── respuesta/                # DTOs de salida (respuesta del servidor)
│   │   │   │   │   ├── RespuestaAutenticacion.java
│   │   │   │   │   └── RespuestaConfirmacionPedido.java
│   │   │   │   └── servicio/                 # Lógica de negocio (interfaz + implementación)
│   │   │   │       ├── ServicioAutenticacion.java / ServicioAutenticacionImpl.java
│   │   │   │       ├── ServicioProducto.java / ServicioProductoImpl.java
│   │   │   │       ├── ServicioCategoria.java / ServicioCategoriaImpl.java
│   │   │   │       ├── ServicioPedido.java / ServicioPedidoImpl.java
│   │   │   │       └── ServicioJwt.java / ServicioJwtImpl.java
│   │   │   │
│   │   │   └── vista/                       # [V] VISTA
│   │   │       └── ConfiguracionVista.java    # Publica los recursos de interfaz en la raíz web
│   │   │
│   │   └── resources/
│   │       ├── application.properties        # Configuración de base de datos y JWT
│   │       ├── schema.sql                    # Definición DDL de tablas e índices
│   │       ├── data.sql                      # Semilla de datos iniciales (Admin, Cliente, Catálogo)
│   │       │
│   │       └── vista/                        # [V] VISTA: archivos de interfaz (HTML, CSS, JS)
│   │           ├── index.html                # Vista de Inicio con login/registro
│   │           ├── catalogo.html             # Vista de Catálogo de repuestos con filtros
│   │           ├── carrito.html              # Vista de Cotizador y Checkout simulado
│   │           ├── admin.html                # Vista de Panel Administrativo (CRUD)
│   │           ├── css/                      # Hojas de estilo
│   │           ├── js/app.js                 # Lógica cliente y conexión con la API
│   │           └── imagenes/                 # Galería de imágenes de maquinaria y repuestos
```

---

## 🌐 Rutas de la Vista (capa V)

La capa Vista se publica desde `src/main/resources/vista/`. Las rutas amigables están definidas en `controlador/vista/ControladorVista.java` y la publicación de los recursos en `vista/ConfiguracionVista.java`:

| Ruta | Página | Contenido |
| :--- | :--- | :--- |
| `/` o `/inicio` | `index.html` | Portada con acceso a la tienda |
| `/catalogo` | `catalogo.html` | Catálogo con filtros por categoría, marca y maquinaria |
| `/cotizador` | `carrito.html` | Cotizador y checkout simulado |
| `/panel-admin` | `admin.html` | Panel administrativo (CRUD del catálogo) |

Los archivos `.html` también siguen accesibles por su nombre directo (`/catalogo.html`, etc.).

---

## 🔌 Contrato de la API REST (capa C)

| Método | Ruta | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/autenticacion/iniciar-sesion` | Inicio de sesión (devuelve JWT) | Público |
| `POST` | `/api/autenticacion/registro` | Registro de nueva cuenta | Público |
| `GET` | `/api/productos` | Listado de repuestos (`?categoriaId=`, `?busqueda=`) | Público |
| `GET` | `/api/productos/{id}` | Detalle de un repuesto | Público |
| `POST` / `PUT` / `DELETE` | `/api/productos/**` | Alta, modificación y baja de repuestos | Solo `ROLE_ADMINISTRADOR` |
| `GET` | `/api/categorias` | Listado de categorías | Público |
| `POST` / `PUT` / `DELETE` | `/api/categorias/**` | Gestión de categorías | Solo `ROLE_ADMINISTRADOR` |
| `POST` | `/api/pedidos` | Checkout: registra el pedido y descuenta stock | Autenticado |
| `GET` | `/api/pedidos/mis-pedidos` | Pedidos del usuario en sesión | Autenticado |
| `GET` | `/api/pedidos` | Listado completo de pedidos | Autenticado |

---

## 👥 Roles de Usuario y Cuentas Demo

| Rol | Correo | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** (`ROLE_ADMINISTRADOR`) | `admin@emarkgm.com` | `admin123` | Acceso al panel administrativo, agregar, modificar y eliminar repuestos del catálogo. |
| **Comprador** (`ROLE_COMPRADOR`) | `cliente@emarkgm.com` | `cliente123` | Registro, navegación del catálogo, carrito de compras y Checkout simulado. |

---

## 🚀 Puesta en Marcha con IntelliJ IDEA

Revisa el documento detallado [INSTRUCCIONES_EJECUCION.md](file:///c:/USUARIO/Omar/archivador/EMARK_GM_web/INSTRUCCIONES_EJECUCION.md) para ejecutar el servidor y la tienda en minutos.
