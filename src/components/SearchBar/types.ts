// SearchBar 相关类型定义

export enum SearchType {
  ALL = 'all',     // 全部
  ITEM = 'item',   // 饰品
  CASE = 'case',   // 箱子
  SERIES = 'series' // 系列
}

// 搜索建议项接口
export interface SearchSuggestion {
  id: string
  text: string
  type: SearchType
  hot?: boolean
  recent?: boolean
}

// 组件Props接口
export interface SearchBarProps {
  placeholder?: string
  onSearch?: (keyword: string, type: SearchType) => void
  showHotSuggestions?: boolean
  showRecentSearches?: boolean
  maxHistoryItems?: number
  customHotSearches?: string[]
}

// 组件State接口
export interface SearchBarState {
  keyword: string
  isFocused: boolean
  showSuggestions: boolean
  hotSearches: SearchSuggestion[]
  recentSearches: SearchSuggestion[]
  filteredSuggestions: SearchSuggestion[]
  selectedIndex: number
}