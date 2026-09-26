/**
 * ==========================================
 * QEDEV Framework
 * Dropdown Component
 * ==========================================
 */

const Dropdown = (() => {
  let dropdown;
  let menu;

  let initialized = false;

  function init() {
    if (initialized) return;

    dropdown = document.getElementById("qedev-dropdown");

    if (!dropdown) return;

    menu = dropdown.querySelector(".qedev-dropdown-menu");

    document.addEventListener("click", hide);

    initialized = true;
  }

  function show(target, items = []) {
    menu.innerHTML = items
      .map(
        (item) => `

            <div
                class="qedev-dropdown-item"
                data-action="${item.action || ""}">

                ${item.icon || ""}

                <span>${item.label}</span>

            </div>

        `,
      )
      .join("");

    const rect = target.getBoundingClientRect();

    dropdown.style.left = `${rect.left}px`;

    dropdown.style.top = `${rect.bottom + 8}px`;

    dropdown.classList.remove("hidden");
  }

  function hide() {
    dropdown.classList.add("hidden");
  }

  return {
    init,

    show,

    hide,
  };
})();

window.Dropdown = Dropdown;
