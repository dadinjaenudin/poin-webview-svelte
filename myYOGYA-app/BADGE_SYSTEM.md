# 🔴 Sistem Badge Notifikasi MyYOGYA

Dokumentasi lengkap untuk sistem badge notifikasi (seperti iOS badge) pada aplikasi MyYOGYA.

## 📋 Gambaran Umum

Sistem badge notifikasi menampilkan indicator merah pada icon menu dan bottom navigation untuk memberitahu user bahwa ada update atau item baru yang belum dilihat. Mirip dengan badge notifikasi pada aplikasi iOS (seperti yang terlihat pada IndoGold di screenshot).

![Badge Example](https://www.genspark.ai/api/files/s/28lKCDvo)

### Karakteristik Badge

- ✅ Bulat merah iOS-style (#ff3b30)
- ✅ Text putih tebal
- ✅ Posisi top-right corner icon
- ✅ White border untuk kontras
- ✅ Support angka hingga 99+
- ✅ Shadow untuk depth
- ✅ Auto clear ketika user membuka halaman

## 🎯 Jenis Badge

| Badge Type | Lokasi | Fungsi |
|------------|--------|--------|
| **voucher** | Bottom Nav, Menu Grid | Voucher baru belum dilihat |
| **loyalty** | Bottom Nav | Poin baru belum dilihat |
| **promo** | Menu Grid | Promo baru tersedia |
| **transaction** | Menu Grid | Transaksi baru |
| **notification** | Menu Grid | Notifikasi belum dibaca |

## 📱 Lokasi Badge

### 1. Bottom Navigation
- **Voucher Tab**: Menunjukkan jumlah voucher baru
- **Loyalty Tab**: Menunjukkan update poin baru

### 2. Menu Grid (Home Page)
- **Promo**: Badge untuk promo baru
- **Redeem All Voucher**: Badge untuk voucher baru
- **Riwayat Transaksi**: Badge untuk transaksi baru
- **Demo Notifikasi**: Badge untuk testing

## 🔧 Implementasi

### Import Badge Store

```javascript
import { badgeStore, formatBadgeCount } from '../stores/badge.js';
```

### Menggunakan Badge dalam Component

```svelte
<script>
  import { badgeStore } from '../stores/badge.js';
</script>

<div class="icon-container">
  <!-- Badge akan muncul jika count > 0 -->
  {#if $badgeStore.voucher > 0}
    <span class="badge">{$badgeStore.voucher}</span>
  {/if}
  
  <!-- Your icon here -->
  <YourIcon />
</div>

<style>
  .icon-container {
    position: relative;
  }
  
  .badge {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #ff3b30;
    color: white;
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    box-shadow: 0 2px 4px rgba(255, 59, 48, 0.3);
    border: 2px solid white;
    z-index: 1;
  }
</style>
```

## 📚 API Reference

### Badge Store Methods

#### `badgeStore.setBadge(type, count)`
Set badge count untuk tipe tertentu.

```javascript
badgeStore.setBadge('voucher', 5);
```

**Parameters:**
- `type`: string - Tipe badge ('voucher', 'loyalty', 'promo', 'transaction', 'notification')
- `count`: number - Jumlah badge yang ingin ditampilkan

---

#### `badgeStore.increment(type, amount = 1)`
Tambah badge count.

```javascript
// Tambah 1
badgeStore.increment('voucher');

// Tambah 3
badgeStore.increment('voucher', 3);
```

**Parameters:**
- `type`: string - Tipe badge
- `amount`: number (optional) - Jumlah yang ditambahkan, default: 1

---

#### `badgeStore.decrement(type, amount = 1)`
Kurangi badge count (tidak akan kurang dari 0).

```javascript
// Kurangi 1
badgeStore.decrement('voucher');

// Kurangi 2
badgeStore.decrement('voucher', 2);
```

**Parameters:**
- `type`: string - Tipe badge
- `amount`: number (optional) - Jumlah yang dikurangi, default: 1

---

#### `badgeStore.clear(type)`
Hapus badge untuk tipe tertentu (set ke 0).

```javascript
badgeStore.clear('voucher');
```

**Parameters:**
- `type`: string - Tipe badge yang akan dihapus

---

#### `badgeStore.clearAll()`
Hapus semua badge.

```javascript
badgeStore.clearAll();
```

---

#### `formatBadgeCount(count)`
Format angka badge (99+ untuk angka > 99).

```javascript
import { formatBadgeCount } from '../stores/badge.js';

formatBadgeCount(5);    // "5"
formatBadgeCount(99);   // "99"
formatBadgeCount(150);  // "99+"
```

## 💡 Contoh Penggunaan

### 1. Ketika Voucher Baru Datang dari Backend

```javascript
import { badgeStore } from '../stores/badge.js';
import { notificationStore } from '../stores/notification.js';

async function checkNewVouchers() {
  try {
    const response = await fetch('/api/vouchers/new');
    const data = await response.json();
    
    if (data.newVouchers && data.newVouchers.length > 0) {
      // Set badge dengan jumlah voucher baru
      badgeStore.setBadge('voucher', data.newVouchers.length);
      
      // Tampilkan notifikasi
      notificationStore.newVoucher(
        data.newVouchers[0].name,
        data.newVouchers[0].discount,
        {
          action: () => {
            navigateTo('voucher');
            // Clear badge ketika user buka halaman voucher
            badgeStore.clear('voucher');
          }
        }
      );
    }
  } catch (error) {
    console.error('Failed to check new vouchers:', error);
  }
}
```

### 2. Ketika Poin Bertambah

```javascript
function handlePointsEarned(points, reason) {
  // Increment loyalty badge
  badgeStore.increment('loyalty');
  
  // Show notification
  notificationStore.newPoints(points, reason, {
    action: () => {
      navigateTo('loyalty');
      // Clear badge ketika user lihat loyalty page
      badgeStore.clear('loyalty');
    }
  });
}
```

### 3. Clear Badge Ketika User Membuka Halaman

```javascript
// Di VoucherPage.svelte
import { onMount } from 'svelte';
import { badgeStore } from '../stores/badge.js';

onMount(() => {
  // Clear badge voucher ketika halaman dibuka
  badgeStore.clear('voucher');
});
```

### 4. Multiple New Items

```javascript
// Ketika ada 10 voucher baru
badgeStore.setBadge('voucher', 10);

// Atau increment bertahap
for (let i = 0; i < 10; i++) {
  badgeStore.increment('voucher');
}
```

### 5. WebSocket Real-time Update

```javascript
import { onMount } from 'svelte';
import { badgeStore } from '../stores/badge.js';
import { notificationStore } from '../stores/notification.js';

onMount(() => {
  const socket = new WebSocket('wss://api.myyogya.id/notifications');
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    switch(data.type) {
      case 'new_voucher':
        // Increment badge
        badgeStore.increment('voucher');
        
        // Show notification
        notificationStore.newVoucher(
          data.voucher.name,
          data.voucher.discount,
          {
            action: () => {
              navigateTo('voucher');
              badgeStore.clear('voucher');
            }
          }
        );
        break;
        
      case 'new_points':
        badgeStore.increment('loyalty');
        notificationStore.newPoints(data.points, data.reason, {
          action: () => {
            navigateTo('loyalty');
            badgeStore.clear('loyalty');
          }
        });
        break;
        
      case 'new_promo':
        badgeStore.increment('promo');
        notificationStore.info('Promo Baru!', data.promo.title);
        break;
    }
  };
  
  return () => socket.close();
});
```

### 6. Persistent Badge Count

```javascript
// Simpan ke localStorage
import { badgeStore } from '../stores/badge.js';

// Subscribe ke perubahan dan simpan
badgeStore.subscribe(badges => {
  localStorage.setItem('badges', JSON.stringify(badges));
});

// Load dari localStorage saat app start
onMount(() => {
  const savedBadges = localStorage.getItem('badges');
  if (savedBadges) {
    const badges = JSON.parse(savedBadges);
    Object.entries(badges).forEach(([type, count]) => {
      badgeStore.setBadge(type, count);
    });
  }
});
```

## 🎨 Styling Guidelines

### Badge Positioning

```css
/* Container harus relative */
.icon-container {
  position: relative;
  display: inline-block;
}

/* Badge positioning */
.badge {
  position: absolute;
  top: -8px;      /* Sedikit keluar dari icon */
  right: -12px;   /* Sedikit keluar dari icon */
  z-index: 1;     /* Di atas icon */
}
```

### Badge Colors

```css
/* Primary badge (default) */
.badge {
  background: #ff3b30;  /* iOS red */
}

/* Alternative colors untuk different types */
.badge.voucher {
  background: #9c27b0;  /* Purple */
}

.badge.promo {
  background: #ff9800;  /* Orange */
}

.badge.info {
  background: #2196f3;  /* Blue */
}
```

### Badge Sizes

```css
/* Small badge (untuk icon kecil) */
.badge-small {
  min-width: 16px;
  height: 16px;
  font-size: 9px;
  padding: 0 4px;
}

/* Medium badge (default) */
.badge {
  min-width: 18px;
  height: 18px;
  font-size: 10px;
  padding: 0 5px;
}

/* Large badge (untuk icon besar) */
.badge-large {
  min-width: 22px;
  height: 22px;
  font-size: 12px;
  padding: 0 6px;
}
```

## 🧪 Testing dengan Demo Page

Demo page menyediakan kontrol untuk test badge system:

### Fitur Demo:

1. **Manual Controls**
   - Button `+` untuk increment
   - Button `-` untuk decrement
   - Button `Clear` untuk clear badge
   - Button `Clear All` untuk clear semua badge

2. **Visual Feedback**
   - Badge count ditampilkan realtime
   - Badge muncul di bottom nav dan menu grid
   - Warna merah iOS-style

3. **Integration Testing**
   - Test dengan notification system
   - Test clear badge saat navigasi
   - Test multiple badge types

### Cara Mengakses Demo:

1. Buka aplikasi MyYOGYA
2. Klik "Demo Notifikasi" di menu grid
3. Scroll ke section "Kontrol Badge Notifikasi"
4. Test increment/decrement/clear untuk setiap tipe badge
5. Lihat perubahan di bottom nav dan menu grid

## 🔄 Integration dengan Notification System

Badge system terintegrasi dengan notification system:

```javascript
// Ketika notification muncul, badge otomatis increment
notificationStore.newVoucher('Voucher A', 'Rp 5.000');
// Badge voucher otomatis +1

// Ketika user klik action button, badge otomatis clear
notificationStore.newVoucher('Voucher B', 'Rp 10.000', {
  action: () => {
    navigateTo('voucher');
    badgeStore.clear('voucher');  // Badge cleared
  }
});
```

## 📊 Best Practices

### 1. Clear Badge Ketika User Membuka Halaman

```javascript
// ✅ BAIK
onMount(() => {
  badgeStore.clear('voucher');
});

// ❌ BURUK - badge tetap ada meski user sudah lihat
// Tidak clear badge
```

### 2. Increment Badge Saat Item Baru Datang

```javascript
// ✅ BAIK - bertahap
newVouchers.forEach((voucher, index) => {
  setTimeout(() => {
    badgeStore.increment('voucher');
    showVoucherNotification(voucher);
  }, index * 500);
});

// ❌ BURUK - set langsung tanpa feedback
badgeStore.setBadge('voucher', newVouchers.length);
```

### 3. Persist Badge Count

```javascript
// ✅ BAIK - simpan ke localStorage
badgeStore.subscribe(badges => {
  localStorage.setItem('badges', JSON.stringify(badges));
});

// ❌ BURUK - badge hilang saat reload
// Tidak persist
```

### 4. Limit Badge Count Display

```javascript
// ✅ BAIK - gunakan formatBadgeCount
import { formatBadgeCount } from '../stores/badge.js';

{formatBadgeCount($badgeStore.voucher)}
// Menampilkan: "1", "99", "99+"

// ❌ BURUK - tampilkan angka besar
{$badgeStore.voucher}
// Bisa tampilkan: "152" (terlalu panjang)
```

### 5. Sync dengan Backend

```javascript
// ✅ BAIK - sync dengan backend
async function syncBadgeCounts() {
  const response = await fetch('/api/badges/count');
  const data = await response.json();
  
  Object.entries(data.counts).forEach(([type, count]) => {
    badgeStore.setBadge(type, count);
  });
}

onMount(() => {
  syncBadgeCounts();
  
  // Sync setiap 5 menit
  const interval = setInterval(syncBadgeCounts, 5 * 60 * 1000);
  return () => clearInterval(interval);
});
```

## 🐛 Troubleshooting

### Badge Tidak Muncul

**Problem:** Badge tidak terlihat meskipun count > 0

**Solution:**
1. Cek z-index badge dan parent container
2. Pastikan parent container position: relative
3. Cek apakah badge di-render conditional dengan `{#if}`

```svelte
<!-- ✅ Correct -->
{#if $badgeStore.voucher > 0}
  <span class="badge">{$badgeStore.voucher}</span>
{/if}
```

### Badge Tertutup Icon

**Problem:** Badge ada tapi tertutup oleh icon

**Solution:**
Pastikan z-index badge lebih tinggi dari icon

```css
.badge {
  z-index: 2;  /* Lebih tinggi dari icon */
}

.icon {
  z-index: 1;
}
```

### Badge Tidak Update

**Problem:** Badge count tidak update meski store berubah

**Solution:**
Pastikan menggunakan store reactive `$badgeStore`

```svelte
<!-- ✅ Correct -->
{$badgeStore.voucher}

<!-- ❌ Wrong -->
{badgeStore.voucher}
```

### Badge Persist Meski Sudah Dibuka

**Problem:** Badge tidak clear meski user sudah buka halaman

**Solution:**
Tambahkan clear di onMount halaman

```javascript
onMount(() => {
  badgeStore.clear('voucher');
});
```

## 🎯 Checklist Implementasi

Saat mengimplementasikan badge di halaman baru:

- [ ] Import badgeStore
- [ ] Tambahkan badge indicator di UI
- [ ] Set badge ketika item baru datang
- [ ] Clear badge di onMount
- [ ] Test increment/decrement
- [ ] Test navigation clear
- [ ] Test dengan multiple badges
- [ ] Verify styling (position, color, size)
- [ ] Test responsive design
- [ ] Add to demo page if needed

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Badge store implementation
- ✅ BottomNav integration
- ✅ MenuGrid integration
- ✅ Demo page controls
- ✅ Notification integration
- ✅ iOS-style design
- ✅ 99+ support
- ✅ formatBadgeCount helper

### Future Enhancements
- [ ] Badge animation (pop-in, bounce)
- [ ] Custom badge colors per type
- [ ] Badge sound notification
- [ ] Badge history tracking
- [ ] Badge analytics

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Author:** GenSpark AI Developer
