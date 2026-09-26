# QEDEV Loading Component

Universal loading component untuk QEDEV Framework.

---

## Features

- Global Loading Overlay
- Dynamic Message
- Body Scroll Lock
- Responsive
- Accessible
- Reusable
- Framework Ready

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

## Dependencies

### CSS

- variables.css
- base.css
- utilities.css
- animation.css

### HTML

- loading.html

---

## Public API

### Initialize

```javascript
Loading.init();
```

---

### Show Loading

```javascript
Loading.show();
```

Dengan custom message:

```javascript
Loading.show("Mengambil Data...");
```

---

### Hide Loading

```javascript
Loading.hide();
```

---

### Check Visibility

```javascript
Loading.isVisible();
```

Returns:

```javascript
true;
false;
```

---

## Example

```javascript
async function loadData() {
  Loading.show("Mengambil Data...");

  const response = await API.get("dashboard");

  Loading.hide();
}
```

---

## Default Options

```javascript
{
  message: "Loading...";
}
```

---

## Responsibilities

Loading hanya bertanggung jawab untuk:

- Menampilkan loading
- Menyembunyikan loading
- Mengubah pesan loading
- Mengunci scroll body
- Membuka kembali scroll body

Loading **tidak** bertanggung jawab untuk:

- Fetch API
- Business Logic
- Validasi Form
- Menyimpan Data
- Navigasi

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
