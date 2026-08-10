# 💻 Portfolio — Faletehan Al Farabi

<p align="center">
  <strong>Software Engineering Student | Web Development | UI/UX</strong>
</p>

<p align="center">
  Personal portfolio website untuk menampilkan profil, project,
  certificate, technology stack, dan informasi kontak.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Feather_Icons-222222?style=flat-square" alt="Feather Icons">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma">
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
</p>

---

## 👋 About

Halo, saya **Faletehan Al Farabi**, siswa **Rekayasa Perangkat Lunak (RPL)** di **SMK Taruna Bhakti**.

Saya memiliki ketertarikan pada **Web Development, Front-End Development, dan UI/UX Design**.

Saat ini saya terus mengembangkan kemampuan melalui project, pembelajaran, sertifikasi, dan praktik secara langsung.

### Focus

- 🌐 Web Development
- 💻 Front-End Development
- 🎨 UI/UX Design
- ⚡ JavaScript
- 🧩 Responsive Web Design
- 🤖 Artificial Intelligence

---

## 📌 About This Project

Website ini merupakan personal portfolio yang dibuat untuk memperkenalkan profil, kemampuan, project, certificate, dan technology stack.

Portfolio ini juga menjadi dokumentasi perkembangan saya dalam mempelajari dan menerapkan teknologi Web Development.

### Tujuan

- Menampilkan profil secara profesional.
- Menampilkan project yang telah dibuat.
- Menampilkan certificate dan learning progress.
- Menampilkan technology stack.
- Membangun personal branding.
- Menjadi portfolio untuk kebutuhan akademik dan profesional.

---

## ✨ Features

- 🏠 **Home** — Perkenalan singkat dan call-to-action.
- 👤 **About** — Profil, pendidikan, dan fokus pembelajaran.
- 💼 **Projects** — Showcase project yang telah dibuat.
- 📜 **Certificates** — Dokumentasi certificate dan course.
- 🧰 **Tech Stack** — Teknologi dan tools yang digunakan.
- 📞 **Contact** — Informasi untuk terhubung.
- 🔗 **Social Links** — GitHub, Instagram, LinkedIn, dan Email.
- 📱 **Responsive Design** — Mendukung smartphone, tablet, dan desktop.
- 🪶 **Feather Icons** — Icon ringan dan konsisten.
- ✨ **Smooth Interaction** — Hover dan transition yang sederhana.

---

## 🖼️ Portfolio Preview

> Tambahkan screenshot portfolio di folder `assets/image/` jika ingin menampilkan preview di README.

Contoh:

```markdown
![Portfolio Preview](./assets/image/portfolio-preview.png)

| Technology    | Usage                         |
| ------------- | ----------------------------- |
| HTML5         | Struktur website              |
| Tailwind CSS  | Styling dan responsive layout |
| JavaScript    | Interaksi dan functionality   |
| Feather Icons | UI icons                      |
| Figma         | UI/UX design                  |
| Git           | Version control               |
| GitHub        | Repository dan collaboration  |
| VS Code       | Development environment       |

## 📂 Project Structure

portfolio/
│
├── assets/
│   ├── image/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── certificates/
│   │
│   └── js/
│       └── script.js
│
├── resume/
│   └── CV Faletehan Al Farabi.pdf
│
├── src/
│   ├── input.css
│   └── output.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md

| Folder/File      | Fungsi                     |
| ---------------- | -------------------------- |
| `assets/image/`  | Menyimpan gambar portfolio |
| `assets/js/`     | Menyimpan JavaScript       |
| `resume/`        | Menyimpan CV               |
| `src/input.css`  | Source CSS Tailwind        |
| `src/output.css` | CSS hasil build Tailwind   |
| `index.html`     | Halaman utama              |
| `package.json`   | Konfigurasi dan dependency |
| `README.md`      | Dokumentasi project        |


## 📱 Responsive Design

📱 Responsive Design

Portfolio dirancang agar dapat digunakan pada berbagai ukuran layar:

📱 Smartphone
📱 Tablet
💻 Laptop
🖥️ Desktop

Responsive layout diterapkan pada:

Navbar
Hero
About
Project cards
Certificate cards
Tech stack
Contact
Footer

Contoh responsive grid:

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

Layout akan menyesuaikan jumlah kolom berdasarkan ukuran layar.

🪶 Feather Icons

Portfolio menggunakan Feather Icons untuk icon pada berbagai bagian website.

Contoh:

<i data-feather="home"></i>

Kemudian diaktifkan menggunakan JavaScript:

if (window.feather) {
  feather.replace();
}

Icon digunakan pada:

Navigation
Button
Contact
Social media
Project
Footer
Mobile menu
🚀 Installation

Pastikan sudah menginstall:

Node.js
npm
Visual Studio Code
Git

Clone repository:

git clone https://github.com/FaletehanAlF/PROJECT-NEW.git

Masuk ke folder project:

cd PROJECT-NEW

Install dependency:

npm install
▶️ Run Development

Jalankan project menggunakan:

npm run dev

Jika ingin menjalankan Tailwind CLI secara langsung:

npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

Command tersebut akan menjalankan Tailwind dalam mode watch, sehingga perubahan pada source akan diproses secara otomatis.

🔄 Development Workflow
Edit HTML / CSS / JavaScript
            ↓
       Tailwind CLI
            ↓
      output.css
            ↓
        Browser
            ↓
       Test & Debug
            ↓
      Git Commit
            ↓
         GitHub
💼 Portfolio Showcase

Portfolio menampilkan beberapa kategori karya:

Projects

Project digunakan untuk menunjukkan kemampuan melalui hasil nyata.

Informasi yang dapat ditampilkan:

Project name
Description
Technology
Features
GitHub repository
Live demo

Contoh kategori project:

Personal Portfolio
Landing Page
E-Commerce
School Project
JavaScript Project
UI/UX Project
📜 Certificates

Certificate digunakan sebagai dokumentasi pembelajaran tambahan.

Kategori certificate dapat mencakup:

Web Development
Cybersecurity
JavaScript
HTML & CSS
SQL
UI/UX
Artificial Intelligence
Prompt Engineering

Setiap certificate dapat menampilkan:

Certificate Name
Issuing Organization
Issue Date
Credential ID
Credential URL
🧰 Skills & Learning

Technology yang sedang digunakan atau dipelajari:

Front-End
HTML5
CSS3
JavaScript
Tailwind CSS
React
Next.js
UI/UX
Figma
UI Design
Wireframing
Prototyping
Responsive Design
Tools
Visual Studio Code
Git
GitHub
npm
Vercel
Database
SQL
Supabase
AI
Artificial Intelligence
Prompt Engineering
AI Tools
🎯 Learning Goals

Saya terus mengembangkan kemampuan dalam:

Memperdalam JavaScript.
Mempelajari React dan Next.js.
Meningkatkan kemampuan UI/UX.
Mempelajari Full-Stack Development.
Memperdalam database.
Memahami backend development.
Mempelajari Artificial Intelligence.
Membangun project yang lebih kompleks.
📞 Contact

Jika ingin terhubung atau berdiskusi mengenai project dan collaboration:

📧 Email
faletehanalfarabi09@gmail.com
🐙 GitHub
FaletehanAlF
📸 Instagram
@faalen_portofolio
💼 LinkedIn

Personal LinkedIn Profile

📄 CV

CV tersedia pada folder:

resume/
└── CV Faletehan Al Farabi.pdf
🤝 Collaboration

Saya terbuka untuk belajar dan berkolaborasi dalam project yang berkaitan dengan:

Web Development
Front-End Development
UI/UX Design
JavaScript
Website Design
Educational Project
Open Source
📌 Project Status
Status: Active Development

Portfolio akan terus diperbarui seiring bertambahnya:

Project
Certificate
Skill
Technology
Experience
👨‍💻 Author
Faletehan Al Farabi

Software Engineering (RPL) Student
SMK Taruna Bhakti

Interested in:

Web Development
Front-End Development
UI/UX
JavaScript
Software Engineering
Artificial Intelligence
