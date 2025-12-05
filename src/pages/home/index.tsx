import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Input, ScrollView } from '@tarojs/components';
import { Search, TrendingUp, Package, Vault, Gamepad2, Bell, BarChart3 } from 'lucide-react';
import { mockDashboardStats, mockCases, mockArbitrage, mockAnnouncements, mockCase, mockSkins } from '../../data/mockData';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './index.scss';
import { api_case, api_index } from '@/utils/request';
import { base32Encode, getSkinsById, getSkinsNameById, getTimeDiffText } from '@/utils/utils';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [indexData, setIndexData] = useState<any>({});
  const [cases, setCases] = useState<any>(mockSkins);
  useEffect(() => {
    const load = async () => {
      try {
        const data= await api_index()
        setIndexData(data?.data);
        console.log(data?.data)
        const cs = await api_case();
        setCases(cs?.data);
      } catch (err) {
        console.error("请求失败:", err);
      }
    };

    load();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Taro.navigateTo({
        url: `/pages/market/index?search=${encodeURIComponent(searchQuery)}`
      });
    }
  };

  const quickActions = [
    {
      icon: TrendingUp,
      label: '查看市场',
      path: '/pages/market/index',
      color: 'blue'
    },
    {
      icon: Package,
      label: '套利机会',
      path: '/pages/arbitrage/index',
      color: 'green'
    },
    {
      icon: Vault,
      label: '质押收益',
      path: '/pages/vault/index',
      color: 'purple'
    },
    {
      icon: Gamepad2,
      label: '绑定Steam',
      path: '/pages/profile/index',
      color: 'orange'
    }
  ];

  const handleQuickAction = (path: string) => {
    Taro.navigateTo({ url: path });
  };

  const handleSkinClick = (id: number) => {
    Taro.navigateTo({
      url: `/pages/skin-detail/index?id=${id}`,
    });
  };

  const handleMarketClick = (id: number) => {
    Taro.navigateTo({ url: `/pages/market-detail/index?id=${id}` });
  };

  const handleArbitrageClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/arbitrage-detail/index?id=${id}` });
  };

  const handleBellClick = () => {
    Taro.showToast({
      title: '暂无新通知',
      icon: 'none'
    });
  };


if (!indexData?.skins) {
  return (
    <View className='loading-wrapper'>
      <View className='loading-spinner'></View>
    </View>
  );
}


  return (
    <ScrollView scrollY className="home-container">
      {/* Header with Search */}
      <View className="header">
        {/* <View className="search-section">
          <View className="search-wrapper">
            <View className="search-icon-wrapper">
              <Search className="search-icon" size={18} />
            </View>
            <Input
              type="text"
              placeholder="搜索饰品名、箱子名..."
              value={searchQuery}
              onInput={(e) => setSearchQuery(e.detail.value)}
              onConfirm={handleSearch}
              className="search-input"
            />
          </View>
          <View className="bell-button" onClick={handleBellClick}>
            <Bell size={20} />
          </View>
        </View> */}
        
        {/* Welcome Message */}
        <View className="welcome-section">
          <Text className="title">ITEMSHUB</Text>
          <Text className="subtitle">专业的CS2饰品套利平台</Text>
        </View>
      </View>

      {/* Dashboard Stats */}
      <View className="content-section">
        <View className="section-header">
          <BarChart3 className="section-icon" size={20} />
          <Text className="section-title">数据概览</Text>
        </View>
        
        <View className="stats-grid">

          
          <View className="stat-card">
            <Text className="stat-label">平均价差</Text>
            <Text className="stat-value orange">+{(indexData.skinsAverageSub*100).toFixed(3)}%</Text>
            <Text className="stat-change positive">{indexData.skins.length} 种箱子</Text>
          </View>
          
          <View className="stat-card">
            <Text className="stat-label">大额套利机会</Text>
            <Text className="stat-value">{indexData.greatProfit}</Text>
            <Text className="stat-change blue">↗ 25%+ 价差</Text>
          </View>
          
          <View className="stat-card">
            <Text className="stat-label">全网收益指数</Text>
            <Text className="stat-value green">{(indexData.profitRate).toFixed(3)}</Text>
            <Text className="stat-change positive">↗ 高</Text>
          </View>

          <View className="stat-card">
            <Text className="stat-label">上次更新</Text>

            {/* 时间差文本 */}
            <Text className="stat-value">
              {getTimeDiffText(indexData.lastUpdateTime)}
            </Text>

            <Text className="stat-change positive">· Online</Text>
          </View>

        </View>

        {/* Trend Chart */}
        {/* <View className="chart-card">
          <Text className="chart-title">近7日收益趋势</Text>
          <View className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockDashboardStats.trendData}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#FB923C" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </View>
        </View> */}

        {/* Quick Actions */}
        {/* <View className="quick-actions-section">
          <Text className="section-title-text">快捷入口</Text>
          <View className="quick-actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <View
                  key={index}
                  onClick={() => handleQuickAction(action.path)}
                  className="quick-action-item"
                >
                  <View className={`quick-action-icon ${action.color}`}>
                    <Icon size={20} className="icon-white" />
                  </View>
                  <Text className="quick-action-label">{action.label}</Text>
                </View>
              );
            })}
          </View>
        </View> */}

        {/* Hot Cases */}
        <View className="hot-section">
          <Text className="section-title-text">热门箱子</Text>
          <View className="hot-cases-list">
            {cases.slice(0, 3).map((caseItem:any) => (
              <View 
                key={caseItem.id} 
                className="case-item"
                onClick={() => handleSkinClick(caseItem.id)}
              >
                <Image 
                  src={caseItem.img_url} 
                  className="case-image"
                  mode="aspectFill"
                />
                <View className="case-info">
                  <Text className="case-name">{caseItem.name}</Text>
                  <Text className="case-price">${(getSkinsById(indexData.skins,caseItem.id) ? getSkinsById(indexData.skins,caseItem.id).price : 0  ).toFixed(2)}</Text>
                  <Text className={`case-change positive`}>
                    ± {(getSkinsById(indexData.skins,caseItem.id) ? getSkinsById(indexData.skins,caseItem.id).averageSub*100 : 0  ).toFixed(2)}%
                  </Text>

                  <Text className={`case-change`}>
                    {(getSkinsById(indexData.skins,caseItem.id) ? getSkinsById(indexData.skins,caseItem.id).offers : 0  ).toFixed(0)} Offers
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Hot Arbitrage */}
        <View className="hot-section">
          <Text className="section-title-text">高额可套利价差</Text>
          <View className="arbitrage-list">
            {indexData.topSkinSub.map((arbitrage:any) => (
              <View 
                key={arbitrage.skin.skin}
                className="arbitrage-item"
                onClick={() => handleArbitrageClick(base32Encode(`${arbitrage.skin.skin}#${arbitrage.from.name}#${arbitrage.to.name}`))}
              >
                <View className="arbitrage-header">
                  <Text className="arbitrage-name">{getSkinsNameById(cases,arbitrage.skin.skin) ? getSkinsNameById(cases,arbitrage.skin.skin).name : ""}</Text>
                  <Text className="arbitrage-profit">
                    +{(arbitrage.skin.averageSub*100).toFixed(3)}%
                  </Text>
                </View>
                <View className="arbitrage-footer">
                  <Text className="arbitrage-route">
                    {arbitrage.from.name} → {arbitrage.to.name}
                  </Text>
                  <Text className="arbitrage-amount">
                    ${(arbitrage.skin.averageSub * arbitrage.skin.price).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Announcements */}
        <View className="announcements-section">
          <Text className="section-title-text">公告栏</Text>
          <View className="announcements-list">
            {indexData.announce.map((announcement:any) => (
              <View 
                key={announcement.timestamp}
                className="announcement-item"
              >
                <Text className="announcement-title">{announcement.title}</Text>
                <Text className="announcement-content">{announcement.message}</Text>
                <Text className="announcement-date">{(new Date(announcement.timestamp)).toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
