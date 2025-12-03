export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/market/index',
    'pages/arbitrage/index',
    'pages/vault/index',
    'pages/profile/index',
    'pages/skin-detail/index',
    'pages/market-detail/index',
    'pages/arbitrage-detail/index',
    'pages/vault-stake/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#111827',
    navigationBarTitleText: 'CS2 皮肤交易平台',
    navigationBarTextStyle: 'white',
    backgroundColor: '#111827'
  },
  tabBar: {
    color: '#9CA3AF',
    selectedColor: '#3B82F6',
    borderStyle: 'black',
    backgroundColor: '#1F2937',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'assets/icons/house.png',
        selectedIconPath: 'assets/icons/house-white.png',
        text: '首页'
      },
      {
        pagePath: 'pages/market/index',
        iconPath: 'assets/icons/trending-up.png',
        selectedIconPath: 'assets/icons/trending-up-white.png',
        text: '市场'
      }
      // {
      //   pagePath: 'pages/arbitrage/index',
      //   iconPath: 'assets/icons/graduation-cap.png',
      //   selectedIconPath: 'assets/icons/graduation-cap-white.png',
      //   text: '套利'
      // },
      // {
      //   pagePath: 'pages/vault/index',
      //   iconPath: 'assets/icons/landmark.png',
      //   selectedIconPath: 'assets/icons/landmark-white.png',
      //   text: '质押'
      // },
      // {
      //   pagePath: 'pages/profile/index',
      //   iconPath: 'assets/icons/shield-user.png',
      //   selectedIconPath: 'assets/icons/shield-user-white.png',
      //   text: '我的'
      // }
    ]
  },
  lazyCodeLoading: 'requiredComponents'
})
