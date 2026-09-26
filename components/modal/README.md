# QEDEV Modal Component

Universal modal component untuk QEDEV Framework.

---

## Features

- Dynamic Title
- Dynamic Content
- Dynamic Footer
- Multiple Sizes
- Overlay Click Close
- ESC Close
- Scroll Lock
- Responsive
- Reusable
- No Business Logic

---

## Folder Structure

```text
modal/
├── modal.html
├── modal.css
├── modal.js
├── modal.template.js
└── README.md
```

---

## Dependencies

- variables.css
- base.css
- utilities.css
- animation.css

---

## Public API

### Initialize

```javascript
Modal.init();
```

---

### Open Modal

```javascript
Modal.open({
  title: "Tambah Santri",
  content: ModalTemplate.form("<p>Hello World</p>"),
  footer: `
        <button>Simpan</button>
    `,
  size: "md",
});
```

---

### Close Modal

```javascript
Modal.close();
```

---

### Destroy Modal

```javascript
Modal.destroy();
```

---

### Check Status

```javascript
Modal.isOpen();
```

Returns:

```javascript
true;
false;
```

---

## Modal Sizes

```text
sm
md
lg
xl
full
```

Example:

```javascript
Modal.open({
  size: "lg",
});
```

---

## ModalTemplate

### Empty

```javascript
ModalTemplate.empty();
```

---

### Form

```javascript
ModalTemplate.form(`
    <input type="text">
`);
```

---

### Detail

```javascript
ModalTemplate.detail(`
    <p>Nama Santri</p>
`);
```

---

### Confirm

```javascript
ModalTemplate.confirm("Apakah Anda yakin?");
```

---

### Message

```javascript
ModalTemplate.message("Data berhasil disimpan.");
```

---

### Custom

```javascript
ModalTemplate.custom(`
    <div>Custom HTML</div>
`);
```

---

## Lifecycle

```text
init()

↓

cache()

↓

bindEvents()

↓

open()

↓

close()

↓

destroy()
```

---

## Component Structure

```text
Overlay
│
└── Modal
      │
      ├── Header
      │
      ├── Body
      │
      └── Footer
```

---

## Default Options

```javascript
{
    title: "",
    content: "",
    footer: "",
    size: "md"
}
```

---

## Responsibilities

Modal hanya bertanggung jawab untuk:

- Membuka modal
- Menutup modal
- Render title
- Render content
- Render footer
- Lock body scroll
- Unlock body scroll

Modal **tidak** bertanggung jawab untuk:

- Fetch API
- Validasi Form
- Menyimpan Data
- Business Logic

---

## QEDEV Development Standard

- Single Responsibility Principle (SRP)
- Reusable Component
- Static HTML
- Dynamic Content
- No Business Logic
- Framework Ready

---

## Version

QEDEV Framework V1
