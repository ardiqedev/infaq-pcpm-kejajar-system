/**
 * =========================================================
 * IURAN CONTROLLER
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 */

const IuranController = {
  /* =======================================================
     STATE
  ======================================================= */

  state: {
    items: [],

    selectedAnggota: null,

    search: "",

    jumlahBulan: 1,

    metode: "CASH",

    keterangan: "",

    periodeTerakhir: "",

    total: 0,

    error: "",

    success: "",

    loading: false,

    saving: false,
  },

  /* =======================================================
     INIT
  ======================================================= */

  async init() {
    console.log("[IuranController] Init");

    this.resetState();

    IuranView.renderLoading();

    /*
     * Bind hanya SATU kali.
     * Setelah ini render() boleh berkali-kali.
     */
    this.bindEvents();

    try {
      await this.loadAnggota();

      this.render();
    } catch (error) {
      console.error("[IuranController] Init error:", error);

      IuranView.renderError(error?.message || "Gagal memuat data anggota.");
    }
  },

  /* =======================================================
     RESET STATE
  ======================================================= */

  resetState() {
    this.state = {
      items: [],

      selectedAnggota: null,

      search: "",

      jumlahBulan: 1,

      metode: "CASH",

      keterangan: "",

      periodeTerakhir: "",

      total: 0,

      error: "",

      success: "",

      loading: false,

      saving: false,
    };
  },

  /* =======================================================
     LOAD ANGGOTA
  ======================================================= */

  async loadAnggota() {
    this.state.loading = true;

    try {
      console.log("[IuranController] Load anggota");

      const items = await IuranService.listAnggota();

      this.state.items = Array.isArray(items) ? items : [];

      console.log("[IuranController] Anggota:", this.state.items.length);
    } finally {
      this.state.loading = false;
    }
  },

  /* =======================================================
     SEARCH
  ======================================================= */

  search(value) {
    this.state.search = String(value || "");

    this.state.error = "";

    this.state.success = "";

    this.render();

    this.restoreSearchFocus();
  },

  /* =======================================================
     FILTER SEARCH
  ======================================================= */

  getFilteredAnggota() {
    const keyword = this.state.search.trim().toLowerCase();

    /*
     * Tidak ada keyword:
     * tampilkan semua anggota aktif.
     */

    if (!keyword) {
      return [...this.state.items];
    }

    return this.state.items.filter((item) => {
      const nama = String(item.nama || "").toLowerCase();

      const noHp = String(item.noHp || "").toLowerCase();

      return nama.includes(keyword) || noHp.includes(keyword);
    });
  },

  /* =======================================================
     SELECT MEMBER
  ======================================================= */

  selectAnggota(id) {
    const anggota = this.state.items.find(
      (item) => String(item.id) === String(id),
    );

    if (!anggota) {
      return;
    }

    this.state.selectedAnggota = anggota;

    this.state.search = "";

    this.state.jumlahBulan = 1;

    this.state.metode = "CASH";

    this.state.keterangan = "";

    this.state.error = "";

    this.state.success = "";

    this.calculate();

    this.render();
  },

  /* =======================================================
     CHANGE MEMBER
  ======================================================= */

  changeAnggota() {
    this.state.selectedAnggota = null;

    this.state.search = "";

    this.state.error = "";

    this.state.success = "";

    this.state.jumlahBulan = 1;

    this.state.total = 0;

    this.state.periodeTerakhir = "";

    this.render();

    this.restoreSearchFocus();
  },

  /* =======================================================
     JUMLAH BULAN
  ======================================================= */

  setJumlahBulan(value) {
    let jumlah = Number(value);

    if (!Number.isInteger(jumlah) || jumlah < 1) {
      jumlah = 1;
    }

    this.state.jumlahBulan = jumlah;

    this.state.error = "";

    this.calculate();

    this.render();
  },

  /* =======================================================
     INCREMENT
  ======================================================= */

  incrementMonth() {
    this.setJumlahBulan(this.state.jumlahBulan + 1);
  },

  /* =======================================================
     DECREMENT
  ======================================================= */

  decrementMonth() {
    const next = Math.max(1, this.state.jumlahBulan - 1);

    this.setJumlahBulan(next);
  },

  /* =======================================================
     METHOD
  ======================================================= */

  setMetode(method) {
    if (method !== "CASH" && method !== "TRANSFER") {
      return;
    }

    this.state.metode = method;

    this.state.error = "";

    this.render();
  },

  /* =======================================================
     KETERANGAN
  ======================================================= */

  setKeterangan(value) {
    this.state.keterangan = String(value || "");
  },

  /* =======================================================
     CALCULATE
  ======================================================= */

  calculate() {
    const anggota = this.state.selectedAnggota;

    if (!anggota) {
      this.state.total = 0;

      this.state.periodeTerakhir = "";

      return;
    }

    const jumlah = Number(this.state.jumlahBulan || 1);

    const nominal = Number(anggota.iuranBulanan || 0);

    this.state.total = jumlah * nominal;

    /*
     * Preview frontend.
     *
     * Backend tetap menjadi sumber
     * kebenaran ketika transaksi dibuat.
     */

    this.state.periodeTerakhir = this.calculatePeriodeTerakhir(
      anggota.terakhirDibayar,
      jumlah,
    );
  },

  /* =======================================================
     CALCULATE PERIODE TERAKHIR
  ======================================================= */

  calculatePeriodeTerakhir(terakhirDibayar, jumlahBulan) {
    /*
     * Belum pernah bayar:
     * mulai Agustus 2026.
     */

    let startYear = 2026;

    let startMonth = 8;

    /*
     * Sudah pernah bayar:
     * mulai dari bulan setelah
     * periode terakhir.
     */

    if (terakhirDibayar) {
      const parts = String(terakhirDibayar).split("-");

      if (parts.length === 2) {
        const year = Number(parts[0]);

        const month = Number(parts[1]);

        if (year && month >= 1 && month <= 12) {
          startYear = year;

          startMonth = month + 1;

          if (startMonth > 12) {
            startMonth = 1;

            startYear++;
          }
        }
      }
    }

    let targetYear = startYear;

    let targetMonth = startMonth + Number(jumlahBulan || 1) - 1;

    while (targetMonth > 12) {
      targetMonth -= 12;

      targetYear++;
    }

    return `${targetYear}-` + `${String(targetMonth).padStart(2, "0")}`;
  },

  /* =======================================================
     SAVE
  ======================================================= */

  async save() {
    /*
     * Proteksi double click.
     */

    if (this.state.saving) {
      return;
    }

    const anggota = this.state.selectedAnggota;

    if (!anggota) {
      this.state.error = "Silakan pilih anggota terlebih dahulu.";

      this.render();

      return;
    }

    const jumlahBulan = Number(this.state.jumlahBulan);

    if (!Number.isInteger(jumlahBulan) || jumlahBulan <= 0) {
      this.state.error = "Jumlah bulan harus lebih dari 0.";

      this.render();

      return;
    }

    if (this.state.metode !== "CASH" && this.state.metode !== "TRANSFER") {
      this.state.error = "Metode pembayaran tidak valid.";

      this.render();

      return;
    }

    /*
     * Ambil keterangan terakhir
     * sebelum render ulang.
     */

    const textarea = document.querySelector("#iuranKeterangan");

    if (textarea) {
      this.state.keterangan = textarea.value.trim();
    }

    this.state.saving = true;

    this.state.error = "";

    this.state.success = "";

    this.render();

    try {
      const result = await IuranService.create({
        ID_ANGGOTA: anggota.id,

        JUMLAH_BULAN: jumlahBulan,

        METODE: this.state.metode,

        KETERANGAN: this.state.keterangan,
      });

      console.log("[IuranController] Pembayaran berhasil:", result);

      // TOAST SUKSES
      Toast.success("Pembayaran berhasil disimpan");

      /*
       * Transaksi berhasil dibuat.
       */

      this.state.success = "Pembayaran berhasil disimpan.";

      /*
       * Reset form setelah berhasil.
       *
       * TERAKHIR_DIBAYAR anggota tidak
       * kita ubah di sini.
       */

      this.state.selectedAnggota = null;

      this.state.search = "";

      this.state.jumlahBulan = 1;

      this.state.metode = "CASH";

      this.state.keterangan = "";

      this.state.total = 0;

      this.state.periodeTerakhir = "";

      this.state.saving = false;

      /*
       * Refresh anggota dari server.
       */

      await this.loadAnggota();

      this.render();
    } catch (error) {
      this.state.saving = false;

      this.state.error = error?.message || "Gagal menyimpan pembayaran.";

      console.error("[IuranController] Save error:", error);

      this.render();
    }
  },

  /* =======================================================
     RENDER
  ======================================================= */

  render() {
    const filtered = this.getFilteredAnggota();

    IuranView.renderPage({
      items: filtered,

      selectedAnggota: this.state.selectedAnggota,

      search: this.state.search,

      jumlahBulan: this.state.jumlahBulan,

      metode: this.state.metode,

      keterangan: this.state.keterangan,

      periodeTerakhir: this.state.periodeTerakhir,

      total: this.state.total,

      error: this.state.error,

      success: this.state.success,

      saving: this.state.saving,
    });
  },

  /* =======================================================
     RESTORE SEARCH FOCUS
  ======================================================= */

  restoreSearchFocus() {
    if (this.state.selectedAnggota) {
      return;
    }

    const input = document.querySelector("#iuranSearch");

    if (!input) {
      return;
    }

    input.focus();

    try {
      input.setSelectionRange(input.value.length, input.value.length);
    } catch (error) {
      // Browser tertentu dapat
      // menolak setSelectionRange.
    }
  },

  /* =======================================================
     BIND EVENTS
  ======================================================= */

  bindEvents() {
    const main = document.querySelector("#qedev-main");

    if (!main) {
      return;
    }

    /*
     * Jangan bind berkali-kali.
     */

    if (main.dataset.iuranEventsBound === "true") {
      return;
    }

    main.dataset.iuranEventsBound = "true";

    /* =====================================================
       INPUT DELEGATION
    ===================================================== */

    main.addEventListener("input", (event) => {
      /*
       * SEARCH
       */

      if (event.target.matches("#iuranSearch")) {
        this.search(event.target.value);

        return;
      }

      /*
       * JUMLAH BULAN
       */

      if (event.target.matches("#iuranJumlahBulan")) {
        this.setJumlahBulan(event.target.value);

        return;
      }

      /*
       * KETERANGAN
       */

      if (event.target.matches("#iuranKeterangan")) {
        this.setKeterangan(event.target.value);
      }
    });

    /* =====================================================
       CLICK DELEGATION
    ===================================================== */

    main.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");

      if (!button) {
        return;
      }

      const action = button.dataset.action;

      const id = button.dataset.id;

      switch (action) {
        case "select-member":
          this.selectAnggota(id);

          break;

        case "change-member":
          this.changeAnggota();

          break;

        case "minus-month":
          this.decrementMonth();

          break;

        case "plus-month":
          this.incrementMonth();

          break;

        case "method":
          this.setMetode(button.dataset.method);

          break;

        case "save":
          this.save();

          break;

        case "retry":
          this.init();

          break;

        default:
          break;
      }
    });
  },
};

/* =========================================================
   MODULE WRAPPER
   ========================================================= */

const IuranModule = {
  async init(options = {}) {
    console.log("[IuranModule] Init");

    await IuranController.init(options);
  },
};

window.IuranController = IuranController;

window.IuranModule = IuranModule;
