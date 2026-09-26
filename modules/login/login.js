/* =========================================================
   LOGIN MODULE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const LoginModule = (() => {
  let initialized = false;

  /* =======================================================
     INIT
     ======================================================= */

  async function init() {
    /*
     * Login harus selalu merender ulang view
     * ketika route login dibuka.
     */

    initialized = false;

    render();

    bindEvents();

    LoginView.focusUsername();

    initialized = true;
  }

  /* =======================================================
     RENDER
     ======================================================= */

  function render() {
    const app = document.getElementById("app");

    if (!app) {
      console.error("[LOGIN] #app tidak ditemukan.");

      return;
    }

    /*
     * Login tidak menggunakan Layout utama.
     * Router sudah memberikan:
     *
     * header: false
     * navbar: false
     */

    app.innerHTML = LoginView.render();
  }

  /* =======================================================
     BIND EVENTS
     ======================================================= */

  function bindEvents() {
    const form = document.getElementById("login-form");

    if (!form) {
      return;
    }

    /* -----------------------------------------------------
       FORM SUBMIT
       ----------------------------------------------------- */

    form.addEventListener("submit", handleSubmit);

    /* -----------------------------------------------------
       PASSWORD TOGGLE
       ----------------------------------------------------- */

    const toggle = document.getElementById("login-password-toggle");

    if (toggle) {
      toggle.addEventListener("click", () => {
        LoginView.togglePassword();
      });
    }
  }

  /* =======================================================
     HANDLE SUBMIT
     ======================================================= */

  async function handleSubmit(event) {
    event.preventDefault();

    if (!initialized) {
      return;
    }

    LoginView.clearErrors();

    const data = LoginView.getFormData();

    /* -----------------------------------------------------
       VALIDATION
       ----------------------------------------------------- */

    const validation = LoginValidator.validate(data);

    if (!validation.valid) {
      showValidationErrors(validation.errors);

      return;
    }

    /* -----------------------------------------------------
       LOADING
       ----------------------------------------------------- */

    LoginView.setLoading(true);

    try {
      /* ---------------------------------------------------
         LOGIN SERVICE
         --------------------------------------------------- */

      const result = await LoginService.login(data.username, data.password);

      /* ---------------------------------------------------
         LOGIN FAILED
         --------------------------------------------------- */

      if (!result || result.success !== true) {
        LoginView.setGeneralError(result?.message || "Login gagal.");

        return;
      }

      /* ---------------------------------------------------
         SUCCESS
         --------------------------------------------------- */

      if (typeof Toast !== "undefined" && typeof Toast.success === "function") {
        Toast.success("Login berhasil.");
      }

      /* ---------------------------------------------------
         REDIRECT
         --------------------------------------------------- */

      const user = Auth.getUser();

      /*
       * Untuk sekarang semua user masuk ke Home.
       *
       * Home nanti akan menampilkan dashboard
       * berdasarkan role.
       */

      void user;

      await Router.navigate(CONFIG.ROUTE.HOME);
    } catch (error) {
      console.error("[LOGIN] Login error:", error);

      LoginView.setGeneralError(
        error?.message || "Terjadi kesalahan saat login.",
      );
    } finally {
      LoginView.setLoading(false);
    }
  }

  /* =======================================================
     SHOW VALIDATION ERRORS
     ======================================================= */

  function showValidationErrors(errors = {}) {
    if (errors.username) {
      LoginView.setError("username", errors.username);
    }

    if (errors.password) {
      LoginView.setError("password", errors.password);
    }

    /*
     * Focus field pertama yang error.
     */

    if (errors.username) {
      const input = document.getElementById("login-username");

      if (input) {
        input.focus();
      }

      return;
    }

    if (errors.password) {
      const input = document.getElementById("login-password");

      if (input) {
        input.focus();
      }
    }
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    init,
  });
})();

window.LoginModule = LoginModule;
