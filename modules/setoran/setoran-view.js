/* =========================================================
   SETORAN VIEW
   IURAN PENJAGA SEKOLAH
========================================================= */

const SetoranView = (() => {
  /* =======================================================
     HELPERS
  ======================================================= */

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function rupiah(value) {
    const amount = Number(value) || 0;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function number(value) {
    return new Intl.NumberFormat("id-ID").format(Number(value) || 0);
  }

  function date(value) {
    if (!value) {
      return "-";
    }

    const d = new Date(value);

    if (Number.isNaN(d.getTime())) {
      return escapeHtml(value);
    }

    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function statusLabel(status) {
    switch (status) {
      case "MENUNGGU_VERIFIKASI":
        return "Menunggu Verifikasi";

      case "DIVERIFIKASI":
        return "Diverifikasi";

      case "DIBATALKAN":
        return "Dibatalkan";

      default:
        return status || "-";
    }
  }

  function statusClass(status) {
    switch (status) {
      case "MENUNGGU_VERIFIKASI":
        return "status-warning";

      case "DIVERIFIKASI":
        return "status-success";

      case "DIBATALKAN":
        return "status-danger";

      default:
        return "status-neutral";
    }
  }

  function penarikStatusLabel(status) {
    switch (status) {
      case "MENUNGGU_VERIFIKASI":
        return "Menunggu Verifikasi";

      case "DIVERIFIKASI":
        return "Diverifikasi";

      case "DIBATALKAN":
        return "Dibatalkan";

      default:
        return status || "-";
    }
  }

  function penarikStatusClass(status) {
    switch (status) {
      case "MENUNGGU_VERIFIKASI":
        return "status-warning";

      case "DIVERIFIKASI":
        return "status-success";

      case "DIBATALKAN":
        return "status-danger";

      default:
        return "status-neutral";
    }
  }

  /* =======================================================
     PAGE
  ======================================================= */

  function render(items = []) {
    return `

      <section class="setoran-page">

        <div class="setoran-page-header">

          <div>
            <span class="setoran-eyebrow">
              ADMINISTRASI
            </span>

            <h1>
              Setoran Penarik
            </h1>

            <p>
              Periksa dan verifikasi setoran iuran.
            </p>
          </div>

          <button
            type="button"
            class="setoran-refresh-button"
            data-action="reload"
            aria-label="Muat ulang"
          >
            ↻
          </button>

        </div>


        <div class="setoran-summary">

          ${renderSummary(items)}

        </div>


        <div class="setoran-filter">

          <button
            type="button"
            class="setoran-filter-button active"
            data-filter="ALL"
          >
            Semua
          </button>

          <button
            type="button"
            class="setoran-filter-button"
            data-filter="MENUNGGU_VERIFIKASI"
          >
            Menunggu
          </button>

          <button
            type="button"
            class="setoran-filter-button"
            data-filter="DIVERIFIKASI"
          >
            Diverifikasi
          </button>

          <button
            type="button"
            class="setoran-filter-button"
            data-filter="DIBATALKAN"
          >
            Dibatalkan
          </button>

        </div>


        <div
          id="setoran-list"
          class="setoran-list"
        >

          ${renderList(items)}

        </div>

      </section>

    `;
  }

  /* =======================================================
     PAGE PENARIK
  ======================================================= */

  function renderPenarik(data = {}) {
    const transaksi = Array.isArray(data.transaksi) ? data.transaksi : [];

    const setoran = Array.isArray(data.setoran) ? data.setoran : [];

    /* =======================================================
     TRANSAKSI YANG SIAP DISETOR
  ======================================================= */

    const eligibleTransactions = transaksi.filter((item) => {
      const status = String(item.status || "").toUpperCase();
      const idSetoran = String(item.idSetoran || "").trim();

      return status === "MENUNGGU_SETORAN" && !idSetoran;
    });

    /* =======================================================
     SUMMARY
  ======================================================= */

    const jumlahTransaksi = eligibleTransactions.length;

    const jumlahCash = eligibleTransactions
      .filter((item) => String(item.metode || "").toUpperCase() === "CASH")
      .reduce((total, item) => total + (Number(item.total) || 0), 0);

    const jumlahTransfer = eligibleTransactions
      .filter((item) => String(item.metode || "").toUpperCase() === "TRANSFER")
      .reduce((total, item) => total + (Number(item.total) || 0), 0);

    const totalTransaksi = jumlahCash + jumlahTransfer;

    /* =======================================================
     RIWAYAT SETORAN
  ======================================================= */

    const riwayatSetoran = [...setoran].sort((a, b) => {
      const dateA = new Date(a.tanggalSetor || a.createdAt || 0).getTime();

      const dateB = new Date(b.tanggalSetor || b.createdAt || 0).getTime();

      return dateB - dateA;
    });

    return `

    <section class="setoran-penarik-page">

      <!-- =================================================
           HEADER
      ================================================= -->

      <div class="setoran-penarik-header">

        <div>

          <span class="setoran-penarik-eyebrow">
            PENARIKAN IURAN
          </span>

          <h1>
            Setoran Saya
          </h1>

          <p>
            Kumpulan transaksi iuran untuk disetor.
          </p>

        </div>


        <button
          type="button"
          class="setoran-refresh-button"
          data-action="penarik-reload"
          aria-label="Muat ulang"
        >
          ↻
        </button>

      </div>


      <!-- =================================================
           SIAP DISETOR
      ================================================= -->

      <section class="setoran-ready-card">

        <div class="setoran-ready-header">

          <span class="setoran-ready-label">
            SIAP DISETOR
          </span>

          <h2 class="setoran-ready-title">
            Transaksi Belum Disetor
          </h2>

          <p class="setoran-ready-subtitle">
            ${number(jumlahTransaksi)} transaksi
          </p>

        </div>


        <!-- ===============================================
             CASH / TRANSFER
        =============================================== -->

        <div class="setoran-penarik-summary">

          <div class="setoran-penarik-summary-item">

            <span>
              CASH
            </span>

            <strong>
              ${rupiah(jumlahCash)}
            </strong>

          </div>


          <div class="setoran-penarik-summary-item">

            <span>
              TRANSFER
            </span>

            <strong>
              ${rupiah(jumlahTransfer)}
            </strong>

          </div>

        </div>


        <!-- ===============================================
             TOTAL
        =============================================== -->

        <div class="setoran-penarik-total">

          <div class="setoran-penarik-total-label">
            Total yang akan disetor
          </div>

          <div class="setoran-penarik-total-value">
            ${rupiah(totalTransaksi)}
          </div>

        </div>


        <!-- ===============================================
             VALIDASI
        =============================================== -->

        ${
          jumlahTransaksi > 0
            ? `
              <div class="setoran-penarik-validation">

                <span>
                  ✓ Tidak ada selisih
                </span>

                <strong>
                  ${rupiah(0)}
                </strong>

              </div>
            `
            : ""
        }


        <!-- ===============================================
             ACTION
        =============================================== -->

        ${
          jumlahTransaksi > 0
            ? `
              <button
                type="button"
                class="setoran-create-button"
                data-action="penarik-create"
              >
                Buat Setoran
              </button>
            `
            : ""
        }

      </section>


      <!-- =================================================
           RIWAYAT
      ================================================= -->

      <section class="setoran-riwayat">

        <div class="setoran-riwayat-header">

          <h2>
            Setoran Saya
          </h2>

          <p>
            ${number(riwayatSetoran.length)} setoran
          </p>

        </div>


        ${
          riwayatSetoran.length
            ? `
              <div class="setoran-penarik-list">

                ${riwayatSetoran
                  .map((item) => {
                    const status = String(item.status || "").toUpperCase();

                    let statusText = "Belum diketahui";

                    let statusClass = "neutral";

                    if (status === "MENUNGGU_VERIFIKASI") {
                      statusText = "Menunggu Verifikasi";

                      statusClass = "waiting";
                    } else if (status === "DIVERIFIKASI") {
                      statusText = "Diverifikasi";

                      statusClass = "success";
                    } else if (status === "DIBATALKAN") {
                      statusText = "Dibatalkan";

                      statusClass = "danger";
                    }

                    return `

                      <article
                        class="setoran-penarik-card"
                      >

                        <div
                          class="setoran-penarik-card-header"
                        >

                          <div
                            class="setoran-penarik-card-info"
                          >

                            <strong>
                              ${escapeHtml(item.id || "Setoran")}
                            </strong>

                            <span>
                              ${date(item.tanggalSetor || item.createdAt)}
                            </span>

                          </div>


                          <span
                            class="
                              setoran-penarik-status
                              ${statusClass}
                            "
                          >
                            ${escapeHtml(statusText)}
                          </span>

                        </div>


                        <div
                          class="setoran-penarik-card-body"
                        >

                          <div
                            class="
                              setoran-penarik-card-stat
                            "
                          >

                            <span>
                              TRANSAKSI
                            </span>

                            <strong>
                              ${number(item.jumlahTransaksi)}
                            </strong>

                          </div>


                          <div
                            class="
                              setoran-penarik-card-stat
                            "
                          >

                            <span>
                              CASH
                            </span>

                            <strong>
                              ${rupiah(item.jumlahCash)}
                            </strong>

                          </div>

                        </div>


                        <div
                          class="
                            setoran-penarik-card-footer
                          "
                        >

                          <div
                            class="
                              setoran-penarik-card-total
                            "
                          >

                            <span>
                              TOTAL SETORAN
                            </span>

                            <strong>
                              ${rupiah(
                                item.totalSetoran ?? item.totalTransaksi ?? 0,
                              )}
                            </strong>

                          </div>


                          <button
                            type="button"
                            class="
                              setoran-penarik-detail-button
                            "
                            data-action="penarik-detail"
                            data-id="${escapeHtml(item.id || "")}"
                          >
                            Detail
                          </button>

                        </div>

                      </article>

                    `;
                  })
                  .join("")}

              </div>
            `
            : `
              <div class="setoran-penarik-empty">

                <div
                  class="setoran-penarik-empty-icon"
                >
                  ✓
                </div>

                <strong>
                  Belum ada setoran
                </strong>

                <span>
                  Setoran yang sudah dibuat
                  akan muncul di sini.
                </span>

              </div>
            `
        }

      </section>

    </section>

  `;
  }

  /* =======================================================
     SUMMARY PENARIK
  ======================================================= */

  function calculatePenarikSummary(transaksi = []) {
    let jumlahCash = 0;
    let jumlahTransfer = 0;
    let totalTransaksi = 0;

    transaksi.forEach((item) => {
      const total = Number(item.TOTAL ?? item.total ?? 0) || 0;

      const metode = String(item.METODE ?? item.metode ?? "")
        .trim()
        .toUpperCase();

      totalTransaksi += total;

      if (metode === "CASH") {
        jumlahCash += total;
      }

      if (metode === "TRANSFER") {
        jumlahTransfer += total;
      }
    });

    return {
      jumlahTransaksi: transaksi.length,

      jumlahCash,

      jumlahTransfer,

      totalTransaksi,
    };
  }

  /* =======================================================
     LIST SETORAN PENARIK
  ======================================================= */

  function renderPenarikList(items = []) {
    if (!items.length) {
      return `

        <div class="setoran-empty">

          <div class="setoran-empty-icon">
            ✓
          </div>

          <strong>
            Belum ada setoran
          </strong>

          <span>
            Setoran yang sudah dibuat akan muncul di sini.
          </span>

        </div>

      `;
    }

    return items.map((item) => renderPenarikCard(item)).join("");
  }

  /* =======================================================
     CARD SETORAN PENARIK
  ======================================================= */

  function renderPenarikCard(item) {
    const status = String(item.STATUS ?? item.status ?? "")
      .trim()
      .toUpperCase();

    const totalTransaksi =
      Number(item.TOTAL_TRANSAKSI ?? item.totalTransaksi ?? 0) || 0;

    const totalSetoran =
      Number(item.TOTAL_SETORAN ?? item.totalSetoran ?? 0) || 0;

    const jumlahCash = Number(item.JUMLAH_CASH ?? item.jumlahCash ?? 0) || 0;

    const jumlahTransfer =
      Number(item.JUMLAH_TRANSFER ?? item.jumlahTransfer ?? 0) || 0;

    const id = String(item.ID_SETORAN ?? item.id ?? "").trim();

    return `

      <article
        class="setoran-penarik-card"
        data-setoran-id="${escapeHtml(id)}"
      >

        <div class="setoran-penarik-card-header">

          <div>

            <span class="setoran-section-eyebrow">
              SETORAN
            </span>

            <strong>
              ${escapeHtml(id || "-")}
            </strong>

            <small>
              ${date(item.TANGGAL_SETOR ?? item.tanggalSetor)}
            </small>

          </div>


          <span
            class="setoran-status ${penarikStatusClass(status)}"
          >
            ${escapeHtml(penarikStatusLabel(status))}
          </span>

        </div>


        <div class="setoran-penarik-card-summary">

          <div>

            <span>
              Cash
            </span>

            <strong>
              ${rupiah(jumlahCash)}
            </strong>

          </div>


          <div>

            <span>
              Transfer
            </span>

            <strong>
              ${rupiah(jumlahTransfer)}
            </strong>

          </div>


          <div>

            <span>
              Total
            </span>

            <strong>
              ${rupiah(totalTransaksi)}
            </strong>

          </div>

        </div>


        <div class="setoran-penarik-card-total">

          <span>
            Total Setoran
          </span>

          <strong>
            ${rupiah(totalSetoran)}
          </strong>

        </div>


        <button
          type="button"
          class="setoran-button secondary"
          data-action="detail"
          data-id="${escapeHtml(id)}"
        >
          Lihat Detail
        </button>

      </article>

    `;
  }

  /* =======================================================
     SUMMARY
  ======================================================= */

  function renderSummary(items) {
    const waiting = items.filter(
      (item) => item.status === "MENUNGGU_VERIFIKASI",
    ).length;

    const verified = items.filter(
      (item) => item.status === "DIVERIFIKASI",
    ).length;

    const waitingAmount = items
      .filter((item) => item.status === "MENUNGGU_VERIFIKASI")
      .reduce((total, item) => total + item.totalSetoran, 0);

    return `

      <div class="setoran-summary-card">

        <span>
          Menunggu
        </span>

        <strong>
          ${number(waiting)}
        </strong>

      </div>


      <div class="setoran-summary-card">

        <span>
          Nilai Menunggu
        </span>

        <strong>
          ${rupiah(waitingAmount)}
        </strong>

      </div>


      <div class="setoran-summary-card">

        <span>
          Diverifikasi
        </span>

        <strong>
          ${number(verified)}
        </strong>

      </div>

    `;
  }

  /* =======================================================
     LIST
  ======================================================= */

  function renderList(items = []) {
    if (!items.length) {
      return `

        <div class="setoran-empty">

          <div class="setoran-empty-icon">
            ✓
          </div>

          <strong>
            Belum ada setoran
          </strong>

          <span>
            Data setoran akan muncul di sini.
          </span>

        </div>

      `;
    }

    return items.map((item) => renderCard(item)).join("");
  }

  /* =======================================================
     CARD
  ======================================================= */

  function renderCard(item) {
    const canVerify =
      item.status === "MENUNGGU_VERIFIKASI" && item.selisih === 0;

    const selisihClass = item.selisih === 0 ? "selisih-ok" : "selisih-error";

    return `

      <article
        class="setoran-card"
        data-setoran-id="${escapeHtml(item.id)}"
      >

        <div class="setoran-card-top">

          <div class="setoran-user">

            <div class="setoran-avatar">
              ${escapeHtml(getInitials(item.namaPenarik))}
            </div>

            <div>

              <strong>
                ${escapeHtml(item.namaPenarik || item.userId || "Penarik")}
              </strong>

              <span>
                ${date(item.tanggalSetor)}
              </span>

            </div>

          </div>


          <span
            class="setoran-status ${statusClass(item.status)}"
          >
            ${escapeHtml(statusLabel(item.status))}
          </span>

        </div>


        <div class="setoran-card-body">

          <div class="setoran-stat">

            <span>
              Transaksi
            </span>

            <strong>
              ${number(item.jumlahTransaksi)}
            </strong>

          </div>


          <div class="setoran-stat">

            <span>
              Cash
            </span>

            <strong>
              ${rupiah(item.jumlahCash)}
            </strong>

          </div>


          <div class="setoran-stat">

            <span>
              Transfer
            </span>

            <strong>
              ${rupiah(item.jumlahTransfer)}
            </strong>

          </div>

        </div>


        <div class="setoran-total">

          <div>

            <span>
              Total Transaksi
            </span>

            <strong>
              ${rupiah(item.totalTransaksi)}
            </strong>

          </div>


          <div>

            <span>
              Total Setoran
            </span>

            <strong>
              ${rupiah(item.totalSetoran)}
            </strong>

          </div>

        </div>


        <div
          class="setoran-selisih ${selisihClass}"
        >

          <span>
            Selisih
          </span>

          <strong>
            ${rupiah(item.selisih)}
          </strong>

        </div>


        <div class="setoran-card-actions">

          <button
            type="button"
            class="setoran-button secondary"
            data-action="detail"
            data-id="${escapeHtml(item.id)}"
          >
            Detail
          </button>

          ${
            canVerify
              ? `
                <button
                  type="button"
                  class="setoran-button primary"
                  data-action="verify"
                  data-id="${escapeHtml(item.id)}"
                >
                  Verifikasi
                </button>
              `
              : ""
          }

        </div>

      </article>

    `;
  }

  /* =======================================================
     DETAIL
  ======================================================= */

  function renderDetail(item) {
    const canVerify =
      item.status === "MENUNGGU_VERIFIKASI" && item.selisih === 0;

    return `

      <div class="setoran-detail">

        <div class="setoran-detail-header">

          <div class="setoran-detail-avatar">
            ${escapeHtml(getInitials(item.namaPenarik))}
          </div>

          <div>

            <strong>
              ${escapeHtml(item.namaPenarik || item.userId || "Penarik")}
            </strong>

            <span>
              ${date(item.tanggalSetor)}
            </span>

          </div>

        </div>


        <div class="setoran-detail-status">

          <span
            class="setoran-status ${statusClass(item.status)}"
          >
            ${escapeHtml(statusLabel(item.status))}
          </span>

        </div>


        <div class="setoran-detail-grid">

          ${detailItem("Jumlah Transaksi", number(item.jumlahTransaksi))}

          ${detailItem("Cash", rupiah(item.jumlahCash))}

          ${detailItem("Transfer", rupiah(item.jumlahTransfer))}

          ${detailItem("Total Transaksi", rupiah(item.totalTransaksi))}

          ${detailItem("Total Setoran", rupiah(item.totalSetoran))}

          ${detailItem(
            "Selisih",
            rupiah(item.selisih),
            item.selisih === 0 ? "success" : "danger",
          )}

        </div>


        ${
          item.catatan
            ? `
              <div class="setoran-detail-note">

                <span>
                  Catatan
                </span>

                <p>
                  ${escapeHtml(item.catatan)}
                </p>

              </div>
            `
            : ""
        }


        ${
          item.verifiedBy
            ? `
              <div class="setoran-detail-verification">

                <span>
                  Diverifikasi oleh
                </span>

                <strong>
                  ${escapeHtml(item.verifiedBy)}
                </strong>

                ${
                  item.verifiedAt
                    ? `
                      <small>
                        ${date(item.verifiedAt)}
                      </small>
                    `
                    : ""
                }

              </div>
            `
            : ""
        }


        ${
          canVerify
            ? `
              <div class="setoran-detail-warning success">

                <strong>
                  ✓ Setoran siap diverifikasi
                </strong>

                <span>
                  Total setoran sesuai dengan total transaksi.
                </span>

              </div>
            `
            : item.status === "MENUNGGU_VERIFIKASI"
              ? `
                <div class="setoran-detail-warning danger">

                  <strong>
                    ⚠ Setoran belum dapat diverifikasi
                  </strong>

                  <span>
                    Selisih harus Rp0.
                  </span>

                </div>
              `
              : ""
        }

      </div>

    `;
  }

  function detailItem(label, value, type = "") {
    return `

      <div
        class="setoran-detail-item ${type}"
      >

        <span>
          ${escapeHtml(label)}
        </span>

        <strong>
          ${escapeHtml(value)}
        </strong>

      </div>

    `;
  }

  function getInitials(name) {
    const value = String(name || "P").trim();

    if (!value) {
      return "P";
    }

    const parts = value.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return {
    render,
    renderPenarik,
    renderList,
    renderPenarikList,
    renderDetail,
  };
})();

window.SetoranView = SetoranView;
