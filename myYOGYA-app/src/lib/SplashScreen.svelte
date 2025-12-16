<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  export let onComplete = () => {};
  
  let showSplash = true;
  
  onMount(() => {
    // Hide splash after 3 seconds
    setTimeout(() => {
      showSplash = false;
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fade out animation
    }, 3000);
  });
</script>

{#if showSplash}
  <div class="splash-screen" transition:fade={{ duration: 500 }}>
    <div class="splash-content">
      <!-- MyYOGYA Logo -->
      <div class="logo-container">
        <div class="logo-wrapper">
          <!-- White background badge -->
          <div class="logo-badge">
            <div class="logo-text">
              <span class="logo-my">My</span><span class="logo-yogya">YOGYA</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tagline -->
      <div class="tagline">
        <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
          <text x="60" y="25" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="2">YOGYA GROUP</text>
        </svg>
      </div>
      
      <!-- Loading indicator -->
      <div class="loading-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
{/if}

<style>
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #d32f2f 0%, #b71c1c 50%, #c62828 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: gradientShift 3s ease-in-out infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% {
      background: linear-gradient(180deg, #d32f2f 0%, #b71c1c 50%, #c62828 100%);
    }
    50% {
      background: linear-gradient(180deg, #c62828 0%, #d32f2f 50%, #b71c1c 100%);
    }
  }
  
  .splash-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;
    animation: fadeInUp 1s ease-out;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Logo Container */
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: logoScale 2s ease-in-out infinite;
  }
  
  @keyframes logoScale {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .logo-wrapper {
    position: relative;
  }
  
  .logo-badge {
    background: white;
    padding: 16px 40px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transform: perspective(1000px) rotateY(0deg);
    animation: logoRotate 3s ease-in-out infinite;
  }
  
  @keyframes logoRotate {
    0%, 100% {
      transform: perspective(1000px) rotateY(0deg);
    }
    50% {
      transform: perspective(1000px) rotateY(5deg);
    }
  }
  
  .logo-text {
    display: flex;
    align-items: baseline;
    gap: 4px;
    white-space: nowrap;
  }
  
  .logo-my {
    font-family: 'Brush Script MT', 'Comic Sans MS', cursive;
    font-size: 42px;
    font-weight: bold;
    color: #d32f2f;
    font-style: italic;
    line-height: 1;
  }
  
  .logo-yogya {
    font-family: 'Arial Black', 'Arial', sans-serif;
    font-size: 44px;
    font-weight: 900;
    color: #d32f2f;
    letter-spacing: 2px;
    line-height: 1;
  }
  
  /* Tagline */
  .tagline {
    margin-top: -40px;
    opacity: 0.95;
    animation: fadeIn 1.5s ease-in 0.5s forwards;
    opacity: 0;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 0.95;
    }
  }
  
  /* Loading Dots */
  .loading-dots {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    animation: dotBounce 1.4s ease-in-out infinite;
  }
  
  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes dotBounce {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .logo-badge {
      padding: 14px 32px;
      border-radius: 14px;
    }
    
    .logo-my {
      font-size: 36px;
    }
    
    .logo-yogya {
      font-size: 38px;
      letter-spacing: 1px;
    }
    
    .splash-content {
      gap: 40px;
    }
  }
  
  @media (max-width: 360px) {
    .logo-badge {
      padding: 12px 28px;
    }
    
    .logo-my {
      font-size: 32px;
    }
    
    .logo-yogya {
      font-size: 34px;
    }
  }
</style>
