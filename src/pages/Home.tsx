import { useEffect, useState } from 'react'
import { Card, Table, Avatar, Button, Toast, Tag } from '@douyinfe/semi-ui'
import { IconExit } from '@douyinfe/semi-icons'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import type { ApiResponse } from '../types/api'
import { api } from '../lib/api'

// 定义用户列表的数据结构
interface UserData {
  id: string
  email: string
  createdAt: string
}

const Home = () => {
  // 1. 获取当前登录用户信息
  const { user, logout } = useAuth()

  const navigate = useNavigate()
  // 2. 状态管理：用户列表数据
  const [dataSource, setDataSource] = useState<UserData[]>([])
  const [loading, setLoading] = useState(false)

  // 3. 模拟请求受保护的接口 (获取所有用户)
  const fetchAllUsers = async () => {
    setLoading(true)
    try {
      const result = await api<ApiResponse<UserData[]>>('/users')
      if (result.success) {
        setDataSource(result.data!)
      } else {
        Toast.error(result.message || '获取失败')
      }
    } catch {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  // 组件加载时获取数据
  useEffect(() => {
    fetchAllUsers()
  }, [])

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      render: (text: string) => (
        <span className="text-gray-500 font-mono text-xs">{text}</span>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '状态',
      key: 'status',
      render: () => <Tag color="green">Active</Tag>,
    },
  ]

  return (
    <div className="space-y-6">
      {/* --- 顶部欢迎卡片 --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="md:col-span-2 shadow-sm"
          title={<span className="text-lg font-semibold">👋 欢迎回来</span>}
          headerExtraContent={
            <Button
              theme="light"
              type="danger"
              icon={<IconExit />}
              onClick={logout}
            >
              退出登录
            </Button>
          }
        >
          <div className="flex items-center space-x-4">
            <Avatar color="blue" size="large">
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {user?.email || '未知用户'}
              </h3>
              <p className="text-gray-500 text-sm">
                用户 ID: <span className="font-mono">{user?.sub}</span>
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm" title="系统状态">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">当前时间</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">用户权限</span>
              <Tag color="blue">管理员</Tag>
            </div>
          </div>
        </Card>
      </div>

      {/* --- 用户列表表格 (测试 API) --- */}
      <Card
        title="用户列表 (API 测试)"
        className="shadow-sm"
        headerExtraContent={
          <Button onClick={fetchAllUsers} loading={loading}>
            刷新列表
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{ pageSize: 5 }}
          empty="暂无数据"
        />
      </Card>
    </div>
  )
}

export default Home
