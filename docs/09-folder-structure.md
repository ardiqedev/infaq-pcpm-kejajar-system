# 📁 FOLDER STRUCTURE

---

# Folder Overview

Quran Progress System (QPS) menggunakan struktur folder yang mengikuti **QEDEV Framework**.

Framework ini memisahkan antara **Engine**, **Reusable Component**, dan **Business Module** sehingga aplikasi lebih mudah dikembangkan, dipelihara, dan digunakan kembali pada project lain.

---

# Struktur Folder

```text
QPS/

│
├── index.html
├── manifest.json
├── service-worker.js
│
├── engine/
│   ├── app.js
│   ├── bootstrap.js
│   ├── router.js
│   ├── auth.js
│   ├── storage.js
│   └── state.js
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── badge/
│   ├── button/
│   ├── card/
│   ├── confirm/
│   ├── dropdown/
│   ├── empty-state/
│   ├── loading/
│   ├── modal/
│   ├── pagination/
│   ├── search/
│   ├── table/
│   ├── tabs/
│   ├── toast/
│   └── topbar/
│
├── modules/
│   ├── login/
│   ├── home/
│   ├── btq/
│   ├── tahfidz/
│   ├── rekap/
│   ├── hasil/
│   ├── target/
│   └── profil/
│
├── services/
│
├── helpers/
│
├── validators/
│
├── dummy/
│
├── config/
│
├── layouts/
│
├── backend/
│   └── apps-script/
│
└── docs/
```

---

# Engine

Folder **engine/** merupakan mesin utama aplikasi.

Engine tidak berisi fitur bisnis, tetapi mengatur bagaimana aplikasi berjalan.

| File         | Fungsi                                        |
| ------------ | --------------------------------------------- |
| app.js       | Inisialisasi aplikasi                         |
| bootstrap.js | Menjalankan aplikasi saat pertama kali dibuka |
| router.js    | Mengatur navigasi halaman                     |
| auth.js      | Login, Logout, Session                        |
| storage.js   | Local Storage & Session Storage               |
| state.js     | Global State Management                       |

---

# Struktur Module

Setiap module wajib mengikuti struktur berikut.

```text
module-name/

├── module.js
├── module.view.js
├── module.service.js
├── module.helper.js
├── module.validator.js
├── module.css
└── module.html
```

---

# Penjelasan Folder

## engine/

Mesin utama QEDEV Framework.

Bertanggung jawab mengelola lifecycle aplikasi, routing, autentikasi, state, dan penyimpanan lokal.

---

## assets/

Menyimpan seluruh aset aplikasi.

- css/
- js/
- images/
- icons/
- fonts/

---

## components/

Berisi reusable component yang dapat digunakan oleh seluruh module.

Contoh:

- Button
- Card
- Modal
- Table
- Toast
- Badge
- Loading
- Pagination

---

## modules/

Berisi seluruh fitur utama aplikasi.

Contoh:

- Login
- Home
- BTQ
- Tahfidz
- Rekap
- Hasil
- Target
- Profil

---

## services/

Berisi komunikasi data dengan backend.

Contoh:

- LoginService
- GuruService
- BTQService
- TahfidzService

---

## helpers/

Berisi helper global.

Contoh:

- Date Helper
- Format Helper
- Storage Helper
- Number Helper

---

## validators/

Berisi validasi global.

Contoh:

- Form Validator
- Required Validator
- Login Validator

---

## dummy/

Berisi data dummy selama tahap Frontend Development.

---

## config/

Berisi konfigurasi aplikasi.

Contoh:

- Config
- Constants
- Environment

---

## layouts/

Berisi layout utama aplikasi.

Contoh:

- Header
- Footer
- Bottom Navigation

---

## backend/

Berisi source code Google Apps Script.

---

## docs/

Seluruh dokumentasi Blueprint Project.

---

# Development Flow

Blueprint

↓

Folder Structure

↓

Engine

↓

Components

↓

Dummy Data

↓

Modules

↓

Frontend

↓

Backend

↓

Testing

↓

Deployment

---

# Naming Standard

Seluruh folder menggunakan:

- Huruf kecil
- Tanpa spasi
- Menggunakan tanda "-"

Contoh:

```text
bottom-navigation

empty-state
```

Nama module menggunakan satu kata apabila memungkinkan.

```text
login

home

btq

tahfidz

rekap

hasil

target

profil
```

---

# QEDEV Rules

- Engine hanya mengelola lifecycle aplikasi.
- Module hanya mengelola fitur bisnis.
- Component hanya mengelola tampilan yang dapat digunakan ulang.
- Service hanya mengelola komunikasi data.
- Helper hanya berisi fungsi bantu.
- Validator hanya berisi validasi.
- Module tidak boleh berkomunikasi langsung dengan module lain.
- Seluruh komunikasi data dilakukan melalui Service Layer.

---

# QEDEV Notes

Struktur folder ini merupakan standar resmi **QEDEV Framework v1.0**.

Seluruh project QEDEV diharapkan menggunakan struktur yang sama agar proses development menjadi lebih cepat, konsisten, minim refactoring, dan mudah dipelihara.

Dengan pemisahan antara **Engine**, **Component**, dan **Module**, setiap bagian aplikasi memiliki tanggung jawab yang jelas sesuai prinsip **Single Responsibility Principle (SRP)**.
