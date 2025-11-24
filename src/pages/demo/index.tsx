import { useState, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Card, CustomButton, SearchBar, SearchType } from '@/components'
import { useUserStore, useAppStore, useCounterStore } from '@/store'
import { showToast, formatDate } from '@/utils'
import './index.scss'

export default function Demo() {
  const { userInfo, isLoggedIn, login, logout } = useUserStore()
  const { theme, setTheme } = useAppStore()
  const { count, increment, decrement, reset } = useCounterStore()
  const [currentTime, setCurrentTime] = useState('')

  useLoad(() => {
    console.log('演示页面已加载')
    setCurrentTime(formatDate(new Date()))
    
    // 模拟登录
    login({
      id: '1',
      name: '演示用户',
      avatar: 'https://example.com/avatar.jpg',
      token: 'demo-token'
    })
  })

  const handleLogin = () => {
    if (!isLoggedIn) {
      login({
        id: '1',
        name: '演示用户',
        avatar: 'https://example.com/avatar.jpg',
        token: 'demo-token'
      })
      showToast('登录成功', 'success')
    } else {
      logout()
      showToast('已退出登录', 'success')
    }
  }

  const handleIncrement = () => {
    increment()
    showToast(`当前值: ${count + 1}`, 'success')
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    showToast(`切换到${theme === 'light' ? '深色' : '浅色'}主题`, 'success')
  }

  // 搜索栏处理函数
  const handleSearch = (keyword: string, type: SearchType) => {
    console.log('搜索参数:', { keyword, type })
    const typeMap = {
      [SearchType.ALL]: '全部',
      [SearchType.ITEM]: '饰品',
      [SearchType.CASE]: '箱子',
      [SearchType.SERIES]: '系列'
    }
    
    showToast(`正在搜索: ${keyword} (${typeMap[type]})`, 'success')
  }

  return (
    <View className={`demo-page theme-${theme}`}>
      <View className='header'>
        <Text className='title'>Taro 项目演示</Text>
        <Text className='subtitle'>展示项目功能特性</Text>
      </View>

      <View className='content'>
        {/* 用户状态演示 */}
        <Card title='用户状态管理'>
          <View className='user-info'>
            {isLoggedIn ? (
              <View className='user-logged-in'>
                <Text className='user-name'>欢迎，{userInfo?.name}</Text>
                <Text className='user-status'>已登录</Text>
              </View>
            ) : (
              <View className='user-logged-out'>
                <Text className='user-status'>未登录</Text>
              </View>
            )}
            <View className='button-group'>
              <CustomButton 
                type={isLoggedIn ? 'danger' : 'primary'}
                size='small'
                onClick={handleLogin}
              >
                {isLoggedIn ? '退出登录' : '登录'}
              </CustomButton>
            </View>
          </View>
        </Card>

        {/* 计数器演示 */}
        <Card title='Zustand 状态管理'>
          <View className='counter-section'>
            <View className='counter-display'>
              <Text className='counter-value'>{count}</Text>
              <Text className='counter-label'>计数器</Text>
            </View>
            <View className='counter-controls'>
              <CustomButton 
                type='danger' 
                size='small'
                onClick={decrement}
                disabled={count <= 0}
              >
                -
              </CustomButton>
              <CustomButton 
                type='success' 
                size='small'
                onClick={reset}
              >
                重置
              </CustomButton>
              <CustomButton 
                type='primary' 
                size='small'
                onClick={handleIncrement}
              >
                +
              </CustomButton>
            </View>
          </View>
        </Card>

        {/* 工具函数演示 */}
        <Card title='工具函数展示'>
          <View className='utils-demo'>
            <View className='time-display'>
              <Text className='time-label'>当前时间：</Text>
              <Text className='time-value'>{currentTime}</Text>
            </View>
            <View className='theme-toggle'>
              <Text className='theme-label'>主题切换：</Text>
              <CustomButton 
                type='outline'
                size='small'
                onClick={handleThemeToggle}
              >
                {theme === 'light' ? '深色' : '浅色'}
              </CustomButton>
            </View>
          </View>
        </Card>

        {/* 组件演示 */}
        <Card title='组件库展示' subtitle='展示自定义组件功能'>
          <View className='component-demo'>
            <Text className='demo-text'>按钮样式展示：</Text>
            <View className='button-showcase'>
              <CustomButton type='primary'>主要按钮</CustomButton>
              <CustomButton type='success'>成功按钮</CustomButton>
              <CustomButton type='warning'>警告按钮</CustomButton>
              <CustomButton type='danger'>危险按钮</CustomButton>
              <CustomButton type='default'>默认按钮</CustomButton>
            </View>
          </View>
        </Card>

        {/* 搜索栏演示 */}
        <Card title='搜索栏组件' subtitle='支持饰品、箱子、系列搜索'>
          <View className='search-demo'>
            <Text className='demo-text'>基本搜索栏：</Text>
            <SearchBar
              placeholder='搜索 CS:GO 饰品、箱子、系列...'
              onSearch={handleSearch}
              showHotSuggestions={true}
              showRecentSearches={true}
              maxHistoryItems={6}
            />
            
            <View className='demo-tips'>
              <Text className='tips-title'>功能特性：</Text>
              <Text className='tip-item'>• 智能搜索类型识别</Text>
              <Text className='tip-item'>• 热门搜索推荐</Text>
              <Text className='tip-item'>• 搜索历史记录</Text>
              <Text className='tip-item'>• 键盘导航支持</Text>
              <Text className='tip-item'>• 深灰蓝 + 亮橙主题</Text>
            </View>
          </View>
        </Card>

        {/* 页面导航演示 */}
        <Card title='页面导航'>
          <View className='navigation-demo'>
            <CustomButton 
              type='primary'
              full
              onClick={() => {
                showToast('跳转到首页', 'success')
                // navigateTo('/pages/index/index')
              }}
            >
              前往首页
            </CustomButton>
            <CustomButton 
              type='success'
              full
              onClick={() => {
                showToast('跳转到关于页', 'success')
                // navigateTo('/pages/about/index')
              }}
            >
              前往关于页
            </CustomButton>
          </View>
        </Card>
      </View>
    </View>
  )
}