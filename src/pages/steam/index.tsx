import { useState, useEffect } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import './index.scss'

interface SteamAccount {
  steamId: string
  username: string
  avatar: string
  level: number
  gamesCount: number
  isOnline: boolean
  lastLogin: number
}

export default function SteamPage() {
  const [steamAccount, setSteamAccount] = useState<SteamAccount | null>(null)
  const [binding, setBinding] = useState(false)
  const [loading, setLoading] = useState(true)

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '绑定Steam'
    })
  })

  useEffect(() => {
    // 模拟获取Steam账户信息
    setTimeout(() => {
      setSteamAccount({
        steamId: '76561198000000000',
        username: 'GameMaster123',
        avatar: 'https://via.placeholder.com/64x64?text=SM',
        level: 45,
        gamesCount: 127,
        isOnline: true,
        lastLogin: Date.now() - 3600000 // 1小时前
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleBinding = async () => {
    setBinding(true)
    // 模拟绑定过程
    setTimeout(() => {
      setBinding(false)
      Taro.showToast({
        title: '绑定成功！',
        icon: 'success',
        duration: 2000
      })
    }, 2000)
  }

  const handleUnbinding = () => {
    Taro.showModal({
      title: '确认解绑',
      content: '确定要解绑Steam账户吗？此操作将清除所有关联数据。',
      success: (res) => {
        if (res.confirm) {
          setSteamAccount(null)
          Taro.showToast({
            title: '已解绑',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  const formatLastLogin = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours}小时前`
    const days = Math.floor(hours / 24)
    return `${days}天前`
  }

  if (loading) {
    return (
      <View className='steam-page loading-page'>
        <View className='loading'>
          <Text className='loading-text'>加载中...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='steam-page'>
      <View className='page-header'>
        <Text className='page-title'>绑定Steam</Text>
        <Text className='page-subtitle'>连接您的Steam账户以获取游戏数据</Text>
      </View>

      {steamAccount ? (
        <View className='bound-account'>
          <View className='account-card'>
            <View className='account-header'>
              <Image className='avatar' src={steamAccount.avatar} />
              <View className='account-info'>
                <Text className='username'>{steamAccount.username}</Text>
                <View className='account-meta'>
                  <Text className='level'>等级 {steamAccount.level}</Text>
                  <View className={`status ${steamAccount.isOnline ? 'online' : 'offline'}`}>
                    <Text className='status-text'>
                      {steamAccount.isOnline ? '在线' : '离线'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className='account-stats'>
              <View className='stat-item'>
                <Text className='stat-value'>{steamAccount.gamesCount}</Text>
                <Text className='stat-label'>游戏数量</Text>
              </View>
              <View className='stat-item'>
                <Text className='stat-value'>{steamAccount.level}</Text>
                <Text className='stat-label'>账户等级</Text>
              </View>
              <View className='stat-item'>
                <Text className='stat-value'>{formatLastLogin(steamAccount.lastLogin)}</Text>
                <Text className='stat-label'>最后登录</Text>
              </View>
            </View>

            <View className='account-actions'>
              <Button className='btn-refresh'>刷新数据</Button>
              <Button className='btn-unbind' onClick={handleUnbinding}>解绑账户</Button>
            </View>
          </View>

          <View className='features-list'>
            <Text className='features-title'>可用功能</Text>
            
            <View className='feature-item'>
              <Text className='feature-icon'>🎮</Text>
              <View className='feature-text'>
                <Text className='feature-name'>游戏库存查询</Text>
                <Text className='feature-desc'>查看您的Steam游戏库和库存物品</Text>
              </View>
            </View>
            
            <View className='feature-item'>
              <Text className='feature-icon'>📊</Text>
              <View className='feature-text'>
                <Text className='feature-name'>游戏数据统计</Text>
                <Text className='feature-desc'>分析游戏时长和成就进度</Text>
              </View>
            </View>
            
            <View className='feature-item'>
              <Text className='feature-icon'>💰</Text>
              <View className='feature-text'>
                <Text className='feature-name'>价格监控</Text>
                <Text className='feature-desc'>追踪游戏和物品价格变动</Text>
              </View>
            </View>
            
            <View className='feature-item'>
              <Text className='feature-icon'>🔔</Text>
              <View className='feature-text'>
                <Text className='feature-name'>促销提醒</Text>
                <Text className='feature-desc'>获取游戏促销和折扣通知</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View className='unbound-state'>
          <View className='unbound-card'>
            <Text className='unbound-icon'>🎮</Text>
            <Text className='unbound-title'>未绑定Steam账户</Text>
            <Text className='unbound-desc'>
              绑定Steam账户以解锁更多功能，包括游戏数据查询、价格监控等
            </Text>
            
            <View className='binding-methods'>
              <Text className='methods-title'>绑定方式</Text>
              
              <View className='method-item'>
                <Text className='method-icon'>🔗</Text>
                <View className='method-info'>
                  <Text className='method-name'>Steam API密钥</Text>
                  <Text className='method-desc'>使用您的Steam API密钥进行绑定</Text>
                </View>
              </View>
              
              <View className='method-item'>
                <Text className='method-icon'>🔐</Text>
                <View className='method-info'>
                  <Text className='method-name'>Steam登录授权</Text>
                  <Text className='method-desc'>通过Steam OAuth进行安全授权</Text>
                </View>
              </View>
            </View>

            <Button 
              className='btn-bind' 
              onClick={handleBinding}
              disabled={binding}
            >
              {binding ? '绑定中...' : '开始绑定'}
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}