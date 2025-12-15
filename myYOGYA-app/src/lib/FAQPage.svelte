<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  let expandedItems = [];

  const faqItems = [
    {
      id: 1,
      question: 'Apa itu MyYOGYA?',
      preview: 'MyYOGYA adalah sebuah aplikasi yang m...',
      answer: 'MyYOGYA adalah sebuah aplikasi yang memudahkan pelanggan untuk mendapatkan informasi promo, mengakses virtual YOGYA Card, scan barcode member, dan mendapatkan berbagai voucher menarik dari YOGYA Group.'
    },
    {
      id: 2,
      question: 'Aplikasi MyYOGYA dapat digunakan untuk apa saja?',
      preview: 'MyYOGYA memiliki tagline "YOGYA Dalam ...',
      answer: 'MyYOGYA memiliki tagline "YOGYA Dalam Genggaman". Dengan aplikasi ini, Anda dapat:\n\n• Melihat informasi promo terbaru dari YOGYA Group\n• Menggunakan virtual YOGYA Card untuk berbelanja\n• Scan barcode member di kasir tanpa kartu fisik\n• Mendapatkan voucher dan diskon eksklusif\n• Melihat riwayat transaksi\n• Mencari lokasi toko YOGYA terdekat'
    },
    {
      id: 3,
      question: 'Bagaimana cara menggunakan fasilitas Scan tanpa kartu?',
      preview: 'Tunjukkan barcode member Anda yang t...',
      answer: 'Tunjukkan barcode member Anda yang terdapat di aplikasi MyYOGYA kepada kasir saat melakukan pembayaran. Kasir akan melakukan scan barcode tersebut untuk mendapatkan point loyalitas dan diskon member. Pastikan barcode Anda terlihat jelas dan tidak tertutup.'
    },
    {
      id: 4,
      question: 'Aplikasi MyYOGYA berlaku dimana saja?',
      preview: 'Aplikasi MyYOGYA berlaku di seluruh caba...',
      answer: 'Aplikasi MyYOGYA berlaku di seluruh cabang YOGYA Group yang memiliki fasilitas "SCAN MY YOGYA DISINI", termasuk:\n\n• YOGYA Department Store\n• YOGYA Supermarket\n• Griya\n• YOGYA Online Store\n\nPastikan toko yang Anda kunjungi memiliki logo "SCAN MY YOGYA DISINI" di kasir.'
    },
    {
      id: 5,
      question: 'Fitur apa saja yang ada di menu "BERANDA"?',
      preview: 'Pada menu "BERANDA" Anda dapat denga...',
      answer: 'Pada menu "BERANDA" Anda dapat dengan mudah mengakses berbagai fitur seperti:\n\n• Scanner barcode member\n• Informasi promo mingguan terbaru\n• Video tutorial dan tips belanja\n• Akses cepat ke menu utama (Scan, Loyalty, Voucher, History)\n• Insights dan rekomendasi produk\n• Banner promo special'
    },
    {
      id: 6,
      question: 'Apakah saya bisa mendapatkan informasi promo di aplikasi MyYOGYA?',
      preview: 'Ya. Anda bisa mendapatkan informasi pro...',
      answer: 'Ya. Anda bisa mendapatkan informasi promo terbaru melalui aplikasi MyYOGYA. Informasi promo dapat Anda lihat di:\n\n• Halaman Beranda (banner promo)\n• Section Promo Mingguan\n• Tab Voucher untuk voucher digital\n• Notifikasi push untuk promo eksklusif\n• Tab Loyalty untuk point dan reward\n\nPastikan notifikasi aplikasi aktif agar tidak ketinggalan promo menarik!'
    }
  ];

  function goBack() {
    navigateToSubPage(null);
  }

  function toggleItem(itemId) {
    if (expandedItems.includes(itemId)) {
      expandedItems = expandedItems.filter(id => id !== itemId);
    } else {
      expandedItems = [...expandedItems, itemId];
    }
  }

  function isExpanded(itemId) {
    return expandedItems.includes(itemId);
  }
</script>

<div class="faq-page">
  <!-- Header -->
  <div class="header">
    <button class="back-button" on:click={goBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">FAQ</h1>
    <div class="header-spacer"></div>
  </div>

  <!-- Content -->
  <div class="content">
    <!-- FAQ Items -->
    <div class="faq-list">
      {#each faqItems as item (item.id)}
        <div class="faq-item" class:expanded={isExpanded(item.id)}>
          <button class="faq-header" on:click={() => toggleItem(item.id)}>
            <div class="faq-text">
              <h3 class="faq-question">{item.question}</h3>
              {#if !isExpanded(item.id)}
                <p class="faq-preview">{item.preview}</p>
              {/if}
            </div>
            <div class="faq-icon" class:rotated={isExpanded(item.id)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
          
          {#if isExpanded(item.id)}
            <div class="faq-answer">
              <p class="answer-text">{item.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .faq-page {
    min-height: 100vh;
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
    background: white;
    position: sticky;
    top: 0;
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
    padding: 16px;
  }

  /* FAQ List */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* FAQ Item */
  .faq-item {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .faq-item.expanded {
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }

  /* FAQ Header (clickable) */
  .faq-header {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    gap: 16px;
    transition: background 0.2s ease;
  }

  .faq-header:hover {
    background: #FAFAFA;
  }

  .faq-text {
    flex: 1;
  }

  .faq-question {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .faq-preview {
    font-size: 13px;
    color: #999;
    margin: 0;
    line-height: 1.5;
  }

  /* FAQ Icon */
  .faq-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .faq-icon.rotated {
    transform: rotate(180deg);
  }

  /* FAQ Answer (expanded state) */
  .faq-answer {
    padding: 0 20px 20px 20px;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .answer-text {
    font-size: 14px;
    line-height: 1.8;
    color: #666;
    margin: 0;
    white-space: pre-line;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .faq-question {
      font-size: 14px;
    }

    .faq-preview {
      font-size: 12px;
    }

    .answer-text {
      font-size: 13px;
    }

    .faq-header {
      padding: 16px;
    }

    .faq-answer {
      padding: 0 16px 16px 16px;
    }
  }
</style>
