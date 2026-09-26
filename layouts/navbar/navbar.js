/* =========================================================
   QEDEV NAVBAR
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const Navbar = (() => {
  let bound = false;

  /* =======================================================
     MENU CONFIGURATION
     ======================================================= */

  const ADMIN_MENUS = [
    {
      route: "home",
      icon: "fa-solid fa-house",
      label: "Home",
    },

    {
      route: "setoran",
      icon: "fa-solid fa-money-bill-transfer",
      label: "Setoran",
    },

    {
      route: "anggota",
      icon: "fa-solid fa-users",
      label: "Anggota",
    },

    {
      route: "pengeluaran",
      icon: "fa-solid fa-wallet",
      label: "Pengeluaran",
    },

    {
      route: "menu",
      icon: "fa-solid fa-bars",
      label: "Menu",
    },
  ];

  const PENARIK_MENUS = [
    {
      route: "home",
      icon: "fa-solid fa-house",
      label: "Home",
    },

    {
      route: "iuran",
      icon: "fa-solid fa-hand-holding-heart",
      label: "Iuran",
    },

    {
      route: "transaksi",
      icon: "fa-solid fa-receipt",
      label: "Transaksi",
    },

    {
      route: "setoran",
      icon: "fa-solid fa-money-bill-transfer",
      label: "Setoran",
    },
  ];

  /* =======================================================
     GET CURRENT USER
     ======================================================= */

  function getUser() {
    if (typeof Auth === "undefined" || typeof Auth.getUser !== "function") {
      return null;
    }

    return Auth.getUser();
  }

  /* =======================================================
     GET MENUS
     ======================================================= */

  function getMenus() {
    const user = getUser();

    if (!user) {
      return [];
    }

    if (user.ROLE === "ADMIN") {
      return ADMIN_MENUS;
    }

    if (user.ROLE === "PENARIK") {
      return PENARIK_MENUS;
    }

    return [];
  }

  /* =======================================================
     RENDER
     ======================================================= */

  function render() {
    const menus = getMenus();

    if (!menus.length) {
      return `
        <nav
          id="qedev-navbar"
          class="qedev-navbar-container"
          aria-label="Navigasi utama"
        ></nav>
      `;
    }

    return `
      <nav
        id="qedev-navbar"
        class="qedev-navbar-container"
        aria-label="Navigasi utama"
      >

        <div class="qedev-navbar-inner">

          ${menus.map(renderMenuItem).join("")}

        </div>

      </nav>
    `;
  }

  /* =======================================================
     RENDER MENU ITEM
     ======================================================= */

  function renderMenuItem(item) {
    return `
      <button
        type="button"
        class="qedev-navbar-item"
        data-route="${escapeHtml(item.route)}"
        aria-label="${escapeHtml(item.label)}"
      >

        <span class="qedev-navbar-icon">

          <i class="${escapeHtml(item.icon)}"></i>

        </span>

        <span class="qedev-navbar-label">
          ${escapeHtml(item.label)}
        </span>

      </button>
    `;
  }

  /* =======================================================
     BIND EVENTS
     ======================================================= */

  function bindEvents() {
    /*
     * Listener dipasang ke document menggunakan
     * event delegation.
     *
     * Tujuannya:
     * Navbar boleh dirender ulang / diganti DOM,
     * tetapi listener tetap aktif.
     */
    if (bound) {
      return;
    }

    bound = true;

    document.addEventListener("click", handleClick);
  }
  /* =======================================================
     HANDLE CLICK
     ======================================================= */

  async function handleClick(event) {
    const button = event.target.closest("#qedev-navbar [data-route]");

    if (!button) {
      return;
    }

    const route = button.dataset.route;

    if (!route) {
      return;
    }

    /* -----------------------------------------------------
     MENU SPECIAL ACTION
     ----------------------------------------------------- */

    if (route === "menu") {
      openMenu();

      return;
    }

    /* -----------------------------------------------------
     ROUTE
     ----------------------------------------------------- */

    if (
      typeof Router !== "undefined" &&
      typeof Router.navigate === "function"
    ) {
      await Router.navigate(route);
    }
  }

  /* =======================================================
     OPEN MENU
     ======================================================= */

  function openMenu() {
    /*
     * Launcher adalah menu tambahan yang nantinya
     * berisi:
     *
     * - Laporan
     * - Pengguna
     * - Profil
     * - Keluar
     *
     * Untuk sekarang kita serahkan ke Launcher.
     */

    if (
      typeof Launcher !== "undefined" &&
      typeof Launcher.open === "function"
    ) {
      Launcher.open();

      return;
    }

    /*
     * Fallback sementara.
     */

    console.warn("[NAVBAR] Launcher belum tersedia.");
  }

  /* =======================================================
     UPDATE ACTIVE
     ======================================================= */

  function updateActive() {
    const navbar = document.getElementById("qedev-navbar");

    if (!navbar) {
      return;
    }

    const currentRoute =
      typeof Router !== "undefined" && typeof Router.current === "function"
        ? Router.current()
        : null;

    const buttons = navbar.querySelectorAll("[data-route]");

    buttons.forEach((button) => {
      const route = button.dataset.route;

      const active = route === currentRoute;

      button.classList.toggle("is-active", active);

      button.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  /* =======================================================
     REFRESH
     ======================================================= */

  function refresh() {
    const navbar = document.getElementById("qedev-navbar");

    if (!navbar) {
      return;
    }

    navbar.outerHTML = render();

    updateActive();
  }

  /* =======================================================
     ESCAPE HTML
     ======================================================= */

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    render,
    bindEvents,
    updateActive,
    refresh,

    getMenus,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.Navbar = Navbar;
