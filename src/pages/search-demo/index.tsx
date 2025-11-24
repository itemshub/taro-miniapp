import { Component, ReactNode } from 'react'
import { View, Text } from '@tarojs/components'
import { SearchBar, SearchType } from '@/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class SearchDemo extends Component {
  // 搜索回调函数
  private handleSearch = (keyword: string, type: SearchType) => {
    console.log('搜索参数:', { keyword, type })
    
    // 获取搜索类型中文名称
    const typeMap = {
      [SearchType.ALL]: '全部',
      [SearchType.ITEM]: '饰品',
      [SearchType.CASE]: '箱子',
      [SearchType.SERIES]: '系列'
    }
    
    // 显示搜索结果
    Taro.showModal({
      title: '搜索成功',
      content: `关键词: ${keyword}\n搜索类型: ${typeMap[type]}`,
      showCancel: false,
      confirmText: '知道了'
    })
  }

  render(): ReactNode {
    return (
      <View className='search-demo-container'>
        {/* 页面头部 */}
        <View className='demo-header'>
          <Text className='demo-title'>🔍 搜索栏组件演示</Text>
          <Text className='demo-description'>
            支持饰品名、箱子名、系列搜索，包含热门推荐和历史记录
          </Text>
        </View>

        {/* 基本搜索栏 */}
        <View className='demo-section'>
          <Text className='section-title'>基本搜索栏</Text>
          <Text className='section-subtitle'>完整的搜索功能，包含热门推荐和历史记录</Text>
          <SearchBar
            placeholder='搜索 CS:GO 饰品、箱子、系列...'
            onSearch={this.handleSearch}
            showHotSuggestions={true}
            showRecentSearches={true}
            maxHistoryItems={8}
          />
        </View>

        {/* 自定义热门搜索 */}
        <View className='demo-section'>
          <Text className='section-title'>自定义热门搜索</Text>
          <Text className='section-subtitle'>使用自定义热门搜索列表</Text>
          <SearchBar
            placeholder='自定义热门搜索示例...'
            onSearch={this.handleSearch}
            showHotSuggestions={true}
            showRecentSearches={true}
            customHotSearches={[
              'AK-47 | 基础版',
              'AWP | 龙狙皮肤',
              '蝴蝶刀 | 渐变',
              'CS2 箱子',
              '手套皮肤',
              '龙狙皮肤',
              'M4A4 | 死神',
              'AK-47 | 火神'
            ]}
          />
        </View>

        {/* 仅显示热门搜索 */}
        <View className='demo-section'>
          <Text className='section-title'>仅热门搜索</Text>
          <Text className='section-subtitle'>不显示历史记录，只显示热门推荐</Text>
          <SearchBar
            placeholder='仅显示热门搜索...'
            onSearch={this.handleSearch}
            showHotSuggestions={true}
            showRecentSearches={false}
          />
        </View>

        {/* 功能特性说明 */}
        <View className='demo-features'>
          <Text className='features-title'>✨ 功能特性</Text>
          <View className='features-grid'>
            <View className='feature-item'>
              <Text className='feature-icon'>🔫</Text>
              <Text className='feature-text'>支持饰品名搜索</Text>
              <Text className='feature-desc'>AK-47, AWP, 蝴蝶刀等</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>📦</Text>
              <Text className='feature-text'>支持箱子名搜索</Text>
              <Text className='feature-desc'>CS:GO箱子, CS2箱子等</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>⭐</Text>
              <Text className='feature-text'>支持系列搜索</Text>
              <Text className='feature-desc'>龙系列, 死神, 火神等</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>🔥</Text>
              <Text className='feature-text'>热门搜索推荐</Text>
              <Text className='feature-desc'>智能推荐热门内容</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>📜</Text>
              <Text className='feature-text'>搜索历史记录</Text>
              <Text className='feature-desc'>自动保存搜索历史</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>💡</Text>
              <Text className='feature-text'>实时搜索建议</Text>
              <Text className='feature-desc'>输入时显示相关建议</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>⌨️</Text>
              <Text className='feature-text'>键盘导航支持</Text>
              <Text className='feature-desc'>↑↓键导航，Enter搜索</Text>
            </View>
            <View className='feature-item'>
              <Text className='feature-icon'>🎨</Text>
              <Text className='feature-text'>深灰蓝+亮橙主题</Text>
              <Text className='feature-desc'>现代化UI设计</Text>
            </View>
          </View>
        </View>

        {/* 操作说明 */}
        <View className='demo-instructions'>
          <Text className='instructions-title'>📖 操作说明</Text>
          <View className='instructions-list'>
            <View className='instruction-group'>
              <Text className='group-title'>基本操作</Text>
              <Text className='instruction-item'>• 点击输入框开始搜索，显示热门推荐和历史记录</Text>
              <Text className='instruction-item'>• 输入关键词后显示实时搜索建议</Text>
              <Text className='instruction-item'>• 点击 ✕ 清空输入内容</Text>
            </View>
            
            <View className='instruction-group'>
              <Text className='group-title'>键盘操作</Text>
              <Text className='instruction-item'>• 使用 ↑↓ 键在搜索建议中导航</Text>
              <Text className='instruction-item'>• 按 Enter 键确认搜索当前选中项</Text>
              <Text className='instruction-item'>• 按 Esc 键取消搜索</Text>
            </View>
            
            <View className='instruction-group'>
              <Text className='group-title'>搜索类型</Text>
              <Text className='instruction-item'>• 自动识别饰品、箱子、系列类型</Text>
              <Text className='instruction-item'>• 支持混合关键词搜索</Text>
              <Text className='instruction-item'>• 智能分类显示搜索结果</Text>
            </View>
            
            <View className='instruction-group'>
              <Text className='group-title'>历史记录</Text>
              <Text className='instruction-item'>• 搜索历史自动保存（最多10条）</Text>
              <Text className='instruction-item'>• 点击历史记录可直接重新搜索</Text>
              <Text className='instruction-item'>• 支持一键清空所有历史记录</Text>
            </View>
          </View>
        </View>

        {/* 技术实现 */}
        <View className='demo-tech'>
          <Text className='tech-title'>🛠️ 技术实现</Text>
          <View className='tech-list'>
            <Text className='tech-item'>• 基于 Taro 3 + React 开发</Text>
            <Text className='tech-item'>• 支持微信小程序、H5、React Native</Text>
            <Text className='tech-item'>• TypeScript 类型安全</Text>
            <Text className='tech-item'>• SCSS 模块化样式</Text>
            <Text className='tech-item'>• 本地存储搜索历史</Text>
            <Text className='tech-item'>• 响应式设计适配</Text>
            <Text className='tech-item'>• 手势操作友好</Text>
            <Text className='tech-item'>• 无障碍访问支持</Text>
          </View>
        </View>
      </View>
    )
  }
}