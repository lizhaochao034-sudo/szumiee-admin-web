import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import LoginPage from './login/LoginPage'
import './index.css'

type Identity = { id: string; name: string; role: string }

/** 在后台入口加载中文界面和品牌主题。 */
function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const protectedRoute = path !== '' && path !== '/login'
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [loading, setLoading] = useState(protectedRoute)

  useEffect(() => {
    if (!protectedRoute) return
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then(async (response) => { if (!response.ok) throw new Error('未登录'); return response.json() as Promise<Identity> })
      .then(setIdentity)
      .catch(() => window.location.assign('/login'))
      .finally(() => setLoading(false))
  }, [protectedRoute])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
    window.location.assign('/login')
  }

  const content = !protectedRoute ? <LoginPage /> : loading
    ? <main className="route-message"><p>正在验证登录状态…</p></main>
    : identity
      ? <main className="route-message"><h1>管理员后台</h1><p>你好，{identity.name}。</p><p>当前身份：{identity.role}</p><button type="button" onClick={handleLogout}>退出登录</button></main>
      : null
  return <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#68498f', borderRadius: 9 } }}>{content}</ConfigProvider>
}

export default App
