# 🗺️ SITEMAP

---

# Sitemap Structure

Quran Progress System

│

├── Login

│

├── Home

│

├── Penilaian BTQ

│ ├── Daftar Santri
│ └── Modal Penilaian

│

├── Penilaian Tahfidz

│ ├── Daftar Santri
│ └── Modal Penilaian

│

├── Rekap

│ ├── Harian
│ └── Bulanan

│

├── Hasil Pencapaian

│ ├── Daftar Santri
│ ├── Detail Pencapaian
│ └── Cetak

│

├── Target Hafalan

│

└── Profil

---

# Halaman Utama

- Login
- Home

---

# Modul Penilaian

- Penilaian BTQ
- Penilaian Tahfidz

---

# Modul Laporan

- Rekap Harian
- Rekap Bulanan
- Hasil Pencapaian

---

# Modul Referensi

- Target Hafalan

---

# Modul Akun

- Profil

---

# Navigation Level

Level 1

Login

↓

Home

↓

Penilaian BTQ

Penilaian Tahfidz

Rekap

Hasil Pencapaian

Target Hafalan

Profil

---

Level 2

Penilaian BTQ

↓

Daftar Santri

↓

Modal Penilaian

---

Penilaian Tahfidz

↓

Daftar Santri

↓

Modal Penilaian

---

Rekap

↓

Harian

Bulanan

---

Hasil Pencapaian

↓

Daftar Santri

↓

Detail

↓

Cetak

---

# Tujuan Halaman

| Halaman               | Tujuan                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Login**             | Memvalidasi akun guru agar dapat mengakses sistem sesuai hak aksesnya.                                                     |
| **Home**              | Menjadi pusat aktivitas (Home Launcher) yang menampilkan jadwal mengajar hari ini serta akses cepat ke seluruh menu utama. |
| **Penilaian BTQ**     | Memudahkan guru melakukan penilaian perkembangan BTQ pada santri sesuai jadwal mengajar yang sedang aktif.                 |
| **Penilaian Tahfidz** | Memudahkan guru melakukan penilaian setoran hafalan dan murojaah setiap santri.                                            |
| **Rekap Harian**      | Menampilkan seluruh aktivitas penilaian yang dilakukan pada hari tersebut beserta status penyelesaiannya.                  |
| **Rekap Bulanan**     | Menampilkan ringkasan perkembangan penilaian selama satu bulan sebagai bahan evaluasi guru.                                |
| **Hasil Pencapaian**  | Menampilkan perkembangan setiap santri serta menyediakan fitur cetak sebagai laporan hasil belajar.                        |
| **Target Hafalan**    | Menampilkan target BTQ dan Tahfidz sesuai kelas sebagai panduan guru selama proses pembelajaran (Read Only).               |
| **Profil**            | Menampilkan informasi akun guru, kelas yang diampu, serta menyediakan fitur logout.                                        |

---

# Catatan

Setiap halaman dalam Sitemap memiliki **satu tujuan utama (Single Responsibility)**.

Setiap perubahan fitur baru harus ditempatkan pada halaman yang sesuai dengan tujuan utamanya. Jika sebuah fitur memiliki tujuan yang berbeda, maka fitur tersebut sebaiknya dibuat sebagai halaman atau modul baru agar struktur aplikasi tetap sederhana, konsisten, dan mudah dikembangkan.

---

# Prioritas Halaman

Frekuensi menunjukkan seberapa sering halaman digunakan oleh pengguna dalam aktivitas sehari-hari. Semakin tinggi frekuensinya, semakin besar prioritas pada desain UI/UX, performa, dan kemudahan akses.

| Halaman           | Tujuan                                         | Frekuensi  |
| ----------------- | ---------------------------------------------- | ---------- |
| Home              | Launcher aktivitas guru                        | ⭐⭐⭐⭐⭐ |
| Penilaian BTQ     | Input penilaian perkembangan BTQ               | ⭐⭐⭐⭐⭐ |
| Penilaian Tahfidz | Input penilaian setoran hafalan dan murojaah   | ⭐⭐⭐⭐⭐ |
| Rekap             | Melihat rekap harian dan bulanan               | ⭐⭐⭐     |
| Hasil Pencapaian  | Melihat dan mencetak hasil perkembangan santri | ⭐⭐       |
| Target Hafalan    | Referensi target pembelajaran sesuai kelas     | ⭐         |
| Profil            | Melihat informasi akun guru                    | ⭐         |

---

# Catatan

Semakin tinggi frekuensi penggunaan sebuah halaman, maka semakin tinggi pula prioritas pengembangan pada aspek:

- User Interface (UI)
- User Experience (UX)
- Kecepatan Akses
- Kemudahan Navigasi
- Optimasi Performa

Sedangkan halaman dengan frekuensi penggunaan rendah cukup dirancang sederhana karena berfungsi sebagai halaman pendukung.
