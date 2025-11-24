import { Component, ReactNode } from 'react'
import { View, Input, Text, ScrollView } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { SearchType, SearchBarProps, SearchBarState, SearchSuggestion } from './types'
import './index.scss'

export default class SearchBar extends Component<SearchBarProps, SearchBarState> {
  private inputRef: any = null
  private searchHistory: string[] = []

  constructor(props: SearchBarProps) {
    super(props)
    this.state = {
      keyword: '',
      isFocused: false,
      showSuggestions: false,
      hotSearches: [],
      recentSearches: [],
      filteredSuggestions: [],
      selectedIndex: -1
    }
  }

  componentDidMount() {
    this.loadSearchHistory()
    this.initHotSearches()
  }

  // 加载搜索历史
  private loadSearchHistory = () => {
    try {
      const history = Taro.getStorageSync('search_history') || []
      this.searchHistory = history
      this.updateRecentSearches()
    } catch (error) {
      console.error('加载搜索历史失败:', error)
      this.searchHistory = []
    }
  }

  // 保存搜索历史
  private saveSearchHistory = (keyword: string) => {
    try {
      // 移除重复项
      this.searchHistory = this.searchHistory.filter(item => item !== keyword)
      // 添加到开头
      this.searchHistory.unshift(keyword)
      // 限制历史数量
      if (this.searchHistory.length > 10) {
        this.searchHistory = this.searchHistory.slice(0, 10)
      }
      // 保存到本地存储
      Taro.setStorageSync('search_history', this.searchHistory)
      this.updateRecentSearches()
    } catch (error) {
      console.error('保存搜索历史失败:', error)
    }
  }

  // 清空搜索历史
  private clearSearchHistory = () => {
    try {
      this.searchHistory = []
      Taro.removeStorageSync('search_history')
      this.updateRecentSearches()
      Taro.showToast({
        title: '搜索历史已清空',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error('清空搜索历史失败:', error)
    }
  }

  // 更新最近搜索
  private updateRecentSearches = () => {
    const recentSearches = this.searchHistory.slice(0, this.props.maxHistoryItems || 5)
      .map((item, index) => ({
        id: `recent-${index}`,
        text: item,
        type: SearchType.ALL,
        recent: true
      }))
    
    this.setState({ recentSearches })
  }

  // 初始化热门搜索
  private initHotSearches = () => {
    const defaultHotSearches = this.props.customHotSearches || [
      'AK-47 | 皮肤名称',
      'AWP | 龙狙',
      '蝴蝶刀',
      'M4A4 | 死神',
      'AK-47 | 火神',
      'CS:GO 箱子',
      'CS2 箱子',
      '手套皮肤',
      '刀皮肤',
      '龙狙皮肤'
    ]

    const hotSearches = defaultHotSearches.map((item, index) => ({
      id: `hot-${index}`,
      text: item,
      type: this.detectSearchType(item),
      hot: true
    }))

    this.setState({ hotSearches })
  }

  // 检测搜索类型
  private detectSearchType = (keyword: string): SearchType => {
    const itemKeywords = ['皮肤', '刀', '手套', '枪', 'AK', 'AWP', 'M4', 'USP', 'GLOCK', 'P250', 'Deagle']
    const caseKeywords = ['箱子', '盒子', '包']
    const seriesKeywords = ['龙系列', '死神', '火神', '咆哮', '猎户']

    if (caseKeywords.some(keyword => keyword.includes(keyword))) {
      return SearchType.CASE
    }
    if (seriesKeywords.some(keyword => keyword.includes(keyword))) {
      return SearchType.SERIES
    }
    if (itemKeywords.some(keyword => keyword.includes(keyword))) {
      return SearchType.ITEM
    }
    return SearchType.ALL
  }

  // 搜索建议过滤
  private filterSuggestions = (keyword: string) => {
    if (!keyword.trim()) {
      this.setState({ 
        filteredSuggestions: [],
        selectedIndex: -1
      })
      return
    }

    const { hotSearches, recentSearches } = this.state
    const allSuggestions = [...hotSearches, ...recentSearches]
    
    const filtered = allSuggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 10) // 限制显示数量

    this.setState({ 
      filteredSuggestions: filtered,
      selectedIndex: -1
    })
  }

  // 处理输入变化
  private handleInputChange = (e: any) => {
    const keyword = e.detail.value
    this.setState({ 
      keyword,
      showSuggestions: keyword.length > 0
    })
    this.filterSuggestions(keyword)
  }

  // 处理焦点事件
  private handleFocus = () => {
    this.setState({ 
      isFocused: true,
      showSuggestions: this.state.keyword.length > 0
    })
  }

  private handleBlur = () => {
    // 延迟隐藏建议，保留点击事件
    setTimeout(() => {
      this.setState({ 
        isFocused: false,
        showSuggestions: false,
        selectedIndex: -1
      })
    }, 200)
  }

  // 执行搜索
  private performSearch = (keyword?: string, type: SearchType = SearchType.ALL) => {
    const searchKeyword = keyword || this.state.keyword
    if (!searchKeyword.trim()) return

    // 保存到搜索历史
    this.saveSearchHistory(searchKeyword)
    
    // 隐藏建议
    this.setState({ 
      showSuggestions: false,
      selectedIndex: -1
    })

    // 失去焦点
    if (this.inputRef) {
      this.inputRef.blur()
    }

    // 触发搜索回调
    if (this.props.onSearch) {
      this.props.onSearch(searchKeyword, type)
    }

    // 触发搜索事件
    Taro.eventChannel.emit('search', {
      keyword: searchKeyword,
      type
    })
  }

  // 键盘确认搜索
  private handleConfirm = (e: any) => {
    const { selectedIndex, filteredSuggestions } = this.state
    
    if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
      this.performSearch(filteredSuggestions[selectedIndex].text)
    } else {
      this.performSearch()
    }
  }

  // 处理键盘事件
  private handleKeyDown = (e: any) => {
    const { selectedIndex, filteredSuggestions } = this.state
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = selectedIndex < filteredSuggestions.length - 1 ? selectedIndex + 1 : 0
        this.setState({ selectedIndex: nextIndex })
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : filteredSuggestions.length - 1
        this.setState({ selectedIndex: prevIndex })
        break
      case 'Enter':
        e.preventDefault()
        this.handleConfirm(e)
        break
    }
  }

  // 处理建议点击
  private handleSuggestionClick = (suggestion: SearchSuggestion) => {
    this.setState({ keyword: suggestion.text })
    this.performSearch(suggestion.text, suggestion.type)
  }

  // 处理热门搜索点击
  private handleHotSearchClick = (hotSearch: SearchSuggestion) => {
    this.setState({ keyword: hotSearch.text })
    this.performSearch(hotSearch.text, hotSearch.type)
  }

  // 处理清空输入
  private handleClearInput = () => {
    this.setState({ 
      keyword: '',
      filteredSuggestions: [],
      showSuggestions: false,
      selectedIndex: -1
    })
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  // 渲染搜索建议项
  private renderSuggestionItem = (suggestion: SearchSuggestion, index: number) => {
    const isSelected = index === this.state.selectedIndex
    const iconMap = {
      [SearchType.ITEM]: '🔫',
      [SearchType.CASE]: '📦',
      [SearchType.SERIES]: '⭐',
      [SearchType.ALL]: '🔍'
    }

    return (
      <View 
        key={suggestion.id}
        className={`search-suggestion-item ${isSelected ? 'selected' : ''}`}
        onClick={() => this.handleSuggestionClick(suggestion)}
      >
        <Text className='suggestion-icon'>{iconMap[suggestion.type]}</Text>
        <Text className='suggestion-text'>{suggestion.text}</Text>
        {suggestion.hot && <Text className='hot-tag'>热门</Text>}
        {suggestion.recent && <Text className='recent-tag'>最近</Text>}
      </View>
    )
  }

  // 渲染热门搜索
  private renderHotSearches = () => {
    if (!this.props.showHotSearches || this.state.hotSearches.length === 0) return null

    return (
      <View className='hot-searches-section'>
        <View className='section-header'>
          <Text className='section-title'>热门搜索</Text>
          {this.searchHistory.length > 0 && (
            <Text className='clear-history' onClick={this.clearSearchHistory}>清空历史</Text>
          )}
        </View>
        <View className='hot-search-tags'>
          {this.state.hotSearches.map((hotSearch) => (
            <View
              key={hotSearch.id}
              className='hot-search-tag'
              onClick={() => this.handleHotSearchClick(hotSearch)}
            >
              <Text className='tag-text'>{hotSearch.text}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  // 渲染最近搜索
  private renderRecentSearches = () => {
    if (!this.props.showRecentSearches || this.state.recentSearches.length === 0) return null

    return (
      <View className='recent-searches-section'>
        <View className='section-header'>
          <Text className='section-title'>最近搜索</Text>
          <Text className='clear-history' onClick={this.clearSearchHistory}>清空</Text>
        </View>
        <View className='recent-search-list'>
          {this.state.recentSearches.map((recentSearch) => (
            <View
              key={recentSearch.id}
              className='recent-search-item'
              onClick={() => this.handleHotSearchClick(recentSearch)}
            >
              <Text className='recent-icon'>🕒</Text>
              <Text className='recent-text'>{recentSearch.text}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  render(): ReactNode {
    const { 
      keyword, 
      isFocused, 
      showSuggestions, 
      filteredSuggestions 
    } = this.state

    const { placeholder = '搜索饰品、箱子、系列...' } = this.props

    return (
      <View className='search-bar-container'>
        <View className='search-input-wrapper'>
          <View className='search-input-container'>
            <Text className='search-icon'>🔍</Text>
            <Input
              ref={ref => this.inputRef = ref}
              className='search-input'
              type='text'
              value={keyword}
              placeholder={placeholder}
              placeholderClass='search-placeholder'
              onInput={this.handleInputChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onConfirm={this.handleConfirm}
              onKeyDown={this.handleKeyDown}
            />
            {keyword && (
              <View className='clear-btn' onClick={this.handleClearInput}>
                <Text className='clear-icon'>✕</Text>
              </View>
            )}
          </View>
        </View>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <View className='search-suggestions'>
            <ScrollView 
              className='suggestions-list'
              scrollY
              style='max-height: 300px'
            >
              {filteredSuggestions.map((suggestion, index) => 
                this.renderSuggestionItem(suggestion, index)
              )}
            </ScrollView>
          </View>
        )}

        {!showSuggestions && (isFocused || keyword.length === 0) && (
          <View className='search-panel'>
            {this.renderHotSearches()}
            {this.renderRecentSearches()}
          </View>
        )}
      </View>
    )
  }
}