/* =============================================
   BAGMATI PROVINCE — OFFICIAL PORTAL JS
============================================= */

'use strict';

/* ── DATA ──────────────────────────────────── */
const DISTRICTS = [
  { id: 'D01', name: 'Kathmandu',    hq: 'Kathmandu',   area: '395 sq km',  pop: '1,744,240', munis: 11, wards: 265 },
  { id: 'D02', name: 'Lalitpur',     hq: 'Lalitpur',    area: '385 sq km',  pop: '468,132',   munis: 7,  wards: 100 },
  { id: 'D03', name: 'Bhaktapur',    hq: 'Bhaktapur',   area: '119 sq km',  pop: '304,651',   munis: 3,  wards: 51  },
  { id: 'D04', name: 'Kavrepalanchok',hq: 'Dhulikhel',  area: '1,396 sq km',pop: '381,937',   munis: 14, wards: 133 },
  { id: 'D05', name: 'Sindhupalchok',hq: 'Chautara',    area: '2,542 sq km',pop: '287,798',   munis: 10, wards: 107 },
  { id: 'D06', name: 'Nuwakot',      hq: 'Bidur',       area: '1,121 sq km',pop: '277,471',   munis: 11, wards: 100 },
  { id: 'D07', name: 'Rasuwa',       hq: 'Dhunche',     area: '1,544 sq km',pop: '43,300',    munis: 5,  wards: 30  },
  { id: 'D08', name: 'Dhading',      hq: 'Nilkantha',   area: '1,926 sq km',pop: '336,067',   munis: 10, wards: 97  },
  { id: 'D09', name: 'Makwanpur',    hq: 'Hetauda',     area: '2,426 sq km',pop: '420,477',   munis: 10, wards: 94  },
  { id: 'D10', name: 'Chitwan',      hq: 'Bharatpur',   area: '2,218 sq km',pop: '579,984',   munis: 7,  wards: 72  },
  { id: 'D11', name: 'Sindhuli',     hq: 'Sindhuli',    area: '2,491 sq km',pop: '296,192',   munis: 10, wards: 95  },
  { id: 'D12', name: 'Ramechhap',    hq: 'Manthali',    area: '1,546 sq km',pop: '202,646',   munis: 9,  wards: 80  },
  { id: 'D13', name: 'Dolakha',      hq: 'Charikot',    area: '2,191 sq km',pop: '186,557',   munis: 10, wards: 81  }
];

const SEARCH_DATA = [
  ...DISTRICTS.map(d => ({ type: 'District', name: d.name, section: 'districts' })),
  { type: 'Municipality', name: 'Kathmandu Metropolitan', section: 'municipalities' },
  { type: 'Municipality', name: 'Lalitpur Metropolitan', section: 'municipalities' },
  { type: 'Municipality', name: 'Bharatpur Metropolitan', section: 'municipalities' },
  { type: 'Municipality', name: 'Hetauda Sub-Metropolitan', section: 'municipalities' },
  { type: 'Service', name: 'Birth Registration', section: 'services' },
  { type: 'Service', name: 'Marriage Registration', section: 'services' },
  { type: 'Service', name: 'Building Permit', section: 'services' },
  { type: 'Service', name: 'Citizenship Certificate', section: 'services' },
  { type: 'Ministry', name: 'Ministry of Infrastructure', section: 'ministries' },
  { type: 'Ministry', name: 'Ministry of Social Development', section: 'ministries' },
  { type: 'Education', name: 'Tribhuvan University', section: 'education' },
  { type: 'Education', name: 'Kathmandu University', section: 'education' },
];

/* ── NAVIGATION ────────────────────────────── */
function navigateTo(section) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById(section);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes(`'${section}'`)) {
      l.classList.add('active');
    }
  });

  closeMobileMenu();
  triggerReveal();

  if (section === 'districts') renderDistricts(DISTRICTS);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── MOBILE MENU ───────────────────────────── */
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileDrawer').classList.remove('open');
}

/* ── DISTRICTS RENDER ──────────────────────── */
function renderDistricts(list) {
  const grid = document.getElementById('districtsGrid');
  const count = document.getElementById('districtCount');
  if (!grid) return;

  count.textContent = `${list.length} district${list.length !== 1 ? 's' : ''}`;

  grid.innerHTML = list.map(d => `
    <div class="district-card">
      <div class="dc-top">
        <span class="dc-num">${d.id}</span>
        <span class="dc-hq-badge">HQ: ${d.hq}</span>
      </div>
      <div class="dc-body">
        <div class="dc-name">${d.name}</div>
        <div class="dc-sub">Bagmati Province · <span>District ${d.id.replace('D0','').replace('D','')}</span></div>
        <div class="dc-stats">
          <div class="dc-stat"><div class="dc-stat-lbl">Population</div><div class="dc-stat-val">${d.pop}</div></div>
          <div class="dc-stat"><div class="dc-stat-lbl">Area</div><div class="dc-stat-val">${d.area}</div></div>
          <div class="dc-stat"><div class="dc-stat-lbl">Municipalities</div><div class="dc-stat-val">${d.munis}</div></div>
          <div class="dc-stat"><div class="dc-stat-lbl">Wards</div><div class="dc-stat-val">${d.wards}</div></div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterDistricts() {
  const q = document.getElementById('districtFilter').value.toLowerCase();
  const filtered = DISTRICTS.filter(d =>
    d.name.toLowerCase().includes(q) || d.hq.toLowerCase().includes(q)
  );
  renderDistricts(filtered);
}

/* ── SEARCH ────────────────────────────────── */
function performSearch() {
  const q       = document.getElementById('globalSearch').value.trim().toLowerCase();
  const results = document.getElementById('searchResults');
  if (!q) { results.classList.add('hidden'); return; }

  const matches = SEARCH_DATA.filter(item =>
    item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
  ).slice(0, 8);

  if (!matches.length) {
    results.innerHTML = '<span style="font-size:.8rem;color:var(--text-soft);">No results found.</span>';
    results.classList.remove('hidden');
    return;
  }

  results.innerHTML = matches.map(m =>
    `<span class="result-chip" onclick="navigateTo('${m.section}')">
      <strong>${m.type}</strong> ${m.name}
    </span>`
  ).join('');
  results.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('globalSearch');
  if (inp) {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });
  }
});

/* ── SERVICE TABS ──────────────────────────── */
function switchServiceTab(tabId, btn) {
  document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active-tab'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById(tabId + 'Tab');
  if (tab) tab.classList.add('active-tab');
  btn.classList.add('active');
}

/* ── WARD SEARCH ───────────────────────────── */
function searchWard() {
  const q       = document.getElementById('wardSearch').value.trim().toLowerCase();
  const results = document.getElementById('wardResults');
  if (!q) { results.classList.add('hidden'); return; }

  const district = DISTRICTS.find(d =>
    d.name.toLowerCase().includes(q) || q.includes(d.name.toLowerCase())
  );

  if (district) {
    results.innerHTML = `
      <div class="ward-box" style="margin-top:0">
        <h4>📍 ${district.name} District — Ward Offices</h4>
        <ul>
          <li><strong>Total Wards:</strong> ${district.wards} wards across ${district.munis} municipalities</li>
          <li><strong>District HQ:</strong> ${district.hq}</li>
          <li><strong>Office Hours:</strong> Sunday – Friday, 10:00 AM – 5:00 PM</li>
          <li><strong>Phone:</strong> Contact District Coordination Committee</li>
          <li><strong>Area:</strong> ${district.area}</li>
        </ul>
      </div>`;
    results.classList.remove('hidden');
  } else {
    results.innerHTML = `<span style="font-size:.8rem;color:var(--text-soft);">No ward office found for "${q}". Try entering a district name.</span>`;
    results.classList.remove('hidden');
  }
}

/* ── FEEDBACK FORM ─────────────────────────── */
function submitFeedback(e) {
  e.preventDefault();
  showToast('✅ Your message has been submitted successfully.');
  e.target.reset();
}

/* ── APPLY SERVICE ─────────────────────────── */
function applyService(name) {
  showToast(`📋 Application for "${name}" has been initiated. Check your email for confirmation.`);
}

/* ── TOAST ─────────────────────────────────── */
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* ── SCROLL HEADER ─────────────────────────── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if (header) header.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── INTERSECTION REVEAL ───────────────────── */
function triggerReveal() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }, 50);
}

/* ── INIT ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderDistricts(DISTRICTS);
  triggerReveal();
});

/* ── MINISTER DATA ─────────────────────────── */
const MINISTERS = {
  internal: {
    avatar: '🧑‍⚖️', name: 'Hon. Rajendra Pandey', title: 'Minister — Ministry of Internal Affairs & Law',
    party: 'CPN (Unified Socialist)', badge: 'Internal Affairs & Law',
    background: 'Rajendra Pandey was born in 1968 in Sindhuli district. A veteran legal practitioner and politician, he has served the Bagmati Province legislature since its inception in 2018. Known for his work in constitutional law and provincial governance reform.',
    education: ['LLB — Tribhuvan University, Kathmandu (1995)', 'LLM — Law Campus, TU (1998)', 'Diploma in Public Administration — Nepal Administrative Staff College (2003)', 'Short Course in Governance — New Delhi, India (2010)'],
    career: ['Advocate, Supreme Court of Nepal (1996–2008)', 'Member, Province No. 3 Constituent Assembly (2008–2013)', 'Deputy Mayor, Sindhuli Municipality (2013–2017)', 'Provincial Assembly Member, Bagmati (2018–present)', 'Appointed Minister — Internal Affairs (2022)'],
    ministryDesc: 'The Ministry of Internal Affairs & Law oversees law enforcement across 13 districts, coordinates the Provincial Police Office, manages disaster risk reduction programs, and enforces provincial legislation and legal frameworks.',
    email: 'internal@bagmati.gov.np', phone: '+977 (057) 520-101'
  },
  infrastructure: {
    avatar: '👷', name: 'Hon. Sunita Sharma', title: 'Minister — Ministry of Physical Infrastructure',
    party: 'Nepali Congress', badge: 'Physical Infrastructure',
    background: 'Sunita Sharma, born 1974 in Makwanpur, is a civil engineer by profession and has championed rural road connectivity across Bagmati Province. She is the first woman to hold the infrastructure portfolio in the province and has been recognized for accelerating construction of 14 key road projects.',
    education: ['B.E. Civil Engineering — IOE Pulchowk Campus, TU (1997)', 'M.E. Structural Engineering — Kathmandu University (2001)', 'PGD in Urban Infrastructure — Asian Institute of Technology, Thailand (2005)'],
    career: ['Junior Engineer, Department of Roads, GoN (1998–2005)', 'Senior Engineer, Hetauda-Kathmandu Road Project (2005–2012)', 'Provincial Assembly Member, Makwanpur-2 (2018)', 'Standing Committee Member — Infrastructure & Transport (2019–2022)', 'Appointed Minister — Physical Infrastructure (2022)'],
    ministryDesc: 'Oversees construction of provincial roads, bridges, public buildings, water supply infrastructure, and urban planning in coordination with municipalities across Bagmati Province.',
    email: 'infrastructure@bagmati.gov.np', phone: '+977 (057) 520-102'
  },
  social: {
    avatar: '👩‍🏫', name: 'Hon. Kamala Thapa', title: 'Minister — Ministry of Social Development',
    party: 'CPN (UML)', badge: 'Social Development',
    background: 'Kamala Thapa, born 1971 in Kavrepalanchok, is a lifelong educator who has dedicated her career to improving public education in rural Nepal. She holds a master\'s degree in education and served as a school principal for 12 years before entering politics.',
    education: ['B.Ed. — Tribhuvan University (1994)', 'M.Ed. Education Management — TU Faculty of Education (1998)', 'Certificate in Public Health Administration — WHO Nepal (2008)'],
    career: ['School Teacher, Dhulikhel Secondary School (1994–2002)', 'Principal, Banepa Higher Secondary School (2002–2014)', 'District Education Officer, Kavrepalanchok (2014–2018)', 'Provincial Assembly Member (2018–present)', 'Appointed Minister — Social Development (2021)'],
    ministryDesc: 'Manages provincial education policy, healthcare delivery, sports programs, sanitation campaigns, and social inclusion programs for marginalized communities across all 13 districts.',
    email: 'social@bagmati.gov.np', phone: '+977 (057) 520-103'
  },
  agriculture: {
    avatar: '👨‍🌾', name: 'Hon. Bishnu Prasad KC', title: 'Minister — Ministry of Land & Agriculture',
    party: 'CPN (Maoist Centre)', badge: 'Land & Agriculture',
    background: 'Bishnu Prasad KC was born in 1965 in Nuwakot district, a predominantly agricultural region. A third-generation farmer and agricultural activist, he championed land rights for marginalized communities before entering formal politics.',
    education: ['B.Sc. Agriculture — IAAS, TU (1989)', 'M.Sc. Agricultural Economics — Tribhuvan University (1993)', 'Land Reform Studies — National Land Commission Nepal (2002)'],
    career: ['Agricultural Extension Officer, Nuwakot (1990–2000)', 'Program Director, Nepal Farmers\' Cooperative (2000–2012)', 'District Land Revenue Officer (2012–2017)', 'Provincial Assembly Member, Nuwakot-1 (2018–present)', 'Appointed Minister — Land & Agriculture (2022)'],
    ministryDesc: 'Handles provincial land administration, agricultural development programs, irrigation projects, livestock promotion, and food security initiatives with special focus on smallholder farmers.',
    email: 'agriculture@bagmati.gov.np', phone: '+977 (057) 520-104'
  },
  finance: {
    avatar: '👔', name: 'Hon. Prakash Dahal', title: 'Minister — Ministry of Finance & Economic Affairs',
    party: 'CPN (Unified Socialist)', badge: 'Finance & Economic Affairs',
    background: 'Prakash Dahal, born 1970 in Lalitpur, is an economist and public finance specialist. He earned his PhD in Development Economics and spent a decade at Nepal Rastra Bank before moving into provincial politics. He is credited with preparing Bagmati Province\'s first multi-year fiscal plan.',
    education: ['B.Com — Tribhuvan University (1992)', 'M.A. Economics — TU Central Department (1995)', 'PhD Development Economics — JNU India (2002)', 'Certificate in Public Finance — IMF Institute, Washington DC (2007)'],
    career: ['Economist, Nepal Rastra Bank (1995–2009)', 'Senior Advisor, Ministry of Finance GoN (2009–2015)', 'Economic Advisor, Province No. 3 (2016–2018)', 'Provincial Assembly Member, Lalitpur-3 (2018–present)', 'Appointed Minister — Finance (2021)'],
    ministryDesc: 'Administers the annual provincial budget (NPR 85 billion), revenue collection, inter-governmental fiscal transfers, economic planning, and performance-based budgeting across all provincial ministries.',
    email: 'finance@bagmati.gov.np', phone: '+977 (057) 520-105'
  },
  industry: {
    avatar: '🏙️', name: 'Hon. Meena Gurung', title: 'Minister — Ministry of Industry, Tourism & Environment',
    party: 'Nepali Congress', badge: 'Industry, Tourism & Environment',
    background: 'Meena Gurung, born 1977 in Chitwan, has a background in tourism management and environmental sustainability. She previously led the Chitwan Tourism Development Board and initiated several eco-tourism programs that generated significant rural income in the Terai belt.',
    education: ['BBS Tourism Management — TU (2000)', 'MBA International Business — KU School of Management (2004)', 'Diploma in EIA — IUCN Nepal (2009)'],
    career: ['Tourism Officer, Chitwan National Park Authority (2001–2008)', 'Executive Director, Chitwan Tourism Board (2008–2015)', 'Board Member, Nepal Tourism Board (2015–2018)', 'Provincial Assembly Member, Chitwan-4 (2018–present)', 'Appointed Minister — Industry, Tourism & Environment (2021)'],
    ministryDesc: 'Promotes industrial investment through SEZs and industrial estates, develops provincial tourism infrastructure, enforces environmental protection laws, and supports heritage conservation across Bagmati Province.',
    email: 'industry@bagmati.gov.np', phone: '+977 (057) 520-106'
  },
  energy: {
    avatar: '⚡', name: 'Hon. Narayan Bista', title: 'Minister — Ministry of Energy & Water Resources',
    party: 'CPN (UML)', badge: 'Energy & Water Resources',
    background: 'Narayan Bista, born 1967 in Dhading, trained as a hydropower engineer and has overseen construction of three mini-hydropower plants along the Trishuli river basin. His tenure has focused on rural electrification — achieving 98% household electricity access in Bagmati Province.',
    education: ['B.E. Electrical Engineering — IOE Pulchowk (1991)', 'M.E. Hydropower Engineering — IOE (1995)', 'Certificate in Renewable Energy Policy — ADB Institute, Japan (2008)'],
    career: ['Junior Engineer, NEA Hydropower Division (1992–2000)', 'Project Manager, Marsyangdi Hydropower Project (2000–2010)', 'Director General, Bagmati Province Energy Directorate (2018–2021)', 'Provincial Assembly Member, Dhading-2 (2018–present)', 'Appointed Minister — Energy & Water Resources (2021)'],
    ministryDesc: 'Manages hydropower licensing and development, rural electrification programs, provincial water resource planning, and inter-district irrigation and drinking water infrastructure.',
    email: 'energy@bagmati.gov.np', phone: '+977 (057) 520-107'
  },
  forest: {
    avatar: '🌿', name: 'Hon. Sita Devi Rai', title: 'Minister — Ministry of Forest & Environment',
    party: 'CPN (Maoist Centre)', badge: 'Forest & Environment',
    background: 'Sita Devi Rai, born 1972 in Sindhupalchok, is a grassroots environmental activist who led community forestry programs in the Koshi watershed for over 15 years. She has been a vocal advocate for climate resilience policies and serves on the Nepal Climate Change Council.',
    education: ['B.Sc. Forestry — Institute of Forestry, TU Pokhara (1995)', 'M.Sc. Environmental Science — TU (2000)', 'Certificate in Climate Adaptation Policy — UNEP Training, Nairobi (2012)'],
    career: ['Forest Ranger, Sindhupalchok District Forest Office (1996–2005)', 'Program Coordinator, Community Forest Users Federation Nepal (2005–2013)', 'Consultant, UNDP Nepal Climate Programme (2013–2017)', 'Provincial Assembly Member, Sindhupalchok-3 (2018–present)', 'Appointed Minister — Forest & Environment (2022)'],
    ministryDesc: 'Oversees 40% of Bagmati Province\'s forested land, manages 850+ community forest user groups, enforces environmental impact assessment regulations, and leads provincial climate change adaptation programs.',
    email: 'forest@bagmati.gov.np', phone: '+977 (057) 520-108'
  },
  welfare: {
    avatar: '👩‍👧', name: 'Hon. Parvati Adhikari', title: 'Minister — Ministry of Women, Children & Social Welfare',
    party: 'Nepali Congress', badge: 'Women, Children & Social Welfare',
    background: 'Parvati Adhikari, born 1975 in Ramechhap, is a social worker and gender rights activist who founded the Bagmati Women\'s Empowerment Network in 2005. She has been a pivotal figure in expanding the social security allowance program to reach 280,000 beneficiaries in the province.',
    education: ['BSW Social Work — TU (1998)', 'MSW Community Development — TU (2002)', 'Certificate in Child Protection Law — UNICEF Nepal (2007)', 'Leadership in Public Policy — Harvard Kennedy School Online (2019)'],
    career: ['Social Worker, Nepal Red Cross Society (1998–2005)', 'Founder & Director, Bagmati Women\'s Empowerment Network (2005–2015)', 'Gender Focal Point, Province Social Welfare Council (2015–2018)', 'Provincial Assembly Member, Ramechhap-2 (2018–present)', 'Appointed Minister — Women, Children & Social Welfare (2021)'],
    ministryDesc: 'Administers social security allowances for 280,000+ beneficiaries, implements gender-based violence prevention programs, manages child protection systems, and coordinates with 119 municipalities on welfare delivery.',
    email: 'welfare@bagmati.gov.np', phone: '+977 (057) 520-109'
  },
  it: {
    avatar: '💻', name: 'Hon. Anil Shrestha', title: 'Minister — Ministry of Science, Technology & IT',
    party: 'CPN (UML)', badge: 'Science, Technology & IT',
    background: 'Anil Shrestha, born 1980 in Bhaktapur, is a software engineer and digital governance expert who returned to Nepal after a decade in the US tech industry. He is the youngest member of the provincial cabinet and has led the rollout of the Bagmati Digital Services Platform, enabling 47 services online.',
    education: ['B.E. Computer Engineering — IOE Pulchowk Campus (2003)', 'M.S. Computer Science — University of Texas, Austin (2006)', 'Executive Program in Digital Governance — MIT Media Lab (2015)'],
    career: ['Software Engineer, Microsoft Corporation, USA (2006–2010)', 'CTO, Yomari Technologies, Kathmandu (2010–2016)', 'Digital Advisor, Office of the Prime Minister GoN (2016–2018)', 'Provincial Assembly Member, Bhaktapur-1 (2018–present)', 'Appointed Minister — Science, Technology & IT (2022)'],
    ministryDesc: 'Leads digital transformation of provincial government, manages the Bagmati e-Governance Platform, funds scientific research grants, supports IT startup ecosystem, and ensures cybersecurity for provincial digital infrastructure.',
    email: 'ict@bagmati.gov.np', phone: '+977 (057) 520-110'
  }
};

function openMinisterModal(key) {
  const m = MINISTERS[key];
  if (!m) return;
  document.getElementById('modalAvatar').textContent        = m.avatar;
  document.getElementById('modalMinistryBadge').textContent = m.badge;
  document.getElementById('modalName').textContent          = m.name;
  document.getElementById('modalTitle').textContent         = m.title;
  document.getElementById('modalParty').textContent         = '🏛 ' + m.party;
  document.getElementById('modalBackground').textContent    = m.background;
  document.getElementById('modalMinistryDesc').textContent  = m.ministryDesc;
  document.getElementById('modalEmail').textContent         = '📧 ' + m.email;
  document.getElementById('modalPhone').textContent         = '📞 ' + m.phone;
  const eduList = document.getElementById('modalEducation');
  eduList.innerHTML = m.education.map(e => `<li>${e}</li>`).join('');
  const careerList = document.getElementById('modalCareer');
  careerList.innerHTML = m.career.map(c => `<li>${c}</li>`).join('');
  document.getElementById('ministerModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMinisterModal(e) {
  if (e && e.target !== document.getElementById('ministerModal') && e.type !== 'click') return;
  if (e && e.currentTarget === document.getElementById('ministerModal') && e.target !== e.currentTarget) return;
  document.getElementById('ministerModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('ministerModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});