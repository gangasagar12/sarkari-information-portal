// =============================================
    // DATA
    // =============================================
    const DISTRICTS = [
        { id: 1, name: 'Bhojpur',     hq: 'Bhojpur',      municipalities: 9,  area: '1,507 sq km' },
        { id: 2, name: 'Dhankuta',    hq: 'Dhankuta',     municipalities: 8,  area: '891 sq km'   },
        { id: 3, name: 'Ilam',        hq: 'Ilam',         municipalities: 10, area: '1,703 sq km' },
        { id: 4, name: 'Jhapa',       hq: 'Birtamod',     municipalities: 9,  area: '1,606 sq km' },
        { id: 5, name: 'Khotang',     hq: 'Diktel',       municipalities: 9,  area: '1,591 sq km' },
        { id: 6, name: 'Morang',      hq: 'Biratnagar',   municipalities: 17, area: '1,855 sq km' },
        { id: 7, name: 'Okhaldhunga', hq: 'Okhaldhunga',  municipalities: 8,  area: '1,074 sq km' },
        { id: 8, name: 'Panchthar',   hq: 'Phidim',       municipalities: 7,  area: '1,564 sq km' },
    ];

    const SEARCH_DATA = [
        ...DISTRICTS.map(d => ({ type: 'District', name: d.name, sub: `HQ: ${d.hq}` })),
        { type: 'Municipality', name: 'Biratnagar Metropolitan', sub: 'Morang District' },
        { type: 'Municipality', name: 'Damak Municipality', sub: 'Jhapa District' },
        { type: 'Municipality', name: 'Ilam Municipality', sub: 'Ilam District' },
        { type: 'Municipality', name: 'Dhankuta Municipality', sub: 'Dhankuta District' },
        { type: 'Municipality', name: 'Birtamod Municipality', sub: 'Jhapa District' },
    ];

    // =============================================
    // NAVIGATION
    // =============================================
    let currentSection = 'home';

    function navigateTo(section) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        const el = document.getElementById(section);
        if (el) {
            el.classList.add('active');
            currentSection = section;
        }
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`.nav-link`).forEach(l => {
            if (l.getAttribute('onclick')?.includes(`'${section}'`)) l.classList.add('active');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (section === 'districts') renderDistricts(DISTRICTS);
        // Re-trigger reveals
        setTimeout(triggerReveals, 100);
        closeMenu();
    }

    // =============================================
    // HEADER SCROLL
    // =============================================
    window.addEventListener('scroll', () => {
        const header = document.getElementById('mainHeader');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // =============================================
    // MOBILE MENU
    // =============================================
    function toggleMenu() {
        document.getElementById('mainNav').classList.toggle('open');
    }
    function closeMenu() {
        document.getElementById('mainNav').classList.remove('open');
    }

    // =============================================
    // DISTRICTS RENDER
    // =============================================
    function renderDistricts(list) {
        const grid = document.getElementById('districtsGrid');
        const count = document.getElementById('districtCount');
        if (!grid) return;
        if (count) count.textContent = `${list.length} district${list.length !== 1 ? 's' : ''}`;
        grid.innerHTML = list.map(d => `
            <div class="district-card" onclick="showNotification('${d.name} District selected', 'success')">
                <div class="district-number">District ${String(d.id).padStart(2, '0')}</div>
                <h3>${d.name}</h3>
                <div class="district-meta">
                    <span>🏛️ ${d.municipalities} Municipalities</span>
                    <span>📐 ${d.area}</span>
                </div>
                <div class="district-hq">Headquarters: <strong>${d.hq}</strong></div>
            </div>
        `).join('');
        setTimeout(triggerReveals, 80);
    }

    function filterDistricts() {
        const q = document.getElementById('districtFilter').value.toLowerCase();
        const filtered = DISTRICTS.filter(d =>
            d.name.toLowerCase().includes(q) || d.hq.toLowerCase().includes(q)
        );
        renderDistricts(filtered);
    }

    // =============================================
    // SEARCH
    // =============================================
    function performSearch() {
        const q = document.getElementById('globalSearch').value.trim().toLowerCase();
        const results = document.getElementById('searchResults');
        if (!q) { results.classList.add('hidden'); return; }
        const matches = SEARCH_DATA.filter(item =>
            item.name.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
        );
        if (!matches.length) {
            results.innerHTML = '<div class="search-result-item" style="color:#6b7280;">No results found.</div>';
        } else {
            results.innerHTML = matches.map(m => `
                <div class="search-result-item">
                    <strong>${m.name}</strong>
                    <span style="color:#9ca3af; font-size:0.82rem; margin-left:.5rem;">${m.type} · ${m.sub}</span>
                </div>
            `).join('');
        }
        results.classList.remove('hidden');
    }

    document.getElementById('globalSearch').addEventListener('keydown', e => {
        if (e.key === 'Enter') performSearch();
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.search-section')) {
            document.getElementById('searchResults').classList.add('hidden');
        }
    });

    // =============================================
    // SERVICES TABS
    // =============================================
    function switchServiceTab(tabName, btn) {
        document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active-tab'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        const tab = document.getElementById(tabName + 'Tab');
        if (tab) tab.classList.add('active-tab');
        if (btn) btn.classList.add('active');
    }

    // =============================================
    // FORM HANDLERS
    // =============================================
    function submitFeedback(e) {
        e.preventDefault();
        const ticketId = `KP-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
        showNotification(`Submitted! Ticket ID: ${ticketId}`, 'success');
        e.target.reset();
    }

    function applyService(name) {
        showNotification(`Application started: ${name}`, 'success');
    }

    function searchWard() {
        const q = document.getElementById('wardSearch').value.trim();
        const res = document.getElementById('wardResults');
        if (!q) return;
        res.innerHTML = `<div style="padding:1rem; background:#fff; border:1px solid #e2d9c8; border-radius:8px; font-size:.88rem; color:#374151;">
            Searching for ward: <strong>${q}</strong> — Please contact your local municipality office for ward-specific information.
        </div>`;
        res.classList.remove('hidden');
    }

    // =============================================
    // NOTIFICATION
    // =============================================
    function showNotification(msg, type = 'success') {
        const n = document.createElement('div');
        n.className = `notification notification-${type}`;
        n.textContent = msg;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3500);
    }

    // =============================================
    // SCROLL REVEAL
    // =============================================
    function triggerReveals() {
        const reveals = document.querySelectorAll('.reveal:not(.visible)');
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) el.classList.add('visible');
        });
    }
    window.addEventListener('scroll', triggerReveals, { passive: true });
    window.addEventListener('load', triggerReveals);
    document.addEventListener('DOMContentLoaded', () => {
        triggerReveals();
        renderDistricts(DISTRICTS);
    });