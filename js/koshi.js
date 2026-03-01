
function switchTab(tabName) {
  // Hide all tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  // Remove active from all buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  const tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add('active');
  }

  // Mark button as active
  event.target.classList.add('active');
}

function toggleFAQ(element) {
  const faqItem = element.closest('.faq-item');
  
  // Close other open FAQs
  document.querySelectorAll('.faq-item.active').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });

  // Toggle current FAQ
  faqItem.classList.toggle('active');
}

function searchFAQ() {
  const query = document.getElementById('faqSearch').value.toLowerCase();
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question span:first-child').textContent.toLowerCase();
    
    if (question.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


function filterOfficials() {
  const province = document.getElementById('provinceOfficials')?.value;
  const position = document.getElementById('positionFilter')?.value;

  // Filter logic here - update displayed officials based on selections
  console.log(`Filter by Province: ${province}, Position: ${position}`);
}


function filterProjects() {
  const status = document.getElementById('projectStatus')?.value;
  const category = document.getElementById('projectCategory')?.value;

  // Filter logic here
  console.log(`Filter by Status: ${status}, Category: ${category}`);
}


function filterAnnouncements() {
  const category = document.getElementById('announcementCategory')?.value;

  // Filter logic here
  console.log(`Filter by Category: ${category}`);
}


function loadBudget() {
  const year = document.getElementById('budgetYear')?.value;
  const level = document.getElementById('budgetLevel')?.value;

  console.log(`Load budget for ${year}, Level: ${level}`);
  
  // Simulate loading with animation
  document.querySelectorAll('.budget-card').forEach((card, index) => {
    card.style.animation = `fadeIn 0.3s ease-out ${index * 0.1}s`;
  });
}


function loadCensusData() {
  const province = document.getElementById('censusProvince')?.value;

  console.log(`Load census data for ${province}`);

  // Simulate data loading
  document.querySelectorAll('.census-card').forEach((card, index) => {
    card.style.animation = `slideUp 0.3s ease-out ${index * 0.1}s`;
  });
}


function submitGrievance(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const grievance = Object.fromEntries(formData);

  // Generate ticket ID
  const ticketId = `GRV-${new Date().getFullYear()}-${Math.random().toString().slice(2, 7)}`;

  console.log('Grievance submitted:', grievance);
  console.log('Ticket ID:', ticketId);

  // Show success notification
  showNotification(`Grievance submitted successfully! Ticket ID: ${ticketId}`, 'success');

  // Reset form
  event.target.reset();
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <h4>${type.toUpperCase()}</h4>
      <p>${message}</p>
    </div>
    <button onclick="this.parentElement.remove()">×</button>
  `;

  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}


function initializeBudgetChart() {
  const ctx = document.getElementById('budgetChart');
  
  if (ctx && typeof Chart !== 'undefined') {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Development', 'Education & Health', 'Social Welfare', 'Admin'],
        datasets: [{
          data: [25000000, 18000000, 7000000, 5000000],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 12,
                weight: 500
              }
            }
          }
        }
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('Advanced features initialized');
  
  // Initialize first tabs
  document.querySelectorAll('.tab-button').forEach((btn, index) => {
    if (index === 0) btn.classList.add('active');
  });

  // Initialize first tab content
  document.querySelectorAll('.tab-pane').forEach((pane, index) => {
    if (index === 0) pane.classList.add('active');
  });

  // Initialize charts if Chart.js is available
  initializeBudgetChart();

  // Setup observer for lazy loading
  setupLazyLoad();
});


function setupLazyLoad() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.5s ease-out';
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.service-card, .official-card, .project-card').forEach(card => {
    observer.observe(card);
  });
}


function applyForService(serviceName) {
  showNotification(`Application started for ${serviceName}. Redirecting to application form...`, 'info');
  
  // Simulate redirect after 2 seconds
  setTimeout(() => {
    window.location.href = `/apply/${serviceName.toLowerCase().replace(/\s+/g, '-')}`;
  }, 2000);
}