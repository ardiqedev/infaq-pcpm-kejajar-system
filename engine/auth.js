/* =========================================================
   QEDEV AUTH ENGINE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const Auth = (() => {
  const USER_STORAGE_KEY = CONFIG.AUTH_STORAGE_KEY || "user";
  const TOKEN_STORAGE_KEY = "token";

  /* =======================================================
     LOGIN
     ======================================================= */

  function login(user, token) {
    if (!user || typeof user !== "object") {
      console.error("[AUTH] Data user tidak valid.");

      return false;
    }

    if (!token || typeof token !== "string") {
      console.error("[AUTH] Token tidak valid.");

      return false;
    }

    /* -----------------------------------------------------
       STORAGE
       ----------------------------------------------------- */

    Storage.set(USER_STORAGE_KEY, user);

    Storage.set(TOKEN_STORAGE_KEY, token);

    /* -----------------------------------------------------
       STATE
       ----------------------------------------------------- */

    State.set("user", user);

    State.set("token", token);

    if (CONFIG.DEBUG) {
      console.log("[AUTH] Login berhasil:", user);
    }

    return true;
  }

  /* =======================================================
     LOGOUT
     ======================================================= */

  function logout() {
    const token = getToken();

    /*
     * Tidak perlu menunggu response backend.
     *
     * Session server akan expired sendiri.
     * Jika nanti kita ingin server-side logout,
     * bisa ditambahkan tanpa mengubah kontrak public.
     */

    void token;

    Storage.remove(USER_STORAGE_KEY);

    Storage.remove(TOKEN_STORAGE_KEY);

    State.remove("user");
    State.remove("token");

    if (CONFIG.DEBUG) {
      console.log("[AUTH] Logout.");
    }

    return true;
  }

  /* =======================================================
     GET USER
     ======================================================= */

  function getUser() {
    let user = State.get("user");

    if (user) {
      return user;
    }

    user = Storage.get(USER_STORAGE_KEY);

    if (user) {
      State.set("user", user);
    }

    return user || null;
  }

  /* =======================================================
     GET TOKEN
     ======================================================= */

  function getToken() {
    let token = State.get("token");

    if (token) {
      return token;
    }

    token = Storage.get(TOKEN_STORAGE_KEY);

    if (token) {
      State.set("token", token);
    }

    return token || null;
  }

  /* =======================================================
     IS AUTHENTICATED
     ======================================================= */

  function isAuthenticated() {
    return !!(getUser() && getToken());
  }

  /* =======================================================
     IS GUEST
     ======================================================= */

  function isGuest() {
    return !isAuthenticated();
  }

  /* =======================================================
     GET ROLE
     ======================================================= */

  function getRole() {
    const user = getUser();

    if (!user) {
      return null;
    }

    return user.ROLE || null;
  }

  /* =======================================================
     HAS ROLE
     ======================================================= */

  function hasRole(role) {
    if (!role) {
      return false;
    }

    return getRole() === role;
  }

  /* =======================================================
     IS ADMIN
     ======================================================= */

  function isAdmin() {
    return hasRole(CONFIG.ROLE?.ADMIN || "ADMIN");
  }

  /* =======================================================
     IS PENARIK
     ======================================================= */

  function isPenarik() {
    return hasRole(CONFIG.ROLE?.PENARIK || "PENARIK");
  }

  /* =======================================================
     VERIFY SESSION
     ======================================================= */

  async function verifySession() {
    const token = getToken();

    /*
     * Tidak ada token berarti jelas guest.
     */

    if (!token) {
      return {
        success: false,
        authenticated: false,
        message: "Session tidak ditemukan.",
      };
    }

    try {
      const response = await API.get("auth.verify", {
        token: token,
      });

      if (!response || response.success !== true) {
        return {
          success: false,
          authenticated: false,
          message: response?.message || "Session tidak valid.",
        };
      }

      /*
       * Backend dapat mengembalikan user
       * hasil verifikasi terbaru.
       *
       * Kalau ada, kita refresh user di frontend.
       */

      const verifiedUser = response.data?.user || response.data;

      if (verifiedUser && typeof verifiedUser === "object") {
        Storage.set(USER_STORAGE_KEY, verifiedUser);

        State.set("user", verifiedUser);
      }

      if (CONFIG.DEBUG) {
        console.log("[AUTH] Session valid.");
      }

      return {
        success: true,
        authenticated: true,
        data: response.data || null,
      };
    } catch (error) {
      console.error("[AUTH] Verify session error:", error);

      return {
        success: false,
        authenticated: false,
        message: error?.message || "Gagal memverifikasi session.",
      };
    }
  }

  /* =======================================================
     REQUIRE AUTH
     ======================================================= */

  function requireAuth() {
    if (!isAuthenticated()) {
      return false;
    }

    return true;
  }

  /* =======================================================
     CLEAR SESSION
     ======================================================= */

  function clearSession() {
    Storage.remove(USER_STORAGE_KEY);

    Storage.remove(TOKEN_STORAGE_KEY);

    State.remove("user");
    State.remove("token");
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    login,
    logout,

    getUser,
    getToken,

    isAuthenticated,
    isGuest,

    getRole,
    hasRole,

    isAdmin,
    isPenarik,

    verifySession,
    requireAuth,

    clearSession,
  });
})();

window.Auth = Auth;
