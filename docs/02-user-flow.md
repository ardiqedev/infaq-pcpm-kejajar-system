# 🔄 USER FLOW

---

# User Role

Version 1

- Guru

---

# User Journey

Guru datang mengajar

↓

Login

↓

Home Launcher

↓

Melihat Jadwal Mengajar Hari Ini

↓

Memilih Aktivitas

↓

Melakukan Penilaian atau Melihat Informasi

↓

Logout

---

# Home Launcher

Home merupakan pusat aktivitas guru (Workspace).

Setelah login, guru langsung melihat informasi singkat mengenai aktivitas mengajar hari ini.

Home menampilkan:

- Salam
- Nama Guru
- Jadwal Mengajar Hari Ini
- Jumlah Santri pada kelas yang dijadwalkan

Menu utama ditampilkan dalam bentuk Card sehingga mudah digunakan melalui smartphone.

## 📝 Aktivitas

- Penilaian BTQ
- Penilaian Tahfidz

## 📊 Laporan

- Rekap
- Hasil Pencapaian

## 📖 Referensi

- Target Hafalan
- Profil Guru

---

# 1. Login

Guru membuka aplikasi

↓

Memasukkan Username dan Password

↓

Sistem melakukan validasi akun

↓

Jika berhasil

↓

Masuk ke Home Launcher

↓

Jika gagal

↓

Menampilkan pesan kesalahan

---

# 2. Home Launcher

Home menampilkan:

👋 Nama Guru

📅 Jadwal Mengajar Hari Ini

👥 Jumlah Santri

Serta Card Menu:

📝 Penilaian BTQ

📚 Penilaian Tahfidz

📊 Rekap

🏆 Hasil Pencapaian

🎯 Target Hafalan

👤 Profil

Guru memilih salah satu aktivitas.

---

# 3. Penilaian BTQ

Home

↓

Penilaian BTQ

↓

Sistem membaca Jadwal Mengajar Hari Ini

↓

Menampilkan Daftar Santri sesuai kelas pada jadwal tersebut

↓

Guru dapat mencari santri

↓

Memilih Santri

↓

Modal Penilaian BTQ

↓

Input Penilaian

↓

Simpan

↓

Progress BTQ diperbarui

↓

Kembali ke Daftar Santri

---

# 4. Penilaian Tahfidz

Home

↓

Penilaian Tahfidz

↓

Sistem membaca Jadwal Mengajar Hari Ini

↓

Menampilkan Daftar Santri sesuai kelas pada jadwal tersebut

↓

Guru dapat mencari santri

↓

Memilih Santri

↓

Modal Penilaian Tahfidz

↓

Input Penilaian

↓

Simpan

↓

Progress Tahfidz diperbarui

↓

Kembali ke Daftar Santri

---

# 5. Rekap

Home

↓

Rekap

↓

Pilih Periode

- Harian
- Bulanan

↓

Melihat Rekap

↓

Memilih Santri (Opsional)

↓

Melihat Detail Penilaian

---

# 6. Hasil Pencapaian

Home

↓

Hasil Pencapaian

↓

Menampilkan Daftar Santri sesuai kelas

↓

Guru dapat mencari santri

↓

Memilih Santri

↓

Melihat Ringkasan Pencapaian

↓

Cetak

---

# 7. Target Hafalan

Home

↓

Target Hafalan

↓

Menampilkan Target BTQ sesuai kelas

↓

Menampilkan Target Tahfidz sesuai kelas

Menu ini hanya berfungsi sebagai panduan bagi guru.

Tidak terdapat proses tambah, ubah, maupun hapus data.

---

# 8. Profil

Home

↓

Profil

↓

Melihat Informasi Guru

↓

Logout

---

# Exception Flow

## Login Gagal

Login

↓

Username atau Password Salah

↓

Pesan Error

↓

Kembali ke Login

---

## Tidak Ada Jadwal Mengajar

Home

↓

Tidak terdapat jadwal mengajar hari ini

↓

Menu penilaian dinonaktifkan

↓

Guru tetap dapat membuka:

- Rekap
- Target Hafalan
- Profil

---

## Data Tidak Lengkap

Input Penilaian

↓

Validasi

↓

Data Belum Lengkap

↓

Pesan Error

↓

Kembali ke Form

---

## Penilaian Berhasil

Input Penilaian

↓

Simpan

↓

Toast Success

↓

Progress Santri Diperbarui

↓

Kembali ke Daftar Santri

---

# User Experience Goal

Target pengalaman pengguna:

- Maksimal 3 klik menuju halaman penilaian.
- Maksimal 15 detik untuk menyelesaikan satu penilaian.
- Seluruh menu mudah dijangkau melalui smartphone.
- Tidak memerlukan pelatihan khusus.
- Fokus pada aktivitas guru.
- Navigasi sederhana dan konsisten.

---

# Design Philosophy

- Workspace First
- Home Launcher
- Card Based Navigation
- Mobile First
- Teacher Friendly
- Simple Interaction
- Progressive Web App (PWA)

---

# Navigation Structure

Login

↓

Home Launcher

│

├── 📝 Penilaian BTQ

│ └── Daftar Santri

│ └── Modal Penilaian

│

├── 📚 Penilaian Tahfidz

│ └── Daftar Santri

│ └── Modal Penilaian

│

├── 📊 Rekap

│ ├── Harian

│ └── Bulanan

│

├── 🏆 Hasil Pencapaian

│ └── Cetak

│

├── 🎯 Target Hafalan

│ └── Read Only

│

└── 👤 Profil
