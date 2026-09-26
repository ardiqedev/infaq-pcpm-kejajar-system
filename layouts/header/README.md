# QEDEV Header

Header merupakan identitas aplikasi yang selalu ditampilkan pada setiap halaman.

Header menyediakan informasi aplikasi dan akses cepat menuju notifikasi.

Header tidak berubah ketika pengguna berpindah halaman.

---

## Folder Structure

```text
header/
├── blueprint.md
├── README.md
├── header.html
├── header.css
└── header.js
```

---

## Header Structure

```text
Header
│
├── Logo
├── Application Name
├── Application Subtitle
└── Notification
```

---

## Public API

```javascript
Header.init();
```

---

## Example

```javascript
document.addEventListener("DOMContentLoaded", () => {
  Header.init();
});
```

---

## Dependencies

Header membutuhkan:

- Layout

---

## Responsibilities

Header bertanggung jawab untuk:

- Menampilkan Logo Aplikasi
- Menampilkan Nama Aplikasi
- Menampilkan Subtitle Aplikasi
- Menampilkan Tombol Notifikasi

Header tidak bertanggung jawab untuk:

- Routing
- Authentication
- API
- Business Logic
- Greeting Guru
- Jadwal Mengajar
- Workspace
- Dashboard

---

## Responsive

Header menggunakan pendekatan **Mobile First**.

Pada seluruh ukuran layar, struktur Header tetap sama sehingga pengguna selalu memperoleh pengalaman yang konsisten.

---

## QEDEV Development Standard

- Single Responsibility Principle (SRP)
- Mobile First
- Static HTML
- Reusable
- Framework Ready

---

## Version

QEDEV Framework V1
