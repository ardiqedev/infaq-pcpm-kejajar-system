Kita melanjutkan project Quran Progress System (QPS) menggunakan QEDEV Development Standard (QDS).

Jangan mengubah arsitektur yang sudah disepakati.

========================================
PROJECT
========================================

Nama:
Quran Progress System (QPS)

Motto:
"Simple for Teachers, Powerful for Schools."

Target:
Guru TPQ / Rumah Tahfidz / Sekolah Islam

Versi:
V1 hanya Guru.

Frontend:
HTML
CSS
Vanilla JavaScript
PWA

Hosting:
GitHub Pages

Backend:
Google Apps Script REST API

Database:
Google Spreadsheet

========================================
QEDEV DEVELOPMENT STANDARD
========================================

Urutan Development:

00-project.md
01-analysis.md
02-user-flow.md
03-sitemap.md
04-modules.md
05-wireframe.md
06-design-system.md
07-database.md
08-backend-architecture.md
09-folder-structure.md

Seluruh document sudah FINAL.

Gunakan document tersebut sebagai acuan.

Jangan mengubah konsep kecuali kita diskusikan bersama.

========================================
DATABASE ARCHITECTURE
========================================

Menggunakan:

Master Data

↓

Progress Data (Snapshot)

↓

Transaction Data (History)

↓

Report

Bukan langsung membaca transaksi.

Frontend selalu membaca Progress.

POST akan:

1. Insert Transaction
2. Update Progress

GET hanya membaca Progress.

Konsep utama backend:

"Read Fast, Write Safely."

========================================
BACKEND
========================================

Arsitektur:

GitHub Pages

↓

doGet()/doPost()

↓

Router

↓

Middleware

(Authentication)

↓

Validation

↓

Lock Service

↓

Controller

↓

Service

↓

Repository

↓

Spreadsheet

Semua POST menggunakan LockService.

Repository adalah satu-satunya layer yang boleh menggunakan SpreadsheetApp.

========================================
FOLDER STRUCTURE
========================================

Sudah menggunakan QEDEV Framework.

Engine:

app.js

bootstrap.js

router.js

auth.js

storage.js

state.js

api.js (akan dibuat)

Modules dipisahkan.

Components reusable.

========================================
STYLE DEVELOPMENT
========================================

Jangan langsung coding fitur.

Selalu mulai dari Engine.

Lalu Components.

Lalu Dummy.

Lalu Modules.

Gunakan Clean Code.

Gunakan SRP.

Gunakan reusable component.

Jangan melakukan refactor besar.

========================================
STATUS SEKARANG
========================================

Saat ini kita baru selesai membuat Blueprint dan sedang mulai membangun QEDEV Engine.

File Engine yang sudah dibuat:

engine/
├── app.js
├── auth.js
├── bootstrap.js
├── router.js
├── state.js
└── storage.js

Selanjutnya kita akan membuat api.js lalu mulai mengembangkan Engine satu per satu.

Lanjutkan dari titik ini tanpa mengubah arsitektur yang telah disepakati.
