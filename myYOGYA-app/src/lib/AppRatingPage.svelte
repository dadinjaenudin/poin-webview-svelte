<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  let selectedRating = null; // 'disappointed' or 'satisfied'

  function goBack() {
    navigateToSubPage(null);
  }

  function selectRating(rating) {
    selectedRating = rating;
  }

  function handleSubmit() {
    if (selectedRating) {
      const ratingText = selectedRating === 'disappointed' ? 'Kecewa' : 'Puas';
      alert(`Terima kasih atas penilaian Anda: ${ratingText}`);
      // Reset and go back
      selectedRating = null;
      navigateToSubPage(null);
    }
  }
</script>

<div class="rating-page">
  <!-- Header -->
  <div class="header">
    <button class="back-button" on:click={goBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">Penilaian Aplikasi</h1>
    <div class="header-spacer"></div>
  </div>

  <!-- Content -->
  <div class="content">
    <!-- Question -->
    <div class="question-section">
      <p class="question-text">
        Bagaimana pengalamanmu ketika menggunakan aplikasi MyYOGYA?
      </p>
    </div>

    <!-- Rating Options -->
    <div class="rating-options">
      <!-- Disappointed Button -->
      <button 
        class="rating-button"
        class:selected={selectedRating === 'disappointed'}
        on:click={() => selectRating('disappointed')}
      >
        <div class="emoji-container">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Face Circle -->
            <circle cx="40" cy="40" r="38" fill="#E0E0E0" stroke="#CCC" stroke-width="2"/>
            
            <!-- Sad Eyes -->
            <!-- Left eye -->
            <path d="M25 32 L30 28" stroke="#666" stroke-width="3" stroke-linecap="round"/>
            <path d="M25 28 L30 32" stroke="#666" stroke-width="3" stroke-linecap="round"/>
            
            <!-- Right eye -->
            <path d="M50 32 L55 28" stroke="#666" stroke-width="3" stroke-linecap="round"/>
            <path d="M50 28 L55 32" stroke="#666" stroke-width="3" stroke-linecap="round"/>
            
            <!-- Sad Mouth (frown) -->
            <path d="M28 58 Q40 50 52 58" stroke="#666" stroke-width="3" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <span class="rating-label">Kecewa</span>
      </button>

      <!-- Satisfied Button -->
      <button 
        class="rating-button"
        class:selected={selectedRating === 'satisfied'}
        on:click={() => selectRating('satisfied')}
      >
        <div class="emoji-container">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Face Circle -->
            <circle cx="40" cy="40" r="38" fill="#E0E0E0" stroke="#CCC" stroke-width="2"/>
            
            <!-- Happy Eyes -->
            <!-- Left eye -->
            <path d="M25 32 Q27.5 28 30 32" stroke="#666" stroke-width="3" stroke-linecap="round" fill="none"/>
            
            <!-- Right eye -->
            <path d="M50 32 Q52.5 28 55 32" stroke="#666" stroke-width="3" stroke-linecap="round" fill="none"/>
            
            <!-- Happy Mouth (smile) -->
            <path d="M28 50 Q40 58 52 50" stroke="#666" stroke-width="3" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <span class="rating-label">Puas</span>
      </button>
    </div>

    <!-- Submit Button -->
    <button 
      class="submit-button"
      class:enabled={selectedRating !== null}
      disabled={selectedRating === null}
      on:click={handleSubmit}
    >
      Kirim
    </button>
  </div>
</div>

<style>
  .rating-page {
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
    padding: 40px 20px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Question Section */
  .question-section {
    margin-bottom: 50px;
    text-align: center;
    max-width: 400px;
  }

  .question-text {
    font-size: 15px;
    line-height: 1.6;
    color: #666;
    margin: 0;
  }

  /* Rating Options */
  .rating-options {
    display: flex;
    gap: 40px;
    margin-bottom: 80px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .rating-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
  }

  .rating-button:hover {
    background: #F5F5F5;
    transform: scale(1.05);
  }

  .rating-button.selected {
    background: #FFF5F0;
  }

  .rating-button.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid #FF6B35;
    border-radius: 12px;
    pointer-events: none;
  }

  .emoji-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rating-button.selected .emoji-container circle {
    fill: #FFE5D0;
  }

  .rating-label {
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }

  .rating-button.selected .rating-label {
    color: #FF6B35;
  }

  /* Submit Button */
  .submit-button {
    width: 100%;
    max-width: 300px;
    padding: 16px 32px;
    background: #CCC;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: not-allowed;
    transition: all 0.3s ease;
    margin-top: auto;
  }

  .submit-button.enabled {
    background: #FF6B35;
    cursor: pointer;
  }

  .submit-button.enabled:hover {
    background: #FF5722;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  .submit-button.enabled:active {
    transform: translateY(0);
  }

  /* Responsive */
  @media (max-width: 480px) {
    .rating-options {
      gap: 30px;
    }

    .question-text {
      font-size: 14px;
    }

    .emoji-container svg {
      width: 70px;
      height: 70px;
    }

    .rating-label {
      font-size: 14px;
    }
  }
</style>
