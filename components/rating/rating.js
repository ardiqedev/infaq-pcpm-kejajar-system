/**
 * ==========================================
 * QEDEV Framework
 * Rating Component
 * ==========================================
 */

const Rating = (() => {
  /**
   * ==========================================
   * Default Mapping
   * ==========================================
   */

  let SCORE = {};

  let onChange = null;
  /**
   * ==========================================
   * Set Mapping
   * ==========================================
   */

  function setMapping(rows = []) {
    if (!Array.isArray(rows) || !rows.length) return;

    SCORE = {};

    rows.forEach((item) => {
      SCORE[Number(item.star)] = Number(item.score);
    });
  }

  function setOnChange(callback) {
    onChange = callback;
  }

  /**
   * ==========================================
   * Render
   * ==========================================
   */

  function render({ name = "", label = "", value = 5 } = {}) {
    return `
    <div
      class="qedev-rating"
      data-name="${name}">

      <div class="qedev-rating-label">

        ${label}

      </div>

      <div
        class="qedev-rating-stars"
        data-field="${name}">

        ${renderStars(value)}

      </div>

      <div class="qedev-rating-score">

        Nilai :

        <strong
          id="btq-score-${name}"
          class="qedev-rating-value">

          ${getScore(value)}

        </strong>

      </div>

    </div>
  `;
  }

  /**
   * ==========================================
   * Render Stars
   * ==========================================
   */

  /**
   * ==========================================
   * Render Stars
   * ==========================================
   */

  function renderStars(value) {
    let html = "";

    for (let i = 1; i <= 5; i++) {
      html += `
      <button
        type="button"
        class="qedev-star ${i <= value ? "active" : ""}"
        data-value="${i}">

        ★

      </button>
    `;
    }

    return html;
  }

  /**
   * ==========================================
   * Bind Events
   * ==========================================
   */

  let eventBound = false;

  function bindEvents() {
    if (eventBound) return;

    eventBound = true;

    document.addEventListener("click", handleClick);
  }

  /**
   * ==========================================
   * Handle Click
   * ==========================================
   */

  function handleClick(e) {
    const star = e.target.closest(".qedev-star");

    if (!star) return;

    const rating = star.closest(".qedev-rating");

    if (!rating) return;

    const value = Number(star.dataset.value);

    update(rating, value);
  }

  /**
   * ==========================================
   * Update
   * ==========================================
   */

  function update(container, value) {
    const score = getScore(value);

    container.querySelectorAll(".qedev-star").forEach((star) => {
      star.classList.toggle(
        "active",

        Number(star.dataset.value) <= value,
      );
    });

    container.querySelector(".qedev-rating-score strong").textContent = score;

    if (typeof onChange === "function") {
      onChange(
        container.dataset.name,

        value,

        score,
      );
    }
  }

  /**
   * ==========================================
   * Get Score
   * ==========================================
   */

  function getScore(star) {
    return SCORE[Number(star)] ?? 0;
  }

  /**
   * ==========================================
   * Get Star
   * ==========================================
   */

  function getStar(container) {
    return container.querySelectorAll(".qedev-star.active").length;
  }

  /**
   * ==========================================
   * Get Star By Score
   * ==========================================
   */

  function getStarByScore(score) {
    const item = Object.entries(SCORE).find(
      ([, value]) => Number(value) === Number(score),
    );

    return item ? Number(item[0]) : 5;
  }

  /**
   * ==========================================
   * Get Value
   * ==========================================
   */

  function getValue(container) {
    return getScore(getStar(container));
  }

  return {
    render,

    bindEvents,

    setMapping,

    getScore,

    getStarByScore,

    getStar,

    getValue,

    setOnChange,
  };
})();

window.Rating = Rating;
