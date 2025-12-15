<script>
  // Sample data - in production, this would come from API
  const userData = {
    points: 203,
    memberNumber: '8800 4774 2244',
    expiryDate: '31 Desember 2026'
  };

  const rewardItems = [
    {
      id: 1,
      name: '5 PCS INDOMIE GRG SPC',
      points: 250,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'GULA PASIR 1KG LOKAL',
      points: 350,
      image: 'https://images.unsplash.com/photo-1587735243475-46d2860e0c2e?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'VOUCHER BELANJA',
      points: 500,
      image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'BIMOLI 2L',
      points: 750,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop'
    }
  ];

  import { navigateTo } from '../stores/navigation.js';

  function handleBack() {
    navigateTo('home');
  }

  function handleInfoClick() {
    alert('Informasi tentang MyYOGYA Poin:\n\nPoin Anda dapat digunakan untuk menukar berbagai hadiah menarik!');
  }
</script>

<div class="loyalty-page">
  <!-- Header -->
  <header class="page-header">
    <button class="back-btn" on:click={handleBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#333"/>
      </svg>
    </button>
    <h1 class="page-title">MyYOGYA Poin</h1>
    <div class="header-spacer"></div>
  </header>

  <!-- Member Card -->
  <div class="member-card">
    <div class="card-content">
      <div class="card-header">
        <div class="logo-section">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <div class="logo-text">MyYOGYA POIN</div>
        </div>
        <button class="info-btn" on:click={handleInfoClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </button>
      </div>
      
      <div class="card-body">
        <div class="points-section">
          <div class="points-value">{userData.points}</div>
          <div class="points-label">Poin</div>
        </div>
        <div class="member-section">
          <div class="member-label">Nomor Member</div>
          <div class="member-number">{userData.memberNumber}</div>
        </div>
      </div>
    </div>
    
    <div class="expiry-notice">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff6b35">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>
      <span>{userData.points} poin akan hangus pada {userData.expiryDate}</span>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="action-buttons">
    <button class="action-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#d32f2f">
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
      </svg>
      <span>Riwayat Poin</span>
    </button>
    <button class="action-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#d32f2f">
        <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
      </svg>
      <span>Kode Redeem</span>
    </button>
  </div>

  <!-- Rewards Section -->
  <div class="rewards-section">
    <div class="section-header">
      <h2 class="section-title">Hadiah</h2>
      <p class="section-subtitle">Tukar poinmu dengan beragam hadiah menarik!</p>
    </div>

    <div class="rewards-grid">
      {#each rewardItems as item}
        <div class="reward-card">
          <div class="reward-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div class="reward-info">
            <h3 class="reward-name">{item.name}</h3>
            <div class="reward-points">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#d32f2f">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>{item.points} Poin</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .loyalty-page {
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 80px;
  }

  /* Header */
  .page-header {
    background: white;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .back-btn {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .back-btn:active {
    background: #f0f0f0;
  }

  .page-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .header-spacer {
    width: 40px;
  }

  /* Member Card */
  .member-card {
    margin: 16px 16px 20px 16px;
  }

  .card-content {
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
    color: white;
    font-style: italic;
  }

  .info-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }

  .info-btn:active {
    background: rgba(255, 255, 255, 0.3);
  }

  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .points-section {
    flex: 1;
  }

  .points-value {
    font-size: 48px;
    font-weight: 700;
    color: white;
    line-height: 1;
    margin-bottom: 4px;
  }

  .points-label {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  .member-section {
    text-align: right;
  }

  .member-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 4px;
  }

  .member-number {
    font-size: 16px;
    font-weight: 600;
    color: white;
    font-family: 'Courier New', monospace;
  }

  .expiry-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 12px;
    font-size: 13px;
    color: #666;
  }

  /* Action Buttons */
  .action-buttons {
    display: flex;
    gap: 12px;
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .action-btn {
    flex: 1;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-btn:active {
    transform: scale(0.98);
    background: #f5f5f5;
  }

  .action-btn span {
    font-size: 13px;
    font-weight: 500;
    color: #333;
  }

  /* Rewards Section */
  .rewards-section {
    background: white;
    padding: 20px 16px;
  }

  .section-header {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0 0 4px 0;
  }

  .section-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  .rewards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .reward-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }

  .reward-card:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .reward-image {
    width: 100%;
    height: 140px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .reward-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .reward-info {
    padding: 12px;
  }

  .reward-name {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
    line-height: 1.4;
    height: 36px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .reward-points {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #d32f2f;
    font-size: 14px;
    font-weight: 600;
  }
</style>
