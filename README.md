# Aplikasi Autentikasi dan Manajemen Profil Pengguna

Aplikasi ini adalah sebuah aplikasi Next.js yang menyediakan fungsi autentikasi pengguna (login dan registrasi) serta manajemen profil. Pengguna dapat mendaftar, masuk, melihat profil mereka, dan memperbarui informasi mereka.

## Getting Started

1. **Clone the repository:**
  ```bash
  git clone /home/ardi-halobelanja/test_koffiesoft/auth-frontend
  cd auth-frontend
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Run the development server:**
  ```bash
  npm run dev
  ```

4. **Open the application:**
  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Fitur

- Registrasi Pengguna
- Login Pengguna
- Melihat Profil
- Memperbarui Profil

## Teknologi yang Digunakan

- Next.js
- React
- TypeScript
- Komponen Shadcn/ui
- CSS Modules
- Environment Variables

1. Buka aplikasi di browser
2. Anda dapat mendaftar akun baru atau masuk dengan kredensial yang sudah ada
3. Setelah masuk, Anda dapat melihat profil Anda dan memperbarui informasi jika diperlukan

## Struktur Proyek

- `/components`: Berisi komponen React (Login, Register)
- `/pages`: Berisi halaman Next.js (auth, profil pengguna, pembaruan pengguna)
- `/styles`: Berisi modul CSS untuk styling

## Integrasi API

Aplikasi frontend ini dirancang untuk bekerja dengan API backend. Pastikan API Anda berjalan dan dapat diakses di URL yang ditentukan dalam file `.env.local` Anda.

- **Backend Repository:** [auth-backend](https://github.com/ardhisaif/auth-backend)