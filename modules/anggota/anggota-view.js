/**
 * =========================================================
 * ANGGOTA VIEW
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Tanggung jawab:
 * - Render halaman anggota
 * - Render table
 * - Render detail
 * - Render form
 * - Render loading / empty / error state
 *
 * Tidak menangani:
 * - API
 * - Business logic
 * - Authorization
 * =========================================================
 */

const AnggotaView = {
  /**
   * =======================================================
   * RENDER HALAMAN UTAMA
   * =======================================================
   */
  renderPage({ items = [], search = "", status = "" } = {}) {
    const container = document.getElementById("qedev-main");

    if (!container) {
      console.warn("[AnggotaView] Container qedev-main tidak ditemukan");
      return;
    }

    container.innerHTML = `
      <section class="anggota-page">

        <!-- =========================================
             HEADER
        ========================================== -->
        <div class="anggota-header">

          <div class="anggota-header-info">

            <div class="anggota-title">
              Anggota
            </div>

            <div class="anggota-subtitle">
              Kelola data anggota iuran
            </div>

          </div>

          <button
            type="button"
            class="anggota-btn anggota-btn-primary"
            data-action="tambah"
          >
            <span class="anggota-btn-icon">+</span>
            <span>Tambah Anggota</span>
          </button>

        </div>


        <!-- =========================================
             TOOLBAR
        ========================================== -->
        <div class="anggota-toolbar">

          <div class="anggota-search">

            <span class="anggota-search-icon">
              🔍
            </span>

            <input
              type="search"
              id="anggotaSearch"
              class="anggota-search-input"
              placeholder="Cari nama anggota..."
              value="${AnggotaView.escapeHtml(search)}"
              autocomplete="off"
            />

          </div>


          <div class="anggota-filter">

            <label
              for="anggotaFilterStatus"
              class="anggota-filter-label"
            >
              Status
            </label>

            <select
              id="anggotaFilterStatus"
              class="anggota-filter-select"
            >

              <option
                value=""
                ${status === "" ? "selected" : ""}
              >
                Semua
              </option>

              <option
                value="AKTIF"
                ${status === "AKTIF" ? "selected" : ""}
              >
                Aktif
              </option>

              <option
                value="NONAKTIF"
                ${status === "NONAKTIF" ? "selected" : ""}
              >
                Nonaktif
              </option>

            </select>

          </div>

        </div>


        <!-- =========================================
             SUMMARY
        ========================================== -->
        <div class="anggota-summary">

          <div class="anggota-summary-label">
            Total Anggota
          </div>

          <div class="anggota-summary-value">
            ${items.length}
          </div>

        </div>


        <!-- =========================================
             TABLE
        ========================================== -->
        <div class="anggota-table-card">

          <div
            class="anggota-table-wrapper"
            id="anggotaTableContainer"
          >
            ${AnggotaView.renderTable(items)}
          </div>

        </div>

      </section>
    `;
  },

  /**
   * =======================================================
   * RENDER TABLE
   * =======================================================
   */
  renderTable(items = []) {
    if (!Array.isArray(items) || items.length === 0) {
      return AnggotaView.renderEmpty();
    }

    const rows = items
      .map((item, index) => AnggotaView.renderRow(item, index + 1))
      .join("");

    return `
      <table class="anggota-table">

        <thead>

          <tr>

            <th class="col-no">
              No
            </th>

            <th class="col-nama">
              Nama Anggota
            </th>

            <th class="col-iuran">
              Iuran/Bulan
            </th>

            <th class="col-pembayaran">
              Pembayaran Terakhir
            </th>

            <th class="col-status">
              Status
            </th>

            <th class="col-aksi">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>
          ${rows}
        </tbody>

      </table>
    `;
  },

  /**
   * =======================================================
   * RENDER ROW
   * =======================================================
   */
  renderRow(item = {}, number = 1) {
    const id = AnggotaView.escapeHtml(item.id);

    const nama = AnggotaView.escapeHtml(item.nama || "-");

    const iuran = AnggotaView.formatRupiah(item.iuranBulanan);

    const pembayaran = AnggotaService.formatPembayaranTerakhir(item);
    console.log("[AnggotaView] Pembayaran:", {
      terakhirDibayar: item.terakhirDibayar,
      tglBayarTerakhir: item.tglBayarTerakhir,
      hasil: pembayaran,
    });

    const status = String(item.status || "").toUpperCase();

    const statusClass = status === "AKTIF" ? "status-aktif" : "status-nonaktif";

    const statusLabel = status === "AKTIF" ? "Aktif" : "Nonaktif";

    return `
      <tr>

        <td class="col-no">
          ${number}
        </td>

        <td class="col-nama">

          <div class="anggota-name">
            ${nama}
          </div>

        </td>

        <td class="col-iuran">

          <span class="anggota-money">
            ${iuran}
          </span>

        </td>

        <td class="col-pembayaran">

          <span class="anggota-period">
            ${AnggotaView.escapeHtml(pembayaran)}
          </span>

        </td>

        <td class="col-status">

          <span
            class="anggota-status ${statusClass}"
          >
            ${statusLabel}
          </span>

        </td>

        <td class="col-aksi">

          <div class="anggota-actions">

            <button
              type="button"
              class="anggota-action-btn"
              data-action="detail"
              data-id="${id}"
              title="Detail"
            >
              Detail
            </button>

            <button
              type="button"
              class="anggota-action-btn"
              data-action="edit"
              data-id="${id}"
              title="Edit"
            >
              Edit
            </button>

            ${
              status === "AKTIF"
                ? `
                  <button
                    type="button"
                    class="anggota-action-btn anggota-action-danger"
                    data-action="deactivate"
                    data-id="${id}"
                    title="Nonaktifkan"
                  >
                    Nonaktifkan
                  </button>
                `
                : `
                  <button
                    type="button"
                    class="anggota-action-btn anggota-action-success"
                    data-action="activate"
                    data-id="${id}"
                    title="Aktifkan"
                  >
                    Aktifkan
                  </button>
                `
            }

          </div>

        </td>

      </tr>
    `;
  },

  /**
   * =======================================================
   * LOADING
   * =======================================================
   */
  renderLoading() {
    const container = document.getElementById("page-content");

    if (!container) {
      return;
    }

    container.innerHTML = `
      <section class="anggota-page">

        <div class="anggota-header">

          <div>

            <div class="anggota-title">
              Anggota
            </div>

            <div class="anggota-subtitle">
              Memuat data anggota...
            </div>

          </div>

        </div>


        <div class="anggota-table-card">

          <div class="anggota-loading">

            <div class="anggota-loading-spinner"></div>

            <div class="anggota-loading-text">
              Memuat data anggota...
            </div>

          </div>

        </div>

      </section>
    `;
  },

  /**
   * =======================================================
   * EMPTY
   * =======================================================
   */
  renderEmpty() {
    return `
      <div class="anggota-empty">

        <div class="anggota-empty-icon">
          👥
        </div>

        <div class="anggota-empty-title">
          Belum ada anggota
        </div>

        <div class="anggota-empty-text">
          Data anggota yang sesuai belum ditemukan.
        </div>

      </div>
    `;
  },

  /**
   * =======================================================
   * ERROR
   * =======================================================
   */
  renderError(message = "Gagal memuat data anggota") {
    const container = document.getElementById("page-content");

    if (!container) {
      return;
    }

    container.innerHTML = `
      <section class="anggota-page">

        <div class="anggota-error">

          <div class="anggota-error-icon">
            ⚠️
          </div>

          <div class="anggota-error-title">
            Terjadi Kesalahan
          </div>

          <div class="anggota-error-message">
            ${AnggotaView.escapeHtml(message)}
          </div>

          <button
            type="button"
            class="anggota-btn anggota-btn-primary"
            data-action="retry"
          >
            Coba Lagi
          </button>

        </div>

      </section>
    `;
  },

  /**
   * =======================================================
   * DETAIL
   * =======================================================
   */
  renderDetail(item = {}) {
    const nama = AnggotaView.escapeHtml(item.nama || "-");

    const noHp = AnggotaView.escapeHtml(item.noHp || "-");

    const iuran = AnggotaView.formatRupiah(item.iuranBulanan);

    const pembayaran = AnggotaService.formatPembayaranTerakhir(item);

    const tanggal = AnggotaView.formatDate(item.tglBayarTerakhir);

    const status = String(item.status || "").toUpperCase();

    const statusClass = status === "AKTIF" ? "status-aktif" : "status-nonaktif";

    const statusLabel = status === "AKTIF" ? "Aktif" : "Nonaktif";

    return `
      <div class="anggota-detail">

        <div class="anggota-detail-header">

          <div class="anggota-detail-avatar">
            ${AnggotaView.getInitial(item.nama)}
          </div>

          <div class="anggota-detail-heading">

            <div class="anggota-detail-name">
              ${nama}
            </div>

            <span
              class="anggota-status ${statusClass}"
            >
              ${statusLabel}
            </span>

          </div>

        </div>


        <div class="anggota-detail-grid">

          <div class="anggota-detail-item">

            <div class="anggota-detail-label">
              Nomor HP
            </div>

            <div class="anggota-detail-value">
              ${noHp}
            </div>

          </div>


          <div class="anggota-detail-item">

            <div class="anggota-detail-label">
              Iuran Bulanan
            </div>

            <div class="anggota-detail-value">
              ${iuran}
            </div>

          </div>


          <div class="anggota-detail-item">

            <div class="anggota-detail-label">
              Pembayaran Terakhir
            </div>

            <div class="anggota-detail-value">
              ${AnggotaView.escapeHtml(pembayaran)}
            </div>

          </div>


          <div class="anggota-detail-item">

            <div class="anggota-detail-label">
              Tanggal Bayar Terakhir
            </div>

            <div class="anggota-detail-value">
              ${AnggotaView.escapeHtml(tanggal)}
            </div>

          </div>

        </div>

      </div>
    `;
  },

  /**
   * =======================================================
   * FORM ANGGOTA
   * =======================================================
   */
  renderForm(item = {}, mode = "create") {
    const isEdit = mode === "edit";

    const title = isEdit ? "Edit Anggota" : "Tambah Anggota";

    const nama = AnggotaView.escapeHtml(item.nama || "");

    const noHp = AnggotaView.escapeHtml(item.noHp || "");

    const status = item.status || "AKTIF";

    return `
      <form
        class="anggota-form"
        id="anggotaForm"
        data-mode="${isEdit ? "edit" : "create"}"
        data-id="${AnggotaView.escapeHtml(item.id || "")}"
      >

        <div class="anggota-form-title">
          ${title}
        </div>


        <div class="anggota-form-group">

          <label
            for="anggotaNama"
            class="anggota-form-label"
          >
            Nama Anggota
            <span class="required">*</span>
          </label>

          <input
            type="text"
            id="anggotaNama"
            name="NAMA"
            class="anggota-form-input"
            value="${nama}"
            placeholder="Masukkan nama anggota"
            autocomplete="name"
            required
          />

        </div>


        <div class="anggota-form-group">

          <label
            for="anggotaNoHp"
            class="anggota-form-label"
          >
            Nomor HP
          </label>

          <input
            type="tel"
            id="anggotaNoHp"
            name="NO_HP"
            class="anggota-form-input"
            value="${noHp}"
            placeholder="Contoh: 081234567890"
            autocomplete="tel"
          />

        </div>


        <div class="anggota-form-group">

          <label
            for="anggotaStatus"
            class="anggota-form-label"
          >
            Status
          </label>

          <select
            id="anggotaStatus"
            name="STATUS"
            class="anggota-form-input"
          >

            <option
              value="AKTIF"
              ${status === "AKTIF" ? "selected" : ""}
            >
              Aktif
            </option>

            <option
              value="NONAKTIF"
              ${status === "NONAKTIF" ? "selected" : ""}
            >
              Nonaktif
            </option>

          </select>

        </div>


        <div class="anggota-form-actions">

          <button
            type="button"
            class="anggota-btn anggota-btn-secondary"
            data-action="close-form"
          >
            Batal
          </button>

          <button
            type="submit"
            class="anggota-btn anggota-btn-primary"
          >
            ${isEdit ? "Simpan Perubahan" : "Simpan Anggota"}
          </button>

        </div>

      </form>
    `;
  },

  /**
   * =======================================================
   * FORMAT RUPIAH
   * =======================================================
   */
  formatRupiah(value) {
    const number = Number(value || 0);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  },

  /**
   * =======================================================
   * FORMAT DATE
   * =======================================================
   */
  formatDate(value) {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  },

  /**
   * =======================================================
   * INITIAL
   * =======================================================
   */
  getInitial(name = "") {
    const value = String(name || "").trim();

    if (!value) {
      return "A";
    }

    const parts = value.split(/\s+/).filter(Boolean);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  },

  /**
   * =======================================================
   * ESCAPE HTML
   * =======================================================
   */
  escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },
};
