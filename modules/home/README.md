# 🏠 Home Launcher

---

# Overview

Home Launcher merupakan halaman pertama yang ditampilkan setelah guru berhasil login ke dalam Quran Progress System (QPS).

Halaman ini berfungsi sebagai **Workspace** atau pusat aktivitas guru selama proses mengajar.

Home Launcher tidak berfungsi sebagai dashboard statistik, melainkan sebagai tempat untuk memulai seluruh aktivitas utama aplikasi.

---

# Responsibilities

Module Home bertanggung jawab untuk:

- Menampilkan informasi guru.
- Menampilkan jadwal mengajar hari ini.
- Menampilkan menu aktivitas utama.
- Menampilkan menu laporan.
- Menampilkan menu referensi.

Home tidak melakukan proses perhitungan data maupun komunikasi langsung dengan API.

---

# Sections

Home Launcher terdiri dari beberapa bagian:

## 1. Greeting

Menampilkan:

- Salam
- Nama Guru
- Kalimat motivasi

---

## 2. Jadwal Mengajar

Menampilkan:

- Daftar kelas hari ini
- Jam mengajar
- Jumlah santri setiap kelas

---

## 3. Aktivitas

Berisi shortcut menuju:

- Penilaian BTQ
- Penilaian Tahfidz

---

## 4. Laporan

Berisi shortcut menuju:

- Rekap
- Hasil Pencapaian

---

## 5. Referensi

Berisi shortcut menuju:

- Target Hafalan
- Profil Guru

---

# Public API

Module menyediakan fungsi:

```javascript
Home.render();
```
