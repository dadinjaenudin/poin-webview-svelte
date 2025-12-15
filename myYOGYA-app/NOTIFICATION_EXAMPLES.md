# 📱 Contoh Implementasi Notifikasi MyYOGYA

Berikut adalah contoh-contoh implementasi notifikasi dalam berbagai skenario bisnis MyYOGYA.

## 🛒 Skenario 1: Flow Belanja Lengkap

### Implementasi
```javascript
async function completeShoppingTransaction(cartData) {
  // Step 1: Show processing
  notificationStore.info(
    'Memproses Transaksi',
    'Mohon tunggu sebentar...',
    { duration: 0 } // Will be removed manually
  );
  
  try {
    // Call API
    const result = await api.processTransaction(cartData);
    
    // Remove processing notification
    notificationStore.clear();
    
    // Step 2: Show success
    notificationStore.success(
      'Transaksi Berhasil! 🎉',
      `Total: ${formatCurrency(result.total)}`,
      { duration: 3000 }
    );
    
    // Step 3: Show points earned (after 2s)
    setTimeout(() => {
      notificationStore.newPoints(
        result.pointsEarned,
        `Belanja di ${result.storeName}`,
        {
          duration: 6000,
          action: () => navigateTo('loyalty'),
          actionLabel: 'Lihat Poin Saya'
        }
      );
    }, 2000);
    
    // Step 4: Show unlocked voucher if any (after 5s)
    if (result.unlockedVouchers && result.unlockedVouchers.length > 0) {
      setTimeout(() => {
        result.unlockedVouchers.forEach((voucher, index) => {
          setTimeout(() => {
            notificationStore.newVoucher(
              voucher.name,
              voucher.discount,
              {
                duration: 7000,
                action: () => navigateTo('voucher'),
                actionLabel: 'Gunakan Sekarang'
              }
            );
          }, index * 1000);
        });
      }, 5000);
    }
    
  } catch (error) {
    notificationStore.clear();
    notificationStore.error(
      'Transaksi Gagal',
      error.message || 'Silakan coba lagi',
      { duration: 8000 }
    );
  }
}
```

## 🎁 Skenario 2: Voucher Baru dari Backend

### Implementasi WebSocket
```javascript
import { onMount } from 'svelte';
import { notificationStore } from '../stores/notification.js';

let socket;

onMount(() => {
  // Connect to WebSocket
  socket = new WebSocket('wss://api.myyogya.id/notifications');
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    switch(data.type) {
      case 'new_voucher':
        notificationStore.newVoucher(
          data.voucher.name,
          data.voucher.discount,
          {
            duration: 8000,
            action: () => {
              navigateTo('voucher');
              // Mark as read
              api.markNotificationAsRead(data.id);
            },
            actionLabel: 'Klaim Sekarang'
          }
        );
        
        // Play sound (optional)
        playNotificationSound();
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
    }
  };
  
  return () => {
    socket.close();
  };
});
```

### Implementasi Polling
```javascript
import { onMount } from 'svelte';
import { notificationStore } from '../stores/notification.js';

onMount(() => {
  let lastCheckTime = Date.now();
  
  async function checkNewNotifications() {
    try {
      const response = await fetch(`/api/notifications?since=${lastCheckTime}`);
      const data = await response.json();
      
      if (data.notifications && data.notifications.length > 0) {
        data.notifications.forEach((notification, index) => {
          setTimeout(() => {
            if (notification.type === 'voucher') {
              notificationStore.newVoucher(
                notification.voucher.name,
                notification.voucher.discount,
                {
                  action: () => navigateTo('voucher')
                }
              );
            } else if (notification.type === 'points') {
              notificationStore.newPoints(
                notification.points,
                notification.reason,
                {
                  action: () => navigateTo('loyalty')
                }
              );
            }
          }, index * 800);
        });
        
        lastCheckTime = Date.now();
      }
    } catch (error) {
      console.error('Failed to check notifications:', error);
    }
  }
  
  // Check immediately on mount
  checkNewNotifications();
  
  // Then check every 30 seconds
  const interval = setInterval(checkNewNotifications, 30000);
  
  return () => clearInterval(interval);
});
```

## ⚠️ Skenario 3: Poin Akan Hangus

### Implementasi
```javascript
import { onMount } from 'svelte';
import { notificationStore } from '../stores/notification.js';

onMount(async () => {
  try {
    const response = await fetch('/api/loyalty/points/expiring');
    const data = await response.json();
    
    if (data.expiringPoints && data.expiringPoints.amount > 0) {
      const daysLeft = Math.ceil(
        (new Date(data.expiringPoints.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysLeft <= 7) {
        // Show warning
        notificationStore.warning(
          '⚠️ Poin Akan Hangus!',
          `${data.expiringPoints.amount} poin akan hangus dalam ${daysLeft} hari`,
          {
            duration: 12000,
            action: () => navigateTo('loyalty'),
            actionLabel: 'Tukar Sekarang'
          }
        );
        
        // Show reminder vouchers
        setTimeout(() => {
          notificationStore.info(
            'Yuk Tukar Poin!',
            'Ada banyak hadiah menarik menunggu',
            {
              duration: 8000,
              action: () => navigateTo('loyalty'),
              actionLabel: 'Lihat Hadiah'
            }
          );
        }, 3000);
      }
    }
  } catch (error) {
    console.error('Failed to check expiring points:', error);
  }
});
```

## 🎯 Skenario 4: Target Poin Member

### Implementasi
```javascript
function checkPointsMilestone(currentPoints, transaction) {
  const milestones = [
    { points: 100, message: 'Kamu sudah dapat 100 poin! 🌟' },
    { points: 500, message: 'Wow! 500 poin terkumpul! 🎉' },
    { points: 1000, message: 'Luar biasa! 1000 poin achieved! 🏆' },
    { points: 5000, message: 'Amazing! 5000 poin! Kamu member setia kami! 💎' }
  ];
  
  const reachedMilestone = milestones.find(m => 
    currentPoints >= m.points && 
    (currentPoints - transaction.pointsEarned) < m.points
  );
  
  if (reachedMilestone) {
    setTimeout(() => {
      notificationStore.success(
        'Milestone Tercapai! 🎊',
        reachedMilestone.message,
        {
          duration: 8000,
          action: () => navigateTo('loyalty'),
          actionLabel: 'Lihat Pencapaian'
        }
      );
    }, 3000);
  }
}
```

## 📅 Skenario 5: Promo Harian

### Implementasi
```javascript
import { onMount } from 'svelte';
import { notificationStore } from '../stores/notification.js';

onMount(async () => {
  try {
    const response = await fetch('/api/promos/daily');
    const data = await response.json();
    
    if (data.todayPromos && data.todayPromos.length > 0) {
      // Show first promo immediately
      notificationStore.info(
        '🎁 Promo Hari Ini!',
        data.todayPromos[0].title,
        {
          duration: 6000,
          action: () => {
            // Navigate to promo detail
            window.location.href = data.todayPromos[0].url;
          },
          actionLabel: 'Lihat Detail'
        }
      );
      
      // Show other promos if more than 1
      if (data.todayPromos.length > 1) {
        setTimeout(() => {
          notificationStore.info(
            '📢 Ada Promo Lainnya!',
            `${data.todayPromos.length - 1} promo lagi menantimu`,
            {
              duration: 5000,
              action: () => navigateTo('promo'),
              actionLabel: 'Lihat Semua'
            }
          );
        }, 7000);
      }
    }
  } catch (error) {
    console.error('Failed to fetch daily promos:', error);
  }
});
```

## 🎂 Skenario 6: Birthday Voucher

### Implementasi
```javascript
import { onMount } from 'svelte';
import { notificationStore } from '../stores/notification.js';

onMount(async () => {
  try {
    const response = await fetch('/api/user/profile');
    const user = await response.json();
    
    // Check if today is birthday
    const today = new Date();
    const birthday = new Date(user.birthdate);
    
    if (today.getMonth() === birthday.getMonth() && 
        today.getDate() === birthday.getDate()) {
      
      // Show birthday greeting
      notificationStore.success(
        '🎂 Selamat Ulang Tahun!',
        `Happy Birthday ${user.name}! 🎉`,
        {
          duration: 10000
        }
      );
      
      // Show birthday voucher
      setTimeout(() => {
        notificationStore.newVoucher(
          'Birthday Special Voucher',
          'Rp 50.000',
          {
            duration: 12000,
            action: () => navigateTo('voucher'),
            actionLabel: 'Gunakan Voucher'
          }
        );
      }, 3000);
      
      // Show birthday points
      setTimeout(() => {
        notificationStore.newPoints(
          100,
          'Hadiah Ulang Tahun 🎁',
          {
            duration: 8000,
            action: () => navigateTo('loyalty')
          }
        );
      }, 6000);
    }
  } catch (error) {
    console.error('Failed to check birthday:', error);
  }
});
```

## 🏆 Skenario 7: Achievement Unlocked

### Implementasi
```javascript
function checkAchievements(userStats) {
  const achievements = [
    {
      id: 'first_purchase',
      condition: userStats.totalTransactions === 1,
      title: '🌟 Pembelian Pertama!',
      message: 'Selamat! Ini pembelian pertama kamu',
      reward: { type: 'voucher', name: 'Welcome Voucher', discount: 'Rp 10.000' }
    },
    {
      id: 'loyal_customer',
      condition: userStats.totalTransactions === 10,
      title: '🎖️ Pelanggan Setia!',
      message: 'Kamu sudah belanja 10x di MyYOGYA',
      reward: { type: 'points', amount: 200, reason: 'Loyal Customer Badge' }
    },
    {
      id: 'big_spender',
      condition: userStats.totalSpent >= 1000000,
      title: '💎 Big Spender!',
      message: 'Total belanja kamu sudah Rp 1.000.000!',
      reward: { type: 'voucher', name: 'VIP Voucher', discount: 'Rp 100.000' }
    }
  ];
  
  achievements.forEach(achievement => {
    if (achievement.condition && !userStats.unlockedAchievements?.includes(achievement.id)) {
      // Show achievement notification
      notificationStore.success(
        achievement.title,
        achievement.message,
        {
          duration: 8000
        }
      );
      
      // Show reward
      setTimeout(() => {
        if (achievement.reward.type === 'voucher') {
          notificationStore.newVoucher(
            achievement.reward.name,
            achievement.reward.discount,
            {
              action: () => navigateTo('voucher')
            }
          );
        } else if (achievement.reward.type === 'points') {
          notificationStore.newPoints(
            achievement.reward.amount,
            achievement.reward.reason,
            {
              action: () => navigateTo('loyalty')
            }
          );
        }
      }, 3000);
      
      // Mark achievement as unlocked
      api.unlockAchievement(achievement.id);
    }
  });
}
```

## 🔔 Skenario 8: Push Notification Handler

### Implementasi
```javascript
// Service Worker untuk handle push notifications
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const options = {
    body: data.message,
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url,
      type: data.type
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Di aplikasi, ketika user klik notifikasi
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url).then(windowClient => {
      // Show in-app notification
      if (windowClient) {
        windowClient.postMessage({
          type: 'show_notification',
          data: event.notification.data
        });
      }
    })
  );
});

// Di App.svelte
onMount(() => {
  // Listen for messages from service worker
  navigator.serviceWorker?.addEventListener('message', (event) => {
    if (event.data.type === 'show_notification') {
      const data = event.data.data;
      
      if (data.type === 'voucher') {
        notificationStore.newVoucher(
          data.voucher.name,
          data.voucher.discount,
          {
            action: () => navigateTo('voucher')
          }
        );
      } else if (data.type === 'points') {
        notificationStore.newPoints(
          data.points,
          data.reason,
          {
            action: () => navigateTo('loyalty')
          }
        );
      }
    }
  });
});
```

## 📊 Skenario 9: Batch Notifications

### Implementasi untuk Menampilkan Multiple Vouchers
```javascript
async function showNewVoucherBatch() {
  try {
    const response = await fetch('/api/vouchers/new');
    const data = await response.json();
    
    if (data.newVouchers && data.newVouchers.length > 0) {
      // Show summary first
      notificationStore.info(
        '🎉 Ada Voucher Baru!',
        `${data.newVouchers.length} voucher baru tersedia`,
        {
          duration: 5000,
          action: () => navigateTo('voucher'),
          actionLabel: 'Lihat Semua'
        }
      );
      
      // Show individual vouchers with delay
      setTimeout(() => {
        data.newVouchers.slice(0, 3).forEach((voucher, index) => {
          setTimeout(() => {
            notificationStore.newVoucher(
              voucher.name,
              voucher.discount,
              {
                duration: 6000,
                action: () => navigateTo('voucher')
              }
            );
          }, index * 1200);
        });
      }, 5500);
    }
  } catch (error) {
    console.error('Failed to fetch new vouchers:', error);
  }
}
```

## 🎮 Tips & Best Practices

### 1. Timing yang Tepat
```javascript
// ✅ BAIK: Beri jeda antar notifikasi
setTimeout(() => notificationStore.success(...), 2000);
setTimeout(() => notificationStore.newPoints(...), 4000);

// ❌ BURUK: Semua sekaligus
notificationStore.success(...);
notificationStore.newPoints(...);
```

### 2. Prioritas Notifikasi
```javascript
// Urutkan berdasarkan prioritas
// 1. Error (paling penting)
// 2. Warning
// 3. Success
// 4. Voucher/Points
// 5. Info

function showPrioritizedNotifications(notifications) {
  const sorted = notifications.sort((a, b) => {
    const priority = {
      error: 1,
      warning: 2,
      success: 3,
      voucher: 4,
      points: 5,
      info: 6
    };
    return priority[a.type] - priority[b.type];
  });
  
  sorted.forEach((notif, index) => {
    setTimeout(() => {
      notificationStore.add(notif);
    }, index * 800);
  });
}
```

### 3. Limit Jumlah Notifikasi
```javascript
// Batasi maksimal 3 notifikasi sekaligus
const MAX_NOTIFICATIONS = 3;

function showNotifications(notifications) {
  // Ambil 3 teratas
  const limited = notifications.slice(0, MAX_NOTIFICATIONS);
  
  // Jika ada lebih, tunjukkan summary
  if (notifications.length > MAX_NOTIFICATIONS) {
    notificationStore.info(
      'Ada Notifikasi Lainnya',
      `+${notifications.length - MAX_NOTIFICATIONS} notifikasi lagi`,
      {
        action: () => navigateTo('notifications')
      }
    );
  }
  
  // Show limited notifications
  limited.forEach((notif, index) => {
    setTimeout(() => {
      notificationStore.add(notif);
    }, index * 1000);
  });
}
```

---

**Catatan:** Semua contoh di atas siap digunakan dan dapat disesuaikan dengan kebutuhan spesifik aplikasi MyYOGYA.

Untuk dokumentasi lengkap API, lihat [NOTIFICATION_SYSTEM.md](./NOTIFICATION_SYSTEM.md)
