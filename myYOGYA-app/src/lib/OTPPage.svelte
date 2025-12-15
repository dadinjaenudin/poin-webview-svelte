<script>
  import { navigateToSubPage } from '../stores/navigation.js';
  import { onMount, onDestroy } from 'svelte';

  // OTP Code (would typically come from API)
  let otpCode = '640 767';
  
  // Timer countdown (in seconds)
  let timeRemaining = 17; // 17 seconds as shown in image
  let timerInterval;

  // Start countdown timer
  onMount(() => {
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
      } else {
        clearInterval(timerInterval);
        // Generate new OTP when timer expires
        generateNewOTP();
      }
    }, 1000);
  });

  // Cleanup timer on component destroy
  onDestroy(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });

  function generateNewOTP() {
    // Generate random 6-digit OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000);
    otpCode = newOTP.toString().slice(0, 3) + ' ' + newOTP.toString().slice(3);
    timeRemaining = 60; // Reset to 60 seconds
  }

  function copyOTPToClipboard() {
    const otpWithoutSpace = otpCode.replace(/\s/g, '');
    navigator.clipboard.writeText(otpWithoutSpace).then(() => {
      alert('Kode OTP berhasil disalin!');
    }).catch(err => {
      alert('Gagal menyalin kode OTP');
    });
  }

  function handleBack() {
    navigateToSubPage(null); // Go back to account page
  }
</script>

<div class="otp-page">
  <!-- Header -->
  <div class="otp-header">
    <button class="back-button" on:click={handleBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="white"/>
      </svg>
    </button>
    <h1 class="header-title">Kode OTP</h1>
    <div class="header-spacer"></div>
  </div>

  <!-- Avatar Section -->
  <div class="avatar-section">
    <div class="avatar-circle">
      <div class="avatar-image">
        <!-- Woman avatar illustration -->
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <!-- Head -->
          <circle cx="100" cy="80" r="35" fill="#D2A679"/>
          <!-- Hair -->
          <ellipse cx="100" cy="60" rx="40" ry="50" fill="#6B4423"/>
          <path d="M60 70 Q60 40 100 30 Q140 40 140 70" fill="#6B4423"/>
          <!-- Face features -->
          <circle cx="90" cy="75" r="3" fill="#333"/>
          <circle cx="110" cy="75" r="3" fill="#333"/>
          <path d="M85 85 Q100 90 115 85" stroke="#D2A679" stroke-width="2" fill="none"/>
          <!-- Body - shirt (pink) -->
          <path d="M70 115 L70 140 Q85 145 100 145 Q115 145 130 140 L130 115" fill="#FFB6C1"/>
          <!-- Collar -->
          <path d="M85 115 L90 125 L100 120 L110 125 L115 115" fill="#FFD4D4"/>
          <!-- Body - skirt (dark gray) -->
          <path d="M70 140 Q85 145 100 145 Q115 145 130 140 L130 180 Q100 185 70 180 Z" fill="#4A4A4A"/>
          <!-- Arm (left) -->
          <ellipse cx="65" cy="130" rx="8" ry="20" fill="#D2A679" transform="rotate(-20 65 130)"/>
          <!-- Arm (right) - waving -->
          <ellipse cx="145" cy="130" rx="8" ry="20" fill="#D2A679" transform="rotate(45 145 130)"/>
          <!-- Hand (right) -->
          <circle cx="155" cy="120" r="6" fill="#D2A679"/>
        </svg>
      </div>
    </div>
  </div>

  <!-- OTP Card -->
  <div class="otp-card">
    <!-- Info and Timer -->
    <div class="card-header">
      <div class="info-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#FF6347"/>
          <path d="M12 8v4m0 4h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="timer-badge">
        <svg class="timer-circle" width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="none" stroke="#FFE5DD" stroke-width="4"/>
          <circle 
            cx="30" 
            cy="30" 
            r="26" 
            fill="none" 
            stroke="#FF6347" 
            stroke-width="4"
            stroke-dasharray="{163.36}"
            stroke-dashoffset="{163.36 - (163.36 * timeRemaining / 60)}"
            transform="rotate(-90 30 30)"
            style="transition: stroke-dashoffset 1s linear;"
          />
        </svg>
        <span class="timer-text">{timeRemaining}</span>
      </div>
    </div>

    <!-- Title -->
    <h2 class="card-title">Kode OTP Anda</h2>

    <!-- Description -->
    <p class="card-description">
      Masukan kode OTP di bawah ini<br>untuk melakukan login.
    </p>

    <!-- OTP Code Display -->
    <button class="otp-code-box" on:click={copyOTPToClipboard}>
      <span class="otp-code">{otpCode}</span>
      <svg class="copy-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="#FF6347" stroke-width="2" fill="none"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#FF6347" stroke-width="2" fill="none"/>
      </svg>
    </button>

    <!-- Warning Text -->
    <p class="warning-text">
      Kode ini akan berganti setiap menit.
    </p>

    <!-- Disclaimer -->
    <p class="disclaimer-text">
      Mohon untuk tidak membagikan kode ini<br>kepada siapapun.
    </p>
  </div>
</div>

<style>
  .otp-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #FF6347 0%, #FF6347 45%, #F5F5F5 45%, #F5F5F5 100%);
    padding-bottom: 80px;
  }

  /* Header */
  .otp-header {
    background: transparent;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .back-button:active {
    opacity: 0.7;
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

  /* Avatar Section */
  .avatar-section {
    display: flex;
    justify-content: center;
    padding: 20px 0 40px 0;
  }

  .avatar-circle {
    width: 200px;
    height: 200px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .avatar-image {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* OTP Card */
  .otp-card {
    background: white;
    margin: 0 16px;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .info-icon {
    display: flex;
  }

  .timer-badge {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timer-circle {
    position: absolute;
    top: 0;
    left: 0;
  }

  .timer-text {
    font-size: 20px;
    font-weight: 700;
    color: #FF6347;
    z-index: 1;
  }

  .card-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0 0 12px 0;
    text-align: center;
  }

  .card-description {
    font-size: 14px;
    color: #666;
    text-align: center;
    line-height: 1.6;
    margin: 0 0 24px 0;
  }

  /* OTP Code Box */
  .otp-code-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: white;
    border: 2px solid #FF6347;
    border-radius: 12px;
    padding: 16px 24px;
    margin: 0 auto 16px auto;
    max-width: 280px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .otp-code-box:hover {
    background: #FFF5F3;
    transform: scale(1.02);
  }

  .otp-code-box:active {
    transform: scale(0.98);
  }

  .otp-code {
    font-size: 36px;
    font-weight: 700;
    color: #FF6347;
    letter-spacing: 4px;
  }

  .copy-icon {
    flex-shrink: 0;
  }

  .warning-text {
    font-size: 13px;
    color: #666;
    text-align: center;
    margin: 0 0 12px 0;
  }

  .disclaimer-text {
    font-size: 13px;
    color: #999;
    text-align: center;
    line-height: 1.6;
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 360px) {
    .avatar-circle {
      width: 160px;
      height: 160px;
    }

    .avatar-image {
      width: 140px;
      height: 140px;
    }

    .otp-code {
      font-size: 30px;
    }
  }
</style>
