import { useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { useReady, navigateTo } from '@tarojs/taro'
import type { QuickActionItem, QuickActionsProps } from './types'
import './index.scss'

const defaultActions: QuickActionItem[] = [
  {
    id: 'market',
    title: '查看市场',
    description: '实时行情分析',
    icon: '📊',
    url: '/pages/market/index',
    color: '#4A90E2',
    badge: 0
  },
  {
    id: 'arbitrage',
    title: '套利机会',
    description: '发现套利空间',
    icon: '💰',
    url: '/pages/arbitrage/index',
    color: '#7ED321',
    badge: 2
  },
  {
    id: 'staking',
    title: '质押收益',
    description: '管理质押资产',
    icon: '🔒',
    url: '/pages/staking/index',
    color: '#F5A623',
    badge: 1
  },
  {
    id: 'steam',
    title: '绑定Steam',
    description: '账户关联管理',
    icon: '🎮',
    url: '/pages/steam/index',
    color: '#9013FE',
    badge: 0
  }
]

export default function QuickActions(props: QuickActionsProps) {
  const {
    items = defaultActions,
    columns = 2,
    showBadges = true,
    onItemClick,
    customOrder,
    className = ''
  } = props

  const [animations, setAnimations] = useState<{[key: string]: string}>({})

  // 按自定义顺序排序
  const sortedItems = customOrder
    ? customOrder.map(id => items.find(item => item.id === id)).filter(Boolean) as QuickActionItem[]
    : items

  // 处理点击事件
  const handleItemClick = async (item: QuickActionItem) => {
    if (!item.isEnabled && item.isEnabled !== undefined) return

    // 添加点击动画
    setAnimations(prev => ({ ...prev, [item.id]: 'clicking' }))
    
    setTimeout(() => {
      setAnimations(prev => {
        const newAnimations = { ...prev }
        delete newAnimations[item.id]
        return newAnimations
      })
    }, 200)

    // 触发回调
    if (onItemClick) {
      onItemClick(item)
    }

    // 执行页面跳转
    if (item.url) {
      try {
        await navigateTo({
          url: item.url
        })
      } catch (error) {
        console.error('导航失败:', error)
      }
    }
  }

  // 处理键盘事件（无障碍访问）
  const handleKeyDown = (event: any, item: QuickActionItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleItemClick(item)
    }
  }

  // 获取grid列样式
  const getGridClass = () => {
    return columns === 4 ? 'quick-actions-grid-4' : 'quick-actions-grid-2'
  }

  return (
    <View className={`quick-actions ${getGridClass()} ${className}`}>
      {sortedItems.map((item) => (
        <View
          key={item.id}
          className={`action-item ${animations[item.id] || ''} ${!item.isEnabled && item.isEnabled !== undefined ? 'disabled' : ''}`}
          onClick={() => handleItemClick(item)}
          onLongPress={() => console.log('长按:', item.title)}
          role='button'
          tabIndex={0}
          aria-label={`${item.title} - ${item.description}${item.badge && showBadges ? `，有${item.badge}条未读消息` : ''}`}
          onKeyDown={(e) => handleKeyDown(e, item)}
        >
          <View className='action-content'>
            <View className='action-icon' style={{ backgroundColor: item.color }}>
              <Text className='icon-text'>{item.icon}</Text>
              {item.badge && item.badge > 0 && showBadges && (
                <View className='badge'>
                  <Text className='badge-text'>
                    {item.badge > 99 ? '99+' : item.badge}
                  </Text>
                </View>
              )}
            </View>
            
            <View className='action-text'>
              <Text className='action-title'>{item.title}</Text>
              <Text className='action-description'>{item.description}</Text>
            </View>
          </View>
          
          {/* 点击波纹效果 */}
          <View className='ripple-effect'></View>
        </View>
      ))}
    </View>
  )
}