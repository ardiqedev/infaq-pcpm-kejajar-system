/**
 * ==========================================
 * QEDEV Framework
 * Empty Component
 * ==========================================
 */

const Empty = (() => {
  function render(options = {}) {
    const defaults = {
      icon: "📂",

      title: "No Data",

      message: "There is no data available.",
    };

    options = {
      ...defaults,

      ...options,
    };

    return `
            <div class="qedev-empty">

                <div class="qedev-empty-icon">
                    ${options.icon}
                </div>

                <h3 class="qedev-empty-title">
                    ${options.title}
                </h3>

                <p class="qedev-empty-message">
                    ${options.message}
                </p>

            </div>
        `;
  }

  return {
    render,
  };
})();

window.Empty = Empty;
