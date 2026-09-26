/**
 * ==========================================
 * QEDEV Framework
 * Launcher Component
 * ==========================================
 */

const Launcher = (() => {
  const AVAILABLE_ROUTES = ["btq", "tahfidz", "rekap"];

  /**
   * ==========================================
   * Navigate
   * ==========================================
   */
  function navigate(route) {
    if (!AVAILABLE_ROUTES.includes(route)) {
      Toast.comingSoon();
      return;
    }

    Router.navigate(route);
  }

  /**
   * ==========================================
   * Bind Events
   * ==========================================
   */
  function bindEvents() {
    document.addEventListener("click", (event) => {
      const item = event.target.closest(".qedev-launcher-item");

      if (!item) return;

      const route = item.dataset.route;

      if (!route) return;

      navigate(route);
    });
  }

  /**
   * Render Grid
   */
  function renderGrid(content) {
    return `
      <div class="qedev-launcher-grid">

        ${content}

      </div>
    `;
  }

  /**
   * Render Item
   */
  function renderItem({
    icon,
    color = "success",
    title,
    subtitle,
    description,
    route = "",
  }) {
    return `
      <button
        class="qedev-launcher-item"
        data-route="${route}">

        <div
          class="qedev-launcher-icon qedev-launcher-icon--${color}">

          <img
            src="${icon}"
            alt="${title}">

        </div>

        <div class="qedev-launcher-info">

          <div class="qedev-launcher-title">

            ${title}

          </div>

          <div class="qedev-launcher-subtitle">

            ${subtitle}

          </div>

          <div class="qedev-launcher-description">

            ${description}

          </div>

        </div>

        <div class="qedev-launcher-arrow">

          <i class="fa-solid fa-chevron-right"></i>

        </div>

      </button>
    `;
  }

  return {
    renderGrid,
    renderItem,
    bindEvents,
  };
})();

window.Launcher = Launcher;
