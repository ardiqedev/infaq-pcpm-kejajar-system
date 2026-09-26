/**
 * ==========================================
 * QEDEV Framework
 * Button Component
 * ==========================================
 */

const Button = (() => {
  function render(options = {}) {
    const defaults = {
      text: "Button",

      type: "primary",

      buttonType: "button", // <-- Tambahkan ini

      icon: "",

      className: "",

      attributes: "",
    };

    options = {
      ...defaults,
      ...options,
    };

    return `
      <button
        type="${options.buttonType}"
        class="qedev-button qedev-button-${options.type} ${options.className}"
        ${options.attributes}>

        ${options.icon}

        <span>${options.text}</span>

      </button>
    `;
  }

  return {
    render,
  };
})();

window.Button = Button;
