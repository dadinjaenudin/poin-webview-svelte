<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  let selectedStores = [];

  const nearbyStores = [
    { id: 1, name: 'YOGYA ONLINE STORE', distance: '30 m' },
    { id: 2, name: 'XPRESS YOGYA CENTER', distance: '73 m' },
    { id: 3, name: 'GRIYA HEMAT SOE-TA', distance: '320 m' },
    { id: 4, name: 'YOGYART MM BATUNUNGGAL', distance: '705 m' },
    { id: 5, name: 'YOGYA BOGOR TRADE MALL', distance: '1.2 km' },
  ];

  function goBack() {
    navigateToSubPage(null);
  }

  function handleSkip() {
    // Skip recommendation settings
    navigateToSubPage(null);
  }

  function toggleStore(storeId) {
    if (selectedStores.includes(storeId)) {
      selectedStores = selectedStores.filter(id => id !== storeId);
    } else {
      selectedStores = [...selectedStores, storeId];
    }
  }

  function handleContinue() {
    if (selectedStores.length > 0) {
      alert(`Toko favorit dipilih: ${selectedStores.length} toko`);
      navigateToSubPage(null);
    } else {
      alert('Silakan pilih minimal 1 toko favorit');
    }
  }
</script>

<div class="recommendation-page">
  <!-- Header -->
  <div class="header">
    <button class="back-button" on:click={goBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">Atur Rekomendasi</h1>
    <button class="skip-button" on:click={handleSkip}>SKIP</button>
  </div>

  <!-- Content -->
  <div class="content">
    <!-- Illustration -->
    <div class="illustration">
      <svg width="300" height="180" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="300" height="180" fill="#FFF5F0"/>
        
        <!-- Store Counter/Ceiling -->
        <rect x="200" y="30" width="80" height="100" fill="#FFE5D0"/>
        
        <!-- Hanging Lights -->
        <g>
          <line x1="180" y1="40" x2="180" y2="60" stroke="#FFB366" stroke-width="2"/>
          <circle cx="175" cy="65" r="5" fill="#FFB366"/>
          <circle cx="180" cy="65" r="5" fill="#FFB366"/>
          <circle cx="185" cy="65" r="5" fill="#FFB366"/>
        </g>
        <g>
          <line x1="280" y1="40" x2="280" y2="60" stroke="#FFB366" stroke-width="2"/>
          <circle cx="275" cy="65" r="5" fill="#FFB366"/>
          <circle cx="280" cy="65" r="5" fill="#FFB366"/>
          <circle cx="285" cy="65" r="5" fill="#FFB366"/>
        </g>

        <!-- Person 1 (Man with shopping cart) -->
        <g transform="translate(40, 90)">
          <!-- Body -->
          <rect x="10" y="30" width="20" height="35" rx="3" fill="#7B7B7B"/>
          <!-- Head -->
          <circle cx="20" cy="20" r="12" fill="#FFD4A3"/>
          <!-- Hair -->
          <path d="M15 15 Q20 10 25 15" fill="#5A5A5A"/>
          <!-- Arms -->
          <rect x="5" y="35" width="8" height="20" rx="4" fill="#FFD4A3"/>
          <rect x="27" y="35" width="8" height="20" rx="4" fill="#FFD4A3"/>
          <!-- Legs -->
          <rect x="12" y="65" width="7" height="25" rx="3" fill="#4A4A4A"/>
          <rect x="21" y="65" width="7" height="25" rx="3" fill="#4A4A4A"/>
        </g>

        <!-- Person 2 (Woman with pink top) -->
        <g transform="translate(90, 85)">
          <!-- Body -->
          <rect x="10" y="30" width="20" height="35" rx="3" fill="#FFB5D5"/>
          <!-- Head -->
          <circle cx="20" cy="20" r="12" fill="#FFD4A3"/>
          <!-- Hair -->
          <path d="M15 12 Q20 8 25 12 L25 22 Q20 25 15 22 Z" fill="#8B4513"/>
          <!-- Arms -->
          <rect x="5" y="35" width="8" height="20" rx="4" fill="#FFD4A3"/>
          <rect x="27" y="35" width="8" height="20" rx="4" fill="#FFD4A3"/>
          <!-- Legs -->
          <rect x="12" y="65" width="7" height="25" rx="3" fill="#4169E1"/>
          <rect x="21" y="65" width="7" height="25" rx="3" fill="#4169E1"/>
        </g>

        <!-- Shopping Cart -->
        <g transform="translate(35, 110)">
          <rect x="0" y="0" width="25" height="20" fill="none" stroke="#666" stroke-width="2"/>
          <line x1="5" y1="20" x2="8" y2="30" stroke="#666" stroke-width="2"/>
          <line x1="20" y1="20" x2="17" y2="30" stroke="#666" stroke-width="2"/>
          <circle cx="8" cy="32" r="3" fill="#666"/>
          <circle cx="17" cy="32" r="3" fill="#666"/>
        </g>

        <!-- Person 3 (Woman with blue outfit and shopping bag) -->
        <g transform="translate(160, 85)">
          <!-- Body -->
          <rect x="10" y="30" width="20" height="35" rx="3" fill="#87CEEB"/>
          <!-- Head -->
          <circle cx="20" cy="20" r="12" fill="#FFD4A3"/>
          <!-- Hair -->
          <path d="M15 12 Q20 8 25 12 L25 22 Q20 25 15 22 Z" fill="#654321"/>
          <!-- Arms -->
          <rect x="5" y="35" width="8" height="20" rx="4" fill="#FFD4A3"/>
          <rect x="27" y="35" width="8" height="20" rx="4" fill="#FFD4A3"/>
          <!-- Legs -->
          <rect x="12" y="65" width="7" height="25" rx="3" fill="#4682B4"/>
          <rect x="21" y="65" width="7" height="25" rx="3" fill="#4682B4"/>
          <!-- Shopping bag -->
          <rect x="-5" y="45" width="12" height="15" fill="#FFD700"/>
        </g>

        <!-- Counter Staff (2 people) -->
        <g transform="translate(220, 85)">
          <!-- Staff 1 -->
          <circle cx="15" cy="15" r="10" fill="#FFD4A3"/>
          <rect x="8" y="25" width="14" height="25" rx="2" fill="#FF6B35"/>
          
          <!-- Staff 2 -->
          <circle cx="45" cy="15" r="10" fill="#FFD4A3"/>
          <rect x="38" y="25" width="14" height="25" rx="2" fill="#8BC34A"/>
        </g>

        <!-- Person 4 (Woman in green dress) -->
        <g transform="translate(260, 90)">
          <!-- Body (dress) -->
          <path d="M15 30 L10 65 L30 65 L25 30 Z" fill="#90EE90"/>
          <!-- Head -->
          <circle cx="20" cy="20" r="12" fill="#FFD4A3"/>
          <!-- Hair -->
          <path d="M15 12 Q20 8 25 12 L25 22 Q20 25 15 22 Z" fill="#8B4513"/>
          <!-- Arms -->
          <rect x="5" y="35" width="8" height="18" rx="4" fill="#FFD4A3"/>
          <rect x="27" y="35" width="8" height="18" rx="4" fill="#FFD4A3"/>
          <!-- Legs -->
          <rect x="13" y="65" width="6" height="22" rx="3" fill="#FFD4A3"/>
          <rect x="21" y="65" width="6" height="22" rx="3" fill="#FFD4A3"/>
          <!-- Shopping bag -->
          <rect x="32" y="50" width="15" height="20" fill="#87CEEB"/>
        </g>
      </svg>
    </div>

    <!-- Title Section -->
    <div class="title-section">
      <h2 class="main-title">Ayo, pilih toko YOGYA favoritmu yang paling sering kamu kunjungi!</h2>
      <p class="subtitle">Kamu bisa memilih lebih dari 1</p>
    </div>

    <!-- Store List Section -->
    <div class="store-section">
      <h3 class="section-title">Toko Terdekat</h3>
      
      <div class="store-list">
        {#each nearbyStores as store (store.id)}
          <button 
            class="store-item"
            class:selected={selectedStores.includes(store.id)}
            on:click={() => toggleStore(store.id)}
          >
            <div class="store-info">
              <span class="store-name">{store.name}</span>
              <span class="store-distance">({store.distance})</span>
            </div>
            <div class="radio-button" class:checked={selectedStores.includes(store.id)}>
              {#if selectedStores.includes(store.id)}
                <div class="radio-inner"></div>
              {/if}
            </div>
          </button>
        {/each}
      </div>

      <!-- Continue Button -->
      <button class="continue-button" on:click={handleContinue}>
        LANJUT
      </button>

      <!-- Pagination -->
      <div class="pagination">2 dari 2</div>
    </div>
  </div>
</div>

<style>
  .recommendation-page {
    min-height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  }

  .back-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  .back-button:hover {
    opacity: 0.7;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
    flex: 1;
    text-align: center;
  }

  .skip-button {
    background: none;
    border: none;
    color: #FF6B35;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 12px;
  }

  .skip-button:hover {
    opacity: 0.8;
  }

  /* Content */
  .content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 100px;
  }

  .illustration {
    display: flex;
    justify-content: center;
    padding: 20px;
    background: #FFF5F0;
  }

  .illustration svg {
    max-width: 100%;
    height: auto;
  }

  /* Title Section */
  .title-section {
    padding: 30px 20px 20px;
    text-align: center;
  }

  .main-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0 0 12px 0;
    line-height: 1.4;
  }

  .subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  /* Store Section */
  .store-section {
    padding: 0 20px 20px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #FF6B35;
    margin: 0 0 16px 0;
  }

  .store-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .store-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: white;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
  }

  .store-item:hover {
    border-color: #FF6B35;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
  }

  .store-item.selected {
    border-color: #FF6B35;
    background: #FFF5F0;
  }

  .store-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .store-name {
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }

  .store-distance {
    font-size: 14px;
    color: #999;
  }

  .radio-button {
    width: 24px;
    height: 24px;
    border: 2px solid #CCC;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .radio-button.checked {
    border-color: #FF6B35;
  }

  .radio-inner {
    width: 12px;
    height: 12px;
    background: #FF6B35;
    border-radius: 50%;
  }

  /* Continue Button */
  .continue-button {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    display: block;
    padding: 14px 32px;
    background: #FF6B35;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .continue-button:hover {
    background: #FF5722;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  .continue-button:active {
    transform: translateY(0);
  }

  /* Pagination */
  .pagination {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .main-title {
      font-size: 18px;
    }

    .store-name {
      font-size: 14px;
    }

    .illustration svg {
      width: 100%;
      max-width: 280px;
    }
  }
</style>
