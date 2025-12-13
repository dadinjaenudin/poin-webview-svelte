<script>
  import { onMount, onDestroy } from 'svelte';
  import { Html5QrcodeScanner } from 'html5-qrcode';
  
  export let isOpen = false;
  export let onScanSuccess = null;
  export let onClose = null;
  
  let scanner = null;
  let scanResult = '';
  let scanError = '';
  let isScanning = false;
  
  function handleScanSuccess(decodedText, decodedResult) {
    console.log(`Scan result: ${decodedText}`, decodedResult);
    scanResult = decodedText;
    scanError = '';
    
    // Callback to parent
    if (onScanSuccess) {
      onScanSuccess(decodedText, decodedResult);
    }
    
    // Show result for 2 seconds then close
    setTimeout(() => {
      handleClose();
    }, 2000);
  }
  
  function handleScanError(errorMessage) {
    // Don't show every scan error, only critical ones
    if (errorMessage.includes('Camera') || errorMessage.includes('Permission')) {
      scanError = errorMessage;
      console.error('Scanner error:', errorMessage);
    }
  }
  
  function initScanner() {
    if (!isOpen || scanner) return;
    
    isScanning = true;
    
    // Scanner configuration
    const config = {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 }, // Scanning box size
      aspectRatio: 1.0,
      formatsToSupport: [
        'QR_CODE',
        'EAN_13',
        'EAN_8',
        'UPC_A',
        'UPC_E',
        'CODE_39',
        'CODE_93',
        'CODE_128',
        'ITF',
        'CODABAR'
      ]
    };
    
    try {
      scanner = new Html5QrcodeScanner('qr-reader', config, false);
      scanner.render(handleScanSuccess, handleScanError);
    } catch (err) {
      console.error('Error initializing scanner:', err);
      scanError = 'Failed to initialize scanner';
      isScanning = false;
    }
  }
  
  function handleClose() {
    if (scanner) {
      scanner.clear().catch(err => console.error('Error clearing scanner:', err));
      scanner = null;
    }
    
    isScanning = false;
    scanResult = '';
    scanError = '';
    
    if (onClose) {
      onClose();
    }
  }
  
  // Watch for isOpen changes
  $: if (isOpen && !scanner) {
    setTimeout(initScanner, 100);
  } else if (!isOpen && scanner) {
    handleClose();
  }
  
  onDestroy(() => {
    if (scanner) {
      scanner.clear().catch(err => console.error('Error on destroy:', err));
    }
  });
</script>

{#if isOpen}
  <div class="scanner-overlay" role="dialog" aria-modal="true" on:click|self={handleClose} on:keydown={(e) => e.key === 'Escape' && handleClose()}>
    <div class="scanner-container">
      <div class="scanner-header">
        <h2>Scan QR Code / Barcode</h2>
        <button class="close-btn" aria-label="Close scanner" on:click={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/>
          </svg>
        </button>
      </div>
      
      <div class="scanner-body">
        <div id="qr-reader"></div>
        
        {#if scanResult}
          <div class="scan-result success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#4caf50"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
            </svg>
            <h3>Scan Berhasil!</h3>
            <p class="result-text">{scanResult}</p>
          </div>
        {/if}
        
        {#if scanError && !scanResult}
          <div class="scan-result error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#f44336"/>
              <path d="M13 13h-2V7h2m0 10h-2v-2h2M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" fill="white"/>
            </svg>
            <h3>Error</h3>
            <p class="error-text">{scanError}</p>
          </div>
        {/if}
        
        <div class="scanner-instructions">
          <p>📱 Arahkan kamera ke QR Code atau Barcode</p>
          <p>📦 Support: QR Code, EAN, UPC, Code 128, dll</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .scanner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .scanner-container {
    background: white;
    border-radius: 16px;
    max-width: 480px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .scanner-header {
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%);
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px 16px 0 0;
  }
  
  .scanner-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s;
  }
  
  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .scanner-body {
    padding: 20px;
  }
  
  :global(#qr-reader) {
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
  }
  
  :global(#qr-reader video) {
    border-radius: 12px;
  }
  
  :global(#qr-reader__dashboard) {
    display: none !important;
  }
  
  :global(#qr-reader__dashboard_section_csr button) {
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%) !important;
    color: white !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 12px 24px !important;
    font-weight: 600 !important;
    margin: 8px !important;
  }
  
  .scan-result {
    margin-top: 20px;
    padding: 24px;
    border-radius: 12px;
    text-align: center;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .scan-result.success {
    background: #e8f5e9;
    border: 2px solid #4caf50;
  }
  
  .scan-result.error {
    background: #ffebee;
    border: 2px solid #f44336;
  }
  
  .scan-result h3 {
    margin: 12px 0 8px 0;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
  
  .result-text {
    margin: 8px 0 0 0;
    font-size: 16px;
    font-weight: 600;
    color: #4caf50;
    word-break: break-all;
    font-family: monospace;
  }
  
  .error-text {
    margin: 8px 0 0 0;
    font-size: 14px;
    color: #f44336;
  }
  
  .scanner-instructions {
    margin-top: 20px;
    padding: 16px;
    background: #f5f5f5;
    border-radius: 8px;
    text-align: center;
  }
  
  .scanner-instructions p {
    margin: 8px 0;
    font-size: 14px;
    color: #666;
  }
  
  @media (max-width: 480px) {
    .scanner-container {
      width: 100%;
      max-height: 100vh;
      border-radius: 0;
    }
    
    .scanner-header {
      border-radius: 0;
    }
  }
</style>
