import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Button, Input } from '@tarojs/components'
import Taro, { useReady, useRouter } from '@tarojs/taro'
import './index.scss'
import { api_case, api_index } from '@/utils/request'
import { base32Decode, getMarketsByName, getSkinsById, getTimeDiffText } from '@/utils/utils'

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
  // const [arbitrage, setArbitrage] = useState<ArbitrageData | null>(null)
  const [customQuantity, setCustomQuantity] = useState(1)
  const [showCalculator, setShowCalculator] = useState(false)

  const [indexData, setIndexData] = useState<any>({});
  const [cases, setCases] = useState<any>({});
  const [targetSkin, setTargetSkin] = useState<any>({});
  const [arbi, setArbi] = useState<any>({});
  const handleMarketClick = (id: number) => {
    Taro.navigateTo({ url: `/pages/market-detail/index?id=${id}` });
  };

  useEffect(() => {
  const load = async () => {
    try {
      const data= await api_index()
      setIndexData(data?.data);
      // console.log(data?.data)
      const cs = await api_case();
      setCases(cs?.data);
      try{
        const raw = base32Decode(String(id)).split("#")
        if(raw.length<2)
        {
          return false;
        }
        const [skinId,fromId,toId] = raw;
        console.log(skinId,fromId,toId)

        //Search target case 
        for(let i of cs?.data)
        {
          if(i?.id == skinId?.toLocaleLowerCase())
          {
            const skinData = getSkinsById(data?.data.skins,(skinId as any));
            i['data'] = skinData
            let from ;
            let to ;
            for(let u of skinData.data)
            {
              if(u.name == fromId)
              {
                from = u
                from['info'] = getMarketsByName(data?.data.markets,u.name)
              }
              if(u.name == toId)
              {
                to = u
                to['info'] = getMarketsByName(data?.data.markets,u.name)
              }
            }
            if(!from || !to)
            {
              return false;
            }


            let arb = {
              to,
              from,
              sub: to.price - from.price,
              averageSub:skinData.averageSub
            }
            setArbi(arb)
            setTargetSkin(i);
            console.log(arb,i)
          }
        }

      }catch(e)
      {
        console.error(e);
      }

    } catch (err) {
      console.error("请求失败:", err);
    }
  };
  load();
}, []);

  useReady(() => {
    Taro.setNavigationBarTitle({
      title: '套利详情'
    })
    // loadArbitrageData()
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
    
    // setArbitrage(mockData)
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

  // if (!arbitrage) {
  //   return (
  //     <View className='arbitrage-detail-page'>
  //       <View className='error-container'>
  //         <Text className='error-text'>套利机会不存在</Text>
  //         <Button className='error-button' onClick={handleBack}>返回套利</Button>
  //       </View>
  //     </View>
  //   )
  // }

  if (!arbi?.from) {
    return (
      <View className='arbitrage-detail-page'>
        <View className='error-container'>
          <Text className='error-text'>套利机会不存在</Text>
          <Button className='error-button' onClick={handleBack}>返回套利</Button>
        </View>
      </View>
    )
  }
  const buyTotal = arbi.from.price * customQuantity
  const sellTotal = arbi.to.price * customQuantity
  const buyFeeRate = Number(arbi.from.info.seller_fee.split("%")[0])/100
  const buyFee = buyTotal * buyFeeRate
  const sellFeeRate = Number(arbi.to.info.seller_fee.split("%")[0])/100
  const sellFee = sellTotal * sellFeeRate
  const totalCost = buyTotal + buyFee
  const totalRevenue = sellTotal - sellFee
  const netProfit = totalRevenue - totalCost
  const netProfitPercentage = (netProfit / totalCost) * 100

  const getRiskLevelColor = () => {
    if(arbi.from.active_offers >10000 && arbi.to.active_offers > 10000)
    {
      return 'low'
    }
    if(arbi.from.active_offers <1000 && arbi.to.active_offers < 1000)
    {
      return 'high'
    }

    return 'medium'
    // switch (risk) {
    //   case 'Low':
    //     return 'low'
    //   case 'Medium':
    //     return 'medium'
    //   case 'High':
    //     return 'high'
    //   default:
    //     return 'low'
    // }
  }

  return (
    <View className='arbitrage-detail-page'>
      <ScrollView className='content' scrollY>
        {/* Skin Info */}
        <View className='skin-info-card'>
          <Image 
            src={targetSkin.img_url} 
            className='skin-image'
            mode='aspectFit'
          />
          <View className='skin-details'>
            <Text className='skin-name'>{targetSkin.name}</Text>
            <Text className='skin-type'>{targetSkin.skin}</Text>
            <View className='skin-meta'>
              <View className={`risk-badge low`}>
                <Text className='risk-text'>{(targetSkin.data.price).toFixed(3)}$</Text>
              </View>
              <Text className='volume-text'>交易量: {(targetSkin.data.offers).toFixed(0)}</Text>
            </View>
          </View>
        </View>

        {/* Price Comparison */}
        <View className='section'>
          <Text className='section-title'>价格对比</Text>
          <View className='price-comparison-card'>
            <View className='market-side buy' onClick={
            ()=>
            {
              handleMarketClick(arbi.from.name)
            }
          }>
              <Text className='side-label'>买入市场</Text>
              <View className='market-card'>
                <Text className='platform-name'>{arbi.from.name}</Text>
                <Text className='platform-fee'>手续费 {arbi.from.info.seller_fee}</Text>
                <Text className='platform-price'>${arbi.from.price.toFixed(2)}</Text>
              </View>
            </View>
            
            <View className='arrow-container'>
              <Text className='arrow-icon'>⇄</Text>
            </View>
            
            <View className='market-side sell' onClick={
            ()=>
            {
              handleMarketClick(arbi.to.name)
            }
          }>
              <Text className='side-label'>卖出市场</Text>
              <View className='market-card'>
                <Text className='platform-name'>{arbi.to.name}</Text>
                <Text className='platform-fee'>手续费 {arbi.to.info.seller_fee}</Text>
                <Text className='platform-price'>${arbi.to.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          
          <View className='profit-summary'>
            <View className='profit-item'>
              <Text className='profit-label'>价格差</Text>
              <Text className='profit-value orange'>
                ${(arbi.to.price - arbi.from.price).toFixed(2)}
              </Text>
            </View>
            <View className='profit-item'>
              <Text className='profit-label'>套利率</Text>
              <Text className='profit-value green'>
                +{((arbi.to.price - arbi.from.price)*100/arbi.from.price).toFixed(2)}%
              </Text>
            </View>
            <View className='profit-item'>
              <Text className='profit-label'>预估收益</Text>
              <Text className='profit-value blue'>
                ${(arbi.to.price - arbi.from.price).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Market Links */}
        {/* <View className='section'>
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
        </View> */}

        {/* Risk Assessment */}
        <View className='section'>
          <Text className='section-title'>风险评估</Text>
          <View className={`risk-card ${getRiskLevelColor()}`}>
            <Text className='risk-title'>{getRiskLevelColor().toUpperCase()} Risk</Text>
            
            <View className='risk-details'>
              {getRiskLevelColor() === 'low' && (
                <>
                  <Text className='risk-item'>• 流动性充足</Text>
                  <Text className='risk-item'>• 买房挂单量 : {(arbi.from.active_offers).toFixed(0)}</Text>
                  <Text className='risk-item'>• 卖方挂单量 : {(arbi.to.active_offers).toFixed(0)}</Text>
                </>
              )}
              {getRiskLevelColor() === 'medium' && (
                <>
                  <Text className='risk-item'>• 流动性轻微不足</Text>
                  <Text className='risk-item'>• 买房挂单量 : {(arbi.from.active_offers).toFixed(0)}</Text>
                  <Text className='risk-item'>• 卖方挂单量 : {(arbi.to.active_offers).toFixed(0)}</Text>
                </>
              )}
              {getRiskLevelColor() === 'high' && (
                <>
                  <Text className='risk-item'>• 流动性严重不足</Text>
                  <Text className='risk-item'>• 买房挂单量 : {(arbi.from.active_offers).toFixed(0)}</Text>
                  <Text className='risk-item'>• 卖方挂单量 : {(arbi.to.active_offers).toFixed(0)}</Text>
                </>
              )}
            </View>
          </View>
        </View>


        <View className='last-updated'>
           <Button className='error-button' onClick={handleShowCalculator}>收益计算器</Button>
        </View>

        {/* Last Updated */}
        <View className='last-updated'>
          <Text className='update-text'>最后更新: {getTimeDiffText(targetSkin.data.timestamp)}</Text>
        </View>

       
      </ScrollView>

      {/* Calculator Button */}
      {/* <View className='calculator-fab'>
        <Button className='fab-button' onClick={handleShowCalculator}>
          计算器
        </Button>
      </View> */}

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
                  <Text className='calc-value'>${buyTotal.toFixed(2)}</Text>
                </View>
                <View className='calc-row'>
                  <Text className='calc-label'>买入手续费 ({buyFeeRate*100}%)：</Text>
                  <Text className='calc-value'>${buyFee.toFixed(2)}</Text>
                </View>
                <View className='calc-row total'>
                  <Text className='calc-label'>总成本：</Text>
                  <Text className='calc-value'>${totalCost.toFixed(2)}</Text>
                </View>
              </View>
              
              <View className='calc-section'>
                <Text className='calc-title'>收入计算</Text>
                <View className='calc-row'>
                  <Text className='calc-label'>卖出收入：</Text>
                  <Text className='calc-value'>${sellTotal.toFixed(2)}</Text>
                </View>
                <View className='calc-row'>
                  <Text className='calc-label'>卖出手续费 ({sellFeeRate * 100}%)：</Text>
                  <Text className='calc-value'>${sellFee.toFixed(2)}</Text>
                </View>
                <View className='calc-row total'>
                  <Text className='calc-label'>净收入：</Text>
                  <Text className='calc-value'>${totalRevenue.toFixed(2)}</Text>
                </View>
              </View>
              
              <View className='calc-section profit'>
                <Text className='calc-title profit-title'>净收益</Text>
                <View className='calc-row'>
                  <Text className='calc-label'>净收益金额：</Text>
                  <Text className='calc-value profit-value'>${netProfit.toFixed(2)}</Text>
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
