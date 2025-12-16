<script>
  import { navigateTo } from '../stores/navigation.js';

  let activeTab = 'my-vouchers'; // 'my-vouchers' or 'claim-vouchers'
  let selectedCategory = 'all';
  let searchQuery = '';
  
  // Lazy load state
  let displayedVouchers = [];
  let currentPage = 0;
  let itemsPerPage = 10;
  let isLoading = false;
  let hasMore = true;

  const categories = [
    { id: 'all', label: 'Semua', icon: 'percent' },
    { id: 'supermarket', label: 'Supermarket', icon: 'cart' },
    { id: 'fashion', label: 'Fashion', icon: 'shirt' },
    { id: 'food-beverage', label: 'Food & Beverage YOGYA Group', icon: 'food' },
    { id: 'food-court', label: 'Food Court', icon: 'restaurant' },
    { id: 'yogya-online', label: 'YOGYA Online', icon: 'gift' }
  ];

  // Generate 100 vouchers
  const brands = ['ABC', 'Serasoft', 'Vanish', 'Pepsodent', 'Indomie', 'Ultra Milk', 'Sunlight', 'Rinso', 'Molto', 'Daia'];
  const categoryTypes = ['SUPERMARKET', 'FASHION', 'FOOD & BEVERAGE', 'FOOD COURT', 'YOGYA ONLINE'];
  const emojis = ['🍯', '🧴', '🧼', '🦷', '🍜', '🥛', '🧽', '👕', '🍔', '🎁'];
  const products = [
    'Ss Gula Aren 9x27g',
    'SH Anti Dandruff/Hair Fall Hijab 3in1',
    'Cair Pink/White Refill 425ml',
    'Herbal/Whitening 190g Twin Pack',
    'Mie Goreng/Soto/Kari Ayam 5pcs',
    'Full Cream/Coklat 1L',
    'Pencuci Piring Jeruk 800ml',
    'Detergen Bubuk 1kg',
    'Pewangi Pakaian 900ml',
    'Fashion Item Diskon'
  ];

  // Generate all vouchers
  const allVouchers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    category: categoryTypes[i % categoryTypes.length],
    brand: brands[i % brands.length],
    product: products[i % products.length],
    discount: `Rp${(Math.floor(Math.random() * 20) + 1) * 1000}`,
    image: emojis[i % emojis.length],
    validFrom: '05 Dec 2025',
    validTo: '18 Dec 2025',
    claimed: true
  }));

  const myVouchers = allVouchers;

  // Manual render function (bypass broken Svelte reactivity)
  function renderVouchers(vouchers) {
    const container = document.querySelector('.voucher-cards-container');
    if (!container) {
      return;
    }
    
    vouchers.forEach((voucher, index) => {
      
      const card = document.createElement('div');
      card.className = 'voucher-card';
      card.innerHTML = `
        <div class="voucher-green-section">
          <div class="voucher-green-content">
            <div class="voucher-green-left">
              <span class="voucher-badge">${voucher.category}</span>
              <h3 class="voucher-brand">${voucher.brand}</h3>
              <p class="voucher-subtitle">${voucher.product.substring(0, 20)}...</p>
              <p class="voucher-discount">Diskon ${voucher.discount}</p>
            </div>
            <div class="voucher-icon">${voucher.image}</div>
          </div>
        </div>
        <div class="voucher-white-section">
          <p class="voucher-product-name">${voucher.product}</p>
          <div class="voucher-footer">
            <div class="voucher-date">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M11 1.5v1.333H5V1.5H3.667v1.333h-.834C2.007 2.833 1.333 3.507 1.333 4.333v9.334c0 .826.674 1.5 1.5 1.5h9.334c.826 0 1.5-.674 1.5-1.5V4.333c0-.826-.674-1.5-1.5-1.5h-.834V1.5H11zm1.333 12.167H3.667V6.5h8.666v7.167z" fill="#757575"/>
              </svg>
              <span>${voucher.validFrom} - ${voucher.validTo}</span>
            </div>
            <button class="claim-button">Tandai</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Initialize with first batch
  function loadMoreVouchers() {
    if (isLoading || !hasMore) {
      return;
    }
    
    isLoading = true;
    
    // Show loading indicator
    const loadingEl = document.querySelector('.loading-indicator');
    if (loadingEl) {
      loadingEl.style.display = 'flex';
    }
    
    // Simulate API delay
    setTimeout(() => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newVouchers = myVouchers.slice(startIndex, endIndex);
      
      // Render vouchers manually
      renderVouchers(newVouchers);
      
      displayedVouchers = [...displayedVouchers, ...newVouchers];
      currentPage++;
      hasMore = endIndex < myVouchers.length;
      isLoading = false;
      
      // Hide loading indicator
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      
      // Show/hide end message
      const endMsgEl = document.querySelector('.end-message');
      if (endMsgEl) {
        endMsgEl.style.display = !hasMore && displayedVouchers.length > 0 ? 'flex' : 'none';
      }
    }, 300);
  }
  
  // Load initial vouchers using requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    setTimeout(() => {
      loadMoreVouchers();
    }, 100);
  });
  
  // Infinite scroll handler
  function handleScroll(event) {
    const target = event.target;
    const scrollPosition = target.scrollTop + target.clientHeight;
    const scrollHeight = target.scrollHeight;
    
    // Load more when user scrolls near bottom (80%)
    if (scrollPosition >= scrollHeight * 0.8 && !isLoading && hasMore) {
      loadMoreVouchers();
    }
  }

  function handleSearch() {
    // Implement search logic
  }

  function handleCategoryClick(categoryId) {
    selectedCategory = categoryId;
  }

  function handleClaimVoucher(voucherId) {
    // Implement claim logic
  }
</script>

<div class="voucher-page">
  <!-- Header -->
  <div class="voucher-header">
    <button class="back-button" on:click={() => navigateTo('home')}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="white"/>
      </svg>
    </button>
    <h1 class="header-title">VOUCHER</h1>
  </div>

  <!-- Tabs -->
  <div class="tabs-container">
    <button 
      class="tab" 
      class:active={activeTab === 'my-vouchers'}
      on:click={() => activeTab = 'my-vouchers'}
    >
      VOUCHER SAYA (5)
    </button>
    <button 
      class="tab" 
      class:active={activeTab === 'claim-vouchers'}
      on:click={() => activeTab = 'claim-vouchers'}
    >
      KLAIM VOUCHER
    </button>
  </div>

  <!-- Search Bar -->
  <div class="search-container">
    <div class="search-box">
      <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#999"/>
      </svg>
      <input 
        type="text" 
        placeholder="Cari Voucher atau Kode !" 
        bind:value={searchQuery}
        on:keypress={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
    <button class="search-button" on:click={handleSearch}>
      CARI
    </button>
  </div>

  <div class="content-wrapper">
    <!-- Categories Sidebar -->
    <div class="categories-sidebar">
      {#each categories as category}
        <button 
          class="category-item" 
          class:active={selectedCategory === category.id}
          on:click={() => handleCategoryClick(category.id)}
        >
          <div class="category-icon">
            {#if category.icon === 'percent'}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.5 4C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4zm9 9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM5 19l14-14" stroke="#ff6347" stroke-width="2"/>
              </svg>
            {:else if category.icon === 'cart'}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="#ff6347"/>
              </svg>
            {:else if category.icon === 'shirt'}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 4l-4 4-4-4-4 4v12h16V8l-4-4zM12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" fill="#ff6347"/>
              </svg>
            {:else if category.icon === 'food'}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" fill="#ff6347"/>
              </svg>
            {:else if category.icon === 'restaurant'}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z" fill="#ff6347"/>
              </svg>
            {:else if category.icon === 'gift'}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" fill="#ff6347"/>
              </svg>
            {/if}
          </div>
          <span class="category-label">{category.label}</span>
        </button>
      {/each}
    </div>

    <!-- Voucher List -->
    <div class="vouchers-list" on:scroll={handleScroll}>
      {#if activeTab === 'my-vouchers'}
        <!-- Voucher cards container (filled manually via DOM) -->
        <div class="voucher-cards-container"></div>
        
        <!-- Loading indicator -->
        <div class="loading-indicator" style="display: none;">
          <div class="spinner"></div>
          <p>Memuat voucher...</p>
        </div>
        
        <!-- End message -->
        <div class="end-message" style="display: none;">
          <p>Semua voucher telah ditampilkan</p>
        </div>
      {:else}
        <div class="empty-state">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M60 20H50V10c0-2.76-2.24-5-5-5h-10c-2.76 0-5 2.24-5 5v10H20c-2.76 0-5 2.24-5 5v40c0 2.76 2.24 5 5 5h40c2.76 0 5-2.24 5-5V25c0-2.76-2.24-5-5-5zM35 10h10v10H35V10zm0 40v-20h10v20H35z" fill="#ddd"/>
          </svg>
          <h3>Belum Ada Voucher untuk Diklaim</h3>
          <p>Voucher baru akan muncul di sini</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .voucher-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 80px;
  }

  /* Header */
  .voucher-header {
    background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .back-button {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }

  .back-button:active {
    transform: scale(0.9);
  }

  .header-title {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin: 0;
    letter-spacing: 1px;
    flex: 1;
    text-align: center;
    margin-right: 36px; /* Balance the back button */
  }

  /* Tabs */
  .tabs-container {
    display: flex;
    background: white;
    border-bottom: 2px solid #f0f0f0;
  }

  .tab {
    flex: 1;
    padding: 16px;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: #999;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;
  }

  .tab.active {
    color: #ff6347;
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: #ff6347;
  }

  /* Search Bar */
  .search-container {
    display: flex;
    gap: 8px;
    padding: 16px;
    background: white;
    margin-bottom: 8px;
  }

  .search-box {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f5f5f5;
    border-radius: 24px;
    padding: 10px 16px;
  }

  .search-icon {
    flex-shrink: 0;
  }

  .search-box input {
    flex: 1;
    border: none;
    background: none;
    font-size: 14px;
    color: #333;
    outline: none;
  }

  .search-box input::placeholder {
    color: #999;
  }

  .search-button {
    background: #ff6347;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .search-button:hover {
    background: #ff5533;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 99, 71, 0.3);
  }

  .search-button:active {
    transform: translateY(0);
  }

  /* Content Wrapper */
  .content-wrapper {
    display: flex;
    gap: 8px;
  }

  /* Categories Sidebar */
  .categories-sidebar {
    width: 90px;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
  }

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 8px;
    background: none;
    border: none;
    border-left: 3px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .category-item.active {
    border-left-color: #ff6347;
    background: #fff5f3;
  }

  .category-item:hover {
    background: #f8f8f8;
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }

  .category-label {
    font-size: 10px;
    color: #666;
    text-align: center;
    line-height: 1.2;
    font-weight: 500;
  }

  .category-item.active .category-label {
    color: #ff6347;
    font-weight: 600;
  }

  /* Vouchers List */
  .vouchers-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px;
    overflow-y: auto;
    max-height: calc(100vh - 250px);
  }
  
  .voucher-cards-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Global styles for manually rendered vouchers */
  :global(.voucher-card) {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    transition: all 0.2s ease;
  }

  :global(.voucher-card:hover) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* Green Section (Top) */
  :global(.voucher-green-section) {
    background: linear-gradient(135deg, #00c853 0%, #00a843 100%);
    padding: 16px;
    position: relative;
  }

  :global(.voucher-green-content) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  :global(.voucher-green-left) {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  :global(.voucher-badge) {
    font-size: 10px;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.9;
    margin-bottom: 4px;
  }

  :global(.voucher-brand) {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    color: white;
    line-height: 1.2;
  }

  :global(.voucher-subtitle) {
    font-size: 13px;
    margin: 0;
    color: white;
    opacity: 0.9;
    line-height: 1.3;
  }

  :global(.voucher-discount) {
    font-size: 16px;
    font-weight: 700;
    margin: 6px 0 0 0;
    color: white;
  }

  :global(.voucher-icon) {
    width: 60px;
    height: 60px;
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* White Section (Bottom) */
  :global(.voucher-white-section) {
    background: white;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  :global(.voucher-product-name) {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    color: #212121;
    line-height: 1.3;
  }

  :global(.voucher-footer) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  :global(.voucher-date) {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #757575;
  }

  :global(.voucher-date svg) {
    flex-shrink: 0;
  }

  :global(.claim-button) {
    background: white;
    color: #1a237e;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  :global(.claim-button:hover) {
    background: #f5f5f5;
    border-color: #bdbdbd;
  }

  :global(.claim-button:active) {
    transform: scale(0.98);
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
  }

  .empty-state h3 {
    font-size: 18px;
    color: #666;
    margin: 16px 0 8px 0;
  }

  .empty-state p {
    font-size: 14px;
    color: #999;
    margin: 0;
  }

  /* Loading Indicator */
  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 20px;
    gap: 12px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #ff6347;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-indicator p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  /* End Message */
  .end-message {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 20px;
    text-align: center;
  }

  .end-message p {
    font-size: 14px;
    color: #999;
    font-weight: 500;
    margin: 0;
  }
</style>
