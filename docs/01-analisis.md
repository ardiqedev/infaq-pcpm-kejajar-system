# 📊 ANALISIS PROJECT

---

# 1. Project Overview

## Nama Project

Quran Progress System (QPS)

## Deskripsi

Quran Progress System (QPS) adalah aplikasi **Progressive Web Application (PWA)** yang dirancang untuk membantu guru melakukan penilaian harian BTQ (Baca Tulis Al-Qur'an) dan Tahfidz secara cepat, mudah, dan nyaman melalui smartphone maupun desktop.

Sistem dikembangkan menggunakan HTML, CSS, Vanilla JavaScript, Google Apps Script sebagai backend, serta Google Spreadsheet sebagai database.

QPS dibangun menggunakan **QEDEV Framework** dan mengikuti **QEDEV Development Standard (QDS)** sehingga mudah dikembangkan secara modular pada versi berikutnya.

---

# 2. Latar Belakang

Proses penilaian BTQ dan Tahfidz pada banyak TPQ, Rumah Tahfidz, Madrasah Diniyah, maupun Sekolah Islam masih dilakukan menggunakan buku penilaian atau Microsoft Excel.

Meskipun Excel cukup membantu dalam proses rekapitulasi, penggunaannya masih memiliki beberapa keterbatasan, terutama ketika digunakan oleh guru saat proses belajar mengajar berlangsung.

Beberapa kendala yang sering ditemukan antara lain:

- Sulit digunakan melalui smartphone.
- Guru harus membuka banyak sheet.
- Rekap nilai masih dilakukan secara manual.
- Sulit melihat perkembangan santri.
- Sulit mengetahui santri yang belum dinilai.
- Belum tersedia riwayat perkembangan santri secara otomatis.

Melihat kondisi tersebut diperlukan sebuah sistem yang sederhana, cepat digunakan, dan berorientasi pada aktivitas guru selama proses mengajar.

---

# 3. Permasalahan

Permasalahan utama yang ingin diselesaikan:

- Penilaian masih dilakukan secara manual.
- Guru kesulitan menggunakan file Excel melalui smartphone.
- Riwayat perkembangan santri belum tersusun otomatis.
- Guru membutuhkan waktu lama mencari data santri.
- Rekap harian dan bulanan masih dilakukan secara manual.
- Informasi perkembangan santri belum tersedia secara real-time.
- Sulit mengetahui santri yang belum dinilai pada hari tersebut.
- Belum tersedia laporan perkembangan setiap santri secara praktis.

---

# 4. Solusi

Quran Progress System menyediakan sistem penilaian berbasis web yang dapat dipasang sebagai aplikasi (PWA) pada smartphone guru.

Melalui sistem ini guru dapat:

- Login menggunakan akun masing-masing.
- Memilih menu aktivitas melalui Home Launcher.
- Melakukan penilaian BTQ.
- Melakukan penilaian Tahfidz.
- Melihat rekap harian.
- Melihat rekap bulanan.
- Melihat hasil pencapaian santri.
- Melihat target hafalan.

Seluruh progres santri dihitung secara otomatis berdasarkan histori penilaian harian.

---

# 5. Tujuan Project

Project ini bertujuan untuk:

- Mempermudah guru melakukan penilaian harian.
- Mengurangi pekerjaan administrasi guru.
- Mempercepat proses input nilai.
- Menampilkan perkembangan santri secara otomatis.
- Menyediakan laporan yang siap digunakan untuk rapor.
- Menjadi pondasi sistem akademik Al-Qur'an yang scalable.

---

# 6. Target Pengguna

## Version 1

- Guru

## Version 2

- Admin
- Kepala Sekolah

## Version 3

- Orang Tua
- Yayasan

---

# 7. Ruang Lingkup (Scope)

## Version 1

Meliputi:

- Login Guru
- Home Launcher
- Penilaian BTQ
- Penilaian Tahfidz
- Rekap Harian
- Rekap Bulanan
- Hasil Pencapaian
- Target Hafalan (Read Only)
- Profil Guru

Belum meliputi:

- Master Santri
- Master Guru
- Master Kelas
- Manajemen User
- Dashboard Kepala Sekolah
- Portal Orang Tua
- Absensi
- Rapor Digital
- WhatsApp Gateway
- Multi Sekolah

---

# 8. Konsep Sistem

Quran Progress System dibangun menggunakan konsep:

## Workspace First

Guru tidak langsung diarahkan ke dashboard statistik.

Setelah login, guru masuk ke halaman **Home Launcher** yang berisi kumpulan menu aktivitas utama dalam bentuk card sehingga guru dapat langsung memilih pekerjaan yang akan dilakukan.

Home berfungsi sebagai pusat aktivitas, bukan halaman laporan.

Menu utama:

- Penilaian BTQ
- Penilaian Tahfidz
- Rekap
- Hasil Pencapaian
- Target Hafalan
- Profil

---

# 9. Konsep Data

Seluruh data sistem berasal dari aktivitas penilaian harian.

Alur data:

Penilaian Harian

↓

Riwayat Penilaian

↓

Progress Santri

↓

Rekap Harian

↓

Rekap Bulanan

↓

Hasil Pencapaian

↓

Rapor Digital (Versi Berikutnya)

Dengan konsep ini seluruh laporan berasal dari satu sumber data sehingga data tetap konsisten, akurat, dan mudah dikembangkan.

---

# 10. Prinsip Pengembangan

Project dikembangkan menggunakan:

## QEDEV Development Standard (QDS)

Prinsip utama:

- Mobile First
- Progressive Web App (PWA)
- Responsive Design
- Workspace First
- Home Launcher
- Card Based Navigation
- Modular Architecture
- Reusable Component
- Clean Code
- Scalable System
- Single Responsibility Principle (SRP)

---

# 11. Target Pengembangan

## Version 2

- Admin Panel
- Master Santri
- Master Guru
- Master Kelas
- Master Target
- Dashboard Kepala Sekolah
- Export Excel
- Export PDF

## Version 3

- Portal Orang Tua
- Rapor Digital
- Grafik Perkembangan
- WhatsApp Gateway
- Multi Sekolah
- Multi TPQ

---

# 12. Success Indicator

Project dianggap berhasil apabila:

- Guru dapat melakukan penilaian kurang dari 15 detik per santri.
- Guru nyaman menggunakan aplikasi melalui smartphone.
- Seluruh perkembangan santri diperbarui secara otomatis.
- Rekap harian dan bulanan dihasilkan otomatis.
- Hasil pencapaian dapat dicetak kapan saja.
- Aplikasi dapat dipasang pada Home Screen (PWA).
- Struktur aplikasi tetap modular dan mudah dikembangkan.

---

# 13. Project Philosophy

> "Build once, scale forever."

Quran Progress System dibangun menggunakan QEDEV Framework dengan arsitektur modular sehingga setiap fitur baru dapat ditambahkan sebagai module tanpa mengubah struktur inti aplikasi.

---

# 14. Product Philosophy

> "Simple for Teachers, Powerful for Schools."

Guru cukup fokus mengajar dan memberikan penilaian.

Seluruh proses perhitungan progres, rekapitulasi, laporan, hingga hasil pencapaian dikelola secara otomatis oleh sistem sehingga sekolah memperoleh data yang akurat, cepat, dan siap digunakan.

---

# 15. QEDEV Notes

Blueprint merupakan sumber utama pengembangan project.

Seluruh perubahan kebutuhan sistem harus diperbarui terlebih dahulu pada dokumen Blueprint sebelum dilakukan implementasi ke dalam kode.

Prinsip ini diterapkan untuk menjaga konsistensi arsitektur, mengurangi refactoring, serta memastikan seluruh proses development mengikuti QEDEV Development Standard (QDS).

---

# 16. Future Vision

Quran Progress System tidak hanya dirancang sebagai aplikasi penilaian BTQ dan Tahfidz.

Ke depannya sistem ini diharapkan berkembang menjadi platform pembelajaran Al-Qur'an yang mampu mengelola seluruh aktivitas pendidikan, mulai dari penilaian harian, perkembangan santri, rapor digital, hingga portal orang tua dalam satu ekosistem yang terintegrasi.
