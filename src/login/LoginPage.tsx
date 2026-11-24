import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import logo from './association-logo.jpg'
import './login.css'

interface LoginValues { account: string; password: string }

/** 渲染综合管理后台的登录页面并提交管理员凭据。 */
export default function LoginPage() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(values: LoginValues) {
    setPending(true)
    setError('')
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(values) })
      if (response.status === 401) { setError('账号或密码错误'); return }
      if (response.status === 503) { setError('登录服务暂不可用，请稍后重试。'); return }
      if (!response.ok) { setError('登录失败，请稍后重试。'); return }
      window.location.assign('/dashboard')
    } catch { setError('登录请求失败，请检查网络后重试。') }
    finally { setPending(false) }
  }

  return (
    <main className="admin-login">
      <aside className="login-brand" aria-label="卓工协会"><div className="login-brand__identity"><img src={logo} alt="" width={44} height={44} /><div><strong>卓工协会</strong><span lang="en">EXCELLENT MEDICAL ENGINEERS</span></div></div><div className="login-brand__story"><p className="login-brand__eyebrow" lang="en">ADMIN CONSOLE</p><p className="login-brand__headline">让管理更有序，<br />让成长被看见。</p><p className="login-brand__description">连接课程、成员与每一段学习进程。</p><div className="login-art" aria-hidden="true"><div className="login-art__orbit" /><div className="login-art__tile"><span className="login-art__cap"><span className="login-art__tassel" /></span></div></div></div><p className="login-brand__caption">卓越医学工程师协会 · 综合管理后台</p></aside>
      <section className="login-panel" aria-labelledby="login-title"><div className="login-panel__content"><header className="login-panel__header"><span className="login-panel__welcome">欢迎回来</span><h1 id="login-title">登录综合管理后台</h1><p>请使用独立的管理员账号登录。</p></header><Form<LoginValues> name="admin-login" layout="vertical" size="large" requiredMark={false} onFinish={handleSubmit} onValuesChange={() => setError('')}><Form.Item label="管理员账号" name="account" rules={[{ required: true, whitespace: true, message: '请输入管理员账号' }]}><Input placeholder="请输入管理员账号" autoComplete="username" maxLength={128} /></Form.Item><Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}><Input.Password placeholder="请输入密码" autoComplete="current-password" /></Form.Item><Button type="primary" htmlType="submit" autoInsertSpace={false} block loading={pending}>登录</Button>{error && <Alert className="login-panel__status" title={error} type="error" showIcon />}</Form></div></section>
    </main>
  )
}
