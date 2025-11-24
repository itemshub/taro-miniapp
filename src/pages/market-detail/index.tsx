import { useState } from 'react'
import { View, Text, ScrollView, Image, Button } from '@tarojs/components'
import Taro, { useReady, useRouter } from '@tarojs/taro'
import './index.scss'

interface MarketInfo {
  name: string
  color: string
  bgColor: string
  currency: string
  fee: string
  features: string[]
}

interface SkinItem {
  id: string
  name: string
  skin: string
  price: number
  change24h: number
  image: string
}

export default function MarketDetail() {
  const router = useRouter()
  const { platform, id } = router.params
  const [marketData, setMarketData] = useState<MarketInfo | null>(null)
  const [marketSkins, setMarketSkins] = useState<SkinItem[]>([])

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '市场详情'
    })
    loadMarketData()
  })

  const loadMarketData = () => {
    const data = getMarketData(platform || 'buff')
    setMarketData(data)
    
    // Mock skin items
    const mockSkins: SkinItem[] = [
      {
        id: '1',
        name: 'AK-47',
        skin: '火蛇',
        price: 2850.50,
        change24h: 2.5,
        image: '/assets/default-skin.png'
      },
      {
        id: '2',
        name: 'AWP',
        skin: '龙狙',
        price: 18500.00,
        change24h: -1.2,
        image: '/assets/default-skin.png'
      },
      {
        id: '3',
        name: 'M4A4',
        skin: '嚎叫',
        price: 5200.80,
        change24h: 3.1,
        image: '/assets/default-skin.png'
      },
      {
        id: '4',
        name: 'Glock-18',
        skin: '褪色',
        price: 380.50,
        change24h: 0.8,
        image: '/assets/default-skin.png'
      },
      {
        id: '5',
        name: 'Desert Eagle',
        skin: '荒野大镖客',
        price: 920.00,
        change24h: -0.5,
        image: '/assets/default-skin.png'
      },
      {
        id: '6',
        name: 'USP-S',
        skin: '杀戮确认',
        price: 1580.30,
        change24h: 1.9,
        image: '/assets/default-skin.png'
      }
    ]
    setMarketSkins(mockSkins)
  }

  const getMarketData = (platform: string): MarketInfo => {
    switch (platform) {
      case 'buff':
        return {
          name: 'Buff163',
          color: 'blue',
          bgColor: 'blue-bg',
          currency: 'CNY',
          fee: '2.5%',
          features: ['支付宝支付', '即时到账', '手续费低']
        }
      case 'c5':
        return {
          name: 'C5游戏',
          color: 'green',
          bgColor: 'green-bg',
          currency: 'CNY',
          fee: '2.0%',
          features: ['安全保障', '快速交易', '专业客服']
        }
      case 'steam':
        return {
          name: 'Steam Market',
          color: 'gray',
          bgColor: 'gray-bg',
          currency: 'USD',
          fee: '15.0%',
          features: ['全球市场', '官方保障', '高流动性']
        }
      default:
        return {
          name: '未知平台',
          color: 'gray',
          bgColor: 'gray-bg',
          currency: 'CNY',
          fee: '0%',
          features: []
        }
    }
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleNavigateToSkin = (skinId: string) => {
    Taro.navigateTo({
      url: `/pages/skin-detail/index?id=${skinId}`
    })
  }

  const handleVisitWebsite = () => {
    Taro.showModal({
      title: '提示',
      content: `即将跳转到${marketData?.name}官网`,
      confirmText: '确定',
      cancelText: '取消'
    })
  }

  const handleViewApiDoc = () => {
    Taro.showToast({
      title: 'API文档',
      icon: 'none'
    })
  }

  if (!marketData) {
    return <View className='market-detail-page'>加载中...</View>
  }

  return (
    <ScrollView className='market-detail-page' scrollY>
      {/* Market Info */}
      <View className={`market-info-card ${marketData.bgColor}`}>
        <View className='market-icon-container'>
          <View className={`market-icon ${marketData.color}`}>
            <Text className='icon-text'>🔗</Text>
          </View>
        </View>
        <Text className={`market-name ${marketData.color}`}>{marketData.name}</Text>
        <Text className='market-subtitle'>专业游戏交易平台</Text>
        
        <View className='market-meta'>
          <View className='meta-item'>
            <Text className='meta-label'>手续费</Text>
            <Text className='meta-value'>{marketData.fee}</Text>
          </View>
          <View className='meta-item'>
            <Text className='meta-label'>货币</Text>
            <Text className='meta-value'>{marketData.currency}</Text>
          </View>
        </View>
        
        <View className='features-section'>
          <Text className='features-title'>平台特色</Text>
          <View className='features-list'>
            {marketData.features.map((feature, index) => (
              <View key={index} className='feature-item'>
                <View className={`feature-dot ${marketData.color}`} />
                <Text className='feature-text'>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Market Stats */}
      <View className='section'>
        <Text className='section-title'>市场数据</Text>
        <View className='stats-grid'>
          <View className='stat-card'>
            <Text className='stat-label'>今日交易量</Text>
            <Text className='stat-value'>¥123,456</Text>
            <Text className='stat-trend positive'>+15.2%</Text>
          </View>
          <View className='stat-card'>
            <Text className='stat-label'>活跃用户</Text>
            <Text className='stat-value'>8,592</Text>
            <Text className='stat-trend info'>实时更新</Text>
          </View>
        </View>
      </View>

      {/* Featured Items */}
      <View className='section'>
        <Text className='section-title'>热门商品</Text>
        <View className='skin-list'>
          {marketSkins.map((skin) => (
            <View 
              key={skin.id}
              className='skin-item'
              onClick={() => handleNavigateToSkin(skin.id)}
            >
              <Image 
                src={skin.image} 
                className='skin-image'
                mode='aspectFit'
              />
              <View className='skin-info'>
                <Text className='skin-name'>{skin.name}</Text>
                <Text className='skin-type'>{skin.skin}</Text>
                <View className='skin-price-row'>
                  <Text className='skin-price'>¥{skin.price.toFixed(2)}</Text>
                  <Text className={`skin-change ${skin.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {skin.change24h >= 0 ? '+' : ''}{Math.abs(skin.change24h).toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Button className={`nav-button ${marketData.color}`} size='mini'>
                跳转
              </Button>
            </View>
          ))}
        </View>
      </View>

      {/* Price Comparison */}
      <View className='section'>
        <Text className='section-title'>平台价格对比</Text>
        <View className='comparison-card'>
          <Text className='comparison-subtitle'>以 AK-47 Fire Serpent 为例</Text>
          
          <View className='comparison-list'>
            {[
              { platform: 'Buff163', price: 2850.50, change: 2.5, highlight: false },
              { platform: 'C5游戏', price: 2793.49, change: 2.8, highlight: false },
              { platform: marketData.name, price: 2850.50, change: 2.5, highlight: true },
              { platform: 'Skinport', price: 2821.50, change: 2.2, highlight: false }
            ].map((item, index) => (
              <View 
                key={index} 
                className={`comparison-item ${item.highlight ? 'highlight' : ''}`}
              >
                <View className='comparison-platform'>
                  <Text className='platform-name'>{item.platform}</Text>
                  {item.highlight && <Text className='current-badge'>当前</Text>}
                </View>
                <View className='comparison-price'>
                  <Text className='price-text'>¥{item.price.toFixed(2)}</Text>
                  <Text className={`change-text ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Actions */}
      <View className='actions'>
        <Button className='action-button primary' onClick={handleVisitWebsite}>
          访问官网
        </Button>
        <Button className='action-button secondary' onClick={handleViewApiDoc}>
          API文档
        </Button>
      </View>
    </ScrollView>
  )
}
