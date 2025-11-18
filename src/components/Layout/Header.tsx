import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons'
import { Layout, Nav, Button, Dropdown, Avatar } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { Header } = Layout
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/login')
    localStorage.clear()
  }
  return (
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
                  <Dropdown.Item onClick={() => navigate('/profile')}>
                    个人主页
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>退出</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar size="small" color="light-blue" style={{ margin: 4 }}>
                SK
              </Avatar>
              <span>SKXC USER</span>
            </Dropdown>
          </>
        }
      ></Nav>
    </Header>
  )
}

export default Header
