import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import './index.scss'

interface StakingPosition {
  id: string
  symbol: string
  amount: number
  apy: number
  earned: number
  status: 'active' | 'pending' | 'completed'
  unlockTime: number
  daysStaked: number
}

export default function StakingPage() {
  const [positions, setPositions] = useState<StakingPosition[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)
  const [loading, setLoading] = useState(true)

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '质押收益'
    })
  })

  useEffect(() => {
    // 模拟获取质押数据
    setTimeout(() => {
      const mockData: StakingPosition[] = [
        {
          id: '1',
          symbol: 'ETH',
          amount: 10.5,
          apy: 4.2,
          earned: 0.126,
          status: 'active',
          unlockTime: Date.now() + 86400000 * 30, // 30天后
          daysStaked: 45
        },
        {
          id: '2',
          symbol: 'USDT',
          amount: 5000,
          apy: 6.8,
          earned: 68.5,
          status: 'active',
          unlockTime: Date.now() + 86400000 * 7, // 7天后
          daysStaked: 120
        }
      ]
      setPositions(mockData)
      setTotalValue(mockData.reduce((sum, pos) => sum + pos.amount, 0))
      setTotalEarned(mockData.reduce((sum, pos) => sum + pos.earned, 0))
      setLoading(false)
    }, 1000)
  }, [])

  const formatAmount = (amount: number, symbol: string) => {
    if (symbol === 'USDT') {
      return `¥${amount.toLocaleString()}`
    }
    return `${amount.toFixed(3)} ${symbol}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#52c41a'
      case 'pending': return '#faad14'
      case 'completed': return '#1890ff'
      default: return '#666666'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '质押中'
      case 'pending': return '待生效'
      case 'completed': return '已完成'
      default: return '未知'
    }
  }

  const getUnlockDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  return (
    <View className='staking-page'>
      <View className='page-header'>
        <Text className='page-title'>质押收益</Text>
        <Text className='page-subtitle'>管理您的数字资产质押</Text>
      </View>

      <View className='summary-cards'>
        <View className='summary-card'>
          <Text className='summary-label'>总质押价值</Text>
          <Text className='summary-value'>{formatAmount(totalValue, 'USDT')}</Text>
        </View>
        <View className='summary-card'>
          <Text className='summary-label'>累计收益</Text>
          <Text className='summary-value highlight'>+¥{totalEarned.toFixed(2)}</Text>
        </View>
      </View>

      <ScrollView className='positions-list' scrollY>
        {loading ? (
          <View className='loading'>
            <Text className='loading-text'>加载中...</Text>
          </View>
        ) : positions.length === 0 ? (
          <View className='empty-state'>
            <Text className='empty-text'>暂无质押记录</Text>
            <Button className='btn-stake'>开始质押</Button>
          </View>
        ) : (
          <>
            <View className='staking-header'>
              <Text className='header-title'>质押明细</Text>
              <Button className='btn-add'>+ 添加质押</Button>
            </View>
            
            {positions.map((position) => (
              <View key={position.id} className='position-item'>
                <View className='position-header'>
                  <View className='symbol-info'>
                    <Text className='symbol'>{position.symbol}</Text>
                    <View className='status-badge' style={{ backgroundColor: getStatusColor(position.status) }}>
                      <Text className='status-text'>{getStatusText(position.status)}</Text>
                    </View>
                  </View>
                  <View className='apy'>
                    <Text className='apy-value'>{position.apy}% APY</Text>
                  </View>
                </View>

                <View className='position-stats'>
                  <View className='stat-item'>
                    <Text className='stat-label'>质押数量</Text>
                    <Text className='stat-value'>{formatAmount(position.amount, position.symbol)}</Text>
                  </View>
                  <View className='stat-item'>
                    <Text className='stat-label'>已获收益</Text>
                    <Text className='stat-value earned'>+{position.earned.toFixed(3)}</Text>
                  </View>
                  <View className='stat-item'>
                    <Text className='stat-label'>质押天数</Text>
                    <Text className='stat-value'>{position.daysStaked}天</Text>
                  </View>
                </View>

                <View className='position-footer'>
                  <View className='unlock-info'>
                    <Text className='unlock-label'>解锁时间</Text>
                    <Text className='unlock-date'>{getUnlockDate(position.unlockTime)}</Text>
                  </View>
                  <View className='position-actions'>
                    <Button className='btn-harvest'>收获收益</Button>
                    {position.status === 'active' && (
                      <Button className='btn-unstake'>赎回</Button>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  )
}