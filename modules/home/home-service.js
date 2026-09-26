/* =========================================================
   HOME SERVICE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const HomeService = (() => {
  /* =======================================================
     GET CURRENT USER
     ======================================================= */

  function getUser() {
    if (typeof Auth === "undefined" || typeof Auth.getUser !== "function") {
      return null;
    }

    return Auth.getUser();
  }

  /* =======================================================
     GET TOKEN
     ======================================================= */

  function getToken() {
    if (typeof Auth === "undefined" || typeof Auth.getToken !== "function") {
      return null;
    }

    return Auth.getToken();
  }

  /* =======================================================
     GET ROLE
     ======================================================= */

  function getRole() {
    const user = getUser();

    return user?.ROLE || null;
  }

  /* =======================================================
     GET DASHBOARD
     ======================================================= */

  async function getDashboard() {
    try {
      const user = Auth.getUser();
      const token = Auth.getToken();

      if (!user) {
        return {
          success: false,
          message: "Session user tidak ditemukan.",
        };
      }

      if (!token) {
        return {
          success: false,
          message: "Token session tidak ditemukan.",
        };
      }

      const response = await API.get("dashboard.summary", {
        token: token,
      });

      console.log("[HOME] dashboard.summary:", response);

      if (!response) {
        return {
          success: false,
          message: "Response dashboard kosong.",
        };
      }

      if (response.success === false) {
        return {
          success: false,
          message: response.message || "Gagal mengambil dashboard.",
        };
      }

      const data = response.data || {};

      // ==========================================
      // STRUKTUR RESPONSE BACKEND
      // ==========================================

      const keuangan = data.KEUANGAN || {};

      const setoran = data.SETORAN || {};

      const transaksi = data.TRANSAKSI || {};

      const pengeluaran = data.PENGELUARAN || {};

      // ==========================================
      // NORMALISASI DATA UNTUK HOME
      // ==========================================

      const dashboard = {
        // ==============================
        // KEUANGAN
        // ==============================

        saldo: Number(keuangan.SALDO || 0),

        pemasukan: Number(keuangan.TOTAL_PEMASUKAN || 0),

        pengeluaran: Number(keuangan.TOTAL_PENGELUARAN || 0),

        // ==============================
        // SETORAN
        // ==============================

        setoranMenunggu: Number(setoran.MENUNGGU_VERIFIKASI || 0),

        // ==============================
        // PENGELUARAN
        // ==============================

        pengeluaranBulanIni: Number(pengeluaran.NOMINAL || 0),

        // ==============================
        // TAMBAHAN
        // ==============================

        cash: Number(keuangan.CASH || 0),

        transfer: Number(keuangan.TRANSFER || 0),

        totalSetoran: Number(setoran.TOTAL || 0),

        totalTransaksi: Number(transaksi.TOTAL || 0),

        totalIuran: Number(data.totalIuran || 0),

        setoranList: [],

        aktivitas: [],

        transaksiTerbaru: [],
      };

      console.log("[HOME] Dashboard normalized:", dashboard);

      return {
        success: true,

        message: response.message || "Dashboard berhasil dimuat.",

        data: {
          role: data.ROLE || user.ROLE,

          user: user,

          dashboard: dashboard,
        },
      };
    } catch (error) {
      console.error("[HOME] dashboard.summary ERROR:", error);

      return {
        success: false,
        message: error?.message || "Gagal memuat dashboard.",
      };
    }
  }

  /* =======================================================
     NORMALIZE DASHBOARD
     ======================================================= */

  function normalizeDashboard(data = {}) {
    /*
     * Backend adalah sumber data.
     *
     * Kita tidak mengubah nilainya.
     * Normalisasi hanya menyatukan kemungkinan nama
     * property supaya HomeView tetap sederhana.
     */

    const source = data && typeof data === "object" ? data : {};

    return {
      /* ---------------------------------------------------
         ADMIN
         --------------------------------------------------- */

      saldo: getFirstValue(source, ["saldo", "SALDO", "balance", "BALANCE"], 0),

      pemasukan: getFirstValue(
        source,
        [
          "pemasukan",
          "PEMASUKAN",
          "totalPemasukan",
          "TOTAL_PEMASUKAN",
          "totalIncome",
        ],
        0,
      ),

      pengeluaran: getFirstValue(
        source,
        [
          "pengeluaran",
          "PENGELUARAN",
          "totalPengeluaran",
          "TOTAL_PENGELUARAN",
          "totalExpense",
        ],
        0,
      ),

      setoranMenunggu: getFirstValue(
        source,
        [
          "setoranMenunggu",
          "SETORAN_MENUNGGU",
          "pendingSetoran",
          "PENDING_SETORAN",
          "jumlahSetoranMenunggu",
        ],
        0,
      ),

      pengeluaranBulanIni: getFirstValue(
        source,
        [
          "pengeluaranBulanIni",
          "PENGELUARAN_BULAN_INI",
          "totalPengeluaranBulanIni",
        ],
        0,
      ),

      setoranList: getFirstArray(source, [
        "setoranList",
        "SETORAN_LIST",
        "pendingSetoranList",
        "PENDING_SETORAN_LIST",
      ]),

      aktivitas: getFirstArray(source, [
        "aktivitas",
        "AKTIVITAS",
        "recentActivities",
        "RECENT_ACTIVITIES",
      ]),

      /* ---------------------------------------------------
         PENARIK
         --------------------------------------------------- */

      totalIuran: getFirstValue(
        source,
        [
          "totalIuran",
          "TOTAL_IURAN",
          "totalIuranBulanIni",
          "TOTAL_IURAN_BULAN_INI",
        ],
        0,
      ),

      transaksiBulanIni: getFirstValue(
        source,
        [
          "transaksiBulanIni",
          "TRANSAKSI_BULAN_INI",
          "totalTransaksi",
          "TOTAL_TRANSAKSI",
        ],
        0,
      ),

      transaksiTerbaru: getFirstArray(source, [
        "transaksiTerbaru",
        "TRANSAKSI_TERBARU",
        "recentTransactions",
        "RECENT_TRANSACTIONS",
      ]),
    };
  }

  /* =======================================================
     GET FIRST VALUE
     ======================================================= */

  function getFirstValue(source, keys, fallback = 0) {
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const value = source[key];

        /*
         * Jangan menganggap 0 sebagai kosong.
         */

        if (value !== undefined && value !== null && value !== "") {
          return value;
        }
      }
    }

    return fallback;
  }

  /* =======================================================
     GET FIRST ARRAY
     ======================================================= */

  function getFirstArray(source, keys) {
    for (const key of keys) {
      if (Array.isArray(source[key])) {
        return source[key];
      }
    }

    return [];
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    getDashboard,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.HomeService = HomeService;
