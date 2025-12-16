<script>
  import { fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  
  export let message = 'Memuat...';
  
  onMount(() => {
    // Component mounted
  });
  
  onDestroy(() => {
    // Component destroyed
  });
</script>

<div class="loading-overlay" transition:fade={{ duration: 300 }}>
    <div class="loading-container">
      <!-- MyYOGYA Logo -->
      <div class="logo-container">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- MyYOGYA Logo Y Shape -->
          <g transform="translate(15, 10)">
            <!-- Left Green Part -->
            <path d="M10 10 L20 10 L20 20 L10 30 Z" fill="#00A651"/>
            
            <!-- Top Yellow Part -->
            <path d="M10 10 L20 10 L30 0 L20 0 Z" fill="#FDB813"/>
            
            <!-- Right Red/Orange Part -->
            <path d="M30 0 L40 10 L30 20 L20 10 Z" fill="#ED1C24"/>
            
            <!-- Bottom Orange Part -->
            <path d="M20 20 L30 20 L40 30 L30 30 Z" fill="#F7941D"/>
            
            <!-- Center piece -->
            <path d="M20 10 L30 20 L20 20 Z" fill="#F15A29"/>
          </g>
        </svg>
      </div>

      <!-- Spinning Circle Loader -->
      <div class="spinner-ring">
        <div class="spinner-ring-inner"></div>
      </div>

      <!-- Loading Text -->
      <p class="loading-text">{message}</p>

      <!-- Loading Dots Animation -->
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #FF6B35 0%, #FF8C61 50%, #FFA98F 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  /* Logo Container */
  .logo-container {
    position: relative;
    animation: logoFloat 2s ease-in-out infinite;
  }

  @keyframes logoFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Spinner Ring */
  .spinner-ring {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .spinner-ring-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Loading Text */
  .loading-text {
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Loading Dots */
  .loading-dots {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .dot {
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    animation: dotBounce 1.4s ease-in-out infinite;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    .logo-container svg {
      width: 60px;
      height: 60px;
    }

    .spinner-ring {
      width: 100px;
      height: 100px;
    }

    .loading-text {
      font-size: 16px;
    }

    .dot {
      width: 8px;
      height: 8px;
    }
  }
</style>
