/**
 * ==========================================
 * QEDEV Framework
 * Confirm Component
 * ==========================================
 */

const Confirm = (() => {
  let overlay;
  let title;
  let body;
  let okButton;
  let cancelButton;

  let callback = null;
  let initialized = false;

  function init() {
    if (initialized) return;

    overlay = document.getElementById("qedev-confirm");

    if (!overlay) return;

    title = overlay.querySelector(".qedev-confirm-title");
    body = overlay.querySelector(".qedev-confirm-body");
    okButton = overlay.querySelector(".qedev-confirm-ok");
    cancelButton = overlay.querySelector(".qedev-confirm-cancel");

    okButton.addEventListener("click", () => {
      if (callback) {
        callback();
      }

      hide();
    });

    cancelButton.addEventListener("click", hide);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        hide();
      }
    });

    initialized = true;
  }

  function show(options = {}) {
    title.textContent = options.title || "Confirmation";

    body.textContent = options.message || "";

    callback = options.onConfirm || null;

    overlay.classList.remove("hidden");

    document.body.style.overflow = "hidden";
  }

  function hide() {
    overlay.classList.add("hidden");

    document.body.style.overflow = "";

    callback = null;
  }

  return {
    init,

    show,

    hide,
  };
})();

window.Confirm = Confirm;
