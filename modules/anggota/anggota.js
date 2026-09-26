/**
 * =========================================================
 * ANGGOTA CONTROLLER
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Tanggung jawab:
 * - Mengatur state halaman Anggota
 * - Memuat data anggota
 * - Search
 * - Filter status
 * - Render View
 * - Menangani action table
 *
 * Tidak menangani:
 * - API langsung
 * - Business logic backend
 * - Authorization
 * =========================================================
 */

const AnggotaController = {
  /* =======================================================
     STATE
  ======================================================= */

  state: {
    items: [],

    filteredItems: [],

    filters: {
      search: "",

      status: "",
    },

    selectedId: null,

    loading: false,
  },

  /* =======================================================
     INIT
  ======================================================= */

  async init() {
    console.log("[AnggotaController] Init");

    this.resetState();

    AnggotaView.renderLoading();

    await this.load();

    this.bindEvents();
  },

  /* =======================================================
     RESET STATE
  ======================================================= */

  resetState() {
    this.state = {
      items: [],

      filteredItems: [],

      filters: {
        search: "",

        status: "",
      },

      selectedId: null,

      loading: false,
    };
  },

  /* =======================================================
     LOAD DATA
  ======================================================= */

  async load() {
    this.state.loading = true;

    try {
      console.log("[AnggotaController] Load anggota");

      const items = await AnggotaService.list();

      this.state.items = Array.isArray(items) ? items : [];

      this.state.loading = false;

      this.applyFilters();

      console.log("[AnggotaController] Anggota:", this.state.items.length);
    } catch (error) {
      this.state.loading = false;

      console.error("[AnggotaController] Load error:", error);

      AnggotaView.renderError(error?.message || "Gagal memuat data anggota");
    }
  },

  /* =======================================================
     APPLY FILTER
  ======================================================= */

  applyFilters() {
    let items = [...this.state.items];

    /* ===============================
       SEARCH
    =============================== */

    const search = String(this.state.filters.search || "")
      .trim()
      .toLowerCase();

    if (search) {
      items = items.filter((item) => {
        const nama = String(item.nama || "").toLowerCase();

        const noHp = String(item.noHp || "").toLowerCase();

        return nama.includes(search) || noHp.includes(search);
      });
    }

    /* ===============================
       STATUS
    =============================== */

    const status = String(this.state.filters.status || "")
      .trim()
      .toUpperCase();

    if (status) {
      items = items.filter(
        (item) => String(item.status || "").toUpperCase() === status,
      );
    }

    this.state.filteredItems = items;

    this.render();
  },

  /* =======================================================
     RENDER
  ======================================================= */

  render() {
    AnggotaView.renderPage({
      items: this.state.filteredItems,

      search: this.state.filters.search,

      status: this.state.filters.status,
    });
  },

  /* =======================================================
     SEARCH
  ======================================================= */

  search(value) {
    this.state.filters.search = String(value || "");

    this.applyFilters();
  },

  /* =======================================================
     FILTER STATUS
  ======================================================= */

  filterStatus(value) {
    this.state.filters.status = String(value || "");

    this.applyFilters();
  },

  /* =======================================================
     RESET FILTER
  ======================================================= */

  resetFilter() {
    this.state.filters = {
      search: "",

      status: "",
    };

    this.applyFilters();
  },

  /* =======================================================
     REFRESH
  ======================================================= */

  async refresh() {
    AnggotaView.renderLoading();

    await this.load();

    this.bindEvents();
  },

  /* =======================================================
     DETAIL
  ======================================================= */

  async detail(idAnggota) {
    if (!idAnggota) {
      return;
    }

    this.state.selectedId = idAnggota;

    console.log("[AnggotaController] Detail:", idAnggota);

    try {
      const anggota = await AnggotaService.detail(idAnggota);

      if (!anggota) {
        console.warn("[AnggotaController] Anggota tidak ditemukan");

        return;
      }

      /*
       * Modal/detail UI kita kerjakan
       * pada tahap berikutnya.
       */

      console.log("[AnggotaController] Detail data:", anggota);

      this.state.selectedId = anggota.id;
    } catch (error) {
      console.error("[AnggotaController] Detail error:", error);
    }
  },

  /* =======================================================
     CREATE
  ======================================================= */

  async create(data = {}) {
    try {
      const anggota = await AnggotaService.create(data);

      console.log("[AnggotaController] Anggota berhasil dibuat:", anggota);

      await this.load();

      this.bindEvents();

      return anggota;
    } catch (error) {
      console.error("[AnggotaController] Create error:", error);

      throw error;
    }
  },

  /* =======================================================
     UPDATE
  ======================================================= */

  async update(idAnggota, data = {}) {
    if (!idAnggota) {
      throw new Error("ID anggota tidak ditemukan");
    }

    try {
      const anggota = await AnggotaService.update(idAnggota, data);

      console.log("[AnggotaController] Anggota berhasil diperbarui:", anggota);

      await this.load();

      this.bindEvents();

      return anggota;
    } catch (error) {
      console.error("[AnggotaController] Update error:", error);

      throw error;
    }
  },

  /* =======================================================
     ACTIVATE
  ======================================================= */

  async activate(idAnggota) {
    if (!idAnggota) {
      return;
    }

    try {
      const anggota = await AnggotaService.activate(idAnggota);

      console.log("[AnggotaController] Anggota diaktifkan:", anggota);

      await this.load();

      this.bindEvents();

      return anggota;
    } catch (error) {
      console.error("[AnggotaController] Activate error:", error);

      throw error;
    }
  },

  /* =======================================================
     DEACTIVATE
  ======================================================= */

  async deactivate(idAnggota) {
    if (!idAnggota) {
      return;
    }

    try {
      const anggota = await AnggotaService.deactivate(idAnggota);

      console.log("[AnggotaController] Anggota dinonaktifkan:", anggota);

      await this.load();

      this.bindEvents();

      return anggota;
    } catch (error) {
      console.error("[AnggotaController] Deactivate error:", error);

      throw error;
    }
  },

  /* =======================================================
     BIND EVENTS
  ======================================================= */

  bindEvents() {
    const page = document.querySelector(".anggota-page");

    if (!page) {
      return;
    }

    /*
     * Hindari event listener
     * menumpuk ketika render ulang.
     */

    if (page.dataset.eventsBound === "true") {
      return;
    }

    page.dataset.eventsBound = "true";

    /* =====================================
       SEARCH
    ===================================== */

    const search = page.querySelector("#anggotaSearch");

    if (search) {
      search.addEventListener("input", (event) => {
        this.search(event.target.value);
      });
    }

    /* =====================================
       FILTER STATUS
    ===================================== */

    const filter = page.querySelector("#anggotaFilterStatus");

    if (filter) {
      filter.addEventListener("change", (event) => {
        this.filterStatus(event.target.value);
      });
    }

    /* =====================================
       ACTION BUTTON
    ===================================== */

    page.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");

      if (!button) {
        return;
      }

      const action = button.dataset.action;

      const id = button.dataset.id;

      switch (action) {
        case "tambah":
          this.handleTambah();

          break;

        case "detail":
          this.detail(id);

          break;

        case "edit":
          this.handleEdit(id);

          break;

        case "activate":
          this.handleActivate(id);

          break;

        case "deactivate":
          this.handleDeactivate(id);

          break;

        case "retry":
          this.refresh();

          break;

        default:
          break;
      }
    });
  },

  /* =======================================================
     HANDLE TAMBAH
  ======================================================= */

  handleTambah() {
    console.log("[AnggotaController] Tambah anggota");

    /*
     * Modal/form akan kita pasang
     * pada tahap berikutnya.
     */
  },

  /* =======================================================
     HANDLE EDIT
  ======================================================= */

  handleEdit(idAnggota) {
    if (!idAnggota) {
      return;
    }

    console.log("[AnggotaController] Edit:", idAnggota);

    /*
     * Modal/form akan kita pasang
     * pada tahap berikutnya.
     */

    this.state.selectedId = idAnggota;
  },

  /* =======================================================
     HANDLE ACTIVATE
  ======================================================= */

  async handleActivate(idAnggota) {
    if (!idAnggota) {
      return;
    }

    console.log("[AnggotaController] Activate:", idAnggota);

    /*
     * Confirm dialog akan kita pasang
     * ketika action UX sudah kita kerjakan.
     */

    try {
      await this.activate(idAnggota);
    } catch (error) {
      console.error("[AnggotaController] handleActivate:", error);
    }
  },

  /* =======================================================
     HANDLE DEACTIVATE
  ======================================================= */

  async handleDeactivate(idAnggota) {
    if (!idAnggota) {
      return;
    }

    console.log("[AnggotaController] Deactivate:", idAnggota);

    /*
     * Confirm dialog akan kita pasang
     * ketika action UX sudah kita kerjakan.
     */

    try {
      await this.deactivate(idAnggota);
    } catch (error) {
      console.error("[AnggotaController] handleDeactivate:", error);
    }
  },
};

/* =========================================================
   ANGGOTA MODULE
   ========================================================= */

const AnggotaModule = {
  async init(options = {}) {
    console.log("[AnggotaModule] Init");

    await AnggotaController.init(options);
  },
};

/* =========================================================
   GLOBAL
   ========================================================= */

window.AnggotaController = AnggotaController;
window.AnggotaModule = AnggotaModule;
