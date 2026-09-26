/* =========================================================
   HOME MODULE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const HomeModule = (() => {
  let initialized = false;

  /* =======================================================
     INIT
     ======================================================= */

  async function init() {
    initialized = false;

    /*
     * Pastikan user masih tersedia.
     */

    const user = Auth.getUser();

    if (!user) {
      console.warn("[HOME] Session pengguna tidak ditemukan.");

      await Router.navigate(CONFIG.ROUTE.LOGIN);

      return;
    }

    /*
     * Render loading state.
     */

    renderLoading();

    try {
      /*
       * Ambil dashboard dari service.
       */

      const result = await HomeService.getDashboard();

      /*
       * Jika session sudah tidak valid.
       */

      if (!result || result.success !== true) {
        handleServiceError(result);

        return;
      }

      /*
       * Render dashboard.
       */

      render(result.data);

      /*
       * Bind event setelah HTML tersedia.
       */

      bindEvents();

      initialized = true;
    } catch (error) {
      console.error("[HOME] Gagal memuat dashboard:", error);

      renderError(error?.message || "Dashboard gagal dimuat.");
    }
  }

  /* =======================================================
     RENDER
     ======================================================= */

  function render(data = {}) {
    const main = document.getElementById("qedev-main");

    if (!main) {
      console.error("[HOME] #qedev-main tidak ditemukan.");

      return;
    }

    main.innerHTML = HomeView.render(data);
  }

  /* =======================================================
     LOADING
     ======================================================= */

  function renderLoading() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = `

      <div class="home-page">

        <div class="home-loading">

          <div class="home-loading-card">

            <div class="home-loading-icon">

              <i class="fa-solid fa-spinner fa-spin"></i>

            </div>

            <div class="home-loading-title">
              Memuat dashboard...
            </div>

            <div class="home-loading-description">
              Mengambil data terbaru.
            </div>

          </div>

        </div>

      </div>

    `;
  }

  /* =======================================================
     ERROR
     ======================================================= */

  function renderError(message) {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = `

      <div class="home-page">

        <div class="home-error">

          <div class="home-error-icon">

            <i class="fa-solid fa-triangle-exclamation"></i>

          </div>


          <h2>
            Dashboard tidak dapat dimuat
          </h2>


          <p>
            ${escapeHtml(message || "Terjadi kesalahan.")}
          </p>


          <button
            type="button"
            class="home-error-button"
            data-home-action="reload"
          >
            <i class="fa-solid fa-rotate-right"></i>
            Coba Lagi
          </button>

        </div>

      </div>

    `;

    bindEvents();
  }

  /* =======================================================
     SERVICE ERROR
     ======================================================= */

  function handleServiceError(result) {
    const message = result?.message || "Gagal memuat dashboard.";

    /*
     * Jika backend mengembalikan unauthorized,
     * session harus dibersihkan.
     */

    const code = result?.code;

    if (code === "UNAUTHORIZED" || code === 401 || code === "401") {
      Auth.logout();

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error("Session telah berakhir. Silakan login kembali.");
      }

      Router.navigate(CONFIG.ROUTE.LOGIN);

      return;
    }

    renderError(message);
  }

  /* =======================================================
     BIND EVENTS
     ======================================================= */

  function bindEvents() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    /*
     * Hindari duplicate listener.
     *
     * Kita gunakan satu delegated listener.
     */

    main.removeEventListener("click", handleClick);

    main.addEventListener("click", handleClick);
  }

  /* =======================================================
     HANDLE CLICK
     ======================================================= */

  async function handleClick(event) {
    const target = event.target.closest("[data-home-action]");

    if (!target) {
      return;
    }

    const action = target.dataset.homeAction;

    if (!action) {
      return;
    }

    switch (action) {
      /* ---------------------------------------------------
         RELOAD
         --------------------------------------------------- */

      case "reload":
        await init();

        break;

      /* ---------------------------------------------------
         INPUT IURAN
         --------------------------------------------------- */

      case "iuran":
        await navigate("iuran");

        break;

      /* ---------------------------------------------------
         TRANSAKSI
         --------------------------------------------------- */

      case "transaksi":
        await navigate("transaksi");

        break;

      /* ---------------------------------------------------
         SETORAN
         --------------------------------------------------- */

      case "setoran":
        await navigate("setoran");

        break;

      /* ---------------------------------------------------
         PENGELUARAN
         --------------------------------------------------- */

      case "pengeluaran":
        await navigate("pengeluaran");

        break;

      /* ---------------------------------------------------
         ANGGOTA
         --------------------------------------------------- */

      case "anggota":
        await navigate("anggota");

        break;

      /* ---------------------------------------------------
         DEFAULT
         --------------------------------------------------- */

      default:
        console.warn("[HOME] Action tidak dikenal:", action);

        break;
    }
  }

  /* =======================================================
     NAVIGATE
     ======================================================= */

  async function navigate(route) {
    if (!route) {
      return;
    }

    if (
      typeof Router === "undefined" ||
      typeof Router.navigate !== "function"
    ) {
      console.error("[HOME] Router tidak tersedia.");

      return;
    }

    await Router.navigate(route);
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
    init,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.HomeModule = HomeModule;
