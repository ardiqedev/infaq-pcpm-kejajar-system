# ==========================================================

# QEDEV Development Standard (QDS)

# Blueprint Module : Login

# Module : Authentication

# Status : FINAL

# ==========================================================

# 1. TUJUAN

Module Login digunakan untuk melakukan autentikasi pengguna sebelum mengakses aplikasi Quran Progress System (QPS).

Module ini menjadi gerbang utama seluruh aplikasi dan bertanggung jawab melakukan:

- Validasi Username dan Password
- Menyimpan Session Login
- Mengarahkan pengguna ke Home
- Menyiapkan Workspace (Sprint Berikutnya)

---

# 2. USER FLOW

```
Splash Screen
      │
      ▼
Cek Session
      │
 ┌────┴────┐
 │         │
Ada      Tidak Ada
 │         │
 ▼         ▼
Home     Login
            │
            ▼
     Input Username
     Input Password
            │
            ▼
      Validasi Form
            │
            ▼
        Login API
            │
     ┌──────┴──────┐
     │             │
  Gagal         Berhasil
     │             │
     ▼             ▼
 Pesan Error   Simpan Session
                     │
                     ▼
                   Home
```

---

# 3. SCREEN

## Splash

Menampilkan:

- Logo QPS
- Nama Aplikasi
- Versi
- Loading

---

## Login

Menampilkan:

- Logo
- Judul Aplikasi
- Tagline
- Username
- Password
- Remember Me
- Button Masuk
- Button Install App (Coming Soon)
- Version
- Powered by QEDEV Framework

---

# 4. VALIDASI

Username

- Wajib diisi

Password

- Wajib diisi

Jika kosong

Tampilkan Error.

---

# 5. LOGIN BERHASIL

- Simpan Session
- Simpan User Login
- Redirect ke Home

---

# 6. LOGIN GAGAL

Tetap di Login.

Menampilkan pesan error.

---

# 7. COMPONENT

Menggunakan Component QEDEV

- Card
- Form
- Button
- Loading
- Toast

---

# 8. MODULE STRUCTURE

```
modules/
└── login/
    ├── login.js
    ├── login.view.js
    ├── login.service.js
    ├── login.validator.js
    └── login.css
```

---

# 9. BACKEND (Sprint 3)

POST

```
login
```

Request

```json
{
  "username": "...",
  "password": "..."
}
```

Response

```json
{
  "success": true,
  "message": "Login berhasil.",
  "data": {
    "id": "G001",
    "username": "guru01",
    "name": "Ahmad Fauzi"
  }
}
```

---

# 10. PENGEMBANGAN SELANJUTNYA

- Remember Login
- Workspace Loader
- Install PWA
- Forgot Password
- Multi School
- Multi Role
