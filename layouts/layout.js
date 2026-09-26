/**
 * ==========================================
 * QEDEV Framework
 * Application Layout
 * ==========================================
 */

const Layout = (() => {
  let container;

  /**
   * Render Layout
   */
  function render(options = {}) {
    const { header = true, navbar = true } = options;

    return `
    <div class="qedev-layout">

      ${header ? Header.render() : ""}

      <main
        id="qedev-main"
        class="qedev-main">
      </main>

      ${navbar ? Navbar.render() : ""}

      ${Loading.render()}
      ${Toast.render()}

    </div>
  `;
  }

  /**
   * Initialize Layout
   */
  function init(options = {}) {
    container = document.getElementById("app");

    if (!container) {
      console.error("#app container tidak ditemukan.");
      return;
    }

    container.innerHTML = render(options);
    console.log("=== Layout Render ===");

    if (options.navbar) {
      Navbar.bindEvents();

      Navbar.updateActive();
    }
  }

  /**
   * Set Main Content
   */
  function setContent(html) {
    const main = document.getElementById("qedev-main");

    if (!main) {
      console.error("#qedev-main tidak ditemukan.");
      return;
    }

    main.innerHTML = html;
  }

  return {
    init,
    render,
    setContent,
  };
})();

window.Layout = Layout;
