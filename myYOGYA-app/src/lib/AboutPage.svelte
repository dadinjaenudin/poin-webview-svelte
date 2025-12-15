<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  function goBack() {
    navigateToSubPage(null);
  }
</script>

<div class="about-page">
  <!-- Header -->
  <div class="header">
    <button class="back-button" on:click={goBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">Tentang MyYOGYA</h1>
    <div class="header-spacer"></div>
  </div>

  <!-- Content -->
  <div class="content">
    <!-- Logo -->
    <div class="logo-container">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- MyYOGYA Logo -->
        <g transform="translate(20, 10)">
          <!-- Y Shape with Colors -->
          <!-- Left Green Part -->
          <path d="M20 20 L35 20 L35 35 L20 50 Z" fill="#00A651"/>
          
          <!-- Top Yellow Part -->
          <path d="M20 20 L35 20 L50 5 L35 5 Z" fill="#FDB813"/>
          
          <!-- Right Red/Orange Part -->
          <path d="M50 5 L65 20 L50 35 L35 20 Z" fill="#ED1C24"/>
          
          <!-- Bottom Orange Part -->
          <path d="M35 35 L50 35 L65 50 L50 50 Z" fill="#F7941D"/>
          
          <!-- Center piece -->
          <path d="M35 20 L50 35 L35 35 Z" fill="#F15A29"/>
        </g>
        
        <!-- MyYOGYA Text -->
        <text x="40" y="95" font-family="Georgia, serif" font-size="14" font-style="italic" fill="#8B7355">My</text>
        <text x="55" y="95" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ED1C24">YOGYA</text>
      </svg>
    </div>

    <!-- About Text -->
    <div class="about-text">
      <p class="paragraph">
        PT. Akur Pratama (YOGYA Group) adalah perusahaan ritel modern asli Indonesia dengan format Supermarket dan Department Store. YOGYA Group selalu berusaha menyajikan produk-produk yang berkualitas, unggul layanan, akrab bersahabat serta suasana belanja yang menyenangkan, sesuai dengan visi kami yaitu ingin memenuhi kebutuhan masyarakat.
      </p>

      <p class="paragraph">
        MyYOGYA hadir sebagai aplikasi membership digital dari YOGYA Group untuk memberikan pengalaman baru dan kemudahan bagi konsumen YOGYA. Dengan aplikasi ini, konsumen akan mendapatkan virtual YOGYA Card yang dapat digunakan di gerai YOGYA dan Griya bertanda "SCAN MY YOGYA DISINI", mengakses website/aplikasi milik YOGYA Group, mendapatkan informasi tentang beragam penawaran promo, serta mendapatkan berbagai voucher menarik.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="copyright">Copyright © 2025. YOGYA Group. All rights reserved.</p>
    </div>
  </div>
</div>

<style>
  .about-page {
    min-height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
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
    margin-right: 12px;
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
  }

  .header-spacer {
    width: 40px;
  }

  /* Content */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 30px 20px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Logo */
  .logo-container {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* About Text */
  .about-text {
    max-width: 600px;
    width: 100%;
  }

  .paragraph {
    font-size: 14px;
    line-height: 1.8;
    color: #999;
    margin: 0 0 20px 0;
    text-align: justify;
  }

  .paragraph:last-child {
    margin-bottom: 40px;
  }

  /* Footer */
  .footer {
    margin-top: auto;
    padding-top: 30px;
    border-top: 1px solid #eee;
    width: 100%;
    max-width: 600px;
  }

  .copyright {
    font-size: 12px;
    color: #999;
    text-align: left;
    margin: 0;
    line-height: 1.6;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .content {
      padding: 20px 16px 100px;
    }

    .logo-container svg {
      width: 100px;
      height: 100px;
    }

    .paragraph {
      font-size: 13px;
    }

    .copyright {
      font-size: 11px;
    }
  }
</style>
