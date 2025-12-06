import { useState } from 'react';
import { View, Text, Picker, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockVaultStakes, mockCases } from '../../data/mockData';
import './index.scss';

const Vault = () => {
  /* ===================================================================
      State 管理
  =================================================================== */
  const [activeTab, setActiveTab] = useState<'overview' | 'stake' | 'rewards'>('overview');
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSteamBind, setShowSteamBind] = useState(false);
  const [selectedCase, setSelectedCase] = useState('');
  const [amount, setAmount] = useState(1);
  const [duration, setDuration] = useState(30);

  /* ===================================================================
      计算逻辑（保持不动）
  =================================================================== */
  const totalStaked = mockVaultStakes.reduce((s, t) => s + t.currentValue, 0);
  const totalRewards = mockVaultStakes.reduce((s, t) => s + t.totalRewards, 0);
  const dailyRewards = mockVaultStakes.reduce((s, t) => s + t.dailyReward, 0);
  const annualRate = (dailyRewards / totalStaked) * 365;

  const mockDailyRewards = Array.from({ length: 30 }, (_, i) => ({
    date: `10/${26 - i}`,
    reward: Math.random() * 5 + 3,
    cumulative: Math.random() * 20 + 10
  })).reverse();

  const selectedCaseData = mockCases.find((c) => c.id === selectedCase);
  const potentialReward = selectedCaseData
    ? selectedCaseData.price * amount * (duration / 365) * 0.2
    : 0;

  /* ===================================================================
      UI：Tabs 页面
  =================================================================== */

  /** OVERVIEW */
  const renderOverview = () => (
    <View>
      {/* Stats */}
      <View className='stats-grid fade-in'>
        <View className='stat-card stat-card-blue'>
          <View className='stat-header'>
            <Text className='stat-icon'>💰</Text>
            <Text className='stat-label'>当前价值</Text>
          </View>
          <Text className='stat-value'>${totalStaked.toFixed(2)}</Text>
          {/* <Text className='stat-sublabel'>可提现：${totalRewards.toFixed(2)}</Text> */}
        </View>

        <View className='stat-card stat-card-green'>
          <View className='stat-header'>
            <Text className='stat-icon'>📈</Text>
            <Text className='stat-label'>累计价差</Text>
          </View>
          <Text className='stat-value'>${totalRewards.toFixed(2)}</Text>
          <Text className='stat-sublabel'>日价差：${dailyRewards.toFixed(2)}</Text>
        </View>
      </View>

      {/* Annual */}
      <View className='annual-rate slide-up-sm'>
        <View>
          <Text className='annual-title'>已实现价差</Text>
          <Text className='annual-subtitle'>基于当前托管数据</Text>
        </View>

        <View className='annual-value-wrapper'>
          <Text className='annual-value'>{annualRate.toFixed(1)}%</Text>
          {/* <Text className='annual-apy'>APY</Text> */}
        </View>
      </View>

      {/* Stakes */}
      <View className='stakes-section'>
        <Text className='section-title'>我的托管</Text>

        <View className='stakes-list'>
          {mockVaultStakes.map((s) => {
            const progress =
              ((Date.now() - new Date(s.stakeDate).getTime()) /
                (new Date(s.unlockDate).getTime() - new Date(s.stakeDate).getTime())) *
              100;

            return (
              <View key={s.id} className='stake-item fade-in'>
                {/* Header */}
                <View className='stake-header'>
                  <View>
                    <Text className='stake-name'>{s.caseName}</Text>
                    <Text className='stake-amount'>数量：{s.amount}</Text>
                  </View>

                  <View className='stake-values'>
                    <Text className='stake-value'>¥{s.currentValue.toFixed(2)}</Text>
                    <Text className='stake-reward'>+¥{s.totalRewards.toFixed(2)}</Text>
                  </View>
                </View>

                {/* Progress */}
                <View className='stake-progress'>
                  <View className='progress-header'>
                    <Text>托管进度</Text>
                    <Text>{Math.min(progress, 100).toFixed(0)}%</Text>
                  </View>

                  <View className='progress-bar'>
                    <View className='progress-fill' style={{ width: `${Math.min(progress, 100)}%` }} />
                  </View>

                  <View className='progress-dates'>
                    <Text>开始: {new Date(s.stakeDate).toLocaleDateString()}</Text>
                    <Text>解锁: {new Date(s.unlockDate).toLocaleDateString()}</Text>
                  </View>
                </View>

                {/* Footer */}
                <View className='stake-footer'>
                  <View className='stake-daily'>
                    <Text className='stake-daily-icon'>⏱</Text>
                    <Text className='stake-daily-text'>
                      已实现价差：${s.dailyReward.toFixed(2)}
                    </Text>
                  </View>

                  <View
                    className={`stake-status ${s.status === 'active' ? 'status-active' : 'status-locked'}`}
                  >
                    <Text className='stake-status-text'>
                      {s.status === 'active' ? '托管中' : '已解锁'}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>



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
                    {true ? '已绑定' : '未绑定'}
                  </Text>
                </View>
              </View>
              <Button 
                className={true ? 'btn-bound' : 'btn-bind'}
                onClick={() => setShowSteamBind(true)}
              >
                {true ? '已绑定' : '绑定'}
              </Button>
            </View>
          </View>
        </View>


        {/* <Text className='section-title'>📦开始托管</Text> */}
        <View className='empty-state fade-in'>
          <Text className='empty-icon'>📦</Text>
          <Text className='empty-title'>开始托管</Text>
          <Text className='empty-desc'>选择武器箱进行托管</Text>

          <View className='empty-button scale-tap' onClick={() => setShowStakeModal(true)}>
            <Text className='empty-button-text'>立即托管</Text>
          </View>
        </View>
      </View>
    </View>
  );

  /** STAKE */
  const renderStake = () => (
    <View className='stakes-section'>

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
                  {false ? '已绑定' : '未绑定'}
                </Text>
              </View>
            </View>
            <Button 
              className={false ? 'btn-bound' : 'btn-bind'}
              onClick={() => setShowSteamBind(true)}
            >
              {false ? '已绑定' : '绑定'}
            </Button>
          </View>
        </View>
      </View>

      <View className='empty-state fade-in'>
        <Text className='empty-icon'>📦</Text>
        <Text className='empty-title'>开始托管</Text>
        <Text className='empty-desc'>选择武器箱进行托管</Text>

        <View className='empty-button scale-tap' onClick={() => setShowStakeModal(true)}>
          <Text className='empty-button-text'>立即托管</Text>
        </View>
      </View>
    </View>

  );

  /** REWARDS */
  const renderRewards = () => (
    <View>
      <Text className='section-title'>托管明细</Text>

      <View className='rewards-list'>
        {mockDailyRewards.slice(0, 7).map((r, i) => (
          <View key={i} className='reward-item fade-in'>
            <View>
              <Text className='reward-date'>{r.date}</Text>
              <Text className='reward-label'>日实现利差</Text>
            </View>

            <View className='reward-values'>
              <Text className='reward-amount'>+${r.reward.toFixed(2)}</Text>
              <Text className='reward-cumulative'>累计：${r.cumulative.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  /* ===================================================================
      Modal：质押窗口 + 确认窗口
  =================================================================== */
  const renderStakeModal = () => {
    if (!showStakeModal) return null;

    // ---------- Step 1：选择与填写 ----------
    if (!showConfirm) {
      return (
        <View className='modal-overlay' onClick={() => setShowStakeModal(false)}>
          <View className='modal-content' onClick={(e) => e.stopPropagation()}>
            <View className='modal-header'>
              <Text className='modal-title'>托管武器箱</Text>
              <Text className='modal-close' onClick={() => setShowStakeModal(false)}>×</Text>
            </View>

            <View className='modal-body'>
              {/* 选择箱子 */}
              <View className='form-item'>
                <Text className='form-label'>选择武器箱</Text>
                <Picker
                  mode='selector'
                  range={mockCases}
                  rangeKey='name'
                  onChange={(e) => setSelectedCase(mockCases[e.detail.value].id)}
                >
                  <View className='form-select'>
                    <Text>
                      {selectedCaseData
                        ? `${selectedCaseData.name} - ¥${selectedCaseData.price}`
                        : '请选择武器箱'}
                    </Text>
                  </View>
                </Picker>
              </View>

              {/* 数量 */}
              <View className='form-item'>
                <Text className='form-label'>数量</Text>
                <Input
                  type='number'
                  value={String(amount)}
                  className='form-input'
                  onInput={(e) => setAmount(parseInt(e.detail.value || '1'))}
                />
              </View>

              {/* 周期 */}
              <View className='form-item'>
                <Text className='form-label'>单次最低利差</Text>

                <View className='duration-buttons'>
                  {[7, 30, 90].map((d) => (
                    <View
                      key={d}
                      className={`duration-btn ${duration === d ? 'duration-btn-active' : ''}`}
                      onClick={() => setDuration(d)}
                    >
                      <Text className='duration-btn-text'>{d}%</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* 信息卡片 */}
              {selectedCaseData && (
                <View className='stake-info'>
                  <Text className='stake-info-title'>托管信息</Text>

                  <View className='stake-info-row'>
                    <Text className='stake-info-label'>价值：</Text>
                    <Text className='stake-info-value'>
                      ¥{(selectedCaseData.price * amount).toFixed(2)}
                    </Text>
                  </View>

                  <View className='stake-info-row'>
                    <Text className='stake-info-label'>单次最低价差：</Text>
                    <Text className='stake-info-value'>{duration} %</Text>
                  </View>

                  <View className='stake-info-row'>
                    <Text className='stake-info-label'>预期价差：</Text>
                    <Text className='stake-info-value-green'>
                      ${potentialReward.toFixed(2)}
                    </Text>
                  </View>

                  <View className='stake-info-row'>
                    <Text className='stake-info-label'>预估总价差：</Text>
                    <Text className='stake-info-value-green'>
                      {(potentialReward / (selectedCaseData.price * amount) * (365 / duration) * 100).toFixed(1)}%
                    </Text>
                  </View>
                </View>
              )}

              {/* 下一步 */}
              <View
                className={`confirm-button ${
                  !selectedCase || amount < 1 ? 'confirm-button-disabled' : ''
                }`}
                onClick={() => {
                  if (selectedCase && amount >= 1) {
                    setShowConfirm(true);
                  }
                }}
              >
                <Text>下一步</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }

    // ---------- Step 2：最终确认 ----------
    return (
      <View className='modal-overlay' onClick={() => setShowConfirm(false)}>
        <View className='modal-content' onClick={(e) => e.stopPropagation()}>
          <View className='confirm-header'>
            <View className='confirm-icon'>
              <Text className='confirm-icon-text'>🔒</Text>
            </View>
            <Text className='confirm-title'>托管确认</Text>
            <Text className='confirm-subtitle'>确认后武器箱将进入锁定周期</Text>
          </View>

          {selectedCaseData && (
            <View className='confirm-info'>
              <View className='confirm-info-row'>
                <Text className='confirm-info-label'>托管武器箱：</Text>
                <Text className='confirm-info-value'>
                  {selectedCaseData.name} × {amount}
                </Text>
              </View>

              <View className='confirm-info-row'>
                <Text className='confirm-info-label'>总市价：</Text>
                <Text className='confirm-info-value'>
                  ¥{(selectedCaseData.price * amount).toFixed(2)}
                </Text>
              </View>

              <View className='confirm-info-row'>
                <Text className='confirm-info-label'>最低利差：</Text>
                <Text className='confirm-info-value'>{duration} 天</Text>
              </View>

              <View className='confirm-info-row'>
                <Text className='confirm-info-label'>预期单周期收益：</Text>
                <Text className='confirm-info-value-green'>
                  ¥{potentialReward.toFixed(2)}
                </Text>
              </View>

              <View className='confirm-info-divider' />

              <View className='confirm-info-row'>
                <Text className='confirm-info-label'>解锁日期：</Text>
                <Text className='confirm-info-value'>
                  {new Date(Date.now() + duration * 86400000).toLocaleDateString()}
                </Text>
              </View>
            </View>
          )}

          <View className='confirm-actions'>
            <View className='confirm-action-back' onClick={() => setShowConfirm(false)}>
              <Text>返回</Text>
            </View>

            <View
              className='confirm-action-submit'
              onClick={() => {
                Taro.showToast({ title: '托管成功', icon: 'success' });
                setShowConfirm(false);
                setShowStakeModal(false);
                setAmount(1);
                setSelectedCase('');
                setDuration(30);
              }}
            >
              <Text>确认质押</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  /* ===================================================================
      页面结构（保持原结构，但 App 化重写）
  =================================================================== */
  return (
    <View className='vault-page'>
      {/* Header */}
      <View className='vault-header'>
        <View className='vault-header-content'>
          <Text className='vault-header-icon'>🔐</Text>
          <Text className='vault-header-title'>武器箱托管</Text>
        </View>
        <Text className='vault-header-desc'>托管武器箱 • 自动吃价差</Text>
      </View>

      {/* Tabs */}
      <View className='tabs-container'>
        <View className='tabs'>
          <View
            className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Text className='tab-icon'>📊</Text>
            <Text className='tab-text'>总览</Text>
          </View>

          <View
            className={`tab ${activeTab === 'stake' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('stake')}
          >
            <Text className='tab-icon'>➕</Text>
            <Text className='tab-text'>托管</Text>
          </View>

          <View
            className={`tab ${activeTab === 'rewards' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Text className='tab-icon'>💹</Text>
            <Text className='tab-text'>明细</Text>
          </View>
        </View>
      </View>

      {/* 内容 */}
      <View className='content'>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'stake' && renderStake()}
        {activeTab === 'rewards' && renderRewards()}
      </View>

      {/* Modal */}
      {renderStakeModal()}



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
                  绑定Steam账号实现武器箱托管
                </Text>
              </View>
              
              <View className="modal-benefits">
                <Text className="benefits-title">为什么要绑定Steam</Text>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">托管武器箱自动价差</Text>
                </View>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">一键导入Steam库存</Text>
                </View>
                <View className="benefit-item">
                  <View className="benefit-dot" />
                  <Text className="benefit-text">交易安全保障</Text>
                </View>
              </View>
              
              <View className="modal-actions">
                <Button className="btn-primary" onClick={renderOverview}>
                  <Text>🔗 通过Steam授权登录</Text>
                </Button>
                
                <Button className="btn-secondary" onClick={renderOverview}>
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

export default Vault;
