<script>
  import Scanner from './Scanner.svelte';
  
  let showScanner = false;
  let lastScanResult = null;
  
  const menuItems = [
    {
      id: 1,
      title: 'Promo',
      subtitle: '',
      icon: 'promo',
      color: '#ff6b6b'
    },
    {
      id: 2,
      title: 'Scan',
      subtitle: 'Member',
      icon: 'scan',
      color: '#ff8a65'
    },
    {
      id: 3,
      title: 'Redeem All',
      subtitle: 'Voucher',
      icon: 'voucher',
      color: '#ff7043'
    },
    {
      id: 4,
      title: 'Pesan',
      subtitle: 'Makanan',
      icon: 'food',
      color: '#e57373'
    },
    {
      id: 5,
      title: 'Belanja',
      subtitle: 'Online',
      icon: 'shop',
      color: '#ffd54f'
    },
    {
      id: 6,
      title: 'Member',
      subtitle: 'Gen Z',
      icon: 'genz',
      color: '#81deea'
    },
    {
      id: 7,
      title: 'Mulai',
      subtitle: 'Jualan',
      icon: 'sell',
      color: '#90caf9'
    },
    {
      id: 8,
      title: 'Booking',
      subtitle: 'Lapangan',
      icon: 'booking',
      color: '#f48fb1'
    },
    {
      id: 9,
      title: 'Riwayat',
      subtitle: 'Transaksi',
      icon: 'history',
      color: '#b39ddb'
    }
  ];

  function handleMenuClick(item) {
    console.log('Menu clicked:', item.title, item.icon);
    
    // Open scanner if "Scan Member" clicked
    if (item.icon === 'scan') {
      console.log('Opening scanner...');
      console.log('showScanner before:', showScanner);
      showScanner = true;
      console.log('showScanner after:', showScanner);
      
      // Force reactivity update
      setTimeout(() => {
        console.log('showScanner in timeout:', showScanner);
      }, 100);
      return;
    }
    
    alert(`Clicked: ${item.title} ${item.subtitle}`);
  }
  
  function handleScanSuccess(decodedText, decodedResult) {
    console.log('Scan success:', decodedText);
    lastScanResult = decodedText;
    
    // You can add your logic here, e.g.:
    // - Send to API
    // - Show member info
    // - Update points
    
    // Note: Alert removed to allow auto-close to work
    // Scanner will show result and auto-close after 2 seconds
  }
  
  function handleScannerClose() {
    console.log('MenuGrid: handleScannerClose called');
    console.log('MenuGrid: showScanner before:', showScanner);
    showScanner = false;
    console.log('MenuGrid: showScanner after:', showScanner);
  }
</script>

<div class="menu-container">
  <div class="menu-grid">
    {#each menuItems as item (item.id)}
      <button class="menu-item" on:click={() => handleMenuClick(item)}>
        <div class="menu-icon" style="background-color: {item.color}20;">
          {#if item.icon === 'promo'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'scan'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h4V2H2v6h2V4zm0 16H2v-6h2v4h4v2zm16-16v4h2V2h-6v2h4zm0 16h-4v2h6v-6h-2v4zM5 11h2v2H5v-2zm0-2h2v2H5V9zm2 4H5v2h2v-2zm2 2h2v-2H9v2zm-2 2H5v2h2v-2zm4-4H9v2h2v-2zm0 4h-2v2h2v-2zm2-6h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2V7zm0 12h-2v2h2v-2zm2-6h-2v2h2v-2zm0-2V9h-2v2h2zm2 0h-2v2h2v-2zm0 2h-2v2h2v-2zm-2 2v2h2v-2h-2zm0 4h-2v2h2v-2zm2-2v-2h2v2h-2z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'voucher'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM11 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'food'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'shop'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'genz'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <text x="5" y="18" font-size="14" font-weight="bold" fill="{item.color}">Gen Z</text>
            </svg>
          {:else if item.icon === 'sell'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'booking'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="{item.color}"/>
            </svg>
          {:else if item.icon === 'history'}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="{item.color}"/>
            </svg>
          {/if}
        </div>
        <div class="menu-text">
          <div class="menu-title">{item.title}</div>
          {#if item.subtitle}
            <div class="menu-subtitle">{item.subtitle}</div>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>

<!-- Scanner Component -->
<Scanner 
  bind:isOpen={showScanner}
  onScanSuccess={handleScanSuccess}
  onClose={handleScannerClose}
/>

<style>
  .menu-container {
    padding: 20px;
    background-color: white;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .menu-item {
    background: white;
    border: none;
    border-radius: 12px;
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .menu-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .menu-item:active {
    transform: translateY(-2px);
  }

  .menu-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-text {
    text-align: center;
  }

  .menu-title {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    line-height: 1.2;
  }

  .menu-subtitle {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    line-height: 1.2;
  }
</style>
