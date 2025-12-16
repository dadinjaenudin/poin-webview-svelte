import { writable } from 'svelte/store';

export const currentPage = writable('home');
export const currentSubPage = writable(null);

export function navigateTo(page) {
  currentPage.set(page);
  currentSubPage.set(null); // Reset subpage when changing main page
  
  // WORKAROUND: Manually update UI since reactivity is broken
  if (typeof window !== 'undefined') {
    // Hide all pages first
    const allPages = document.querySelectorAll('[data-page]');
    allPages.forEach(el => {
      el.style.display = 'none';
    });
    
    // Show the selected page
    const targetPage = document.querySelector(`[data-page="${page}"]`);
    if (targetPage) {
      targetPage.style.display = 'block';
    }
  }
}

export function navigateToSubPage(subPage) {
  currentSubPage.set(subPage);
  
  // WORKAROUND: Manually update UI for sub-pages
  if (typeof window !== 'undefined') {
    // Hide all sub-pages
    const allSubPages = document.querySelectorAll('[data-subpage]');
    allSubPages.forEach(el => {
      el.style.display = 'none';
    });
    
    // Show the selected sub-page or main account page
    if (subPage) {
      const targetSubPage = document.querySelector(`[data-subpage="${subPage}"]`);
      if (targetSubPage) {
        targetSubPage.style.display = 'block';
      }
    } else {
      // Show main account page
      const mainAccountPage = document.querySelector('[data-subpage="main"]');
      if (mainAccountPage) {
        mainAccountPage.style.display = 'block';
      }
    }
  }
}
