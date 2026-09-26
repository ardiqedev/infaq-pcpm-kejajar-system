/* =========================================================
   QEDEV ROUTER
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const Router = (() => {
  let currentRoute = null;
  let initialized = false;

  /* =======================================================
     ROUTES
     ======================================================= */

  const routes = {
    /* -----------------------------------------------------
       AUTH
       ----------------------------------------------------- */

    login: {
      module: "LoginModule",
      layout: {
        header: false,
        navbar: false,
      },
    },

    /* -----------------------------------------------------
       HOME
       ----------------------------------------------------- */

    home: {
      module: "HomeModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       PENARIK
       ----------------------------------------------------- */

    iuran: {
      module: "IuranModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    transaksi: {
      module: "TransaksiModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       SETORAN
       ----------------------------------------------------- */

    setoran: {
      module: "SetoranModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       ANGGOTA
       ----------------------------------------------------- */

    anggota: {
      module: "AnggotaModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       PENGELUARAN
       ----------------------------------------------------- */

    pengeluaran: {
      module: "PengeluaranModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       LAPORAN
       ----------------------------------------------------- */

    laporan: {
      module: "LaporanModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       PENGGUNA
       ----------------------------------------------------- */

    pengguna: {
      module: "PenggunaModule",
      layout: {
        header: true,
        navbar: true,
      },
    },

    /* -----------------------------------------------------
       PROFIL
       ----------------------------------------------------- */

    profil: {
      module: "ProfilModule",
      layout: {
        header: true,
        navbar: true,
      },
    },
  };

  /* =======================================================
     GET ROUTE
     ======================================================= */

  function getRoute(route) {
    return routes[route] || null;
  }

  /* =======================================================
     CHECK ROUTE
     ======================================================= */

  function hasRoute(route) {
    return !!routes[route];
  }

  /* =======================================================
     NAVIGATE
     ======================================================= */

  async function navigate(route, options = {}) {
    const routeConfig = getRoute(route);

    /* -----------------------------------------------------
       Route tidak ditemukan
       ----------------------------------------------------- */

    if (!routeConfig) {
      console.error(`[ROUTER] Route "${route}" tidak ditemukan.`);

      /*
       * Jangan recursive redirect jika login sendiri
       * tidak tersedia.
       */

      if (route !== CONFIG.DEFAULT_ROUTE && hasRoute(CONFIG.DEFAULT_ROUTE)) {
        return navigate(CONFIG.DEFAULT_ROUTE);
      }

      return false;
    }

    /* -----------------------------------------------------
       Cek module
       ----------------------------------------------------- */

    const moduleName = routeConfig.module;

    const module = window[moduleName];

    if (!module) {
      console.error(`[ROUTER] Module "${moduleName}" belum tersedia.`);

      /*
       * Untuk development, tampilkan error
       * melalui console tanpa membuat aplikasi
       * crash total.
       */

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(`Module ${moduleName} belum tersedia.`);
      }

      return false;
    }

    /* -----------------------------------------------------
       Loading
       ----------------------------------------------------- */

    if (typeof Loading !== "undefined" && typeof Loading.show === "function") {
      Loading.show();
    }

    try {
      /* ---------------------------------------------------
         Layout
         --------------------------------------------------- */

      initializeLayout(routeConfig.layout || {});

      /* ---------------------------------------------------
         Update route
         --------------------------------------------------- */

      currentRoute = route;

      /* ---------------------------------------------------
         Module init
         --------------------------------------------------- */

      if (typeof module.init === "function") {
        await module.init(options);
      }

      /* ---------------------------------------------------
         Navbar active state
         --------------------------------------------------- */

      if (
        typeof Navbar !== "undefined" &&
        typeof Navbar.updateActive === "function"
      ) {
        Navbar.updateActive();
      }

      /* ---------------------------------------------------
         Launcher
         --------------------------------------------------- */

      if (
        typeof Launcher !== "undefined" &&
        typeof Launcher.close === "function"
      ) {
        Launcher.close();
      }

      return true;
    } catch (error) {
      console.error(`[ROUTER] Error pada route "${route}":`, error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error?.message || "Gagal membuka halaman.");
      }

      return false;
    } finally {
      if (
        typeof Loading !== "undefined" &&
        typeof Loading.hide === "function"
      ) {
        Loading.hide();
      }
    }
  }

  /* =======================================================
     INITIALIZE LAYOUT
     ======================================================= */

  function initializeLayout(options = {}) {
    if (typeof Layout === "undefined") {
      throw new Error("Layout belum tersedia.");
    }

    Layout.init({
      header: options.header !== false,

      navbar: options.navbar !== false,
    });
  }

  /* =======================================================
     CURRENT ROUTE
     ======================================================= */

  function current() {
    return currentRoute;
  }

  /* =======================================================
     GET CURRENT CONFIG
     ======================================================= */

  function currentConfig() {
    if (!currentRoute) {
      return null;
    }

    return getRoute(currentRoute);
  }

  /* =======================================================
     INITIALIZE ROUTER
     ======================================================= */

  async function init() {
    if (initialized) {
      return;
    }

    initialized = true;

    const defaultRoute = CONFIG.DEFAULT_ROUTE || "login";

    await navigate(defaultRoute);
  }

  /* =======================================================
     IS INITIALIZED
     ======================================================= */

  function isInitialized() {
    return initialized;
  }

  /* =======================================================
     GET ALL ROUTES
     ======================================================= */

  function getRoutes() {
    return Object.keys(routes);
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    navigate,

    current,
    currentConfig,

    getRoute,
    getRoutes,
    hasRoute,

    init,
    isInitialized,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.Router = Router;
