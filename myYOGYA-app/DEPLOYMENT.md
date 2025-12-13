# MyYOGYA Landing Page - Deployment Info

## 🌐 Live URL

**Public URL**: https://5174-ihgvy8prmtiz9nb3otr5u-583b4d74.sandbox.novita.ai

## 🚀 Quick Start

### Local Development
```bash
# Navigate to project directory
cd /home/user/webapp/myYOGYA-app

# Install dependencies (if not already done)
npm install

# Start development server with host access
npm run dev -- --host
```

Server akan berjalan di:
- **Local**: http://localhost:5174
- **Network**: http://169.254.0.21:5174

## 📱 Testing on Mobile

Untuk testing di mobile device:
1. Buka URL public di browser mobile: https://5174-ihgvy8prmtiz9nb3otr5u-583b4d74.sandbox.novita.ai
2. Atau scan QR code (bisa generate dari URL)
3. Atau gunakan Chrome DevTools Device Mode untuk simulasi mobile

## 🎨 Features yang Sudah Diimplementasikan

### ✅ Header Section
- Logo MyYOGYA dengan gradient merah-orange
- Notification bell icon
- Responsive design

### ✅ User Greeting Card
- Sapaan personal: "Hi, ANDRI CAHYANTI 🤗"
- Statistik check-in (icon hijau): 16
- Statistik poin (icon kuning): 725
- Card dengan shadow dan border radius

### ✅ Menu Grid (3x3)
1. **Promo** - Icon discount (merah)
2. **Scan Member** - Icon QR code (orange)
3. **Redeem All Voucher** - Icon tiket (orange)
4. **Pesan Makanan** - Icon fork & knife (merah muda)
5. **Belanja Online** - Icon shopping bag (kuning)
6. **Member Gen Z** - Text "Gen Z" (cyan)
7. **Mulai Jualan** - Icon dollar (biru)
8. **Booking Lapangan** - Icon calendar (pink)
9. **Riwayat Transaksi** - Icon clock (ungu)

### ✅ Insights Carousel
- 2 banner promosi dengan slider
- Gradient background (orange & merah)
- Dot indicators
- Auto-slide functionality (bisa ditambahkan)

### ✅ Bottom Navigation
- **Beranda** (Home) - Aktif by default
- **Voucher** - Icon voucher
- **Loyalty** - Icon crown/triangle
- **Akun** - Icon user
- Active state dengan warna merah

## 🎨 Design Details

### Color Palette
- **Primary Red**: #d32f2f
- **Secondary Orange**: #ff6b35, #ff8a65, #ff7043
- **Accent Colors**: Various for each menu item
- **Background**: White & #f5f5f5

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Logo**: 24px, italic, bold
- **Menu Items**: 13px, semi-bold
- **Stats**: 16px, bold

### Layout
- **Max Width**: 480px (mobile-optimized)
- **Grid**: 3 columns for menu items
- **Spacing**: Consistent 16-20px padding
- **Border Radius**: 12-16px for cards

## 🔧 Technical Stack

- **Framework**: Svelte 5.x
- **Build Tool**: Vite 7.2.7
- **Language**: JavaScript (ES6+)
- **Styling**: Pure CSS with CSS Variables
- **Icons**: SVG inline icons

## 📦 Project Structure

```
myYOGYA-app/
├── src/
│   ├── lib/
│   │   ├── Header.svelte          # Header dengan logo & notifikasi
│   │   ├── UserGreeting.svelte    # Greeting card dengan stats
│   │   ├── MenuGrid.svelte        # 3x3 menu grid
│   │   ├── Insights.svelte        # Carousel untuk insights
│   │   └── BottomNav.svelte       # Bottom navigation bar
│   ├── App.svelte                 # Main app component
│   ├── main.js                    # Entry point
│   └── app.css                    # Global styles
├── public/
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # Documentation
```

## 🔨 Build Commands

```bash
# Development
npm run dev                # Start dev server
npm run dev -- --host      # Start with network access

# Production
npm run build              # Build for production
npm run preview            # Preview production build

# Code Quality
npm run check              # Type checking (if using TypeScript)
```

## 📝 Notes

- Aplikasi ini dioptimalkan untuk mobile devices (max-width: 480px)
- Semua komponen menggunakan Svelte reactive statements
- Icons menggunakan SVG inline untuk performa optimal
- Smooth animations dan transitions untuk UX yang lebih baik
- Bottom navigation menggunakan fixed positioning

## 🚀 Next Steps / Future Enhancements

- [ ] Add auto-carousel untuk insights
- [ ] Implement actual routing untuk navigation
- [ ] Add API integration untuk data dinamis
- [ ] Add authentication flow
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add PWA support
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Optimize bundle size
- [ ] Add analytics

## 📞 Support

Untuk pertanyaan atau issue, silakan hubungi developer atau buat issue di repository.
