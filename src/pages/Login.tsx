import { Form, Button } from '@douyinfe/semi-ui'

import styles from './login.module.scss'
import { useNavigate } from 'react-router-dom'

const Component = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.frame}>
      <div className={styles.main}>
        <div className={styles.login}>
          <div className={styles.component66}>
            <img
              src="https://lf26-static.semi.design/obj/semi-tos/template/10ad1e1b-7ea2-47df-9a25-aa16d20ffaf7.SVG"
              className={styles.logo}
            />
            <div className={styles.header}>
              <p className={styles.title}>欢迎回来</p>
              <p className={styles.text3}>
                <span className={styles.text}>登录</span>
                <span className={styles.text2}>&nbsp;生科芯创&nbsp;</span>
                <span className={styles.text}>账户</span>
              </p>
            </div>
          </div>
          <div className={styles.form}>
            <Form className={styles.inputs}>
              <Form.Input
                label={{ text: '用户名' }}
                field="input"
                placeholder="输入用户名"
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
              <Form.Input
                label={{ text: '密码' }}
                field="field1"
                placeholder="输入密码"
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
            </Form>
            <p>
              还没有账号？
              <span
                className="text-blue-500 hover:cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                点击这里去注册
              </span>
            </p>
            <Button theme="solid" className={styles.button}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component
