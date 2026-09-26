/* =========================================================
   QEDEV CONFIG
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const CONFIG = Object.freeze({
  /* =======================================================
     APP IDENTITY
     ======================================================= */

  APP_NAME: "Iuran Penjaga Sekolah",

  APP_CODE: "IPS",

  APP_DESCRIPTION: "Sistem Pengelolaan Iuran Penjaga Sekolah",

  VERSION: "1.0.0",

  /* =======================================================
     DEBUG
     ======================================================= */

  DEBUG: true,

  /* =======================================================
     API
     ======================================================= */

  API_URL:
    "https://script.google.com/macros/s/AKfycbzrAv3f1rLwtF3bnHCQFqEn409uv1E4YaWHepc5WQyDk5dFDodJbj6MhPS-v_AlOECqEQ/exec",

  /* =======================================================
     ROUTING
     ======================================================= */

  DEFAULT_ROUTE: "login",

  /* =======================================================
     STORAGE
     ======================================================= */

  STORAGE_PREFIX: "IPS",

  AUTH_STORAGE_KEY: "user",

  /* =======================================================
     BRAND
     ======================================================= */

  BRAND: {
    NAME: "Iuran Penjaga Sekolah",

    ORGANIZATION: "Pemuda Muhammadiyah Kejajar",

    SHORT_NAME: "IPS",

    LOGO: "assets/images/logo.png",
  },

  /* =======================================================
     ROLE
     ======================================================= */

  ROLE: {
    ADMIN: "ADMIN",

    PENARIK: "PENARIK",
  },

  /* =======================================================
     USER STATUS
     ======================================================= */

  STATUS_USER: {
    AKTIF: "AKTIF",

    NONAKTIF: "NONAKTIF",
  },

  /* =======================================================
     PAYMENT METHOD
     ======================================================= */

  METODE: {
    CASH: "CASH",

    TRANSFER: "TRANSFER",
  },

  /* =======================================================
     TRANSACTION STATUS
     ======================================================= */

  STATUS_TRANSAKSI: {
    DRAFT: "DRAFT",

    MENUNGGU_SETORAN: "MENUNGGU_SETORAN",

    DIVERIFIKASI: "DIVERIFIKASI",

    DIBATALKAN: "DIBATALKAN",
  },

  /* =======================================================
     SETORAN STATUS
     ======================================================= */

  STATUS_SETORAN: {
    MENUNGGU_VERIFIKASI: "MENUNGGU_VERIFIKASI",

    DIVERIFIKASI: "DIVERIFIKASI",

    DIBATALKAN: "DIBATALKAN",
  },

  /* =======================================================
     ROUTE
     ======================================================= */

  ROUTE: {
    LOGIN: "login",

    HOME: "home",

    IURAN: "iuran",

    TRANSAKSI: "transaksi",

    SETORAN: "setoran",

    ANGGOTA: "anggota",

    PENGELUARAN: "pengeluaran",

    LAPORAN: "laporan",

    PENGGUNA: "pengguna",

    PROFIL: "profil",
  },

  /* =======================================================
     UI
     ======================================================= */

  UI: {
    HEADER_HEIGHT: 72,

    NAVBAR_HEIGHT: 72,

    MOBILE_MAX_WIDTH: 430,
  },
});

/* =========================================================
   GLOBAL
   ========================================================= */

window.CONFIG = CONFIG;
