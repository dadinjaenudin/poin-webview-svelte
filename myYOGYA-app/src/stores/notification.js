import { writable } from 'svelte/store';

// Notification store
function createNotificationStore() {
  const { subscribe, update } = writable([]);
  
  let nextId = 1;
  
  return {
    subscribe,
    
    // Add a notification
    add: (notification) => {
      const id = nextId++;
      const newNotification = {
        id,
        type: notification.type || 'info', // 'success', 'info', 'warning', 'error', 'voucher', 'points'
        title: notification.title,
        message: notification.message,
        duration: notification.duration || 5000,
        icon: notification.icon,
        action: notification.action, // Optional action callback
        actionLabel: notification.actionLabel || 'Lihat'
      };
      
      update(notifications => [...notifications, newNotification]);
      
      // Auto remove after duration
      if (newNotification.duration > 0) {
        setTimeout(() => {
          notificationStore.remove(id);
        }, newNotification.duration);
      }
      
      return id;
    },
    
    // Remove a notification
    remove: (id) => {
      update(notifications => notifications.filter(n => n.id !== id));
    },
    
    // Clear all notifications
    clear: () => {
      update(() => []);
    },
    
    // Shorthand methods
    success: (title, message, options = {}) => {
      return notificationStore.add({
        type: 'success',
        title,
        message,
        ...options
      });
    },
    
    info: (title, message, options = {}) => {
      return notificationStore.add({
        type: 'info',
        title,
        message,
        ...options
      });
    },
    
    warning: (title, message, options = {}) => {
      return notificationStore.add({
        type: 'warning',
        title,
        message,
        ...options
      });
    },
    
    error: (title, message, options = {}) => {
      return notificationStore.add({
        type: 'error',
        title,
        message,
        ...options
      });
    },
    
    // Special notification for new voucher
    newVoucher: (voucherName, discount, options = {}) => {
      return notificationStore.add({
        type: 'voucher',
        title: '🎉 Voucher Baru!',
        message: `${voucherName} - Diskon ${discount}`,
        icon: '🎫',
        ...options
      });
    },
    
    // Special notification for new points
    newPoints: (points, reason, options = {}) => {
      return notificationStore.add({
        type: 'points',
        title: '⭐ Poin Bertambah!',
        message: `+${points} poin dari ${reason}`,
        icon: '💰',
        ...options
      });
    }
  };
}

export const notificationStore = createNotificationStore();
