/**
 * ==========================================
 * QEDEV Framework
 * Pagination Component
 * ==========================================
 */

const Pagination = (() => {
  /**
   * Render Pagination
   */
  function render(options = {}) {
    const defaults = {
      page: 1,
      totalPage: 1,
      totalData: 0,
      perPage: 10,
      label: "data",
      className: "",
    };

    options = {
      ...defaults,
      ...options,
    };

    if (options.totalPage <= 1) {
      return "";
    }

    const start = (options.page - 1) * options.perPage + 1;
    const end = Math.min(options.page * options.perPage, options.totalData);

    return `
      <div class="qedev-pagination ${options.className}">

        <div class="qedev-pagination-info">
          Menampilkan
          <strong>${start}–${end}</strong>
          dari
          <strong>${options.totalData}</strong>
          ${options.label}
        </div>

        <div class="qedev-pagination-nav">

          <button
            class="qedev-pagination-button"
            data-page="${options.page - 1}"
            ${options.page === 1 ? "disabled" : ""}>
            &lt; Prev
          </button>

          ${pages(options)}

          <button
            class="qedev-pagination-button"
            data-page="${options.page + 1}"
            ${options.page === options.totalPage ? "disabled" : ""}>
            Next &gt;
          </button>

        </div>

      </div>
    `;
  }

  /**
   * Render Page Numbers
   */
  function pages(options) {
    const current = options.page;
    const total = options.totalPage;

    let html = "";

    // Halaman sedikit
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        html += button(i, current);
      }

      return html;
    }

    // Awal
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        html += button(i, current);
      }

      html += dots();

      html += button(total, current);

      return html;
    }

    // Akhir
    if (current >= total - 3) {
      html += button(1, current);

      html += dots();

      for (let i = total - 4; i <= total; i++) {
        html += button(i, current);
      }

      return html;
    }

    // Tengah

    html += button(1, current);

    html += dots();

    for (let i = current - 2; i <= current + 2; i++) {
      html += button(i, current);
    }

    html += dots();

    html += button(total, current);

    return html;
  }

  /**
   * Page Button
   */
  function button(page, current) {
    return `
      <button
        class="qedev-pagination-button ${page === current ? "active" : ""}"
        data-page="${page}">
        ${page}
      </button>
    `;
  }

  /**
   * Ellipsis
   */
  function dots() {
    return `
      <span class="qedev-pagination-dots">
        ...
      </span>
    `;
  }

  return {
    render,
  };
})();

window.Pagination = Pagination;
