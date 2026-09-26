/**
 * =========================================================
 * TRANSAKSI VIEW
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Tanggung jawab:
 * - Render halaman transaksi
 * - Render toolbar pencarian
 * - Render summary
 * - Render tabel transaksi
 * - Render empty state
 *
 * Catatan:
 * - Data yang diterima View sudah difilter Controller.
 * - Status DIVERIFIKASI ditampilkan sebagai LUNAS.
 * - Tidak ada modal pada tahap ini.
 * =========================================================
 */

const TransaksiView = {
  /**
   * =======================================================
   * RENDER PAGE
   * =======================================================
   */

  renderPage({ items = [], search = "", total = 0 } = {}) {
    const container = document.getElementById("qedev-main");

    if (!container) {
      return;
    }

    container.innerHTML = `

      <section class="transaksi-page">

        ${this.renderHeader()}

        ${this.renderToolbar(search)}

        ${this.renderSummary(total)}

        ${this.renderContent(items)}

      </section>

    `;
  },

  /**
   * =======================================================
   * HEADER
   * =======================================================
   */

  renderHeader() {
    return `

      <div class="transaksi-header">

        <div class="transaksi-header-content">

          <div>

            <h1 class="transaksi-title">
              Transaksi Iuran
            </h1>

            <p class="transaksi-subtitle">
              Riwayat pembayaran iuran yang sudah lunas
            </p>

          </div>

          <button
            type="button"
            class="transaksi-refresh-btn"
            data-action="refresh"
            title="Refresh"
          >
            <span class="transaksi-refresh-icon">
              ↻
            </span>

            <span>
              Refresh
            </span>

          </button>

        </div>

      </div>

    `;
  },

  /**
   * =======================================================
   * TOOLBAR
   * =======================================================
   */

  renderToolbar(search = "") {
    return `

      <div class="transaksi-toolbar">

        <div class="transaksi-search">

          <span class="transaksi-search-icon">
            ⌕
          </span>

          <input
            type="search"
            id="transaksiSearch"
            class="transaksi-search-input"
            placeholder="Cari transaksi..."
            value="${this.escapeHtml(search)}"
            autocomplete="off"
          />

          ${
            search
              ? `
                <button
                  type="button"
                  class="transaksi-search-clear"
                  data-action="reset-filter"
                  aria-label="Hapus pencarian"
                >
                  ×
                </button>
              `
              : ""
          }

        </div>

      </div>

    `;
  },

  /**
   * =======================================================
   * SUMMARY
   * =======================================================
   */

  renderSummary(total = 0) {
    return `

      <div class="transaksi-summary">

        <div class="transaksi-summary-card">

          <div class="transaksi-summary-icon">
            ✓
          </div>

          <div class="transaksi-summary-content">

            <span class="transaksi-summary-label">
              Total Transaksi Lunas
            </span>

            <strong class="transaksi-summary-value">
              ${Number(total) || 0}
            </strong>

          </div>

        </div>

      </div>

    `;
  },

  /**
   * =======================================================
   * CONTENT
   * =======================================================
   */

  renderContent(items = []) {
    if (!items.length) {
      return this.renderEmpty();
    }

    return `

      <div class="transaksi-table-card">

        <div class="transaksi-table-wrapper">

          <table class="transaksi-table">

            <thead>

              <tr>

                <th>No</th>

                <th>Tanggal Bayar</th>

                <th>Anggota</th>

                <th>Jumlah Bulan</th>

                <th>Periode Terakhir</th>

                <th>Total</th>

                <th>Metode</th>

                <th>Status</th>

                <th>Aksi</th>

              </tr>

            </thead>

            <tbody>

              ${items
                .map((item, index) => this.renderRow(item, index))
                .join("")}

            </tbody>

          </table>

        </div>

      </div>

    `;
  },

  /**
   * =======================================================
   * TABLE ROW
   * =======================================================
   */

  renderRow(item = {}, index = 0) {
    const tanggalBayar = TransaksiService.formatTanggal(item.tanggalBayar);

    const periodeTerakhir = TransaksiService.formatPeriode(
      item.periodeTerakhir,
    );

    const total = TransaksiService.formatRupiah(item.total);

    const metode = this.formatMetode(item.metode);

    return `

      <tr>

        <td class="transaksi-col-number">
          ${index + 1}
        </td>

        <td>
          ${this.escapeHtml(tanggalBayar)}
        </td>

        <td>

          <div class="transaksi-member">

            <strong>
              ${this.escapeHtml(item.namaAnggota || item.NAMA || "-")}
            </strong>

          </div>

        </td>

        <td>
          ${Number(item.jumlahBulan) || 0}
          bulan
        </td>

        <td>
          ${this.escapeHtml(periodeTerakhir)}
        </td>

        <td>

          <strong class="transaksi-total">
            ${this.escapeHtml(total)}
          </strong>

        </td>

        <td>
          ${this.renderMetode(metode)}
        </td>

        <td>
          ${this.renderStatus(item.status)}
        </td>

        <td>

          <button
            type="button"
            class="transaksi-action-btn"
            data-action="detail"
            data-id="${this.escapeHtml(item.id)}"
          >
            Detail
          </button>

        </td>

      </tr>

    `;
  },

  /**
   * =======================================================
   * STATUS
   * =======================================================
   */

  renderStatus(status) {
    const label = TransaksiService.formatStatus(status);

    if (String(status || "").toUpperCase() === "DIVERIFIKASI") {
      return `

        <span class="transaksi-status transaksi-status-lunas">

          <span class="transaksi-status-dot"></span>

          LUNAS

        </span>

      `;
    }

    return `

      <span class="transaksi-status">
        ${this.escapeHtml(label)}
      </span>

    `;
  },

  /**
   * =======================================================
   * METODE
   * =======================================================
   */

  formatMetode(metode) {
    const value = String(metode || "").toUpperCase();

    if (value === "CASH") {
      return "Cash";
    }

    if (value === "TRANSFER") {
      return "Transfer";
    }

    return metode || "-";
  },

  renderMetode(metode) {
    const value = String(metode || "").toUpperCase();

    if (value === "CASH") {
      return `

        <span class="transaksi-metode transaksi-metode-cash">
          Cash
        </span>

      `;
    }

    if (value === "TRANSFER") {
      return `

        <span class="transaksi-metode transaksi-metode-transfer">
          Transfer
        </span>

      `;
    }

    return `

      <span class="transaksi-metode">
        ${this.escapeHtml(metode || "-")}
      </span>

    `;
  },

  /**
   * =======================================================
   * EMPTY STATE
   * =======================================================
   */

  renderEmpty() {
    return `

      <div class="transaksi-empty">

        <div class="transaksi-empty-icon">
          ✓
        </div>

        <h3>
          Belum Ada Transaksi Lunas
        </h3>

        <p>
          Riwayat pembayaran yang sudah
          diverifikasi Admin akan tampil di sini.
        </p>

        ${
          TransaksiController?.state?.search
            ? `
              <button
                type="button"
                class="transaksi-btn transaksi-btn-secondary"
                data-action="reset-filter"
              >
                Reset Pencarian
              </button>
            `
            : ""
        }

      </div>

    `;
  },

  /**
   * =======================================================
   * DETAIL
   * =======================================================
   *
   * Untuk sementara disiapkan sebagai struktur HTML.
   * Modal/bottom sheet akan dibuat pada tahap berikutnya.
   */

  renderDetail(item = {}) {
    return `

      <div class="transaksi-detail">

        <div class="transaksi-detail-row">

          <span>
            ID Transaksi
          </span>

          <strong>
            ${this.escapeHtml(item.id || "-")}
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Tanggal Bayar
          </span>

          <strong>
            ${this.escapeHtml(
              TransaksiService.formatTanggal(item.tanggalBayar),
            )}
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Jumlah Bulan
          </span>

          <strong>
            ${Number(item.jumlahBulan) || 0}
            bulan
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Periode Terakhir
          </span>

          <strong>
            ${this.escapeHtml(
              TransaksiService.formatPeriode(item.periodeTerakhir),
            )}
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Nominal / Bulan
          </span>

          <strong>
            ${this.escapeHtml(
              TransaksiService.formatRupiah(item.nominalPerBulan),
            )}
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Total
          </span>

          <strong>
            ${this.escapeHtml(TransaksiService.formatRupiah(item.total))}
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Metode
          </span>

          <strong>
            ${this.escapeHtml(this.formatMetode(item.metode))}
          </strong>

        </div>

        <div class="transaksi-detail-row">

          <span>
            Status
          </span>

          ${this.renderStatus(item.status)}

        </div>

        ${
          item.keterangan
            ? `
              <div class="transaksi-detail-row">

                <span>
                  Keterangan
                </span>

                <strong>
                  ${this.escapeHtml(item.keterangan)}
                </strong>

              </div>
            `
            : ""
        }

      </div>

    `;
  },

  /**
   * =======================================================
   * ESCAPE HTML
   * =======================================================
   */

  escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },
};
