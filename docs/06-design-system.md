# 🎨 DESIGN SYSTEM

---

# Design Overview

Design System merupakan standar desain yang digunakan pada seluruh halaman Quran Progress System (QPS).

Dokumen ini menjadi acuan dalam membangun antarmuka yang konsisten, sederhana, nyaman digunakan, dan mudah dikembangkan.

---

# Design Philosophy

Quran Progress System dibangun dengan filosofi:

- Mobile First
- Workspace First
- Teacher Friendly
- Simple Interaction
- Card Based Layout
- Clean Interface
- Consistent Design
- Progressive Web App (PWA)

---

# Design Principles

Setiap halaman harus memiliki prinsip berikut:

- Mudah dipahami
- Mudah digunakan
- Mudah dipelajari
- Fokus pada aktivitas utama
- Mengurangi jumlah klik
- Konsisten antar halaman

---

# Color System

## Primary

Hijau Muhammadiyah

Digunakan untuk:

- Button Primary
- Active Menu
- Success
- Highlight

---

## Secondary

Biru

Digunakan untuk:

- Tahfidz
- Informasi

---

## Warning

Kuning

Digunakan untuk:

- Rekap
- Peringatan

---

## Danger

Merah

Digunakan untuk:

- Error
- Logout

---

## Neutral

Abu-abu

Digunakan untuk:

- Background
- Border
- Text Secondary

---

# Typography

## Heading

Bold

Ukuran besar

---

## Sub Heading

Semi Bold

---

## Body

Regular

---

## Caption

Ukuran kecil

Digunakan pada:

- Jadwal
- Informasi tambahan
- Catatan

---

# Layout

Semua halaman menggunakan:

- Container
- Section
- Card
- List

---

# Grid System

Mobile

2 Card

Desktop

3–4 Card

---

# Card Standard

Setiap Card terdiri dari:

- Icon
- Judul
- Deskripsi
- Action

---

# Button Standard

Primary

Secondary

Outline

Text

Icon Button

---

# Form Standard

Komponen:

- Input
- Select
- Search
- Textarea

---

# Modal Standard

Bagian:

Header

↓

Body

↓

Footer

---

# Table Standard

Digunakan pada:

- Rekap
- Hasil Pencapaian

---

# Badge Standard

Status

Aktif

Belum Dinilai

Selesai

---

# Toast Notification

Jenis:

Success

Warning

Error

Info

---

# Loading

Menggunakan:

- Spinner
- Skeleton Loading

---

# Icon

Menggunakan icon sederhana.

Icon hanya membantu visual, bukan menjadi informasi utama.

---

# Animation

Animasi ringan.

Durasi singkat.

Tidak mengganggu pekerjaan guru.

---

# Responsive

Priority:

Smartphone

↓

Tablet

↓

Desktop

---

# Accessibility

Kontras warna jelas.

Ukuran tombol mudah disentuh.

Font mudah dibaca.

---

# QEDEV Design Rules

Seluruh halaman harus:

- Konsisten
- Ringan
- Cepat
- Mudah dipelajari
- Mobile Friendly

---

# QEDEV Notes

Design System menjadi standar seluruh project QEDEV.

Setiap komponen baru harus mengikuti aturan pada dokumen ini agar seluruh aplikasi memiliki pengalaman pengguna (User Experience) yang konsisten.

---

# Component Library

Seluruh project yang dibangun menggunakan **QEDEV Framework** wajib menggunakan komponen yang telah distandarkan agar tampilan, pengalaman pengguna (UX), dan struktur kode tetap konsisten.

---

## Layout Components

| Component         | Fungsi                      |
| ----------------- | --------------------------- |
| Layout            | Kerangka utama halaman      |
| Header            | Judul dan informasi halaman |
| Navbar            | Navigasi atas               |
| Sidebar           | Navigasi samping (Desktop)  |
| Bottom Navigation | Navigasi bawah (Mobile)     |
| Footer            | Informasi bagian bawah      |

---

## Navigation Components

| Component     | Fungsi                     |
| ------------- | -------------------------- |
| Breadcrumb    | Menampilkan posisi halaman |
| Tabs          | Berpindah antar konten     |
| Pagination    | Navigasi data              |
| Dropdown Menu | Menu pilihan               |
| Search        | Pencarian data             |
| Filter        | Penyaringan data           |

---

## Display Components

| Component      | Fungsi                      |
| -------------- | --------------------------- |
| Card           | Menampilkan informasi utama |
| Table          | Menampilkan data tabular    |
| Badge          | Status informasi            |
| Avatar         | Foto pengguna               |
| Statistic Card | Ringkasan data              |
| Empty State    | Tampilan ketika data kosong |
| Timeline       | Riwayat aktivitas           |
| Progress       | Menampilkan perkembangan    |

---

## Form Components

| Component    | Fungsi           |
| ------------ | ---------------- |
| Input        | Input teks       |
| Number Input | Input angka      |
| Textarea     | Input catatan    |
| Select       | Pilihan data     |
| Radio Button | Pilihan tunggal  |
| Checkbox     | Pilihan ganda    |
| Switch       | Aktif / Nonaktif |
| Date Picker  | Pilih tanggal    |
| Time Picker  | Pilih waktu      |
| File Upload  | Upload file      |

---

## Action Components

| Component              | Fungsi        |
| ---------------------- | ------------- |
| Button                 | Tombol aksi   |
| Icon Button            | Tombol ikon   |
| Floating Action Button | Aksi utama    |
| Dropdown Action        | Menu aksi     |
| Context Menu           | Menu tambahan |

---

## Feedback Components

| Component      | Fungsi              |
| -------------- | ------------------- |
| Modal          | Form atau informasi |
| Bottom Sheet   | Dialog Mobile       |
| Confirm Dialog | Konfirmasi aksi     |
| Toast          | Notifikasi singkat  |
| Alert          | Informasi penting   |
| Loading        | Loading halaman     |
| Skeleton       | Placeholder data    |
| Spinner        | Loading indikator   |

---

## Utility Components

| Component | Fungsi              |
| --------- | ------------------- |
| Divider   | Pemisah section     |
| Tooltip   | Informasi tambahan  |
| Chip      | Label kecil         |
| Accordion | Konten lipat        |
| Stepper   | Langkah proses      |
| Calendar  | Kalender            |
| QR Code   | Menampilkan QR      |
| Barcode   | Menampilkan Barcode |

---

# Component Priority

| Component    | Prioritas  |
| ------------ | ---------- |
| Card         | ⭐⭐⭐⭐⭐ |
| Button       | ⭐⭐⭐⭐⭐ |
| Input        | ⭐⭐⭐⭐⭐ |
| Search       | ⭐⭐⭐⭐⭐ |
| Modal        | ⭐⭐⭐⭐⭐ |
| Bottom Sheet | ⭐⭐⭐⭐   |
| Table        | ⭐⭐⭐⭐   |
| Badge        | ⭐⭐⭐     |
| Toast        | ⭐⭐⭐     |
| Loading      | ⭐⭐⭐     |
| Pagination   | ⭐⭐       |
| Dropdown     | ⭐⭐       |
| Timeline     | ⭐         |
| Calendar     | ⭐         |
| QR Code      | ⭐         |
| Barcode      | ⭐         |

---

# QEDEV Component Rules

Setiap komponen wajib memenuhi prinsip berikut:

- Reusable
- Modular
- Responsive
- Mobile First
- Accessible
- Consistent
- Lightweight
- Easy Maintenance

---

# Component Naming Standard

Penamaan component menggunakan format:

```
component-name
```

Contoh:

```
button

card

modal

table

badge

toast

loading

search

dropdown

pagination

bottom-sheet

empty-state
```

---

# QEDEV Notes

Component Library merupakan fondasi utama QEDEV Framework.

Seluruh project baru diharapkan menggunakan component yang sama sehingga proses development menjadi lebih cepat, tampilan lebih konsisten, dan biaya maintenance lebih rendah.
