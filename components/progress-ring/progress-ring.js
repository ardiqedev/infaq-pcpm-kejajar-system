/**
 * ============================================================
 * QEDEV Framework
 * Progress Ring Component
 * ============================================================
 */

class ProgressRing {
  render(options = {}) {
    const {
      value = 0,
      total = 100,
      size = 64,
      stroke = 6,
      color = "#16A34A",
    } = options;

    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const percentage = total > 0 ? value / total : 0;

    const offset = circumference - percentage * circumference;

    return `
        <div class="progress-ring">

            <svg
                width="${size}"
                height="${size}"
                viewBox="0 0 ${size} ${size}"
            >

                <circle
                    class="progress-ring-track"
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    stroke-width="${stroke}"
                />

                <circle
                    class="progress-ring-value"
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    stroke="${color}"
                    stroke-width="${stroke}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}"
                />

            </svg>

            <div class="progress-ring-text">

                <strong>${value}</strong>

                <small>/${total}</small>

            </div>

        </div>
        `;
  }
}

export default new ProgressRing();
