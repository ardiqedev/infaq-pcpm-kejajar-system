/**
 * ==========================================
 * QEDEV Framework
 * Search Component
 * ==========================================
 */

const Search = (() => {
  function render(options = {}) {
    const defaults = {
      id: "",
      name: "search",
      placeholder: "Cari data...",
      value: "",
      className: "",
      attributes: "",
    };

    options = {
      ...defaults,
      ...options,
    };

    return `
      <div class="qedev-search ${options.className}">

        <span class="qedev-search-icon">
          🔍
        </span>

        <input
          type="search"
          id="${options.id}"
          name="${options.name}"
          value="${options.value}"
          placeholder="${options.placeholder}"
          class="qedev-search-input"
          ${options.attributes}
        >

      </div>
    `;
  }

  return {
    render,
  };
})();

window.Search = Search;
