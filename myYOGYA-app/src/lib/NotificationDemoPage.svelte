<script>
  import { notificationStore } from '../stores/notification.js';
  import { navigateTo } from '../stores/navigation.js';
  
  function handleBack() {
    navigateTo('home');
  }
  
  // Demo: Show success notification
  function showSuccessNotification() {
    notificationStore.success(
      'Berhasil!',
      'Profil Anda telah diperbarui'
    );
  }
  
  // Demo: Show info notification
  function showInfoNotification() {
    notificationStore.info(
      'Informasi',
      'Aplikasi akan melakukan maintenance pada pukul 23:00 WIB'
    );
  }
  
  // Demo: Show warning notification
  function showWarningNotification() {
    notificationStore.warning(
      'Peringatan',
      'Poin Anda akan hangus dalam 7 hari'
    );
  }
  
  // Demo: Show error notification
  function showErrorNotification() {
    notificationStore.error(
      'Gagal',
      'Terjadi kesalahan saat memproses transaksi'
    );
  }
  
  // Demo: Show new voucher notification
  function showNewVoucher() {
    notificationStore.newVoucher(
      'Indomie Goreng 5 PCS',
      'Rp 5.000',
      {
        duration: 7000,
        action: () => {
          navigateTo('voucher');
        },
        actionLabel: 'Lihat Voucher'
      }
    );
  }
  
  // Demo: Show new points notification
  function showNewPoints() {
    notificationStore.newPoints(
      150,
      'Belanja di YOGYA Soreang',
      {
        duration: 7000,
        action: () => {
          navigateTo('loyalty');
        },
        actionLabel: 'Lihat Poin'
      }
    );
  }
  
  // Demo: Show multiple vouchers
  function showMultipleVouchers() {
    const vouchers = [
      { name: 'Minyak Goreng 2L', discount: 'Rp 10.000' },
      { name: 'Gula Pasir 1KG', discount: 'Rp 3.000' },
      { name: 'Ultra Milk 1L', discount: 'Rp 2.500' }
    ];
    
    vouchers.forEach((voucher, index) => {
      setTimeout(() => {
        notificationStore.newVoucher(
          voucher.name,
          voucher.discount,
          {
            duration: 6000,
            action: () => {
              navigateTo('voucher');
            }
          }
        );
      }, index * 800);
    });
  }
  
  // Demo: Shopping simulation
  function simulateShopping() {
    // Step 1: Show processing
    notificationStore.info(
      'Memproses...',
      'Sedang memproses transaksi Anda',
      { duration: 2000 }
    );
    
    // Step 2: Show success after 2 seconds
    setTimeout(() => {
      notificationStore.success(
        'Transaksi Berhasil!',
        'Total: Rp 250.000',
        { duration: 3000 }
      );
    }, 2000);
    
    // Step 3: Show points earned after 3 seconds
    setTimeout(() => {
      notificationStore.newPoints(
        250,
        'Transaksi Rp 250.000',
        {
          duration: 5000,
          action: () => {
            navigateTo('loyalty');
          }
        }
      );
    }, 3500);
    
    // Step 4: Show voucher unlocked after 5 seconds
    setTimeout(() => {
      notificationStore.newVoucher(
        'Free Coffee ☕',
        'Gratis',
        {
          duration: 6000,
          action: () => {
            navigateTo('voucher');
          }
        }
      );
    }, 6000);
  }
  
  // Demo: Clear all notifications
  function clearAll() {
    notificationStore.clear();
  }
</script>

<div class="demo-page">
  <!-- Header -->
  <div class="header">
    <button class="back-button" on:click={handleBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">Demo Notifikasi</h1>
  </div>

  <!-- Content -->
  <div class="content">
    <div class="intro-card">
      <h2>🔔 Sistem Notifikasi MyYOGYA</h2>
      <p>Coba berbagai jenis notifikasi yang akan muncul ketika ada update poin, voucher baru, atau informasi penting lainnya.</p>
    </div>

    <!-- Basic Notifications Section -->
    <div class="section">
      <h3 class="section-title">Notifikasi Dasar</h3>
      <div class="button-grid">
        <button class="demo-btn success" on:click={showSuccessNotification}>
          <span class="btn-icon">✓</span>
          <span>Success</span>
        </button>
        
        <button class="demo-btn info" on:click={showInfoNotification}>
          <span class="btn-icon">ℹ</span>
          <span>Info</span>
        </button>
        
        <button class="demo-btn warning" on:click={showWarningNotification}>
          <span class="btn-icon">⚠</span>
          <span>Warning</span>
        </button>
        
        <button class="demo-btn error" on:click={showErrorNotification}>
          <span class="btn-icon">✕</span>
          <span>Error</span>
        </button>
      </div>
    </div>

    <!-- Special Notifications Section -->
    <div class="section">
      <h3 class="section-title">Notifikasi Khusus</h3>
      <div class="button-list">
        <button class="demo-btn-large voucher" on:click={showNewVoucher}>
          <div class="btn-large-icon">🎫</div>
          <div class="btn-large-content">
            <div class="btn-large-title">Voucher Baru</div>
            <div class="btn-large-desc">Notifikasi dengan tombol aksi</div>
          </div>
        </button>
        
        <button class="demo-btn-large points" on:click={showNewPoints}>
          <div class="btn-large-icon">⭐</div>
          <div class="btn-large-content">
            <div class="btn-large-title">Poin Bertambah</div>
            <div class="btn-large-desc">Notifikasi poin dengan link ke halaman poin</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Advanced Demos Section -->
    <div class="section">
      <h3 class="section-title">Skenario Demo</h3>
      <div class="button-list">
        <button class="demo-btn-large multi" on:click={showMultipleVouchers}>
          <div class="btn-large-icon">🎉</div>
          <div class="btn-large-content">
            <div class="btn-large-title">Multiple Vouchers</div>
            <div class="btn-large-desc">Tampilkan 3 notifikasi voucher berurutan</div>
          </div>
        </button>
        
        <button class="demo-btn-large shopping" on:click={simulateShopping}>
          <div class="btn-large-icon">🛒</div>
          <div class="btn-large-content">
            <div class="btn-large-title">Simulasi Belanja</div>
            <div class="btn-large-desc">Proses → Sukses → Poin → Voucher</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Clear Button -->
    <div class="section">
      <button class="clear-btn" on:click={clearAll}>
        <span class="btn-icon">🗑️</span>
        <span>Hapus Semua Notifikasi</span>
      </button>
    </div>

    <!-- Code Example Section -->
    <div class="section">
      <h3 class="section-title">📝 Contoh Penggunaan</h3>
      <div class="code-card">
        <div class="code-title">Import notificationStore:</div>
        <pre class="code-block">import &#123; notificationStore &#125; from '../stores/notification.js';</pre>
        
        <div class="code-title">Voucher Baru:</div>
        <pre class="code-block">notificationStore.newVoucher(
  'Indomie Goreng 5 PCS',
  'Rp 5.000',
  &#123;
    duration: 7000,
    action: () => navigateTo('voucher'),
    actionLabel: 'Lihat Voucher'
  &#125;
);</pre>
        
        <div class="code-title">Poin Bertambah:</div>
        <pre class="code-block">notificationStore.newPoints(
  150,
  'Belanja di YOGYA',
  &#123;
    action: () => navigateTo('loyalty')
  &#125;
);</pre>
      </div>
    </div>
  </div>
</div>

<style>
  .demo-page {
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 80px;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .back-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  /* Content */
  .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .intro-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 24px;
    border-radius: 16px;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .intro-card h2 {
    margin: 0 0 12px 0;
    font-size: 20px;
    font-weight: 700;
  }

  .intro-card p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.95;
  }

  /* Sections */
  .section {
    background: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .section-title {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }

  /* Button Grid */
  .button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .demo-btn {
    padding: 16px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .demo-btn:active {
    transform: scale(0.95);
  }

  .btn-icon {
    font-size: 24px;
  }

  .demo-btn.success {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    color: white;
  }

  .demo-btn.info {
    background: linear-gradient(135deg, #2196f3 0%, #42a5f5 100%);
    color: white;
  }

  .demo-btn.warning {
    background: linear-gradient(135deg, #ff9800 0%, #ffa726 100%);
    color: white;
  }

  .demo-btn.error {
    background: linear-gradient(135deg, #f44336 0%, #e57373 100%);
    color: white;
  }

  /* Button List */
  .button-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .demo-btn-large {
    padding: 16px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  .demo-btn-large:active {
    transform: scale(0.98);
  }

  .btn-large-icon {
    font-size: 32px;
    flex-shrink: 0;
  }

  .btn-large-content {
    flex: 1;
  }

  .btn-large-title {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .btn-large-desc {
    font-size: 12px;
    opacity: 0.9;
  }

  .demo-btn-large.voucher {
    background: linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%);
    color: white;
  }

  .demo-btn-large.points {
    background: linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%);
    color: white;
  }

  .demo-btn-large.multi {
    background: linear-gradient(135deg, #00bcd4 0%, #26c6da 100%);
    color: white;
  }

  .demo-btn-large.shopping {
    background: linear-gradient(135deg, #ff5722 0%, #ff7043 100%);
    color: white;
  }

  /* Clear Button */
  .clear-btn {
    width: 100%;
    padding: 16px;
    border: 2px solid #f44336;
    background: white;
    border-radius: 12px;
    color: #f44336;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .clear-btn:hover {
    background: #ffebee;
  }

  .clear-btn:active {
    transform: scale(0.98);
  }

  /* Code Card */
  .code-card {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .code-title {
    font-size: 13px;
    font-weight: 600;
    color: #666;
    margin-bottom: 8px;
    margin-top: 16px;
  }

  .code-title:first-child {
    margin-top: 0;
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 12px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1.6;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .content {
      padding: 16px;
    }

    .button-grid {
      gap: 10px;
    }

    .demo-btn {
      padding: 14px;
      font-size: 13px;
    }

    .btn-icon {
      font-size: 20px;
    }
  }
</style>