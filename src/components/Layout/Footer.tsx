import { Layout } from '@douyinfe/semi-ui'
import { Typography } from '@douyinfe/semi-ui'

const Footer = () => {
  const { Footer } = Layout
  const { Text } = Typography
  return (
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
        <Text
          className="mr-6"
          link={{ href: 'https://new.vskxc.com/', target: '_blank' }}
        >
          生科芯创
        </Text>
        <span>反馈建议</span>
      </span>
    </Footer>
  )
}

export default Footer
