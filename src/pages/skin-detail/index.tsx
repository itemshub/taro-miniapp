import { useState } from 'react'
import { View, Text, ScrollView, Image, Button } from '@tarojs/components'
import Taro, { useReady, useRouter } from '@tarojs/taro'
import './index.scss'

interface Skin {
  id: string
  name: string
  skin: string
  quality: string
  rarity: string
  collection: string
  price: number
  change24h: number
  image: string
  description?: string
  stats?: {
    float: string
    patternIndex: string
  }
}

interface MarketComparison {
  platform: string
  price: number
  change: number
  volume: number
}

export default function SkinDetail() {
  const router = useRouter()
  const { id } = router.params
  const [isFavorited, setIsFavorited] = useState(false)
  const [skin, setSkin] = useState<Skin | null>(null)
  const [marketComparison, setMarketComparison] = useState<MarketComparison[]>([])

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '饰品详情'
    })
    loadSkinDetail()
  })

  const loadSkinDetail = () => {
    // 模拟数据
    const mockSkin: Skin = {
      id: id || '1',
      name: 'AK-47',
      skin: '火蛇',
      quality: '崭新出厂',
      rarity: '隐秘',
      collection: '猎杀者武器箱',
      price: 2850.50,
      change24h: 2.5,
      image: '/assets/default-skin.png',
      description: '这是一把稀有的AK-47皮肤，拥有独特的火蛇图案。',
      stats: {
        float: '0.0234',
        patternIndex: '661'
      }
    }
    
    const mockMarket: MarketComparison[] = [
      { platform: 'Buff163', price: mockSkin.price, change: mockSkin.change24h, volume: 156 },
      { platform: 'C5游戏', price: mockSkin.price * 0.98, change: mockSkin.change24h + 0.3, volume: 89 },
      { platform: 'Steam Market', price: mockSkin.price * 1.02, change: mockSkin.change24h - 0.2, volume: 67 },
      { platform: 'Skinport', price: mockSkin.price * 0.99, change: mockSkin.change24h + 0.1, volume: 123 }
    ]
    
    setSkin(mockSkin)
    setMarketComparison(mockMarket)
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited)
    Taro.showToast({
      title: isFavorited ? '已取消收藏' : '已添加收藏',
      icon: 'success'
    })
  }

  const handleViewArbitrage = () => {
    Taro.showToast({
      title: '跳转套利详情',
      icon: 'none'
    })
  }

  const handleExternalLink = (platform: string) => {
    Taro.showModal({
      title: '提示',
      content: `即将跳转到${platform}`,
      confirmText: '确定',
      cancelText: '取消'
    })
  }

  if (!skin) {
    return (
      <View className='skin-detail-page'>
        <View className='error-container'>
          <Text className='error-text'>饰品不存在</Text>
          <Button className='error-button' onClick={handleBack}>返回市场</Button>
        </View>
      </View>
    )
  }

  const getChangeColor = (change: number) => change >= 0 ? 'positive' : 'negative'

  return (
    <ScrollView className='skin-detail-page' scrollY>
      {/* Skin Image and Basic Info */}
      <View className='skin-info-card'>
        <View className='skin-image-container'>
          <Image 
            src={skin.image} 
            className='skin-image'
            mode='aspectFit'
          />
          <View className='quality-badge'>
            <Text className='quality-text'>{skin.quality}</Text>
          </View>
        </View>
        
        <Text className='skin-name'>{skin.name}</Text>
        <Text className='skin-type'>{skin.skin}</Text>
        
        <View className='skin-meta'>
          <View className='meta-item'>
            <Text className='meta-label'>稀有度</Text>
            <Text className='meta-value'>{skin.rarity}</Text>
          </View>
          <View className='meta-item'>
            <Text className='meta-label'>系列</Text>
            <Text className='meta-value'>{skin.collection}</Text>
          </View>
        </View>
        
        <View className='price-info'>
          <View className='price-item'>
            <Text className='price-label'>当前价格</Text>
            <Text className='price-value'>¥{skin.price.toFixed(2)}</Text>
          </View>
          <View className='price-item'>
            <Text className='price-label'>24小时涨跌</Text>
            <Text className={`change-value ${getChangeColor(skin.change24h)}`}>
              {skin.change24h >= 0 ? '+' : ''}{Math.abs(skin.change24h).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Market Comparison */}
      <View className='section'>
        <Text className='section-title'>市场对比</Text>
        
        <View className='market-list'>
          {marketComparison.map((market, index) => (
            <View key={index} className='market-item'>
              <View className='market-info'>
                <Text className='market-name'>{market.platform}</Text>
                <Text className='market-volume'>交易量: {market.volume}</Text>
              </View>
              <View className='market-price-info'>
                <Text className='market-price'>¥{market.price.toFixed(2)}</Text>
                <Text className={`market-change ${getChangeColor(market.change)}`}>
                  {market.change >= 0 ? '+' : ''}{market.change.toFixed(1)}%
                </Text>
              </View>
              <Button 
                className='link-button' 
                size='mini'
                onClick={() => handleExternalLink(market.platform)}
              >
                跳转
              </Button>
            </View>
          ))}
        </View>
      </View>

      {/* Arbitrage Opportunity */}
      <View className='section'>
        <Text className='section-title'>套利机会</Text>
        
        <View className='arbitrage-card'>
          <Text className='arbitrage-status'>可套利</Text>
          
          <View className='arbitrage-platforms'>
            <View className='arbitrage-item'>
              <Text className='arbitrage-label'>最优买入</Text>
              <Text className='arbitrage-buy'>C5游戏 - ¥{(skin.price * 0.98).toFixed(2)}</Text>
            </View>
            <View className='arbitrage-item'>
              <Text className='arbitrage-label'>最优卖出</Text>
              <Text className='arbitrage-sell'>Buff163 - ¥{skin.price.toFixed(2)}</Text>
            </View>
          </View>
          
          <View className='arbitrage-profit'>
            <Text className='profit-label'>套利空间</Text>
            <View className='profit-values'>
              <Text className='profit-rate'>+2.04%</Text>
              <Text className='profit-amount'>¥{(skin.price * 0.02).toFixed(2)}</Text>
            </View>
          </View>
          
          <Button className='arbitrage-button' onClick={handleViewArbitrage}>
            查看套利详情
          </Button>
        </View>
      </View>

      {/* Skin Stats */}
      {skin.stats && (
        <View className='section'>
          <Text className='section-title'>皮肤详情</Text>
          <View className='stats-card'>
            <View className='stat-row'>
              <Text className='stat-label'>磨损度</Text>
              <Text className='stat-value'>{skin.stats.float}</Text>
            </View>
            <View className='stat-row'>
              <Text className='stat-label'>图案索引</Text>
              <Text className='stat-value'>{skin.stats.patternIndex}</Text>
            </View>
            <Button 
              className='steam-button'
              onClick={() => handleExternalLink('Steam')}
            >
              在Steam中查看
            </Button>
          </View>
        </View>
      )}

      {/* Description */}
      {skin.description && (
        <View className='section'>
          <Text className='section-title'>描述</Text>
          <View className='description-card'>
            <Text className='description-text'>{skin.description}</Text>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View className='actions'>
        <Button className='action-button primary' onClick={handleToggleFavorite}>
          {isFavorited ? '取消关注' : '加入关注'}
        </Button>
        <Button className='action-button secondary'>
          分享饰品
        </Button>
      </View>
    </ScrollView>
  )
}
