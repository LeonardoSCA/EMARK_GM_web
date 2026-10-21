# Emark GM — Tienda Virtual de Repuestos para Maquinaria Pesada

Proyecto web universitario desarrollado con arquitectura **MVC estricta** y principios **SOLID**, implementado en **Java 21**, **Spring Boot**, **Spring Security**, **Spring Data JDBC** y **PostgreSQL**.

---

## 🏛️ Arquitectura del Proyecto (MVC Estricto)

El proyecto unifica el ciclo de vida del aplicativo web en una estructura estandarizada de Spring Boot:

```
EMARK_GM_web/
├── pom.xml                                   # Configuración de dependencias Maven
├── mvnw / mvnw.cmd                           # Maven Wrapper portable
├── src/
│   ├── main/
│   │   ├── java/com/example/emarkGM/
│   │   │   ├── EmarkGmApplication.java       # Clase principal de arranque de Spring Boot
│   │   │   │
│   │   │   ├── model/                        # [M] MODELO: Entidades de dominio mapeadas a PostgreSQL
│   │   │   │   ├── User.java                 # Tabla 'users'
│   │   │   │   ├── Category.java             # Tabla 'categories'
│   │   │   │   ├── Product.java              # Tabla 'products'
│   │   │   │   ├── Order.java                # Tabla 'orders'
│   │   │   │   └── OrderItem.java            # Tabla 'order_items'
│   │   │   │
│   │   │   ├── controller/                   # [C] CONTROLADOR: Endpoints REST y ruteo de flujos
│   │   │   │   ├── AuthController.java       # /api/auth (Login y Registro)
│   │   │   │   ├── ProductController.java    # /api/products (Catálogo y gestión)
│   │   │   │   ├── CategoryController.java   # /api/categories (Categorías)
│   │   │   │   └── OrderController.java      # /api/orders (Checkout y órdenes)
│   │   │   │
│   │   │   ├── repository/                   # Persistencia ligera (Spring Data JDBC)
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── CategoryRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   └── OrderRepository.java
│   │   │   │
│   │   │   ├── service/                      # Lógica de Negocio desacoplada (SOLID)
│   │   │   │   ├── AuthService.java / AuthServiceImpl.java
│   │   │   │   ├── ProductService.java / ProductServiceImpl.java
│   │   │   │   ├── CategoryService.java / CategoryServiceImpl.java
│   │   │   │   ├── OrderService.java / OrderServiceImpl.java
│   │   │   │   └── JwtService.java / JwtServiceImpl.java
│   │   │   │
│   │   │   ├── dto/                          # Objetos de Transferencia de Datos (DTO)
│   │   │   │   ├── request/                  # LoginRequest, RegisterRequest, ProductRequest, CheckoutRequest
│   │   │   │   └── response/                 # AuthResponse, OrderConfirmationResponse
│   │   │   │
│   │   │   └── config/                       # Seguridad y Filtros
│   │   │       ├── SecurityConfig.java       # Autorización RBAC y CORS
│   │   │       ├── JwtAuthenticationFilter.java
│   │   │       └── ApplicationConfig.java    # PasswordEncoder (BCrypt)
│   │   │
│   │   └── resources/
│   │       ├── application.properties        # Configuración de base de datos y JWT
│   │       ├── schema.sql                    # Definición DDL de tablas e índices
│   │       ├── data.sql                      # Semilla de datos iniciales (Admin, Cliente, Catálogo)
│   │       │
│   │       └── static/                       # [V] VISTAS: Interfaz de usuario servida directamente
│   │           ├── index.html                # Vista de Inicio con login/registro
│   │           ├── catalogo.html             # Vista de Catálogo de repuestos con filtros
│   │           ├── carrito.html              # Vista de Cotizador y Checkout simulado
│   │           ├── admin.html                # Vista de Panel Administrativo (CRUD)
│   │           ├── css/                      # Hojas de estilo
│   │           ├── js/app.js                 # Lógica cliente y conexión con la API
│   │           └── resources/prods/          # Galería de imágenes de maquinaria y repuestos
```

---

## 👥 Roles de Usuario y Cuentas Demo

| Rol | Correo | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** (`ROLE_ADMIN`) | `admin@emarkgm.com` | `admin123` | Acceso a `admin.html`, agregar, modificar y eliminar repuestos del catálogo. |
| **Comprador** (`ROLE_CUSTOMER`) | `cliente@emarkgm.com` | `cliente123` | Registro, navegación del catálogo, carrito de compras y Checkout simulado. |

---

## 🚀 Puesta en Marcha con IntelliJ IDEA

Revisa el documento detallado [INSTRUCCIONES_EJECUCION.md](file:///c:/USUARIO/Omar/archivador/EMARK_GM_web/INSTRUCCIONES_EJECUCION.md) para ejecutar el servidor y la tienda en minutos.
