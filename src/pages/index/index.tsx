import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { QuickActions } from '@/components'
import './index.scss'

export default function Index() {
  const [count, setCount] = useState(0)

  useLoad(() => {
    console.log('Page loaded.')
  })

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <View className='index-page'>
      <View className='header'>
        <Text className='title'>欢迎使用 Taro</Text>
        <Text className='subtitle'>跨平台小程序开发框架</Text>
      </View>

      <View className='content'>
        <View className='card'>
          <Text className='card-title'>计数器示例</Text>
          <View className='counter'>
            <Button 
              className='btn-minus' 
              onClick={() => setCount(count - 1)}
              disabled={count <= 0}
            >
              -
            </Button>
            <Text className='counter-value'>{count}</Text>
            <Button 
              className='btn-plus' 
              onClick={increment}
            >
              +
            </Button>
          </View>
        </View>

        <View className='card'>
          <Text className='card-title'>功能特性</Text>
          <View className='feature-list'>
            <View className='feature-item'>
              <Text className='feature-icon'>🚀</Text>
              <View className='feature-text'>
                <Text className='feature-title'>多端支持</Text>
                <Text className='feature-desc'>一套代码，多端运行</Text>
              </View>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>⚡</Text>
              <View className='feature-text'>
                <Text className='feature-title'>高性能</Text>
                <Text className='feature-desc'>高效的运行时框架</Text>
              </View>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>🎯</Text>
              <View className='feature-text'>
                <Text className='feature-title'>类型安全</Text>
                <Text className='feature-desc'>完整的 TypeScript 支持</Text>
              </View>
            </View>
          </View>
        </View>

        <View className='card'>
          <Text className='card-title'>快捷入口</Text>
          <QuickActions 
            showBadges={true}
            onItemClick={(item) => console.log('点击了:', item.title)}
          />
        </View>

        <View className='card'>
          <Text className='card-title'>开发指南</Text>
          <View className='guide-links'>
            <Button className='guide-link'>查看文档</Button>
            <Button className='guide-link'>组件库</Button>
            <Button className='guide-link'>API 参考</Button>
          </View>
        </View>
      </View>
    </View>
  )
}