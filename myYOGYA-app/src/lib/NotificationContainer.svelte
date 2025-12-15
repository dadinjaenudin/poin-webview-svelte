<script>
  import { fly, fade } from 'svelte/transition';
  import { notificationStore } from '../stores/notification.js';
  
  $: notifications = $notificationStore;
  
  function handleClose(id) {
    notificationStore.remove(id);
  }
  
  function handleAction(notification) {
    if (notification.action) {
      notification.action();
    }
    handleClose(notification.id);
  }
  
  function getNotificationClass(type) {
    const classes = {
      success: 'notification-success',
      info: 'notification-info',
      warning: 'notification-warning',
      error: 'notification-error',
      voucher: 'notification-voucher',
      points: 'notification-points'
    };
    return classes[type] || 'notification-info';
  }
  
  function getIcon(notification) {
    if (notification.icon) return notification.icon;
    
    const icons = {
      success: '✓',
      info: 'ℹ',
      warning: '⚠',
      error: '✕',
      voucher: '🎫',
      points: '⭐'
    };
    return icons[notification.type] || 'ℹ';
  }
</script>

<div class="notification-container">
  {#each notifications as notification (notification.id)}
    <div 
      class="notification {getNotificationClass(notification.type)}"
      transition:fly="{{ y: -50, duration: 300 }}"
    >
      <div class="notification-icon">
        {getIcon(notification)}
      </div>
      
      <div class="notification-content">
        <div class="notification-title">{notification.title}</div>
        <div class="notification-message">{notification.message}</div>
      </div>
      
      <div class="notification-actions">
        {#if notification.action}
          <button 
            class="notification-action-btn"
            on:click={() => handleAction(notification)}
          >
            {notification.actionLabel}
          </button>
        {/if}
        
        <button 
          class="notification-close-btn"
          on:click={() => handleClose(notification.id)}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
  .notification-container {
    position: fixed;
    top: 16px;
    right: 16px;
    left: 16px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
    max-width: 480px;
    margin: 0 auto;
  }
  
  .notification {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border-radius: 12px;
    background: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    min-height: 80px;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .notification-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
  }
  
  .notification-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .notification-title {
    font-size: 15px;
    font-weight: 700;
    color: #333;
    line-height: 1.3;
  }
  
  .notification-message {
    font-size: 13px;
    color: #666;
    line-height: 1.4;
  }
  
  .notification-actions {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  
  .notification-action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.05);
    color: #333;
  }
  
  .notification-action-btn:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .notification-action-btn:active {
    transform: scale(0.95);
  }
  
  .notification-close-btn {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);
    color: #666;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  
  .notification-close-btn:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .notification-close-btn:active {
    transform: scale(0.9);
  }
  
  /* Success notification */
  .notification-success {
    border-left: 4px solid #4caf50;
  }
  
  .notification-success .notification-icon {
    background: #e8f5e9;
    color: #4caf50;
  }
  
  /* Info notification */
  .notification-info {
    border-left: 4px solid #2196f3;
  }
  
  .notification-info .notification-icon {
    background: #e3f2fd;
    color: #2196f3;
  }
  
  /* Warning notification */
  .notification-warning {
    border-left: 4px solid #ff9800;
  }
  
  .notification-warning .notification-icon {
    background: #fff3e0;
    color: #ff9800;
  }
  
  /* Error notification */
  .notification-error {
    border-left: 4px solid #f44336;
  }
  
  .notification-error .notification-icon {
    background: #ffebee;
    color: #f44336;
  }
  
  /* Voucher notification */
  .notification-voucher {
    border-left: 4px solid #9c27b0;
    background: linear-gradient(135deg, #fff 0%, #f3e5f5 100%);
  }
  
  .notification-voucher .notification-icon {
    background: #f3e5f5;
    color: #9c27b0;
  }
  
  .notification-voucher .notification-title {
    color: #9c27b0;
  }
  
  .notification-voucher .notification-action-btn {
    background: #9c27b0;
    color: white;
  }
  
  .notification-voucher .notification-action-btn:hover {
    background: #7b1fa2;
  }
  
  /* Points notification */
  .notification-points {
    border-left: 4px solid #ff6b35;
    background: linear-gradient(135deg, #fff 0%, #fff5f0 100%);
  }
  
  .notification-points .notification-icon {
    background: #fff5f0;
    color: #ff6b35;
  }
  
  .notification-points .notification-title {
    color: #ff6b35;
  }
  
  .notification-points .notification-action-btn {
    background: #ff6b35;
    color: white;
  }
  
  .notification-points .notification-action-btn:hover {
    background: #ff5722;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .notification-container {
      top: 12px;
      right: 12px;
      left: 12px;
    }
    
    .notification {
      padding: 12px;
    }
    
    .notification-icon {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }
    
    .notification-title {
      font-size: 14px;
    }
    
    .notification-message {
      font-size: 12px;
    }
  }
</style>
