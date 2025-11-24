// src/pages/Signup.tsx
import { Form, Button, Toast } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Signup = () => {
  const navigate = useNavigate()

  const { signup, isLoading } = useAuth()

  const handleSubmit = async (values: any) => {
    const res = await signup(values.email, values.password)

    if (res.success) {
      Toast.success(res.message || '注册成功！')
      navigate('/login')
    } else {
      Toast.error(res.message)
    }
  }

  const validateEmail = (value: string) => {
    if (!value) return '邮箱不能为空'
    if (!EMAIL_REGEX.test(value)) return '请输入正确的邮箱格式'
    return undefined
  }

  const validatePassword = (value: string) => {
    if (!value) return '密码不能为空'
    if (value.length < 8) return '密码长度不能少于 8 位'
    return undefined
  }

  return (
    <div className="flex flex-col items-center bg-[rgb(var(--semi-grey-0))] min-h-screen overflow-hidden font-[PingFang_SC]">
      <main className="flex flex-col flex-grow items-center justify-center w-full p-4 space-y-4">
        <div className="flex flex-col items-center bg-[var(--semi-color-bg-0)] rounded-lg shadow-[0_0_1px_0_#0000004d,0_4px_14px_0_#0000001a] px-14 py-12 w-full max-w-[552px] min-h-[546px] space-y-[30px]">
          <div className="flex flex-col items-center space-y-6">
            <img src="/logo.png" alt="logo" className="w-[72px] h-[72px]" />
            <header className="flex flex-col items-center justify-center space-y-[6px]">
              <p className="text-[32px] leading-[44px] font-semibold text-[var(--semi-color-text-0)]">
                注册账户
              </p>
            </header>
          </div>

          <div className="flex flex-col items-start w-full space-y-7">
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col w-full space-y-2"
            >
              <Form.Input
                label={{ text: '邮箱' }}
                field="email"
                placeholder="输入邮箱"
                style={{ width: '100%' }}
                validate={validateEmail}
                trigger="blur"
              />

              <Form.Input
                mode="password"
                label={{ text: '密码' }}
                field="password"
                placeholder="输入密码 (至少8位)"
                style={{ width: '100%' }}
                validate={validatePassword}
                trigger="blur"
              />

              <Button
                htmlType="submit"
                theme="solid"
                className="w-full h-10"
                loading={isLoading}
                disabled={isLoading}
              >
                注册
              </Button>
            </Form>

            <p className="text-[14px] text-gray-600">
              已经有账号了？{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                点击这里去登录
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup
