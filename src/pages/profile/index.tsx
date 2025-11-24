import { View, Text, Button, Switch, Picker } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

const mockUser = {
  id: 'user1',
  username: 'CS2Trader',
  uid: '76561198012345678',
  level: 12,
  points: 2840,
  steamBound: true,
  steamId: '76561198012345678',
  email: 'user@example.com',
  avatar: '/images/avatar-default.png',
  totalVaultRewards: 568.40,
  totalArbitrageProfit: 1234.56,
  monthlyProfit: [850, 920, 1050, 1150, 980, 1234]
};

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('中文');
  const [showSteamBind, setShowSteamBind] = useState(false);
  const languageOptions = ['中文', 'English'];

  // Generate monthly profit chart data
  const monthlyData = mockUser.monthlyProfit.map((profit, index) => ({
    month: `M${index + 1}`,
    profit: profit,
    target: 1000
  }));

  const handleLanguageChange = (e) => {
    const index = e.detail.value;
    setLanguage(languageOptions[index]);
  };

  const handleSteamBind = () => {
    Taro.showToast({
      title: '模拟Steam授权',
      icon: 'none',
      duration: 2000
    });
    setShowSteamBind(false);
  };

  const handleManualInput = () => {
    Taro.showToast({
      title: '模拟输入SteamID',
      icon: 'none',
      duration: 2000
    });
    setShowSteamBind(false);
  };

  const StatCard = ({ title, value, change, iconText, color }) => (
    <View className="stat-card">
      <View className="stat-header">
        <Text className={`stat-icon ${color}`}>{iconText}</Text>
        <Text className="stat-change">{change}</Text>
      </View>
      <Text className="stat-value">{value}</Text>
      <Text className="stat-title">{title}</Text>
    </View>
  );

  return (
    <View className="profile-page">
      {/* Header */}
      <View className="profile-header">
        <View className="header-content">
          <View className="avatar-wrapper">
            <Text className="avatar-icon">👤</Text>
          </View>
          <Text className="username">{mockUser.username}</Text>
          <Text className="uid">UID: {mockUser.uid}</Text>
          <View className="user-stats">
            <View className="stat-item">
              <Text className="stat-value-orange">{mockUser.level}</Text>
              <Text className="stat-label">等级</Text>
            </View>
            <View className="stat-item">
              <Text className="stat-value-orange">{mockUser.points}</Text>
              <Text className="stat-label">积分</Text>
            </View>
            <View className="stat-item">
              <Text className="stat-value-green">VIP</Text>
              <Text className="stat-label">会员</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View className="content-section">
        <View className="section-header">
          <Text className="section-icon">📊</Text>
          <Text className="section-title">收益统计</Text>
        </View>
        
        <View className="stats-grid">
          <StatCard
            title="质押收益"
            value={`¥${mockUser.totalVaultRewards.toFixed(0)}`}
            change="+15.2%"
            iconText="🎯"
            color="green"
          />
          <StatCard
            title="套利收益"
            value={`¥${mockUser.totalArbitrageProfit.toFixed(0)}`}
            change="+8.7%"
            iconText="📈"
            color="blue"
          />
        </View>

        {/* Monthly Profit Chart */}
        <View className="chart-card">
          <Text className="chart-title">月度收益趋势</Text>
          <View className="chart-container">
            <View className="chart-bars">
              {monthlyData.map((item, index) => {
                const percentage = (item.profit / 1500) * 100;
                return (
                  <View key={index} className="chart-bar-wrapper">
                    <View 
                      className="chart-bar" 
                      style={{ height: `${percentage}%` }}
                    />
                    <Text className="chart-label">{item.month}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="chart-legend">
            <View className="legend-item">
              <View className="legend-dot orange" />
              <Text className="legend-text">实际收益</Text>
            </View>
            <View className="legend-item">
              <View className="legend-dash" />
              <Text className="legend-text">目标收益</Text>
            </View>
          </View>
        </View>

        {/* Account Binding */}
        <View className="section-block">
          <Text className="section-title-text">账号绑定</Text>
          <View className="setting-list">
            <View className="setting-item">
              <View className="setting-left">
                <View className="setting-icon-box blue">
                  <Text className="setting-icon-text">🛡️</Text>
                </View>
                <View className="setting-info">
                  <Text className="setting-name">Steam账号</Text>
                  <Text className="setting-desc">
                    {mockUser.steamBound ? '已绑定' : '未绑定'}
                  </Text>
                </View>
              </View>
              <Button 
                className={mockUser.steamBound ? 'btn-bound' : 'btn-bind'}
                onClick={() => setShowSteamBind(true)}
              >
                {mockUser.steamBound ? '已绑定' : '绑定'}
              </Button>
            </View>
            
            <View className="setting-item">
              <View className="setting-left">
                <View className="setting-icon-box green">
                  <Text className="setting-icon-text">✉️</Text>
                </View>
                <View className="setting-info">
                  <Text className="setting-name">邮箱绑定</Text>
                  <Text className="setting-desc">{mockUser.email || '未绑定'}</Text>
                </View>
              </View>
              <Button className="btn-manage">管理</Button>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="section-block">
          <Text className="section-title-text">应用设置</Text>
          <View className="setting-list">
            <View className="setting-item">
              <View className="setting-left">
                <Text className="setting-icon">🔔</Text>
                <View className="setting-info">
                  <Text className="setting-name">推送通知</Text>
                  <Text className="setting-desc">接收价格变动和套利提醒</Text>
                </View>
              </View>
              <Switch
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.detail.value)}
                color="#FB923C"
              />
            </View>
            
            <View className="setting-item">
              <View className="setting-left">
                <Text className="setting-icon">🌙</Text>
                <View className="setting-info">
                  <Text className="setting-name">深色模式</Text>
                  <Text className="setting-desc">保护眼睛，节省电量</Text>
                </View>
              </View>
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.detail.value)}
                color="#FB923C"
              />
            </View>
            
            <View className="setting-item">
              <View className="setting-left">
                <Text className="setting-icon">🌐</Text>
                <View className="setting-info">
                  <Text className="setting-name">语言设置</Text>
                  <Text className="setting-desc">当前：{language}</Text>
                </View>
              </View>
              <Picker 
                mode="selector" 
                range={languageOptions}
                value={languageOptions.indexOf(language)}
                onChange={handleLanguageChange}
              >
                <View className="picker-view">
                  <Text className="picker-text">{language}</Text>
                </View>
              </Picker>
            </View>
          </View>
        </View>

        {/* Help & Feedback */}
        <View className="section-block">
          <Text className="section-title-text">帮助与反馈</Text>
          <View className="setting-list">
            <View className="setting-item clickable">
              <View className="setting-left">
                <Text className="setting-icon">❓</Text>
                <Text className="setting-name">常见问题</Text>
              </View>
              <Text className="arrow">›</Text>
            </View>
            
            <View className="setting-item clickable">
              <View className="setting-left">
                <Text className="setting-icon">💬</Text>
                <Text className="setting-name">意见反馈</Text>
              </View>
              <Text className="arrow">›</Text>
            </View>
            
            <View className="setting-item clickable">
              <View className="setting-left">
                <Text className="setting-icon">🏆</Text>
                <Text className="setting-name">关于我们</Text>
              </View>
              <Text className="arrow">›</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <Button className="logout-btn">
          <Text className="logout-text">🚪 退出登录</Text>
        </Button>
      </View>

      {/* Steam Bind Modal */}
      {showSteamBind && (
        <View className="modal-overlay" onClick={() => setShowSteamBind(false)}>
          <View className="modal-content" onClick={(e) => e.stopPropagation()}>
            <View className="modal-header">
              <Text className="modal-title">绑定Steam账号</Text>
              <Text 
                className="modal-close"
                onClick={() => setShowSteamBind(false)}
              >
                ×
              </Text>
            </View>
            
            <View className="modal-body">
              <View className="modal-intro">
                <View className="modal-icon-box">
                  <Text className="modal-icon">🛡️</Text>
                </View>
                <Text className="modal-desc">
                  绑定Steam账号可获得更多交易便利和安全保障
                </Text>
              </View>
              
              <View className="modal-benefits">
                <Text className="benefits-title">绑定好处：</Text>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">快速查看Steam市场价格</Text>
                </View>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">一键导入Steam库存</Text>
                </View>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">交易安全保障</Text>
                </View>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">专属会员权益</Text>
                </View>
              </View>
              
              <View className="modal-actions">
                <Button className="btn-primary" onClick={handleSteamBind}>
                  <Text>🔗 通过Steam授权登录</Text>
                </Button>
                
                <Button className="btn-secondary" onClick={handleManualInput}>
                  <Text>手动输入SteamID</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;
