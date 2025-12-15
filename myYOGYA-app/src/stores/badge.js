import { writable } from 'svelte/store';

// Badge notification store
function createBadgeStore() {
  const { subscribe, update, set } = writable({
    voucher: 0,
    loyalty: 0,
    promo: 0,
    notification: 0,
    transaction: 0
  });
  
  return {
    subscribe,
    
    // Set badge count for a specific type
    setBadge: (type, count) => {
      update(badges => ({
        ...badges,
        [type]: count
      }));
    },
    
    // Increment badge count
    increment: (type, amount = 1) => {
      update(badges => ({
        ...badges,
        [type]: (badges[type] || 0) + amount
      }));
    },
    
    // Decrement badge count
    decrement: (type, amount = 1) => {
      update(badges => ({
        ...badges,
        [type]: Math.max(0, (badges[type] || 0) - amount)
      }));
    },
    
    // Clear badge for a specific type
    clear: (type) => {
      update(badges => ({
        ...badges,
        [type]: 0
      }));
    },
    
    // Clear all badges
    clearAll: () => {
      set({
        voucher: 0,
        loyalty: 0,
        promo: 0,
        notification: 0,
        transaction: 0
      });
    },
    
    // Get badge count for a type
    get: (type, badges) => {
      return badges[type] || 0;
    }
  };
}

export const badgeStore = createBadgeStore();

// Helper function to check if has badge
export function hasBadge(badges, type) {
  return badges[type] > 0;
}

// Helper function to format badge number
export function formatBadgeCount(count) {
  if (count > 99) return '99+';
  if (count > 0) return count.toString();
  return '';
}
