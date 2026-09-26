/* =========================================================
   QEDEV APP ENGINE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const App = (() => {
  let ready = false;

  /* =======================================================
     INIT
     ======================================================= */

  function init() {
    if (ready) {
      return;
    }

    /*
     * App engine hanya menandai bahwa
     * aplikasi sudah selesai bootstrap.
     *
     * Business logic tetap berada di module.
     */

    ready = true;

    if (CONFIG.DEBUG) {
      console.log(`[APP] ${CONFIG.APP_NAME} v${CONFIG.VERSION}`);

      console.log("[APP] Application ready.");
    }
  }

  /* =======================================================
     IS READY
     ======================================================= */

  function isReady() {
    return ready;
  }

  /* =======================================================
     APP INFO
     ======================================================= */

  function getName() {
    return CONFIG.APP_NAME;
  }

  function getCode() {
    return CONFIG.APP_CODE;
  }

  function getVersion() {
    return CONFIG.VERSION;
  }

  function getDescription() {
    return CONFIG.APP_DESCRIPTION;
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    init,
    isReady,

    getName,
    getCode,
    getVersion,
    getDescription,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.App = App;
