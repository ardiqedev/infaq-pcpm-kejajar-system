/**
 * =========================================================
 * IURAN SERVICE
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 *
 * Tanggung jawab:
 * - Mengambil anggota aktif untuk input iuran
 * - Normalisasi data anggota
 * - Membuat transaksi pembayaran
 * - Format nominal
 * - Format periode
 * =========================================================
 */

const IuranService = (() => {
  /* =======================================================
     LIST ANGGOTA UNTUK IURAN
  ======================================================= */

  async function listAnggota() {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    const response = await API.get("anggota.getForIuran", {
      token,
    });

    console.log("[IuranService] Anggota response:", response);

    const data = response?.data ?? response;

    const items = Array.isArray(data) ? data : [];

    return items.map(normalizeAnggota);
  }

  /* =======================================================
     CREATE TRANSAKSI
  ======================================================= */

  async function create(data = {}) {
    const token = Auth.getToken();

    if (!token) {
      throw new Error("Session tidak ditemukan");
    }

    const payload = {
      token,

      ID_ANGGOTA: data.ID_ANGGOTA || "",

      JUMLAH_BULAN: Number(data.JUMLAH_BULAN || 0),

      METODE: data.METODE || "",

      KETERANGAN: data.KETERANGAN || "",
    };

    console.log("[IuranService] Create transaksi:", payload);

    const response = await API.post("transaksi.create", payload);

    console.log("[IuranService] Create response:", response);

    if (!response?.success) {
      throw new Error(response?.message || "Gagal menyimpan pembayaran");
    }

    return response.data ?? response;
  }

  /* =======================================================
     NORMALIZE ANGGOTA
  ======================================================= */

  function normalizeAnggota(item = {}) {
    return {
      id: item.ID_ANGGOTA || "",

      nama: item.NAMA || "",

      noHp: item.NO_HP || "",

      iuranBulanan: Number(item.IURAN_BULANAN || 0),

      terakhirDibayar: item.TERAKHIR_DIBAYAR || "",

      tglBayarTerakhir: item.TGL_BAYAR_TERAKHIR || "",

      status: item.STATUS || "",
    };
  }

  /* =======================================================
     FORMAT RUPIAH
  ======================================================= */

  function formatRupiah(value = 0) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value || 0));
  }

  /* =======================================================
     FORMAT PERIODE
  ======================================================= */

  function formatPeriode(period = "") {
    if (!period) {
      return "Belum ada pembayaran";
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
  }

  /* =======================================================
     PUBLIC
  ======================================================= */

  return {
    listAnggota,

    create,

    formatRupiah,

    formatPeriode,
  };
})();
