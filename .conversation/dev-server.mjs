import { spawn } from 'node:child_process'

const api = spawn(process.execPath, ['server.js'], { stdio: 'inherit', env: { ...process.env, API_PORT: '3001' } })
const vite = spawn('vite', ['--host', '0.0.0.0', '--port', process.env.PORT || '5173'], { stdio: 'inherit', shell: true })

const shutdown = () => {
  api.kill('SIGTERM')
  vite.kill('SIGTERM')
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
api.on('exit', code => { if (code && code !== 0) vite.kill('SIGTERM') })