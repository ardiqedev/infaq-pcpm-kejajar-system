# Form Blueprint

## Purpose

Menghasilkan field form yang reusable menggunakan Factory Pattern.

## Public API

```javascript
Form.render(type, options);

Form.input(options);

Form.textarea(options);

Form.select(options);

Form.checkbox(options);

Form.radio(options);
```

## Pattern

```text
Module

↓

Form.input()

↓

Form.render()

↓

Renderer

↓

HTML
```

## Responsibility

- Render HTML
- Factory Renderer
- Tidak memiliki business logic

## Version

QEDEV Framework V1
