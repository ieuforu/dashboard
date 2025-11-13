import { Layout, Nav, Button, Avatar, Dropdown } from '@douyinfe/semi-ui'
import {
  IconBell,
  IconHelpCircle,
  IconHome,
  IconHistogram,
  IconSetting,
  IconSemiLogo,
} from '@douyinfe/semi-icons'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

const App = () => {
  const { Header, Footer, Sider, Content } = Layout
  const location = useLocation()
  const selectedKey = location.pathname.split('/')[1] || 'home'

  return (
    <Layout
      className="w-dvw h-dvh"
      style={{ border: '1px solid var(--semi-color-border)' }}
    >
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          defaultSelectedKeys={['home']}
          selectedKeys={[selectedKey]}
          style={{ maxWidth: 220, height: '100%' }}
          items={[
            {
              itemKey: 'home',
              text: '首页',
              icon: <IconHome size="large" />,
            },
            {
              itemKey: 'histogram',
              text: '基础数据',
              icon: <IconHistogram size="large" />,
            },
            {
              itemKey: 'setting',
              text: '设置',
              icon: <IconSetting size="large" />,
            },
          ]}
          header={{
            logo: <IconSemiLogo style={{ fontSize: 36 }} />,
            text: 'SKXC Design',
          }}
          footer={{
            collapseButton: true,
          }}
          renderWrapper={({ itemElement, props }) => (
            <Link style={{ textDecoration: 'none' }} to={`/${props.itemKey}`}>
              {itemElement}
            </Link>
          )}
          onSelect={data => {}}
          onClick={data => {}}
        />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            mode="horizontal"
            footer={
              <>
                <Button
                  theme="borderless"
                  icon={<IconBell size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Button
                  theme="borderless"
                  icon={<IconHelpCircle size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Dropdown
                  position="bottomRight"
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item>详情</Dropdown.Item>
                      <Dropdown.Item>退出</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Avatar size="small" color="light-blue" style={{ margin: 4 }}>
                    BD
                  </Avatar>
                  <span>Bytedancer</span>
                </Dropdown>
              </>
            }
          ></Nav>
        </Header>
        <Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}
        >
          <Routes>
            <Route path="/home" element={<h1>Home Page</h1>} />
            <Route path="/histogram" element={<h1>Histogram Page</h1>} />
            <Route path="/setting" element={<h1>Settings Page</h1>} />
          </Routes>
        </Content>
        <Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: 'var(--semi-color-text-2)',
            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>
              Copyright © {new Date().getFullYear()} SKXC. All Rights Reserved.
            </span>
          </span>
          <span>
            <span style={{ marginRight: '24px' }}>平台客服</span>
            <span>反馈建议</span>
          </span>
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
