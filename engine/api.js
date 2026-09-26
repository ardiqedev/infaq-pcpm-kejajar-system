/* =========================================================
   QEDEV API ENGINE
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const API = (() => {
  let baseUrl = CONFIG.API_URL || "";

  /* =======================================================
     BASE URL
     ======================================================= */

  function setBaseUrl(url) {
    baseUrl = url || "";
  }

  function getBaseUrl() {
    return baseUrl;
  }

  /* =======================================================
     BUILD GET URL
     ======================================================= */

  function buildUrl(action, params = {}) {
    if (!baseUrl) {
      throw new Error("API Base URL belum diset.");
    }

    const url = new URL(baseUrl);

    url.searchParams.set("action", action);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  }

  /* =======================================================
     REQUEST
     ======================================================= */

  async function request(method, action, data = {}) {
    if (!baseUrl) {
      return {
        success: false,
        message: "API Base URL belum diset.",
        data: null,
      };
    }

    if (!action) {
      return {
        success: false,
        message: "API action belum ditentukan.",
        data: null,
      };
    }

    try {
      let url = baseUrl;

      const options = {
        method: method,
        redirect: "follow",
      };

      /* ===================================================
         GET
         =================================================== */

      if (method === "GET") {
        url = buildUrl(action, data);
      } else if (method === "POST") {

      /* ===================================================
         POST
         =================================================== */
        const formData = new URLSearchParams();

        formData.append("action", action);

        /*
         * Semua payload bisnis dikirim sebagai JSON.
         *
         * Contoh:
         *
         * API.post("auth.login", {
         *   username: "admin",
         *   password: "admin123"
         * });
         *
         * akan menjadi:
         *
         * action=auth.login
         * payload={"username":"admin","password":"admin123"}
         */

        formData.append("payload", JSON.stringify(data || {}));

        options.body = formData;
      } else {

      /* ===================================================
         METHOD TIDAK DIDUKUNG
         =================================================== */
        return {
          success: false,
          message: `HTTP method "${method}" tidak didukung.`,
          data: null,
        };
      }

      /* ===================================================
         DEBUG
         =================================================== */

      if (CONFIG.DEBUG) {
        console.log("[API] REQUEST");
        console.log("[API] METHOD :", method);
        console.log("[API] ACTION :", action);
        console.log("[API] URL    :", url);

        if (method === "POST") {
          console.log("[API] DATA   :", data);
        }
      }

      /* ===================================================
         FETCH
         =================================================== */

      const response = await fetch(url, options);

      /* ===================================================
         READ RESPONSE
         =================================================== */

      const text = await response.text();

      if (CONFIG.DEBUG) {
        console.log("[API] RESPONSE STATUS :", response.status);
        console.log("[API] RESPONSE RAW    :", text);
      }

      /* ===================================================
         HTTP ERROR
         =================================================== */

      if (!response.ok) {
        return {
          success: false,
          message: `HTTP Error (${response.status})`,
          data: null,
        };
      }

      /* ===================================================
         EMPTY RESPONSE
         =================================================== */

      if (!text) {
        return {
          success: false,
          message: "Server mengembalikan response kosong.",
          data: null,
        };
      }

      /* ===================================================
         PARSE JSON
         =================================================== */

      let result;

      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error("[API] Response bukan JSON:", text);

        return {
          success: false,
          message: "Response server tidak valid.",
          data: null,
        };
      }

      /* ===================================================
         FINAL RESPONSE
         =================================================== */

      if (CONFIG.DEBUG) {
        console.log("[API] RESULT :", result);
      }

      return result;
    } catch (error) {
      console.error("[API] REQUEST ERROR :", error);

      return {
        success: false,
        message: error?.message || "Terjadi kesalahan koneksi.",
        data: null,
      };
    }
  }

  /* =======================================================
     GET
     ======================================================= */

  function get(action, params = {}) {
    return request("GET", action, params);
  }

  /* =======================================================
     POST
     ======================================================= */

  function post(action, data = {}) {
    return request("POST", action, data);
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    setBaseUrl,
    getBaseUrl,

    buildUrl,

    request,

    get,
    post,
  });
})();

window.API = API;
