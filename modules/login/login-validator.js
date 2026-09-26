/* =========================================================
   LOGIN VALIDATOR
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const LoginValidator = (() => {
  /* =======================================================
     VALIDATE
     ======================================================= */

  function validate(data = {}) {
    const errors = {};

    /* -----------------------------------------------------
       USERNAME
       ----------------------------------------------------- */

    const username = String(data.username || "").trim();

    if (!username) {
      errors.username = "Username wajib diisi.";
    }

    /* -----------------------------------------------------
       PASSWORD
       ----------------------------------------------------- */

    const password = String(data.password || "");

    if (!password) {
      errors.password = "Password wajib diisi.";
    }

    return {
      valid: Object.keys(errors).length === 0,

      errors,
    };
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    validate,
  });
})();

window.LoginValidator = LoginValidator;
