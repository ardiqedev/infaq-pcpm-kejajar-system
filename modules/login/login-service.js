/* =========================================================
   LOGIN SERVICE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const LoginService = (() => {
  /* =======================================================
     LOGIN
     ======================================================= */

  async function login(username, password) {
    const payload = {
      username: String(username || "").trim(),

      password: String(password || ""),
    };

    /* -----------------------------------------------------
       REQUEST
       ----------------------------------------------------- */

    const response = await API.post("auth.login", payload);

    /* -----------------------------------------------------
       API FAILURE
       ----------------------------------------------------- */

    if (!response || response.success !== true) {
      return {
        success: false,

        message: response?.message || "Username atau password salah.",

        data: null,
      };
    }

    /* -----------------------------------------------------
       RESPONSE DATA
       ----------------------------------------------------- */

    const data = response.data;

    if (!data || typeof data !== "object") {
      return {
        success: false,

        message: "Response login dari server tidak valid.",

        data: null,
      };
    }

    /* -----------------------------------------------------
       TOKEN
       ----------------------------------------------------- */

    const token = data.token;

    /* -----------------------------------------------------
       USER
       ----------------------------------------------------- */

    const user = data.user;

    if (!token || typeof token !== "string") {
      return {
        success: false,

        message: "Token login tidak ditemukan.",

        data: null,
      };
    }

    if (!user || typeof user !== "object") {
      return {
        success: false,

        message: "Data user login tidak ditemukan.",

        data: null,
      };
    }

    /* -----------------------------------------------------
       SAVE SESSION
       ----------------------------------------------------- */

    const authenticated = Auth.login(user, token);

    if (!authenticated) {
      return {
        success: false,

        message: "Session gagal disimpan.",

        data: null,
      };
    }

    /* -----------------------------------------------------
       SUCCESS
       ----------------------------------------------------- */

    return {
      success: true,

      message: response.message || "Login berhasil.",

      data: {
        user,
        token,
      },
    };
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    login,
  });
})();

window.LoginService = LoginService;
