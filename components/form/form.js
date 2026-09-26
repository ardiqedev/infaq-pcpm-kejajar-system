/**
 * ==========================================
 * QEDEV Framework
 * Form Component
 * ==========================================
 */

const Form = (() => {
  /**
   * Factory Render
   */
  function render(type, options = {}) {
    switch (type) {
      case "input":
        return input(options);

      case "textarea":
        return textarea(options);

      case "select":
        return select(options);

      case "checkbox":
        return checkbox(options);

      case "radio":
        return radio(options);

      default:
        return "";
    }
  }

  function init() {
    document.addEventListener("click", handleTogglePassword);
  }

  function handleTogglePassword(event) {
    const button = event.target.closest(".qedev-input-toggle");

    if (!button) return;

    const wrapper = button.closest(".qedev-input-wrapper");

    const input = wrapper.querySelector(".qedev-input");

    const icon = button.querySelector("i");

    const show = input.type === "password";

    input.type = show ? "text" : "password";

    icon.className = show ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
  }

  function input(options = {}) {
    return `
      <div class="qedev-form-group">

  ${label(options)}

        <div class="qedev-input-wrapper">

            <input
              id="${options.id || options.name || ""}"
              type="${options.type || "text"}"
              name="${options.name || ""}"
              value="${options.value || ""}"
              placeholder="${options.placeholder || ""}"
              class="qedev-input"
              ${required(options)}
            >

            ${
              options.type === "password"
                ? `
                <button
                  type="button"
                  class="qedev-input-toggle">

                  <i class="fa-regular fa-eye"></i>

                </button>
              `
                : ""
            }

          </div>

        </div>
    `;
  }

  function textarea(options = {}) {
    return `
      <div class="qedev-form-group">

        ${label(options)}

        <textarea
          name="${options.name || ""}"
          rows="${options.rows || 4}"
          placeholder="${options.placeholder || ""}"
          class="qedev-textarea"
          ${required(options)}
        >${options.value || ""}</textarea>

      </div>
    `;
  }

  function select(options = {}) {
    const items = options.options || [];

    return `
      <div class="qedev-form-group">

        ${label(options)}

        <select
          name="${options.name || ""}"
          class="qedev-select"
          ${required(options)}
        >

          ${items
            .map(
              (item) => `
            <option value="${item.value}">
              ${item.label}
            </option>
          `,
            )
            .join("")}

        </select>

      </div>
    `;
  }

  function checkbox(options = {}) {
    return `
      <label class="qedev-checkbox">

        <input
          type="checkbox"
          name="${options.name || ""}"
          ${options.checked ? "checked" : ""}
        >

        <span>${options.label || ""}</span>

      </label>
    `;
  }

  function radio(options = {}) {
    return `
      <label class="qedev-radio">

        <input
          type="radio"
          name="${options.name || ""}"
          value="${options.value || ""}"
          ${options.checked ? "checked" : ""}
        >

        <span>${options.label || ""}</span>

      </label>
    `;
  }

  function label(options) {
    if (!options.label) return "";

    return `
      <label class="qedev-label">
        ${options.label}
      </label>
    `;
  }

  function required(options) {
    return options.required ? "required" : "";
  }

  return {
    render,
    init,
    input(options) {
      return render("input", options);
    },

    textarea(options) {
      return render("textarea", options);
    },

    select(options) {
      return render("select", options);
    },

    checkbox(options) {
      return render("checkbox", options);
    },

    radio(options) {
      return render("radio", options);
    },
  };
})();

window.Form = Form;
