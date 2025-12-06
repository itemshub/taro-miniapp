import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { mockArbitrage } from '../../data/mockData'
import { ArbitrageOpportunity } from '../../types'
import './index.scss'
import { api_case, api_index } from '@/utils/request'
import { base32Encode, getSkinsNameById } from '@/utils/utils'

export default function Arbitrage() {
  const [selectedPlatform, setSelectedPlatform] = useState('全部')
  const [selectedProfitRange, setSelectedProfitRange] = useState('全部')
  const [showCalculator, setShowCalculator] = useState(false)

  const [indexData, setIndexData] = useState<any>({});
  const [cases, setCases] = useState<any>({});
  const [arbi, setArbi] = useState<any>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const data= await api_index()
        setIndexData(data?.data);
        console.log(data?.data)
        const cs = await api_case();
        setCases(cs?.data);
        setArbi(data.data.topSkinSub);
      } catch (err) {
        console.error("请求失败:", err);
      }
    };

    load();
  }, []);

  const platformOptions = [
    '全部',
    'Buff↔Steam',
    'C5↔Skinport',
    'Buff↔C5',
    'Steam↔Skinport'
  ]

  const profitRanges = [
    '全部',
    '10%+',
    '20%+',
    '50%+',
    '100%+'
  ]

  const getRiskLevelColor = (arbi:any) => {
    if(arbi.from.active_offers >10000 && arbi.to.active_offers > 10000)
    {
      return 'low'
    }
    if(arbi.from.active_offers <1000 && arbi.to.active_offers < 1000)
    {
      return 'high'
    }

    return 'medium'
  }

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

  const handleNavigate = (id: any) => {
    Taro.navigateTo({
      url: `/pages/arbitrage-detail/index?id=${id}`
    })
  }

  const averageProfit = filteredArbitrage.length > 0
    ? (filteredArbitrage.reduce((sum, arb) => sum + arb.profitPercentage, 0) / filteredArbitrage.length).toFixed(1)
    : '0.0'

  const totalVolume = filteredArbitrage.reduce((sum, arb) => sum + arb.volume, 0)



  if (!indexData?.skins) {
    return (
      <View className='loading-wrapper'>
        <View className='loading-spinner'></View>
      </View>
    );
  }
  
  
  return (
    <View className="arbitrage-page">
      {/* Header */}
      <View className="header">
        <View className="header-content">
          <View className="header-title-row">
            <View className="header-title-wrapper">
              <Text className="header-icon">⇄</Text>
              <Text className="header-title">价差</Text>
            </View>
            <View 
              className="calculator-btn"
              onClick={() => setShowCalculator(true)}
            >
            </View>
          </View>

          {/* Filters */}
          <View className="filters">
            <View className="filter-section">
              <Text className="filter-label">有效价差</Text>
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
      <View className="stat">
        <View className="stat-grid">
          <View className="stat-item">
            <Text className="stat-label">可用机会</Text>
            <Text className="stat-value">{indexData.greatProfit}</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-label">平均价差</Text>
            <Text className="stat-value stat-value-green">±{(indexData.skinsAverageSub*100).toFixed(2)}%</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-label">总利差</Text>
            <Text className="stat-value stat-value-orange">±{(indexData.profitRate*100).toFixed(2)}%</Text>
          </View>
        </View>
      </View>

      {/* Arbitrage Opportunities */}
      <ScrollView className="content" scrollY>
        {arbi.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-icon">⚠️</Text>
            <Text className="empty-text">暂无有效价差</Text>
          </View>
        ) : (
          <View className="arbitrage-list" style={{maxWidth:"95%"}}>
            {(selectedProfitRange == "全部" ? arbi : arbi.filter((item:any) => 
            (item.to.price - item.from.price)*100 / item.from.price
            >= 
            Number(selectedProfitRange.split("%")[0])
          )
          ).map((arbitrage:any) => (
              <View 
                key={base32Encode(`${arbitrage.skin.skin}#${arbitrage.from.name}#${arbitrage.to.name}`)}
                onClick={() => handleNavigate(base32Encode(`${arbitrage.skin.skin}#${arbitrage.from.name}#${arbitrage.to.name}`))}
                className="arbitrage-card"
              >
                {/* Skin Info */}
                <View className="skin-info">
                  <Image 
                    src={getSkinsNameById(cases,arbitrage.skin.skin) ? getSkinsNameById(cases,arbitrage.skin.skin).img_url : ""}
                    className="skin-image"
                    mode="aspectFill"
                  />
                  <View className="skin-details">
                    <Text className="skin-name">{arbitrage.skin.name}</Text>
                    <Text className="skin-type">{arbitrage.skin.skin}</Text>
                    <View className="skin-badges">
                      <View className={`risk-badge ${getRiskLevelColor(arbitrage)}`}>
                        <Text className="risk-text">{getRiskLevelColor(arbitrage)} 风险</Text>
                      </View>
                      <Text className="volume-text">交易量: {(arbitrage.skin.offers).toFixed(0)}</Text>
                    </View>
                  </View>
                </View>

                {/* Price Comparison */}
                <View className="price-comparison">
                  <View className="price-row">
                    <View className="price-col">
                      <Text className="market-label">买入市场</Text>
                      <Text className="market-name">{arbitrage.from.name}</Text>
                      <Text className="price-buy">
                        ${arbitrage.from.price.toFixed(2)}
                      </Text>
                    </View>
                    <View className="arrow-wrapper">
                      <Text className="arrow-icon">⇄</Text>
                    </View>
                    <View className="price-col">
                      <Text className="market-label">卖出市场</Text>
                      <Text className="market-name">{arbitrage.to.name}</Text>
                      <Text className="price-sell">
                        ${arbitrage.to.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="profit-row">
                    <View className="profit-info">
                      <Text className="profit-label">价差空间</Text>
                      <View className="profit-values">
                        <Text className="profit-percentage">
                          +{((arbitrage.to.price - arbitrage.from.price)*100 / arbitrage.from.price).toFixed(2)}%
                        </Text>
                        <Text className="profit-amount">
                          ${(arbitrage.to.price - arbitrage.from.price).toFixed(2)}
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
                </View>

                {/* Last Updated */}
                <Text className="update-time">
                  最后更新: {(new Date(arbitrage.skin.timestamp)).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
