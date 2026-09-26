# Table Blueprint

## Purpose

Menampilkan data tabular secara konsisten menggunakan Render Component.

---

## Public API

```javascript
Table.render(options);
```

---

## Options

```javascript
{

    columns:[],

    rows:[],

    empty:"",

    className:""

}
```

---

## Column

```javascript
{

    key:"status",

    label:"Status",

    align:"center",

    render:(row)=>Badge.render({

        type:"success",

        text:row.status

    })

}
```

---

## Features

- Render Component
- Component Renderer
- Horizontal Scroll
- Empty State
- Column Alignment
- Responsive

---

## Responsibility

- Render Header
- Render Body
- Render Cell
- Render Empty State

Tidak memiliki business logic.

---

## Version

QEDEV Framework V1
