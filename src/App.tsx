import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import LoginPage from './login/LoginPage'

/** 在后台入口加载中文界面和品牌主题。 */
function App() {
  const path = window.location.pathname.replace(/\/$/, '')

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#68498f', borderRadius: 9 } }}>
      {path === '' || path === '/login' ? (
        <LoginPage />
      ) : (
        <main className="route-message">
          <h1>页面未找到</h1>
          <a href="/login">前往登录</a>
        </main>
      )}
    </ConfigProvider>
  )
}

export default App
