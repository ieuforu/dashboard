import {
  IconHome,
  IconHistogram,
  IconSetting,
  IconSemiLogo,
} from '@douyinfe/semi-icons'
import { Layout, Nav } from '@douyinfe/semi-ui'
import { useLocation, useNavigate, Link } from 'react-router-dom'

const Sider = () => {
  const { Sider } = Layout
  const location = useLocation()
  const selectedKey = location.pathname.split('/')[1] || 'home'
  const navigate = useNavigate()
  return (
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
  )
}

export default Sider
