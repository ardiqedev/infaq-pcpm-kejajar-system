/**
 * =========================================================
 * ANGGOTA SERVICE
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Service frontend untuk modul Anggota Admin.
 *
 * Tanggung jawab:
 * - Komunikasi API anggota
 * - Normalisasi response
 * - Tidak menangani rendering
 * - Tidak menangani DOM
 * =========================================================
 */

const AnggotaService = {
  /**
   * =======================================================
   * LIST ANGGOTA
   * =======================================================
   */
  async list() {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    const response = await API.get("anggota.list", {
      token,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mengambil data anggota");
    }

    const data = Array.isArray(response.data) ? response.data : [];

    return data.map(AnggotaService.normalize);
  },

  /**
   * =======================================================
   * DETAIL ANGGOTA
   * =======================================================
   */
  async detail(idAnggota) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    if (!idAnggota) {
      throw new Error("ID anggota tidak ditemukan");
    }

    const response = await API.get("anggota.detail", {
      token,
      ID_ANGGOTA: idAnggota,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mengambil detail anggota");
    }

    return AnggotaService.normalize(response.data);
  },

  /**
   * =======================================================
   * SEARCH
   * =======================================================
   *
   * Digunakan nanti juga oleh modul Iuran.
   */
  async search(keyword = "") {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    const response = await API.get("anggota.search", {
      token,
      keyword: String(keyword || ""),
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mencari anggota");
    }

    const data = Array.isArray(response.data) ? response.data : [];

    return data.map(AnggotaService.normalize);
  },

  /**
   * =======================================================
   * CREATE
   * =======================================================
   */
  async create(data = {}) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    const payload = {
      token,

      NAMA: String(data.NAMA || "").trim(),

      NO_HP: String(data.NO_HP || "").trim(),

      STATUS: data.STATUS || "AKTIF",
    };

    const response = await API.post("anggota.create", payload);

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal menambahkan anggota");
    }

    return AnggotaService.normalize(response.data);
  },

  /**
   * =======================================================
   * UPDATE
   * =======================================================
   */
  async update(idAnggota, data = {}) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    if (!idAnggota) {
      throw new Error("ID anggota tidak ditemukan");
    }

    const payload = {
      token,

      ID_ANGGOTA: idAnggota,
    };

    if (Object.prototype.hasOwnProperty.call(data, "NAMA")) {
      payload.NAMA = String(data.NAMA || "").trim();
    }

    if (Object.prototype.hasOwnProperty.call(data, "NO_HP")) {
      payload.NO_HP = String(data.NO_HP || "").trim();
    }

    if (Object.prototype.hasOwnProperty.call(data, "STATUS")) {
      payload.STATUS = data.STATUS;
    }

    const response = await API.post("anggota.update", payload);

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal memperbarui anggota");
    }

    return AnggotaService.normalize(response.data);
  },

  /**
   * =======================================================
   * ACTIVATE
   * =======================================================
   */
  async activate(idAnggota) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    if (!idAnggota) {
      throw new Error("ID anggota tidak ditemukan");
    }

    const response = await API.post("anggota.activate", {
      token,
      ID_ANGGOTA: idAnggota,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mengaktifkan anggota");
    }

    return AnggotaService.normalize(response.data);
  },

  /**
   * =======================================================
   * DEACTIVATE
   * =======================================================
   */
  async deactivate(idAnggota) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    if (!idAnggota) {
      throw new Error("ID anggota tidak ditemukan");
    }

    const response = await API.post("anggota.deactivate", {
      token,
      ID_ANGGOTA: idAnggota,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal menonaktifkan anggota");
    }

    return AnggotaService.normalize(response.data);
  },

  /**
   * =======================================================
   * NORMALIZE
   * =======================================================
   */
  normalize(item = {}) {
    return {
      id: item.ID_ANGGOTA || "",

      nama: item.NAMA || "",

      noHp: item.NO_HP || "",

      iuranBulanan: Number(item.IURAN_BULANAN || 0),

      terakhirDibayar: item.TERAKHIR_DIBAYAR || "",

      tglBayarTerakhir: item.TGL_BAYAR_TERAKHIR || "",

      status: item.STATUS || "",

      createdAt: item.CREATED_AT || "",

      updatedAt: item.UPDATED_AT || "",
    };
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
   * FORMAT PERIODE
   * =======================================================
   *
   * Contoh:
   * 2026-08
   * → Agustus 2026
   */
  formatPeriode(period) {
    if (!period) {
      return "-";
    }

    const value = String(period).trim();

    const match = value.match(/^(\d{4})-(\d{2})$/);

    if (!match) {
      return value;
    }

    const year = Number(match[1]);

    const month = Number(match[2]);

    const months = [
      "",
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    if (month < 1 || month > 12) {
      return value;
    }

    return `${months[month]} ${year}`;
  },

  /**
   * =======================================================
   * FORMAT PEMBAYARAN TERAKHIR
   * =======================================================
   *
   * Untuk sementara:
   * - Jika hanya periode terakhir tersedia,
   *   tampilkan periode tersebut.
   *
   * Nanti ketika kita punya JUMLAH_BULAN
   * dari transaksi terakhir, kita bisa tampilkan:
   *
   * Agustus 2026 s.d. Februari 2027
   */
  formatPembayaranTerakhir(item) {
    if (!item) {
      return "Belum ada pembayaran";
    }

    const periode = String(item.terakhirDibayar || "").trim();

    if (!periode) {
      return "Belum ada pembayaran";
    }

    /*
     * Jika sudah berupa YYYY-MM
     */
    if (/^\d{4}-\d{2}$/.test(periode)) {
      return this.formatPeriode(periode);
    }

    /*
     * Jika sementara masih berupa tanggal
     * contoh:
     * Sat Aug 01 2026 00:00:00 GMT+0700
     */
    const date = new Date(periode);

    if (!Number.isNaN(date.getTime())) {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    return periode;
  },
};
