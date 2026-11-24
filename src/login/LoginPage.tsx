import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import logo from './association-logo.jpg'
import './login.css'

interface LoginValues {
  account: string
  password: string
}

/** 渲染综合管理后台的登录页面与表单预览。 */
export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false)

  /**
   * 在表单校验通过后提示当前的接口接入状态。
   *
   * @param _values 预留给真实登录请求的账号和密码。预览模式不发送或保存这些字段。
   */
  function handleSubmit(_values: LoginValues) {
    setSubmitted(true)
  }

  return (
    <main className="admin-login">
      <aside className="login-brand" aria-label="卓工协会">
        <div className="login-brand__identity">
          <img src={logo} alt="" width={44} height={44} />
          <div>
            <strong>卓工协会</strong>
            <span lang="en">EXCELLENT MEDICAL ENGINEERS</span>
          </div>
        </div>
        <div className="login-brand__story">
          <p className="login-brand__eyebrow" lang="en">ADMIN CONSOLE</p>
          <p className="login-brand__headline">让管理更有序，<br />让成长被看见。</p>
          <p className="login-brand__description">连接课程、成员与每一段学习进程。</p>
          <div className="login-art" aria-hidden="true">
            <div className="login-art__orbit" />
            <div className="login-art__tile"><span className="login-art__cap" /></div>
          </div>
        </div>
        <p className="login-brand__caption">卓越医学工程师协会 · 综合管理后台</p>
      </aside>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-panel__content">
          <header className="login-panel__header">
            <h1 id="login-title">登录综合管理后台</h1>
            <p>请使用独立的管理员账号登录。</p>
          </header>
          <Form<LoginValues>
            name="admin-login"
            layout="vertical"
            size="large"
            requiredMark={false}
            onFinish={handleSubmit}
            onValuesChange={() => setSubmitted(false)}
          >
            <Form.Item
              label="管理员账号"
              name="account"
              rules={[{ required: true, whitespace: true, message: '请输入管理员账号' }]}
            >
              <Input placeholder="请输入管理员账号" autoComplete="username" maxLength={128} />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                autoComplete="current-password"
                iconRender={(visible) => <span className="login-password-toggle">{visible ? '隐藏' : '显示'}</span>}
              />
            </Form.Item>
            <p className="login-panel__hint">账号由协会统一管理</p>
            <Button type="primary" htmlType="submit" autoInsertSpace={false} block>登录</Button>
            {submitted && (
              <Alert
                className="login-panel__status"
                title="表单校验通过，登录服务待接入。"
                type="info"
                showIcon
              />
            )}
          </Form>
        </div>
      </section>
    </main>
  )
}
