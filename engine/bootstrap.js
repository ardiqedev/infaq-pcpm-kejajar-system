/* =========================================================
   QEDEV BOOTSTRAP
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const Bootstrap = (() => {
  let initialized = false;

  /* =======================================================
     INIT
     ======================================================= */

  async function init() {
    if (initialized) {
      return;
    }

    initialized = true;

    try {
      /* ---------------------------------------------------
         Initialize component/form engine
         --------------------------------------------------- */

      if (typeof Form !== "undefined" && typeof Form.init === "function") {
        Form.init();
      }

      /* ---------------------------------------------------
         Initialize application
         --------------------------------------------------- */
      await initializeApplication();

      /* ---------------------------------------------------
   Toast
   --------------------------------------------------- */

      if (typeof Toast !== "undefined" && typeof Toast.init === "function") {
        Toast.init();
      }

      /* ---------------------------------------------------
   Launcher
   --------------------------------------------------- */

      if (
        typeof Launcher !== "undefined" &&
        typeof Launcher.bindEvents === "function"
      ) {
        Launcher.bindEvents();
      }

      /* ---------------------------------------------------
         App
         --------------------------------------------------- */

      if (typeof App !== "undefined" && typeof App.init === "function") {
        App.init();
      }
    } catch (error) {
      console.error("[BOOTSTRAP] Initialization error:", error);

      handleInitializationError(error);
    }
  }

  /* =======================================================
     INITIALIZE APPLICATION
     ======================================================= */

  async function initializeApplication() {
    /*
     * Pastikan router tersedia.
     */
    if (typeof Router === "undefined") {
      throw new Error("Router belum tersedia.");
    }

    /*
     * -----------------------------------------------------
     * CASE 1
     * Tidak ada session lokal
     * -----------------------------------------------------
     */

    if (!Auth.isAuthenticated()) {
      console.log("[BOOTSTRAP] Tidak ada session. → login");

      Router.navigate("login");

      return;
    }

    /*
     * -----------------------------------------------------
     * CASE 2
     * Ada session lokal
     *
     * Jangan langsung percaya localStorage.
     * Verifikasi token ke backend.
     * -----------------------------------------------------
     */

    console.log("[BOOTSTRAP] Session ditemukan. Verifikasi...");

    const verification = await Auth.verifySession();

    /*
     * -----------------------------------------------------
     * Session valid
     * -----------------------------------------------------
     */

    if (
      verification &&
      verification.success === true &&
      verification.authenticated === true
    ) {
      console.log("[BOOTSTRAP] Session valid. → home");

      Router.navigate("home");

      return;
    }

    /*
     * -----------------------------------------------------
     * Session invalid
     * -----------------------------------------------------
     */

    console.warn("[BOOTSTRAP] Session tidak valid. → login");

    Auth.clearSession();

    Router.navigate("login");
  }

  /* =======================================================
     INITIALIZATION ERROR
     ======================================================= */

  function handleInitializationError(error) {
    console.error("[BOOTSTRAP] Fatal error:", error);

    /*
     * Kalau Router tersedia, arahkan ke login.
     *
     * Jangan membuat aplikasi blank hanya karena
     * session verification gagal.
     */

    try {
      if (
        typeof Auth !== "undefined" &&
        typeof Auth.clearSession === "function"
      ) {
        Auth.clearSession();
      }

      if (
        typeof Router !== "undefined" &&
        typeof Router.navigate === "function"
      ) {
        Router.navigate("login");
      }
    } catch (fallbackError) {
      console.error("[BOOTSTRAP] Fallback error:", fallbackError);
    }
  }

  /* =======================================================
     IS INITIALIZED
     ======================================================= */

  function isInitialized() {
    return initialized;
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    init,
    isInitialized,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.Bootstrap = Bootstrap;

/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  Bootstrap.init();
});
