# 🔔 Sistem Notifikasi MyYOGYA

Dokumentasi lengkap untuk sistem notifikasi aplikasi MyYOGYA.

## 📋 Daftar Isi

- [Gambaran Umum](#gambaran-umum)
- [Instalasi](#instalasi)
- [Jenis Notifikasi](#jenis-notifikasi)
- [Penggunaan Dasar](#penggunaan-dasar)
- [Contoh Kasus Penggunaan](#contoh-kasus-penggunaan)
- [API Reference](#api-reference)
- [Demo Page](#demo-page)

## Gambaran Umum

Sistem notifikasi MyYOGYA menyediakan cara yang elegan untuk menampilkan pesan kepada pengguna, termasuk:

- ✅ Notifikasi voucher baru
- ⭐ Notifikasi penambahan poin
- ℹ️ Informasi umum
- ⚠️ Peringatan
- ✓ Konfirmasi sukses
- ✕ Pesan error

### Fitur Utama

- **Auto-dismiss**: Notifikasi otomatis hilang setelah durasi tertentu
- **Action buttons**: Tombol aksi yang dapat diklik untuk navigasi
- **Responsive**: Desain yang menyesuaikan dengan ukuran layar
- **Animasi halus**: Transisi yang smooth dan menarik
- **Multiple notifications**: Dapat menampilkan beberapa notifikasi sekaligus
- **Custom styling**: Setiap jenis notifikasi memiliki warna dan ikon unik

## Instalasi

### 1. Import Store

```javascript
import { notificationStore } from '../stores/notification.js';
```

### 2. Tambahkan NotificationContainer

NotificationContainer sudah ditambahkan di `App.svelte` dan akan selalu aktif di seluruh aplikasi.

## Jenis Notifikasi

### 1. Success (Hijau)
Untuk konfirmasi aksi yang berhasil
```javascript
notificationStore.success('Berhasil!', 'Profil Anda telah diperbarui');
```

### 2. Info (Biru)
Untuk informasi umum
```javascript
notificationStore.info('Informasi', 'Aplikasi akan maintenance malam ini');
```

### 3. Warning (Orange)
Untuk peringatan
```javascript
notificationStore.warning('Peringatan', 'Poin Anda akan hangus dalam 7 hari');
```

### 4. Error (Merah)
Untuk pesan error
```javascript
notificationStore.error('Gagal', 'Terjadi kesalahan saat memproses');
```

### 5. Voucher (Ungu)
Notifikasi khusus untuk voucher baru dengan desain menarik
```javascript
notificationStore.newVoucher('Indomie Goreng 5 PCS', 'Rp 5.000', {
  action: () => navigateTo('voucher'),
  actionLabel: 'Lihat Voucher'
});
```

### 6. Points (Orange Gradient)
Notifikasi khusus untuk penambahan poin
```javascript
notificationStore.newPoints(150, 'Belanja di YOGYA Soreang', {
  action: () => navigateTo('loyalty'),
  actionLabel: 'Lihat Poin'
});
```

## Penggunaan Dasar

### Notifikasi Sederhana

```javascript
// Hanya pesan
notificationStore.success('Berhasil!', 'Data tersimpan');

// Dengan durasi custom (dalam milidetik)
notificationStore.info('Info', 'Pesan ini tampil 10 detik', {
  duration: 10000
});

// Tanpa auto-dismiss (duration: 0)
notificationStore.warning('Penting', 'Baca ini dengan teliti', {
  duration: 0
});
```

### Notifikasi dengan Action Button

```javascript
notificationStore.newVoucher('Minyak Goreng 2L', 'Rp 10.000', {
  duration: 7000,
  action: () => {
    // Navigasi ke halaman voucher
    navigateTo('voucher');
  },
  actionLabel: 'Lihat Voucher'
});
```

### Multiple Notifications

```javascript
// Tampilkan beberapa notifikasi berurutan
const vouchers = [
  { name: 'Voucher A', discount: 'Rp 5.000' },
  { name: 'Voucher B', discount: 'Rp 10.000' },
  { name: 'Voucher C', discount: 'Rp 15.000' }
];

vouchers.forEach((voucher, index) => {
  setTimeout(() => {
    notificationStore.newVoucher(voucher.name, voucher.discount);
  }, index * 800); // Jeda 800ms antar notifikasi
});
```

## Contoh Kasus Penggunaan

### 1. Setelah Transaksi Berhasil

```javascript
function handleTransactionComplete(transaction) {
  // Show success message
  notificationStore.success(
    'Transaksi Berhasil!',
    `Total: ${formatCurrency(transaction.amount)}`
  );
  
  // Show points earned
  setTimeout(() => {
    notificationStore.newPoints(
      transaction.points,
      'Transaksi',
      {
        action: () => navigateTo('loyalty')
      }
    );
  }, 2000);
  
  // Show voucher if unlocked
  if (transaction.unlockedVoucher) {
    setTimeout(() => {
      notificationStore.newVoucher(
        transaction.unlockedVoucher.name,
        transaction.unlockedVoucher.discount,
        {
          action: () => navigateTo('voucher')
        }
      );
    }, 4000);
  }
}
```

### 2. Notifikasi Real-time dari Backend

```javascript
// Menggunakan WebSocket atau polling
socket.on('notification', (data) => {
  switch(data.type) {
    case 'new_voucher':
      notificationStore.newVoucher(
        data.voucher.name,
        data.voucher.discount,
        {
          action: () => navigateTo('voucher'),
          duration: 8000
        }
      );
      break;
      
    case 'points_earned':
      notificationStore.newPoints(
        data.points,
        data.reason,
        {
          action: () => navigateTo('loyalty')
        }
      );
      break;
      
    case 'system_info':
      notificationStore.info(
        data.title,
        data.message
      );
      break;
  }
});
```

### 3. Error Handling

```javascript
async function updateProfile(userData) {
  try {
    const response = await api.updateProfile(userData);
    
    notificationStore.success(
      'Profil Diperbarui',
      'Data Anda berhasil disimpan'
    );
    
  } catch (error) {
    notificationStore.error(
      'Gagal Memperbarui',
      error.message || 'Terjadi kesalahan'
    );
  }
}
```

### 4. Peringatan Poin Akan Hangus

```javascript
function checkExpiringPoints(points, expiryDate) {
  const daysUntilExpiry = calculateDays(expiryDate);
  
  if (daysUntilExpiry <= 7) {
    notificationStore.warning(
      'Poin Akan Hangus!',
      `${points} poin Anda akan hangus dalam ${daysUntilExpiry} hari`,
      {
        duration: 10000,
        action: () => navigateTo('loyalty'),
        actionLabel: 'Tukar Sekarang'
      }
    );
  }
}
```

## API Reference

### `notificationStore.add(options)`

Method utama untuk menambahkan notifikasi.

**Parameters:**
```javascript
{
  type: 'success' | 'info' | 'warning' | 'error' | 'voucher' | 'points',
  title: string,           // Judul notifikasi
  message: string,         // Pesan notifikasi
  duration: number,        // Durasi dalam ms (default: 5000, 0 = tidak hilang)
  icon: string,            // Custom icon emoji (opsional)
  action: function,        // Callback saat tombol aksi diklik (opsional)
  actionLabel: string      // Label tombol aksi (default: 'Lihat')
}
```

**Returns:** `number` - ID notifikasi

### Helper Methods

#### `notificationStore.success(title, message, options)`
Shorthand untuk notifikasi sukses.

#### `notificationStore.info(title, message, options)`
Shorthand untuk notifikasi info.

#### `notificationStore.warning(title, message, options)`
Shorthand untuk notifikasi warning.

#### `notificationStore.error(title, message, options)`
Shorthand untuk notifikasi error.

#### `notificationStore.newVoucher(voucherName, discount, options)`
Special method untuk notifikasi voucher baru.

**Parameters:**
- `voucherName`: string - Nama voucher
- `discount`: string - Nilai diskon (e.g., "Rp 5.000")
- `options`: object - Opsi tambahan (duration, action, dll)

#### `notificationStore.newPoints(points, reason, options)`
Special method untuk notifikasi poin baru.

**Parameters:**
- `points`: number - Jumlah poin yang didapat
- `reason`: string - Alasan mendapat poin
- `options`: object - Opsi tambahan (duration, action, dll)

#### `notificationStore.remove(id)`
Hapus notifikasi berdasarkan ID.

**Parameters:**
- `id`: number - ID notifikasi yang ingin dihapus

#### `notificationStore.clear()`
Hapus semua notifikasi yang sedang ditampilkan.

## Demo Page

Untuk melihat dan mencoba semua jenis notifikasi, akses halaman demo melalui:

1. **Dari Home**: Klik tombol "Demo Notifikasi" di menu grid
2. **URL Route**: `notification-demo`

### Fitur Demo Page:

- ✓ Test semua jenis notifikasi dasar
- 🎫 Test notifikasi voucher dengan action button
- ⭐ Test notifikasi poin dengan action button
- 🎉 Simulasi multiple vouchers
- 🛒 Simulasi flow belanja lengkap
- 📝 Contoh kode untuk developer
- 🗑️ Tombol clear all notifications

### Demo Flow Belanja

Demo page menyediakan simulasi lengkap flow belanja:

1. **Processing** - Tampilkan notifikasi "Memproses..."
2. **Success** - Tampilkan "Transaksi Berhasil"
3. **Points** - Tampilkan poin yang didapat
4. **Voucher** - Tampilkan voucher yang di-unlock

## Best Practices

### 1. Durasi yang Tepat
- Info/Success: 3-5 detik
- Warning: 7-10 detik
- Error: 8-12 detik atau manual close
- Voucher/Points dengan action: 6-8 detik

### 2. Jangan Spam Notifikasi
```javascript
// ❌ Buruk - terlalu banyak sekaligus
notifications.forEach(n => notificationStore.add(n));

// ✅ Baik - beri jeda
notifications.forEach((n, i) => {
  setTimeout(() => notificationStore.add(n), i * 800);
});
```

### 3. Gunakan Action Button dengan Bijak
```javascript
// ✅ Baik - action yang relevan
notificationStore.newVoucher('Voucher A', 'Rp 5.000', {
  action: () => navigateTo('voucher')
});

// ❌ Buruk - action yang tidak jelas
notificationStore.info('Info', 'Ada update', {
  action: () => window.location.reload()
});
```

### 4. Pesan yang Jelas dan Ringkas
```javascript
// ✅ Baik
notificationStore.success('Berhasil!', 'Profil diperbarui');

// ❌ Buruk
notificationStore.success(
  'Operasi Telah Berhasil Dilakukan', 
  'Proses pembaruan data profil pengguna telah selesai dilakukan...'
);
```

## Troubleshooting

### Notifikasi Tidak Muncul

1. **Pastikan NotificationContainer dirender**
   ```svelte
   <!-- Di App.svelte -->
   <NotificationContainer />
   ```

2. **Cek import store**
   ```javascript
   import { notificationStore } from '../stores/notification.js';
   ```

3. **Cek z-index**
   NotificationContainer menggunakan z-index: 10000. Pastikan tidak ada elemen lain yang lebih tinggi.

### Notifikasi Tertutup Elemen Lain

```css
/* Tambahkan z-index lebih tinggi jika perlu */
.notification-container {
  z-index: 99999 !important;
}
```

### Multiple Notifications Overlap

Ini normal behavior. Notifikasi akan stack secara vertikal dengan gap 12px.

## Integrasi dengan API

Contoh integrasi dengan backend API:

```javascript
// services/notifications.js
import { notificationStore } from '../stores/notification.js';

export async function fetchNotifications() {
  try {
    const response = await fetch('/api/notifications');
    const data = await response.json();
    
    data.notifications.forEach(notification => {
      if (notification.type === 'voucher') {
        notificationStore.newVoucher(
          notification.voucher.name,
          notification.voucher.discount
        );
      } else if (notification.type === 'points') {
        notificationStore.newPoints(
          notification.points,
          notification.reason
        );
      }
    });
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
  }
}

// Panggil saat app load atau secara periodik
onMount(() => {
  fetchNotifications();
  
  // Poll setiap 5 menit
  const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
  
  return () => clearInterval(interval);
});
```

## Kesimpulan

Sistem notifikasi MyYOGYA dirancang untuk:
- 🎯 Meningkatkan engagement dengan notifikasi yang menarik
- 📱 User experience yang smooth dengan animasi halus
- 🔧 Mudah digunakan dengan API yang simple
- 🎨 Desain yang konsisten dengan brand MyYOGYA
- ⚡ Performa optimal dengan auto-dismiss

Untuk pertanyaan atau feedback, silakan hubungi tim development.

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Author:** GenSpark AI Developer
