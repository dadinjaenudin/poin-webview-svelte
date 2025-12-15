<script>
  export let isOpen = false;
  export let onClose = () => {};
  
  // Member data
  const memberData = {
    name: 'FENDI PRAMUDITO',
    cardNumber: '8900002520031',
    cardType: 'YOGYA Card - Basic',
    expiryDate: '11 Desember 2124'
  };
  
  function handleClose() {
    // Manual hide since reactivity broken
    requestAnimationFrame(() => {
      const modal = document.querySelector('.modal-overlay');
      if (modal) {
        modal.style.display = 'none';
      }
    });
    
    // Also update state
    isOpen = false;
    onClose();
  }
</script>

<div class="modal-overlay" style="display: {isOpen ? 'flex' : 'none'};" on:click={handleClose}>
  <div class="modal-content" on:click|stopPropagation>
      <!-- Close Button -->
      <button class="close-button" on:click={handleClose}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="white"/>
          <path d="M20 12L12 20M12 12l8 8" stroke="#666" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <!-- Greeting -->
      <h2 class="greeting">Hi, Dadin Jaenudin</h2>
      
      <!-- Card Container -->
      <div class="card-container">
        <!-- Title -->
        <h3 class="scan-title">Scan Member</h3>
        
        <!-- Description -->
        <p class="description">
          Kamu bisa melakukan scan member dengan menunjukkan barcode ini ke kasir untuk discan.
        </p>
        
        <!-- Barcode Number -->
        <div class="barcode-number">{memberData.cardNumber}</div>
        
        <!-- Barcode Image -->
        <div class="barcode">
          <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
            <!-- Generate barcode pattern -->
            {#each Array(50) as _, i}
              <rect 
                x={i * 6} 
                y="0" 
                width={Math.random() > 0.5 ? 4 : 2} 
                height="80" 
                fill="black"
              />
            {/each}
          </svg>
        </div>
        
        <!-- Card Type -->
        <h4 class="card-type">{memberData.cardType}</h4>
        
        <!-- Expiry Date -->
        <p class="expiry-date">Berlaku sampai: <strong>{memberData.expiryDate}</strong></p>
      </div>
    </div>
  </div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
  }
  
  .modal-overlay[style*="display: flex"] {
    display: flex !important;
  }
  
  .modal-overlay[style*="display: none"] {
    display: none !important;
  }

  .modal-content {
    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
    border-radius: 20px;
    max-width: 450px;
    width: 100%;
    padding: 24px;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    z-index: 10;
  }

  .close-button:active {
    transform: scale(0.9);
  }

  .greeting {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin: 0 0 20px 0;
    text-align: left;
  }

  .card-container {
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .scan-title {
    font-size: 32px;
    font-weight: 700;
    color: #FF6B35;
    margin: 0 0 16px 0;
  }

  .description {
    font-size: 14px;
    color: #999;
    line-height: 1.6;
    margin: 0 0 24px 0;
    padding: 0 8px;
  }

  .barcode-number {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    letter-spacing: 4px;
    margin: 0 0 12px 0;
  }

  .barcode {
    background: white;
    padding: 16px;
    margin: 0 0 24px 0;
    border-radius: 8px;
  }

  .barcode svg {
    width: 100%;
    height: 80px;
  }

  .card-type {
    font-size: 24px;
    font-weight: 700;
    color: #d32f2f;
    margin: 0 0 8px 0;
  }

  .expiry-date {
    font-size: 14px;
    color: #999;
    margin: 0;
  }

  .expiry-date strong {
    color: #666;
    font-weight: 600;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .modal-content {
      padding: 20px;
    }

    .greeting {
      font-size: 24px;
    }

    .scan-title {
      font-size: 28px;
    }

    .barcode-number {
      font-size: 20px;
      letter-spacing: 2px;
    }

    .card-type {
      font-size: 20px;
    }
  }
</style>
