# 快捷入口四宫格导航组件 (QuickActions)

一个功能完整、设计精美的快捷入口导航组件，支持自定义配置、动态数据更新和无障碍访问。

## 功能特性

### 🎯 核心功能
- **四宫格布局**：2x2网格布局，支持4列显示
- **四大入口**：[查看市场]、[套利机会]、[质押收益]、[绑定Steam]
- **图标展示**：支持emoji和自定义图标
- **页面跳转**：内置页面路由导航
- **动态数据**：支持实时更新徽章数量

### 🎨 视觉体验
- **悬停效果**：平滑的动画和缩放效果
- **点击动画**：波纹效果和点击脉冲动画
- **渐变背景**：美观的渐变色背景
- **徽章提醒**：动态显示未读消息数量
- **响应式设计**：适配不同屏幕尺寸

### ♿ 无障碍支持
- **键盘导航**：支持Tab键和Enter键操作
- **语义化标签**：完整的aria标签和role属性
- **焦点管理**：清晰的焦点指示器
- **屏幕阅读器**：完整的描述信息

### 🔧 自定义配置
- **自定义排序**：支持自定义入口显示顺序
- **动态数据**：支持运行时更新入口信息
- **样式主题**：支持自定义主题色彩
- **禁用控制**：支持禁用特定入口

## 快速开始

### 基础用法

```tsx
import { QuickActions } from '@/components'

<QuickActions 
  showBadges={true}
  onItemClick={(item) => console.log('点击了:', item.title)}
/>
```

### 自定义数据

```tsx
import { QuickActions, type QuickActionItem } from '@/components'

const customItems: QuickActionItem[] = [
  {
    id: 'dashboard',
    title: '数据看板',
    description: '综合数据分析',
    icon: '📈',
    url: '/pages/dashboard/index',
    color: '#1890ff',
    badge: 5
  },
  {
    id: 'portfolio',
    title: '投资组合',
    description: '资产管理',
    icon: '💼',
    url: '/pages/portfolio/index',
    color: '#52c41a',
    badge: 0
  }
]

<QuickActions 
  items={customItems}
  showBadges={true}
  customOrder={['dashboard', 'portfolio']}
  onItemClick={handleItemClick}
/>
```

## API 参考

### QuickActionsProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `QuickActionItem[]` | 默认配置 | 快捷入口数据 |
| `columns` | `number` | `2` | 网格列数 |
| `showBadges` | `boolean` | `true` | 是否显示徽章 |
| `onItemClick` | `(item: QuickActionItem) => void` | - | 点击回调函数 |
| `customOrder` | `string[]` | - | 自定义排序 |
| `className` | `string` | - | 自定义样式类 |

### QuickActionItem

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `title` | `string` | 标题 |
| `description` | `string` | 描述 |
| `icon` | `string` | 图标（支持emoji） |
| `url` | `string` | 跳转链接 |
| `color` | `string` | 主题色 |
| `badge` | `number` | 徽章数量 |
| `isEnabled` | `boolean` | 是否启用 |

## 默认配置

组件提供了四个默认快捷入口：

1. **查看市场** - 实时行情分析（蓝色主题）
2. **套利机会** - 发现套利空间（绿色主题）
3. **质押收益** - 管理质押资产（橙色主题）
4. **绑定Steam** - 账户关联管理（紫色主题）

## 样式定制

组件使用SCSS编写，支持深度定制：

```scss
.quick-actions {
  // 自定义容器样式
}

.action-item {
  // 自定义卡片样式
}

.action-icon {
  // 自定义图标样式
}

.action-text {
  // 自定义文本样式
}
```

## 动画效果

### 悬停动画
- 卡片向上移动4px
- 图标缩放和旋转
- 阴影加深效果

### 点击动画
- 卡片缩放动画
- 波纹扩散效果
- 点击脉冲效果

### 徽章动画
- 脉冲动画效果
- 数字变化动画

## 无障碍功能

### 键盘支持
- `Tab` - 切换焦点
- `Enter` / `Space` - 激活入口

### 屏幕阅读器
- 完整的aria-label描述
- 状态变化通知
- 语义化结构

## 示例项目

查看 `src/examples/quick-actions-demo.tsx` 获取完整的使用示例。

## 页面结构

组件包含了对应的页面文件：

- `/pages/market/` - 市场行情页面
- `/pages/arbitrage/` - 套利机会页面
- `/pages/staking/` - 质押收益页面
- `/pages/steam/` - 绑定Steam页面

## 注意事项

1. 确保在 `app.config.ts` 中注册了相关页面
2. 页面跳转使用 `navigateTo`，注意处理路由错误
3. 徽章数量建议控制在合理范围内
4. 自定义图标建议使用emoji以保证兼容性

## 扩展建议

- 添加拖拽排序功能
- 支持多语言国际化
- 添加主题切换
- 支持图标库集成
- 添加数据持久化