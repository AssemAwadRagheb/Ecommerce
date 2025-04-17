
document.addEventListener('DOMContentLoaded', function() {
  // Sample data for recent products
  const recentProducts = [
    { name: 'Premium Smart Watch', category: 'Electronics', price: '$299.99', status: 'In Stock' },
    { name: 'Wireless Earbuds', category: 'Electronics', price: '$129.99', status: 'In Stock' },
    { name: 'Professional Camera', category: 'Electronics', price: '$899.99', status: 'Low Stock' },
    { name: 'Leather Jacket', category: 'Clothing', price: '$199.99', status: 'Out of Stock' },
    { name: 'Running Shoes', category: 'Sports', price: '$129.99', status: 'In Stock' }
  ];
  
  // Sample data for top selling products
  const topProducts = [
    { name: 'Smart Watch Series X', image: 'https://placehold.co/50x50/333/FFF?text=Watch', price: '$299.99', sales: 245 },
    { name: 'Wireless Earbuds Pro', image: 'https://placehold.co/50x50/333/FFF?text=Earbuds', price: '$129.99', sales: 189 },
    { name: 'Premium Headphones', image: 'https://placehold.co/50x50/333/FFF?text=Headphones', price: '$199.99', sales: 156 },
    { name: 'Smart TV 55"', image: 'https://placehold.co/50x50/333/FFF?text=TV', price: '$649.99', sales: 132 }
  ];
  
  // Sample data for recent activities
  const recentActivities = [
    { icon: 'fas fa-shopping-cart', title: 'New order #12345 - $230.00', time: '2 minutes ago' },
    { icon: 'fas fa-user', title: 'New customer registered', time: '15 minutes ago' },
    { icon: 'fas fa-star', title: 'New review on Smart Watch', time: '1 hour ago' },
    { icon: 'fas fa-box', title: 'Product out of stock: Leather Jacket', time: '2 hours ago' },
    { icon: 'fas fa-dollar-sign', title: 'Payment received from order #12342', time: '3 hours ago' }
  ];
  
  // Populate recent products table
  const recentProductsTable = document.getElementById('recent-products-table');
  if (recentProductsTable) {
    recentProducts.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td><span class="product-category">${product.category}</span></td>
        <td class="product-price">${product.price}</td>
        <td><span class="status status-${product.status.toLowerCase().replace(/\s+/g, '')}">${product.status}</span></td>
      `;
      recentProductsTable.appendChild(row);
    });
  }
  
  // Populate top products list
  const topProductsList = document.getElementById('top-products-list');
  if (topProductsList) {
    topProducts.forEach(product => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-meta">
            <span><i class="fas fa-tag"></i> ${product.price}</span>
            <span class="product-sales"><i class="fas fa-shopping-cart"></i> ${product.sales} sold</span>
          </div>
        </div>
      `;
      topProductsList.appendChild(li);
    });
  }
  
  // Populate recent activities
  const recentActivitiesList = document.getElementById('recent-activities');
  if (recentActivitiesList) {
    recentActivities.forEach(activity => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="activity-icon"><i class="${activity.icon}"></i></div>
        <div class="activity-content">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-time">${activity.time}</div>
        </div>
      `;
      recentActivitiesList.appendChild(li);
    });
  }
  
  // Sales chart
  const chartContainer = document.getElementById('salesChart');
  if (chartContainer && window.Chart) {
    const ctx = chartContainer.getContext('2d');
    
    const salesData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Sales',
        data: [1200, 1900, 1500, 2500, 1800, 3000, 2200],
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: '#4CAF50',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#4CAF50'
      }]
    };
    
    const salesChart = new Chart(ctx, {
      type: 'line',
      data: salesData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
    
    // Add period selector functionality
    const periodButtons = document.querySelectorAll('.period-selector button');
    if (periodButtons.length) {
      periodButtons.forEach(button => {
        button.addEventListener('click', function() {
          periodButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Update chart data based on selected period
          if (this.textContent === 'Week') {
            salesChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            salesChart.data.datasets[0].data = [1200, 1900, 1500, 2500, 1800, 3000, 2200];
          } else if (this.textContent === 'Month') {
            salesChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            salesChart.data.datasets[0].data = [8000, 12000, 9500, 14000];
          } else if (this.textContent === 'Year') {
            salesChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            salesChart.data.datasets[0].data = [25000, 30000, 28000, 35000, 40000, 43000, 38000, 41000, 45000, 48000, 51000, 59000];
          }
          
          salesChart.update();
        });
      });
    }
  }
});
