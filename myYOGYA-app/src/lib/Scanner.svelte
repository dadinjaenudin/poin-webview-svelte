<script>
  import { onMount, onDestroy } from 'svelte';
  import { Html5Qrcode } from 'html5-qrcode';
  
  export let isOpen = false;
  export let onScanSuccess = null;
  export let onClose = null;
  
  let scanner = null;
  let scanResult = '';
  let scanError = '';
  let isScanning = false;
  let initCalled = false; // Track if init already called
  
  // Debug: Watch isOpen changes with explicit dependency
  $: isOpen, console.log('Scanner isOpen changed:', isOpen);
  
  function handleScanSuccess(decodedText, decodedResult) {
    console.log(`Scan result: ${decodedText}`, decodedResult);
    scanResult = decodedText;
    scanError = '';
    
    // Stop camera after successful scan
    if (scanner) {
      scanner.stop().then(() => {
        console.log('Camera stopped after successful scan');
        isScanning = false;
      }).catch(err => {
        console.error('Error stopping camera:', err);
      });
    }
    
    // Callback to parent
    if (onScanSuccess) {
      onScanSuccess(decodedText, decodedResult);
    }
    
    // Don't auto-close - let user decide to scan again or go back to menu
  }
  
  function handleScanAgain() {
    console.log('Scan Again clicked');
    // Clear previous result
    scanResult = '';
    scanError = '';
    
    // Restart scanner
    if (scanner) {
      scanner.start({ facingMode: "environment" }, config)
        .then(() => {
          console.log('Camera restarted for new scan');
          isScanning = true;
        })
        .catch(err => {
          console.error('Error restarting camera:', err);
          scanError = 'Gagal memulai kamera: ' + err.message;
        });
    }
  }
  
  function handleScanError(errorMessage) {
    // Filter out normal "no code found" errors (they're just noise)
    if (errorMessage.includes('NotFoundException') || errorMessage.includes('No MultiFormat Readers')) {
      // This is normal - scanner is working, just no code detected yet
      return;
    }
    
    // Log other errors for debugging
    console.warn('Scanner error:', errorMessage);
    
    // Only show critical errors to user
    if (errorMessage.includes('Camera') || errorMessage.includes('Permission') || errorMessage.includes('NotAllowed') || errorMessage.includes('NotFound') || errorMessage.includes('NotReadable')) {
      scanError = errorMessage;
      console.error('CRITICAL Scanner error:', errorMessage);
    }
  }
  
  async function initScanner() {
    console.log('initScanner called - scanner:', !!scanner, 'initCalled:', initCalled, 'isOpen:', isOpen);
    
    // Prevent double initialization
    if (scanner || initCalled) {
      console.log('Scanner already initialized or init in progress, skipping...');
      return;
    }
    
    if (!isOpen) {
      console.log('Scanner not open, skipping init...');
      return;
    }
    
    // Check if DOM element exists
    const element = document.getElementById('qr-reader');
    if (!element) {
      console.error('qr-reader element not found in DOM');
      return;
    }
    
    console.log('Starting scanner initialization with Html5Qrcode API...');
    initCalled = true;
    isScanning = true;
    
    try {
      console.log('Creating Html5Qrcode instance...');
      scanner = new Html5Qrcode('qr-reader');
      console.log('Scanner instance created:', scanner);
      
      // Configuration for camera
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          0,  // QR_CODE
          13, // EAN_13
          8,  // EAN_8
          12, // UPC_A
          14, // UPC_E
          11, // CODE_39
          15, // CODE_93
          16, // CODE_128
          10, // ITF
          9   // CODABAR
        ]
      };
      
      console.log('Starting camera with config:', config);
      
      // Start scanning with rear camera (facingMode: environment)
      await scanner.start(
        { facingMode: "environment" }, // Use rear camera
        config,
        handleScanSuccess,
        handleScanError
      );
      
      console.log('Camera started successfully!');
      
      // Check video element after camera starts
      setTimeout(() => {
        const videoElement = document.querySelector('#qr-reader video');
        console.log('Video element in DOM:', !!videoElement);
        if (videoElement) {
          console.log('Video dimensions:', videoElement.videoWidth, 'x', videoElement.videoHeight);
          console.log('Video readyState:', videoElement.readyState);
          console.log('Video paused:', videoElement.paused);
        }
      }, 500);
      
    } catch (err) {
      console.error('Error starting camera:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      
      // User-friendly error messages
      if (err.name === 'NotAllowedError') {
        scanError = 'Camera permission denied. Please allow camera access.';
      } else if (err.name === 'NotFoundError') {
        scanError = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError') {
        scanError = 'Camera is already in use by another application.';
      } else {
        scanError = 'Failed to start camera: ' + err.message;
      }
      
      isScanning = false;
      initCalled = false;
      
      if (scanner) {
        scanner.clear().catch(() => {});
        scanner = null;
      }
    }
  }
  
  function handleClose() {
    console.log('Scanner: handleClose called - scanner:', !!scanner);
    console.log('Scanner: isOpen before:', isOpen);
    
    // Set isOpen to false
    // This will trigger the reactive statement to do cleanup
    isOpen = false;
    console.log('Scanner: isOpen set to false');
    
    // Call the callback if provided
    if (onClose) {
      onClose();
      console.log('Scanner: onClose callback executed');
    }
  }
  
  // Watch for isOpen changes - explicit reactive statements
  $: console.log('Scanner reactive: isOpen =', isOpen, 'scanner =', !!scanner, 'initCalled =', initCalled);
  
  // When isOpen becomes true, initialize scanner
  $: if (isOpen && !scanner && !initCalled) {
    console.log('Scanner: isOpen changed to true, initializing...');
    // Add body scroll lock when opening
    document.body.classList.add('modal-open');
    // Wait for DOM to be ready
    setTimeout(() => {
      initScanner();
    }, 200);
  }
  
  // When isOpen becomes false, cleanup
  $: if (!isOpen && scanner) {
    console.log('Scanner: isOpen changed to false, cleaning up...');
    // Remove body scroll lock when closing
    document.body.classList.remove('modal-open');
    // Clear scanner
    if (scanner) {
      scanner.clear().catch(err => console.error('Error clearing scanner:', err));
      scanner = null;
    }
    isScanning = false;
    initCalled = false;
    scanResult = '';
    scanError = '';
  }
  
  // Mount lifecycle - component is now always mounted
  onMount(() => {
    console.log('Scanner onMount - Component mounted, isOpen:', isOpen);
    // Note: Scanner initialization is now handled by reactive statement
    // This ensures it works both on mount and when isOpen changes later
  });
  
  onDestroy(() => {
    console.log('Scanner onDestroy - Component being destroyed');
    
    // Cleanup on component destruction
    document.body.classList.remove('modal-open');
    
    if (scanner) {
      scanner.clear().catch(err => console.error('Error on destroy:', err));
    }
  });
</script>

{#if isOpen}
  <div class="scanner-overlay" role="dialog" aria-modal="true" tabindex="-1" on:click|self={handleClose} on:keydown={(e) => e.key === 'Escape' && handleClose()}>
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
            
            <div class="action-buttons">
              <button class="btn-secondary" on:click={handleScanAgain}>
                <span class="btn-icon">⟲</span>
                Scan Lagi
              </button>
              <button class="btn-primary" on:click={handleClose}>
                <span class="btn-icon">🏠</span>
                Kembali ke Menu
              </button>
            </div>
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
        
        {#if !scanResult}
          <div class="scanner-instructions">
            <p>📱 Arahkan kamera ke QR Code atau Barcode</p>
            <p>📦 Support: QR Code, EAN, UPC, Code 128, dll</p>
          </div>
        {/if}
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
    overflow: hidden; /* Prevent scrolling */
  }
  
  /* Prevent body scroll when modal is open */
  :global(body.modal-open) {
    overflow: hidden;
    position: fixed;
    width: 100%;
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
    min-height: 300px;
    background: #000;
  }
  
  :global(#qr-reader video) {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 12px;
    display: block !important;
  }
  
  :global(#qr-reader__dashboard) {
    display: none !important;
  }
  
  :global(#qr-reader__scan_region) {
    position: relative !important;
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
  
  .action-buttons {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(211, 47, 47, 0.4);
  }
  
  .btn-secondary {
    background: white;
    color: #d32f2f;
    border: 2px solid #d32f2f;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .btn-icon {
    font-size: 18px;
  }
  
  .auto-close-message {
    margin: 16px 0 0 0;
    font-size: 14px;
    color: #666;
    font-style: italic;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
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
