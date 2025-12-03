import { SkinItem, Case, ArbitrageOpportunity, VaultStake, User, Market } from '../types';

// Mock CS2 Skins Data
export const mockCase: any[] = [
  { "name": "Glove Case", "id": "glove-case", "url": "https://csgoskins.gg/items/glove-case", "img_url": "https://itemshub-res.sidcloud.cn/Glove_Case.webp" },
  { "name": "Fever Case", "id": "fever-case", "url": "https://csgoskins.gg/items/fever-case", "img_url": "https://itemshub-res.sidcloud.cn/Fever_Case.webp" },
  { "name": "Fracture Case", "id": "fracture-case", "url": "https://csgoskins.gg/items/fracture-case", "img_url": "https://itemshub-res.sidcloud.cn/Fracture_Case.webp" },
  { "name": "Recoil Case", "id": "recoil-case", "url": "https://csgoskins.gg/items/recoil-case", "img_url": "https://itemshub-res.sidcloud.cn/Recoil_Case.webp" },
  { "name": "Revolution Case", "id": "revolution-case", "url": "https://csgoskins.gg/items/revolution-case", "img_url": "https://itemshub-res.sidcloud.cn/Revolution_Case.webp" },
  { "name": "Kilowatt Case", "id": "kilowatt-case", "url": "https://csgoskins.gg/items/kilowatt-case", "img_url": "https://itemshub-res.sidcloud.cn/Kilowatt_Case.webp" },
  { "name": "Operation Breakout Weapon Case", "id": "operation-breakout-weapon-case", "url": "https://csgoskins.gg/items/operation-breakout-weapon-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Breakout_Weapon_Case.webp" },
  { "name": "Sealed Genesis Terminal", "id": "sealed-genesis-terminal", "url": "https://csgoskins.gg/items/sealed-genesis-terminal", "img_url": "https://itemshub-res.sidcloud.cn/Sealed_Genesis_Terminal.webp" },
  { "name": "Spectrum 2 Case", "id": "spectrum-2-case", "url": "https://csgoskins.gg/items/spectrum-2-case", "img_url": "https://itemshub-res.sidcloud.cn/Spectrum_2_Case.webp" },
  { "name": "Chroma 2 Case", "id": "chroma-2-case", "url": "https://csgoskins.gg/items/chroma-2-case", "img_url": "https://itemshub-res.sidcloud.cn/Chroma_2_Case.webp" },
  { "name": "Chroma 3 Case", "id": "chroma-3-case", "url": "https://csgoskins.gg/items/chroma-3-case", "img_url": "https://itemshub-res.sidcloud.cn/Chroma_3_Case.webp" },
  { "name": "Gamma 2 Case", "id": "gamma-2-case", "url": "https://csgoskins.gg/items/gamma-2-case", "img_url": "https://itemshub-res.sidcloud.cn/Gamma_2_Case.webp" },
  { "name": "Danger Zone Case", "id": "danger-zone-case", "url": "https://csgoskins.gg/items/danger-zone-case", "img_url": "https://itemshub-res.sidcloud.cn/Danger_Zone_Case.webp" },
  { "name": "Gamma Case", "id": "gamma-case", "url": "https://csgoskins.gg/items/gamma-case", "img_url": "https://itemshub-res.sidcloud.cn/Gamma_Case.webp" },
  { "name": "Gallery Case", "id": "gallery-case", "url": "https://csgoskins.gg/items/gallery-case", "img_url": "https://itemshub-res.sidcloud.cn/Gallery_Case.webp" },
  { "name": "Chroma Case", "id": "chroma-case", "url": "https://csgoskins.gg/items/chroma-case", "img_url": "https://itemshub-res.sidcloud.cn/Chroma_Case.webp" },
  { "name": "Prisma Case", "id": "prisma-case", "url": "https://csgoskins.gg/items/prisma-case", "img_url": "https://itemshub-res.sidcloud.cn/Prisma_Case.webp" },
  { "name": "Spectrum Case", "id": "spectrum-case", "url": "https://csgoskins.gg/items/spectrum-case", "img_url": "https://itemshub-res.sidcloud.cn/Spectrum_Case.webp" },
  { "name": "Prisma 2 Case", "id": "prisma-2-case", "url": "https://csgoskins.gg/items/prisma-2-case", "img_url": "https://itemshub-res.sidcloud.cn/Prisma_2_Case.webp" },
  { "name": "Revolver Case", "id": "revolver-case", "url": "https://csgoskins.gg/items/revolver-case", "img_url": "https://itemshub-res.sidcloud.cn/Revolver_Case.webp" },
  { "name": "Operation Bravo Case", "id": "operation-bravo-case", "url": "https://csgoskins.gg/items/operation-bravo-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Bravo_Case.webp" },
  { "name": "Snakebite Case", "id": "snakebite-case", "url": "https://csgoskins.gg/items/snakebite-case", "img_url": "https://itemshub-res.sidcloud.cn/Snakebite_Case.webp" },
  { "name": "Operation Hydra Case", "id": "operation-hydra-case", "url": "https://csgoskins.gg/items/operation-hydra-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Hydra_Case.webp" },
  { "name": "Horizon Case", "id": "horizon-case", "url": "https://csgoskins.gg/items/horizon-case", "img_url": "https://itemshub-res.sidcloud.cn/Horizon_Case.webp" },
  { "name": "Clutch Case", "id": "clutch-case", "url": "https://csgoskins.gg/items/clutch-case", "img_url": "https://itemshub-res.sidcloud.cn/Clutch_Case.webp" },
  { "name": "Operation Phoenix Weapon Case", "id": "operation-phoenix-weapon-case", "url": "https://csgoskins.gg/items/operation-phoenix-weapon-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Phoenix_Weapon_Case.webp" },
  { "name": "Operation Wildfire Case", "id": "operation-wildfire-case", "url": "https://csgoskins.gg/items/operation-wildfire-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Wildfire_Case.webp" },
  { "name": "CS20 Case", "id": "cs20-case", "url": "https://csgoskins.gg/items/cs20-case", "img_url": "https://itemshub-res.sidcloud.cn/CS20_Case.webp" },
  { "name": "Operation Riptide Case", "id": "operation-riptide-case", "url": "https://csgoskins.gg/items/operation-riptide-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Riptide_Case.webp" },
  { "name": "Shattered Web Case", "id": "shattered-web-case", "url": "https://csgoskins.gg/items/shattered-web-case", "img_url": "https://itemshub-res.sidcloud.cn/Shattered_Web_Case.webp" },
  { "name": "Shadow Case", "id": "shadow-case", "url": "https://csgoskins.gg/items/shadow-case", "img_url": "https://itemshub-res.sidcloud.cn/Shadow_Case.webp" },
  { "name": "Huntsman Weapon Case", "id": "huntsman-weapon-case", "url": "https://csgoskins.gg/items/huntsman-weapon-case", "img_url": "https://itemshub-res.sidcloud.cn/Huntsman_Weapon_Case.webp" },
  { "name": "Falchion Case", "id": "falchion-case", "url": "https://csgoskins.gg/items/falchion-case", "img_url": "https://itemshub-res.sidcloud.cn/Falchion_Case.webp" },
  { "name": "Winter Offensive Weapon Case", "id": "winter-offensive-weapon-case", "url": "https://csgoskins.gg/items/winter-offensive-weapon-case", "img_url": "https://itemshub-res.sidcloud.cn/Winter_Offensive_Weapon_Case.webp" },
  { "name": "eSports 2013 Winter Case", "id": "esports-2013-winter-case", "url": "https://csgoskins.gg/items/esports-2013-winter-case", "img_url": "https://itemshub-res.sidcloud.cn/eSports_2013_Winter_Case.webp" },
  { "name": "eSports 2014 Summer Case", "id": "esports-2014-summer-case", "url": "https://csgoskins.gg/items/esports-2014-summer-case", "img_url": "https://itemshub-res.sidcloud.cn/eSports_2014_Summer_Case.webp" },
  { "name": "eSports 2013 Case", "id": "esports-2013-case", "url": "https://csgoskins.gg/items/esports-2013-case", "img_url": "https://itemshub-res.sidcloud.cn/eSports_2013_Case.webp" },
  { "name": "Operation Broken Fang Case", "id": "operation-broken-fang-case", "url": "https://csgoskins.gg/items/operation-broken-fang-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Broken_Fang_Case.webp" },
  { "name": "Operation Vanguard Weapon Case", "id": "operation-vanguard-weapon-case", "url": "https://csgoskins.gg/items/operation-vanguard-weapon-case", "img_url": "https://itemshub-res.sidcloud.cn/Operation_Vanguard_Weapon_Case.webp" }
];
export const mockSkins: SkinItem[] = [
  {
    id: '1',
    name: 'AK-47',
    skin: 'Fire Serpent',
    quality: 'Factory New',
    rarity: 'Covert',
    collection: 'The Phoenix Collection',
    price: 2850.50,
    price24h: 2780.00,
    change24h: 2.5,
    image: '../../assets/images/ak-fire-serpent.jpg',
    category: 'AK',
    marketId: 'ak47_fire_serpent_fnv',
    description: '外部磨损的几何图案可以通过旋转活动图查看。',
    stats: {
      float: 0.02,
      inspectLink: 'inspect-link-1',
      patternIndex: 541
    }
  },
  {
    id: '2',
    name: 'AWP',
    skin: 'Dragon Lore',
    quality: 'Factory New',
    rarity: 'Covert',
    collection: 'The Cobblestone Collection',
    price: 4500.00,
    price24h: 4450.00,
    change24h: 1.1,
    image: '../../assets/images/awp-dragon-lore.jpg',
    category: 'AWP',
    marketId: 'awp_dragon_lore_fnv',
    description: '一只神秘的龙守护着它的宝藏。'
  },
  {
    id: '3',
    name: 'M4A4',
    skin: 'Howl',
    quality: 'Factory New',
    rarity: 'Covert',
    collection: 'The Chroma Collection',
    price: 3200.00,
    price24h: 3150.00,
    change24h: 1.6,
    image: '../../assets/images/m4a4-howl.jpg',
    category: 'M4',
    marketId: 'm4a4_howl_fnv',
    description: '外表狂野，未被驯服。'
  },
  {
    id: '4',
    name: 'AK-47',
    skin: 'Asiimov',
    quality: 'Minimal Wear',
    rarity: 'Covert',
    collection: 'The Spectrum Collection',
    price: 1200.00,
    price24h: 1180.00,
    change24h: 1.7,
    image: '../../assets/images/ak-asiimov.jpg',
    category: 'AK',
    marketId: 'ak47_asiimov_mw'
  },
  {
    id: '5',
    name: 'USP-S',
    skin: 'Neo-Noir',
    quality: 'Factory New',
    rarity: 'Restricted',
    collection: 'The Prime Collection',
    price: 680.00,
    price24h: 690.00,
    change24h: -1.4,
    image: '../../assets/images/ak-fire-serpent.jpg',
    category: 'USP',
    marketId: 'usp_s_neo_noir_fnv'
  }
];

// Mock Cases Data
export const mockCases: Case[] = [
  {
    id: 'case1',
    name: 'Chroma Case',
    price: 12.50,
    price24h: 12.20,
    change24h: 2.5,
    image: '../../assets/images/chroma-case.png',
    description: 'Chromatic features new finishes from multiple manufacturers.',
    releaseDate: '2014-08-08',
    rarity: 'Rare',
    items: mockSkins,
    contractAddress: '0x123...abc',
    dropRate: '0.26%'
  },
  {
    id: 'case2',
    name: 'Phoenix Collection',
    price: 8.90,
    price24h: 8.70,
    change24h: 2.3,
    image: '../../assets/images/phoenix-case.png',
    description: 'A collection of skins themed around the mythical phoenix.',
    releaseDate: '2013-07-01',
    rarity: 'Medium',
    items: mockSkins,
    dropRate: '0.52%'
  },
  {
    id: 'case3',
    name: 'Gamma Collection',
    price: 35.80,
    price24h: 36.20,
    change24h: -1.1,
    image: '../../assets/images/gamma-case.png',
    description: 'Premium skins with beautiful gamma ray finishes.',
    releaseDate: '2016-08-02',
    rarity: 'High',
    items: mockSkins,
    dropRate: '0.15%'
  },
  {
    id: 'case4',
    name: 'Spectrum Case',
    price: 28.50,
    price24h: 28.10,
    change24h: 1.4,
    image: '../../assets/images/spectrum-case.png',
    description: 'Featuring skins with spectrum-like properties.',
    releaseDate: '2017-05-09',
    rarity: 'Premium',
    items: mockSkins,
    dropRate: '0.12%'
  },
  {
    id: 'case5',
    name: 'Crimson Collection',
    price: 45.90,
    price24h: 44.50,
    change24h: 3.1,
    image: '../../assets/images/crimson-case.png',
    description: 'High-end collection featuring the most sought-after skins.',
    releaseDate: '2015-12-08',
    rarity: 'Ultra Rare',
    items: mockSkins,
    dropRate: '0.08%'
  }
];

// Mock Arbitrage Opportunities
export const mockArbitrage: ArbitrageOpportunity[] = [
  {
    id: 'arb1',
    skin: mockSkins[0],
    markets: {
      buy: {
        platform: 'C5',
        price: 2750.00,
        fee: 0.02
      },
      sell: {
        platform: 'Buff',
        price: 2850.50,
        fee: 0.025
      }
    },
    potentialProfit: 85.50,
    profitPercentage: 3.1,
    riskLevel: 'Low',
    volume: 15,
    lastUpdated: '2025-10-25 23:45:00'
  },
  {
    id: 'arb2',
    skin: mockSkins[1],
    markets: {
      buy: {
        platform: 'Skinport',
        price: 4400.00,
        fee: 0.015
      },
      sell: {
        platform: 'Steam',
        price: 4500.00,
        fee: 0.15
      }
    },
    potentialProfit: 50.00,
    profitPercentage: 1.1,
    riskLevel: 'Medium',
    volume: 8,
    lastUpdated: '2025-10-25 23:30:00'
  },
  {
    id: 'arb3',
    skin: mockSkins[3],
    markets: {
      buy: {
        platform: 'Buff',
        price: 1160.00,
        fee: 0.025
      },
      sell: {
        platform: 'C5',
        price: 1200.00,
        fee: 0.02
      }
    },
    potentialProfit: 28.00,
    profitPercentage: 2.4,
    riskLevel: 'Low',
    volume: 22,
    lastUpdated: '2025-10-25 23:50:00'
  }
];

// Mock Vault Stakes
export const mockVaultStakes: VaultStake[] = [
  {
    id: 'stake1',
    caseId: 'case1',
    caseName: 'Chroma Case',
    amount: 10,
    stakeDate: '2025-10-20 10:00:00',
    unlockDate: '2025-11-20 10:00:00',
    currentValue: 130.00,
    totalRewards: 25.80,
    dailyReward: 1.29,
    status: 'active',
    rewardRate: 0.005
  },
  {
    id: 'stake2',
    caseId: 'case2',
    caseName: 'Phoenix Collection',
    amount: 5,
    stakeDate: '2025-10-15 14:30:00',
    unlockDate: '2025-11-15 14:30:00',
    currentValue: 46.50,
    totalRewards: 12.30,
    dailyReward: 0.82,
    status: 'active',
    rewardRate: 0.003
  },
  {
    id: 'stake3',
    caseId: 'case3',
    caseName: 'Gamma Collection',
    amount: 2,
    stakeDate: '2025-10-01 09:15:00',
    unlockDate: '2025-12-01 09:15:00',
    currentValue: 74.60,
    totalRewards: 18.45,
    dailyReward: 1.85,
    status: 'active',
    rewardRate: 0.008
  }
];

// Mock User Data
export const mockUser: User = {
  id: 'user1',
  username: 'CS2Trader',
  uid: '76561198012345678',
  level: 12,
  points: 2840,
  steamBound: true,
  steamId: '76561198012345678',
  email: 'user@example.com',
  avatar: '../../assets/images/avatar-default.png',
  totalVaultRewards: 568.40,
  totalArbitrageProfit: 1234.56,
  monthlyProfit: [850, 920, 1050, 1150, 980, 1234]
};

// Mock Markets Data
export const mockMarkets: Market[] = [
  {
    id: 'buff',
    name: 'Buff163',
    currency: 'CNY',
    fee: 0.025,
    paymentMethods: ['支付宝', '微信支付', '银行卡']
  },
  {
    id: 'c5',
    name: 'C5游戏',
    currency: 'CNY',
    fee: 0.02,
    paymentMethods: ['支付宝', '银行卡']
  },
  {
    id: 'steam',
    name: 'Steam Market',
    currency: 'USD',
    fee: 0.15,
    paymentMethods: ['Steam钱包']
  },
  {
    id: 'skinport',
    name: 'Skinport',
    currency: 'USD',
    fee: 0.015,
    paymentMethods: ['PayPal', '信用卡']
  }
];

// Mock Dashboard Data
export const mockDashboardStats = {
  totalVolume: 2456789.50,
  avgCaseChange: 2.3,
  arbitrageOpportunities: 24,
  globalProfitIndex: 156.7,
  trendData: [
    { date: '10-19', volume: 2.1, profit: 145.2 },
    { date: '10-20', volume: 2.4, profit: 148.6 },
    { date: '10-21', volume: 2.0, profit: 142.8 },
    { date: '10-22', volume: 2.6, profit: 151.3 },
    { date: '10-23', volume: 2.3, profit: 149.5 },
    { date: '10-24', volume: 2.5, profit: 153.7 },
    { date: '10-25', volume: 2.7, profit: 156.7 }
  ]
};

// Mock Announcements
export const mockAnnouncements = [
  {
    id: '1',
    title: '新功能上线！',
    content: '质押功能现已全面上线，最高年化收益率达20%',
    date: '2025-10-25',
    type: 'feature'
  },
  {
    id: '2',
    title: '市场维护通知',
    content: '10月26日凌晨2:00-4:00进行系统维护',
    date: '2025-10-24',
    type: 'maintenance'
  },
  {
    id: '3',
    title: '新箱子预告',
    content: '暴击2025箱子即将上线，敬请期待',
    date: '2025-10-23',
    type: 'preview'
  }
];