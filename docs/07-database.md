# 🗄️ DATABASE

---

# Database Overview

Quran Progress System (QPS) menggunakan **Google Spreadsheet** sebagai database utama pada Version 1.

Database dirancang menggunakan konsep:

**Master Data → Progress Data → Transaction Data → System Data**

dengan tujuan:

- Mempercepat proses pembacaan data (GET)
- Menyimpan histori lengkap transaksi
- Mengurangi beban pencarian pada data transaksi
- Memudahkan migrasi ke MySQL, PostgreSQL, maupun Firestore pada versi berikutnya

Progress Data berfungsi sebagai **Snapshot** yang selalu menyimpan perkembangan terakhir setiap siswa, sedangkan Transaction Data berfungsi sebagai **History** seluruh aktivitas penilaian.

---

# Database Principles

Database dibangun berdasarkan prinsip berikut:

- Simple
- Consistent
- Modular
- Scalable
- Snapshot First Architecture
- Single Source of Truth
- Normalisasi Data
- Menghindari Duplikasi Data
- Read Fast, Write Once

---

# Struktur Database

```text
Database

│

├── user

├── pengaturan

│

├── master_guru

├── master_kelas

├── master_siswa

├── master_jadwal

├── master_target_btq

├── master_target_tahfidz

│

├── progress_btq

├── progress_tahfidz

│

├── transaksi_btq

└── transaksi_tahfidz
```

---

# Daftar Sheet

## System Data

| Sheet      | Fungsi               |
| ---------- | -------------------- |
| user       | Login pengguna       |
| pengaturan | Konfigurasi aplikasi |

---

## Master Data

| Sheet                 | Fungsi                      |
| --------------------- | --------------------------- |
| master_guru           | Data guru                   |
| master_kelas          | Data kelas                  |
| master_siswa          | Data siswa                  |
| master_jadwal         | Jadwal mengajar             |
| master_target_btq     | Target BTQ setiap kelas     |
| master_target_tahfidz | Target Tahfidz setiap kelas |

---

## Progress Data (Snapshot)

| Sheet            | Fungsi                                 |
| ---------------- | -------------------------------------- |
| progress_btq     | Progress BTQ terakhir setiap siswa     |
| progress_tahfidz | Progress Tahfidz terakhir setiap siswa |

---

## Transaction Data (History)

| Sheet             | Fungsi                            |
| ----------------- | --------------------------------- |
| transaksi_btq     | Riwayat seluruh penilaian BTQ     |
| transaksi_tahfidz | Riwayat seluruh penilaian Tahfidz |

---

# Struktur Kolom

## user

- Username
- Password
- IdGuru
- Role
- Status
- CreatedAt
- UpdatedAt

---

## pengaturan

- NamaSekolah
- Logo
- Alamat
- SemesterAktif
- TahunAjaran
- CreatedAt
- UpdatedAt

---

## master_guru

- IdGuru
- NamaGuru
- Username
- NomorHP
- Status
- CreatedAt
- UpdatedAt

---

## master_kelas

- IdKelas
- NamaKelas
- Tingkat
- Status
- CreatedAt
- UpdatedAt

---

## master_siswa

- IdSiswa
- NIS
- NISN
- NamaSiswa
- JenisKelamin
- IdKelas
- Status
- CreatedAt
- UpdatedAt

---

## master_jadwal

- IdJadwal
- Hari
- JamMulai
- JamSelesai
- IdGuru
- IdKelas
- Status
- CreatedAt
- UpdatedAt

---

## master_target_btq

- IdTargetBTQ
- IdKelas
- Semester
- TargetQiraat
- TargetHalaman
- Keterangan
- CreatedAt
- UpdatedAt

---

## master_target_tahfidz

- IdTargetTahfidz
- IdKelas
- Semester
- TargetJuz
- TargetSurah
- TargetAyat
- Keterangan
- CreatedAt
- UpdatedAt

---

## progress_btq

- IdProgressBTQ
- IdSiswa
- IdGuruTerakhir
- IdKelas
- QiraatTerakhir
- HalamanTerakhir
- FashohahTerakhir
- TajwidTerakhir
- WazanTerakhir
- TanggalTerakhir
- TotalPenilaian
- IdTransaksiTerakhir
- CreatedAt
- UpdatedAt

---

## progress_tahfidz

- IdProgressTahfidz
- IdSiswa
- IdGuruTerakhir
- IdKelas
- SurahTerakhir
- AyatTerakhir
- FashohahTerakhir
- TajwidTerakhir
- WazanTerakhir
- TanggalTerakhir
- TotalSetoran
- IdTransaksiTerakhir
- CreatedAt
- UpdatedAt

---

## transaksi_btq

- IdBTQ
- Tanggal
- IdGuru
- IdKelas
- IdSiswa
- Qiraat
- Halaman
- Fashohah
- Tajwid
- Wazan
- Catatan
- CreatedAt
- UpdatedAt

---

## transaksi_tahfidz

- IdTahfidz
- Tanggal
- IdGuru
- IdKelas
- IdSiswa
- Surah
- Ayat
- Fashohah
- Tajwid
- Wazan
- Catatan
- CreatedAt
- UpdatedAt

---

# Database Relationship

```text
Master Guru
        │
        ▼
Master Jadwal
        │
        ▼
Master Kelas
        │
        ▼
Master Siswa
        │
        ▼
Input Penilaian
        │
        ▼
Transaksi
        │
        ├─────────────► History
        │
        ▼
Update Progress
        │
        ▼
Frontend
        │
        ▼
Rekap
        │
        ▼
Hasil Pencapaian
        │
        ▼
Rapor
```

---

# Primary Key

| Sheet                 | Primary Key       |
| --------------------- | ----------------- |
| user                  | Username          |
| master_guru           | IdGuru            |
| master_kelas          | IdKelas           |
| master_siswa          | IdSiswa           |
| master_jadwal         | IdJadwal          |
| master_target_btq     | IdTargetBTQ       |
| master_target_tahfidz | IdTargetTahfidz   |
| progress_btq          | IdProgressBTQ     |
| progress_tahfidz      | IdProgressTahfidz |
| transaksi_btq         | IdBTQ             |
| transaksi_tahfidz     | IdTahfidz         |

---

# Foreign Key

| Sheet                 | Foreign Key                                           |
| --------------------- | ----------------------------------------------------- |
| user                  | IdGuru                                                |
| master_siswa          | IdKelas                                               |
| master_jadwal         | IdGuru, IdKelas                                       |
| master_target_btq     | IdKelas                                               |
| master_target_tahfidz | IdKelas                                               |
| progress_btq          | IdSiswa, IdGuruTerakhir, IdKelas, IdTransaksiTerakhir |
| progress_tahfidz      | IdSiswa, IdGuruTerakhir, IdKelas, IdTransaksiTerakhir |
| transaksi_btq         | IdGuru, IdKelas, IdSiswa                              |
| transaksi_tahfidz     | IdGuru, IdKelas, IdSiswa                              |

---

# Naming Standard

## System Data

```
user
pengaturan
```

---

## Master Data

```
master_
```

Contoh:

```
master_guru
master_siswa
master_kelas
```

---

## Progress Data

```
progress_
```

Contoh:

```
progress_btq
progress_tahfidz
```

---

## Transaction Data

```
transaksi_
```

Contoh:

```
transaksi_btq
transaksi_tahfidz
```

---

# ID Standard

| Data             | Format     |
| ---------------- | ---------- |
| Guru             | GR000001   |
| Kelas            | KLS000001  |
| Siswa            | SIS000001  |
| Jadwal           | JDW000001  |
| Target BTQ       | TBTQ000001 |
| Target Tahfidz   | TTHF000001 |
| Progress BTQ     | PBTQ000001 |
| Progress Tahfidz | PTHF000001 |
| BTQ              | BTQ000001  |
| Tahfidz          | THF000001  |

---

# Data Flow

```text
Master Data
      │
      ▼
Input Penilaian
      │
      ▼
Simpan Transaksi (History)
      │
      ▼
Update Progress (Snapshot)
      │
      ▼
Frontend (GET)
      │
      ▼
Rekap Harian
      │
      ▼
Rekap Bulanan
      │
      ▼
Hasil Pencapaian
      │
      ▼
Rapor (Versi Berikutnya)
```

---

# Future Database

Version 1

- Google Spreadsheet

Version 2

- MySQL
- PostgreSQL
- Firestore

Tanpa mengubah struktur bisnis maupun alur data utama.

---

# QEDEV Notes

Quran Progress System menggunakan konsep **Snapshot + History Architecture**.

Setiap proses penilaian menghasilkan dua proses backend:

1. Menambahkan data ke **transaksi** sebagai histori permanen.
2. Memperbarui data pada **progress** sebagai snapshot perkembangan terbaru.

Dengan pendekatan ini:

- GET selalu membaca tabel **progress** sehingga proses pencarian, filter, dan daftar siswa tetap cepat meskipun histori transaksi terus bertambah.
- POST hanya melakukan satu kali penyimpanan histori dan satu kali pembaruan snapshot.
- Seluruh histori tetap tersedia sebagai dasar rekap, audit, laporan, dan pengembangan fitur berikutnya.

Arsitektur ini dirancang mengikuti **QEDEV Development Standard (QDS)** sehingga tetap sederhana, modular, scalable, dan siap digunakan pada Google Spreadsheet maupun database relasional di masa depan.
