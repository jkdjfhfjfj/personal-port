import './style.css'

const icons = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-13-2 18"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.4 9 3l2 5-2.2 1.6a15.5 15.5 0 0 0 5.6 5.6L16 13l5 2 .4 2.4a3 3 0 0 1-3.3 3.5C10.9 20.1 3.9 13.1 3.1 5.9A3 3 0 0 1 6.6 3.4Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM4 6l8 6 8-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6m0-6-9 9"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5m0 14h16M8 16v-3m4 3V8m4 8v-6"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M15 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
}

const serviceSeed = [
  { id: 1, icon: 'code', title: 'Websites & web apps', text: 'Conversion-focused websites and powerful web apps built around how your business works.', tag: 'Build' },
  { id: 2, icon: 'chart', title: 'Mobile & custom software', text: 'Android apps and custom tools that keep your team productive wherever work happens.', tag: 'Build' },
  { id: 3, icon: 'sparkle', title: 'Payments & integrations', text: 'M-Pesa, APIs, WhatsApp, SMS and the connections that make every process flow.', tag: 'Connect' },
  { id: 4, icon: 'users', title: 'Growth & brand systems', text: 'UI/UX, branding, SEO and digital marketing that help the right customers find you.', tag: 'Grow' },
  { id: 5, icon: 'lock', title: 'Hosting & business email', text: 'Reliable hosting, domains and professional email configured for your business.', tag: 'Run' },
  { id: 6, icon: 'phone', title: 'IT support & consulting', text: 'Practical technology guidance and responsive support when your business needs it.', tag: 'Support' }
]

const projectSeed = [
  { id: 1, category: 'Web & app', title: 'Kijani Market', text: 'A fresh e-commerce experience that makes local shopping simple, fast and delightful.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1100&q=85', accent: 'lime', features: ['Online store', 'M-Pesa checkout', 'Order dashboard'] },
  { id: 2, category: 'Custom software', title: 'Mwangaza Schools', text: 'A connected school management platform built to save administrators hours every week.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1100&q=85', accent: 'navy', features: ['Student records', 'SMS notifications', 'Reports'] },
  { id: 3, category: 'Brand & growth', title: 'Safi Spaces', text: 'A confident new identity and digital home for a modern property management company.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=85', accent: 'peach', features: ['Brand identity', 'Website', 'SEO foundation'] },
  { id: 4, category: 'Integrations', title: 'Kopa Finance', text: 'A streamlined customer journey connecting enquiries, payment and follow-up.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85', accent: 'blue', features: ['API integration', 'WhatsApp flow', 'Admin tools'] }
]

const testimonialSeed = [
  { id: 1, quote: 'GreenPay took our idea from a sketch to a working product we could confidently show customers. They understood the business, not just the brief.', name: 'Amina W.', role: 'Founder, Kijani Market', initials: 'AW' },
  { id: 2, quote: 'The difference is how practical the team is. We now spend less time fixing disconnected tools and more time serving our customers.', name: 'Brian K.', role: 'Operations Lead, Mwangaza', initials: 'BK' }
]

const founderSeed = [
  { id: 1, name: 'Brian Kasomo', role: 'Founder & Technology Lead', bio: 'Turns complex business needs into focused, useful digital systems.', initials: 'BK', color: 'green', visible: true },
  { id: 2, name: 'Amina Wanjiku', role: 'Design & Growth Partner', bio: 'Connects sharp brand thinking with experiences customers enjoy using.', initials: 'AW', color: 'peach', visible: true }
]

const faqSeed = [
  { id: 1, question: 'How long does a typical project take?', answer: 'Most focused website projects take 3–6 weeks. We will give you a clearer timeline after understanding your scope.', visible: true },
  { id: 2, question: 'Can you work with our existing systems?', answer: 'Yes. We can connect the tools you already use or recommend a clean path forward where something is holding you back.', visible: true },
  { id: 3, question: 'Do you support projects after launch?', answer: 'Yes. We offer practical support, maintenance and ongoing improvement packages for teams that want a long-term technology partner.', visible: true }
]

const defaultContent = {
  company: 'GreenPay Enterprises',
  phone: '+254 700 123 456',
  whatsapp: '+254 700 123 456',
  email: 'hello@greenpay.co.ke',
  location: 'Nairobi, Kenya',
  hours: 'Mon–Fri, 8:00am–5:30pm',
  tagline: 'Digital systems that move business forward.'
}

const getStored = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(`greenpay-${key}`)) ?? fallback } catch { return fallback }
}
const save = (key, value) => localStorage.setItem(`greenpay-${key}`, JSON.stringify(value))
const apiRequest = async (path, options = {}) => {
  const response = await fetch(path, { headers: { 'content-type': 'application/json', ...(options.headers || {}) }, ...options })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.status === 204 ? null : response.json()
}

let services = getStored('services', serviceSeed)
let projects = getStored('projects', projectSeed)
let testimonials = getStored('testimonials', testimonialSeed)
let founders = getStored('founders', founderSeed)
let faqs = getStored('faqs', faqSeed)
let content = getStored('content', defaultContent)
let bookings = getStored('bookings', [])
let messages = getStored('messages', [])
let activeFilter = 'All'

const app = document.querySelector('#app')
const visible = (items) => items.filter(item => item.visible !== false)
const navLink = (label, target) => `<a href="#${target}" data-nav>${label}</a>`

function header() {
  return `<header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="#home" aria-label="GreenPay Enterprises home">
        <span class="brand-mark"><span></span><span></span><span></span></span>
        <span>green<span>pay</span><small>ENTERPRISES</small></span>
      </a>
      <nav class="main-nav" id="main-nav">
        ${navLink('About', 'about')}${navLink('Services', 'services')}${navLink('Work', 'portfolio')}${navLink('Contact', 'contact')}
        <a class="nav-cta" href="#book">Book a service ${icons.arrow}</a>
      </nav>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">${icons.menu}</button>
    </div>
  </header>`
}

function button(label, href = '#book', type = 'primary', icon = true) {
  return `<a class="btn btn-${type}" href="${href}">${label}${icon ? icons.arrow : ''}</a>`
}

function serviceCard(service) {
  return `<article class="service-card">
    <div class="service-icon">${icons[service.icon] || icons.sparkle}</div>
    <span class="eyebrow">${service.tag}</span>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
    <a href="#book" class="text-link">Explore service ${icons.arrow}</a>
  </article>`
}

function projectCard(project) {
  return `<article class="project-card">
    <div class="project-image"><img src="${project.image}" alt="${project.title} project preview" loading="lazy"><span class="project-category">${project.category}</span></div>
    <div class="project-body"><h3>${project.title}</h3><p>${project.text}</p><div class="feature-list">${(project.features || []).map(item => `<span>${icons.check}${item}</span>`).join('')}</div><a href="#contact" class="text-link">View case study ${icons.arrow}</a></div>
  </article>`
}

function homePage() {
  return `${header()}
  <main id="home">
    <section class="hero section-dark">
      <div class="hero-grid container">
        <div class="hero-copy">
          <div class="pill"><span class="pulse"></span> Digital partners for ambitious businesses</div>
          <h1>Build what’s next for <em>your business.</em></h1>
          <p class="hero-lede">We design and build the websites, apps and digital systems that help East African businesses work smarter and grow with confidence.</p>
          <div class="hero-actions">${button('Book a service', '#book')}${button('View our work', '#portfolio', 'ghost')}</div>
          <div class="hero-proof"><div class="avatar-stack"><span>AM</span><span>BK</span><span>SN</span><b>+</b></div><p><strong>Trusted by growing teams</strong><br>to turn big ideas into useful technology.</p></div>
        </div>
        <div class="hero-visual">
          <div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div>
          <div class="dashboard-card">
            <div class="dash-top"><span class="dash-dot"></span><span class="dash-dot"></span><span class="dash-dot"></span><span class="dash-label">GREENPAY / OVERVIEW</span></div>
            <div class="dash-heading"><span>Business pulse</span><strong>+28.4%</strong></div>
            <div class="bars"><i style="height:32%"></i><i style="height:48%"></i><i style="height:40%"></i><i style="height:66%"></i><i style="height:59%"></i><i style="height:76%"></i><i style="height:92%"></i></div>
            <div class="dash-foot"><span><b></b> Leads this month</span><strong>1,284</strong></div>
          </div>
          <div class="float-card float-card-one"><span class="float-icon">${icons.check}</span><div><small>Project status</small><strong>Moving forward</strong></div></div>
          <div class="float-card float-card-two"><span>↗</span><div><small>Systems connected</small><strong>04 active</strong></div></div>
          <div class="visual-note">Simple systems.<br><strong>Meaningful growth.</strong></div>
        </div>
      </div>
      <div class="hero-bottom container"><span>We help businesses</span><div><b>BUILD</b><i>•</i><b>CONNECT</b><i>•</i><b>GROW</b><i>•</i><b>THRIVE</b></div></div>
    </section>
    <section class="intro section-pad" id="about"><div class="container intro-grid">
      <div><span class="section-kicker">01 / The GreenPay approach</span><h2>Technology should feel like a <em>tailwind.</em></h2></div>
      <div class="intro-copy"><p class="large-copy">Not another complicated platform. Not a solution looking for a problem. We build digital tools around the way you already work — then make the next version of your business easier to reach.</p><div class="metrics"><div><strong>15<span>+</span></strong><small>services to<br>move you forward</small></div><div><strong>100<span>%</span></strong><small>focused on<br>your outcomes</small></div><div><strong>1<span>:</span>1</strong><small>partnership from<br>brief to launch</small></div></div></div>
    </div></section>
    <section class="services-section section-pad" id="services"><div class="container">
      <div class="section-heading"><div><span class="section-kicker">02 / What we do</span><h2>Everything you need to <em>move.</em></h2></div><p>From your first digital idea to the systems that run your day-to-day, we bring strategy, design and engineering into one focused team.</p></div>
      <div class="service-grid">${visible(services).map(serviceCard).join('')}</div>
      <div class="service-note"><span>${icons.sparkle}</span><p><strong>Need something more specific?</strong> We also build custom digital solutions for the problems that do not fit in a neat category.</p><a href="#book" class="text-link">Tell us about it ${icons.arrow}</a></div>
    </div></section>
    <section class="work-section section-pad section-tint" id="portfolio"><div class="container">
      <div class="section-heading"><div><span class="section-kicker">03 / Selected work</span><h2>Built for the real <em>world.</em></h2></div><a href="#portfolio" class="text-link">See all projects ${icons.arrow}</a></div>
      <div class="filter-row">${['All', ...new Set(projects.map(project => project.category))].map(filter => `<button class="${activeFilter === filter ? 'active' : ''}" data-filter="${filter}">${filter}</button>`).join('')}</div>
      <div class="project-grid">${projects.filter(project => activeFilter === 'All' || project.category === activeFilter).map(projectCard).join('')}</div>
    </div></section>
    <section class="why-section section-pad"><div class="container why-grid">
      <div class="why-statement"><span class="section-kicker">04 / Why GreenPay</span><h2>Good technology starts with <em>good questions.</em></h2><p>We listen first, simplify the complex and stay close to the outcome. That is how we make technology feel less like a project — and more like progress.</p>${button('Start a conversation', '#contact', 'outline')}</div>
      <div class="principles"><div class="principle"><span>01</span><div><h3>Business-first thinking</h3><p>We connect every build decision to a real customer, process or growth goal.</p></div></div><div class="principle"><span>02</span><div><h3>Clear at every step</h3><p>No technical fog. You always know what we are making, why it matters and what comes next.</p></div></div><div class="principle"><span>03</span><div><h3>Built to keep going</h3><p>We leave you with a strong foundation, useful handover and a partner when you need one.</p></div></div></div>
    </div></section>
    <section class="testimonial-section section-pad section-dark"><div class="container"><div class="section-heading light"><div><span class="section-kicker">05 / Client perspective</span><h2>Progress sounds <em>good.</em></h2></div><span class="quote-mark">“</span></div><div class="testimonial-grid">${visible(testimonials).map(testimonial => `<article class="testimonial"><div class="stars">★★★★★</div><blockquote>“${testimonial.quote}”</blockquote><div class="person"><span>${testimonial.initials}</span><div><strong>${testimonial.name}</strong><small>${testimonial.role}</small></div></div></article>`).join('')}</div></div></section>
    <section class="founders-section section-pad"><div class="container"><div class="section-heading"><div><span class="section-kicker">06 / The people behind the work</span><h2>Small team. <em>Big care.</em></h2></div><p>Good work starts with people who listen closely, take ownership and care about what happens after launch.</p></div><div class="founder-grid">${visible(founders).map(founder => `<article class="founder-card"><div class="founder-avatar founder-${founder.color || 'green'}">${founder.initials}</div><div><h3>${founder.name}</h3><span>${founder.role}</span><p>${founder.bio}</p></div></article>`).join('')}</div></div></section>
    <section class="cta-section section-pad" id="contact"><div class="container cta-card"><div><span class="section-kicker">Ready when you are</span><h2>Have a business idea<br>worth <em>building?</em></h2></div><div><p>Tell us where you want to go. We will help you find the clearest way to get there.</p>${button('Let’s talk', '#contact-form')}</div></div></section>
    <section class="contact-section section-pad" id="contact-form"><div class="container contact-grid"><div><span class="section-kicker">07 / Get in touch</span><h2>Let’s make your next move <em>clear.</em></h2><p>Share a little about what you are working on and our team will get back to you within one business day.</p><div class="contact-details"><a href="mailto:${content.email}">${icons.mail}<span><small>Email us</small>${content.email}</span></a><a href="tel:${content.phone.replace(/\s/g, '')}">${icons.phone}<span><small>Call or WhatsApp</small>${content.phone}</span></a><div>${icons.pin}<span><small>Based in</small>${content.location}</span></div></div></div><form class="contact-form" id="contact-form-el"><label>Your name<input name="name" required placeholder="e.g. Amina Wanjiku"></label><label>Work email<input type="email" name="email" required placeholder="you@business.com"></label><label>What can we help with?<select name="topic"><option>Website or web app</option><option>Mobile or custom software</option><option>Payments & integrations</option><option>Brand, SEO or marketing</option><option>Something else</option></select></label><label>Tell us a little more<textarea name="message" rows="4" required placeholder="What are you hoping to build or improve?"></textarea></label><button class="btn btn-primary" type="submit">Send enquiry ${icons.arrow}</button><p class="form-note" id="contact-result"></p></form></div></section>
    <section class="booking-section section-dark" id="book"><div class="container booking-grid"><div><span class="section-kicker">07 / Book a service</span><h2>Let’s turn your brief into a <em>next step.</em></h2><p>Give us the essentials. We will review your request and come back with a useful first conversation — no hard sell, no jargon.</p><div class="booking-points"><span>${icons.check}Response within one business day</span><span>${icons.check}Clear scope before any commitment</span><span>${icons.check}Built around your budget and timeline</span></div></div><form class="booking-form" id="booking-form"><div class="form-row"><label>Your name*<input name="name" required placeholder="Full name"></label><label>Business name<input name="business" placeholder="Company or organisation"></label></div><div class="form-row"><label>Email address*<input type="email" name="email" required placeholder="you@business.com"></label><label>Phone / WhatsApp*<input name="phone" required placeholder="+254 7xx xxx xxx"></label></div><div class="form-row"><label>Service you need<select name="service">${visible(services).map(service => `<option>${service.title}</option>`).join('')}<option>Custom digital solution</option></select></label><label>Budget range<select name="budget"><option>Not sure yet</option><option>Under KSh 50,000</option><option>KSh 50,000 – 150,000</option><option>KSh 150,000 – 500,000</option><option>Over KSh 500,000</option></select></label></div><div class="form-row"><label>Preferred start date<input type="date" name="date"></label><label>Best way to reach you<select name="preference"><option>WhatsApp</option><option>Phone call</option><option>Email</option></select></label></div><label>Tell us about the project*<textarea name="description" rows="5" required placeholder="What would you like to make possible?"></textarea></label><label class="file-label">Attach a brief (optional)<input type="file" name="attachment"><span>PDF, DOCX or image up to 10MB</span></label><button class="btn btn-lime" type="submit">Submit service request ${icons.arrow}</button><p class="form-note" id="booking-result"></p></form></div></section>
  </main>${footer()}`
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="#home"><span class="brand-mark"><span></span><span></span><span></span></span><span>green<span>pay</span><small>ENTERPRISES</small></span></a><p>${content.tagline}</p></div><div><span class="footer-label">Explore</span><a href="#about">About us</a><a href="#services">Services</a><a href="#portfolio">Our work</a></div><div><span class="footer-label">Start a project</span><a href="#book">Book a service</a><a href="#contact-form">Contact us</a><a href="#admin">Owner login <small>(demo)</small></a></div><div><span class="footer-label">Connect</span><a href="mailto:${content.email}">${content.email}</a><a href="https://wa.me/${content.whatsapp.replace(/\D/g, '')}" target="_blank" rel="noreferrer">WhatsApp</a><span>${content.location}</span></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} GreenPay Enterprises. All rights reserved.</span><span>Made for meaningful progress <b>✦</b></span></div></footer>`
}

function adminPage() {
  const counts = { bookings: bookings.length, messages: messages.length, services: services.length, projects: projects.length }
  return `<div class="admin-shell"><header class="admin-header"><a class="brand" href="#home"><span class="brand-mark"><span></span><span></span><span></span></span><span>green<span>pay</span><small>ENTERPRISES</small></span></a><div class="admin-header-right"><span class="admin-badge">${icons.lock} Owner workspace</span><a href="#home" class="text-link">View website ${icons.external}</a></div></header><main class="admin-main container"><div class="admin-title"><div><span class="section-kicker">Owner workspace</span><h1>Good morning, GreenPay.</h1><p>Keep your website content and incoming opportunities moving.</p></div><a class="btn btn-primary" href="#home">Back to website ${icons.arrow}</a></div><div class="admin-stats"><div><span class="admin-stat-icon green">${icons.phone}</span><small>Service requests</small><strong>${counts.bookings}</strong><a href="#admin-bookings">View requests ${icons.arrow}</a></div><div><span class="admin-stat-icon blue">${icons.mail}</span><small>Contact messages</small><strong>${counts.messages}</strong><a href="#admin-messages">View messages ${icons.arrow}</a></div><div><span class="admin-stat-icon peach">${icons.code}</span><small>Published services</small><strong>${visible(services).length}</strong><a href="#admin-services">Manage services ${icons.arrow}</a></div><div><span class="admin-stat-icon yellow">${icons.chart}</span><small>Portfolio projects</small><strong>${visible(projects).length}</strong><a href="#admin-projects">Manage portfolio ${icons.arrow}</a></div></div><div class="admin-layout"><aside class="admin-nav"><button class="active" data-admin-tab="overview">Overview</button><button data-admin-tab="services">Services</button><button data-admin-tab="projects">Portfolio</button><button data-admin-tab="founders">Founders</button><button data-admin-tab="testimonials">Testimonials</button><button data-admin-tab="faqs">FAQs</button><button data-admin-tab="bookings">Service requests <b>${bookings.length || ''}</b></button><button data-admin-tab="messages">Messages <b>${messages.length || ''}</b></button><button data-admin-tab="content">Company details</button></aside><section class="admin-content" id="admin-content">${adminOverview()}</section></div></main></div>`
}

function adminOverview() {
  const recent = bookings.slice(-3).reverse()
  return `<div class="admin-panel"><div class="panel-heading"><div><span class="section-kicker">Overview</span><h2>Your digital front desk</h2></div><span class="live-dot">● Live preview</span></div><div class="admin-welcome"><div><span class="welcome-icon">${icons.sparkle}</span><h3>Your website is ready to work.</h3><p>Use this workspace to keep your services fresh and follow every enquiry from first hello to completed project.</p><a class="btn btn-outline" href="#book">Preview booking form ${icons.arrow}</a></div><div class="mini-visual"><div class="mini-bar" style="height:50%"></div><div class="mini-bar" style="height:68%"></div><div class="mini-bar" style="height:44%"></div><div class="mini-bar" style="height:82%"></div><div class="mini-bar" style="height:73%"></div><div class="mini-bar" style="height:96%"></div></div></div></div><div class="admin-panel"><div class="panel-heading"><div><span class="section-kicker">Latest activity</span><h2>Recent requests</h2></div><button class="text-link" data-admin-tab="bookings">See all ${icons.arrow}</button></div>${recent.length ? `<div class="request-list">${recent.map(requestRow).join('')}</div>` : `<div class="empty-state"><span>${icons.mail}</span><h3>No requests yet</h3><p>When a customer submits the booking form, it will appear here.</p></div>`}</div>`
}

function requestRow(item) {
  return `<div class="request-row"><span class="request-avatar">${(item.name || 'G').split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}</span><div><strong>${item.name}</strong><small>${item.service} · ${item.business || 'Independent project'}</small></div><span class="status status-${(item.status || 'New').toLowerCase().replace(' ', '-')}">${item.status || 'New'}</span><small>${new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</small></div>`
}

function adminTable(tab) {
  if (tab === 'bookings') return `<div class="admin-panel"><div class="panel-heading"><div><span class="section-kicker">Lead pipeline</span><h2>Service requests</h2></div></div>${bookings.length ? `<div class="table-wrap"><table><thead><tr><th>Reference</th><th>Customer</th><th>Service</th><th>Budget</th><th>Status</th></tr></thead><tbody>${bookings.slice().reverse().map(item => `<tr><td><strong>${item.reference}</strong><small>${new Date(item.createdAt).toLocaleDateString()}</small></td><td><strong>${item.name}</strong><small>${item.email}</small></td><td>${item.service}</td><td>${item.budget}</td><td><select class="status-select" data-booking-id="${item.id}">${['New', 'Contacted', 'Quoted', 'In Progress', 'Completed', 'Cancelled'].map(status => `<option ${status === item.status ? 'selected' : ''}>${status}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div>` : `<div class="empty-state"><span>${icons.mail}</span><h3>No service requests yet</h3><p>New booking enquiries will be tracked here.</p></div>`}</div>`
  if (tab === 'messages') return `<div class="admin-panel"><div class="panel-heading"><div><span class="section-kicker">Inbox</span><h2>Contact messages</h2></div></div>${messages.length ? `<div class="message-list">${messages.slice().reverse().map(item => `<article class="message-card"><div><strong>${item.name}</strong><small>${item.email} · ${item.topic}</small></div><time>${new Date(item.createdAt).toLocaleDateString()}</time><p>${item.message}</p></article>`).join('')}</div>` : `<div class="empty-state"><span>${icons.mail}</span><h3>Your inbox is clear</h3><p>Messages from your contact form will show up here.</p></div>`}</div>`
  if (tab === 'services') return managePanel('Services', 'service', services, item => `<span class="manage-icon">${icons[item.icon] || icons.sparkle}</span><div><strong>${item.title}</strong><small>${item.tag} · ${item.visible === false ? 'Hidden' : 'Published'}</small></div>`)
  if (tab === 'projects') return managePanel('Portfolio projects', 'project', projects, item => `<img class="manage-thumb" src="${item.image}" alt=""><div><strong>${item.title}</strong><small>${item.category} · ${item.visible === false ? 'Hidden' : 'Published'}</small></div>`)
  if (tab === 'testimonials') return managePanel('Testimonials', 'testimonial', testimonials, item => `<span class="manage-icon">${icons.users}</span><div><strong>${item.name}</strong><small>${item.role} · ${item.visible === false ? 'Hidden' : 'Published'}</small></div>`)
  if (tab === 'founders') return managePanel('Founders & team', 'founder', founders, item => `<span class="manage-icon founder-mini founder-${item.color || 'green'}">${item.initials}</span><div><strong>${item.name}</strong><small>${item.role} · ${item.visible === false ? 'Hidden' : 'Published'}</small></div>`)
  if (tab === 'faqs') return managePanel('Frequently asked questions', 'faq', faqs, item => `<span class="manage-icon">${icons.sparkle}</span><div><strong>${item.question}</strong><small>${item.visible === false ? 'Hidden' : 'Published'}</small></div>`)
  if (tab === 'content') return `<div class="admin-panel content-panel"><div class="panel-heading"><div><span class="section-kicker">Site settings</span><h2>Company details</h2></div></div><form id="content-form" class="settings-form"><label>Company name<input name="company" value="${content.company}"></label><label>Tagline<input name="tagline" value="${content.tagline}"></label><div class="form-row"><label>Email<input type="email" name="email" value="${content.email}"></label><label>Phone<input name="phone" value="${content.phone}"></label></div><div class="form-row"><label>WhatsApp<input name="whatsapp" value="${content.whatsapp}"></label><label>Location<input name="location" value="${content.location}"></label></div><label>Business hours<input name="hours" value="${content.hours}"></label><button class="btn btn-primary" type="submit">Save company details ${icons.arrow}</button><p class="form-note" id="settings-result"></p></form></div>`
  return adminOverview()
}

function managePanel(title, kind, items, renderItem) {
  return `<div class="admin-panel"><div class="panel-heading"><div><span class="section-kicker">Content manager</span><h2>${title}</h2></div><button class="btn btn-primary btn-small" data-add="${kind}">Add ${kind} ${icons.arrow}</button></div><div class="manage-list">${items.map(item => `<div class="manage-row">${renderItem(item)}<div class="manage-actions"><button data-edit="${kind}" data-id="${item.id}">Edit</button><button data-toggle="${kind}" data-id="${item.id}">${item.visible === false ? 'Publish' : 'Hide'}</button><button class="danger" data-delete="${kind}" data-id="${item.id}">Delete</button></div></div>`).join('')}</div></div>`
}

function render() {
  if (location.hash === '#admin' || location.hash.startsWith('#admin-')) {
    app.innerHTML = adminPage()
    if (location.hash !== '#admin') {
      const tab = location.hash.replace('#admin-', '')
      setAdminTab(tab)
    }
    return
  }
  app.innerHTML = homePage()
}

function setAdminTab(tab) {
  const contentEl = document.querySelector('#admin-content')
  if (!contentEl) return
  const valid = ['overview', 'services', 'projects', 'founders', 'testimonials', 'faqs', 'bookings', 'messages', 'content']
  const selected = valid.includes(tab) ? tab : 'overview'
  contentEl.innerHTML = adminTable(selected)
  document.querySelectorAll('[data-admin-tab]').forEach(button => button.classList.toggle('active', button.dataset.adminTab === selected))
  history.replaceState(null, '', `#admin${selected === 'overview' ? '' : `-${selected}`}`)
}

function toast(message, type = 'success') {
  const element = document.createElement('div')
  element.className = `toast ${type}`
  element.innerHTML = `${type === 'success' ? icons.check : icons.close}<span>${message}</span>`
  document.body.append(element)
  setTimeout(() => element.classList.add('show'), 20)
  setTimeout(() => { element.classList.remove('show'); setTimeout(() => element.remove(), 300) }, 4000)
}

function bindEvents() {
  document.querySelector('.menu-toggle')?.addEventListener('click', (event) => {
    const nav = document.querySelector('#main-nav')
    const open = nav.classList.toggle('open')
    event.currentTarget.setAttribute('aria-expanded', open)
    event.currentTarget.innerHTML = open ? icons.close : icons.menu
  })
  document.querySelectorAll('[data-nav], .main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('#main-nav')?.classList.remove('open')))
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter
    render()
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }))
  document.querySelector('#contact-form-el')?.addEventListener('submit', event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    messages.push({ ...data, id: Date.now(), createdAt: new Date().toISOString() })
    save('messages', messages)
    apiRequest('/api/messages', { method: 'POST', body: JSON.stringify(data) }).catch(error => console.warn('Message database sync failed:', error))
    event.currentTarget.reset()
    document.querySelector('#contact-result').textContent = 'Thanks — your message is on its way. We’ll be in touch shortly.'
    toast('Message received — thank you.')
  })
  document.querySelector('#booking-form')?.addEventListener('submit', event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const reference = `GP-${new Date().getFullYear()}-${String(bookings.length + 1).padStart(4, '0')}`
    bookings.push({ ...data, id: Date.now(), reference, status: 'New', createdAt: new Date().toISOString() })
    save('bookings', bookings)
    apiRequest('/api/bookings', { method: 'POST', body: JSON.stringify(data) }).catch(error => console.warn('Booking database sync failed:', error))
    event.currentTarget.reset()
    document.querySelector('#booking-result').innerHTML = `Request received. Your reference number is <strong>${reference}</strong>. We’ll contact you within one business day.`
    toast(`Service request ${reference} received.`)
  })
  document.querySelectorAll('[data-admin-tab]').forEach(button => button.addEventListener('click', () => setAdminTab(button.dataset.adminTab)))
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => addContent(button.dataset.add)))
  document.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => editContent(button.dataset.edit, Number(button.dataset.id))))
  document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => {
    const collection = collectionFor(button.dataset.toggle)
    const item = collection.find(entry => entry.id === Number(button.dataset.id))
    item.visible = item.visible === false
    save(collectionKey(button.dataset.toggle), collection)
    apiRequest(`/api/${collectionKey(button.dataset.toggle)}/${item.id}`, { method: 'PATCH', body: JSON.stringify({ visible: item.visible }) }).catch(error => console.warn('Content database sync failed:', error))
    render()
    location.hash = `#admin-${button.dataset.toggle}s`
  }))
  document.querySelectorAll('[data-delete]').forEach(button => button.addEventListener('click', () => {
    if (!confirm('Delete this item from the website?')) return
    const collection = collectionFor(button.dataset.delete)
    const next = collection.filter(item => item.id !== Number(button.dataset.id))
    assignCollection(button.dataset.delete, next)
    save(collectionKey(button.dataset.delete), next)
    apiRequest(`/api/${collectionKey(button.dataset.delete)}/${button.dataset.id}`, { method: 'DELETE' }).catch(error => console.warn('Delete database sync failed:', error))
    render(); location.hash = `#admin-${button.dataset.delete}s`
  }))
  document.querySelectorAll('.status-select').forEach(select => select.addEventListener('change', () => {
    const booking = bookings.find(item => item.id === Number(select.dataset.bookingId))
    booking.status = select.value
    save('bookings', bookings)
    apiRequest(`/api/bookings/${booking.id}`, { method: 'PATCH', body: JSON.stringify({ status: booking.status }) }).catch(error => console.warn('Status database sync failed:', error))
    toast('Request status updated.')
  }))
  document.querySelector('#content-form')?.addEventListener('submit', event => {
    event.preventDefault()
    content = { ...content, ...Object.fromEntries(new FormData(event.currentTarget)) }
    save('content', content)
    apiRequest('/api/settings', { method: 'PUT', body: JSON.stringify(content) }).catch(error => console.warn('Settings database sync failed:', error))
    document.querySelector('#settings-result').textContent = 'Company details saved.'
    toast('Company details updated.')
  })
}

window.addEventListener('hashchange', () => { render(); bindEvents() })
render()
bindEvents()

function collectionKey(kind) {
  return { service: 'services', project: 'projects', founder: 'founders', testimonial: 'testimonials', faq: 'faqs' }[kind]
}

function collectionFor(kind) {
  return { service: services, project: projects, founder: founders, testimonial: testimonials, faq: faqs }[kind]
}

function assignCollection(kind, value) {
  if (kind === 'service') services = value
  if (kind === 'project') projects = value
  if (kind === 'founder') founders = value
  if (kind === 'testimonial') testimonials = value
  if (kind === 'faq') faqs = value
}

function addContent(kind) {
  const prompts = {
    service: ['Service name', 'Short service description', 'Category label (Build, Connect, Grow, Run or Support)'],
    project: ['Project name', 'Project category', 'Project image URL'],
    testimonial: ['Client name', 'Client role and company', 'Client quote'],
    founder: ['Founder name', 'Founder role', 'Short founder bio'],
    faq: ['Question', 'Answer']
  }
  const answers = (prompts[kind] || []).map(label => window.prompt(label))
  if (answers.some(answer => !answer?.trim())) return
  const id = Date.now()
  const item = kind === 'service'
    ? { id, icon: 'sparkle', title: answers[0], text: answers[1], tag: answers[2], visible: true }
    : kind === 'project'
      ? { id, category: answers[1], title: answers[0], text: 'A GreenPay project built around a clear business outcome.', image: answers[2], accent: 'green', features: ['Custom build'], visible: true }
      : kind === 'testimonial'
        ? { id, quote: answers[2], name: answers[0], role: answers[1], initials: answers[0].split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase(), visible: true }
        : kind === 'founder'
          ? { id, name: answers[0], role: answers[1], bio: answers[2], initials: answers[0].split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase(), color: 'green', visible: true }
          : { id, question: answers[0], answer: answers[1], visible: true }
  const collection = [...collectionFor(kind), item]
  assignCollection(kind, collection)
  save(collectionKey(kind), collection)
  apiRequest(`/api/${collectionKey(kind)}`, { method: 'POST', body: JSON.stringify(item) }).catch(error => console.warn('Content database sync failed:', error))
  render()
  location.hash = `#admin-${kind}s`
  toast(`${kind[0].toUpperCase() + kind.slice(1)} added.`)
}

function editContent(kind, id) {
  const item = collectionFor(kind).find(entry => entry.id === id)
  if (!item) return
  const fields = kind === 'service' ? [['title', 'Service name'], ['text', 'Short description'], ['tag', 'Category label']]
    : kind === 'project' ? [['title', 'Project name'], ['category', 'Project category'], ['text', 'Project description'], ['image', 'Project image URL']]
      : kind === 'testimonial' ? [['name', 'Client name'], ['role', 'Role and company'], ['quote', 'Client quote']]
        : kind === 'founder' ? [['name', 'Founder name'], ['role', 'Founder role'], ['bio', 'Founder bio']]
          : [['question', 'Question'], ['answer', 'Answer']]
  fields.forEach(([key, label]) => {
    const value = window.prompt(label, item[key])
    if (value?.trim()) item[key] = value.trim()
  })
  save(collectionKey(kind), collectionFor(kind))
  apiRequest(`/api/${collectionKey(kind)}/${id}`, { method: 'PUT', body: JSON.stringify(item) }).catch(error => console.warn('Content database sync failed:', error))
  render()
  location.hash = `#admin-${kind}s`
  toast(`${kind[0].toUpperCase() + kind.slice(1)} updated.`)
}

async function hydrateFromDatabase() {
  try {
    const data = await apiRequest('/api/bootstrap')
    if (!data) return
    services = data.services || services
    projects = data.projects || projects
    founders = data.founders || founders
    testimonials = data.testimonials || testimonials
    faqs = data.faqs || faqs
    bookings = data.bookings || bookings
    messages = data.messages || messages
    content = { ...content, ...(data.content || {}) }
    save('services', services)
    save('projects', projects)
    save('founders', founders)
    save('testimonials', testimonials)
    save('faqs', faqs)
    save('bookings', bookings)
    save('messages', messages)
    save('content', content)
    render()
    bindEvents()
  } catch (error) {
    console.warn('Database unavailable; using local preview data:', error)
  }
}

hydrateFromDatabase()