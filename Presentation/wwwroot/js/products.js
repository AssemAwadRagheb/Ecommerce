
document.addEventListener('DOMContentLoaded', function() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Smart Watch',
      image: 'https://placehold.co/100x100/333/FFF?text=Watch',
      sku: 'WCH-1001',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      image: 'https://placehold.co/100x100/333/FFF?text=Earbuds',
      sku: 'EAR-2043',
      category: 'Electronics',
      price: 129.99,
      stock: 78,
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Professional Camera',
      image: 'https://placehold.co/100x100/333/FFF?text=Camera',
      sku: 'CAM-3302',
      category: 'Electronics',
      price: 899.99,
      stock: 12,
      status: 'Low Stock'
    },
    {
      id: 4,
      name: 'Digital SLR Camera',
      image: 'https://placehold.co/100x100/333/FFF?text=DSLR',
      sku: 'CAM-4022',
      category: 'Electronics',
      price: 1200.00,
      stock: 8,
      status: 'Low Stock'
    },
    {
      id: 5,
      name: 'Premium Smartwatch',
      image: 'https://placehold.co/100x100/333/FFF?text=Watch',
      sku: 'WCH-1021',
      category: 'Electronics',
      price: 319.99,
      stock: 15,
      status: 'In Stock'
    },
    {
      id: 6,
      name: 'Smart TV 55"',
      image: 'https://placehold.co/100x100/333/FFF?text=TV',
      sku: 'TV-5501',
      category: 'Electronics',
      price: 649.99,
      stock: 22,
      status: 'In Stock'
    },
    {
      id: 7,
      name: 'Leather Jacket',
      image: 'https://placehold.co/100x100/333/FFF?text=Jacket',
      sku: 'APP-7701',
      category: 'Clothing',
      price: 199.99,
      stock: 0,
      status: 'Out of Stock'
    },
    {
      id: 8,
      name: 'Running Shoes',
      image: 'https://placehold.co/100x100/333/FFF?text=Shoes',
      sku: 'SHO-8801',
      category: 'Sports',
      price: 129.99,
      stock: 35,
      status: 'In Stock'
    }
  ];

  // Populate products table
  const productsTableBody = document.getElementById('products-table-body');
  
  if (productsTableBody) {
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" class="product-checkbox" data-id="${product.id}"></td>
        <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td><span class="product-category">${product.category}</span></td>
        <td class="product-price">$${product.price.toFixed(2)}</td>
        <td class="product-stock">${product.stock}</td>
        <td><span class="status status-${product.status.toLowerCase().replace(/\s+/g, '')}">${product.status}</span></td>
        <td>
          <div class="action-buttons">
            <a href="add-product.html?edit=${product.id}" class="action-btn edit"><i class="fas fa-edit"></i></a>
            <button class="action-btn delete" data-id="${product.id}" data-modal="delete-modal"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `;
      productsTableBody.appendChild(row);
    });

    // Delete button functionality
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const modal = document.getElementById('delete-modal');
        
        if (modal) {
          const confirmBtn = modal.querySelector('#confirm-delete');
          modal.classList.add('show');
          
          confirmBtn.onclick = function() {
            // Remove the product row
            const row = document.querySelector(`tr input[data-id="${productId}"]`).closest('tr');
            if (row) {
              row.remove();
            }
            
            modal.classList.remove('show');
            showNotification('Product deleted successfully', 'success');
          };
        }
      });
    });

    // Initialize bulk action buttons
    const bulkDeleteBtn = document.getElementById('delete-selected');
    if (bulkDeleteBtn) {
      bulkDeleteBtn.disabled = true;
    }
    
    const bulkUpdateBtn = document.getElementById('update-selected');
    if (bulkUpdateBtn) {
      bulkUpdateBtn.disabled = true;
      
      bulkUpdateBtn.addEventListener('click', function() {
        const selectedProducts = document.querySelectorAll('.product-checkbox:checked');
        if (selectedProducts.length > 0) {
          showNotification(`${selectedProducts.length} products selected for update`, 'info');
        }
      });
    }
  }
});
