# Guía Detallada de Puesta en Marcha en IntelliJ IDEA — Emark GM

Esta guía explica paso a paso cómo abrir, configurar, ejecutar y probar la solución completa (**Spring Boot + PostgreSQL + Frontend Integrado**) directamente en **IntelliJ IDEA**.

---

## 1. Requisitos Previos
1. **IntelliJ IDEA** (Community Edition o Ultimate Edition).
2. **Java 21 (JDK 21)** instalado o descargable desde IntelliJ.
3. **PostgreSQL** instalado y en ejecución en el puerto `5432` con usuario `postgres` (o el que uses habitualmente).

---

## 2. Paso 1: Crear la Base de Datos en PostgreSQL

1. Abre tu gestor favorito (pgAdmin, DBeaver o la consola `psql`).
2. Crea la base de datos con el siguiente comando:
   ```sql
   CREATE DATABASE emark_gm_db;
   ```
3. Verifica la contraseña de PostgreSQL en `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/emark_gm_db
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```
   *(Si tu contraseña local es diferente, cámbiala en esa línea).*

> **Nota:** No es necesario ejecutar scripts manualmente en la base de datos. Al iniciar, Spring Boot ejecutará automáticamente `schema.sql` y `data.sql`, creando las tablas e insertando los usuarios de prueba y el catálogo de repuestos.

---

## 3. Paso 2: Abrir el Proyecto en IntelliJ IDEA

1. Abre **IntelliJ IDEA**.
2. En la pantalla inicial selecciona **Open** (o menú superior: **File → Open...**).
3. Selecciona la carpeta raíz del proyecto:
   `C:\USUARIO\Omar\archivador\EMARK_GM_web`
4. Haz clic en **OK** y luego en **Trust Project**.
5. Como `pom.xml` se encuentra en la raíz, IntelliJ lo detectará automáticamente como un proyecto Maven.
   - En la pestaña lateral derecha de **Maven**, haz clic en el ícono de recargar (**Reload All Maven Projects**) para asegurar que todas las librerías estén sincronizadas.

---

## 4. Paso 3: Configurar el SDK (Java 21)

1. En el menú superior de IntelliJ, dirígete a: **File → Project Structure...** (o presiona `Ctrl + Alt + Shift + S`).
2. En la sección **Project**:
   - **SDK:** Selecciona **Java 21** (si no lo tienes en la lista, selecciona *Add SDK → Download JDK...* y elige versión 21).
   - **Language level:** Selecciona **21 - Sealed classes, record patterns...**.
3. Haz clic en **Apply** y luego en **OK**.

---

## 5. Paso 4: Iniciar el Aplicativo

1. En el panel izquierdo del proyecto (**Project View**), navega hasta:
   `src/main/java/com/example/emarkGM/AplicacionEmarkGm.java`
2. Abre el archivo y haz clic en el botón verde de inicio (`▶`) ubicado en la línea del método `main`.
3. Selecciona **Run 'AplicacionEmarkGm'**.
4. En la pestaña inferior **Run**, observarás el log de inicio de Spring Boot terminando con:
   ```text
   Tomcat started on port 8080 (http) with context path '/'
   ```

---

## 6. Paso 5: Ingresar a la Tienda Web

Abre cualquier navegador web y entra a:
👉 **`http://localhost:8080`**

Todo el sistema (API REST, base de datos y vistas HTML/CSS/JS) se sirve de forma unificada desde ese único puerto sin necesidad de Live Server ni configuraciones adicionales.

> **Nota sobre la capa Vista:** los archivos de interfaz se encuentran en `src/main/resources/vista/` y se publican en la raíz web mediante `com.example.emarkGM.vista.ConfiguracionVista`. Además de los `.html` (por ejemplo `http://localhost:8080/catalogo.html`), existen rutas amigables: `/`, `/inicio`, `/catalogo`, `/cotizador` y `/panel-admin`.

---

## 7. Paso 6: Prueba de Roles y Funcionalidades

### A. Rol Comprador (Cliente)
- Haz clic en **Ingresar / Registro** en la barra superior.
- **Credenciales demo:**
  - **Correo:** `cliente@emarkgm.com`
  - **Contraseña:** `cliente123`
- Se actualizará el encabezado mostrando `👤 Juan (Cliente)`.
- Entra a **Catálogo**, filtra repuestos por categoría o marca, y añade productos al carrito.
- Entra a **Cotizador** (Carrito), ingresa los datos de entrega y haz clic en **Finalizar compra**.
- El sistema conectará con el endpoint transaccional `/api/pedidos`, descontará el inventario en PostgreSQL y mostrará el número de pedido con la simulación del mensaje de WhatsApp.

### B. Rol Administrador
- Cierra sesión desde el menú de usuario.
- Haz clic en **Ingresar / Registro**:
  - **Correo:** `admin@emarkgm.com`
  - **Contraseña:** `admin123`
- Se habilitará el enlace directo **⚙ Panel Admin** en el encabezado (o navegando a `http://localhost:8080/admin.html`).
- **Capacidades del Administrador:**
  - Consultar inventario completo.
  - Modificar precios, stock, descripciones e imágenes de repuestos.
  - Registrar nuevos repuestos con validaciones.
  - Eliminar repuestos del catálogo.
- *Validación de seguridad:* Cualquier petición administrativa enviada sin el token `ROLE_ADMINISTRADOR` es rechazada con un código `403 Forbidden` por Spring Security.
