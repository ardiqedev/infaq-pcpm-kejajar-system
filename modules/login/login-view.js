/* =========================================================
   LOGIN VIEW
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const LoginView = (() => {
  /* =======================================================
     RENDER
     ======================================================= */

  function render() {
    return `
      <div class="login-page">

        <div class="login-container">


          <!-- =============================================
               BRAND
               ============================================= -->

          <div class="login-brand">

            <div class="login-logo">

              <img
                src="${CONFIG.BRAND.LOGO}"
                alt="${escapeHtml(CONFIG.BRAND.NAME)}"
              >

            </div>


            <h1 class="login-title">
              ${escapeHtml(CONFIG.BRAND.NAME)}
            </h1>


            <p class="login-organization">
              ${escapeHtml(CONFIG.BRAND.ORGANIZATION)}
            </p>

          </div>


          <!-- =============================================
               CARD
               ============================================= -->

          <div class="login-card">

            <div class="login-card-header">

              <h2>
                Masuk
              </h2>

              <p>
                Silakan masuk untuk melanjutkan
              </p>

            </div>


            <!-- ===========================================
                 FORM
                 =========================================== -->

            <form
              id="login-form"
              class="login-form"
              novalidate
            >


              <!-- =========================================
                   USERNAME
                   ========================================= -->

              <div class="form-group">

                <label
                  for="login-username"
                  class="form-label"
                >
                  Username
                </label>


                <div class="login-input-wrapper">

                  <span class="login-input-icon">
                    <i class="fa-solid fa-user"></i>
                  </span>


                  <input
                    type="text"
                    id="login-username"
                    name="username"
                    class="form-input login-input"
                    placeholder="Masukkan username"
                    autocomplete="username"
                    autocapitalize="none"
                    spellcheck="false"
                  >

                </div>


                <div
                  id="login-username-error"
                  class="form-error"
                  hidden
                ></div>

              </div>


              <!-- =========================================
                   PASSWORD
                   ========================================= -->

              <div class="form-group">

                <label
                  for="login-password"
                  class="form-label"
                >
                  Password
                </label>


                <div class="login-input-wrapper">

                  <span class="login-input-icon">
                    <i class="fa-solid fa-lock"></i>
                  </span>


                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    class="form-input login-input"
                    placeholder="Masukkan password"
                    autocomplete="current-password"
                  >


                  <button
                    type="button"
                    class="login-password-toggle"
                    id="login-password-toggle"
                    aria-label="Tampilkan password"
                  >

                    <i class="fa-solid fa-eye"></i>

                  </button>

                </div>


                <div
                  id="login-password-error"
                  class="form-error"
                  hidden
                ></div>

              </div>


              <!-- =========================================
                   SUBMIT
                   ========================================= -->

              <button
                type="submit"
                id="login-submit"
                class="login-submit"
              >

                <span class="login-submit-text">
                  Masuk
                </span>

                <span
                  class="login-submit-loading"
                  hidden
                >

                  <i class="fa-solid fa-spinner fa-spin"></i>

                  Memproses...

                </span>

              </button>


              <!-- =========================================
                   GENERAL ERROR
                   ========================================= -->

              <div
                id="login-general-error"
                class="login-general-error"
                hidden
              ></div>

            </form>

          </div>


          <!-- =============================================
               FOOTER
               ============================================= -->

          <div class="login-footer">

            <span>
              ${escapeHtml(CONFIG.BRAND.NAME)}
            </span>

            <span class="login-footer-separator">
              •
            </span>

            <span>
              v${escapeHtml(CONFIG.VERSION)}
            </span>

          </div>

        </div>

      </div>
    `;
  }

  /* =======================================================
     SET ERROR
     ======================================================= */

  function setError(field, message) {
    const element = document.getElementById(`login-${field}-error`);

    if (!element) {
      return;
    }

    element.textContent = message || "";

    element.hidden = !message;

    const input = document.getElementById(`login-${field}`);

    if (input) {
      input.classList.toggle("is-error", !!message);
    }
  }

  /* =======================================================
     CLEAR ERRORS
     ======================================================= */

  function clearErrors() {
    setError("username", "");

    setError("password", "");

    const general = document.getElementById("login-general-error");

    if (general) {
      general.textContent = "";

      general.hidden = true;
    }
  }

  /* =======================================================
     SET GENERAL ERROR
     ======================================================= */

  function setGeneralError(message) {
    const element = document.getElementById("login-general-error");

    if (!element) {
      return;
    }

    element.textContent = message || "";

    element.hidden = !message;
  }

  /* =======================================================
     SET LOADING
     ======================================================= */

  function setLoading(loading) {
    const submit = document.getElementById("login-submit");

    const text = document.querySelector(".login-submit-text");

    const loader = document.querySelector(".login-submit-loading");

    if (!submit) {
      return;
    }

    submit.disabled = loading;

    if (text) {
      text.hidden = loading;
    }

    if (loader) {
      loader.hidden = !loading;
    }
  }

  /* =======================================================
     GET FORM DATA
     ======================================================= */

  function getFormData() {
    const username = document.getElementById("login-username");

    const password = document.getElementById("login-password");

    return {
      username: username ? username.value.trim() : "",

      password: password ? password.value : "",
    };
  }

  /* =======================================================
     FOCUS USERNAME
     ======================================================= */

  function focusUsername() {
    const input = document.getElementById("login-username");

    if (input) {
      setTimeout(() => {
        input.focus();
      }, 50);
    }
  }

  /* =======================================================
     PASSWORD TOGGLE
     ======================================================= */

  function togglePassword() {
    const input = document.getElementById("login-password");

    const button = document.getElementById("login-password-toggle");

    if (!input || !button) {
      return;
    }

    const icon = button.querySelector("i");

    const visible = input.type === "text";

    input.type = visible ? "password" : "text";

    if (icon) {
      icon.className = visible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
    }

    button.setAttribute(
      "aria-label",
      visible ? "Tampilkan password" : "Sembunyikan password",
    );
  }

  /* =======================================================
     ESCAPE HTML
     ======================================================= */

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    render,

    setError,
    clearErrors,
    setGeneralError,

    setLoading,

    getFormData,

    focusUsername,

    togglePassword,
  });
})();

window.LoginView = LoginView;
