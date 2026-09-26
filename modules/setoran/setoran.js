/* =========================================================
   SETORAN MODULE
   ADMIN
   IURAN PENJAGA SEKOLAH
========================================================= */

const SetoranModule = (() => {
  let items = [];
  let activeFilter = "ALL";

  let penarikTransaksi = [];
  let penarikSetoran = [];

  /* =======================================================
     INIT
  ======================================================= */

  async function init() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      console.error("[SETORAN] qedev-main tidak ditemukan.");
      return;
    }

    const user = Auth.getUser();

    if (!user) {
      Router.navigate(CONFIG.ROUTE.LOGIN);
      return;
    }

    const role = String(user.ROLE || "")
      .trim()
      .toUpperCase();

    if (role === CONFIG.ROLE.ADMIN) {
      await initAdmin();
      return;
    }

    if (role === CONFIG.ROLE.PENARIK) {
      await initPenarik();
      return;
    }

    console.error("[SETORAN] Role tidak dikenali:", user.ROLE);

    Router.navigate(CONFIG.ROUTE.HOME);
  }

  async function initAdmin() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      console.error("[SETORAN] qedev-main tidak ditemukan.");
      return;
    }

    main.innerHTML = renderLoading();

    try {
      await load();

      render();

      bindEvents();
    } catch (error) {
      console.error("[SETORAN] Admin init error:", error);

      main.innerHTML = renderError(error.message);
    }
  }

  async function initPenarik() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      console.error("[SETORAN] qedev-main tidak ditemukan.");
      return;
    }

    main.innerHTML = renderPenarikLoading();

    try {
      await loadPenarik();

      renderPenarik();

      bindPenarikEvents();
    } catch (error) {
      console.error("[SETORAN] Penarik init error:", error);

      main.innerHTML = renderPenarikError(error.message);
    }
  }

  /* =======================================================
     LOAD
  ======================================================= */

  async function load() {
    items = await SetoranService.list();
  }

  async function loadPenarik() {
    const [transaksi, setoran] = await Promise.all([
      TransaksiService.list(),
      SetoranService.list(),
    ]);

    penarikTransaksi = Array.isArray(transaksi) ? transaksi : [];

    penarikSetoran = Array.isArray(setoran) ? setoran : [];

    console.log("[SETORAN] TRANSAKSI PENARIK:", penarikTransaksi);

    console.log("[SETORAN] SETORAN PENARIK:", penarikSetoran);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  function render() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = SetoranView.render(items);

    renderFilteredList();
  }

  function renderPenarik() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = SetoranView.renderPenarik({
      transaksi: penarikTransaksi,

      setoran: penarikSetoran,
    });
  }

  /* =======================================================
     FILTER
  ======================================================= */

  function renderFilteredList() {
    const container = document.getElementById("setoran-list");

    if (!container) {
      return;
    }

    const filtered =
      activeFilter === "ALL"
        ? items
        : items.filter((item) => item.status === activeFilter);

    container.innerHTML = SetoranView.renderList(filtered);
  }

  /* =======================================================
     EVENTS
  ======================================================= */

  function bindEvents() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    main.onclick = handleClick;
  }

  function bindPenarikEvents() {
    const main = document.getElementById("qedev-main");

    if (!main) {
      return;
    }

    main.onclick = handlePenarikClick;
  }

  async function handlePenarikClick(event) {
    const actionElement = event.target.closest("[data-action]");

    if (!actionElement) {
      return;
    }

    const action = actionElement.dataset.action;

    if (action === "penarik-reload") {
      await reloadPenarik();

      return;
    }

    if (action === "penarik-create") {
      await createPenarikSetoran();

      return;
    }

    if (action === "penarik-detail") {
      const id = actionElement.dataset.id;

      if (id) {
        await openPenarikDetail(id);
      }

      return;
    }
  }

  async function handleClick(event) {
    const actionElement = event.target.closest("[data-action]");

    if (actionElement && actionElement.dataset.action) {
      const action = actionElement.dataset.action;

      /*
       * Ambil ID dari tombol.
       * Fallback ke parent card jika diperlukan.
       */
      const id =
        actionElement.dataset.id ||
        actionElement.dataset.setoranId ||
        actionElement.closest("[data-setoran-id]")?.dataset.setoranId ||
        "";

      console.log("[SETORAN] ADMIN ACTION:", {
        action,
        id,
        element: actionElement,
      });

      if (action === "reload") {
        await reload();

        return;
      }

      if (action === "detail") {
        if (!id) {
          console.error("[SETORAN] ID_SETORAN tidak ditemukan untuk detail.");

          return;
        }

        await openDetail(id);

        return;
      }

      if (action === "verify") {
        if (!id) {
          console.error(
            "[SETORAN] ID_SETORAN tidak ditemukan untuk verifikasi.",
          );

          if (
            typeof Toast !== "undefined" &&
            typeof Toast.error === "function"
          ) {
            Toast.error("ID setoran tidak ditemukan.");
          }

          return;
        }

        await verify(id);

        return;
      }
    }

    const filterButton = event.target.closest("[data-filter]");

    if (filterButton) {
      activeFilter = filterButton.dataset.filter || "ALL";

      updateFilterButtons();

      renderFilteredList();
    }
  }

  /* =======================================================
     FILTER BUTTON STATE
  ======================================================= */

  function updateFilterButtons() {
    document.querySelectorAll(".setoran-filter-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === activeFilter);
    });
  }

  async function createPenarikSetoran() {
    const button = document.querySelector('[data-action="penarik-create"]');

    if (!button) {
      console.warn("[SETORAN] Tombol penarik-create tidak ditemukan.");

      return;
    }

    try {
      button.disabled = true;

      button.textContent = "Membuat Setoran...";

      console.log("[SETORAN] Membuat setoran penarik...");

      const response = await SetoranService.create();

      console.log("[SETORAN] CREATE PENARIK RESPONSE:", response);

      if (typeof Toast !== "undefined" && typeof Toast.success === "function") {
        Toast.success("Setoran berhasil dibuat dan menunggu verifikasi.");
      }

      await loadPenarik();

      renderPenarik();

      bindPenarikEvents();
    } catch (error) {
      console.error("[SETORAN] Create penarik error:", error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error.message || "Setoran gagal dibuat.");
      }

      button.disabled = false;

      button.textContent = "Buat Setoran";
    }
  }

  /* =======================================================
     RELOAD
  ======================================================= */

  async function reload() {
    try {
      await load();

      render();

      bindEvents();

      if (typeof Toast !== "undefined" && typeof Toast.success === "function") {
        Toast.success("Data setoran diperbarui.");
      }
    } catch (error) {
      console.error("[SETORAN] Reload error:", error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error.message || "Gagal memuat setoran.");
      }
    }
  }

  async function reloadPenarik() {
    try {
      await loadPenarik();

      renderPenarik();

      bindPenarikEvents();

      if (typeof Toast !== "undefined" && typeof Toast.success === "function") {
        Toast.success("Data setoran diperbarui.");
      }
    } catch (error) {
      console.error("[SETORAN] Reload penarik error:", error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error.message || "Gagal memuat data setoran.");
      }
    }
  }

  /* =======================================================
   DETAIL
======================================================= */

  async function openDetail(id) {
    try {
      const item = await SetoranService.detail(id);

      console.log("[SETORAN] DETAIL NORMALIZED:", item);

      const canVerify =
        item.status === "MENUNGGU_VERIFIKASI" && item.selisih === 0;

      /* ===================================================
       HAPUS DETAIL LAMA JIKA ADA
    =================================================== */

      closeDetailOverlay();

      /* ===================================================
       BUAT OVERLAY
    =================================================== */

      const overlay = document.createElement("div");

      overlay.id = "setoran-detail-overlay";

      overlay.className = "setoran-detail-overlay";

      overlay.innerHTML = `

      <div
        class="setoran-detail-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="setoran-detail-title"
      >

        <div class="setoran-detail-sheet-header">

          <div>

            <span class="setoran-detail-sheet-eyebrow">
              DETAIL SETORAN
            </span>

            <h2
              id="setoran-detail-title"
              class="setoran-detail-sheet-title"
            >
              Setoran Penarik
            </h2>

          </div>


          <button
            type="button"
            class="setoran-detail-close"
            data-detail-action="close"
            aria-label="Tutup detail"
          >
            &times;
          </button>

        </div>


        <div class="setoran-detail-sheet-body">

          ${SetoranView.renderDetail(item)}

        </div>


        <div class="setoran-detail-sheet-footer">

          <button
            type="button"
            class="setoran-button secondary"
            data-detail-action="close"
          >
            Tutup
          </button>

          ${
            canVerify
              ? `
                <button
                  type="button"
                  class="setoran-button primary"
                  data-detail-action="verify"
                  data-setoran-id="${escapeHtml(id)}"
                >
                  Verifikasi Setoran
                </button>
              `
              : ""
          }

        </div>

      </div>

    `;

      document.body.appendChild(overlay);

      /* ===================================================
       OPEN
    =================================================== */

      requestAnimationFrame(() => {
        overlay.classList.add("show");
      });

      document.body.style.overflow = "hidden";

      /* ===================================================
       EVENTS
    =================================================== */

      overlay.addEventListener("click", async (event) => {
        /* ===============================================
           KLIK BACKDROP
        =============================================== */

        if (event.target === overlay) {
          closeDetailOverlay();

          return;
        }

        /* ===============================================
           BUTTON ACTION
        =============================================== */

        const button = event.target.closest("[data-detail-action]");

        if (!button) {
          return;
        }

        const action = button.dataset.detailAction;

        /* ===============================================
           CLOSE
        =============================================== */

        if (action === "close") {
          closeDetailOverlay();

          return;
        }

        /* ===============================================
           VERIFY
        =============================================== */

        if (action === "verify") {
          const setoranId = button.dataset.setoranId;

          await verify(setoranId, true);
        }
      });

      /* ===================================================
       ESCAPE
    =================================================== */

      document.addEventListener("keydown", handleDetailEscape);
    } catch (error) {
      console.error("[SETORAN] Detail error:", error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error.message || "Gagal membuka detail setoran.");
      }
    }
  }

  async function openPenarikDetail(id) {
    try {
      const item = await SetoranService.detail(id);

      console.log("[SETORAN] PENARIK DETAIL:", item);

      if (typeof SetoranView.renderDetail !== "function") {
        return;
      }

      const overlay = document.createElement("div");

      overlay.id = "setoran-detail-overlay";

      overlay.className = "setoran-detail-overlay";

      overlay.innerHTML = `

      <div
        class="setoran-detail-sheet"
        role="dialog"
        aria-modal="true"
      >

        <div
          class="setoran-detail-sheet-header"
        >

          <div>

            <span
              class="setoran-detail-sheet-eyebrow"
            >
              DETAIL SETORAN
            </span>

            <h2
              class="setoran-detail-sheet-title"
            >
              Setoran Saya
            </h2>

          </div>


          <button
            type="button"
            class="setoran-detail-close"
            data-detail-action="close"
            aria-label="Tutup detail"
          >
            &times;
          </button>

        </div>


        <div
          class="setoran-detail-sheet-body"
        >

          ${SetoranView.renderDetail(item)}

        </div>


        <div
          class="setoran-detail-sheet-footer"
        >

          <button
            type="button"
            class="setoran-button secondary"
            data-detail-action="close"
          >
            Tutup
          </button>

        </div>

      </div>

    `;

      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.classList.add("show");
      });

      document.body.style.overflow = "hidden";

      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          closePenarikDetail();

          return;
        }

        const button = event.target.closest("[data-detail-action]");

        if (!button) {
          return;
        }

        if (button.dataset.detailAction === "close") {
          closePenarikDetail();
        }
      });
    } catch (error) {
      console.error("[SETORAN] Penarik detail error:", error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error.message || "Gagal membuka detail setoran.");
      }
    }
  }

  function closePenarikDetail() {
    const overlay = document.getElementById("setoran-detail-overlay");

    if (overlay) {
      overlay.classList.remove("show");

      setTimeout(() => {
        overlay.remove();
      }, 180);
    }

    document.body.style.overflow = "";
  }

  function renderPenarikLoading() {
    return `

    <section
      class="setoran-page"
    >

      <div
        class="setoran-loading"
      >

        <div
          class="setoran-loading-line"
        ></div>

        <div
          class="setoran-loading-line"
        ></div>

        <div
          class="setoran-loading-card"
        ></div>

        <div
          class="setoran-loading-card"
        ></div>

      </div>

    </section>

  `;
  }

  function renderPenarikError(message) {
    return `

    <section
      class="setoran-page"
    >

      <div
        class="setoran-error"
      >

        <strong>
          Gagal memuat setoran
        </strong>

        <span>
          ${escapeHtml(message || "Terjadi kesalahan.")}
        </span>

        <button
          type="button"
          class="setoran-button primary"
          data-action="reload"
        >
          Coba Lagi
        </button>

      </div>

    </section>

  `;
  }

  /* =======================================================
   CLOSE DETAIL OVERLAY
======================================================= */

  function closeDetailOverlay() {
    const overlay = document.getElementById("setoran-detail-overlay");

    if (overlay) {
      overlay.classList.remove("show");

      setTimeout(() => {
        overlay.remove();
      }, 180);
    }

    document.body.style.overflow = "";

    document.removeEventListener("keydown", handleDetailEscape);
  }

  /* =======================================================
   DETAIL ESCAPE
======================================================= */

  function handleDetailEscape(event) {
    if (event.key === "Escape") {
      closeDetailOverlay();
    }
  }

  /* =======================================================
     VERIFY
  ======================================================= */

  async function verify(id, fromModal = false) {
    const item = items.find((row) => row.id === id);

    if (item && (item.status !== "MENUNGGU_VERIFIKASI" || item.selisih !== 0)) {
      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error("Setoran belum memenuhi syarat verifikasi.");
      }

      return;
    }

    const confirmed = window.confirm(
      "Verifikasi setoran ini?\n\n" +
        "Setelah diverifikasi, transaksi terkait akan menjadi resmi dan tidak dapat diubah.",
    );

    if (!confirmed) {
      return;
    }

    try {
      await SetoranService.verify(id);

      if (fromModal) {
        closeDetailOverlay();
      }

      if (typeof Toast !== "undefined" && typeof Toast.success === "function") {
        Toast.success("Setoran berhasil diverifikasi.");
      }

      await load();

      render();

      bindEvents();
    } catch (error) {
      console.error("[SETORAN] Verify error:", error);

      if (typeof Toast !== "undefined" && typeof Toast.error === "function") {
        Toast.error(error.message || "Setoran gagal diverifikasi.");
      }
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  function renderLoading() {
    return `

      <section class="setoran-page">

        <div class="setoran-loading">

          <div class="setoran-loading-line"></div>
          <div class="setoran-loading-line"></div>
          <div class="setoran-loading-card"></div>
          <div class="setoran-loading-card"></div>

        </div>

      </section>

    `;
  }

  /* =======================================================
     ERROR
  ======================================================= */

  function renderError(message) {
    return `

      <section class="setoran-page">

        <div class="setoran-error">

          <strong>
            Gagal memuat setoran
          </strong>

          <span>
            ${escapeHtml(message || "Terjadi kesalahan.")}
          </span>

          <button
            type="button"
            class="setoran-button primary"
            data-action="reload"
          >
            Coba Lagi
          </button>

        </div>

      </section>

    `;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return {
    init,
  };
})();

window.SetoranModule = SetoranModule;
