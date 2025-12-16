<script>
  import { navigateTo, navigateToSubPage } from '../stores/navigation.js';
  import ConnectionTestModal from './ConnectionTestModal.svelte';
  import ScanMemberModal from './ScanMemberModal.svelte';

  // Settings state
  let notificationEnabled = true;
  let locationEnabled = true;
  let showConnectionModal = false;
  let showScanMemberModal = false;

  // First section menu items (with arrows and toggles)
  const accountMenuSection1 = [
    {
      id: 'my-account',
      icon: 'person',
      label: 'Akun Saya',
      arrow: true
    },
    {
      id: 'otp-code',
      icon: 'mail',
      label: 'Lihat Kode OTP',
      arrow: true
    },
    {
      id: 'transaction-history',
      icon: 'history',
      label: 'Riwayat Transaksi',
      arrow: true
    },
    {
      id: 'recommendation-settings',
      icon: 'settings',
      label: 'Atur Rekomendasi',
      arrow: true
    },
    {
      id: 'notification-settings',
      icon: 'notification',
      label: 'Atur Notifikasi',
      toggle: true
    },
    {
      id: 'location-activation',
      icon: 'location',
      label: 'Aktifkan Lokasi',
      toggle: true
    }
  ];

  // Second section menu items (with arrows)
  const accountMenuSection2 = [
    {
      id: 'about-myYOGYA',
      icon: 'info',
      label: 'Tentang MyYOGYA',
      arrow: true
    },
    {
      id: 'app-rating',
      icon: 'star',
      label: 'Penilaian Aplikasi',
      arrow: true
    },
    {
      id: 'feedback',
      icon: 'feedback',
      label: 'Ajukan Kritik dan Saran',
      arrow: true
    },
    {
      id: 'faq',
      icon: 'help',
      label: 'FAQ',
      arrow: true
    },
    {
      id: 'internet-connection-test',
      icon: 'wifi',
      label: 'Tes Koneksi Internet',
      arrow: true
    },
    {
      id: 'version',
      icon: 'version',
      label: 'Versi',
      value: '2.1.0'
    }
  ];

  function handleItemClick(itemId) {
    if (itemId === 'my-account') {
      navigateToSubPage('my-account-detail');
    } else if (itemId === 'otp-code') {
      navigateToSubPage('otp-page');
    } else if (itemId === 'transaction-history') {
      navigateToSubPage('transaction-history');
    } else if (itemId === 'recommendation-settings') {
      navigateToSubPage('recommendation-settings');
    } else if (itemId === 'about-myYOGYA') {
      navigateToSubPage('about-page');
    } else if (itemId === 'app-rating') {
      navigateToSubPage('app-rating');
    } else if (itemId === 'feedback') {
      navigateToSubPage('feedback');
    } else if (itemId === 'faq') {
      navigateToSubPage('faq');
    } else if (itemId === 'internet-connection-test') {
      showConnectionModal = true;
    }
    // Handle other navigation or actions based on item
  }

  function closeConnectionModal() {
    showConnectionModal = false;
  }

  function handleToggle(itemId) {
    if (itemId === 'notification-settings') {
      notificationEnabled = !notificationEnabled;
    } else if (itemId === 'location-activation') {
      locationEnabled = !locationEnabled;
    }
  }

  function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      // Clear login status
      localStorage.setItem('isLoggedIn', 'false');
      // Reload page to show welcome screen
      window.location.reload();
    }
  }
</script>

<div class="account-page">
  <!-- Header -->
  <div class="account-header">
    <button class="back-button" on:click={() => navigateTo('home')}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="white"/>
      </svg>
    </button>
    <h1 class="header-title">Akun</h1>
    <div class="header-spacer"></div>
  </div>

  <!-- Profile Section -->
  <div class="profile-section">
    <div class="profile-avatar">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="30" fill="#ff6347"/>
        <circle cx="30" cy="22" r="10" fill="white"/>
        <path d="M10 50c0-11 9-20 20-20s20 9 20 20" fill="white"/>
      </svg>
    </div>
    <h2 class="profile-name">FENDI PRAMUDITO</h2>
  </div>

  <!-- Membership Card -->
  <div class="membership-card">
    <div class="card-header">
      <div class="card-logo">MyOGYA</div>
      <div class="card-brand">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
          <text x="0" y="15" fill="white" font-size="12" font-weight="bold">YOGYA</text>
        </svg>
      </div>
    </div>
    <div class="card-title">RED</div>
    <div class="card-validity">Berlaku sampai 24 Mei 2026</div>
    <div class="card-number">
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <rect width="20" height="16" rx="2" fill="white" opacity="0.3"/>
      </svg>
      <span>8800 4774 2244</span>
    </div>
  </div>

  <!-- Scan Member Button -->
  <button class="scan-member-button" on:click={() => {
    showScanMemberModal = true;
    
    // Workaround: Force modal visibility since reactivity broken
    requestAnimationFrame(() => {
      const modal = document.querySelector('.modal-overlay');
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 11h18v2H3zm0-4h4V3h2v4h6V3h2v4h4v2H3zm4 8H3v-2h4v-4h2v4h6v-4h2v4h4v2H3z" fill="#ff6347"/>
    </svg>
    <span>Scan Member</span>
  </button>

  <!-- Stats Section -->
  <div class="stats-section">
    <div class="stat-item">
      <div class="stat-icon voucher">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z" fill="#00c853"/>
        </svg>
      </div>
      <div class="stat-label">Vouchers</div>
      <div class="stat-value">15</div>
    </div>
    <div class="stat-item">
      <div class="stat-icon loyalty">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#ffd700"/>
        </svg>
      </div>
      <div class="stat-label">Loyalty</div>
      <div class="stat-value">203</div>
    </div>
  </div>

  <!-- Account Menu Section 1 -->
  <div class="account-menu">
    {#each accountMenuSection1 as item}
      <button class="menu-item" on:click={() => item.toggle ? handleToggle(item.id) : handleItemClick(item.id)}>
        <div class="menu-icon" class:icon-gray={!item.toggle || (item.id === 'notification-settings' && notificationEnabled) || (item.id === 'location-activation' && locationEnabled)}>
          {#if item.icon === 'person'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'mail'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'history'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'settings'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'notification'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'location'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
            </svg>
          {/if}
        </div>
        <span class="menu-label">{item.label}</span>
        {#if item.arrow}
          <svg class="menu-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5l5 5-5 5" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {:else if item.toggle}
          <div class="toggle-switch" class:active={(item.id === 'notification-settings' && notificationEnabled) || (item.id === 'location-activation' && locationEnabled)}>
            <div class="toggle-slider"></div>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Account Menu Section 2 -->
  <div class="account-menu section-2">
    {#each accountMenuSection2 as item}
      <button class="menu-item" on:click={() => handleItemClick(item.id)}>
        <div class="menu-icon icon-gray">
          {#if item.icon === 'info'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'star'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'feedback'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'help'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'wifi'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill="currentColor"/>
            </svg>
          {:else if item.icon === 'version'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
            </svg>
          {/if}
        </div>
        <span class="menu-label">{item.label}</span>
        {#if item.arrow}
          <svg class="menu-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5l5 5-5 5" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {:else if item.value}
          <span class="menu-value">{item.value}</span>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Logout Button -->
  <button class="logout-button" on:click={handleLogout}>
    KELUAR
  </button>

  <!-- App Size Info -->
  <div class="app-size">
    28.70ms (Satisfied)
  </div>
</div>

<!-- Connection Test Modal -->
{#if showConnectionModal}
  <ConnectionTestModal on:close={closeConnectionModal} />
{/if}

<!-- Scan Member Modal -->
<ScanMemberModal 
  isOpen={showScanMemberModal} 
  onClose={() => {
    showScanMemberModal = false;
    // Workaround: Force hide modal
    requestAnimationFrame(() => {
      const modal = document.querySelector('.modal-overlay');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }} 
/>

<style>
  .account-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 80px;
  }

  /* Header */
  .account-header {
    background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .back-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  .header-spacer {
    width: 40px;
  }

  /* Profile Section */
  .profile-section {
    background: white;
    padding: 24px;
    text-align: center;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto 16px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .profile-name {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin: 0;
    letter-spacing: 0.5px;
  }

  /* Membership Card */
  .membership-card {
    background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
    margin: 16px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .membership-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.03) 10px,
        rgba(255, 255, 255, 0.03) 20px
      );
    pointer-events: none;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .card-logo {
    font-size: 14px;
    font-weight: 700;
    transform: rotate(-90deg);
    letter-spacing: 2px;
  }

  .card-title {
    font-size: 32px;
    font-weight: 900;
    margin-bottom: 4px;
    position: relative;
    z-index: 1;
  }

  .card-validity {
    font-size: 12px;
    opacity: 0.9;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .card-number {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
    position: relative;
    z-index: 1;
  }

  /* Scan Member Button */
  .scan-member-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: white;
    color: #ff6347;
    border: 2px solid #ff6347;
    border-radius: 24px;
    padding: 14px 32px;
    margin: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(255, 99, 71, 0.2);
  }

  .scan-member-button:hover {
    background: #fff5f3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 99, 71, 0.3);
  }

  .scan-member-button:active {
    transform: translateY(0);
  }

  /* Stats Section */
  .stats-section {
    display: flex;
    gap: 12px;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .stat-item {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-icon.voucher {
    background: #e8f5e9;
  }

  .stat-icon.loyalty {
    background: #fff9e5;
  }

  .stat-label {
    font-size: 13px;
    color: #666;
    margin-bottom: 4px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }

  /* Account Menu */
  .account-menu {
    background: white;
    margin: 16px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 16px;
    background: white;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .menu-item:last-child {
    border-bottom: none;
  }

  .menu-item:hover {
    background: #f8f8f8;
  }

  .menu-item:active {
    background: #f0f0f0;
  }

  .menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #f5f5f5;
    border-radius: 50%;
  }

  .menu-label {
    flex: 1;
    text-align: left;
    font-size: 15px;
    color: #333;
    font-weight: 500;
  }

  .menu-arrow {
    flex-shrink: 0;
  }

  .menu-value {
    font-size: 14px;
    color: #999;
    font-weight: 500;
  }

  .menu-icon.icon-gray {
    color: #999;
  }

  /* Toggle Switch */
  .toggle-switch {
    width: 48px;
    height: 28px;
    background: #ccc;
    border-radius: 14px;
    position: relative;
    cursor: pointer;
    transition: background 0.3s ease;
    flex-shrink: 0;
  }

  .toggle-switch.active {
    background: #ff6347;
  }

  .toggle-slider {
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .toggle-switch.active .toggle-slider {
    transform: translateX(20px);
  }

  /* Section 2 spacing */
  .account-menu.section-2 {
    margin-top: 16px;
  }

  /* Logout Button */
  .logout-button {
    background: #ff6347;
    color: white;
    border: none;
    border-radius: 28px;
    padding: 16px 32px;
    margin: 24px 16px 12px 16px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    width: calc(100% - 32px);
    transition: all 0.3s ease;
    letter-spacing: 1px;
    box-shadow: 0 4px 12px rgba(255, 99, 71, 0.3);
  }

  .logout-button:hover {
    background: #ff5533;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 99, 71, 0.4);
  }

  .logout-button:active {
    transform: translateY(0);
  }

  /* App Size Info */
  .app-size {
    text-align: center;
    font-size: 13px;
    color: #999;
    padding: 12px 16px 24px 16px;
  }
</style>
