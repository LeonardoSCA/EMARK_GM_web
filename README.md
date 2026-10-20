# SITIO WEB EMARK GM

Frontend estático para catálogo, carrito, cotización y registro de pedidos (datos en `localStorage` hasta tener backend).

## Cómo ver el sitio

Desde la carpeta `frontend`:

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080/index.html`.

## Páginas

- `index.html` — Inicio y productos destacados
- `catalogo.html` — Buscar, filtrar y ver detalle
- `carrito.html` — Carrito, IGV, envío, total y pedido demo

## Personalizar

En `js/app.js`: constante `EMARK.WHATSAPP` (número con código país) y lista `productos` (imágenes en `resources/prods/`).

---