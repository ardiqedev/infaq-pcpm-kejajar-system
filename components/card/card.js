/**
 * ==========================================
 * QEDEV Framework
 * Card Component
 * ==========================================
 */

const Card = (() => {
  function render(options = {}) {
    const defaults = {
      title: "",

      subtitle: "",

      content: "",

      footer: "",

      className: "",
    };

    options = {
      ...defaults,
      ...options,
    };

    return `
      <div class="qedev-card ${options.className}">

        ${
          options.title || options.subtitle
            ? `
          <div class="qedev-card-header">

            ${
              options.title
                ? `<h3 class="qedev-card-title">${options.title}</h3>`
                : ""
            }

            ${
              options.subtitle
                ? `<p class="qedev-card-subtitle">${options.subtitle}</p>`
                : ""
            }

          </div>
        `
            : ""
        }

        <div class="qedev-card-body">
          ${options.content}
        </div>

        ${
          options.footer
            ? `
          <div class="qedev-card-footer">
            ${options.footer}
          </div>
        `
            : ""
        }

      </div>
    `;
  }

  return {
    render,
  };
})();

window.Card = Card;
