# QEDEV Table Component

## Public API

```javascript
Table.render({
  columns,

  rows,
});
```

---

## Column Renderer

```javascript
{

    key:"status",

    label:"Status",

    render:(row)=>Badge.render({

        type:"success",

        text:row.status

    })

}
```

---

## Alignment

```javascript
align: "left";

align: "center";

align: "right";
```

---

## Features

- Horizontal Scroll
- Empty State
- Component Renderer
- Responsive
- Lightweight

---

## Version

QEDEV Framework V1
