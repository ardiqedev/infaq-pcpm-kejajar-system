/**
 * ==========================================
 * QEDEV Framework
 * Modal Template
 * ==========================================
 */

const ModalTemplate = (() => {
  /**
   * Empty Template
   */
  function empty() {
    return "";
  }

  /**
   * Form Template
   */
  function form(content = "") {
    return `
      <div class="qedev-form">

        ${content}

      </div>
    `;
  }

  /**
   * Detail Template
   */
  function detail(content = "") {
    return `
      <div class="qedev-detail">

        ${content}

      </div>
    `;
  }

  /**
   * Confirm Template
   */
  function confirm(message = "") {
    return `
      <div class="qedev-confirm">

        <p>${message}</p>

      </div>
    `;
  }

  /**
   * Message Template
   */
  function message(message = "") {
    return `
      <div class="qedev-message">

        <p>${message}</p>

      </div>
    `;
  }

  /**
   * Custom Template
   */
  function custom(content = "") {
    return content;
  }

  return {
    empty,

    form,

    detail,

    confirm,

    message,

    custom,
  };
})();

window.ModalTemplate = ModalTemplate;
