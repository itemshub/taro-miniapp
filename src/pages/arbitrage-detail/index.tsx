import { useState } from 'react'
import { View, Text, ScrollView, Image, Button, Input } from '@tarojs/components'
import Taro, { useReady, useRouter } from '@tarojs/taro'
import './index.scss'

interface ArbitrageData {
  id: string
  skin: {
    name: string
    skin: string
    image: string
  }
  markets: {
    buy: {
      platform: string
      price: number
      fee: number
    }
    sell: {
      platform: string
      price: number
      fee: number
    }
  }
  profitPercentage: number
  potentialProfit: number
  riskLevel: string
  volume: number
  lastUpdated: string
}

export default function ArbitrageDetail() {
  const router = useRouter()
  const { id } = router.params
  const [arbitrage, setArbitrage] = useState<ArbitrageData | null>(null)
  const [customQuantity, setCustomQuantity] = useState(1)
  const [showCalculator, setShowCalculator] = useState(false)

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '套利详情'
    })
    loadArbitrageData()
  })

  const loadArbitrageData = () => {
    const mockData: ArbitrageData = {
      id: id || '1',
      skin: {
        name: 'AK-47',
        skin: '火蛇',
        image: '/assets/default-skin.png'
      },
      markets: {
        buy: {
          platform: 'C5游戏',
          price: 2793.49,
          fee: 0.02
        },
        sell: {
          platform: 'Buff163',
          price: 2850.50,
          fee: 0.025
        }
      },
      profitPercentage: 2.04,
      potentialProfit: 57.01,
      riskLevel: 'Low',
      volume: 156,
      lastUpdated: '2分钟前'
    }
    
    setArbitrage(mockData)
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleShowCalculator = () => {
    setShowCalculator(true)
  }

  const handleHideCalculator = () => {
    setShowCalculator(false)
  }

  const handleJumpToPlatform = (platform: string) => {
    Taro.showModal({
      title: '提示',
      content: `即将跳转到${platform}`,
      confirmText: '确定',
      cancelText: '取消'
    })
  }

  if (!arbitrage) {
    return (
      <View className='arbitrage-detail-page'>
        <View className='error-container'>
          <Text className='error-text'>套利机会不存在</Text>
          <Button className='error-button' onClick={handleBack}>返回套利</Button>
        </View>
      </View>
    )
  }

  const buyTotal = arbitrage.markets.buy.price * customQuantity
  const sellTotal = arbitrage.markets.sell.price * customQuantity
  const buyFee = buyTotal * arbitrage.markets.buy.fee
  const sellFee = sellTotal * arbitrage.markets.sell.fee
  const totalCost = buyTotal + buyFee
  const totalRevenue = sellTotal - sellFee
  const netProfit = totalRevenue - totalCost
  const netProfitPercentage = (netProfit / totalCost) * 100

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'low'
      case 'Medium':
        return 'medium'
      case 'High':
        return 'high'
      default:
        return 'low'
    }
  }

  return (
    <View className='arbitrage-detail-page'>
      <ScrollView className='content' scrollY>
        {/* Skin Info */}
        <View className='skin-info-card'>
          <Image 
            src={arbitrage.skin.image} 
            className='skin-image'
            mode='aspectFit'
          />
          <View className='skin-details'>
            <Text className='skin-name'>{arbitrage.skin.name}</Text>
            <Text className='skin-type'>{arbitrage.skin.skin}</Text>
            <View className='skin-meta'>
              <View className={`risk-badge ${getRiskLevelColor(arbitrage.riskLevel)}`}>
                <Text className='risk-text'>{arbitrage.riskLevel} 风险</Text>
              </View>
              <Text className='volume-text'>交易量: {arbitrage.volume}</Text>
            </View>
          </View>
        </View>

        {/* Price Comparison */}
        <View className='section'>
          <Text className='section-title'>价格对比</Text>
          <View className='price-comparison-card'>
            <View className='market-side buy'>
              <Text className='side-label'>买入市场</Text>
              <View className='market-card'>
                <Text className='platform-name'>{arbitrage.markets.buy.platform}</Text>
                <Text className='platform-fee'>手续费 {arbitrage.markets.buy.fee * 100}%</Text>
                <Text className='platform-price'>¥{arbitrage.markets.buy.price.toFixed(2)}</Text>
              </View>
            </View>
            
            <View className='arrow-container'>
              <Text className='arrow-icon'>⇄</Text>
            </View>
            
            <View className='market-side sell'>
              <Text className='side-label'>卖出市场</Text>
              <View className='market-card'>
                <Text className='platform-name'>{arbitrage.markets.sell.platform}</Text>
                <Text className='platform-fee'>手续费 {arbitrage.markets.sell.fee * 100}%</Text>
                <Text className='platform-price'>¥{arbitrage.markets.sell.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          
          <View className='profit-summary'>
            <View className='profit-item'>
              <Text className='profit-label'>价格差</Text>
              <Text className='profit-value orange'>
                ¥{(arbitrage.markets.sell.price - arbitrage.markets.buy.price).toFixed(2)}
              </Text>
            </View>
            <View className='profit-item'>
              <Text className='profit-label'>套利率</Text>
              <Text className='profit-value green'>
                +{arbitrage.profitPercentage.toFixed(2)}%
              </Text>
            </View>
            <View className='profit-item'>
              <Text className='profit-label'>预估收益</Text>
              <Text className='profit-value blue'>
                ¥{arbitrage.potentialProfit.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Market Links */}
        <View className='section'>
          <Text className='section-title'>快速跳转</Text>
          <View className='link-buttons'>
            <Button 
              className='link-button buy'
              onClick={() => handleJumpToPlatform(arbitrage.markets.buy.platform)}
            >
              {arbitrage.markets.buy.platform}
            </Button>
            <Button 
              className='link-button sell'
              onClick={() => handleJumpToPlatform(arbitrage.markets.sell.platform)}
            >
              {arbitrage.markets.sell.platform}
            </Button>
          </View>
        </View>

        {/* Risk Assessment */}
        <View className='section'>
          <Text className='section-title'>风险评估</Text>
          <View className={`risk-card ${getRiskLevelColor(arbitrage.riskLevel)}`}>
            <Text className='risk-title'>{arbitrage.riskLevel} 风险</Text>
            
            <View className='risk-details'>
              {arbitrage.riskLevel === 'Low' && (
                <>
                  <Text className='risk-item'>• 价格波动相对稳定</Text>
                  <Text className='risk-item'>• 流动性充足</Text>
                  <Text className='risk-item'>• 市场深度良好</Text>
                  <Text className='risk-item'>• 建议操作时间: 小于 30分钟</Text>
                </>
              )}
              {arbitrage.riskLevel === 'Medium' && (
                <>
                  <Text className='risk-item'>• 价格存在一定波动</Text>
                  <Text className='risk-item'>• 流动性中等</Text>
                  <Text className='risk-item'>• 建议控制交易量</Text>
                  <Text className='risk-item'>• 建议操作时间: 小于 15分钟</Text>
                </>
              )}
              {arbitrage.riskLevel === 'High' && (
                <>
                  <Text className='risk-item'>• 价格波动较大</Text>
                  <Text className='risk-item'>• 流动性有限</Text>
                  <Text className='risk-item'>• 建议小额操作</Text>
                  <Text className='risk-item'>• 建议操作时间: 小于 5分钟</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Last Updated */}
        <View className='last-updated'>
          <Text className='update-text'>最后更新: {arbitrage.lastUpdated}</Text>
        </View>
      </ScrollView>

      {/* Calculator Button */}
      <View className='calculator-fab'>
        <Button className='fab-button' onClick={handleShowCalculator}>
          计算器
        </Button>
      </View>

      {/* Calculator Modal */}
      {showCalculator && (
        <View className='modal-overlay' onClick={handleHideCalculator}>
          <View className='modal-content' onClick={(e) => e.stopPropagation()}>
            <View className='modal-header'>
              <Text className='modal-title'>收益计算器</Text>
              <Button className='modal-close' onClick={handleHideCalculator}>×</Button>
            </View>
            
            <View className='modal-body'>
              <View className='quantity-input'>
                <Text className='input-label'>交易数量</Text>
                <View className='input-row'>
                  <Button 
                    className='qty-button'
                    onClick={() => setCustomQuantity(Math.max(1, customQuantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type='number'
                    value={customQuantity.toString()}
                    onInput={(e) => setCustomQuantity(Math.max(1, parseInt(e.detail.value) || 1))}
                    className='qty-input'
                  />
                  <Button 
                    className='qty-button'
                    onClick={() => setCustomQuantity(customQuantity + 1)}
                  >
                    +
                  </Button>
                </View>
              </View>
              
              <View className='calc-section'>
                <Text className='calc-title'>成本计算</Text>
                <View className='calc-row'>
                  <Text className='calc-label'>买入成本：</Text>
                  <Text className='calc-value'>¥{buyTotal.toFixed(2)}</Text>
                </View>
                <View className='calc-row'>
                  <Text className='calc-label'>买入手续费 ({arbitrage.markets.buy.fee * 100}%)：</Text>
                  <Text className='calc-value'>¥{buyFee.toFixed(2)}</Text>
                </View>
                <View className='calc-row total'>
                  <Text className='calc-label'>总成本：</Text>
                  <Text className='calc-value'>¥{totalCost.toFixed(2)}</Text>
                </View>
              </View>
              
              <View className='calc-section'>
                <Text className='calc-title'>收入计算</Text>
                <View className='calc-row'>
                  <Text className='calc-label'>卖出收入：</Text>
                  <Text className='calc-value'>¥{sellTotal.toFixed(2)}</Text>
                </View>
                <View className='calc-row'>
                  <Text className='calc-label'>卖出手续费 ({arbitrage.markets.sell.fee * 100}%)：</Text>
                  <Text className='calc-value'>¥{sellFee.toFixed(2)}</Text>
                </View>
                <View className='calc-row total'>
                  <Text className='calc-label'>净收入：</Text>
                  <Text className='calc-value'>¥{totalRevenue.toFixed(2)}</Text>
                </View>
              </View>
              
              <View className='calc-section profit'>
                <Text className='calc-title profit-title'>净收益</Text>
                <View className='calc-row'>
                  <Text className='calc-label'>净收益金额：</Text>
                  <Text className='calc-value profit-value'>¥{netProfit.toFixed(2)}</Text>
                </View>
                <View className='calc-row'>
                  <Text className='calc-label'>净收益率：</Text>
                  <Text className='calc-value profit-value'>{netProfitPercentage.toFixed(2)}%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
