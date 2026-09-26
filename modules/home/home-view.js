/* =========================================================
   HOME VIEW
   IURAN PENJAGA SEKOLAH
   ========================================================= */

const HomeView = (() => {
  /* =======================================================
     RENDER
     ======================================================= */

  function render(data = {}) {
    const role = data.role || Auth.getRole();

    if (role === CONFIG.ROLE.ADMIN) {
      return renderAdmin(data);
    }

    if (role === CONFIG.ROLE.PENARIK) {
      return renderPenarik(data);
    }

    return renderEmpty();
  }

  /* =======================================================
     ADMIN
     ======================================================= */

  function renderAdmin(data = {}) {
    const user = data.user || Auth.getUser() || {};

    const dashboard = data.dashboard || {};

    const nama = user.NAMA || "Administrator";

    const saldo = dashboard.saldo ?? dashboard.balance ?? 0;

    const pemasukan = dashboard.pemasukan ?? dashboard.totalPemasukan ?? 0;

    const pengeluaran =
      dashboard.pengeluaran ?? dashboard.totalPengeluaran ?? 0;

    const setoranMenunggu =
      dashboard.setoranMenunggu ?? dashboard.pendingSetoran ?? 0;

    const pengeluaranBulanIni =
      dashboard.pengeluaranBulanIni ?? pengeluaran ?? 0;

    const setoranList =
      dashboard.setoranList || dashboard.pendingSetoranList || [];

    const aktivitas = dashboard.aktivitas || dashboard.recentActivities || [];

    return `

      <div class="home-page home-page-admin">


        <!-- =============================================
             GREETING
             ============================================= -->

        <section class="home-greeting">

          <div>

            <div class="home-greeting-label">
              Selamat datang
            </div>

            <h1 class="home-greeting-name">
              ${escapeHtml(nama)}
            </h1>

            <p class="home-greeting-description">
              Kelola iuran dan keuangan sekolah hari ini.
            </p>

          </div>

        </section>


        <!-- =============================================
             SALDO CARD
             ============================================= -->

        <section class="home-balance-card">

          <div class="home-balance-label">
            Saldo Kas
          </div>

          <div class="home-balance-value">
            ${formatRupiah(saldo)}
          </div>


          <div class="home-balance-divider"></div>


          <div class="home-balance-summary">

            <div class="home-balance-item">

              <span>
                Pemasukan
              </span>

              <strong>
                ${formatRupiah(pemasukan)}
              </strong>

            </div>


            <div class="home-balance-item">

              <span>
                Pengeluaran
              </span>

              <strong>
                ${formatRupiah(pengeluaran)}
              </strong>

            </div>

          </div>

        </section>


        <!-- =============================================
             SUMMARY
             ============================================= -->

        <section class="home-summary-grid">


          <div class="home-summary-card">

            <div class="home-summary-icon home-summary-icon-warning">

              <i class="fa-solid fa-money-bill-transfer"></i>

            </div>

            <div class="home-summary-content">

              <span>
                Setoran Menunggu
              </span>

              <strong>
                ${formatNumber(setoranMenunggu)}
              </strong>

            </div>

          </div>


          <div class="home-summary-card">

            <div class="home-summary-icon home-summary-icon-danger">

              <i class="fa-solid fa-wallet"></i>

            </div>

            <div class="home-summary-content">

              <span>
                Pengeluaran Bulan Ini
              </span>

              <strong>
                ${formatRupiah(pengeluaranBulanIni)}
              </strong>

            </div>

          </div>


        </section>


        <!-- =============================================
             PENDING SETORAN
             ============================================= -->

        <section class="home-section">

          <div class="home-section-header">

            <div>

              <h2 class="home-section-title">
                Setoran Menunggu Verifikasi
              </h2>

              <p class="home-section-subtitle">
                Setoran yang perlu diperiksa.
              </p>

            </div>


            ${
              setoranList.length
                ? `
                  <button
                    type="button"
                    class="home-section-link"
                    data-home-action="setoran"
                  >
                    Lihat Semua
                  </button>
                `
                : ""
            }

          </div>


          ${
            setoranList.length
              ? renderSetoranList(setoranList)
              : renderEmptySetoran()
          }

        </section>


        <!-- =============================================
             AKTIVITAS
             ============================================= -->

        <section class="home-section">

          <div class="home-section-header">

            <div>

              <h2 class="home-section-title">
                Aktivitas Terbaru
              </h2>

              <p class="home-section-subtitle">
                Aktivitas terbaru dalam sistem.
              </p>

            </div>

          </div>


          ${
            aktivitas.length
              ? renderAktivitas(aktivitas)
              : renderEmptyAktivitas()
          }

        </section>


      </div>

    `;
  }

  /* =======================================================
     PENARIK
     ======================================================= */

  /* =======================================================
   PENARIK
   ======================================================= */

  function renderPenarik(data = {}) {
    const user = data.user || Auth.getUser() || {};
    const dashboard = data.dashboard || {};

    const nama = user.NAMA || "Penarik Iuran";

    const totalIuran = dashboard.totalIuran ?? dashboard.pemasukan ?? 0;

    const transaksiBulanIni =
      dashboard.transaksiBulanIni ?? dashboard.totalTransaksi ?? 0;

    const setoranMenunggu =
      dashboard.setoranMenunggu ?? dashboard.pendingSetoran ?? 0;

    const transaksiTerbaru =
      dashboard.transaksiTerbaru || dashboard.recentTransactions || [];

    return `

    <div class="home-page home-page-penarik">

      <!-- =============================================
           GREETING
           ============================================= -->

      <section class="home-greeting">

        <div>

          <div class="home-greeting-label">
            Selamat datang
          </div>

          <h1 class="home-greeting-name">
            ${escapeHtml(nama)}
          </h1>

          <p class="home-greeting-description">
            Kelola pembayaran iuran anggota hari ini.
          </p>

        </div>

      </section>


                <!-- =============================================
              SALDO IURAN
              ============================================= -->

          <section class="home-income-card">

            <div class="home-income-top">

              <div>

                <div class="home-income-label">
                  Saldo Iuran
                </div>

                <div class="home-income-value">
                  ${formatRupiah(totalIuran)}
                </div>

              </div>

              <div class="home-income-icon">
                <i class="fa-solid fa-hand-holding-heart"></i>
              </div>

            </div>

            <div class="home-income-period">
              Total iuran yang belum disetor
            </div>

          </section>


      <!-- =============================================
           SUMMARY
           ============================================= -->

      <section class="home-summary-grid">

        <!-- TRANSAKSI -->

        <div class="home-summary-card">

          <div class="home-summary-icon home-summary-icon-primary">
            <i class="fa-solid fa-receipt"></i>
          </div>

          <div class="home-summary-content">

            <span>
              Transaksi
            </span>

            <strong>
              ${formatNumber(transaksiBulanIni)}
            </strong>

          </div>

        </div>


        <!-- SETORAN -->

        <div class="home-summary-card">

          <div class="home-summary-icon home-summary-icon-warning">
            <i class="fa-solid fa-money-bill-transfer"></i>
          </div>

          <div class="home-summary-content">

            <span>
              Setoran Menunggu
            </span>

            <strong>
              ${formatNumber(setoranMenunggu)}
            </strong>

          </div>

        </div>

      </section>


      <!-- =============================================
           AKSI CEPAT
           ============================================= -->

      <section class="home-section">

        <div class="home-section-header">

          <div>

            <h2 class="home-section-title">
              Aksi Cepat
            </h2>

            <p class="home-section-subtitle">
              Akses pekerjaan utama dengan cepat.
            </p>

          </div>

        </div>


        <div class="home-action-grid">

          <!-- INPUT IURAN -->

          <button
            type="button"
            class="home-action-card home-action-primary"
            data-home-action="iuran"
          >

            <span class="home-action-icon">
              <i class="fa-solid fa-plus"></i>
            </span>

            <span class="home-action-title">
              Input Iuran
            </span>

            <span class="home-action-description">
              Catat pembayaran anggota
            </span>

          </button>


          <!-- TRANSAKSI -->

          <button
            type="button"
            class="home-action-card home-action-secondary"
            data-home-action="transaksi"
          >

            <span class="home-action-icon">
              <i class="fa-solid fa-receipt"></i>
            </span>

            <span class="home-action-title">
              Transaksi
            </span>

            <span class="home-action-description">
              Lihat riwayat pembayaran
            </span>

          </button>


          <!-- SETORAN -->

          <button
            type="button"
            class="home-action-card home-action-secondary"
            data-home-action="setoran"
          >

            <span class="home-action-icon">
              <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </span>

            <span class="home-action-title">
              Buat Setoran
            </span>

            <span class="home-action-description">
              Setorkan transaksi terkumpul
            </span>

          </button>

        </div>

      </section>


      <!-- =============================================
           TRANSAKSI TERBARU
           ============================================= -->

      <section class="home-section">

        <div class="home-section-header">

          <div>

            <h2 class="home-section-title">
              Transaksi Terbaru
            </h2>

            <p class="home-section-subtitle">
              Pembayaran yang baru dicatat.
            </p>

          </div>


          ${
            transaksiTerbaru.length
              ? `
                <button
                  type="button"
                  class="home-section-link"
                  data-home-action="transaksi"
                >
                  Lihat Semua
                </button>
              `
              : ""
          }

        </div>


        ${
          transaksiTerbaru.length
            ? renderTransaksiList(transaksiTerbaru)
            : renderEmptyTransaksi()
        }

      </section>


    </div>

  `;
  }

  /* =======================================================
     SETORAN LIST
     ======================================================= */

  function renderSetoranList(list = []) {
    return `
      <div class="home-list">

        ${list
          .slice(0, 5)
          .map((item) => {
            const nama = item.NAMA || item.nama || item.NAMA_USER || "Penarik";

            const total =
              item.TOTAL_SETORAN ?? item.TOTAL_TRANSAKSI ?? item.total ?? 0;

            const jumlah = item.JUMLAH_TRANSAKSI ?? item.jumlahTransaksi ?? 0;

            return `

              <div class="home-list-item">

                <div class="home-list-leading">

                  <div class="home-list-avatar">
                    ${escapeHtml(getInitials(nama))}
                  </div>

                </div>


                <div class="home-list-main">

                  <div class="home-list-title">
                    ${escapeHtml(nama)}
                  </div>

                  <div class="home-list-meta">
                    ${formatNumber(jumlah)}
                    transaksi
                  </div>

                </div>


                <div class="home-list-trailing">

                  <strong>
                    ${formatRupiah(total)}
                  </strong>

                  <span class="home-status home-status-warning">
                    Menunggu
                  </span>

                </div>

              </div>

            `;
          })
          .join("")}

      </div>
    `;
  }

  /* =======================================================
     TRANSAKSI LIST
     ======================================================= */

  function renderTransaksiList(list = []) {
    return `
      <div class="home-list">

        ${list
          .slice(0, 5)
          .map((item) => {
            const nama =
              item.NAMA_ANGGOTA || item.NAMA || item.nama || "Anggota";

            const total = item.TOTAL ?? item.total ?? 0;

            const bulan = item.JUMLAH_BULAN ?? item.jumlahBulan ?? 0;

            const metode = item.METODE || item.metode || "-";

            return `

              <div class="home-list-item">

                <div class="home-list-leading">

                  <div class="home-list-avatar">
                    ${escapeHtml(getInitials(nama))}
                  </div>

                </div>


                <div class="home-list-main">

                  <div class="home-list-title">
                    ${escapeHtml(nama)}
                  </div>

                  <div class="home-list-meta">

                    ${formatNumber(bulan)}
                    bulan

                    <span class="home-meta-dot">
                      •
                    </span>

                    ${escapeHtml(metode)}

                  </div>

                </div>


                <div class="home-list-trailing">

                  <strong>
                    ${formatRupiah(total)}
                  </strong>

                </div>

              </div>

            `;
          })
          .join("")}

      </div>
    `;
  }

  /* =======================================================
     AKTIVITAS
     ======================================================= */

  function renderAktivitas(list = []) {
    return `
      <div class="home-activity-list">

        ${list
          .slice(0, 5)
          .map((item) => {
            const title = item.title || item.TITLE || item.judul || "Aktivitas";

            const description =
              item.description || item.DESCRIPTION || item.keterangan || "";

            const icon = item.icon || "fa-solid fa-circle-check";

            return `

              <div class="home-activity-item">

                <div class="home-activity-icon">

                  <i class="${escapeHtml(icon)}"></i>

                </div>


                <div class="home-activity-content">

                  <div class="home-activity-title">
                    ${escapeHtml(title)}
                  </div>

                  <div class="home-activity-description">
                    ${escapeHtml(description)}
                  </div>

                </div>

              </div>

            `;
          })
          .join("")}

      </div>
    `;
  }

  /* =======================================================
     EMPTY SETORAN
     ======================================================= */

  function renderEmptySetoran() {
    return `
      <div class="home-empty">

        <div class="home-empty-icon">
          <i class="fa-solid fa-circle-check"></i>
        </div>

        <div class="home-empty-title">
          Tidak ada setoran menunggu
        </div>

        <div class="home-empty-description">
          Semua setoran sudah diproses.
        </div>

      </div>
    `;
  }

  /* =======================================================
     EMPTY TRANSAKSI
     ======================================================= */

  function renderEmptyTransaksi() {
    return `
      <div class="home-empty">

        <div class="home-empty-icon">
          <i class="fa-solid fa-receipt"></i>
        </div>

        <div class="home-empty-title">
          Belum ada transaksi
        </div>

        <div class="home-empty-description">
          Transaksi iuran yang baru dicatat akan muncul di sini.
        </div>

      </div>
    `;
  }

  /* =======================================================
     EMPTY AKTIVITAS
     ======================================================= */

  function renderEmptyAktivitas() {
    return `
      <div class="home-empty">

        <div class="home-empty-icon">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </div>

        <div class="home-empty-title">
          Belum ada aktivitas
        </div>

        <div class="home-empty-description">
          Aktivitas terbaru akan muncul di sini.
        </div>

      </div>
    `;
  }

  /* =======================================================
     EMPTY ROLE
     ======================================================= */

  function renderEmpty() {
    return `
      <div class="home-empty-page">

        <div class="home-empty-icon">
          <i class="fa-solid fa-house"></i>
        </div>

        <h2>
          Dashboard tidak tersedia
        </h2>

        <p>
          Role pengguna tidak dikenali.
        </p>

      </div>
    `;
  }

  /* =======================================================
     FORMAT RUPIAH
     ======================================================= */

  function formatRupiah(value) {
    const number = Number(value) || 0;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  /* =======================================================
     FORMAT NUMBER
     ======================================================= */

  function formatNumber(value) {
    return new Intl.NumberFormat("id-ID").format(Number(value) || 0);
  }

  /* =======================================================
     INITIALS
     ======================================================= */

  function getInitials(name) {
    const words = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) {
      return "U";
    }

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  /* =======================================================
     ESCAPE HTML
     ======================================================= */

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  return Object.freeze({
    render,
  });
})();

/* =========================================================
   GLOBAL
   ========================================================= */

window.HomeView = HomeView;
