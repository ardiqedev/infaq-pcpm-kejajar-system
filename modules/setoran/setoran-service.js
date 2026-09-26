/* =========================================================
   SETORAN SERVICE
   IURAN PENJAGA SEKOLAH
========================================================= */

const SetoranService = (() => {
  /* =======================================================
     GET AUTH
  ======================================================= */

  function getAuth() {
    const user = Auth.getUser();
    const token = Auth.getToken();

    if (!user) {
      throw new Error("Session user tidak ditemukan.");
    }

    if (!token) {
      throw new Error("Token session tidak ditemukan.");
    }

    return {
      user,
      token,
    };
  }

  /* =======================================================
     NORMALIZE ITEM
  ======================================================= */

  function normalizeItem(item = {}) {
    const status = String(item.STATUS ?? item.status ?? "")
      .trim()
      .toUpperCase();

    const totalTransaksi = Number(
      item.TOTAL_TRANSAKSI ?? item.totalTransaksi ?? 0,
    );

    const totalSetoran = Number(item.TOTAL_SETORAN ?? item.totalSetoran ?? 0);

    const jumlahCash = Number(item.JUMLAH_CASH ?? item.jumlahCash ?? 0);

    const jumlahTransfer = Number(
      item.JUMLAH_TRANSFER ?? item.jumlahTransfer ?? 0,
    );

    const selisih = Number(
      item.SELISIH ?? item.selisih ?? totalSetoran - totalTransaksi,
    );

    return {
      id: String(item.ID_SETORAN ?? item.idSetoran ?? item.id ?? "").trim(),

      userId: String(item.ID_USER ?? item.userId ?? "").trim(),

      namaPenarik: String(
        item.NAMA_PENARIK ??
          item.namaPenarik ??
          item.NAMA_USER ??
          item.namaUser ??
          item.USERNAME ??
          item.username ??
          "-",
      ).trim(),

      tanggalSetor: item.TANGGAL_SETOR ?? item.tanggalSetor ?? "",

      jumlahTransaksi: Number.isFinite(totalTransaksi) ? totalTransaksi : 0,

      jumlahCash: Number.isFinite(jumlahCash) ? jumlahCash : 0,

      jumlahTransfer: Number.isFinite(jumlahTransfer) ? jumlahTransfer : 0,

      totalTransaksi: Number.isFinite(totalTransaksi) ? totalTransaksi : 0,

      totalSetoran: Number.isFinite(totalSetoran) ? totalSetoran : 0,

      selisih: Number.isFinite(selisih) ? selisih : 0,

      status,

      catatan: String(item.CATATAN ?? item.catatan ?? "").trim(),

      createdAt: item.CREATED_AT ?? item.createdAt ?? "",

      verifiedAt: item.VERIFIED_AT ?? item.verifiedAt ?? "",

      verifiedBy: String(item.VERIFIED_BY ?? item.verifiedBy ?? "").trim(),

      raw: item,
    };
  }

  /* =======================================================
     EXTRACT LIST
  ======================================================= */

  function extractList(response) {
    const data = response?.data ?? response ?? {};

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data.items)) {
      return data.items;
    }

    if (Array.isArray(data.setoran)) {
      return data.setoran;
    }

    if (Array.isArray(data.SETORAN)) {
      return data.SETORAN;
    }

    return [];
  }

  /* =======================================================
     LIST
  ======================================================= */

  async function list() {
    const { token } = getAuth();

    /* =====================================================
     AMBIL SETORAN
  ===================================================== */

    const response = await API.get("setoran.list", {
      token,
    });

    console.log("[SETORAN] RAW LIST RESPONSE:", response);

    if (!response) {
      throw new Error("Response setoran kosong.");
    }

    if (response.success === false) {
      throw new Error(response.message || "Gagal mengambil data setoran.");
    }

    const rawItems = extractList(response);

    /* =====================================================
     AMBIL USER
  ===================================================== */

    let users = [];

    try {
      const userResponse = await API.get("user.list", {
        token,
      });

      console.log("[SETORAN] USER RESPONSE:", userResponse);

      if (userResponse && userResponse.success !== false) {
        const userData = userResponse.data ?? userResponse;

        if (Array.isArray(userData)) {
          users = userData;
        } else if (Array.isArray(userData.data)) {
          users = userData.data;
        } else if (Array.isArray(userData.items)) {
          users = userData.items;
        }
      }
    } catch (error) {
      console.warn("[SETORAN] Gagal mengambil user:", error);
    }

    /* =====================================================
     USER MAP
  ===================================================== */

    const userMap = new Map();

    users.forEach((user) => {
      const id = String(user.ID_USER ?? user.id ?? user.userId ?? "").trim();

      const nama = String(
        user.NAMA ??
          user.nama ??
          user.NAME ??
          user.name ??
          user.USERNAME ??
          user.username ??
          "",
      ).trim();

      if (id && nama) {
        userMap.set(id, nama);
      }
    });

    console.log("[SETORAN] USER MAP:", userMap);

    /* =====================================================
     NORMALIZE
  ===================================================== */

    const items = rawItems.map((item) => {
      const normalized = normalizeItem(item);

      const namaPenarik = userMap.get(normalized.userId);

      if (namaPenarik) {
        normalized.namaPenarik = namaPenarik;
      }

      return normalized;
    });

    console.log("[SETORAN] NORMALIZED LIST:", items);

    return items;
  }

  /* =======================================================
     DETAIL
  ======================================================= */

  async function detail(id) {
    const normalizedId = String(id || "").trim();

    if (!normalizedId) {
      throw new Error("ID setoran tidak ditemukan.");
    }

    const { token } = getAuth();

    const response = await API.get("setoran.detail", {
      token,
      ID_SETORAN: normalizedId,
    });

    console.log("[SETORAN] RAW DETAIL RESPONSE:", response);

    if (!response) {
      throw new Error("Response detail setoran kosong.");
    }

    if (response.success === false) {
      throw new Error(response.message || "Gagal mengambil detail setoran.");
    }

    const data = response.data ?? response;

    const setoranData = data.setoran ?? data.SETORAN ?? data;

    const normalized = normalizeItem(setoranData);

    console.log("[SETORAN] DETAIL NORMALIZED:", normalized);

    return normalized;
  }

  /* =======================================================
     CREATE SETORAN
     PENARIK
  ======================================================= */

  async function create(catatan = "") {
    const { token } = getAuth();

    const response = await API.post("setoran.create", {
      token,
      CATATAN: String(catatan || "").trim(),
    });

    console.log("[SETORAN] CREATE RESPONSE:", response);

    if (!response) {
      throw new Error("Response pembuatan setoran kosong.");
    }

    if (response.success === false) {
      throw new Error(response.message || "Setoran gagal dibuat.");
    }

    return response;
  }

  /* =======================================================
     VERIFY
  ======================================================= */

  async function verify(idSetoran) {
    const normalizedId = String(idSetoran || "").trim();

    if (!normalizedId) {
      throw new Error("ID setoran tidak ditemukan.");
    }

    const { token } = getAuth();

    const response = await API.post("setoran.verify", {
      token,
      ID_SETORAN: normalizedId,
    });

    console.log("[SETORAN] VERIFY RESPONSE:", response);

    if (!response) {
      throw new Error("Response verifikasi kosong.");
    }

    if (response.success === false) {
      throw new Error(response.message || "Setoran gagal diverifikasi.");
    }

    return response;
  }

  /* =======================================================
     CANCEL
  ======================================================= */

  async function cancel(id, catatan = "") {
    const normalizedId = String(id || "").trim();

    if (!normalizedId) {
      throw new Error("ID setoran tidak ditemukan.");
    }

    const { token } = getAuth();

    const response = await API.post("setoran.cancel", {
      token,
      id: normalizedId,
      catatan: String(catatan || "").trim(),
    });

    console.log("[SETORAN] CANCEL RESPONSE:", response);

    if (!response) {
      throw new Error("Response pembatalan kosong.");
    }

    if (response.success === false) {
      throw new Error(response.message || "Setoran gagal dibatalkan.");
    }

    return response;
  }

  return {
    list,
    detail,
    create,
    verify,
    cancel,
  };
})();

window.SetoranService = SetoranService;
