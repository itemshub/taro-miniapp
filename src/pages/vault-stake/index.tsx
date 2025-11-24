import { useState } from 'react'
import { View, Text, ScrollView, Image, Button, Input } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import './index.scss'

interface CaseItem {
  id: string
  name: string
  description: string
  price: number
  change24h: number
  image: string
}

interface DurationOption {
  days: number
  rate: string
  description: string
}

export default function VaultStake() {
  const [selectedCase, setSelectedCase] = useState('')
  const [amount, setAmount] = useState(1)
  const [duration, setDuration] = useState(30)
  const [showConfirm, setShowConfirm] = useState(false)
  const [casesList, setCasesList] = useState<CaseItem[]>([])

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '质押箱子'
    })
    loadCases()
  })

  const loadCases = () => {
    const mockCases: CaseItem[] = [
      {
        id: '1',
        name: '武器箱',
        description: 'CS:GO 经典武器箱',
        price: 25.50,
        change24h: 1.2,
        image: '/assets/default-case.png'
      },
      {
        id: '2',
        name: '猎杀者武器箱',
        description: '包含稀有饰品',
        price: 68.80,
        change24h: -0.5,
        image: '/assets/default-case.png'
      },
      {
        id: '3',
        name: '裂空武器箱',
        description: '高价值武器箱',
        price: 135.00,
        change24h: 2.3,
        image: '/assets/default-case.png'
      }
    ]
    setCasesList(mockCases)
  }

  const durations: DurationOption[] = [
    { days: 7, rate: '15%', description: '短期质押' },
    { days: 30, rate: '20%', description: '标准质押' },
    { days: 90, rate: '25%', description: '长期质押' }
  ]

  const selectedCaseData = casesList.find(c => c.id === selectedCase)
  
  const getPotentialReward = () => {
    if (!selectedCaseData) return 0
    const baseRate = duration === 7 ? 0.15 : duration === 30 ? 0.20 : 0.25
    const monthlyRate = baseRate * (duration / 365)
    return selectedCaseData.price * amount * monthlyRate
  }

  const potentialReward = getPotentialReward()
  const totalValue = selectedCaseData ? selectedCaseData.price * amount : 0

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleConfirm = () => {
    if (!selectedCase || amount < 1) {
      Taro.showToast({
        title: '请选择箱子并输入数量',
        icon: 'none'
      })
      return
    }
    setShowConfirm(true)
  }

  const handleFinalConfirm = () => {
    Taro.showToast({
      title: '质押成功！开始获得收益',
      icon: 'success'
    })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const handleCancelConfirm = () => {
    setShowConfirm(false)
  }

  const getUnlockDate = () => {
    return new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toLocaleDateString()
  }

  const getAnnualRate = () => {
    return duration === 7 ? '15%' : duration === 30 ? '20%' : '25%'
  }

  if (showConfirm && selectedCaseData) {
    return (
      <View className='vault-stake-page'>
        <View className='confirm-overlay'>
          <View className='confirm-modal'>
            <View className='confirm-header'>
              <View className='confirm-icon'>
                <Text className='icon-text'>🔒</Text>
              </View>
              <Text className='confirm-title'>质押确认</Text>
              <Text className='confirm-subtitle'>请确认质押信息，提交后将开始计算收益</Text>
            </View>

            <View className='confirm-details'>
              <Text className='details-title'>质押信息</Text>
              <View className='detail-row'>
                <Text className='detail-label'>质押资产:</Text>
                <Text className='detail-value'>{selectedCaseData.name}</Text>
              </View>
              <View className='detail-row'>
                <Text className='detail-label'>质押数量:</Text>
                <Text className='detail-value'>{amount}</Text>
              </View>
              <View className='detail-row'>
                <Text className='detail-label'>质押价值:</Text>
                <Text className='detail-value'>¥{totalValue.toFixed(2)}</Text>
              </View>
              <View className='detail-row'>
                <Text className='detail-label'>质押周期:</Text>
                <Text className='detail-value'>{duration}天</Text>
              </View>
              <View className='detail-row'>
                <Text className='detail-label'>年化收益:</Text>
                <Text className='detail-value green'>{getAnnualRate()}</Text>
              </View>
              <View className='detail-row highlight'>
                <Text className='detail-label'>预期收益:</Text>
                <Text className='detail-value green'>¥{potentialReward.toFixed(2)}</Text>
              </View>
              <View className='detail-row'>
                <Text className='detail-label'>解锁日期:</Text>
                <Text className='detail-value'>{getUnlockDate()}</Text>
              </View>
            </View>

            <View className='confirm-actions'>
              <Button className='confirm-button cancel' onClick={handleCancelConfirm}>
                返回修改
              </Button>
              <Button className='confirm-button submit' onClick={handleFinalConfirm}>
                确认质押
              </Button>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView className='vault-stake-page' scrollY>
      {/* Info Banner */}
      <View className='info-banner'>
        <View className='banner-header'>
          <Text className='banner-icon'>ℹ️</Text>
          <Text className='banner-title'>质押说明</Text>
        </View>
        <View className='banner-content'>
          <Text className='banner-item'>• 质押期间资产将被锁定，不可交易</Text>
          <Text className='banner-item'>• 每日结算收益，可随时提现</Text>
          <Text className='banner-item'>• 支持多种质押周期，选择最适合的方案</Text>
          <Text className='banner-item'>• 质押资金安全由平台保障</Text>
        </View>
      </View>

      {/* Case Selection */}
      <View className='section'>
        <Text className='section-title'>选择箱子</Text>
        <View className='case-list'>
          {casesList.map((caseItem) => (
            <View
              key={caseItem.id}
              className={`case-item ${selectedCase === caseItem.id ? 'selected' : ''}`}
              onClick={() => setSelectedCase(caseItem.id)}
            >
              <Image 
                src={caseItem.image} 
                className='case-image'
                mode='aspectFit'
              />
              <View className='case-info'>
                <Text className='case-name'>{caseItem.name}</Text>
                <Text className='case-description'>{caseItem.description}</Text>
                <View className='case-price-row'>
                  <Text className='case-price'>¥{caseItem.price.toFixed(2)}</Text>
                  <Text className={`case-change ${caseItem.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {caseItem.change24h >= 0 ? '+' : ''}{caseItem.change24h.toFixed(1)}%
                  </Text>
                </View>
              </View>
              {selectedCase === caseItem.id && (
                <View className='check-icon'>
                  <Text className='check-text'>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Amount Input */}
      <View className='section'>
        <Text className='section-title'>质押数量</Text>
        <View className='amount-card'>
          <Text className='amount-label'>数量</Text>
          <View className='amount-control'>
            <Button 
              className='amount-button'
              onClick={() => setAmount(Math.max(1, amount - 1))}
            >
              -
            </Button>
            <Input
              type='number'
              value={amount.toString()}
              onInput={(e) => setAmount(Math.max(1, parseInt(e.detail.value) || 1))}
              className='amount-input'
            />
            <Button 
              className='amount-button'
              onClick={() => setAmount(amount + 1)}
            >
              +
            </Button>
          </View>
          {selectedCaseData && (
            <Text className='amount-total'>总价值: ¥{totalValue.toFixed(2)}</Text>
          )}
        </View>
      </View>

      {/* Duration Selection */}
      <View className='section'>
        <Text className='section-title'>质押周期</Text>
        <View className='duration-list'>
          {durations.map((durationOption) => (
            <View
              key={durationOption.days}
              className={`duration-item ${duration === durationOption.days ? 'selected' : ''}`}
              onClick={() => setDuration(durationOption.days)}
            >
              <View className='duration-info'>
                <View className='duration-header'>
                  <Text className='duration-days'>{durationOption.days}天</Text>
                  <Text className='duration-rate'>{durationOption.rate}</Text>
                </View>
                <Text className='duration-description'>{durationOption.description}</Text>
              </View>
              {duration === durationOption.days && (
                <View className='check-icon'>
                  <Text className='check-text'>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Reward Calculator */}
      {selectedCaseData && (
        <View className='section'>
          <Text className='section-title'>收益计算</Text>
          <View className='reward-card'>
            <View className='reward-summary'>
              <View className='reward-item'>
                <Text className='reward-label'>质押价值</Text>
                <Text className='reward-value'>¥{totalValue.toFixed(2)}</Text>
              </View>
              <View className='reward-item'>
                <Text className='reward-label'>质押周期</Text>
                <Text className='reward-value orange'>{duration}天</Text>
              </View>
            </View>
            
            <View className='reward-details'>
              <View className='reward-row'>
                <Text className='reward-detail-label'>预期年化收益:</Text>
                <Text className='reward-detail-value green'>{getAnnualRate()}</Text>
              </View>
              <View className='reward-row'>
                <Text className='reward-detail-label'>预期收益:</Text>
                <Text className='reward-detail-value green large'>¥{potentialReward.toFixed(2)}</Text>
              </View>
              <View className='reward-row'>
                <Text className='reward-detail-label'>收益率:</Text>
                <Text className='reward-detail-value green'>
                  {((potentialReward / totalValue) * 100).toFixed(2)}%
                </Text>
              </View>
              <View className='reward-row'>
                <Text className='reward-detail-label'>解锁日期:</Text>
                <Text className='reward-detail-value'>{getUnlockDate()}</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Risk Warning */}
      <View className='section'>
        <View className='warning-card'>
          <Text className='warning-title'>风险提示</Text>
          <View className='warning-content'>
            <Text className='warning-item'>• 质押期间资产将锁定，无法交易</Text>
            <Text className='warning-item'>• 市场波动可能影响质押资产价值</Text>
            <Text className='warning-item'>• 质押收益可能低于市场平均水平</Text>
            <Text className='warning-item'>• 请根据个人风险承受能力谨慎操作</Text>
          </View>
        </View>
      </View>

      {/* Confirm Button */}
      <View className='action-section'>
        <Button 
          className={`confirm-stake-button ${!selectedCase || amount < 1 ? 'disabled' : ''}`}
          onClick={handleConfirm}
          disabled={!selectedCase || amount < 1}
        >
          确认质押
        </Button>
      </View>
    </ScrollView>
  )
}
