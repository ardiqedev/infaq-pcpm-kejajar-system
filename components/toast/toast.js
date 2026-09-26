/**
 * ==========================================
 * QEDEV Framework
 * Toast Component
 * ==========================================
 */

const Toast = (() => {
  let toast;
  let icon;
  let title;
  let message;
  let progress;
  let closeButton;

  let timer;
  let initialized = false;

  function render() {
    return `
    <div
      id="qedev-toast"
      class="qedev-toast hidden"
      role="status"
      aria-live="polite">

      <div class="qedev-toast-icon"></div>

      <div class="qedev-toast-content">

        <div class="qedev-toast-header">

          <div class="qedev-toast-title"></div>

          <button
            type="button"
            class="qedev-toast-close"
            aria-label="Tutup notifikasi">

            <i class="fa-solid fa-xmark"></i>

          </button>

        </div>

        <div class="qedev-toast-message"></div>

      </div>

      <div class="qedev-toast-progress"></div>

    </div>
  `;
  }

  function init() {
    console.log("=== TOAST INIT ===");

    toast = document.getElementById("qedev-toast");

    console.log("Toast Element :", toast);

    if (!toast) {
      console.error("Toast tidak ditemukan!");

      return;
    }

    icon = toast.querySelector(".qedev-toast-icon");

    title = toast.querySelector(".qedev-toast-title");

    message = toast.querySelector(".qedev-toast-message");

    progress = toast.querySelector(".qedev-toast-progress");

    closeButton = toast.querySelector(".qedev-toast-close");
    bindEvents();

    initialized = true;
  }

  /**
   * ==========================================
   * Toast Configuration
   * ==========================================
   */
  function getConfig(type) {
    const config = {
      success: {
        title: "Berhasil",
        icon: "fa-solid fa-circle-check",
      },

      error: {
        title: "Login Gagal",
        icon: "fa-solid fa-circle-xmark",
      },

      warning: {
        title: "Perhatian",
        icon: "fa-solid fa-triangle-exclamation",
      },

      info: {
        title: "Informasi",
        icon: "fa-solid fa-circle-info",
      },

      comingSoon: {
        title: "🚧 Dalam Pengembangan",
        icon: "fa-solid fa-screwdriver-wrench",
      },
    };

    return config[type] || config.info;
  }

  function show(type, text) {
    console.log("=== SHOW TOAST ===");

    console.log("Initialized :", initialized);

    console.log("Toast :", toast);

    if (!toast) {
      console.error("Toast NULL");

      return;
    }

    clearTimeout(timer);

    const config = getConfig(type);

    toast.className = "qedev-toast";

    progress.style.animation = "none";

    progress.offsetHeight;

    progress.style.animation = "";

    toast.classList.add(`qedev-toast-${type}`);

    icon.innerHTML = `<i class="${config.icon}"></i>`;

    title.textContent = config.title;

    message.textContent = text;

    toast.classList.remove("hidden");

    console.log("Class :", toast.className);

    const duration = 3000;

    timer = setTimeout(hide, duration);
  }

  function comingSoon() {
    show("comingSoon", "Fitur ini belum tersedia.");
  }

  function success(text) {
    show("success", text);
  }

  function error(text) {
    show("error", text);
  }

  function warning(text) {
    show("warning", text);
  }

  function info(text) {
    show("info", text);
  }

  function bindEvents() {
    if (!closeButton) return;

    closeButton.onclick = hide;
  }

  function hide() {
    if (!toast) return;

    clearTimeout(timer);

    toast.classList.add("hidden");
  }

  function destroy() {
    hide();

    icon.innerHTML = "";

    title.textContent = "";

    message.textContent = "";
  }

  return {
    render,

    init,

    success,

    error,

    warning,

    info,

    comingSoon,

    hide,

    destroy,
  };
})();

window.Toast = Toast;
