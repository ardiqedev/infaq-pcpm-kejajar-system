/**
 * ==========================================
 * QEDEV Framework
 * Loading Component
 * ==========================================
 */

const Loading = (() => {
  let overlay = null;
  let message = null;

  let visible = false;
  let initialized = false;

  /**
   * ==========================================
   * Render
   * ==========================================
   */
  function render() {
    return `
      <div
        id="qedev-loading"
        class="qedev-loading-overlay hidden"
        role="status"
        aria-live="polite">

        <div class="qedev-loading">

          <div
            class="qedev-loading-spinner"
            aria-hidden="true">
          </div>

          <div class="qedev-loading-message">

              Loading...

          </div>

          <div class="qedev-loading-subtitle">

              Mohon tunggu sebentar...

          </div>

        </div>

      </div>
    `;
  }

  /**
   * ==========================================
   * Initialize
   * ==========================================
   */
  function init() {
    if (initialized) {
      return;
    }

    cache();

    if (!overlay) {
      console.warn("QEDEV Loading tidak ditemukan.");

      return;
    }

    bindEvents();

    initialized = true;
  }

  /**
   * ==========================================
   * Cache Elements
   * ==========================================
   */
  function cache() {
    overlay = document.getElementById("qedev-loading");

    if (!overlay) {
      message = null;

      return;
    }

    message = overlay.querySelector(".qedev-loading-message");
  }

  /**
   * ==========================================
   * Bind Events
   * ==========================================
   */
  function bindEvents() {
    // Reserved
  }

  /**
   * ==========================================
   * Show
   * ==========================================
   */
  function show(text = "Loading...") {
    if (!initialized) {
      init();
    }

    if (!overlay || !message) {
      return;
    }

    message.textContent = text;

    overlay.classList.remove("hidden");

    lock();

    visible = true;
  }

  /**
   * ==========================================
   * Hide
   * ==========================================
   */
  function hide() {
    if (!overlay) {
      return;
    }

    overlay.classList.add("hidden");

    unlock();

    destroy();

    visible = false;
  }

  /**
   * ==========================================
   * Destroy
   * ==========================================
   */
  function destroy() {
    if (!message) {
      return;
    }

    message.textContent = "Loading...";
  }

  /**
   * ==========================================
   * Lock Body
   * ==========================================
   */
  function lock() {
    document.body.style.overflow = "hidden";
  }

  /**
   * ==========================================
   * Unlock Body
   * ==========================================
   */
  function unlock() {
    document.body.style.overflow = "";
  }

  /**
   * ==========================================
   * Is Visible
   * ==========================================
   */
  function isVisible() {
    return visible;
  }

  return {
    render,

    init,

    show,

    hide,

    destroy,

    isVisible,
  };
})();

window.Loading = Loading;
