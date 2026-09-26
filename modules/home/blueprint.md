# 🏠 HOME LAUNCHER BLUEPRINT

---

# Module

Home Launcher

---

# Purpose

Home Launcher merupakan halaman pertama setelah guru berhasil login.

Halaman ini berfungsi sebagai **Workspace** yang memudahkan guru memulai aktivitas mengajar tanpa harus membuka menu yang tidak diperlukan.

Home tidak menampilkan dashboard statistik, melainkan informasi yang relevan untuk aktivitas hari ini.

---

# Layout Structure

```text
┌────────────────────────────────────┐
│ Header                             │
├────────────────────────────────────┤
│ Greeting                           │
│                                    │
│ Jadwal Mengajar Hari Ini           │
│                                    │
│ Aktivitas                          │
│                                    │
│ Laporan                            │
│                                    │
│ Referensi                          │
├────────────────────────────────────┤
│ Bottom Navigation                  │
└────────────────────────────────────┘
```

---

# Sections

## 1. Greeting

Menampilkan:

- Salam
- Nama Guru
- Kalimat Motivasi
- Avatar Guru

Contoh:

```
Assalamu'alaikum 👋

Ustadz Ahmad

Semangat mengajar hari ini.
```

---

## 2. Jadwal Mengajar Hari Ini

Menampilkan daftar jadwal guru pada hari tersebut.

Informasi setiap jadwal:

- Nama Kelas
- Jam Mengajar
- Jumlah Santri

Apabila guru memiliki lebih dari satu jadwal, seluruh jadwal ditampilkan dalam satu card.

---

## 3. Aktivitas

Shortcut menuju aktivitas utama.

Menu:

- Penilaian BTQ
- Penilaian Tahfidz

---

## 4. Laporan

Shortcut menuju:

- Rekap
- Hasil Pencapaian

---

## 5. Referensi

Shortcut menuju:

- Target Hafalan
- Profil Guru

---

# User Flow

Login

↓

Home Launcher

↓

Pilih Menu

↓

Module Tujuan

↓

Kembali ke Home

---

# Render Flow

Home.render()

↓

renderGreeting()

↓

renderSchedule()

↓

renderActivity()

↓

renderReport()

↓

renderReference()

↓

Return HTML

---

# Dependencies

Layout

- Header
- Navbar

Components

- Card
- Button

---

# Data Source

Module menggunakan:

HomeService

Selama development menggunakan:

DummyHome

---

# Responsive

Mobile First

Breakpoint:

- Mobile
- Tablet
- Desktop

---

# UI Principles

- Workspace First
- Card Based Navigation
- Simple Interaction
- Teacher Friendly
- Fast Access

---

# Notes

Home Launcher menjadi pusat aktivitas guru.

Tidak terdapat proses Create, Update maupun Delete Data.

Seluruh aktivitas dilakukan pada module tujuan masing-masing.
