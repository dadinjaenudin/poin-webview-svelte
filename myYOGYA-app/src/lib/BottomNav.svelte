<script>
  import { currentPage, navigateTo } from '../stores/navigation.js';
  import { badgeStore, formatBadgeCount } from '../stores/badge.js';

  const navItems = [
    { id: 'home', label: 'Beranda', icon: 'home', badgeType: null },
    { id: 'voucher', label: 'Voucher', icon: 'voucher', badgeType: 'voucher' },
    { id: 'loyalty', label: 'Loyalty', icon: 'loyalty', badgeType: 'loyalty' },
    { id: 'account', label: 'Akun', icon: 'account', badgeType: null }
  ];

  function setActiveTab(tab) {
    navigateTo(tab);
  }
</script>

<nav class="bottom-nav">
  {#each navItems as item}
    <button 
      class="nav-item" 
      class:active={$currentPage === item.id}
      on:click={() => setActiveTab(item.id)}
    >
      <div class="nav-icon-wrapper">
        <div class="nav-icon">
          <!-- Badge notification -->
          {#if item.badgeType && $badgeStore[item.badgeType] > 0}
            <span class="badge">{formatBadgeCount($badgeStore[item.badgeType])}</span>
          {/if}
        {#if item.icon === 'home'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={$currentPage === item.id ? '#d32f2f' : '#999'}/>
          </svg>
        {:else if item.icon === 'voucher'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z" fill={$currentPage === item.id ? '#d32f2f' : '#999'}/>
          </svg>
        {:else if item.icon === 'loyalty'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l-5.5 9h11z" fill={$currentPage === item.id ? '#d32f2f' : '#999'}/>
            <circle cx="12" cy="17" r="5" fill={$currentPage === item.id ? '#d32f2f' : '#999'}/>
          </svg>
        {:else if item.icon === 'account'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={$currentPage === item.id ? '#d32f2f' : '#999'}/>
          </svg>
        {/if}
        </div>
      </div>
      <span class="nav-label" class:active={currentPage === item.id}>{item.label}</span>
    </button>
  {/each}
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 480px;
    margin: 0 auto;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0 12px 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    transition: all 0.3s ease;
    flex: 1;
  }

  .nav-item:active {
    transform: scale(0.95);
  }

  .nav-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #ff3b30;
    color: white;
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    box-shadow: 0 2px 4px rgba(255, 59, 48, 0.3);
    z-index: 1;
  }

  .nav-label {
    font-size: 11px;
    color: #999;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-label.active {
    color: #d32f2f;
    font-weight: 600;
  }
</style>
