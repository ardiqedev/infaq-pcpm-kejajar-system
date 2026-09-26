/**
 * =========================================================
 * TRANSAKSI CONTROLLER
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Tanggung jawab:
 * - Mengambil data transaksi
 * - Menampilkan hanya transaksi yang sudah lunas
 * - Mengelola pencarian
 * - Mengelola state halaman
 * - Menyiapkan detail transaksi
 *
 * Catatan:
 * Backend menggunakan STATUS:
 * DIVERIFIKASI
 *
 * UI menampilkan:
 * LUNAS
 *
 * Transaksi yang masih:
 * - DRAFT
 * - MENUNGGU_SETORAN
 * - DIBATALKAN
 *
 * tidak ditampilkan di halaman ini.
 * =========================================================
 */

const TransaksiController = {
  /**
   * =======================================================
   * STATE
   * =======================================================
   */

  state: {
    items: [],

    filteredItems: [],

    search: "",

    selectedId: null,

    loading: false,

    error: null,
  },

  /**
   * =======================================================
   * INIT
   * =======================================================
   */

  async init() {
    console.log("[TransaksiController] init");

    this.resetState();

    this.renderLoading();

    this.bindEvents();

    await this.load();
  },

  /**
   * =======================================================
   * RESET STATE
   * =======================================================
   */

  resetState() {
    this.state = {
      items: [],

      filteredItems: [],

      search: "",

      selectedId: null,

      loading: false,

      error: null,
    };
  },

  /**
   * =======================================================
   * LOAD
   * =======================================================
   */

  async load() {
    this.state.loading = true;

    this.state.error = null;

    try {
      const allItems = await TransaksiService.list();

      /**
       * ===================================================
       * HANYA TAMPILKAN TRANSAKSI LUNAS
       * ===================================================
       *
       * Backend:
       * DIVERIFIKASI
       *
       * UI:
       * LUNAS
       */

      this.state.items = allItems.filter((item) =>
        TransaksiService.isLunas(item),
      );

      this.applyFilters();

      this.state.loading = false;

      this.render();
    } catch (error) {
      console.error("[TransaksiController] load error:", error);

      this.state.loading = false;

      this.state.error = error?.message || "Gagal memuat transaksi";

      this.renderError();
    }
  },

  /**
   * =======================================================
   * APPLY FILTER
   * =======================================================
   */

  applyFilters() {
    const keyword = String(this.state.search || "")
      .trim()
      .toLowerCase();

    let items = [...this.state.items];

    if (keyword) {
      items = items.filter((item) => {
        const searchable = [
          item.id,

          item.idAnggota,

          item.tanggalBayar,

          item.periodeTerakhir,

          item.metode,

          item.keterangan,
        ]
          .map((value) => String(value || "").toLowerCase())
          .join(" ");

        return searchable.includes(keyword);
      });
    }

    this.state.filteredItems = items;
  },

  /**
   * =======================================================
   * SEARCH
   * =======================================================
   */

  search(keyword = "") {
    this.state.search = keyword;

    this.applyFilters();

    this.render();
  },

  /**
   * =======================================================
   * RESET FILTER
   * =======================================================
   */

  resetFilter() {
    this.state.search = "";

    this.applyFilters();

    this.render();
  },

  /**
   * =======================================================
   * REFRESH
   * =======================================================
   */

  async refresh() {
    await this.load();
  },

  /**
   * =======================================================
   * DETAIL
   * =======================================================
   *
   * Modal belum dibuat.
   * Untuk sekarang data detail hanya diambil dan disimpan
   * ke state.
   */

  async detail(idTransaksi) {
    if (!idTransaksi) {
      return;
    }

    try {
      const detail = await TransaksiService.detail(idTransaksi);

      this.state.selectedId = idTransaksi;

      console.log("[TransaksiController] detail:", detail);

      /**
       * Modal/detail UI kita kerjakan
       * pada tahap berikutnya.
       */

      return detail;
    } catch (error) {
      console.error("[TransaksiController] detail error:", error);

      if (typeof Toast !== "undefined" && Toast.error) {
        Toast.error(error?.message || "Gagal mengambil detail transaksi");
      }

      return null;
    }
  },

  /**
   * =======================================================
   * RENDER LOADING
   * =======================================================
   */

  renderLoading() {
    const container = document.getElementById("qedev-main");

    if (!container) {
      return;
    }

    container.innerHTML = `

      <section class="transaksi-page">

        <div class="transaksi-loading">

          <div class="transaksi-loading-spinner"></div>

          <p>Memuat transaksi...</p>

        </div>

      </section>

    `;
  },

  /**
   * =======================================================
   * RENDER ERROR
   * =======================================================
   */

  renderError() {
    const container = document.getElementById("qedev-main");

    if (!container) {
      return;
    }

    container.innerHTML = `

      <section class="transaksi-page">

        <div class="transaksi-error">

          <div class="transaksi-error-icon">
            !
          </div>

          <h3>Gagal Memuat Transaksi</h3>

          <p>
            ${this.escapeHtml(this.state.error || "Terjadi kesalahan")}
          </p>

          <button
            type="button"
            class="transaksi-btn transaksi-btn-primary"
            data-action="refresh"
          >
            Coba Lagi
          </button>

        </div>

      </section>

    `;
  },

  /**
   * =======================================================
   * RENDER
   * =======================================================
   */

  render() {
    if (typeof TransaksiView === "undefined") {
      console.error("[TransaksiController] TransaksiView tidak ditemukan");

      return;
    }

    TransaksiView.renderPage({
      items: this.state.filteredItems,

      search: this.state.search,

      total: this.state.items.length,
    });
  },

  /**
   * =======================================================
   * EVENTS
   * =======================================================
   *
   * Listener dipasang pada #page-content yang merupakan
   * container stabil.
   *
   * Jadi ketika TransaksiView mengganti isi halaman,
   * event delegation tetap bekerja.
   */

  bindEvents() {
    const container = document.getElementById("qedev-main");

    if (!container) {
      console.warn("[TransaksiController] #page-content tidak ditemukan");

      return;
    }

    /**
     * Hindari listener ganda.
     */

    if (container.dataset.transaksiEventsBound === "true") {
      return;
    }

    container.dataset.transaksiEventsBound = "true";

    container.addEventListener("input", (event) => {
      const target = event.target;

      if (target.matches("#transaksiSearch")) {
        this.search(target.value);
      }
    });

    container.addEventListener("click", (event) => {
      const actionElement = event.target.closest("[data-action]");

      if (!actionElement) {
        return;
      }

      const action = actionElement.dataset.action;

      const id = actionElement.dataset.id || "";

      switch (action) {
        case "refresh":
          this.refresh();

          break;

        case "reset-filter":
          this.resetFilter();

          break;

        case "detail":
          this.detail(id);

          break;

        default:
          break;
      }
    });
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

/* =========================================================
   TRANSAKSI MODULE
   ========================================================= */

const TransaksiModule = {
  async init(options = {}) {
    console.log("[TransaksiModule] Init");

    await TransaksiController.init(options);
  },
};

/* =========================================================
   GLOBAL
   ========================================================= */

window.TransaksiController = TransaksiController;
window.TransaksiModule = TransaksiModule;
