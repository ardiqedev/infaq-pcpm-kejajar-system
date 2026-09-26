/**
 * ==========================================
 * QEDEV Framework
 * Badge Component
 * ==========================================
 */

const Badge = (() => {
  function render(type = "default", text = "") {
    return `
      <span class="qedev-badge qedev-badge-${type}">
        ${text}
      </span>
    `;
  }

  return {
    render,
  };
})();

window.Badge = Badge;
