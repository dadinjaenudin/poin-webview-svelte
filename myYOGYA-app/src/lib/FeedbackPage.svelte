<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  let selectedRating = 2; // Default to middle (Biasa aja) - 0-4 scale
  let selectedStore = '';
  let feedbackText = '';
  let phoneNumber = '';

  const ratingOptions = [
    { id: 0, label: 'Kecewa Banget', emoji: '😡', color: '#FF3B30' },
    { id: 1, label: 'Kecewa', emoji: '😞', color: '#FF9500' },
    { id: 2, label: 'Biasa aja', emoji: '😐', color: '#FFCC00' },
    { id: 3, label: 'Cukup oke', emoji: '🙂', color: '#4CD964' },
    { id: 4, label: 'Mantap!', emoji: '😤', color: '#34C759' }
  ];

  const stores = [
    'YOGYA ONLINE STORE',
    'XPRESS YOGYA CENTER',
    'GRIYA HEMAT SOE-TA',
    'YOGYART MM BATUNUNGGAL',
    'YOGYA BOGOR TRADE MALL',
    'YOGYA SOREANG'
  ];

  function goBack() {
    navigateToSubPage(null);
  }

  function handleRatingChange(event) {
    selectedRating = parseInt(event.target.value);
  }

  function handleSubmit() {
    if (!selectedStore) {
      alert('Silakan pilih toko terlebih dahulu');
      return;
    }
    if (!feedbackText.trim()) {
      alert('Silakan isi kritik dan saran Anda');
      return;
    }

    const ratingLabel = ratingOptions[selectedRating].label;
    alert(`Terima kasih atas feedback Anda!\n\nRating: ${ratingLabel}\nToko: ${selectedStore}\nFeedback: ${feedbackText.substring(0, 50)}...`);
    
    // Reset form
    selectedRating = 2;
    selectedStore = '';
    feedbackText = '';
    phoneNumber = '';
    
    navigateToSubPage(null);
  }
</script>

<div class="feedback-page">
  <!-- Header with Gradient -->
  <div class="header-gradient">
    <button class="back-button" on:click={goBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">Ajukan Kritik dan Saran</h1>
  </div>

  <!-- Red Banner -->
  <div class="red-banner">
    <h2 class="banner-title">Halo Kak FENDI PRAMUDITO...</h2>
    <p class="banner-subtitle">Apakah ada kritik dan saran yang mau disampaikan?</p>
  </div>

  <!-- Content -->
  <div class="content">
    <!-- Rating Section -->
    <div class="rating-section">
      <h3 class="section-title">Apa yang kamu rasakan sekarang tentang layanan kami?</h3>
      
      <!-- Emoji Options -->
      <div class="emoji-container">
        {#each ratingOptions as option (option.id)}
          <div class="emoji-option" class:selected={selectedRating === option.id}>
            <div class="emoji-icon" style="font-size: {selectedRating === option.id ? '48px' : '40px'}">
              {option.emoji}
            </div>
            <span class="emoji-label" style="color: {selectedRating === option.id ? option.color : '#999'}">
              {option.label}
            </span>
          </div>
        {/each}
      </div>

      <!-- Range Slider -->
      <div class="slider-container">
        <input 
          type="range" 
          min="0" 
          max="4" 
          bind:value={selectedRating}
          on:input={handleRatingChange}
          class="rating-slider"
          style="--slider-color: {ratingOptions[selectedRating].color}"
        />
        <div class="slider-indicator" style="left: {(selectedRating / 4) * 100}%; background: {ratingOptions[selectedRating].color}"></div>
      </div>
    </div>

    <!-- Store Selection -->
    <div class="form-group">
      <label class="form-label">Toko</label>
      <div class="select-wrapper">
        <select bind:value={selectedStore} class="form-select">
          <option value="" disabled>Pilih Toko</option>
          {#each stores as store}
            <option value={store}>{store}</option>
          {/each}
        </select>
        <svg class="select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- Feedback Textarea -->
    <div class="form-group">
      <label class="form-label">Ceritakan pada kami apa yang kurang</label>
      <textarea 
        bind:value={feedbackText}
        class="form-textarea"
        placeholder="Ketik keluhan atau saran kamu disini..."
        rows="5"
      ></textarea>
    </div>

    <!-- Phone Number Input -->
    <div class="form-group">
      <label class="form-label">Nomor HP (optional)</label>
      <input 
        type="tel"
        bind:value={phoneNumber}
        class="form-input"
        placeholder="Masukkan nomor HP yang bisa dihubungi"
      />
    </div>

    <!-- Submit Button -->
    <button class="submit-button" on:click={handleSubmit}>
      Kirim
    </button>
  </div>
</div>

<style>
  .feedback-page {
    min-height: 100vh;
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }

  /* Header with Gradient */
  .header-gradient {
    background: linear-gradient(135deg, #FF6B35 0%, #FF3B30 50%, #C41E3A 100%);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .back-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .back-button:hover {
    opacity: 0.8;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin: 0;
    flex: 1;
  }

  /* Red Banner */
  .red-banner {
    background: linear-gradient(180deg, #E63946 0%, #C41E3A 100%);
    padding: 30px 20px;
    text-align: center;
    color: white;
  }

  .banner-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .banner-subtitle {
    font-size: 14px;
    margin: 0;
    opacity: 0.95;
  }

  /* Content */
  .content {
    flex: 1;
    padding: 20px;
  }

  /* Rating Section */
  .rating-section {
    background: white;
    border-radius: 12px;
    padding: 24px 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #FF6B35;
    margin: 0 0 24px 0;
    text-align: center;
  }

  /* Emoji Container */
  .emoji-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 8px;
  }

  .emoji-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
    transition: all 0.3s ease;
  }

  .emoji-icon {
    transition: all 0.3s ease;
  }

  .emoji-label {
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;
    line-height: 1.2;
  }

  /* Slider */
  .slider-container {
    position: relative;
    padding: 10px 0;
  }

  .rating-slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #E0E0E0;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  .rating-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--slider-color, #FF6B35);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    border: 3px solid white;
  }

  .rating-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--slider-color, #FF6B35);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    border: 3px solid white;
  }

  /* Form Groups */
  .form-group {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #FF6B35;
    margin-bottom: 12px;
  }

  /* Select Dropdown */
  .select-wrapper {
    position: relative;
  }

  .form-select {
    width: 100%;
    padding: 12px 40px 12px 16px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    background: white;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .form-select:focus {
    outline: none;
    border-color: #FF6B35;
  }

  .select-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  /* Textarea */
  .form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    font-family: inherit;
    resize: vertical;
  }

  .form-textarea:focus {
    outline: none;
    border-color: #FF6B35;
  }

  .form-textarea::placeholder {
    color: #999;
  }

  /* Input */
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
  }

  .form-input:focus {
    outline: none;
    border-color: #FF6B35;
  }

  .form-input::placeholder {
    color: #999;
  }

  /* Submit Button */
  .submit-button {
    width: 100%;
    padding: 16px;
    background: #FF6B35;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 24px;
  }

  .submit-button:hover {
    background: #FF5722;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  .submit-button:active {
    transform: translateY(0);
  }

  /* Responsive */
  @media (max-width: 480px) {
    .emoji-label {
      font-size: 10px;
    }

    .emoji-icon {
      font-size: 36px !important;
    }

    .emoji-option.selected .emoji-icon {
      font-size: 44px !important;
    }

    .banner-title {
      font-size: 18px;
    }

    .section-title {
      font-size: 14px;
    }
  }
</style>
