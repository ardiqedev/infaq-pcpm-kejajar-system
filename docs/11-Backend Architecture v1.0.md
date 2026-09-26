# ⚙️ BACKEND ARCHITECTURE

---

# Backend Overview

Quran Progress System (QPS) menggunakan **Google Apps Script** sebagai Backend API dan **Google Spreadsheet** sebagai Database.

Backend dibangun menggunakan arsitektur berlapis (Layered Architecture) agar:

- Aman
- Modular
- Mudah dipelihara
- Mudah dikembangkan
- Mudah dipindahkan ke backend lain di masa depan

Frontend hanya berkomunikasi menggunakan **HTTPS JSON API**.

Frontend **tidak pernah mengakses Spreadsheet secara langsung**.

---

# Backend Architecture

```
                 GitHub Pages (PWA)

                         │

                  HTTPS JSON API

                         │

                doGet() / doPost()

                         │

                      Router

                         │

        ┌────────────────┴────────────────┐

        │                                 │

 Authentication                  Validation

        │                                 │

        └──────────────┬──────────────────┘

                       │

                 Lock Service

                       │

                  Controller

                       │

                    Service

                       │

                  Repository

                       │

             Google Spreadsheet
```

---

# Backend Principles

Backend mengikuti prinsip:

- Layered Architecture
- Service Layer Pattern
- Repository Pattern
- Single Responsibility Principle
- Snapshot First Architecture
- Stateless API
- JSON Response Standard
- Secure by Default

---

# Request Flow

## GET

Digunakan untuk membaca data.

```
GET Request

↓

Authentication

↓

Controller

↓

Service

↓

Repository

↓

Spreadsheet

↓

JSON Response
```

GET **tidak menggunakan Lock Service** karena hanya membaca data.

---

## POST

Digunakan untuk menyimpan atau mengubah data.

```
POST Request

↓

Authentication

↓

Validation

↓

Lock Service

↓

Controller

↓

Service

↓

Repository

↓

Spreadsheet

↓

JSON Response
```

POST selalu menggunakan **Lock Service** agar tidak terjadi benturan ketika beberapa guru menyimpan data secara bersamaan.

---

# Folder Structure

```
backend/

│

├── appsscript.json

├── Code.gs

│

├── router/

│      router.gs

│

├── middleware/

│      auth.gs

│      validation.gs

│      lock.gs

│

├── controllers/

│      login.controller.gs

│      home.controller.gs

│      btq.controller.gs

│      tahfidz.controller.gs

│      rekap.controller.gs

│

├── services/

│      login.service.gs

│      home.service.gs

│      btq.service.gs

│      tahfidz.service.gs

│      rekap.service.gs

│

├── repositories/

│      guru.repository.gs

│      siswa.repository.gs

│      btq.repository.gs

│      tahfidz.repository.gs

│

├── helpers/

│      response.gs

│      id-generator.gs

│      date-helper.gs

│      spreadsheet-helper.gs

│

├── config/

│      config.gs

│

└── models/
```

---

# Layer Responsibility

## Router

Bertugas menentukan endpoint yang akan dipanggil.

Tidak boleh berisi business logic.

---

## Middleware

Bertugas melakukan:

- Authentication
- Validation
- Lock Service

---

## Controller

Menerima request dari Router.

Controller hanya mengatur alur request.

Tidak melakukan akses Spreadsheet.

---

## Service

Berisi seluruh Business Logic.

Contoh:

- Login
- Penilaian
- Rekap
- Progress Update

---

## Repository

Satu-satunya layer yang boleh mengakses:

```
SpreadsheetApp
```

Repository bertugas membaca dan menulis data.

Apabila suatu saat berpindah ke Firestore atau MySQL, perubahan hanya dilakukan pada layer Repository.

---

# Lock Service

Semua proses yang mengubah data wajib menggunakan:

```
LockService.getScriptLock()
```

Flow:

```
Lock

↓

Simpan Transaksi

↓

Update Progress

↓

Release Lock
```

Tujuan:

- Menghindari benturan data
- Menjamin konsistensi data
- Aman untuk multi user

---

# Snapshot + History Architecture

Backend menggunakan dua jenis penyimpanan data.

## Transaction

Menyimpan seluruh histori penilaian.

```
transaksi_btq

transaksi_tahfidz
```

---

## Progress

Menyimpan kondisi terakhir setiap siswa.

```
progress_btq

progress_tahfidz
```

Setiap POST akan:

1. Menambah histori transaksi.
2. Memperbarui progress terakhir.

Frontend selalu membaca data dari **Progress**, bukan dari **Transaction**.

---

# API Response Standard

## Success

```json
{
  "success": true,
  "message": "Data berhasil disimpan",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Terjadi kesalahan",
  "errors": []
}
```

Seluruh endpoint wajib menggunakan format response yang sama.

---

# Security Standard

Backend menerapkan beberapa lapisan keamanan.

- Authentication
- Authorization
- Input Validation
- Lock Service
- Error Handling
- JSON Response Standard

Spreadsheet tidak pernah diakses langsung oleh Frontend.

---

# Performance Strategy

Backend dioptimalkan dengan prinsip:

- Read Fast
- Write Once

GET hanya membaca:

- Master Data
- Progress Data

POST melakukan:

- Simpan Transaction
- Update Progress

Dengan pendekatan ini performa tetap stabil meskipun histori transaksi terus bertambah.

---

# Future Ready

Arsitektur backend dirancang agar mudah dipindahkan ke:

- Firebase
- Firestore
- MySQL
- PostgreSQL
- REST API Server

tanpa mengubah struktur Frontend maupun Business Logic.

Perubahan hanya dilakukan pada Repository Layer.

---

# QEDEV Backend Rules

- Frontend tidak boleh mengetahui struktur Spreadsheet.
- Controller tidak boleh mengakses Spreadsheet.
- Service tidak boleh mengakses Spreadsheet.
- Hanya Repository yang boleh menggunakan SpreadsheetApp.
- Seluruh komunikasi data menggunakan JSON.
- Semua POST wajib menggunakan Lock Service.
- Semua endpoint wajib melalui Authentication.
- Semua response menggunakan format yang sama.
- Semua Business Logic ditempatkan pada Service Layer.

---

# QEDEV Notes

Backend Architecture merupakan standar resmi **QEDEV Framework**.

Dengan pemisahan yang jelas antara Router, Middleware, Controller, Service, dan Repository, sistem menjadi lebih aman, lebih mudah diuji, lebih mudah dipelihara, dan siap dikembangkan menjadi aplikasi berskala besar.

Prinsip utama backend QEDEV adalah:

> **"Read Fast, Write Safely, Scale Easily."**