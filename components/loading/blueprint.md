# QEDEV Component Blueprint

## Component

Loading

---

## Purpose

Menampilkan indikator proses kepada pengguna ketika aplikasi sedang memuat data atau menjalankan proses asynchronous.

Loading bersifat global dan reusable.

---

## Responsibility

Loading hanya bertanggung jawab untuk:

- Menampilkan loading
- Menyembunyikan loading
- Mengubah pesan loading (optional)
- Mengunci interaksi pengguna selama proses berlangsung

Loading **tidak** bertanggung jawab untuk:

- Fetch API
- Business Logic
- Validasi Form
- Menyimpan Data
- Navigasi

---

## Dependencies

### CSS

- variables.css
- base.css
- utilities.css
- animation.css

### HTML

loading.html

---

## Public API

```javascript
Loading.init();

Loading.show(message);

Loading.hide();

Loading.isVisible();
```

---

## Private Method

```javascript
cache();

bindEvents();

render();

lock();

unlock();
```

---

## Lifecycle

```text
Init

↓

Cache Element

↓

Show

↓

Hide

↓

Destroy
```

---

## Component Structure

```text
Loading Overlay
│
└── Loading Container
      │
      ├── Spinner
      │
      └── Message
```

---

## States

```text
Hidden

↓

Visible
```

---

## Events

Tidak ada event khusus pada Loading.

Seluruh kontrol dilakukan melalui JavaScript.

---

## Default Options

```javascript
{
  message: "Loading...";
}
```

---

## Limitations (V1)

Belum mendukung:

- Multiple Loading
- Progress Percentage
- Queue Loading
- Custom Animation
- Inline Loading

---

## Folder Structure

```text
loading/
├── blueprint.md
├── README.md
├── loading.html
├── loading.css
└── loading.js
```

---

## Development Flow

```text
Blueprint

↓

HTML

↓

CSS

↓

JavaScript

↓

README

↓

Testing
```

---

## QEDEV Development Standard

- Single Responsibility Principle (SRP)
- Reusable Component
- Static HTML
- Dynamic State
- No Business Logic
- Framework Ready

---

## Version

QEDEV Framework V1
