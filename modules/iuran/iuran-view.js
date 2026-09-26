/**
 * =========================================================
 * IURAN VIEW
 * IURAN PENJAGA SEKOLAH
 * =========================================================
 */

const IuranView = (() => {
  /* =======================================================
     RENDER PAGE
  ======================================================= */

  function renderPage(state = {}) {
    const anggota = state.selectedAnggota || null;

    const search = state.search || "";

    const items = Array.isArray(state.items) ? state.items : [];

    const jumlahBulan = Number(state.jumlahBulan || 1);

    const metode = state.metode || "CASH";

    const keterangan = state.keterangan || "";

    const total = anggota ? Number(state.total || 0) : 0;

    const periodeTerakhir = state.periodeTerakhir || "";

    const error = state.error || "";

    const success = state.success || "";

    const saving = Boolean(state.saving);

    const main = document.querySelector("#qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = `

      <div class="iuran-page">

        <!-- =========================================
             HEADER
        ========================================== -->

        <section class="iuran-header">

          <div>

            <div class="iuran-eyebrow">
              PEMBAYARAN IURAN
            </div>

            <h1 class="iuran-title">
              Input Iuran
            </h1>

            <p class="iuran-subtitle">
              Catat pembayaran iuran anggota.
            </p>

          </div>

        </section>


        <!-- =========================================
             PILIH ANGGOTA
        ========================================== -->

        ${
          !anggota
            ? `

              <section class="iuran-section">

                <div class="iuran-section-title">
                  Pilih Anggota
                </div>


                <div class="iuran-search">

                  <span class="iuran-search-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>

                  <input
                    type="search"
                    id="iuranSearch"
                    class="iuran-search-input"
                    placeholder="Cari nama atau nomor HP..."
                    value="${escapeHtml(search)}"
                    autocomplete="off"
                  />

                </div>


                ${
                  search
                    ? `
                      <div class="iuran-search-result-label">
                        Hasil pencarian:
                        <strong>${items.length}</strong>
                        anggota
                      </div>
                    `
                    : ""
                }


                ${
                  items.length
                    ? renderAnggotaList(items)
                    : renderEmptyAnggota(search)
                }

              </section>

            `
            : renderSelectedAnggota(anggota)
        }


        <!-- =========================================
             FORM PEMBAYARAN
        ========================================== -->

        ${
          anggota
            ? renderPaymentForm(
                anggota,
                jumlahBulan,
                total,
                periodeTerakhir,
                metode,
                keterangan,
                error,
                success,
                saving,
              )
            : ""
        }

      </div>

    `;
  }

  /* =======================================================
     LIST ANGGOTA
  ======================================================= */

  function renderAnggotaList(items = []) {
    return `

      <div class="iuran-member-list">

        ${items
          .map(
            (item) => `

          <button
            type="button"
            class="iuran-member-card"
            data-action="select-member"
            data-id="${escapeHtml(item.id)}"
          >

            <span class="iuran-member-avatar">
              ${getInitial(item.nama)}
            </span>


            <span class="iuran-member-info">

              <strong>
                ${escapeHtml(item.nama)}
              </strong>

              <small>
                ${item.noHp ? escapeHtml(item.noHp) : "Nomor HP belum diisi"}
              </small>

              <small class="iuran-member-last-payment">

                ${
                  item.terakhirDibayar
                    ? `Terakhir bayar:
                       ${IuranService.formatPeriode(item.terakhirDibayar)}`
                    : "Belum ada pembayaran"
                }

              </small>

            </span>


            <span class="iuran-member-arrow">
              <i class="fa-solid fa-chevron-right"></i>
            </span>

          </button>

        `,
          )
          .join("")}

      </div>

    `;
  }

  /* =======================================================
     EMPTY ANGGOTA
  ======================================================= */

  function renderEmptyAnggota(search = "") {
    if (search) {
      return `

        <div class="iuran-empty">

          <div class="iuran-empty-icon">
            <i class="fa-solid fa-user-slash"></i>
          </div>

          <strong>
            Anggota tidak ditemukan
          </strong>

          <span>
            Coba gunakan nama atau nomor HP lain.
          </span>

        </div>

      `;
    }

    return `

      <div class="iuran-empty">

        <div class="iuran-empty-icon">
          <i class="fa-solid fa-users"></i>
        </div>

        <strong>
          Belum ada anggota aktif
        </strong>

        <span>
          Data anggota aktif belum tersedia.
        </span>

      </div>

    `;
  }

  /* =======================================================
     SELECTED ANGGOTA
  ======================================================= */

  function renderSelectedAnggota(anggota) {
    return `

      <section class="iuran-selected-card">

        <div class="iuran-selected-top">

          <div class="iuran-member-avatar iuran-member-avatar-large">
            ${getInitial(anggota.nama)}
          </div>


          <div class="iuran-selected-info">

            <span class="iuran-selected-label">
              Anggota terpilih
            </span>

            <strong>
              ${escapeHtml(anggota.nama)}
            </strong>

            ${
              anggota.noHp
                ? `
                  <small>
                    ${escapeHtml(anggota.noHp)}
                  </small>
                `
                : ""
            }

          </div>


          <button
            type="button"
            class="iuran-change-member"
            data-action="change-member"
          >
            Ganti
          </button>

        </div>

      </section>

    `;
  }

  /* =======================================================
     FORM PEMBAYARAN
  ======================================================= */

  function renderPaymentForm(
    anggota,
    jumlahBulan,
    total,
    periodeTerakhir,
    metode,
    keterangan,
    error,
    success,
    saving,
  ) {
    const nominal = Number(anggota.iuranBulanan || 0);

    return `

      <section class="iuran-payment-card">

        <!-- =========================================
             PEMBAYARAN TERAKHIR
        ========================================== -->

        <div class="iuran-last-payment">

            <div>

                <span>
                Iuran terakhir
                </span>

                <strong>
                ${
                  anggota.terakhirDibayar
                    ? IuranService.formatPeriode(anggota.terakhirDibayar)
                    : "Belum ada pembayaran"
                }
                </strong>

            </div>

            <div class="iuran-last-payment-icon">
                <i class="fa-solid fa-calendar-check"></i>
            </div>

        </div>


        <!-- =========================================
             NOMINAL
        ========================================== -->

        <div class="iuran-info-row">

          <span>
            Iuran per bulan
          </span>

          <strong>
            ${IuranService.formatRupiah(nominal)}
          </strong>

        </div>


        <!-- =========================================
             JUMLAH BULAN
        ========================================== -->

        <div class="iuran-field">

          <label for="iuranJumlahBulan">
            Jumlah Bulan
          </label>


          <div class="iuran-month-control">

            <button
              type="button"
              class="iuran-month-button"
              data-action="minus-month"
              ${saving ? "disabled" : ""}
            >
              <i class="fa-solid fa-minus"></i>
            </button>


            <input
              type="number"
              id="iuranJumlahBulan"
              class="iuran-month-input"
              min="1"
              step="1"
              value="${jumlahBulan}"
              ${saving ? "disabled" : ""}
            />


            <button
              type="button"
              class="iuran-month-button"
              data-action="plus-month"
              ${saving ? "disabled" : ""}
            >
              <i class="fa-solid fa-plus"></i>
            </button>

          </div>

        </div>


        <!-- =========================================
             HASIL PERHITUNGAN
        ========================================== -->

        <div class="iuran-result-card">

          <div class="iuran-result-item">

            <span>
              Periode terakhir
            </span>

            <strong>
              ${
                periodeTerakhir
                  ? IuranService.formatPeriode(periodeTerakhir)
                  : "-"
              }
            </strong>

          </div>


          <div class="iuran-result-divider"></div>


          <div class="iuran-result-item">

            <span>
              Total pembayaran
            </span>

            <strong class="iuran-total">
              ${IuranService.formatRupiah(total)}
            </strong>

          </div>

        </div>


        <!-- =========================================
             METODE
        ========================================== -->

        <div class="iuran-field">

          <label>
            Metode Pembayaran
          </label>


          <div class="iuran-method-grid">

            <button
              type="button"
              class="
                iuran-method-button
                ${metode === "CASH" ? "is-active" : ""}
              "
              data-action="method"
              data-method="CASH"
              ${saving ? "disabled" : ""}
            >

              <i class="fa-solid fa-money-bill-wave"></i>

              <span>
                CASH
              </span>

            </button>


            <button
              type="button"
              class="
                iuran-method-button
                ${metode === "TRANSFER" ? "is-active" : ""}
              "
              data-action="method"
              data-method="TRANSFER"
              ${saving ? "disabled" : ""}
            >

              <i class="fa-solid fa-building-columns"></i>

              <span>
                TRANSFER
              </span>

            </button>

          </div>

        </div>


        <!-- =========================================
             KETERANGAN
        ========================================== -->

        <div class="iuran-field">

          <label for="iuranKeterangan">

            Keterangan

            <span>
              (opsional)
            </span>

          </label>


          <textarea
            id="iuranKeterangan"
            class="iuran-textarea"
            rows="3"
            placeholder="Tambahkan keterangan jika diperlukan..."
            ${saving ? "disabled" : ""}
          >${escapeHtml(keterangan)}</textarea>

        </div>


        <!-- =========================================
             ERROR
        ========================================== -->

        ${
          error
            ? `
              <div class="iuran-alert iuran-alert-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                <span>
                  ${escapeHtml(error)}
                </span>

              </div>
            `
            : ""
        }


        <!-- =========================================
             SUCCESS
        ========================================== -->

        ${
          success
            ? `
              <div class="iuran-alert iuran-alert-success">

                <i class="fa-solid fa-circle-check"></i>

                <span>
                  ${escapeHtml(success)}
                </span>

              </div>
            `
            : ""
        }


        <!-- =========================================
             SAVE
        ========================================== -->

        <button
          type="button"
          class="iuran-save-button"
          data-action="save"
          ${saving ? "disabled" : ""}
        >

          ${
            saving
              ? `
                <i class="fa-solid fa-spinner fa-spin"></i>

                <span>
                  Menyimpan...
                </span>
              `
              : `
                <i class="fa-solid fa-floppy-disk"></i>

                <span>
                  Simpan Pembayaran
                </span>
              `
          }

        </button>

      </section>

    `;
  }

  /* =======================================================
     LOADING
  ======================================================= */

  function renderLoading() {
    const main = document.querySelector("#qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = `

      <div class="iuran-page">

        <div class="iuran-loading">

          <div class="iuran-spinner"></div>

          <span>
            Memuat data anggota...
          </span>

        </div>

      </div>

    `;
  }

  /* =======================================================
     ERROR
  ======================================================= */

  function renderError(message = "Gagal memuat halaman iuran.") {
    const main = document.querySelector("#qedev-main");

    if (!main) {
      return;
    }

    main.innerHTML = `

      <div class="iuran-page">

        <div class="iuran-empty iuran-error-page">

          <div class="iuran-empty-icon">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>

          <strong>
            Terjadi kesalahan
          </strong>

          <span>
            ${escapeHtml(message)}
          </span>

          <button
            type="button"
            class="iuran-retry-button"
            data-action="retry"
          >
            Coba Lagi
          </button>

        </div>

      </div>

    `;
  }

  /* =======================================================
     HELPERS
  ======================================================= */

  function getInitial(name = "") {
    const words = String(name).trim().split(/\s+/).filter(Boolean);

    if (!words.length) {
      return "?";
    }

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return {
    renderPage,

    renderLoading,

    renderError,
  };
})();
