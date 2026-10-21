/* Emark GM — Lógica de Frontend integrada con Backend Spring Boot */

const EMARK = {
  API_BASE_URL: "/api",
  IGV_RATE: 0.18,
  ENVIO_LOCAL: 25,
  ENVIO_PROVINCIA: 45,
  CART_KEY: "emark_gm_carrito",
  AUTH_TOKEN_KEY: "emark_token",
  AUTH_USER_KEY: "emark_user",
  WHATSAPP: "51999999999",
};

// Variable global de productos cargados
let productos = [];

// ==========================================
// 1. MANEJO DE AUTENTICACIÓN (JWT & SESIÓN)
// ==========================================
function getAuthToken() {
  return localStorage.getItem(EMARK.AUTH_TOKEN_KEY);
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(EMARK.AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveAuthSession(token, user) {
  localStorage.setItem(EMARK.AUTH_TOKEN_KEY, token);
  localStorage.setItem(EMARK.AUTH_USER_KEY, JSON.stringify(user));
  renderAuthNav();
}

function logout() {
  localStorage.removeItem(EMARK.AUTH_TOKEN_KEY);
  localStorage.removeItem(EMARK.AUTH_USER_KEY);
  showToast("Sesión cerrada correctamente");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 600);
}

// Inyección del modal de Login / Registro dinámicamente si no existe
function ensureAuthModalInDOM() {
  if (document.getElementById("authModal")) return;

  const modalHtml = `
  <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <div class="modal-header border-0 pb-0">
          <ul class="nav nav-pills w-100" id="authTab" role="tablist">
            <li class="nav-item flex-fill text-center" role="presentation">
              <button class="nav-link active w-100 fw-bold" id="tab-login" data-bs-toggle="pill" data-bs-target="#panel-login" type="button" role="tab">Iniciar Sesión</button>
            </li>
            <li class="nav-item flex-fill text-center" role="presentation">
              <button class="nav-link w-100 fw-bold" id="tab-register" data-bs-toggle="pill" data-bs-target="#panel-register" type="button" role="tab">Crear Cuenta</button>
            </li>
          </ul>
          <button type="button" class="btn-close ms-2" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body p-4">
          <div class="tab-content" id="authTabContent">
            <!-- Formulario de Login -->
            <div class="tab-pane fade show active" id="panel-login" role="tabpanel">
              <form id="form-login">
                <div class="mb-3">
                  <label class="form-label small fw-semibold" for="login-email">Correo Electrónico</label>
                  <input type="email" class="form-control" id="login-email" placeholder="ejemplo@correo.com" required>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold" for="login-password">Contraseña</label>
                  <div class="input-group">
                    <input type="password" class="form-control" id="login-password" placeholder="••••••••" required>
                    <button class="btn btn-outline-secondary" type="button" id="toggle-login-password" title="Mostrar/Ocultar contraseña" style="border-color: #ced4da;">
                      👁️
                    </button>
                  </div>
                </div>
                <div class="alert alert-info py-2 small mb-3">
                  <strong>Cuentas demo de prueba:</strong><br>
                  • <em>Admin:</em> admin@emarkgm.com / admin123<br>
                  • <em>Cliente:</em> cliente@emarkgm.com / cliente123
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-emark py-2" id="btn-submit-login">Ingresar a Emark GM</button>
                </div>
              </form>
            </div>

            <!-- Formulario de Registro -->
            <div class="tab-pane fade" id="panel-register" role="tabpanel">
              <form id="form-register">
                <div class="mb-3">
                  <label class="form-label small fw-semibold" for="reg-name">Nombre Completo o Empresa</label>
                  <input type="text" class="form-control" id="reg-name" placeholder="Juan Pérez o Minera SAC" required>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold" for="reg-email">Correo Electrónico</label>
                  <input type="email" class="form-control" id="reg-email" placeholder="cliente@correo.com" required>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold" for="reg-password">Contraseña</label>
                  <div class="input-group">
                    <input type="password" class="form-control" id="reg-password" minlength="6" placeholder="Mínimo 6 caracteres" required>
                    <button class="btn btn-outline-secondary" type="button" id="toggle-reg-password" title="Mostrar/Ocultar contraseña" style="border-color: #ced4da;">
                      👁️
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold" for="reg-role">Tipo de Cuenta</label>
                  <select class="form-select" id="reg-role">
                    <option value="ROLE_CUSTOMER">Cliente / Comprador</option>
                    <option value="ROLE_ADMIN">Administrador (Demostración)</option>
                  </select>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-emark py-2" id="btn-submit-register">Registrarme</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Botones para alternar visibilidad de contraseña (ver/ocultar)
  const setupTogglePassword = (btnId, inputId) => {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (btn && input) {
      btn.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        btn.textContent = isPassword ? "🙈" : "👁️";
      });
    }
  };
  setupTogglePassword("toggle-login-password", "login-password");
  setupTogglePassword("toggle-reg-password", "reg-password");

  // Listeners de submit
  document.getElementById("form-login")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const btn = document.getElementById("btn-submit-login");

    try {
      btn.disabled = true;
      btn.textContent = "Verificando...";
      const res = await fetch(`${EMARK.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Error al iniciar sesión");
      }

      const data = await res.json();
      saveAuthSession(data.token, { id: data.id, name: data.name, email: data.email, role: data.role });
      
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById("authModal"));
      if (modalInstance) modalInstance.hide();
      showToast(`¡Bienvenido de nuevo, ${data.name}!`);

      if (data.role === "ROLE_ADMIN" && !window.location.pathname.includes("admin.html")) {
        setTimeout(() => { window.location.href = "admin.html"; }, 800);
      } else {
        setTimeout(() => { window.location.reload(); }, 600);
      }
    } catch (err) {
      showToast(err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "Ingresar a Emark GM";
    }
  });

  document.getElementById("form-register")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;
    const btn = document.getElementById("btn-submit-register");

    try {
      btn.disabled = true;
      btn.textContent = "Registrando...";
      const res = await fetch(`${EMARK.API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Error en el registro");
      }

      const data = await res.json();
      saveAuthSession(data.token, { id: data.id, name: data.name, email: data.email, role: data.role });

      const modalInstance = bootstrap.Modal.getInstance(document.getElementById("authModal"));
      if (modalInstance) modalInstance.hide();
      showToast(`¡Cuenta creada con éxito! Bienvenido, ${data.name}`);

      setTimeout(() => { window.location.reload(); }, 700);
    } catch (err) {
      showToast(err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "Registrarme";
    }
  });
}

// Renderiza en la barra de navegación el estado del usuario
function renderAuthNav() {
  const container = document.getElementById("auth-nav-container");
  if (!container) return;

  const user = getCurrentUser();
  if (user) {
    const isAdmin = user.role === "ROLE_ADMIN";
    container.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-sm btn-auth-header dropdown-toggle d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown">
          <span>👤 ${user.name.split(" ")[0]} (${isAdmin ? "Admin" : "Cliente"})</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow">
          <li><h6 class="dropdown-header">${user.email}</h6></li>
          ${isAdmin ? '<li><a class="dropdown-item text-primary fw-bold" href="admin.html">⚙ Panel Admin</a></li>' : ''}
          <li><a class="dropdown-item" href="carrito.html">Mis Compras / Carrito</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item text-danger" onclick="logout()">Cerrar Sesión</button></li>
        </ul>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button class="btn btn-sm btn-auth-header" data-bs-toggle="modal" data-bs-target="#authModal">
        Ingresar / Registro
      </button>
    `;
  }
}

// ==========================================
// 2. SERVICIOS Y CONSUMO DE API REST
// ==========================================
async function fetchProductsFromAPI() {
  try {
    const res = await fetch(`${EMARK.API_BASE_URL}/products`);
    if (!res.ok) throw new Error("Error consultando el backend");
    const data = await res.json();
    // Normalizar modelo backend a la estructura usada en UI
    productos = data.map((p) => ({
      id: p.id,
      nombre: p.name,
      precio: Number(p.price),
      stock: p.stock,
      categoryId: p.categoryId,
      categoria: mapCategoryName(p.categoryId),
      marca: p.brand,
      maquinaria: p.machinery,
      imagen: p.imageUrl || "resources/prods/FILTRO DE ACEITE.jpg",
      descripcion: p.description || "",
      specs: p.specs ? p.specs.split(",").map(s => s.trim()) : [],
    }));
    return productos;
  } catch (err) {
    console.warn("Backend no disponible o error de red:", err);
    return [];
  }
}

function mapCategoryName(id) {
  const map = {
    1: "Filtros", 2: "Bombas", 3: "Kits", 4: "Hidráulica",
    5: "Transmisión", 6: "Sensores", 7: "Motor", 8: "Dirección",
    9: "Estructura", 10: "Fijación"
  };
  return map[id] || "Repuestos";
}

// ==========================================
// 3. LÓGICA DE CARRITO Y COTIZACIÓN
// ==========================================
function formatSoles(amount) {
  return `S/ ${Number(amount).toFixed(2)}`;
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
  const cart = getCart().filter((l) => l.id !== productId);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function cartSubtotal() {
  return getCart().reduce((sum, line) => sum + line.precio * line.cantidad, 0);
}

function calculateOrderTotals(subtotal, envioTipo, discount = 0) {
  const subAfterDiscount = Math.max(0, subtotal - discount);
  const igv = subAfterDiscount * EMARK.IGV_RATE;
  let costoEnvio = 0;
  if (envioTipo === "local") costoEnvio = EMARK.ENVIO_LOCAL;
  if (envioTipo === "provincia") costoEnvio = EMARK.ENVIO_PROVINCIA;
  const total = subAfterDiscount + igv + costoEnvio;
  return { sub: subAfterDiscount, igv, costoEnvio, total };
}

function updateCartBadge() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const count = cartItemCount();
  badges.forEach((el) => {
    el.textContent = count;
  });
}

function showToast(message) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
    toastContainer.style.zIndex = "1100";
    document.body.appendChild(toastContainer);
  }
  const id = `toast-${Date.now()}`;
  const el = document.createElement("div");
  el.className = "toast align-items-center text-bg-dark border-0";
  el.id = id;
  el.setAttribute("role", "alert");
  el.setAttribute("aria-live", "assertive");
  el.setAttribute("aria-atomic", "true");
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;
  toastContainer.appendChild(el);
  const toast = new bootstrap.Toast(el, { delay: 3500 });
  toast.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

// ==========================================
// 4. VISTA: INICIO (HOME)
// ==========================================
async function initHomeFeatured() {
  await fetchProductsFromAPI();
  const grid = document.getElementById("featured-products-grid");
  if (!grid) return;
  const featured = productos.slice(0, 6);
  grid.innerHTML = featured
    .map(
      (p) => `
    <div class="col-md-6 col-lg-4">
      <div class="product-card card h-100 shadow-sm border-0">
        <div class="product-card-img-wrap">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" onerror="this.src='resources/prods/FILTRO DE ACEITE.jpg'">
          <span class="badge badge-brand">${p.marca}</span>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <p class="product-category text-muted small text-uppercase mb-1">${p.categoria} · ${p.maquinaria}</p>
          <h3 class="card-title h5 mb-2">${p.nombre}</h3>
          <p class="product-desc small text-muted flex-grow-1">${p.descripcion}</p>
          <div class="product-pricing d-flex justify-content-between align-items-baseline mt-3 pt-3 border-top">
            <span class="product-price fs-4 fw-bold text-dark">${formatSoles(p.precio)}</span>
            <span class="small text-muted">Stock: ${p.stock}</span>
          </div>
          <button type="button" class="btn btn-emark mt-3 w-100" data-add-cart="${p.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  grid.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-add-cart"));
      if (addToCart(id, 1)) {
        showToast("Producto agregado al carrito");
      }
    });
  });
}

// ==========================================
// 5. VISTA: CATÁLOGO
// ==========================================
async function initCatalogPage() {
  await fetchProductsFromAPI();
  const grid = document.getElementById("catalog-grid");
  const countEl = document.getElementById("catalog-count");
  const filterCat = document.getElementById("filter-category");
  const filterBrand = document.getElementById("filter-brand");
  const filterMach = document.getElementById("filter-machinery");
  const searchInput = document.getElementById("catalog-search");
  const sortSelect = document.getElementById("catalog-sort");

  function getFiltered() {
    let list = [...productos];
    const cat = filterCat?.value || "";
    const brand = filterBrand?.value || "";
    const mach = filterMach?.value || "";
    const q = (searchInput?.value || "").toLowerCase().trim();

    if (cat) list = list.filter((p) => p.categoria.toLowerCase() === cat.toLowerCase());
    if (brand) list = list.filter((p) => p.marca.toLowerCase() === brand.toLowerCase());
    if (mach) list = list.filter((p) => p.maquinaria.toLowerCase() === mach.toLowerCase());
    if (q) {
      list = list.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.marca.toLowerCase().includes(q) ||
          p.maquinaria.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
      );
    }

    const sort = sortSelect?.value;
    if (sort === "price-asc") list.sort((a, b) => a.precio - b.precio);
    if (sort === "price-desc") list.sort((a, b) => b.precio - a.precio);
    if (sort === "name-asc") list.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return list;
  }

  function render() {
    const items = getFiltered();
    if (countEl) countEl.textContent = `${items.length} productos`;
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = `<div class="col-12 text-center py-5 text-muted">No se encontraron repuestos con los filtros seleccionados.</div>`;
      return;
    }

    grid.innerHTML = items
      .map(
        (p) => `
      <div class="col-sm-6 col-lg-4">
        <div class="product-card card h-100 shadow-sm border-0">
          <div class="product-card-img-wrap">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" onerror="this.src='resources/prods/FILTRO DE ACEITE.jpg'">
            <span class="badge badge-brand">${p.marca}</span>
          </div>
          <div class="card-body d-flex flex-column p-4">
            <p class="product-category text-muted small text-uppercase mb-1">${p.categoria} · ${p.maquinaria}</p>
            <h3 class="card-title h5 mb-2">${p.nombre}</h3>
            <p class="product-desc small text-muted flex-grow-1">${p.descripcion}</p>
            <div class="product-pricing d-flex justify-content-between align-items-baseline mt-3 pt-3 border-top">
              <span class="product-price fs-4 fw-bold text-dark">${formatSoles(p.precio)}</span>
              <span class="small text-muted">Stock: ${p.stock}</span>
            </div>
            <div class="d-flex gap-2 mt-3">
              <button type="button" class="btn btn-outline-secondary flex-grow-1" data-quickview="${p.id}">Detalles</button>
              <button type="button" class="btn btn-emark flex-grow-1" data-add-cart="${p.id}">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    grid.querySelectorAll("[data-add-cart]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-add-cart"));
        if (addToCart(id, 1)) showToast("Producto agregado al carrito");
      });
    });

    grid.querySelectorAll("[data-quickview]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-quickview"));
        openQuickview(id);
      });
    });
  }

  [filterCat, filterBrand, filterMach, sortSelect].forEach((el) => {
    el?.addEventListener("change", render);
  });
  searchInput?.addEventListener("input", render);

  const params = new URLSearchParams(window.location.search);
  const qParam = params.get("q");
  if (qParam && searchInput) {
    searchInput.value = qParam;
  }

  render();
}

function openQuickview(productId) {
  const p = productos.find((x) => x.id === productId);
  if (!p) return;
  const modalEl = document.getElementById("quickviewModal");
  if (!modalEl) return;
  modalEl.querySelector("[data-qv-title]").textContent = p.nombre;
  modalEl.querySelector("[data-qv-brand]").textContent = `${p.marca} · ${p.maquinaria}`;
  modalEl.querySelector("[data-qv-category]").textContent = p.categoria;
  modalEl.querySelector("[data-qv-price]").textContent = formatSoles(p.precio);
  modalEl.querySelector("[data-qv-desc]").textContent = p.descripcion;
  modalEl.querySelector("[data-qv-img]").src = p.imagen;
  const specsEl = modalEl.querySelector("[data-qv-specs]");
  if (specsEl) {
    specsEl.innerHTML = (p.specs || []).map((s) => `<li>${s}</li>`).join("");
  }
  const addBtn = modalEl.querySelector("[data-qv-add]");
  if (addBtn) {
    addBtn.onclick = () => {
      const qInput = modalEl.querySelector("#qv-qty");
      const qty = qInput ? Number(qInput.value) || 1 : 1;
      addToCart(p.id, qty);
      showToast(`${p.nombre} agregado al carrito`);
      bootstrap.Modal.getInstance(modalEl)?.hide();
    };
  }
  new bootstrap.Modal(modalEl).show();
}

// ==========================================
// 6. VISTA: CARRITO Y CHECKOUT SIMULADO
// ==========================================
function initCartPage() {
  const listEl = document.getElementById("cart-items-list");
  const emptyEl = document.getElementById("cart-empty-message");
  const subtotalEl = document.getElementById("order-subtotal");
  const igvEl = document.getElementById("order-igv");
  const shippingEl = document.getElementById("order-shipping");
  const totalEl = document.getElementById("order-total");
  const sumSubEl = document.getElementById("summary-subtotal");
  const sumIgvEl = document.getElementById("summary-igv");
  const sumShipEl = document.getElementById("summary-shipping");
  const sumTotalEl = document.getElementById("summary-total");
  const couponInput = document.getElementById("coupon-code");

  let discount = 0;

  // Si hay usuario logueado, prellenar campos
  const user = getCurrentUser();
  if (user) {
    const inputNombre = document.getElementById("cliente-nombre");
    if (inputNombre && !inputNombre.value) inputNombre.value = user.name;
  }

  function getShippingType() {
    const r = document.querySelector('input[name="envio"]:checked');
    return r ? r.value : "local";
  }

  function renderSummary() {
    const sub = cartSubtotal();
    const envioTipo = getShippingType();
    const totals = calculateOrderTotals(sub, envioTipo, discount);

    const txtSub = formatSoles(totals.sub);
    const txtIgv = formatSoles(totals.igv);
    const txtShip = formatSoles(totals.costoEnvio);
    const txtTot = formatSoles(totals.total);

    if (subtotalEl) subtotalEl.textContent = txtSub;
    if (igvEl) igvEl.textContent = txtIgv;
    if (shippingEl) shippingEl.textContent = txtShip;
    if (totalEl) totalEl.textContent = txtTot;
    if (sumSubEl) sumSubEl.textContent = txtSub;
    if (sumIgvEl) sumIgvEl.textContent = txtIgv;
    if (sumShipEl) sumShipEl.textContent = txtShip;
    if (sumTotalEl) sumTotalEl.textContent = txtTot;

    return totals;
  }

  function renderLines() {
    const cart = getCart();
    if (!listEl) return;
    if (!cart.length) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.classList.remove("d-none");
      renderSummary();
      return;
    }
    if (emptyEl) emptyEl.classList.add("d-none");

    listEl.innerHTML = cart
      .map(
        (l) => `
      <div class="cart-line d-flex flex-wrap align-items-center justify-content-between gap-3 py-3 border-bottom">
        <div class="d-flex align-items-center gap-3">
          <img src="${l.imagen}" alt="${l.nombre}" class="rounded" style="width: 64px; height: 64px; object-fit: cover;" onerror="this.src='resources/prods/FILTRO DE ACEITE.jpg'">
          <div>
            <h4 class="h6 mb-1">${l.nombre}</h4>
            <p class="small text-muted mb-0">${formatSoles(l.precio)} c/u</p>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="input-group input-group-sm" style="width: 120px;">
            <button class="btn btn-outline-secondary" type="button" data-qty-dec="${l.id}">−</button>
            <input type="number" class="form-control text-center" value="${l.cantidad}" min="1" max="${l.stock}" data-qty-input="${l.id}">
            <button class="btn btn-outline-secondary" type="button" data-qty-inc="${l.id}">+</button>
          </div>
          <span class="fw-bold" style="min-width: 90px; text-align: right;">${formatSoles(l.precio * l.cantidad)}</span>
          <button type="button" class="btn btn-link text-danger p-0 ms-2" data-remove="${l.id}" title="Eliminar">✕</button>
        </div>
      </div>
    `
      )
      .join("");

    listEl.querySelectorAll("[data-qty-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-qty-dec"));
        const line = getCart().find((x) => x.id === id);
        if (line) setCartQuantity(id, line.cantidad - 1);
        renderLines();
      });
    });

    listEl.querySelectorAll("[data-qty-inc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-qty-inc"));
        const line = getCart().find((x) => x.id === id);
        if (line) setCartQuantity(id, line.cantidad + 1);
        renderLines();
      });
    });

    listEl.querySelectorAll("[data-qty-input]").forEach((inp) => {
      inp.addEventListener("change", () => {
        const id = Number(inp.getAttribute("data-qty-input"));
        setCartQuantity(id, Number(inp.value));
        renderLines();
      });
    });

    listEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(Number(btn.getAttribute("data-remove")));
        renderLines();
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

  // Finalizar compra (Conexión al Backend REST con Simulación)
  document.getElementById("btn-finalizar")?.addEventListener("click", async () => {
    const nombre = document.getElementById("cliente-nombre")?.value?.trim();
    const doc = document.getElementById("cliente-doc")?.value?.trim();
    const distrito = document.getElementById("cliente-distrito")?.value?.trim();
    const direccion = document.getElementById("cliente-direccion")?.value?.trim();

    if (!getCart().length) {
      showToast("Tu carrito está vacío");
      return;
    }
    if (!nombre || !doc || !distrito) {
      showToast("Completa los datos del cliente y facturación");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      showToast("Por favor, inicia sesión para completar tu pedido");
      const authModal = new bootstrap.Modal(document.getElementById("authModal"));
      authModal.show();
      return;
    }

    const pago = document.querySelector('input[name="pago"]:checked')?.value || "transferencia";
    const envio = document.querySelector('input[name="envio"]:checked')?.value || "local";
    const totals = renderSummary();

    const checkoutData = {
      clientName: nombre,
      clientDoc: doc,
      dispatchType: envio,
      paymentMethod: pago,
      address: `${distrito} - ${direccion}`,
      shippingCost: totals.costoEnvio,
      subtotal: totals.sub,
      igv: totals.igv,
      total: totals.total,
      items: getCart().map((i) => ({
        productId: i.id,
        quantity: i.cantidad,
        unitPrice: i.precio,
      })),
    };

    const btn = document.getElementById("btn-finalizar");
    try {
      btn.disabled = true;
      btn.textContent = "Procesando...";

      const res = await fetch(`${EMARK.API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(checkoutData),
      });

      if (!res.ok) {
        throw new Error("No se pudo registrar la compra en el servidor");
      }

      const orderConfirm = await res.json();
      clearCart();

      // Mostrar modal de confirmación con datos simulados
      document.getElementById("pedido-id").textContent = `#${orderConfirm.orderId}`;
      const descModal = document.querySelector("#orderModal .modal-body p");
      if (descModal) {
        descModal.innerHTML = `
          <strong>${orderConfirm.message}</strong><br><br>
          <div class="alert alert-success text-start small mb-0">
            ${orderConfirm.simulatedNotification}
          </div>
        `;
      }

      const confirmModal = document.getElementById("orderModal");
      if (confirmModal) new bootstrap.Modal(confirmModal).show();

      renderLines();
    } catch (err) {
      showToast(err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "Finalizar compra";
    }
  });

  renderLines();
}

// ==========================================
// 7. VISTA: PANEL ADMINISTRADOR (CRUD)
// ==========================================
async function initAdminPage() {
  const user = getCurrentUser();
  if (!user || user.role !== "ROLE_ADMIN") {
    alert("Acceso Restringido: Se requieren permisos de Administrador.");
    window.location.href = "index.html";
    return;
  }

  const infoEl = document.getElementById("admin-user-info");
  if (infoEl) infoEl.textContent = `Sesión: ${user.name} (${user.email})`;

  const tbody = document.getElementById("admin-product-tbody");
  const countEl = document.getElementById("admin-product-count");
  const searchInput = document.getElementById("admin-search");
  const formProd = document.getElementById("form-producto");
  const modalProdEl = document.getElementById("productoModal");
  const modalProd = new bootstrap.Modal(modalProdEl);

  async function loadAdminProducts() {
    const list = await fetchProductsFromAPI();
    renderTable(list);
  }

  function renderTable(list) {
    if (countEl) countEl.textContent = list.length;
    if (!tbody) return;

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">No hay repuestos registrados.</td></tr>`;
      return;
    }

    tbody.innerHTML = list
      .map(
        (p) => `
      <tr>
        <td class="fw-bold">${p.id}</td>
        <td>
          <img src="${p.imagen}" alt="${p.nombre}" class="rounded" style="width: 48px; height: 48px; object-fit: cover;" onerror="this.src='resources/prods/FILTRO DE ACEITE.jpg'">
        </td>
        <td>
          <strong>${p.nombre}</strong><br>
          <small class="text-muted">${p.categoria}</small>
        </td>
        <td>${p.marca}</td>
        <td>${p.maquinaria}</td>
        <td class="fw-bold text-dark">${formatSoles(p.precio)}</td>
        <td><span class="badge ${p.stock > 5 ? "bg-success" : "bg-warning text-dark"}">${p.stock} un.</span></td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-primary me-1" data-edit="${p.id}">Editar</button>
          <button class="btn btn-sm btn-outline-danger" data-delete="${p.id}">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");

    tbody.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-edit"));
        const prod = productos.find((x) => x.id === id);
        if (prod) openEditProduct(prod);
      });
    });

    tbody.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-delete"));
        deleteProduct(id);
      });
    });
  }

  function openEditProduct(p) {
    document.getElementById("productoModalTitle").textContent = "Modificar Repuesto";
    document.getElementById("prod-id").value = p.id;
    document.getElementById("prod-nombre").value = p.nombre;
    document.getElementById("prod-categoria").value = p.categoryId || 1;
    document.getElementById("prod-precio").value = p.precio;
    document.getElementById("prod-stock").value = p.stock;
    document.getElementById("prod-marca").value = p.marca;
    document.getElementById("prod-maquinaria").value = p.maquinaria;
    document.getElementById("prod-imagen").value = p.imagen;
    document.getElementById("prod-desc").value = p.descripcion;
    document.getElementById("prod-specs").value = (p.specs || []).join(", ");
    modalProd.show();
  }

  document.getElementById("btn-nuevo-producto")?.addEventListener("click", () => {
    document.getElementById("productoModalTitle").textContent = "Nuevo Repuesto";
    formProd.reset();
    document.getElementById("prod-id").value = "";
  });

  formProd.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("prod-id").value;
    const body = {
      name: document.getElementById("prod-nombre").value.trim(),
      categoryId: Number(document.getElementById("prod-categoria").value),
      price: Number(document.getElementById("prod-precio").value),
      stock: Number(document.getElementById("prod-stock").value),
      brand: document.getElementById("prod-marca").value.trim(),
      machinery: document.getElementById("prod-maquinaria").value.trim(),
      imageUrl: document.getElementById("prod-imagen").value.trim() || "resources/prods/FILTRO DE ACEITE.jpg",
      description: document.getElementById("prod-desc").value.trim(),
      specs: document.getElementById("prod-specs").value.trim(),
    };

    const token = getAuthToken();
    const isEdit = Boolean(id);
    const url = isEdit ? `${EMARK.API_BASE_URL}/products/${id}` : `${EMARK.API_BASE_URL}/products`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar el producto en el servidor");

      modalProd.hide();
      showToast(isEdit ? "Producto actualizado con éxito" : "Nuevo producto registrado");
      loadAdminProducts();
    } catch (err) {
      showToast(err.message);
    }
  });

  async function deleteProduct(id) {
    if (!confirm(`¿Estás seguro de eliminar el producto #${id}?`)) return;
    const token = getAuthToken();
    try {
      const res = await fetch(`${EMARK.API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al eliminar el producto");
      showToast("Producto eliminado del catálogo");
      loadAdminProducts();
    } catch (err) {
      showToast(err.message);
    }
  }

  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    const filtered = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.maquinaria.toLowerCase().includes(q)
    );
    renderTable(filtered);
  });

  loadAdminProducts();
}

// Búsqueda en el Header
function initHeaderSearch() {
  document.querySelectorAll("[data-header-search]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = f.querySelector('input[type="search"]');
      const q = (input?.value || "").trim();
      if (q) window.location.href = `catalogo.html?q=${encodeURIComponent(q)}`;
    });
  });
}

// ==========================================
// 8. INICIALIZACIÓN GENERAL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  ensureAuthModalInDOM();
  renderAuthNav();
  updateCartBadge();
  initHeaderSearch();

  const page = document.body.dataset.page;
  if (page === "home") initHomeFeatured();
  if (page === "catalog") initCatalogPage();
  if (page === "cart") initCartPage();
  if (page === "admin") initAdminPage();
});
