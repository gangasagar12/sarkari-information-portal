
class SarkariPortalEnhanced {
  constructor() {
    this.currentSection = 'home';
    this.districts = this.initializeDistricts();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSection('home');
    this.setupThemeToggle();
    this.setupMobileMenu();
    console.log('✓ Enhanced Portal Initialized');
  }

  setupEventListeners() {
    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        this.loadSection(section);
        this.closeMobileMenu();
      });
    });
  }

  loadSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionName);
    if (section) {
      section.classList.add('active');
      this.updateBreadcrumb(sectionName);
      this.updateMenuActive(sectionName);
      this.currentSection = sectionName;

      // Load section-specific content
      if (sectionName === 'districts') {
        this.loadDistrictsContent();
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateBreadcrumb(sectionName) {
    const breadcrumb = document.getElementById('breadcrumbCurrent');
    const labels = {
      'home': '',
      'provinces': 'Provinces',
      'districts': 'Districts',
      'municipalities': 'Municipalities',
      'wards': 'Wards',
      'contact': 'Contact'
    };

    if (labels[sectionName]) {
      breadcrumb.textContent = ' > ' + labels[sectionName];
    } else {
      breadcrumb.textContent = '';
    }
  }

  updateMenuActive(sectionName) {
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.section === sectionName) {
        item.classList.add('active');
      }
    });
  }

  // ========================================
  // INITIALIZE DISTRICTS DATA
  // ========================================
  initializeDistricts() {
    return {
      'koshi': ['Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Okhaldhunga', 'Panchthar'],
      'madhesh': ['Parsa', 'Rautahat', 'Bara', 'Saptari', 'Siraha', 'Dhanusa', 'Mahottari', 'Sunsari'],
      'bagmati': ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Sindhuli', 'Makwanpur', 'Ramechhap'],
      'gandaki': ['Gorkha', 'Lamjung', 'Tanahu', 'Kaski', 'Myagdi', 'Parbat'],
      'lumbini': ['Kapilvastu', 'Rupandehi', 'Arghakhanchi', 'Gulmi', 'Palpa', 'Nawalparasi', 'Bardiya', 'Dang', 'Banke', 'Bardia', 'Surkhet', 'Dailekh'],
      'karnali': ['Jumla', 'Kalikot', 'Jajarkot', 'Dolpa', 'Mugu', 'Humla', 'Bajura', 'Bajhang', 'Achham', 'Doti'],
      'sudurpashchim': ['Baitadi', 'Dadeldhura', 'Doti', 'Bajhang', 'Bajura', 'Kailali', 'Kanchanpur', 'Dhangadi', 'Mahakali']
    };
  }

  loadDistrictsContent() {
    const provinceFilter = document.getElementById('provinceFilter');
    if (!provinceFilter) return;

    const selectedProvince = provinceFilter.value;
    const districtsList = document.getElementById('districtsList');

    if (!districtsList) return;

    let districtsToShow = [];

    if (selectedProvince) {
      districtsToShow = this.districts[selectedProvince] || [];
    } else {
      // Show all districts
      Object.values(this.districts).forEach(dists => {
        districtsToShow = [...districtsToShow, ...dists];
      });
    }

    districtsList.innerHTML = districtsToShow
      .map(district => `
        <div class="district-item" onclick="showDistrictDetail('${district}')">
          ${district}
        </div>
      `)
      .join('');
  }

  // ========================================
  // THEME TOGGLE
  // ========================================
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
  }

  // ========================================
  // MOBILE MENU
  // ========================================
  setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar?.contains(e.target) && !menuToggle?.contains(e.target)) {
          sidebar?.classList.remove('active');
        }
      }
    });
  }

  closeMobileMenu() {
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar')?.classList.remove('active');
    }
  }

  // ========================================
  // UTILITIES
  // ========================================
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      z-index: 3000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================
const portal = new SarkariPortalEnhanced();

function navigate(section) {
  portal.loadSection(section);
}

function filterDistricts() {
  portal.loadDistrictsContent();
}

function showDistrictDetail(districtName) {
  portal.showNotification(`You selected: ${districtName}`);
  console.log('District:', districtName);
}

function performGlobalSearch() {
  const query = document.getElementById('globalSearch')?.value;
  if (!query) {
    portal.showNotification('Please enter a search term', 'error');
    return;
  }

  portal.showNotification(`Searching for: "${query}"...`);
  console.log('Global search:', query);
  
  // Implement actual search logic here
}

function handleContactSubmit(event) {
  event.preventDefault();
  portal.showNotification('Message sent successfully!');
  event.target.reset();
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Ready - Portal Active');
});


document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch')?.focus();
  }

  // Escape to close mobile menu
  if (e.key === 'Escape') {
    portal.closeMobileMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar')?.classList.remove('active');
  }
});
