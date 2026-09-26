/**
 * ==========================================
 * QEDEV Framework
 * Table Component
 * ==========================================
 */

const Table = (() => {
  function render(options = {}) {
    const defaults = {
      columns: [],

      rows: [],

      empty: Empty.render(),

      className: "",
    };

    options = {
      ...defaults,

      ...options,
    };

    if (options.rows.length === 0) {
      return options.empty;
    }

    return `
            <div class="qedev-table-wrapper">

                <table class="qedev-table ${options.className}">

                    <thead>

                        <tr>

                            ${renderHeader(options.columns)}

                        </tr>

                    </thead>

                    <tbody>

                        ${renderBody(options.columns, options.rows)}

                    </tbody>

                </table>

            </div>
        `;
  }

  function renderHeader(columns) {
    return columns
      .map(
        (column) => `

            <th class="${align(column)}">

                ${column.label}

            </th>

        `,
      )
      .join("");
  }

  function renderBody(columns, rows) {
    return rows
      .map(
        (row) => `

            <tr>

                ${columns
                  .map(
                    (column) => `

                    <td class="${align(column)}">

                        ${cell(column, row)}

                    </td>

                `,
                  )
                  .join("")}

            </tr>

        `,
      )
      .join("");
  }

  function cell(column, row) {
    if (typeof column.render === "function") {
      return column.render(row);
    }

    return row[column.key] ?? "-";
  }

  function align(column) {
    return `text-${column.align || "left"}`;
  }

  return {
    render,
  };
})();

window.Table = Table;
