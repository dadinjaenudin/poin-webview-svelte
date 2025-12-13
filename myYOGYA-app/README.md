# MyYOGYA Landing Page

Landing page mobile version untuk aplikasi MyYOGYA yang dibangun dengan Svelte.

## 🎨 Fitur

- **Header dengan Gradient** - Header merah dengan logo MyYOGYA dan notifikasi bell
- **User Greeting Card** - Menampilkan sapaan pengguna dengan statistik check-in dan poin
- **Grid Menu 3x3** - 9 menu utama dengan icon dan warna yang berbeda:
  - Promo
  - Scan Member
  - Redeem All Voucher
  - Pesan Makanan
  - Belanja Online
  - Member Gen Z
  - Mulai Jualan
  - Booking Lapangan
  - Riwayat Transaksi
- **Insights Carousel** - Banner promosi dengan slider otomatis
- **Promo Nasional Mingguan** - Grid 2 kolom dengan promo cards (Pasti Hemat, Buminten)
- **Videos Section** - Grid video thumbnails dengan play icon dan caption
- **Bottom Navigation** - Navigasi bawah dengan 4 tab (Beranda, Voucher, Loyalty, Akun)

## 🚀 Teknologi

- **Svelte** - Framework JavaScript yang ringan dan cepat
- **Vite** - Build tool yang modern dan sangat cepat
- **CSS3** - Styling dengan gradient, shadow, dan animasi

## 📱 Tampilan

Aplikasi ini didesain untuk mobile-first dengan:
- Max width: 480px
- Responsive layout
- Touch-friendly buttons
- Smooth animations
- Modern UI/UX

## 🛠️ Instalasi & Menjalankan

### Install dependencies
```bash
npm install
```

### Jalankan development server
```bash
npm run dev
```

### Build untuk production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📁 Struktur Project

```
myYOGYA-app/
├── src/
│   ├── lib/
│   │   ├── Header.svelte          # Komponen header
│   │   ├── UserGreeting.svelte    # Komponen greeting card
│   │   ├── MenuGrid.svelte        # Komponen grid menu
│   │   ├── Insights.svelte        # Komponen insights carousel
│   │   ├── PromoWeekly.svelte     # Komponen promo mingguan
│   │   ├── Videos.svelte          # Komponen videos section
│   │   └── BottomNav.svelte       # Komponen bottom navigation
│   ├── App.svelte                 # Main app component
│   ├── main.js                    # Entry point
│   └── app.css                    # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customisasi

### Mengubah User Info
Edit di `src/lib/UserGreeting.svelte`:
```javascript
export let userName = "ANDRI CAHYANTI";
export let checkInCount = 16;
export let points = 725;
```

### Menambah/Mengubah Menu
Edit array `menuItems` di `src/lib/MenuGrid.svelte`

### Mengubah Insights Banner
Edit array `insights` di `src/lib/Insights.svelte`

### Mengubah Warna Tema
Edit gradient dan warna di masing-masing komponen style section

## 📄 License

MIT License

## 👨‍💻 Developer

Dibuat dengan ❤️ menggunakan Svelte
