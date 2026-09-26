# QEDEV Navbar

Navbar merupakan navigasi global yang selalu ditampilkan pada bagian bawah aplikasi.

Navbar menyediakan akses cepat menuju Home Launcher dan Logout.

Navbar tidak berubah ketika pengguna berpindah halaman.

---

## Folder Structure

```text
navbar/
├── blueprint.md
├── README.md
├── navbar.html
├── navbar.css
└── navbar.js
```

---

## Navbar Structure

```text
Navbar
│
├── Home
└── Logout
```

---

## Public API

```javascript
Navbar.init();

Navbar.setActive(menu);
```

---

## Example

```javascript
document.addEventListener("DOMContentLoaded", () => {
  Navbar.init();
});
```

Mengubah menu aktif.

```javascript
Navbar.setActive("home");
```

---

## Dependencies

Navbar membutuhkan:

- Layout

---

## Responsibilities

Navbar bertanggung jawab untuk:

- Menampilkan tombol Home
- Menampilkan tombol Logout
- Menampilkan status menu aktif

Navbar tidak bertanggung jawab untuk:

- Routing
- Authentication
- API
- Business Logic
- Workspace
- Module

---

## Responsive

Navbar menggunakan pendekatan **Mobile First**.

Navbar selalu berada pada bagian bawah layar sehingga mudah dijangkau menggunakan ibu jari saat menggunakan smartphone.

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
