import { createServer } from 'node:http'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const root = fileURLToPath(new URL('.', import.meta.url))
const dataDir = join(root, 'data')
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

const db = new DatabaseSync(join(dataDir, 'greenpay.db'))
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY, icon TEXT, title TEXT NOT NULL, text TEXT NOT NULL, tag TEXT, visible INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, category TEXT, title TEXT NOT NULL, text TEXT NOT NULL, image TEXT, accent TEXT, features TEXT, visible INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS founders (id INTEGER PRIMARY KEY, name TEXT NOT NULL, role TEXT, bio TEXT, initials TEXT, color TEXT, visible INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS testimonials (id INTEGER PRIMARY KEY, quote TEXT NOT NULL, name TEXT, role TEXT, initials TEXT, visible INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS faqs (id INTEGER PRIMARY KEY, question TEXT NOT NULL, answer TEXT NOT NULL, visible INTEGER DEFAULT 1);
  CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, reference TEXT UNIQUE NOT NULL, name TEXT, business TEXT, email TEXT, phone TEXT, service TEXT, budget TEXT, date TEXT, preference TEXT, description TEXT, attachment TEXT, status TEXT DEFAULT 'New', createdAt TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, name TEXT, email TEXT, topic TEXT, message TEXT, createdAt TEXT NOT NULL);
`)

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
const founderSeed = [
  { id: 1, name: 'Brian Kasomo', role: 'Founder & Technology Lead', bio: 'Turns complex business needs into focused, useful digital systems.', initials: 'BK', color: 'green' },
  { id: 2, name: 'Amina Wanjiku', role: 'Design & Growth Partner', bio: 'Connects sharp brand thinking with experiences customers enjoy using.', initials: 'AW', color: 'peach' }
]
const testimonialSeed = [
  { id: 1, quote: 'GreenPay took our idea from a sketch to a working product we could confidently show customers. They understood the business, not just the brief.', name: 'Amina W.', role: 'Founder, Kijani Market', initials: 'AW' },
  { id: 2, quote: 'The difference is how practical the team is. We now spend less time fixing disconnected tools and more time serving our customers.', name: 'Brian K.', role: 'Operations Lead, Mwangaza', initials: 'BK' }
]
const faqSeed = [
  { id: 1, question: 'How long does a typical project take?', answer: 'Most focused website projects take 3–6 weeks. We will give you a clearer timeline after understanding your scope.' },
  { id: 2, question: 'Can you work with our existing systems?', answer: 'Yes. We can connect the tools you already use or recommend a clean path forward where something is holding you back.' },
  { id: 3, question: 'Do you support projects after launch?', answer: 'Yes. We offer practical support, maintenance and ongoing improvement packages for teams that want a long-term technology partner.' }
]
const contentSeed = {
  company: 'GreenPay Enterprises',
  phone: '+254 700 123 456',
  whatsapp: '+254 700 123 456',
  email: 'hello@greenpay.co.ke',
  location: 'Nairobi, Kenya',
  hours: 'Mon–Fri, 8:00am–5:30pm',
  tagline: 'Digital systems that move business forward.'
}

const resourceTables = { services: 'services', projects: 'projects', founders: 'founders', testimonials: 'testimonials', faqs: 'faqs' }
const toPublic = row => {
  if (!row) return row
  const item = { ...row, visible: Boolean(row.visible) }
  if (item.features) item.features = JSON.parse(item.features)
  return item
}
const rows = table => db.prepare(`SELECT * FROM ${table} ORDER BY id ASC`).all().map(toPublic)
const seedRows = (table, items, columns, values) => {
  if (db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count > 0) return
  const statement = db.prepare(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`)
  for (const item of items) statement.run(...values(item))
}

seedRows('services', serviceSeed, ['id', 'icon', 'title', 'text', 'tag', 'visible'], item => [item.id, item.icon, item.title, item.text, item.tag, 1])
seedRows('projects', projectSeed, ['id', 'category', 'title', 'text', 'image', 'accent', 'features', 'visible'], item => [item.id, item.category, item.title, item.text, item.image, item.accent, JSON.stringify(item.features), 1])
seedRows('founders', founderSeed, ['id', 'name', 'role', 'bio', 'initials', 'color', 'visible'], item => [item.id, item.name, item.role, item.bio, item.initials, item.color, 1])
seedRows('testimonials', testimonialSeed, ['id', 'quote', 'name', 'role', 'initials', 'visible'], item => [item.id, item.quote, item.name, item.role, item.initials, 1])
seedRows('faqs', faqSeed, ['id', 'question', 'answer', 'visible'], item => [item.id, item.question, item.answer, 1])
const settings = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)')
for (const [key, value] of Object.entries(contentSeed)) settings.run(key, value)

const json = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' })
  res.end(JSON.stringify(body))
}
const body = req => new Promise((resolve, reject) => {
  let raw = ''
  req.on('data', chunk => { raw += chunk })
  req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}) } catch (error) { reject(error) } })
  req.on('error', reject)
})
const idFrom = url => Number(url.split('/').pop())

function bootstrap() {
  return {
    content: Object.fromEntries(db.prepare('SELECT key, value FROM settings').all().map(item => [item.key, item.value])),
    services: rows('services'),
    projects: rows('projects'),
    founders: rows('founders'),
    testimonials: rows('testimonials'),
    faqs: rows('faqs'),
    bookings: db.prepare('SELECT * FROM bookings ORDER BY id ASC').all(),
    messages: db.prepare('SELECT * FROM messages ORDER BY id ASC').all()
  }
}

function writeResource(resource, item, id = Date.now()) {
  const table = resourceTables[resource]
  if (!table) return null
  const record = { ...item, id }
  if (resource === 'services') db.prepare('INSERT INTO services (id, icon, title, text, tag, visible) VALUES (?, ?, ?, ?, ?, ?)').run(id, record.icon || 'sparkle', record.title, record.text || '', record.tag || 'Build', record.visible === false ? 0 : 1)
  if (resource === 'projects') db.prepare('INSERT INTO projects (id, category, title, text, image, accent, features, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(id, record.category || 'General', record.title, record.text || '', record.image || '', record.accent || 'green', JSON.stringify(record.features || []), record.visible === false ? 0 : 1)
  if (resource === 'founders') db.prepare('INSERT INTO founders (id, name, role, bio, initials, color, visible) VALUES (?, ?, ?, ?, ?, ?, ?)').run(id, record.name, record.role || '', record.bio || '', record.initials || record.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase(), record.color || 'green', record.visible === false ? 0 : 1)
  if (resource === 'testimonials') db.prepare('INSERT INTO testimonials (id, quote, name, role, initials, visible) VALUES (?, ?, ?, ?, ?, ?)').run(id, record.quote || '', record.name || '', record.role || '', record.initials || '', record.visible === false ? 0 : 1)
  if (resource === 'faqs') db.prepare('INSERT INTO faqs (id, question, answer, visible) VALUES (?, ?, ?, ?)').run(id, record.question || '', record.answer || '', record.visible === false ? 0 : 1)
  return toPublic(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id))
}

function updateResource(resource, id, patch) {
  const table = resourceTables[resource]
  if (!table) return null
  const current = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id)
  if (!current) return null
  const next = { ...toPublic(current), ...patch }
  const fields = resource === 'services' ? ['icon', 'title', 'text', 'tag', 'visible'] :
    resource === 'projects' ? ['category', 'title', 'text', 'image', 'accent', 'features', 'visible'] :
      resource === 'founders' ? ['name', 'role', 'bio', 'initials', 'color', 'visible'] :
        resource === 'testimonials' ? ['quote', 'name', 'role', 'initials', 'visible'] : ['question', 'answer', 'visible']
  const values = fields.map(field => field === 'features' ? JSON.stringify(next[field] || []) : field === 'visible' ? (next[field] === false ? 0 : 1) : next[field] || '')
  db.prepare(`UPDATE ${table} SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`).run(...values, id)
  return toPublic(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id))
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  if (req.method === 'OPTIONS') return json(res, 204, {})
  try {
    if (url.pathname === '/api/health') return json(res, 200, { ok: true, database: 'sqlite', path: 'data/greenpay.db' })
    if (url.pathname === '/api/bootstrap' && req.method === 'GET') return json(res, 200, bootstrap())
    if (url.pathname === '/api/settings' && req.method === 'PUT') {
      const values = await body(req)
      const update = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      for (const [key, value] of Object.entries(values)) update.run(key, String(value))
      return json(res, 200, bootstrap().content)
    }
    if (url.pathname === '/api/bookings' && req.method === 'POST') {
      const item = await body(req)
      const next = db.prepare('SELECT COUNT(*) AS count FROM bookings').get().count + 1
      const reference = `GP-${new Date().getFullYear()}-${String(next).padStart(4, '0')}`
      const id = Date.now()
      db.prepare('INSERT INTO bookings (id, reference, name, business, email, phone, service, budget, date, preference, description, attachment, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .run(id, reference, item.name || '', item.business || '', item.email || '', item.phone || '', item.service || '', item.budget || '', item.date || '', item.preference || '', item.description || '', item.attachment || '', 'New', new Date().toISOString())
      return json(res, 201, { ...db.prepare('SELECT * FROM bookings WHERE id = ?').get(id), reference })
    }
    if (url.pathname === '/api/messages' && req.method === 'POST') {
      const item = await body(req)
      const id = Date.now()
      db.prepare('INSERT INTO messages (id, name, email, topic, message, createdAt) VALUES (?, ?, ?, ?, ?, ?)')
        .run(id, item.name || '', item.email || '', item.topic || '', item.message || '', new Date().toISOString())
      return json(res, 201, db.prepare('SELECT * FROM messages WHERE id = ?').get(id))
    }
    const match = url.pathname.match(/^\/api\/(services|projects|founders|testimonials|faqs)(?:\/(\d+))?$/)
    if (match) {
      const [, resource, rawId] = match
      if (req.method === 'GET') return json(res, 200, rawId ? rows(resourceTables[resource]).find(item => item.id === Number(rawId)) : rows(resourceTables[resource]))
      if (req.method === 'POST') return json(res, 201, writeResource(resource, await body(req)))
      if (req.method === 'PUT' || req.method === 'PATCH') return json(res, 200, updateResource(resource, Number(rawId), await body(req)))
      if (req.method === 'DELETE') {
        db.prepare(`DELETE FROM ${resourceTables[resource]} WHERE id = ?`).run(Number(rawId))
        return json(res, 200, { ok: true })
      }
    }
    const bookingMatch = url.pathname.match(/^\/api\/bookings\/(\d+)$/)
    if (bookingMatch && (req.method === 'PATCH' || req.method === 'PUT')) {
      const item = await body(req)
      db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(item.status, Number(bookingMatch[1]))
      return json(res, 200, db.prepare('SELECT * FROM bookings WHERE id = ?').get(Number(bookingMatch[1])))
    }
    if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'API route not found' })

    const distFile = url.pathname === '/' ? join(root, 'dist', 'index.html') : join(root, 'dist', url.pathname)
    if (existsSync(distFile)) {
      const extension = extname(distFile)
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' }
      res.writeHead(200, { 'content-type': types[extension] || 'application/octet-stream' })
      return res.end(readFileSync(distFile))
    }
    return json(res, 404, { error: 'Not found' })
  } catch (error) {
    console.error(error)
    return json(res, 500, { error: error.message })
  }
})

const port = Number(process.env.API_PORT || 3001)
server.listen(port, '0.0.0.0', () => console.log(`GreenPay API + SQLite database listening on http://0.0.0.0:${port}`))