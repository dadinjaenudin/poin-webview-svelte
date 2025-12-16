<script>
  import { createEventDispatcher, onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let testing = true;
  let speed = 0;
  let p95Speed = 0;
  let connectionStatus = 'testing'; // 'testing', 'good', 'moderate', 'poor'

  onMount(() => {
    // Simulate connection test
    setTimeout(() => {
      // Generate random speed between 1-5 MBps
      speed = (Math.random() * 4 + 1).toFixed(2);
      p95Speed = (speed * 0.9).toFixed(2);
      
      // Determine connection status based on speed
      if (speed >= 2.0) {
        connectionStatus = 'good';
      } else if (speed >= 1.0) {
        connectionStatus = 'moderate';
      } else {
        connectionStatus = 'poor';
      }
      
      testing = false;
    }, 2000);
  });

  function closeModal() {
    dispatch('close');
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<div class="modal-overlay" on:click={handleOverlayClick}>
  <div class="modal-card">
    <!-- Close Button -->
    <button class="close-button" on:click={closeModal}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6L18 18" stroke="#666" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    {#if testing}
      <!-- Testing State -->
      <div class="modal-content">
        <h2 class="modal-title testing">Mengetes Koneksi...</h2>
        
        <!-- Loading Spinner -->
        <div class="loading-container">
          <div class="spinner"></div>
        </div>
        
        <p class="modal-subtitle">Mohon tunggu sebentar</p>
      </div>
    {:else}
      <!-- Result State -->
      <div class="modal-content">
        {#if connectionStatus === 'good'}
          <h2 class="modal-title good">Kondisi Jaringan Perangkatmu Bagus!</h2>
        {:else if connectionStatus === 'moderate'}
          <h2 class="modal-title moderate">Kondisi Jaringan Perangkatmu Cukup Baik</h2>
        {:else}
          <h2 class="modal-title poor">Kondisi Jaringan Perangkatmu Kurang Baik</h2>
        {/if}

        <!-- Emoji Icon -->
        <div class="emoji-container">
          {#if connectionStatus === 'good'}
            <!-- Happy Face -->
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Green Circle Border -->
              <circle cx="60" cy="60" r="58" fill="#FFD93D" stroke="#4CAF50" stroke-width="4"/>
              
              <!-- Eyes -->
              <circle cx="45" cy="50" r="8" fill="#8B4513"/>
              <circle cx="75" cy="50" r="8" fill="#8B4513"/>
              
              <!-- Sparkles in eyes -->
              <circle cx="43" cy="47" r="3" fill="white"/>
              <circle cx="73" cy="47" r="3" fill="white"/>
              
              <!-- Blush -->
              <ellipse cx="30" cy="60" rx="8" ry="6" fill="#FF6B6B" opacity="0.4"/>
              <ellipse cx="90" cy="60" rx="8" ry="6" fill="#FF6B6B" opacity="0.4"/>
              
              <!-- Happy Smile -->
              <path d="M40 70 Q60 85 80 70" stroke="#8B4513" stroke-width="4" stroke-linecap="round" fill="none"/>
            </svg>
          {:else if connectionStatus === 'moderate'}
            <!-- Neutral Face -->
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Orange Circle Border -->
              <circle cx="60" cy="60" r="58" fill="#FFD93D" stroke="#FF9800" stroke-width="4"/>
              
              <!-- Eyes -->
              <circle cx="45" cy="50" r="7" fill="#8B4513"/>
              <circle cx="75" cy="50" r="7" fill="#8B4513"/>
              
              <!-- Neutral Mouth -->
              <line x1="40" y1="75" x2="80" y2="75" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
            </svg>
          {:else}
            <!-- Sad Face -->
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Red Circle Border -->
              <circle cx="60" cy="60" r="58" fill="#FFD93D" stroke="#F44336" stroke-width="4"/>
              
              <!-- Sad Eyes (X) -->
              <path d="M40 45 L50 55 M50 45 L40 55" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
              <path d="M70 45 L80 55 M80 45 L70 55" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
              
              <!-- Sad Mouth -->
              <path d="M40 80 Q60 70 80 80" stroke="#8B4513" stroke-width="4" stroke-linecap="round" fill="none"/>
            </svg>
          {/if}
        </div>

        <!-- Speed Info -->
        <div class="speed-info">
          <p class="speed-text" class:good={connectionStatus === 'good'} class:moderate={connectionStatus === 'moderate'} class:poor={connectionStatus === 'poor'}>
            Kecepatanmu {speed} MBps.
          </p>
          <p class="p95-text" class:good={connectionStatus === 'good'} class:moderate={connectionStatus === 'moderate'} class:poor={connectionStatus === 'poor'}>
            P95: {p95Speed} MBps
          </p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-card {
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    max-width: 90%;
    width: 340px;
    position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #F5F5F5;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: #E0E0E0;
    transform: rotate(90deg);
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 24px 0;
    line-height: 1.4;
  }

  .modal-title.testing {
    color: #666;
  }

  .modal-title.good {
    color: #FF6B35;
  }

  .modal-title.moderate {
    color: #FF9800;
  }

  .modal-title.poor {
    color: #F44336;
  }

  .modal-subtitle {
    font-size: 14px;
    color: #999;
    margin: 16px 0 0 0;
  }

  /* Loading State */
  .loading-container {
    margin: 24px 0;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #E0E0E0;
    border-top-color: #FF6B35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Emoji Container */
  .emoji-container {
    margin: 16px 0 24px 0;
  }

  /* Speed Info */
  .speed-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .speed-text,
  .p95-text {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
  }

  .speed-text.good,
  .p95-text.good {
    color: #4CAF50;
  }

  .speed-text.moderate,
  .p95-text.moderate {
    color: #FF9800;
  }

  .speed-text.poor,
  .p95-text.poor {
    color: #F44336;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .modal-card {
      width: 85%;
      padding: 24px 20px;
    }

    .modal-title {
      font-size: 16px;
    }

    .emoji-container svg {
      width: 100px;
      height: 100px;
    }
  }
</style>
