import { View, Text } from '@tarojs/components'
import './index.scss'

export default function About() {
  return (
    <View className='about-page'>
      <View className='header'>
        <Text className='title'>关于项目</Text>
      </View>

      <View className='content'>
        <View className='card'>
          <Text className='card-title'>项目信息</Text>
          <View className='info-list'>
            <View className='info-item'>
              <Text className='info-label'>项目名称：</Text>
              <Text className='info-value'>Taro 多端开发项目</Text>
            </View>
            <View className='info-item'>
              <Text className='info-label'>版本号：</Text>
              <Text className='info-value'>1.0.0</Text>
            </View>
            <View className='info-item'>
              <Text className='info-label'>开发框架：</Text>
              <Text className='info-value'>Taro 3.6.25</Text>
            </View>
            <View className='info-item'>
              <Text className='info-label'>UI 库：</Text>
              <Text className='info-value'>React 18.0.0</Text>
            </View>
          </View>
        </View>

        <View className='card'>
          <Text className='card-title'>技术栈</Text>
          <View className='tech-stack'>
            <View className='tech-item'>
              <Text className='tech-name'>Taro</Text>
              <Text className='tech-desc'>多端开发框架</Text>
            </View>
            <View className='tech-item'>
              <Text className='tech-name'>React</Text>
              <Text className='tech-desc'>用户界面库</Text>
            </View>
            <View className='tech-item'>
              <Text className='tech-name'>TypeScript</Text>
              <Text className='tech-desc'>JavaScript 的超集</Text>
            </View>
            <View className='tech-item'>
              <Text className='tech-name'>Zustand</Text>
              <Text className='tech-desc'>轻量级状态管理</Text>
            </View>
            <View className='tech-item'>
              <Text className='tech-name'>Sass</Text>
              <Text className='tech-desc'>CSS 预处理器</Text>
            </View>
          </View>
        </View>

        <View className='card'>
          <Text className='card-title'>支持平台</Text>
          <View className='platform-list'>
            <View className='platform-item'>
              <Text className='platform-icon'>📱</Text>
              <Text className='platform-name'>微信小程序</Text>
            </View>
            <View className='platform-item'>
              <Text className='platform-icon'>🌐</Text>
              <Text className='platform-name'>H5 网页</Text>
            </View>
            <View className='platform-item'>
              <Text className='platform-icon'>⚛️</Text>
              <Text className='platform-name'>React Native</Text>
            </View>
            <View className='platform-item'>
              <Text className='platform-icon'>💰</Text>
              <Text className='platform-name'>支付宝小程序</Text>
            </View>
            <View className='platform-item'>
              <Text className='platform-icon'>🎵</Text>
              <Text className='platform-name'>字节跳动小程序</Text>
            </View>
            <View className='platform-item'>
              <Text className='platform-icon'>📲</Text>
              <Text className='platform-name'>QQ 小程序</Text>
            </View>
          </View>
        </View>

        <View className='card'>
          <Text className='card-title'>项目特性</Text>
          <View className='features-list'>
            <View className='feature-item'>
              <Text className='feature-bullet'>•</Text>
              <Text className='feature-text'>一套代码，多端运行</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-bullet'>•</Text>
              <Text className='feature-text'>完整的 TypeScript 支持</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-bullet'>•</Text>
              <Text className='feature-text'>组件化开发模式</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-bullet'>•</Text>
              <Text className='feature-text'>现代化的开发体验</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-bullet'>•</Text>
              <Text className='feature-text'>高效的构建工具</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}