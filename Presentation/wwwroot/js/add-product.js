
import { initImageUpload } from './js/modules/imageUploadHandler.js';
import { initProductForm } from './js/modules/productFormHandler.js';
import { initEditMode } from './js/modules/productEditHandler.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initImageUpload();
  initProductForm();
  initEditMode();
  
  // Handle sidebar state persistence
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  
  // Check if sidebar state is saved in localStorage
  const sidebarState = localStorage.getItem('sidebar-state');
  if (sidebarState === 'collapsed') {
    sidebar.classList.add('collapsed');
    document.body.classList.add('sidebar-collapsed');
    if (window.innerWidth > 768) {
      mainContent.style.marginLeft = 'var(--sidebar-collapsed)';
    }
  }
  
  // Update sidebar state when toggled
  const toggleBtn = document.getElementById('toggleMenu');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      localStorage.setItem(
        'sidebar-state', 
        sidebar.classList.contains('collapsed') ? '' : 'collapsed'
      );
    });
  }
});
