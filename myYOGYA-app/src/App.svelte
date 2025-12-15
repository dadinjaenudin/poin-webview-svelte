<script>
  import { onMount } from 'svelte';
  import Header from './lib/Header.svelte';
  import UserGreeting from './lib/UserGreeting.svelte';
  import MenuGrid from './lib/MenuGrid.svelte';
  import Insights from './lib/Insights.svelte';
  import PromoWeekly from './lib/PromoWeekly.svelte';
  import Videos from './lib/Videos.svelte';
  import BottomNav from './lib/BottomNav.svelte';
  import LoyaltyPage from './lib/LoyaltyPage.svelte';
  import VoucherPage from './lib/VoucherPage.svelte';
  import AccountPage from './lib/AccountPage.svelte';
  import MyAccountDetail from './lib/MyAccountDetail.svelte';
  import OTPPage from './lib/OTPPage.svelte';
  import TransactionHistoryPage from './lib/TransactionHistoryPage.svelte';
  import RecommendationSettingsPage from './lib/RecommendationSettingsPage.svelte';
  import AboutPage from './lib/AboutPage.svelte';
  import AppRatingPage from './lib/AppRatingPage.svelte';
  import FeedbackPage from './lib/FeedbackPage.svelte';
  import FAQPage from './lib/FAQPage.svelte';
  import { currentPage, currentSubPage } from './stores/navigation.js';

  let showSpinner = true;
  
  // Use browser API directly to handle loading state
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      setTimeout(() => {
        // Manually hide spinner and show app (workaround for reactivity issue)
        const spinnerEl = document.querySelector('.loading-overlay');
        const appEl = document.querySelector('.app-container');
        
        if (spinnerEl) {
          // Remove from DOM completely to prevent blocking clicks
          spinnerEl.remove();
        }
        if (appEl) {
          appEl.classList.remove('hidden');
          appEl.style.pointerEvents = 'auto'; // Ensure clicks work
        }
        
        showSpinner = false;
      }, 1500);
    });
  }
  
  onMount(() => {
    // Component mounted
  });
</script>

<!-- Loading Spinner -->
{#if showSpinner}
  <div class="loading-overlay" style="
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
  ">
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      color: white;
      text-align: center;
    ">
      <div class="spinner-circle"></div>
      <p style="font-size: 18px; font-weight: 600; margin: 0;">Memuat MyYOGYA...</p>
    </div>
  </div>
{/if}

<main>
  <div class="app-container" class:hidden={showSpinner}>
    <!-- Home Page -->
    <div data-page="home" style="display: block;">
      <Header />
      <div class="content">
        <UserGreeting />
        <MenuGrid />
        <Insights />
        <PromoWeekly />
        <Videos />
      </div>
    </div>
    
    <!-- Loyalty Page -->
    <div data-page="loyalty" style="display: none;">
      <LoyaltyPage />
    </div>
    
    <!-- Voucher Page -->
    <div data-page="voucher" style="display: none;">
      <VoucherPage />
    </div>
    
    <!-- Account Page -->
    <div data-page="account" style="display: none;">
      <!-- Main Account Page -->
      <div data-subpage="main" style="display: block;">
        <AccountPage />
      </div>
      
      <!-- Account Sub-pages -->
      <div data-subpage="my-account-detail" style="display: none;">
        <MyAccountDetail />
      </div>
      
      <div data-subpage="otp-page" style="display: none;">
        <OTPPage />
      </div>
      
      <div data-subpage="transaction-history" style="display: none;">
        <TransactionHistoryPage />
      </div>
      
      <div data-subpage="recommendation-settings" style="display: none;">
        <RecommendationSettingsPage />
      </div>
      
      <div data-subpage="about-page" style="display: none;">
        <AboutPage />
      </div>
      
      <div data-subpage="app-rating" style="display: none;">
        <AppRatingPage />
      </div>
      
      <div data-subpage="feedback" style="display: none;">
        <FeedbackPage />
      </div>
      
      <div data-subpage="faq" style="display: none;">
        <FAQPage />
      </div>
    </div>
    
    <BottomNav />
  </div>
</main>

<style>
  .spinner-circle {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .app-container {
    max-width: 480px;
    margin: 0 auto;
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .app-container.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .content {
    flex: 1;
    padding-bottom: 80px;
    overflow-y: auto;
  }

  main {
    width: 100%;
    height: 100vh;
  }
</style>
