import { Layout } from '@douyinfe/semi-ui'
import Sider from './Sider'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const MainLayout = () => {
  const { Content } = Layout
  return (
    <Layout className="w-dvw h-dvh">
      <Sider />
      <Layout>
        <Header />
        <Content className="p-20 bg-gray-50 w-full mx-auto!">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default MainLayout
