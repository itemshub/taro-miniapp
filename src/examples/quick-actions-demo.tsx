import { useState } from 'react'
import { View, Text, Switch } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { QuickActions, type QuickActionItem } from '@/components'
import './index.scss'

export default function QuickActionsDemo() {
  const [showBadges, setShowBadges] = useState(true)
  const [customItems, setCustomItems] = useState<QuickActionItem[]>([
    {
      id: 'dashboard',
      title: '数据看板',
      description: '综合数据分析',
      icon: '📈',
      url: '/pages/dashboard/index',
      color: '#1890ff',
      badge: 5
    },
    {
      id: 'portfolio',
      title: '投资组合',
      description: '资产管理',
      icon: '💼',
      url: '/pages/portfolio/index',
      color: '#52c41a',
      badge: 0
    },
    {
      id: 'news',
      title: '市场资讯',
      description: '最新消息',
      icon: '📰',
      url: '/pages/news/index',
      color: '#fa8c16',
      badge: 12,
      isEnabled: false
    },
    {
      id: 'settings',
      title: '系统设置',
      description: '个性化配置',
      icon: '⚙️',
      url: '/pages/settings/index',
      color: '#722ed1',
      badge: 0
    }
  ])

  const [customOrder, setCustomOrder] = useState<string[]>(['dashboard', 'news', 'portfolio', 'settings'])

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '快捷入口演示'
    })
  })

  const handleItemClick = (item: QuickActionItem) => {
    console.log('点击了:', item.title, item)
    
    // 这里可以添加自定义的业务逻辑
    if (item.id === 'news' && !item.isEnabled) {
      Taro.showToast({
        title: '该功能暂未开放',
        icon: 'none'
      })
      return
    }

    // 模拟页面跳转
    Taro.navigateTo({
      url: item.url || '/pages/index/index'
    })
  }

  const toggleBadges = () => {
    setShowBadges(!showBadges)
  }

  const resetOrder = () => {
    setCustomOrder(['dashboard', 'news', 'portfolio', 'settings'])
  }

  const shuffleOrder = () => {
    const shuffled = [...customOrder].sort(() => Math.random() - 0.5)
    setCustomOrder(shuffled)
  }

  const updateItemBadge = (itemId: string) => {
    setCustomItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          badge: (item.badge || 0) + 1
        }
      }
      return item
    }))
  }

  return (
    <View className='demo-page'>
      <View className='demo-header'>
        <Text className='demo-title'>快捷入口组件演示</Text>
        <Text className='demo-subtitle'>展示组件的各种配置和用法</Text>
      </View>

      <View className='demo-controls'>
        <View className='control-item'>
          <Text className='control-label'>显示徽章</Text>
          <Switch 
            checked={showBadges} 
            onChange={toggleBadges}
            color='#007AFF'
          />
        </View>
        
        <View className='control-buttons'>
          <View className='btn-demo' onClick={resetOrder}>
            <Text className='btn-text'>重置排序</Text>
          </View>
          <View className='btn-demo' onClick={shuffleOrder}>
            <Text className='btn-text'>随机排序</Text>
          </View>
        </View>
      </View>

      {/* 默认配置 */}
      <View className='demo-section'>
        <Text className='section-title'>默认配置</Text>
        <QuickActions 
          showBadges={showBadges}
          onItemClick={handleItemClick}
        />
      </View>

      {/* 自定义数据 */}
      <View className='demo-section'>
        <Text className='section-title'>自定义数据源</Text>
        <QuickActions 
          items={customItems}
          showBadges={showBadges}
          onItemClick={handleItemClick}
        />
      </View>

      {/* 自定义排序 */}
      <View className='demo-section'>
        <Text className='section-title'>自定义排序</Text>
        <QuickActions 
          items={customItems}
          customOrder={customOrder}
          showBadges={showBadges}
          onItemClick={handleItemClick}
        />
      </View>

      {/* 动态更新演示 */}
      <View className='demo-section'>
        <Text className='section-title'>动态数据更新</Text>
        <View className='demo-actions'>
          <View className='update-btn' onClick={() => updateItemBadge('dashboard')}>
            <Text className='update-btn-text'>数据看板+1徽章</Text>
          </View>
          <View className='update-btn' onClick={() => updateItemBadge('portfolio')}>
            <Text className='update-btn-text'>投资组合+1徽章</Text>
          </View>
          <View className='update-btn' onClick={() => updateItemBadge('news')}>
            <Text className='update-btn-text'>市场资讯+1徽章</Text>
          </View>
        </View>
        <QuickActions 
          items={customItems}
          showBadges={showBadges}
          onItemClick={handleItemClick}
        />
      </View>

      <View className='demo-tips'>
        <Text className='tips-title'>使用说明</Text>
        <View className='tip-item'>
          <Text className='tip-number'>1.</Text>
          <Text className='tip-text'>点击卡片可触发点击事件和页面跳转</Text>
        </View>
        <View className='tip-item'>
          <Text className='tip-number'>2.</Text>
          <Text className='tip-text'>悬停时有平滑的动画效果</Text>
        </View>
        <View className='tip-item'>
          <Text className='tip-number'>3.</Text>
          <Text className='tip-text'>支持无障碍访问，键盘导航</Text>
        </View>
        <View className='tip-item'>
          <Text className='tip-number'>4.</Text>
          <Text className='tip-text'>支持自定义排序和动态数据更新</Text>
        </View>
      </View>
    </View>
  )
}