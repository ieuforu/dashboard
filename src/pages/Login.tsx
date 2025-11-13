import { Form, Button } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center bg-[rgb(var(--semi-grey-0))] min-h-screen overflow-hidden font-[PingFang_SC]">
      <main className="flex flex-col flex-grow items-center justify-center w-full p-4 space-y-4">
        <div className="flex flex-col items-center bg-[var(--semi-color-bg-0)] rounded-lg shadow-[0_0_1px_0_#0000004d,0_4px_14px_0_#0000001a] px-14 py-12 w-full max-w-[552px] min-h-[546px] space-y-[30px]">
          {/* 顶部 Logo + 标题 */}
          <div className="flex flex-col items-center space-y-6">
            <img
              src="https://lf26-static.semi.design/obj/semi-tos/template/10ad1e1b-7ea2-47df-9a25-aa16d20ffaf7.SVG"
              alt="logo"
              className="w-[72px] h-[72px]"
            />
            <header className="flex flex-col items-center justify-center space-y-[6px]">
              <p className="text-[32px] leading-[44px] font-semibold text-[var(--semi-color-text-0)]">
                欢迎回来
              </p>
              <p className="text-[16px] leading-[22px] text-[var(--semi-color-text-2)]">
                <span>登录</span>
                <span className="font-[Inter] tracking-[-0.32px]">
                  &nbsp;生科芯创&nbsp;
                </span>
                <span>账户</span>
              </p>
            </header>
          </div>

          {/* 表单部分 */}
          <div className="flex flex-col items-start w-full space-y-7">
            <Form className="flex flex-col w-full space-y-6">
              <Form.Input
                label={{ text: '用户名' }}
                field="username"
                placeholder="输入用户名"
                style={{ width: '100%' }}
              />
              <Form.Input
                label={{ text: '密码' }}
                field="password"
                placeholder="输入密码"
                style={{ width: '100%' }}
              />
            </Form>

            <p className="text-[14px] text-gray-600">
              还没有账号？{' '}
              <span
                onClick={() => navigate('/signup')}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                点击这里去注册
              </span>
            </p>

            <Button theme="solid" className="w-full h-10">
              登录
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
