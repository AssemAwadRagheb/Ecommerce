document.addEventListener('DOMContentLoaded', function() {
  // Toggle sidebar
  const toggleBtn = document.getElementById('toggleMenu');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      document.body.classList.toggle('sidebar-collapsed');
      
      if (window.innerWidth > 768) {
        if (sidebar.classList.contains('collapsed')) {
          mainContent.style.marginLeft = 'var(--sidebar-collapsed)';
        } else {
          mainContent.style.marginLeft = 'var(--sidebar-width)';
        }
      }
    });
  }
  
  // Automatically handle sidebar on mobile
  function checkWidth() {
    if (window.innerWidth <= 768) {
      if (sidebar) {
        sidebar.classList.add('collapsed');
        document.body.classList.add('sidebar-collapsed');
      }
      if (mainContent) mainContent.style.marginLeft = '0';
    } else {
      if (sidebar && sidebar.classList.contains('collapsed')) {
        if (mainContent) mainContent.style.marginLeft = 'var(--sidebar-collapsed)';
      } else {
        if (sidebar) sidebar.classList.remove('collapsed');
        document.body.classList.remove('sidebar-collapsed');
        if (mainContent) mainContent.style.marginLeft = 'var(--sidebar-width)';
      }
    }
  }
  
  // Check width on load
  checkWidth();
  
  // Check width on resize
  window.addEventListener('resize', checkWidth);
  
  // Modal functionality
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('show');
      }
    });
  });
  
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
      }
    });
  });
  
  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('show');
    }
  });
  
  // Handle delete confirmation
  const deleteBtn = document.getElementById('delete-selected');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  const deleteModal = document.getElementById('delete-modal');
  
  if (deleteBtn && deleteModal) {
    deleteBtn.addEventListener('click', () => {
      deleteModal.classList.add('show');
    });
  }
  
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      // Here you would handle the deletion logic
      if (deleteModal) {
        deleteModal.classList.remove('show');
      }
      
      // Show notification
      showNotification('Products deleted successfully', 'success');
    });
  }
  
  // Notification function
  window.showNotification = function(message, type = 'info') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
      notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <p>${message}</p>
      </div>
      <button class="close-notification"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already in CSS
    if (!document.querySelector('style#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          min-width: 300px;
          max-width: 450px;
          z-index: 1000;
          transform: translateX(100%);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .notification.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
        }
        
        .notification-content i {
          margin-right: 10px;
          font-size: 20px;
        }
        
        .notification.success i {
          color: var(--success-color, #4CAF50);
        }
        
        .notification.error i {
          color: var(--danger-color, #F44336);
        }
        
        .notification.info i {
          color: var(--info-color, #2196F3);
        }
        
        .close-notification {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-600, #666);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Close notification on click
    const closeBtn = notification.querySelector('.close-notification');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      });
    }
    
    // Remove notification after timeout
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  };
  
  // Set active state for current page in navigation
  function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.sidebar-nav li');
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === currentPage) {
        item.classList.add('active');
      }
      
      // Set dashboard as active if we're on the home page
      if ((currentPage === '' || currentPage === '/' || currentPage === 'index.html') && 
          link && link.getAttribute('href') === 'index.html') {
        item.classList.add('active');
      }
    });
  }
  
  // Call the function to highlight the active navigation item
  setActiveNavItem();
  
  // User Menu Functionality
  const userMenu = document.querySelector('.admin-profile');
  const notificationsIcon = document.querySelector('.notifications');
  const messagesIcon = document.querySelector('.messages');
  
  // Toggle dropdown on click
  if (userMenu) {
    userMenu.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      
      // Close other dropdowns
      if (notificationsIcon) notificationsIcon.classList.remove('active');
      if (messagesIcon) messagesIcon.classList.remove('active');
    });
  }
  
  // Notification center functionality
  if (notificationsIcon) {
    notificationsIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      
      // Close other dropdowns
      if (userMenu) userMenu.classList.remove('active');
      if (messagesIcon) messagesIcon.classList.remove('active');
    });
  }
  
  // Messages center functionality
  if (messagesIcon) {
    messagesIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      
      // Close other dropdowns
      if (userMenu) userMenu.classList.remove('active');
      if (notificationsIcon) notificationsIcon.classList.remove('active');
    });
  }
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    if (userMenu) userMenu.classList.remove('active');
    if (notificationsIcon) notificationsIcon.classList.remove('active');
    if (messagesIcon) messagesIcon.classList.remove('active');
  });
  
  // Mark all as read functionality
  const markReadBtns = document.querySelectorAll('.mark-read');
  markReadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.closest('.notifications-dropdown, .messages-dropdown');
      if (dropdown) {
        const unreadItems = dropdown.querySelectorAll('li.unread');
        unreadItems.forEach(item => {
          item.classList.remove('unread');
        });
        
        // Update badge count
        const badge = this.closest('.notifications, .messages').querySelector('.badge');
        if (badge) {
          badge.textContent = '0';
          badge.style.display = 'none';
        }
      }
    });
  });
  
  // Add table selection functionality
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
      
      updateBulkActionButtons();
    });
    
    // Listen for changes on individual checkboxes
    document.addEventListener('change', function(e) {
      if (e.target.matches('table tbody input[type="checkbox"]')) {
        updateBulkActionButtons();
        updateSelectAllCheckbox();
      }
    });
    
    function updateBulkActionButtons() {
      const checkedBoxes = document.querySelectorAll('table tbody input[type="checkbox"]:checked');
      const deleteBtn = document.getElementById('delete-selected');
      const updateBtn = document.getElementById('update-selected');
      
      if (deleteBtn) deleteBtn.disabled = checkedBoxes.length === 0;
      if (updateBtn) updateBtn.disabled = checkedBoxes.length === 0;
    }
    
    function updateSelectAllCheckbox() {
      const checkboxes = document.querySelectorAll('table tbody input[type="checkbox"]');
      const checkedBoxes = document.querySelectorAll('table tbody input[type="checkbox"]:checked');
      
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = checkboxes.length > 0 && checkboxes.length === checkedBoxes.length;
        selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkboxes.length !== checkedBoxes.length;
      }
    }
    
    // Run once on page load
    updateBulkActionButtons();
  }
  
  // Search functionality for products
  const productSearch = document.getElementById('product-search');
  if (productSearch) {
    productSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('#products-table-body tr');
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    });
  }
  
  // Filter functionality
  const filterInputs = document.querySelectorAll('#category-filter, #status-filter, #sort-filter');
  const resetFiltersBtn = document.getElementById('reset-filters');
  
  if (filterInputs.length && resetFiltersBtn) {
    filterInputs.forEach(filter => {
      filter.addEventListener('change', applyFilters);
    });
    
    resetFiltersBtn.addEventListener('click', () => {
      filterInputs.forEach(filter => {
        filter.value = filter.options[0].value;
      });
      applyFilters();
    });
    
    function applyFilters() {
      const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
      const statusFilter = document.getElementById('status-filter').value.toLowerCase();
      const sortFilter = document.getElementById('sort-filter').value;
      
      const rows = Array.from(document.querySelectorAll('#products-table-body tr'));
      
      // Filter rows
      rows.forEach(row => {
        const category = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
        const status = row.querySelector('td:nth-child(8)').textContent.toLowerCase();
        
        const categoryMatch = categoryFilter === '' || category.includes(categoryFilter);
        const statusMatch = statusFilter === '' || status.includes(statusFilter);
        
        row.style.display = categoryMatch && statusMatch ? '' : 'none';
      });
      
      // Sort rows
      const tbody = document.getElementById('products-table-body');
      const sortedRows = rows.filter(row => row.style.display !== 'none').sort((a, b) => {
        if (sortFilter === 'newest') {
          return -1; // Keep original order for demo
        } else if (sortFilter === 'oldest') {
          return 1; // Reverse order for demo
        } else if (sortFilter.startsWith('price')) {
          const priceA = parseFloat(a.querySelector('td:nth-child(6)').textContent.replace(/[^0-9.-]+/g, ''));
          const priceB = parseFloat(b.querySelector('td:nth-child(6)').textContent.replace(/[^0-9.-]+/g, ''));
          return sortFilter === 'price-high' ? priceB - priceA : priceA - priceB;
        } else if (sortFilter.startsWith('name')) {
          const nameA = a.querySelector('td:nth-child(3)').textContent.toLowerCase();
          const nameB = b.querySelector('td:nth-child(3)').textContent.toLowerCase();
          return sortFilter === 'name-asc' ? 
            nameA.localeCompare(nameB) : 
            nameB.localeCompare(nameA);
        }
        return 0;
      });
      
      // Clear and repopulate tbody
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
      
      sortedRows.forEach(row => {
        tbody.appendChild(row);
      });
    }
  }
  
  // Pagination functionality
  const itemsPerPageSelect = document.getElementById('items-per-page');
  const paginationContainer = document.getElementById('pagination');
  
  if (itemsPerPageSelect && paginationContainer) {
    itemsPerPageSelect.addEventListener('change', updatePagination);
    
    function updatePagination() {
      const itemsPerPage = parseInt(itemsPerPageSelect.value);
      const rows = document.querySelectorAll('#products-table-body tr');
      const totalItems = rows.length;
      const pageCount = Math.ceil(totalItems / itemsPerPage);
      
      // Clear pagination
      paginationContainer.innerHTML = '';
      
      if (pageCount <= 1) return;
      
      // Create previous button
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.classList.add('prev');
      prevBtn.disabled = true;
      paginationContainer.appendChild(prevBtn);
      
      // Create page buttons
      for (let i = 1; i <= pageCount; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === 1) pageBtn.classList.add('active');
        pageBtn.addEventListener('click', () => {
          goToPage(i);
        });
        paginationContainer.appendChild(pageBtn);
      }
      
      // Create next button
      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.classList.add('next');
      if (pageCount === 1) nextBtn.disabled = true;
      paginationContainer.appendChild(nextBtn);
      
      // Set up event listeners for prev/next
      prevBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.pagination button.active');
        if (activePage && activePage.previousElementSibling && !activePage.previousElementSibling.classList.contains('prev')) {
          activePage.previousElementSibling.click();
        }
      });
      
      nextBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.pagination button.active');
        if (activePage && activePage.nextElementSibling && !activePage.nextElementSibling.classList.contains('next')) {
          activePage.nextElementSibling.click();
        }
      });
      
      // Initial page setup
      goToPage(1);
      
      function goToPage(page) {
        // Update active button
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach(button => {
          button.classList.remove('active');
          if (button.textContent === page.toString()) {
            button.classList.add('active');
          }
        });
        
        // Enable/disable prev/next buttons
        const prevBtn = paginationContainer.querySelector('.prev');
        const nextBtn = paginationContainer.querySelector('.next');
        if (prevBtn) prevBtn.disabled = page === 1;
        if (nextBtn) nextBtn.disabled = page === pageCount;
        
        // Show/hide rows
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        rows.forEach((row, index) => {
          row.style.display = (index >= startIndex && index < endIndex && row.style.display !== 'none') ? '' : 'none';
        });
      }
    }
    
    // Initialize pagination
    if (document.querySelector('#products-table-body tr')) {
      updatePagination();
    }
  }
  
  // Test the notification system
  setTimeout(() => {
    showNotification('Welcome to the Admin Dashboard', 'info');
  }, 1000);
});
