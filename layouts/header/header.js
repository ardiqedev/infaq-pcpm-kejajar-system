/* =========================================================
   QEDEV HEADER
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const Header = (() => {
  /* =======================================================
     RENDER
     ======================================================= */

  function render(data = {}) {
    const user =
      data.user ||
      (typeof Auth !== "undefined" && typeof Auth.getUser === "function"
        ? Auth.getUser()
        : null);

    const logo = data.logo || CONFIG.BRAND?.LOGO || "assets/images/logo.png";

    const title =
      data.title ||
      CONFIG.BRAND?.NAME ||
      CONFIG.APP_NAME ||
      "Iuran Penjaga Sekolah";

    const organization =
      data.organization ||
      CONFIG.BRAND?.ORGANIZATION ||
      "Pemuda Muhammadiyah Kejajar";

    const userName = user?.NAMA || "Pengguna";

    const userRole = user?.ROLE || "";

    const initials = getInitials(userName);

    return `
      <header class="qedev-header-container">

        <div class="qedev-header-left">

          <div class="qedev-header-brand">

            <img
              class="qedev-header-logo"
              src="${logo}"
              alt="${escapeHtml(title)}"
            >

          </div>


          <div class="qedev-header-info">

            <div class="qedev-header-title">
              ${escapeHtml(title)}
            </div>

            <div class="qedev-header-school">
              ${escapeHtml(organization)}
            </div>

          </div>

        </div>


        <div class="qedev-header-actions">


          <!-- =============================================
               NOTIFICATION
               ============================================= -->

          <button
            class="qedev-header-notification"
            type="button"
            aria-label="Notifikasi"
            data-header-action="notification"
          >

            <i class="fa-solid fa-bell"></i>

            <span
              class="qedev-header-notification-dot"
              aria-hidden="true"
            ></span>

          </button>


          <!-- =============================================
               USER
               ============================================= -->

          <button
            class="qedev-header-user"
            type="button"
            aria-label="${escapeHtml(userName)}"
            data-header-action="profile"
          >

            <span class="qedev-header-avatar">
              ${escapeHtml(initials)}
            </span>

          </button>

        </div>

      </header>
    `;
  }

  /* =======================================================
     INITIALS
     ======================================================= */

  function getInitials(name) {
    if (!name) {
      return "U";
    }

    const words = String(name).trim().split(/\s+/).filter(Boolean);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
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
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.Header = Header;
