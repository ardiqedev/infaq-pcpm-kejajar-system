# 🧩 MODULES

---

# Module Overview

Quran Progress System (QPS) dibangun menggunakan arsitektur modular yang mengikuti **QEDEV Development Standard (QDS)**.

Setiap module hanya memiliki **satu tanggung jawab utama (Single Responsibility Principle)** sehingga mudah dikembangkan, diuji, dipelihara, dan digunakan kembali pada project lain.

---

# Module List

| Module            | Fungsi                                   |
| ----------------- | ---------------------------------------- |
| Login             | Autentikasi pengguna                     |
| Home              | Home Launcher & aktivitas guru           |
| Penilaian BTQ     | Penilaian perkembangan BTQ               |
| Penilaian Tahfidz | Penilaian hafalan dan murojaah           |
| Rekap             | Rekap harian dan bulanan                 |
| Hasil Pencapaian  | Ringkasan perkembangan dan cetak laporan |
| Target Hafalan    | Referensi target pembelajaran            |
| Profil            | Informasi akun guru                      |

---

# 1. Login Module

## Tujuan

Melakukan autentikasi guru sebelum menggunakan aplikasi.

### Tanggung Jawab

- Validasi Username
- Validasi Password
- Login
- Logout
- Membuat Session

### Tidak Bertanggung Jawab

- Mengambil data santri
- Mengambil data penilaian
- Rekap
- Target Hafalan

---

# 2. Home Module

## Tujuan

Menjadi pusat aktivitas (Home Launcher) bagi guru.

### Tanggung Jawab

- Menampilkan Nama Guru
- Menampilkan Jadwal Mengajar Hari Ini
- Menampilkan Jumlah Santri
- Menampilkan Card Menu
- Navigasi ke seluruh module

### Tidak Bertanggung Jawab

- Input Penilaian
- Rekap
- Perhitungan Progress

---

# 3. Penilaian BTQ Module

## Tujuan

Melakukan penilaian perkembangan BTQ santri.

### Tanggung Jawab

- Menampilkan daftar santri
- Search santri
- Menampilkan progress BTQ terakhir
- Membuka modal penilaian
- Validasi input
- Menyimpan penilaian BTQ

### Tidak Bertanggung Jawab

- Penilaian Tahfidz
- Rekap
- Cetak laporan

---

# 4. Penilaian Tahfidz Module

## Tujuan

Melakukan penilaian hafalan dan murojaah santri.

### Tanggung Jawab

- Menampilkan daftar santri
- Search santri
- Menampilkan progress Tahfidz terakhir
- Membuka modal penilaian
- Validasi input
- Menyimpan penilaian Tahfidz

### Tidak Bertanggung Jawab

- Penilaian BTQ
- Rekap
- Cetak laporan

---

# 5. Rekap Module

## Tujuan

Menampilkan hasil penilaian yang telah dilakukan guru.

### Tanggung Jawab

- Rekap Harian
- Rekap Bulanan
- Detail Penilaian

### Tidak Bertanggung Jawab

- Input Penilaian
- Target Hafalan
- Cetak Hasil

---

# 6. Hasil Pencapaian Module

## Tujuan

Menampilkan hasil perkembangan setiap santri.

### Tanggung Jawab

- Daftar Santri
- Detail Pencapaian
- Preview
- Cetak

### Tidak Bertanggung Jawab

- Input Nilai
- Rekap

---

# 7. Target Hafalan Module

## Tujuan

Menjadi referensi target pembelajaran guru sesuai kelas.

### Tanggung Jawab

- Menampilkan Target BTQ
- Menampilkan Target Tahfidz

### Tidak Bertanggung Jawab

- Tambah Data
- Edit Data
- Hapus Data

---

# 8. Profil Module

## Tujuan

Menampilkan informasi akun guru.

### Tanggung Jawab

- Informasi Guru
- Kelas yang Diampu
- Logout

### Tidak Bertanggung Jawab

- Manajemen User
- Edit Data Guru

---

# Hubungan Antar Module

Login

↓

Home

↓

├── Penilaian BTQ

├── Penilaian Tahfidz

├── Rekap

├── Hasil Pencapaian

├── Target Hafalan

└── Profil

---

# Dependency

| Module            | Dependency                       |
| ----------------- | -------------------------------- |
| Login             | User                             |
| Home              | Guru, Jadwal                     |
| Penilaian BTQ     | Guru, Jadwal, Santri             |
| Penilaian Tahfidz | Guru, Jadwal, Santri             |
| Rekap             | Penilaian BTQ, Penilaian Tahfidz |
| Hasil Pencapaian  | Penilaian BTQ, Penilaian Tahfidz |
| Target Hafalan    | Master Target                    |
| Profil            | Guru                             |

---

# Prioritas Pengembangan

| Module            | Prioritas  |
| ----------------- | ---------- |
| Login             | ⭐⭐⭐⭐⭐ |
| Home              | ⭐⭐⭐⭐⭐ |
| Penilaian BTQ     | ⭐⭐⭐⭐⭐ |
| Penilaian Tahfidz | ⭐⭐⭐⭐⭐ |
| Rekap             | ⭐⭐⭐     |
| Hasil Pencapaian  | ⭐⭐       |
| Target Hafalan    | ⭐         |
| Profil            | ⭐         |

---

# QEDEV Module Standard

Seluruh module pada QEDEV Framework wajib mengikuti struktur berikut:

```text
module-name/

├── module.js
│     Controller Module
│
├── module.view.js
│     Render User Interface
│
├── module.service.js
│     Akses Data / API / Spreadsheet
│
├── module.helper.js
│     Helper khusus Module
│
├── module.validator.js
│     Validasi Input
│
├── module.css
│     Style Module
│
└── module.html
      Template HTML (Opsional)
```

---

# Fungsi Setiap File

| File                | Fungsi                                  |
| ------------------- | --------------------------------------- |
| module.js           | Mengontrol seluruh alur module          |
| module.view.js      | Seluruh proses render UI                |
| module.service.js   | Komunikasi dengan backend / Apps Script |
| module.helper.js    | Fungsi bantu khusus module              |
| module.validator.js | Validasi form dan data                  |
| module.css          | Style khusus module                     |
| module.html         | Template HTML jika diperlukan           |

---

# Prinsip Module

Setiap module wajib mengikuti prinsip berikut:

- Single Responsibility Principle (SRP)
- Reusable
- Independent
- Easy Maintenance
- Easy Testing
- Mobile First
- Clean Code

Module tidak boleh berkomunikasi langsung dengan module lain.

Seluruh komunikasi data dilakukan melalui **Service Layer** sehingga setiap module tetap independen.

---

# QEDEV Notes

Blueprint module menjadi acuan utama sebelum proses development dimulai.

Apabila terdapat fitur baru yang memiliki tanggung jawab berbeda, maka fitur tersebut harus dibuat sebagai module baru, bukan ditambahkan ke module yang sudah ada.

Dengan pendekatan ini struktur aplikasi akan tetap sederhana, konsisten, scalable, dan mudah dipelihara.
