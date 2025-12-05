# Taro 项目

## 项目介绍

基于 Taro 框架的多端开发项目，支持微信小程序、H5、React Native 等多个端。

## 技术栈

- **Taro 3.6.25** - 多端开发框架
- **React 18.0.0** - UI 库
- **TypeScript** - 类型检查
- **Zustand** - 状态管理
- **Sass** - CSS 预处理器

## 开发环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

## 安装依赖

```bash
npm install
```

## 开发命令

### 微信小程序
```bash
npm run dev:weapp
npm run build:weapp
```

### H5
```bash
npm run dev:h5
npm run build:h5
```

### React Native
```bash
npm run dev:rn
npm run build:rn
```

### 支付宝小程序
```bash
npm run dev:alipay
npm run build:alipay
```

### 字节跳动小程序
```bash
npm run dev:tt
npm run build:tt
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── pages/          # 页面文件
├── store/          # 状态管理 (Zustand)
├── styles/         # 样式文件
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
├── app.config.ts   # 全局配置
├── app.scss        # 全局样式
└── index.html      # H5 入口文件
```

## 开发规范

### 目录结构
- 组件使用 PascalCase 命名
- 页面使用 kebab-case 命名
- 工具函数使用 camelCase 命名

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用模块化开发
- 合理拆分组件

## 部署

### 构建生产版本
```bash
npm run build:h5      # H5
npm run build:weapp   # 微信小程序
npm run build:rn      # React Native
```

## ICON STYLE

#a3a3a3

## 许可证

MIT License