/* Emark GM — datos ficticios y lógica compartida (frontend) */

const EMARK = {
  IGV_RATE: 0.18,
  ENVIO_LOCAL: 25,
  ENVIO_PROVINCIA: 45,
  CART_KEY: "emark_gm_carrito",
  WHATSAPP: "51999999999",
};

const productos = [
  { id: 1, nombre: "Filtro de aceite", precio: 184, stock: 12, categoria: "Filtros", marca: "Donaldson", maquinaria: "Excavadora", imagen: "resources/prods/FILTRO DE ACEITE.jpg", descripcion: "Filtro de aceite para línea pesada. Rosca estándar y alta retención de partículas.", specs: ["Micraje 10 μm", "Rosca 1 3/8-12 UNF", "Compatible CAT / Komatsu"] },
  { id: 2, nombre: "Filtro de combustible", precio: 156, stock: 18, categoria: "Filtros", marca: "Fleetguard", maquinaria: "Cargador frontal", imagen: "resources/prods/FILTRO DE COMBUSTIBLE.jpg", descripcion: "Filtración de combustible para motores diésel en operación continua.", specs: ["Separación de agua", "Cambio cada 500 h", "Alta eficiencia"] },
  { id: 3, nombre: "Filtro de transmisión", precio: 368, stock: 8, categoria: "Filtros", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/FILTRO DE TRANSMISIÓN.jpg", descripcion: "Elemento filtrante para circuito de transmisión hidrostática.", specs: ["OEM equivalente", "Presión de trabajo alta", "Stock verificado"] },
  { id: 4, nombre: "Conjunto filtro de aire", precio: 298, stock: 6, categoria: "Filtros", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/CONJUNTO DE FILTRO DE AIRE.jpg", descripcion: "Conjunto primario y secundario para polvo severo.", specs: ["Doble etapa", "Sellado reforzado", "Línea profesional"] },
  { id: 5, nombre: "Bomba de agua", precio: 890, stock: 4, categoria: "Bombas", marca: "Cummins", maquinaria: "Motoniveladora", imagen: "resources/prods/BOMBA DE AGUA.jpg", descripcion: "Bomba de circulación para sistema de enfriamiento de motor.", specs: ["Aleación resistente", "Rodamiento sellado", "Incluye junta"] },
  { id: 6, nombre: "Bomba de combustible", precio: 1240, stock: 3, categoria: "Bombas", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/BOMBA DE COMBUSTIBLE.jpg", descripcion: "Bomba de alimentación para inyección diésel.", specs: ["Presión calibrada", "Conexiones OEM", "Prueba de flujo"] },
  { id: 7, nombre: "Bomba de freno", precio: 756, stock: 5, categoria: "Bombas", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/BOMBA DE FRENO.jpg", descripcion: "Bomba hidráulica para sistema de frenos de servicio.", specs: ["Cuerpo fundido", "Eje endurecido", "Garantía comercial"] },
  { id: 8, nombre: "Bomba de freno 3D Plus", precio: 812, stock: 4, categoria: "Bombas", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/BOMBA DE FRENO 3D PLUS.jpg", descripcion: "Versión reforzada para modelos 3D Plus.", specs: ["Mayor caudal", "Sellos viton", "Kit montaje"] },
  { id: 9, nombre: "Bomba de transmisión", precio: 2180, stock: 2, categoria: "Bombas", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/BOMBA DE TRANSMISIÓN.jpg", descripcion: "Bomba para circuito de potencia de transmisión.", specs: ["Revisión en banco", "Número de parte verificado", "Despacho coordinado"] },
  { id: 10, nombre: "Bomba hidráulica", precio: 3450, stock: 2, categoria: "Bombas", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/BOMBA HIDRAULICA.jpg", descripcion: "Bomba principal para implementos y giro.", specs: ["Caudal nominal OEM", "Prueba de presión", "Soporte técnico"] },
  { id: 11, nombre: "Kit sellos hidráulicos 320DL", precio: 326, stock: 10, categoria: "Kits", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/KIT SELLOS HIDRÁULICOS 320DL.jpg", descripcion: "Kit de sellos para cilindros y válvulas 320DL.", specs: ["Material NBR/PU", "Listado por posición", "Incluye guía de montaje"] },
  { id: 12, nombre: "Kit sellos hidráulicos CAT 320D", precio: 318, stock: 9, categoria: "Kits", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/KIT SELLOS HIDRÁULICOS CAT 320D.jpg", descripcion: "Repuesto completo para mantenimiento programado.", specs: ["Compatibilidad verificada", "Empaque industrial", "Stock local"] },
  { id: 13, nombre: "Kit sellos hidráulicos 3C Plus", precio: 302, stock: 11, categoria: "Kits", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/KIT SELLOS HIDRÁULICOS 3C PLUS.jpg", descripcion: "Sellos para cargador frontal serie 3C Plus.", specs: ["Alta temperatura", "Juego completo", "Línea profesional"] },
  { id: 14, nombre: "Kit sellos hidráulicos L120 C-E", precio: 340, stock: 7, categoria: "Kits", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/KIT SELLOS HIDRÁULICOS L120 C-E.jpg", descripcion: "Kit para transmisión y dirección L120 C-E.", specs: ["Codificación por cilindro", "Calidad ISO", "Entrega 24 h Lima"] },
  { id: 15, nombre: "Kit sello reparación bomba hidráulica", precio: 278, stock: 8, categoria: "Kits", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/KIT DE SELLO REPARACIÓN BOMBA HIDRÁULICA.jpg", descripcion: "Reparación menor sin cambiar bomba completa.", specs: ["Plato y émbolo", "O-rings incluidos", "Ahorro vs bomba nueva"] },
  { id: 16, nombre: "Kit discos de freno", precio: 468, stock: 6, categoria: "Kits", marca: "Caterpillar", maquinaria: "Motoniveladora", imagen: "resources/prods/KIT DISCOS DE FRENO.jpg", descripcion: "Juego de discos para freno de servicio.", specs: ["Material composite", "Par torsión especificado", "Montaje asistido"] },
  { id: 17, nombre: "Válvula de alivio principal", precio: 520, stock: 5, categoria: "Hidráulica", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/VALVULA DE ALIVIO PRINCIPAL.jpg", descripcion: "Válvula de protección del circuito principal.", specs: ["Ajuste de presión", "Cuerpo templado", "Prueba en taller"] },
  { id: 18, nombre: "Válvula de alivio ARV EX", precio: 498, stock: 4, categoria: "Hidráulica", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/VÁLVULA DE ALIVIO ARV EX.jpg", descripcion: "Válvula de alivio para línea EX.", specs: ["Respuesta rápida", "Sellos de repuesto", "Código cruzado"] },
  { id: 19, nombre: "Visor de nivel tanque hidráulico", precio: 86, stock: 22, categoria: "Hidráulica", marca: "Donaldson", maquinaria: "Cargador frontal", imagen: "resources/prods/VISOR DE NIVEL DEL TANQUE HIDRÁULICO.jpg", descripcion: "Indicador visual de nivel con escala.", specs: ["Vidrio templado", "Rosca NPT", "Instalación rápida"] },
  { id: 20, nombre: "Tapa tanque hidráulico", precio: 64, stock: 30, categoria: "Hidráulica", marca: "Fleetguard", maquinaria: "Excavadora", imagen: "resources/prods/TAPA DE TANQUE HIDRÁULICO.jpg", descripcion: "Tapa con respiradero integrado.", specs: ["Anti-derrame", "Compatible múltiples modelos", "Stock permanente"] },
  { id: 21, nombre: "Enfriador de aceite", precio: 1120, stock: 3, categoria: "Hidráulica", marca: "Cummins", maquinaria: "Cargador frontal", imagen: "resources/prods/ENFRIADOR DE ACEITE.jpg", descripcion: "Intercambiador para control de temperatura de aceite.", specs: ["Aletas de alta densidad", "Conexiones SAE", "Limpieza interna"] },
  { id: 22, nombre: "Conjunto enfriador aceite", precio: 1285, stock: 2, categoria: "Hidráulica", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/CONJUNTO DE ENFRIADOR ACEITE.jpg", descripcion: "Conjunto listo para montaje en línea.", specs: ["Incluye soportes", "Mangueras opcionales", "Revisión visual"] },
  { id: 23, nombre: "Crucetas de transmisión", precio: 198, stock: 14, categoria: "Transmisión", marca: "Komatsu", maquinaria: "Motoniveladora", imagen: "resources/prods/CRUCETAS DE TRANSMISION.jpg", descripcion: "Crucetas para eje cardán maquinaria pesada.", specs: ["Grasa de fábrica", "Balanceo recomendado", "Acero forjado"] },
  { id: 24, nombre: "Eje transmisión eje trasero", precio: 2890, stock: 1, categoria: "Transmisión", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/EJE DE TRANSMISIÓN DEL EJE TRASERO.jpg", descripcion: "Componente estructural para tracción trasera.", specs: ["Tratamiento térmico", "Número grabado", "Coordinación logística"] },
  { id: 25, nombre: "Convertidor de par JBC", precio: 4200, stock: 1, categoria: "Transmisión", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/CONVERTIDOR DE PAR JBC.jpg", descripcion: "Convertidor para transmisión powershift.", specs: ["Reacondicionado / nuevo", "Prueba estática", "Garantía por escrito"] },
  { id: 26, nombre: "Piñón de cubo", precio: 380, stock: 7, categoria: "Transmisión", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/PIÑON DE CUBO.jpg", descripcion: "Piñón para conjunto de cubo final.", specs: ["Dureza HRC", "Engranaje rectificado", "Par de apriete guía"] },
  { id: 27, nombre: "Piñón central cubo", precio: 410, stock: 6, categoria: "Transmisión", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/PIÑON CENTRAL CUBO.jpg", descripcion: "Piñón central de tracción.", specs: ["Tratamiento superficial", "Compatible varios tonelajes", "Stock B2B"] },
  { id: 28, nombre: "Sensor de temperatura", precio: 142, stock: 16, categoria: "Sensores", marca: "Cummins", maquinaria: "Excavadora", imagen: "resources/prods/SENSOR DE TEMPERATURA.jpg", descripcion: "Sensor NTC para ECU y panel.", specs: ["Conector original", "Rango -40 a 150 °C", "Calibración OEM"] },
  { id: 29, nombre: "Termostato JBC", precio: 118, stock: 20, categoria: "Sensores", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/TERMOSTATO JBC.jpg", descripcion: "Termostato para circuito de enfriamiento JBC.", specs: ["Apertura nominal 82 °C", "Válvula bypass", "Prueba de estanqueidad"] },
  { id: 30, nombre: "Tensor de correa", precio: 165, stock: 12, categoria: "Motor", marca: "Fleetguard", maquinaria: "Motoniveladora", imagen: "resources/prods/TENSOR DE CORREA.jpg", descripcion: "Tensor automático para correa de accesorios.", specs: ["Rodamiento sellado", "Ajuste dinámico", "Montaje sencillo"] },
  { id: 31, nombre: "Tensor de polea", precio: 172, stock: 10, categoria: "Motor", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/TENSOR DE POLEA.jpg", descripcion: "Polea tensora con rodamiento integrado.", specs: ["Alineación precisa", "Material polímero", "Larga vida útil"] },
  { id: 32, nombre: "Terminales de dirección", precio: 224, stock: 9, categoria: "Dirección", marca: "Caterpillar", maquinaria: "Cargador frontal", imagen: "resources/prods/TERMINALES DE DIRECCIÓN.jpg", descripcion: "Terminales para sistema de dirección hidráulica.", specs: ["Roscas protegidas", "Niple incluido", "Par especificado"] },
  { id: 33, nombre: "Guías brazo extensible", precio: 890, stock: 3, categoria: "Estructura", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/GUIAS DEL BRAZO EXTENSIBLE.jpg", descripcion: "Guías deslizantes para brazo extensible.", specs: ["Tratamiento anti-fricción", "Juego par", "Instalación en campo"] },
  { id: 34, nombre: "Seguro pin 45 mm", precio: 48, stock: 40, categoria: "Fijación", marca: "Caterpillar", maquinaria: "Excavadora", imagen: "resources/prods/SEGURO PIN 45MM.jpg", descripcion: "Seguro elástico para pasadores de 45 mm.", specs: ["Acero aleado", "Zincado", "Alta rotación"] },
  { id: 35, nombre: "Spool short", precio: 385, stock: 5, categoria: "Hidráulica", marca: "Komatsu", maquinaria: "Excavadora", imagen: "resources/prods/SPOOL SHORT.jpg", descripcion: "Carrete corto para válvula de control.", specs: ["Rectificado CNC", "Lapizado", "Prueba de fugas"] },
  { id: 36, nombre: "Tapa de combustible", precio: 72, stock: 25, categoria: "Motor", marca: "Fleetguard", maquinaria: "Cargador frontal", imagen: "resources/prods/TAPA DE COMBUSTIBLE.jpg", descripcion: "Tapa con llave y venteo.", specs: ["Anti-sifón", "Sellos de repuesto", "UV resistente"] },
  { id: 37, nombre: "Cebedor manual", precio: 95, stock: 15, categoria: "Motor", marca: "Cummins", maquinaria: "Motoniveladora", imagen: "resources/prods/CEBADOR MANUAL.jpg", descripcion: "Bomba de cebo para arranque en frío.", specs: ["Palanca ergonómica", "Manguera flexible", "Diésel compatible"] },
];

function formatSoles(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

function getCart() {
  try {
    const raw = localStorage.getItem(EMARK.CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(EMARK.CART_KEY, JSON.stringify(items));
  updateCartBadge();
}

function cartItemCount() {
  return getCart().reduce((sum, line) => sum + line.cantidad, 0);
}

function addToCart(productId, cantidad = 1) {
  const product = productos.find((p) => p.id === productId);
  if (!product) return false;
  const qty = Math.max(1, Math.min(cantidad, product.stock));
  const cart = getCart();
  const existing = cart.find((l) => l.id === productId);
  if (existing) {
    existing.cantidad = Math.min(product.stock, existing.cantidad + qty);
  } else {
    cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      cantidad: qty,
      stock: product.stock,
    });
  }
  saveCart(cart);
  return true;
}

function setCartQuantity(productId, cantidad) {
  const cart = getCart();
  const line = cart.find((l) => l.id === productId);
  if (!line) return;
  if (cantidad <= 0) {
    removeFromCart(productId);
    return;
  }
  line.cantidad = Math.min(line.stock, cantidad);
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((l) => l.id !== productId));
}

function clearCart() {
  saveCart([]);
}

function calcularTotales(subtotal, costoEnvio) {
  const igv = subtotal * EMARK.IGV_RATE;
  const total = subtotal + igv + costoEnvio;
  return { subtotal, igv, costoEnvio, total };
}

function cartSubtotal() {
  return getCart().reduce((s, l) => s + l.precio * l.cantidad, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(cartItemCount());
  });
}

function initHeaderSearch() {
  const form = document.querySelector("[data-header-search]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[name=q]");
    const q = (input?.value || "").trim();
    const url = q ? `catalogo.html?q=${encodeURIComponent(q)}` : "catalogo.html";
    window.location.href = url;
  });
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container || !window.bootstrap) return;
  const el = document.createElement("div");
  el.className = "toast align-items-center text-bg-success border-0";
  el.setAttribute("role", "alert");
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
  container.appendChild(el);
  const toast = new bootstrap.Toast(el, { delay: 2800 });
  toast.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

function getCategorias() {
  return [...new Set(productos.map((p) => p.categoria))].sort();
}

function getMarcas() {
  return [...new Set(productos.map((p) => p.marca))].sort();
}

function getMaquinarias() {
  return [...new Set(productos.map((p) => p.maquinaria))].sort();
}

function filterProductos({ q = "", categorias = [], marcas = [], maquinarias = [] }) {
  const term = q.toLowerCase().trim();
  return productos.filter((p) => {
    if (categorias.length && !categorias.includes(p.categoria)) return false;
    if (marcas.length && !marcas.includes(p.marca)) return false;
    if (maquinarias.length && !maquinarias.includes(p.maquinaria)) return false;
    if (!term) return true;
    const hay = `${p.nombre} ${p.categoria} ${p.marca} ${p.maquinaria} ${p.descripcion}`.toLowerCase();
    return hay.includes(term);
  });
}

function renderProductCard(product) {
  const specs = product.specs.slice(0, 2).map((s) => `<li>${s}</li>`).join("");
  return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <article class="card product-card h-100">
        <div class="product-card-img-wrap">
          <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}" loading="lazy">
          <span class="badge product-badge">Línea profesional</span>
        </div>
        <div class="card-body d-flex flex-column">
          <p class="text-muted small mb-1">${product.categoria} · ${product.marca}</p>
          <h3 class="h6 card-title">${product.nombre}</h3>
          <ul class="small text-muted product-specs mb-2">${specs}</ul>
          <p class="stock-ok small mb-2">${product.stock} unidades</p>
          <p class="product-price mb-3">${formatSoles(product.precio)}</p>
          <div class="mt-auto d-grid gap-2">
            <button type="button" class="btn btn-emark" data-add-cart="${product.id}">Añadir a cotización</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-detail="${product.id}">Ver detalles</button>
          </div>
        </div>
      </article>
    </div>`;
}

function bindProductCardActions(root, onDetail) {
  root.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-add-cart"));
      if (addToCart(id)) showToast("Producto añadido al carrito");
    });
  });
  root.querySelectorAll("[data-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-detail"));
      const product = productos.find((p) => p.id === id);
      if (product && onDetail) onDetail(product);
    });
  });
}

function initCatalogPage() {
  const grid = document.getElementById("catalog-grid");
  const countEl = document.getElementById("catalog-count");
  const modalEl = document.getElementById("productModal");
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;
  const params = new URLSearchParams(window.location.search);
  const initialQ = params.get("q") || "";
  const searchInput = document.getElementById("catalog-search");
  if (searchInput && initialQ) searchInput.value = initialQ;

  function getChecked(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value);
  }

  function render() {
    const q = searchInput?.value || "";
    const list = filterProductos({
      q,
      categorias: getChecked("filtro-categoria"),
      marcas: getChecked("filtro-marca"),
      maquinarias: getChecked("filtro-maquinaria"),
    });
    if (countEl) countEl.textContent = `${list.length} producto${list.length === 1 ? "" : "s"}`;
    if (!grid) return;
    grid.innerHTML = list.length
      ? list.map(renderProductCard).join("")
      : `<div class="col-12"><div class="alert alert-light border text-center py-5">No hay resultados. Prueba otro término o ajusta los filtros.</div></div>`;
    bindProductCardActions(grid, (product) => {
      document.getElementById("modal-product-title").textContent = product.nombre;
      document.getElementById("modal-product-img").src = product.imagen;
      document.getElementById("modal-product-img").alt = product.nombre;
      document.getElementById("modal-product-price").textContent = formatSoles(product.precio);
      document.getElementById("modal-product-stock").textContent = `${product.stock} unidades disponibles`;
      document.getElementById("modal-product-desc").textContent = product.descripcion;
      const specsUl = document.getElementById("modal-product-specs");
      specsUl.innerHTML = product.specs.map((s) => `<li>${s}</li>`).join("");
      const addBtn = document.getElementById("modal-add-cart");
      addBtn.onclick = () => {
        addToCart(product.id);
        showToast("Producto añadido al carrito");
        modal?.hide();
      };
      modal?.show();
    });
  }

  document.querySelectorAll(".filter-form input").forEach((el) => {
    el.addEventListener("change", render);
  });
  searchInput?.addEventListener("input", render);
  document.getElementById("clear-filters")?.addEventListener("click", () => {
    document.querySelectorAll(".filter-form input[type=checkbox]").forEach((c) => {
      c.checked = false;
    });
    if (searchInput) searchInput.value = "";
    render();
  });
  render();
}

function initHomeFeatured() {
  const wrap = document.getElementById("featured-products");
  if (!wrap) return;
  const featured = productos.slice(0, 4);
  wrap.innerHTML = featured.map(renderProductCard).join("");
  bindProductCardActions(wrap, (product) => {
    window.location.href = `catalogo.html?q=${encodeURIComponent(product.nombre)}`;
  });
}

function initCartPage() {
  const listEl = document.getElementById("cart-lines");
  const emptyEl = document.getElementById("cart-empty");
  const contentEl = document.getElementById("cart-content");
  const couponInput = document.getElementById("coupon-code");
  let discount = 0;

  function shippingCost() {
    const selected = document.querySelector('input[name="envio"]:checked');
    if (!selected) return 0;
    return selected.value === "local" ? EMARK.ENVIO_LOCAL : EMARK.ENVIO_PROVINCIA;
  }

  function renderSummary() {
    const sub = Math.max(0, cartSubtotal() - discount);
    const { igv, costoEnvio, total } = calcularTotales(sub, shippingCost());
    const map = {
      "summary-subtotal": formatSoles(sub),
      "summary-igv": formatSoles(igv),
      "summary-shipping": formatSoles(costoEnvio),
      "summary-total": formatSoles(total),
      "order-subtotal": formatSoles(sub),
      "order-igv": formatSoles(igv),
      "order-shipping": formatSoles(costoEnvio),
      "order-total": formatSoles(total),
    };
    Object.entries(map).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });
    return { sub, igv, costoEnvio, total };
  }

  function renderLines() {
    const cart = getCart();
    if (!cart.length) {
      emptyEl?.classList.remove("d-none");
      contentEl?.classList.add("d-none");
      return;
    }
    emptyEl?.classList.add("d-none");
    contentEl?.classList.remove("d-none");
    if (!listEl) return;
    listEl.innerHTML = cart
      .map(
        (line) => `
      <div class="card cart-line mb-3">
        <div class="card-body">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <img src="${line.imagen}" alt="" class="cart-thumb rounded">
            </div>
            <div class="col">
              <h3 class="h6 mb-1">${line.nombre}</h3>
              <p class="small text-muted mb-0">Precio unitario: ${formatSoles(line.precio)}</p>
            </div>
            <div class="col-sm-auto">
              <div class="qty-control input-group input-group-sm">
                <button class="btn btn-outline-secondary" type="button" data-qty-minus="${line.id}">−</button>
                <input type="text" class="form-control text-center" value="${line.cantidad}" readonly>
                <button class="btn btn-outline-secondary" type="button" data-qty-plus="${line.id}">+</button>
              </div>
            </div>
            <div class="col-sm-auto text-sm-end">
              <p class="fw-semibold mb-1">${formatSoles(line.precio * line.cantidad)}</p>
              <button type="button" class="btn btn-link btn-sm text-danger p-0" data-remove="${line.id}">Eliminar</button>
            </div>
          </div>
        </div>
      </div>`
      )
      .join("");

    listEl.querySelectorAll("[data-qty-minus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-qty-minus"));
        const line = getCart().find((l) => l.id === id);
        if (line) setCartQuantity(id, line.cantidad - 1);
        renderLines();
        renderSummary();
      });
    });
    listEl.querySelectorAll("[data-qty-plus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-qty-plus"));
        const line = getCart().find((l) => l.id === id);
        if (line) setCartQuantity(id, line.cantidad + 1);
        renderLines();
        renderSummary();
      });
    });
    listEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(Number(btn.getAttribute("data-remove")));
        renderLines();
        renderSummary();
      });
    });
    renderSummary();
  }

  document.querySelectorAll('input[name="envio"]').forEach((el) => {
    el.addEventListener("change", renderSummary);
  });

  document.getElementById("apply-coupon")?.addEventListener("click", () => {
    const code = (couponInput?.value || "").trim().toUpperCase();
    if (code === "EMARK10") {
      discount = cartSubtotal() * 0.1;
      showToast("Cupón EMARK10 aplicado (−10%)");
    } else if (code) {
      discount = 0;
      showToast("Cupón no válido");
    } else {
      discount = 0;
    }
    renderSummary();
  });

  document.getElementById("btn-whatsapp")?.addEventListener("click", () => {
    const totals = renderSummary();
    const lines = getCart()
      .map((l) => `• ${l.nombre} x${l.cantidad} = ${formatSoles(l.precio * l.cantidad)}`)
      .join("\n");
    const text = encodeURIComponent(
      `Hola Emark GM, solicito cotización:\n\n${lines}\n\nSubtotal: ${formatSoles(totals.sub)}\nIGV: ${formatSoles(totals.igv)}\nEnvío: ${formatSoles(totals.costoEnvio)}\nTotal: ${formatSoles(totals.total)}`
    );
    window.open(`https://wa.me/${EMARK.WHATSAPP}?text=${text}`, "_blank");
  });

  document.getElementById("btn-finalizar")?.addEventListener("click", () => {
    const nombre = document.getElementById("cliente-nombre")?.value?.trim();
    const doc = document.getElementById("cliente-doc")?.value?.trim();
    const distrito = document.getElementById("cliente-distrito")?.value?.trim();
    if (!getCart().length) {
      showToast("Tu carrito está vacío");
      return;
    }
    if (!nombre || !doc || !distrito) {
      showToast("Completa datos de entrega y facturación");
      return;
    }
    const pago = document.querySelector('input[name="pago"]:checked')?.value || "—";
    const envio = document.querySelector('input[name="envio"]:checked')?.value || "—";
    const totals = renderSummary();
    const pedido = {
      id: `PED-${Date.now()}`,
      fecha: new Date().toISOString(),
      cliente: { nombre, doc, distrito, direccion: document.getElementById("cliente-direccion")?.value || "" },
      envio,
      pago,
      items: getCart(),
      ...totals,
    };
    const history = JSON.parse(localStorage.getItem("emark_gm_pedidos") || "[]");
    history.push(pedido);
    localStorage.setItem("emark_gm_pedidos", JSON.stringify(history));
    clearCart();
    document.getElementById("pedido-id").textContent = pedido.id;
    const confirmModal = document.getElementById("orderModal");
    if (confirmModal) new bootstrap.Modal(confirmModal).show();
    renderLines();
    renderSummary();
  });

  renderLines();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initHeaderSearch();
  if (document.body.dataset.page === "home") initHomeFeatured();
  if (document.body.dataset.page === "catalog") initCatalogPage();
  if (document.body.dataset.page === "cart") initCartPage();
});
