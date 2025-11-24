# SearchBar 顶部搜索栏组件

一个功能完整的Taro搜索栏组件，支持饰品、箱子、系列搜索，具备热门推荐、历史记录、实时建议等功能。

## ✨ 功能特性

- 🎯 **智能搜索类型识别** - 自动识别饰品、箱子、系列类型
- 🔥 **热门搜索推荐** - 可自定义热门搜索内容
- 📜 **搜索历史记录** - 自动保存和管理搜索历史
- 💡 **实时搜索建议** - 输入时显示相关搜索建议
- ⌨️ **键盘导航支持** - 上下键导航，回车确认搜索
- 🎨 **深灰蓝 + 亮橙主题** - 现代化UI设计
- 📱 **响应式设计** - 适配多种屏幕尺寸
- ♿ **无障碍访问** - 支持屏幕阅读器

## 📦 安装使用

### 1. 导入组件

```typescript
import { SearchBar, SearchType } from '@/components'
```

### 2. 基本使用

```tsx
<SearchBar
  placeholder='搜索 CS:GO 饰品、箱子、系列...'
  onSearch={(keyword, type) => {
    console.log('搜索:', keyword, type)
    // 处理搜索逻辑
  }}
  showHotSuggestions={true}
  showRecentSearches={true}
/>
```

### 3. 自定义热门搜索

```tsx
<SearchBar
  placeholder='搜索饰品...'
  onSearch={handleSearch}
  showHotSuggestions={true}
  showRecentSearches={true}
  customHotSearches={[
    'AK-47 | 基础版',
    'AWP | 龙狙皮肤',
    '蝴蝶刀 | 渐变',
    'CS2 箱子'
  ]}
/>
```

## ⚙️ Props 配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| placeholder | string | '搜索饰品、箱子、系列...' | 输入框占位符 |
| onSearch | (keyword: string, type: SearchType) => void | - | 搜索回调函数 |
| showHotSuggestions | boolean | true | 是否显示热门搜索推荐 |
| showRecentSearches | boolean | true | 是否显示最近搜索记录 |
| maxHistoryItems | number | 5 | 最大历史记录数量 |
| customHotSearches | string[] | - | 自定义热门搜索列表 |

## 🔍 SearchType 枚举

```typescript
enum SearchType {
  ALL = 'all',     // 全部
  ITEM = 'item',   // 饰品
  CASE = 'case',   // 箱子
  SERIES = 'series' // 系列
}
```

## 🎮 交互说明

### 基本操作
- 点击输入框开始搜索
- 输入关键词显示实时建议
- 点击 ✕ 清空输入内容
- 点击建议项执行搜索

### 键盘操作
- `↑` `↓` 键在搜索建议中导航
- `Enter` 键确认搜索当前选中项
- `Esc` 键取消搜索（开发者可扩展）

### 手势操作
- 长按历史记录项可删除（开发者可扩展）
- 左右滑动切换建议（开发者可扩展）

## 🎨 主题定制

组件使用深灰蓝 + 亮橙主题，样式变量定义在 `src/styles/variables.scss`：

```scss
$primary: #2c3e50;          // 深灰蓝色
$accent: #ff6b35;           // 亮橙色
$search-bg: #f5f7fa;        // 搜索框背景
$hot-tag-bg: #fef3e2;       // 热门标签背景
```

## 📝 完整示例

### 页面组件

```tsx
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { SearchBar, SearchType } from '@/components'
import Taro from '@tarojs/taro'

export default class SearchPage extends Component {
  private handleSearch = (keyword: string, type: SearchType) => {
    console.log('搜索参数:', { keyword, type })
    
    // 获取搜索类型中文名
    const typeMap = {
      [SearchType.ALL]: '全部',
      [SearchType.ITEM]: '饰品',
      [SearchType.CASE]: '箱子',
      [SearchType.SERIES]: '系列'
    }
    
    // 显示搜索结果
    Taro.showModal({
      title: '搜索成功',
      content: `关键词: ${keyword}\\n类型: ${typeMap[type]}`,
      showCancel: false
    })
  }

  render() {
    return (
      <View className='search-page'>
        <SearchBar
          placeholder='搜索 CS:GO 饰品、箱子、系列...'
          onSearch={this.handleSearch}
          showHotSuggestions={true}
          showRecentSearches={true}
          maxHistoryItems={8}
        />
      </View>
    )
  }
}
```

## 🔧 开发说明

### 文件结构

```
src/components/SearchBar/
├── index.tsx          # 组件主文件
├── index.scss         # 样式文件
└── index.ts           # 导出文件
```

### 核心功能

1. **搜索类型识别** - `detectSearchType()` 方法
2. **历史记录管理** - `loadSearchHistory()` / `saveSearchHistory()` 方法
3. **实时搜索建议** - `filterSuggestions()` 方法
4. **键盘导航处理** - `handleKeyDown()` 方法
5. **UI交互处理** - 焦点管理、动画效果等

### 状态管理

```typescript
interface SearchBarState {
  keyword: string                    // 当前输入关键词
  isFocused: boolean                 // 是否获得焦点
  showSuggestions: boolean           // 是否显示建议
  hotSearches: SearchSuggestion[]    // 热门搜索列表
  recentSearches: SearchSuggestion[] // 最近搜索列表
  filteredSuggestions: SearchSuggestion[] // 过滤后的建议
  selectedIndex: number              // 当前选中的建议索引
}
```

## 📱 平台支持

- ✅ 微信小程序
- ✅ H5
- ✅ React Native
- ✅ 支付宝小程序
- ✅ 百度小程序

## 🚀 性能优化

- 使用防抖优化实时搜索
- 限制搜索建议数量（最多10条）
- 本地存储历史记录，避免重复请求
- 虚拟滚动处理大量建议项（可扩展）

## 🔮 未来规划

- [ ] 搜索联想功能
- [ ] 语音搜索支持
- [ ] 图片搜索功能
- [ ] 多语言国际化
- [ ] 搜索结果缓存
- [ ] 高级筛选功能

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个组件！