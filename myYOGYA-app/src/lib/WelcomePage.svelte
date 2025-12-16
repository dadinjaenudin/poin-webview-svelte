<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleLogin() {
    dispatch('login');
  }
  
  function handleRegister() {
    dispatch('register');
  }
  
  function handleAbout() {
    // Navigate to about page
    window.location.hash = '#about';
  }
  
  function handleFAQ() {
    // Navigate to FAQ page
    window.location.hash = '#faq';
  }
</script>

<div class="welcome-page">
  <div class="content">
    <!-- Profile Avatar -->
    <div class="avatar-container">
      <div class="avatar">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    </div>

    <!-- Greeting -->
    <h1 class="greeting">Hai, YO People!</h1>

    <!-- Login Card -->
    <div class="action-card">
      <div class="card-content">
        <h3 class="card-title">Masuk ke Akun Anda</h3>
        <p class="card-description">Apabila Anda sudah memiliki akun MyYOGYA.</p>
      </div>
      <button class="action-btn primary" on:click={handleLogin}>
        MASUK
      </button>
    </div>

    <!-- Register Card -->
    <div class="action-card">
      <div class="card-content">
        <h3 class="card-title">Daftar Sekarang</h3>
        <p class="card-description">Silakan mendaftar jika belum memiliki akun MyYOGYA.</p>
      </div>
      <button class="action-btn secondary" on:click={handleRegister}>
        DAFTAR
      </button>
    </div>

    <!-- Menu Links -->
    <div class="menu-links">
      <button class="menu-link" on:click={handleAbout}>
        <div class="link-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#999">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <span class="link-text">Tentang MyYOGYA</span>
        <svg class="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="#999">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <button class="menu-link" on:click={handleFAQ}>
        <div class="link-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#999">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        </div>
        <span class="link-text">FAQ</span>
        <svg class="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="#999">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>

    <!-- Version Info -->
    <div class="version-info">
      38,70ms (Satisfied)
    </div>
  </div>
</div>

<style>
  .welcome-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
    padding-top: 60px;
  }

  /* Avatar */
  .avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
  }

  /* Greeting */
  .greeting {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin: 0 0 40px 0;
  }

  /* Action Cards */
  .action-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
  }

  .action-card:active {
    transform: scale(0.98);
  }

  .card-content {
    flex: 1;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin: 0 0 6px 0;
  }

  .card-description {
    font-size: 13px;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  .action-btn {
    padding: 12px 28px;
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    letter-spacing: 0.5px;
  }

  .action-btn.primary {
    background: linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  .action-btn.primary:hover {
    box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
    transform: translateY(-2px);
  }

  .action-btn.primary:active {
    transform: translateY(0);
  }

  .action-btn.secondary {
    background: white;
    color: #ff6b35;
    border: 2px solid #ff6b35;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .action-btn.secondary:hover {
    background: #fff5f0;
  }

  .action-btn.secondary:active {
    transform: scale(0.95);
  }

  /* Menu Links */
  .menu-links {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
  }

  .menu-link {
    background: white;
    border: none;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .menu-link:hover {
    background: #f8f9fa;
  }

  .menu-link:active {
    background: #f0f0f0;
  }

  .link-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .link-text {
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    color: #333;
    text-align: left;
  }

  .link-arrow {
    flex-shrink: 0;
  }

  /* Version Info */
  .version-info {
    margin-top: auto;
    padding-top: 32px;
    text-align: center;
    font-size: 13px;
    color: #999;
    font-weight: 500;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .content {
      padding-top: 40px;
    }

    .greeting {
      font-size: 24px;
      margin-bottom: 32px;
    }

    .avatar {
      width: 90px;
      height: 90px;
    }

    .action-card {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
    }

    .action-btn {
      width: 100%;
      padding: 14px 20px;
    }

    .card-content {
      margin-bottom: 12px;
    }
  }
</style>
