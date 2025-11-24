import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Input, ScrollView } from '@tarojs/components';
import { Search, TrendingUp, Package, Vault, Gamepad2, Bell, BarChart3 } from 'lucide-react';
import { mockDashboardStats, mockCases, mockArbitrage, mockAnnouncements } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './index.scss';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleCaseClick = (id: number) => {
    Taro.navigateTo({ url: `/pages/market-detail/index?id=${id}` });
  };

  const handleArbitrageClick = (id: number) => {
    Taro.navigateTo({ url: `/pages/arbitrage-detail/index?id=${id}` });
  };

  const handleBellClick = () => {
    Taro.showToast({
      title: '暂无新通知',
      icon: 'none'
    });
  };

  return (
    <ScrollView scrollY className="home-container">
      {/* Header with Search */}
      <View className="header">
        <View className="search-section">
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
        </View>
        
        {/* Welcome Message */}
        <View className="welcome-section">
          <Text className="title">ITEMSHUB</Text>
          <Text className="subtitle">专业的CS2饰品交易平台</Text>
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
            <Text className="stat-label">今日交易额</Text>
            <Text className="stat-value">¥{(mockDashboardStats.totalVolume / 10000).toFixed(1)}万</Text>
            <Text className="stat-change positive">↗ +2.3%</Text>
          </View>
          
          <View className="stat-card">
            <Text className="stat-label">箱子平均涨跌</Text>
            <Text className="stat-value orange">+{mockDashboardStats.avgCaseChange}%</Text>
            <Text className="stat-change positive">↗ 良好</Text>
          </View>
          
          <View className="stat-card">
            <Text className="stat-label">套利机会</Text>
            <Text className="stat-value">{mockDashboardStats.arbitrageOpportunities}</Text>
            <Text className="stat-change blue">↗ 新增</Text>
          </View>
          
          <View className="stat-card">
            <Text className="stat-label">全网收益指数</Text>
            <Text className="stat-value green">{mockDashboardStats.globalProfitIndex}</Text>
            <Text className="stat-change positive">↗ 历史高</Text>
          </View>
        </View>

        {/* Trend Chart */}
        <View className="chart-card">
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
        </View>

        {/* Quick Actions */}
        <View className="quick-actions-section">
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
        </View>

        {/* Hot Cases */}
        <View className="hot-section">
          <Text className="section-title-text">热门箱子</Text>
          <View className="hot-cases-list">
            {mockCases.slice(0, 3).map((caseItem) => (
              <View 
                key={caseItem.id} 
                className="case-item"
                onClick={() => handleCaseClick(caseItem.id)}
              >
                <Image 
                  src={caseItem.image} 
                  className="case-image"
                  mode="aspectFill"
                />
                <View className="case-info">
                  <Text className="case-name">{caseItem.name}</Text>
                  <Text className="case-price">¥{caseItem.price.toFixed(2)}</Text>
                  <Text className={`case-change ${caseItem.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {caseItem.change24h >= 0 ? '↗' : '↘'} {Math.abs(caseItem.change24h)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Hot Arbitrage */}
        <View className="hot-section">
          <Text className="section-title-text">热门套利</Text>
          <View className="arbitrage-list">
            {mockArbitrage.slice(0, 2).map((arbitrage) => (
              <View 
                key={arbitrage.id}
                className="arbitrage-item"
                onClick={() => handleArbitrageClick(arbitrage.id)}
              >
                <View className="arbitrage-header">
                  <Text className="arbitrage-name">{arbitrage.skin.name} {arbitrage.skin.skin}</Text>
                  <Text className="arbitrage-profit">
                    +{arbitrage.profitPercentage.toFixed(1)}%
                  </Text>
                </View>
                <View className="arbitrage-footer">
                  <Text className="arbitrage-route">
                    {arbitrage.markets.buy.platform} → {arbitrage.markets.sell.platform}
                  </Text>
                  <Text className="arbitrage-amount">
                    ¥{arbitrage.potentialProfit.toFixed(2)}
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
            {mockAnnouncements.map((announcement) => (
              <View 
                key={announcement.id}
                className="announcement-item"
              >
                <Text className="announcement-title">{announcement.title}</Text>
                <Text className="announcement-content">{announcement.content}</Text>
                <Text className="announcement-date">{announcement.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
