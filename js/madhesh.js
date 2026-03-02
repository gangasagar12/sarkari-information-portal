

const DISTRICTS = [
  { id:'01', name:'Saptari',   nepali:'सप्तरी',  hq:'Rajbiraj', area:'1,363 sq km', pop:'638,347', munis:13, wards:112 },
  { id:'02', name:'Siraha',    nepali:'सिरहा',   hq:'Lahan',    area:'1,188 sq km', pop:'637,288', munis:17, wards:134 },
  { id:'03', name:'Dhanusha',  nepali:'धनुषा',   hq:'Janakpur', area:'1,180 sq km', pop:'754,776', munis:18, wards:147, isCapital:true },
  { id:'04', name:'Mahottari', nepali:'महोत्तरी',hq:'Jaleshwar',area:'1,002 sq km', pop:'627,580', munis:10, wards:78  },
  { id:'05', name:'Sarlahi',   nepali:'सर्लाही', hq:'Malangwa', area:'1,259 sq km', pop:'769,729', munis:16, wards:127 },
  { id:'06', name:'Rautahat',  nepali:'रौतहट',   hq:'Gaur',     area:'1,126 sq km', pop:'688,481', munis:17, wards:131 },
  { id:'07', name:'Bara',      nepali:'बारा',    hq:'Kalaiya',  area:'1,190 sq km', pop:'756,971', munis:16, wards:130 },
  { id:'08', name:'Parsa',     nepali:'पर्सा',   hq:'Birgunj',  area:'1,353 sq km', pop:'601,017', munis:12, wards:99  },
];

const SEARCH_DATA = [
  ...DISTRICTS.map(d=>({type:'District',name:d.name,detail:`HQ: ${d.hq}`})),
  {type:'Municipality',name:'Birgunj Metropolitan City',detail:'Parsa District'},
  {type:'Municipality',name:'Janakpur Sub-Metropolitan City',detail:'Dhanusha District'},
  {type:'Municipality',name:'Kalaiya Sub-Metropolitan City',detail:'Bara District'},
  {type:'Municipality',name:'Lahan Municipality',detail:'Siraha District'},
  {type:'Municipality',name:'Rajbiraj Municipality',detail:'Saptari District'},
  {type:'Municipality',name:'Jaleshwar Municipality',detail:'Mahottari District'},
  {type:'Municipality',name:'Malangwa Municipality',detail:'Sarlahi District'},
  {type:'Municipality',name:'Gaur Municipality',detail:'Rautahat District'},
];

// ── NAVIGATION ───────────────────────────────
function navigateTo(id) {
  document.querySelectorAll('.content-section').forEach(s=>s.classList.remove('active'));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.querySelectorAll(`.nav-link[onclick*="${id}"]`).forEach(l=>l.classList.add('active'));

  if (id==='districts') renderDistricts(DISTRICTS);

  window.scrollTo({top:0,behavior:'smooth'});
  closeMobileMenu();
  setTimeout(triggerReveal, 60);
}

// ── MOBILE MENU ──────────────────────────────
function toggleMenu() {
  const ham = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const open = ham.classList.toggle('open');
  drawer.classList.toggle('open', open);
}
function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileDrawer').classList.remove('open');
}

// ── DISTRICTS ────────────────────────────────
function renderDistricts(data) {
  const grid = document.getElementById('districtsGrid');
  const cnt  = document.getElementById('districtCount');
  if (!grid) return;
  cnt.textContent = `${data.length} of ${DISTRICTS.length}`;
  grid.innerHTML = data.map(d=>`
    <div class="district-card">
      <div class="dc-top">
        <span class="dc-num">DISTRICT ${d.id}</span>
        ${d.isCapital?'<span class="dc-hq-badge">Province Capital</span>':''}
      </div>
      <div class="dc-body">
        <div class="dc-name">${d.name}</div>
        <div class="dc-sub">${d.nepali} · HQ: <span>${d.hq}</span></div>
        <div class="dc-stats">
          <div class="dc-stat"><div class="dc-stat-lbl">Area</div><div class="dc-stat-val">${d.area}</div></div>
          <div class="dc-stat"><div class="dc-stat-lbl">Population</div><div class="dc-stat-val">${d.pop}</div></div>
          <div class="dc-stat"><div class="dc-stat-lbl">Municipalities</div><div class="dc-stat-val">${d.munis}</div></div>
          <div class="dc-stat"><div class="dc-stat-lbl">Wards</div><div class="dc-stat-val">${d.wards}</div></div>
        </div>
      </div>
    </div>`).join('');
}

function filterDistricts() {
  const q = document.getElementById('districtFilter').value.toLowerCase();
  renderDistricts(DISTRICTS.filter(d=>
    d.name.toLowerCase().includes(q)||d.nepali.includes(q)||d.hq.toLowerCase().includes(q)
  ));
}

// ── SEARCH ───────────────────────────────────
function performSearch() {
  const q = document.getElementById('globalSearch').value.toLowerCase().trim();
  const box = document.getElementById('searchResults');
  if (!q) { box.classList.add('hidden'); return; }

  const hits = SEARCH_DATA.filter(x=>x.name.toLowerCase().includes(q)||x.detail.toLowerCase().includes(q));
  if (!hits.length) {
    box.innerHTML = '<span style="font-size:.82rem;color:#6B7280">No results found. Try a different term.</span>';
  } else {
    box.innerHTML = hits.map(h=>`
      <span class="result-chip" onclick="navigateTo('districts')">
        <strong>${h.type}</strong>${h.name} · <span style="color:#9CA3AF">${h.detail}</span>
      </span>`).join('');
  }
  box.classList.remove('hidden');
}

// ── WARD SEARCH ──────────────────────────────
function searchWard() {
  const q = document.getElementById('wardSearch').value.trim();
  const res = document.getElementById('wardResults');
  if (!q) return;
  res.innerHTML = `
    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:1.25rem;">
      <strong style="color:#1F2937;font-size:.9rem">Search: "${q}"</strong>
      <p style="font-size:.8rem;color:#6B7280;margin-top:.4rem;line-height:1.6">
        Please contact the respective municipality office or district administration for exact ward office location and contact details.
      </p>
      <div style="display:flex;gap:.5rem;margin-top:.85rem;flex-wrap:wrap;">
        <a href="tel:+977415234000" style="background:#B94010;color:white;padding:.4rem .9rem;border-radius:7px;font-size:.78rem;font-weight:600;text-decoration:none;">📞 Call Admin</a>
        <button onclick="navigateTo('contact')" style="background:#F4EDE3;border:1.5px solid rgba(185,64,16,.14);color:#B94010;padding:.4rem .9rem;border-radius:7px;font-size:.78rem;font-weight:600;cursor:pointer;">✉️ Send Enquiry</button>
      </div>
    </div>`;
  res.classList.remove('hidden');
}

// ── SERVICE TABS ─────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll('.service-content').forEach(t=>t.classList.remove('active-tab'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(id+'Tab').classList.add('active-tab');
  btn.classList.add('active');
}

function applyService(name) { showToast(`Opening application for: ${name}`); }

// ── FEEDBACK ─────────────────────────────────
function submitFeedback(e) {
  e.preventDefault();
  showToast('✓ Your message has been submitted successfully.');
  e.target.reset();
}

// ── TOAST ────────────────────────────────────
function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.transition='opacity .3s'; t.style.opacity='0'; }, 2600);
  setTimeout(()=>t.remove(), 2900);
}

// ── REVEAL ───────────────────────────────────
function triggerReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>el.classList.add('visible'));
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.08});

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  renderDistricts(DISTRICTS);

  // Header shadow on scroll
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10));

  // Search on enter
  document.getElementById('globalSearch')?.addEventListener('keyup',e=>{ if(e.key==='Enter') performSearch(); });

  // App banner close
  document.getElementById('bannerClose')?.addEventListener('click',()=>{
    document.getElementById('appBanner').style.display='none';
  });

  // Start reveal
  setTimeout(triggerReveal, 80);
});