# 📐 WIREFRAME

---

# Wireframe Overview

Wireframe merupakan rancangan struktur antarmuka (UI) sebelum proses desain visual dimulai.

Dokumen ini menjelaskan:

- Tujuan setiap halaman
- Komponen yang harus tersedia
- Tata letak (Layout)
- Interaksi pengguna
- Output yang dihasilkan

Wireframe menjadi acuan utama sebelum memasuki tahap Design System dan Frontend Development.

---

# 1. Login

## Purpose

Autentikasi Guru

---

## Components

- Logo Sekolah
- Nama Aplikasi
- Username
- Password
- Tombol Login

---

## Layout

```
+----------------------------------+

          LOGO SEKOLAH

     Quran Progress System

------------------------------------

Username

[______________________]

Password

[______________________]

[ LOGIN ]

+----------------------------------+
```

---

# 2. Home

## Purpose

Home Launcher

---

## Components

- Greeting
- Nama Guru
- Jadwal Mengajar Hari Ini
- Card Menu
- Bottom Navigation

---

## Layout

```
+----------------------------------+

Assalamu'alaikum

Ust. Ahmad 👋

------------------------------------

📅 Jadwal Mengajar Hari Ini

08.00 • Kelas A • 25 Santri

10.00 • Kelas C • 18 Santri

------------------------------------

🟩 Penilaian BTQ

🟦 Penilaian Tahfidz

🟨 Rekap

🟪 Hasil Pencapaian

🟥 Target Hafalan

🟩 Profil

------------------------------------

Bottom Navigation

Home

Profil

+----------------------------------+
```

---

# 3. Penilaian BTQ

## Purpose

Input perkembangan BTQ

---

## Components

- Header
- Search
- Card Santri
- Modal Penilaian
- Toast

---

## Layout

```
+----------------------------------+

← Penilaian BTQ

------------------------------------

🔍 Search

[____________________]

------------------------------------

👤 Ahmad

Iqro 4

Halaman 18

[ NILAI ]

------------------------------------

👤 Fatimah

Iqro 5

Halaman 22

[ NILAI ]

------------------------------------

```

---

## Modal Penilaian BTQ

```
+----------------------------------+

Ahmad

------------------------------------

Qira'at

[__________]

Halaman

[__________]

Fashohah

★★★★★

Tajwid

★★★★★

Wazan

★★★★★

Catatan

[________________]

------------------------------------

[ SIMPAN ]

+----------------------------------+
```

---

# 4. Penilaian Tahfidz

## Purpose

Input hafalan dan murojaah

---

## Components

- Header
- Search
- Card Santri
- Modal Penilaian

---

## Layout

```
+----------------------------------+

← Penilaian Tahfidz

------------------------------------

🔍 Search

------------------------------------

👤 Ahmad

An-Naba

Ayat 18

[ NILAI ]

------------------------------------

👤 Fatimah

An-Naziat

Ayat 20

[ NILAI ]

```

---

## Modal Penilaian Tahfidz

```
+----------------------------------+

Ahmad

------------------------------------

Surah

[__________]

Ayat

[__________]

Fashohah

★★★★★

Tajwid

★★★★★

Wazan

★★★★★

Catatan

[________________]

------------------------------------

[ SIMPAN ]

+----------------------------------+
```

---

# 5. Rekap

## Purpose

Melihat aktivitas penilaian

---

## Components

- Header
- Tab Harian
- Tab Bulanan
- Ringkasan
- Daftar Penilaian

---

## Layout

```
+----------------------------------+

← Rekap

------------------------------------

[ Harian ]

[ Bulanan ]

------------------------------------

25 Santri

20 Sudah Dinilai

5 Belum

------------------------------------

Daftar Penilaian

+----------------------------------+
```

---

# 6. Hasil Pencapaian

## Purpose

Melihat dan mencetak perkembangan santri

---

## Components

- Search
- Card Santri
- Detail
- Tombol Cetak

---

## Layout

```
+----------------------------------+

🔍 Search

------------------------------------

👤 Ahmad

Iqro 4

An-Naba

[Lihat]

------------------------------------

👤 Fatimah

Iqro 5

An-Naziat

[Lihat]

```

---

## Detail

```
Nama

Ahmad

----------------------------

BTQ

Iqro 4

Halaman 35

----------------------------

Tahfidz

An-Naba

Ayat 40

----------------------------

[ CETAK ]
```

---

# 7. Target Hafalan

## Purpose

Referensi Target Pembelajaran

---

## Components

- Header
- Target BTQ
- Target Tahfidz

---

## Layout

```
+----------------------------------+

🎯 Target Hafalan

------------------------------------

BTQ

Target Semester

Iqro 4 Selesai

------------------------------------

Tahfidz

Target Semester

Juz 30

An-Naba

↓

An-Nas

+----------------------------------+
```

---

# 8. Profil

## Purpose

Informasi Guru

---

## Components

- Foto Guru
- Nama
- Username
- Kelas Diampu
- Logout

---

## Layout

```
+----------------------------------+

👤

Ust. Ahmad

------------------------------------

Username

ahmad01

------------------------------------

Kelas Diampu

A

C

------------------------------------

[ Logout ]

+----------------------------------+
```

---

# Wireframe Principles

Setiap halaman harus memenuhi prinsip berikut:

- Mobile First
- Workspace First
- Simple Navigation
- Card Based Layout
- Teacher Friendly
- One Hand Operation
- Progressive Web App Ready

---

# QEDEV Notes

Wireframe hanya menjelaskan struktur antarmuka.

Warna, typography, icon, spacing, shadow, radius, dan visual style tidak dibahas pada dokumen ini karena akan dijelaskan pada **06-design-system.md**.

Seluruh wireframe harus mengacu pada:

- User Flow
- Sitemap
- Modules

sehingga seluruh proses development tetap konsisten dan minim refactoring.
