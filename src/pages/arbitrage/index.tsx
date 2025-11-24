import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { mockArbitrage } from '../../data/mockData'
import { ArbitrageOpportunity } from '../../types'
import './index.scss'

export default function Arbitrage() {
  const [selectedPlatform, setSelectedPlatform] = useState('全部')
  const [selectedProfitRange, setSelectedProfitRange] = useState('全部')
  const [showCalculator, setShowCalculator] = useState(false)

  const platformOptions = [
    '全部',
    'Buff↔Steam',
    'C5↔Skinport',
    'Buff↔C5',
    'Steam↔Skinport'
  ]

  const profitRanges = [
    '全部',
    '1%+',
    '2%+',
    '5%+',
    '10%+'
  ]

  const filteredArbitrage = mockArbitrage.filter((arb) => {
    const platformMatch = selectedPlatform === '全部' || 
      `${arb.markets.buy.platform}↔${arb.markets.sell.platform}`.includes(selectedPlatform)
    
    const profitMatch = selectedProfitRange === '全部' || 
      arb.profitPercentage >= parseFloat(selectedProfitRange)
    
    return platformMatch && profitMatch
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'risk-low'
      case 'Medium': return 'risk-medium'
      case 'High': return 'risk-high'
      default: return 'risk-default'
    }
  }

  const handleNavigate = (id: number) => {
    Taro.navigateTo({
      url: `/pages/arbitrage-detail/index?id=${id}`
    })
  }

  const CalculatorModal = () => {
    const [buyPrice, setBuyPrice] = useState('')
    const [sellPrice, setSellPrice] = useState('')
    const [buyFee, setBuyFee] = useState('2.5')
    const [sellFee, setSellFee] = useState('2.5')
    const [quantity, setQuantity] = useState('1')

    const calculateProfit = () => {
      const buy = parseFloat(buyPrice) || 0
      const sell = parseFloat(sellPrice) || 0
      const bFee = parseFloat(buyFee) || 0
      const sFee = parseFloat(sellFee) || 0
      const qty = parseInt(quantity) || 1
      
      const buyTotal = buy * qty * (1 + bFee / 100)
      const sellTotal = sell * qty * (1 - sFee / 100)
      const profit = sellTotal - buyTotal
      const profitPercentage = ((profit / buyTotal) * 100)
      
      return { profit, profitPercentage, buyTotal, sellTotal }
    }

    const result = buyPrice && sellPrice ? calculateProfit() : null

    return (
      <View className="calculator-modal" >
        <View className="calculator-overlay" onClick={() => setShowCalculator(false)} />
        <View className="calculator-content">
          <View className="calculator-header">
            <Text className="calculator-title">套利计算器</Text>
            <View 
              className="calculator-close"
              onClick={() => setShowCalculator(false)}
            >
              <Text>×</Text>
            </View>
          </View>
          
          <View className="calculator-form">
            <View className="form-item">
              <Text className="form-label">买入价格 (¥)</Text>
              <Input
                type="number"
                value={buyPrice}
                onInput={(e) => setBuyPrice(e.detail.value)}
                className="form-input"
                placeholder="输入买入价格"
              />
            </View>
            
            <View className="form-item">
              <Text className="form-label">卖出价格 (¥)</Text>
              <Input
                type="number"
                value={sellPrice}
                onInput={(e) => setSellPrice(e.detail.value)}
                className="form-input"
                placeholder="输入卖出价格"
              />
            </View>
            
            <View className="form-row">
              <View className="form-item form-item-half">
                <Text className="form-label">买入手续费 (%)</Text>
                <Input
                  type="digit"
                  value={buyFee}
                  onInput={(e) => setBuyFee(e.detail.value)}
                  className="form-input"
                />
              </View>
              <View className="form-item form-item-half">
                <Text className="form-label">卖出手续费 (%)</Text>
                <Input
                  type="digit"
                  value={sellFee}
                  onInput={(e) => setSellFee(e.detail.value)}
                  className="form-input"
                />
              </View>
            </View>
            
            <View className="form-item">
              <Text className="form-label">数量</Text>
              <Input
                type="number"
                value={quantity}
                onInput={(e) => setQuantity(e.detail.value)}
                className="form-input"
              />
            </View>
            
            {result && (
              <View className="result-panel">
                <View className="result-item">
                  <Text className="result-label">总成本：</Text>
                  <Text className="result-value">¥{result.buyTotal.toFixed(2)}</Text>
                </View>
                <View className="result-item">
                  <Text className="result-label">预期收入：</Text>
                  <Text className="result-value">¥{result.sellTotal.toFixed(2)}</Text>
                </View>
                <View className="result-item result-item-border">
                  <Text className="result-label">净收益：</Text>
                  <Text className={`result-value-bold ${result.profit >= 0 ? 'text-green' : 'text-red'}`}>
                    ¥{result.profit.toFixed(2)}
                  </Text>
                </View>
                <View className="result-item">
                  <Text className="result-label">收益率：</Text>
                  <Text className={`result-value-bold ${result.profitPercentage >= 0 ? 'text-green' : 'text-red'}`}>
                    {result.profitPercentage.toFixed(2)}%
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  const averageProfit = filteredArbitrage.length > 0
    ? (filteredArbitrage.reduce((sum, arb) => sum + arb.profitPercentage, 0) / filteredArbitrage.length).toFixed(1)
    : '0.0'

  const totalVolume = filteredArbitrage.reduce((sum, arb) => sum + arb.volume, 0)

  return (
    <View className="arbitrage-page">
      {/* Header */}
      <View className="header">
        <View className="header-content">
          <View className="header-title-row">
            <View className="header-title-wrapper">
              <Text className="header-icon">⇄</Text>
              <Text className="header-title">套利机会</Text>
            </View>
            <View 
              className="calculator-btn"
              onClick={() => setShowCalculator(true)}
            >
              <Text className="calculator-btn-icon">🧮</Text>
            </View>
          </View>

          {/* Filters */}
          <View className="filters">
            <View className="filter-section">
              <Text className="filter-label">平台组合</Text>
              <ScrollView scrollX className="filter-scroll">
                <View className="filter-options">
                  {platformOptions.map((option) => (
                    <View
                      key={option}
                      onClick={() => setSelectedPlatform(option)}
                      className={`filter-option ${selectedPlatform === option ? 'filter-option-active' : ''}`}
                    >
                      <Text className="filter-option-text">{option}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            
            <View className="filter-section">
              <Text className="filter-label">收益率</Text>
              <View className="filter-options">
                {profitRanges.map((range) => (
                  <View
                    key={range}
                    onClick={() => setSelectedProfitRange(range)}
                    className={`filter-option ${selectedProfitRange === range ? 'filter-option-active' : ''}`}
                  >
                    <Text className="filter-option-text">{range}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View className="stats">
        <View className="stats-grid">
          <View className="stat-item">
            <Text className="stat-label">可用机会</Text>
            <Text className="stat-value">{filteredArbitrage.length}</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-label">平均收益</Text>
            <Text className="stat-value stat-value-green">{averageProfit}%</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-label">预估总量</Text>
            <Text className="stat-value stat-value-orange">{totalVolume}</Text>
          </View>
        </View>
      </View>

      {/* Arbitrage Opportunities */}
      <ScrollView className="content" scrollY>
        {filteredArbitrage.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-icon">⚠️</Text>
            <Text className="empty-text">暂无可用套利机会</Text>
          </View>
        ) : (
          <View className="arbitrage-list" style={{maxWidth:"90%"}}>
            {filteredArbitrage.map((arbitrage) => (
              <View 
                key={arbitrage.id}
                onClick={() => handleNavigate(arbitrage.id)}
                className="arbitrage-card"
              >
                {/* Skin Info */}
                <View className="skin-info">
                  <Image 
                    src={arbitrage.skin.image} 
                    className="skin-image"
                    mode="aspectFill"
                  />
                  <View className="skin-details">
                    <Text className="skin-name">{arbitrage.skin.name}</Text>
                    <Text className="skin-type">{arbitrage.skin.skin}</Text>
                    <View className="skin-badges">
                      <View className={`risk-badge ${getRiskColor(arbitrage.riskLevel)}`}>
                        <Text className="risk-text">{arbitrage.riskLevel} 风险</Text>
                      </View>
                      <Text className="volume-text">交易量: {arbitrage.volume}</Text>
                    </View>
                  </View>
                </View>

                {/* Price Comparison */}
                <View className="price-comparison">
                  <View className="price-row">
                    <View className="price-col">
                      <Text className="market-label">买入市场</Text>
                      <Text className="market-name">{arbitrage.markets.buy.platform}</Text>
                      <Text className="price-buy">
                        ¥{arbitrage.markets.buy.price.toFixed(2)}
                      </Text>
                    </View>
                    <View className="arrow-wrapper">
                      <Text className="arrow-icon">⇄</Text>
                    </View>
                    <View className="price-col">
                      <Text className="market-label">卖出市场</Text>
                      <Text className="market-name">{arbitrage.markets.sell.platform}</Text>
                      <Text className="price-sell">
                        ¥{arbitrage.markets.sell.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="profit-row">
                    <View className="profit-info">
                      <Text className="profit-label">套利空间</Text>
                      <View className="profit-values">
                        <Text className="profit-percentage">
                          +{arbitrage.profitPercentage.toFixed(2)}%
                        </Text>
                        <Text className="profit-amount">
                          ¥{arbitrage.potentialProfit.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Quick Actions */}
                <View className="actions">
                  <View className="action-btn action-btn-primary">
                    <Text className="action-btn-text">查看详情</Text>
                  </View>
                  <View className="action-btn action-btn-secondary">
                    <Text className="action-btn-text">模拟计算</Text>
                  </View>
                </View>

                {/* Last Updated */}
                <Text className="update-time">
                  最后更新: {arbitrage.lastUpdated}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Calculator Modal */}
      {showCalculator && <CalculatorModal />}
    </View>
  )
}
