# Progress Ring Component

## Overview

Progress Ring merupakan reusable component untuk menampilkan progres dalam bentuk lingkaran menggunakan SVG.

Component dapat digunakan pada seluruh module QEDEV Framework.

---

## Features

- SVG Based
- Responsive
- Custom Size
- Custom Stroke
- Custom Color
- Percentage Calculation
- Reusable

---

## Usage

```javascript
ProgressRing.render({
  value: 7,
  total: 18,
});
```

---

## Options

| Property | Type   | Default |
| -------- | ------ | ------- |
| value    | Number | 0       |
| total    | Number | 100     |
| size     | Number | 64      |
| stroke   | Number | 6       |
| color    | String | #16A34A |

---

## Output

SVG Progress Ring
