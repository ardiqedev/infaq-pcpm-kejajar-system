/**
 * =========================================================
 * TRANSAKSI SERVICE
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Tanggung jawab:
 * - Mengambil daftar transaksi
 * - Mengambil detail transaksi
 * - Normalisasi data transaksi
 * - Format nominal
 * - Format tanggal
 * - Format periode
 *
 * Catatan:
 * - Service TIDAK memfilter status.
 * - Filter transaksi LUNAS dilakukan pada layer Controller/UI.
 * - Backend tetap menggunakan STATUS DIVERIFIKASI.
 * =========================================================
 */

const TransaksiService = {
  /**
   * =======================================================
   * LIST
   * =======================================================
   *
   * Mengambil transaksi milik user yang sedang login.
   *
   * Backend:
   * transaksi.list
   *
   * Catatan:
   * Filtering DIVERIFIKASI dilakukan di Controller/UI.
   */
  async list() {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session pengguna tidak ditemukan");
    }

    const response = await API.get("transaksi.list", {
      token,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mengambil data transaksi");
    }

    const data = Array.isArray(response.data) ? response.data : [];

    return data.map((item) => TransaksiService.normalize(item));
  },

  /**
   * =======================================================
   * DETAIL
   * =======================================================
   *
   * Mengambil detail satu transaksi.
   */
  async detail(idTransaksi) {
    if (!idTransaksi) {
      throw new Error("ID transaksi wajib diisi");
    }

    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session pengguna tidak ditemukan");
    }

    const response = await API.get("transaksi.detail", {
      token,
      ID_TRANSAKSI: idTransaksi,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mengambil detail transaksi");
    }

    return TransaksiService.normalize(response.data);
  },

  /**
   * =======================================================
   * CREATE
   * =======================================================
   *
   * Disiapkan untuk kebutuhan input iuran.
   *
   * Penarik hanya mengirim:
   * - ID_ANGGOTA
   * - JUMLAH_BULAN
   * - METODE
   * - KETERANGAN
   *
   * Backend yang menentukan:
   * - ID_USER
   * - TANGGAL_BAYAR
   * - PERIODE_TERAKHIR
   * - NOMINAL_PER_BULAN
   * - TOTAL
   * - STATUS
   */
  async create(data = {}) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session pengguna tidak ditemukan");
    }

    const payload = {
      token,
      ID_ANGGOTA: data.ID_ANGGOTA || "",
      JUMLAH_BULAN: data.JUMLAH_BULAN || "",
      METODE: data.METODE || "",
      KETERANGAN: data.KETERANGAN || "",
    };

    const response = await API.post("transaksi.create", payload);

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal mencatat transaksi iuran");
    }

    return TransaksiService.normalize(response.data);
  },

  /**
   * =======================================================
   * UPDATE
   * =======================================================
   *
   * Update transaksi sebelum masuk setoran.
   *
   * Field yang diperbolehkan:
   * - ID_ANGGOTA
   * - JUMLAH_BULAN
   * - METODE
   * - KETERANGAN
   */
  async update(idTransaksi, data = {}) {
    if (!idTransaksi) {
      throw new Error("ID transaksi wajib diisi");
    }

    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session pengguna tidak ditemukan");
    }

    const payload = {
      token,
      ID_TRANSAKSI: idTransaksi,
    };

    if (Object.prototype.hasOwnProperty.call(data, "ID_ANGGOTA")) {
      payload.ID_ANGGOTA = data.ID_ANGGOTA;
    }

    if (Object.prototype.hasOwnProperty.call(data, "JUMLAH_BULAN")) {
      payload.JUMLAH_BULAN = data.JUMLAH_BULAN;
    }

    if (Object.prototype.hasOwnProperty.call(data, "METODE")) {
      payload.METODE = data.METODE;
    }

    if (Object.prototype.hasOwnProperty.call(data, "KETERANGAN")) {
      payload.KETERANGAN = data.KETERANGAN;
    }

    const response = await API.post("transaksi.update", payload);

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal memperbarui transaksi");
    }

    return TransaksiService.normalize(response.data);
  },

  /**
   * =======================================================
   * DELETE
   * =======================================================
   *
   * Menghapus transaksi yang belum masuk setoran.
   */
  async delete(idTransaksi) {
    if (!idTransaksi) {
      throw new Error("ID transaksi wajib diisi");
    }

    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session pengguna tidak ditemukan");
    }

    const response = await API.post("transaksi.delete", {
      token,
      ID_TRANSAKSI: idTransaksi,
    });

    if (!response || !response.success) {
      throw new Error(response?.message || "Gagal menghapus transaksi");
    }

    return response.data;
  },

  /**
   * =======================================================
   * NORMALIZE
   * =======================================================
   *
   * Menyamakan format data backend dengan kebutuhan
   * frontend.
   */
  normalize(item = {}) {
    return {
      id: item.ID_TRANSAKSI || "",

      idAnggota: item.ID_ANGGOTA || "",

      namaAnggota: item.NAMA_ANGGOTA || "",

      idUser: item.ID_USER || "",

      tanggalBayar: item.TANGGAL_BAYAR || "",

      jumlahBulan: Number(item.JUMLAH_BULAN) || 0,

      periodeTerakhir: item.PERIODE_TERAKHIR || "",

      nominalPerBulan: Number(item.NOMINAL_PER_BULAN) || 0,

      total: Number(item.TOTAL) || 0,

      metode: item.METODE || "",

      status: item.STATUS || "",

      idSetoran: item.ID_SETORAN || "",

      keterangan: item.KETERANGAN || "",

      createdAt: item.CREATED_AT || "",

      updatedAt: item.UPDATED_AT || "",

      verifiedBy: item.VERIFIED_BY || "",

      verifiedAt: item.VERIFIED_AT || "",
    };
  },

  /**
   * =======================================================
   * FORMAT RUPIAH
   * =======================================================
   */
  formatRupiah(value) {
    const nominal = Number(value) || 0;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(nominal);
  },

  /**
   * =======================================================
   * FORMAT PERIODE
   * =======================================================
   *
   * Contoh:
   * 2026-08 → Agustus 2026
   */
  formatPeriode(period) {
    if (!period) {
      return "-";
    }

    const parts = String(period).split("-");

    if (parts.length !== 2) {
      return period;
    }

    const year = Number(parts[0]);

    const month = Number(parts[1]);

    if (!year || !month || month < 1 || month > 12) {
      return period;
    }

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

    return `${months[month - 1]} ${year}`;
  },

  /**
   * =======================================================
   * FORMAT TANGGAL
   * =======================================================
   */
  formatTanggal(value) {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  },

  /**
   * =======================================================
   * FORMAT STATUS
   * =======================================================
   *
   * Backend:
   * DIVERIFIKASI
   *
   * UI:
   * LUNAS
   */
  formatStatus(status) {
    switch (String(status || "").toUpperCase()) {
      case "DIVERIFIKASI":
        return "LUNAS";

      default:
        return status || "-";
    }
  },

  /**
   * =======================================================
   * CEK LUNAS
   * =======================================================
   *
   * Digunakan Controller untuk menentukan transaksi
   * mana yang boleh masuk daftar riwayat.
   */
  isLunas(item) {
    return String(item?.status || "").toUpperCase() === "DIVERIFIKASI";
  },
};
