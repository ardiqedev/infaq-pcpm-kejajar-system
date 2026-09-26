/**
 * ==========================================
 * QEDEV Framework
 * Skeleton Component
 * ==========================================
 */

const Skeleton = (() => {
  /**
   * ==========================================
   * Render
   * ==========================================
   */
  function render(type = "") {
    switch (type) {
      case "home":
        return renderHome();

      case "btq":
        return renderBTQ();

      case "student":
        return renderStudent();

      case "assessment":
        return renderAssessment();

      default:
        return "";
    }
  }

  /**
   * ==========================================
   * Home
   * ==========================================
   */
  function renderHome() {
    return `
      <section class="qedev-skeleton">

        ${renderGreeting()}

        ${renderSchedule()}

        ${renderLauncher()}

        ${renderLauncher()}

        ${renderLauncher()}

      </section>
    `;
  }

  /**
   * ==========================================
   * Greeting
   * ==========================================
   */
  function renderGreeting() {
    return `
      <section class="sk-greeting">

        <div class="sk-greeting-text">

          <div class="sk-line sk-lg"></div>

          <div class="sk-line sk-md"></div>

          <div class="sk-line sk-sm"></div>

        </div>

        <div class="sk-avatar"></div>

      </section>
    `;
  }

  /**
   * ==========================================
   * Schedule Card
   * ==========================================
   */
  function renderSchedule() {
    return `
      <section class="sk-card">

        <div class="sk-title"></div>

        <div class="sk-schedule">

          <div class="sk-schedule-list">

            <div class="sk-line"></div>

            <div class="sk-line"></div>

            <div class="sk-line"></div>

          </div>

          <div class="sk-summary"></div>

        </div>

      </section>
    `;
  }

  /**
   * ==========================================
   * Launcher Card
   * ==========================================
   */
  function renderLauncher() {
    return `
      <section class="sk-card">

        <div class="sk-title"></div>

        <div class="sk-grid">

          <div class="sk-box"></div>

          <div class="sk-box"></div>

        </div>

      </section>
    `;
  }

  /**
   * ==========================================
   * BTQ
   * ==========================================
   */
  function renderBTQ() {
    return `
      <section class="qedev-skeleton">

        ${renderSchedule()}

      </section>
    `;
  }

  /**
   * ==========================================
   * Student
   * ==========================================
   */
  function renderStudent() {
    return `
      <section class="qedev-skeleton">

        ${renderList(8)}

      </section>
    `;
  }

  /**
   * ==========================================
   * Assessment
   * ==========================================
   */
  function renderAssessment() {
    return `
      <section class="qedev-skeleton">

        ${renderCard()}

        ${renderCard()}

      </section>
    `;
  }

  /**
   * ==========================================
   * Generic Card
   * ==========================================
   */
  function renderCard() {
    return `
      <section class="sk-card">

        <div class="sk-title"></div>

        <div class="sk-line"></div>

        <div class="sk-line"></div>

        <div class="sk-line sk-sm"></div>

      </section>
    `;
  }

  /**
   * ==========================================
   * Generic List
   * ==========================================
   */
  function renderList(total = 5) {
    let html = "";

    for (let i = 0; i < total; i++) {
      html += `
        <div class="sk-list-item">

          <div class="sk-avatar-sm"></div>

          <div class="sk-list-content">

            <div class="sk-line"></div>

            <div class="sk-line sk-sm"></div>

          </div>

        </div>
      `;
    }

    return html;
  }

  /**
   * ==========================================
   * Public API
   * ==========================================
   */
  return {
    render,
  };
})();

window.Skeleton = Skeleton;
