import { useEffect, useState } from 'react';
import { View, Input, ScrollView, Image, Picker } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { mockSkins,mockCase } from '../../data/mockData';
import { SkinItem } from '../../types';
import './index.scss';
import { api_case, api_index } from '@/utils/request';
import { getSkinsById } from '@/utils/utils';

const Market = () => {
  const [skins, setSkins] = useState<any[]>(mockCase);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedRarity, setSelectedRarity] = useState('全部');
  const [selectedSource, setSelectedSource] = useState('全部');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'name'>('price');
  const [showFilters, setShowFilters] = useState(false);

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

  const categories = ['全部', 'AK', 'M4', 'AWP', 'USP', 'Pistol', 'Rifle'];
  const rarities = [
    '全部',
    'Consumer Grade',
    'Industrial Grade',
    'Restricted',
    'Classified',
    'Covert',
    'Contraband',
  ];
  const sources = ['全部', '箱子', '收藏', '限定'];
  const sortOptions = ['价格排序', '涨跌幅排序', '名称排序'];

  useReady(() => {
    console.log(skins,skins.length)
    Taro.setNavigationBarTitle({
      title: '饰品市场',
    });

    const instance = Taro.getCurrentInstance();
    const params = instance.router?.params;

    if (params?.search) {
      setSearchQuery(params.search);
      filterSkins(params.search, selectedCategory, selectedRarity, selectedSource);
    }
  });

  const filterSkins = (
    search: string = searchQuery,
    category: string = selectedCategory,
    rarity: string = selectedRarity,
    source: string = selectedSource
  ) => {
    let filtered = cases;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (skin:any) =>
          skin.name.toLowerCase().includes(lowerSearch) ||
          skin.id.toLowerCase().includes(lowerSearch)
      );
    }

    // if (category !== '全部') {
    //   filtered = filtered.filter((skin) => skin.category === category);
    // }

    // if (rarity !== '全部') {
    //   filtered = filtered.filter((skin) => skin.rarity === rarity);
    // }

    // 来源的筛选逻辑可按需要补充，此处保留原“实质内容不变”的前提

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'change':
          return b.change24h - a.change24h;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setCases(filtered);
  };

  const handleSearch = () => {
    filterSkins();
  };

  const handleSkinClick = (id: number) => {
    Taro.navigateTo({
      url: `/pages/skin-detail/index?id=${id}`,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      filterSkins(searchQuery, category, selectedRarity, selectedSource);
    }, 0);
  };

  const handleRarityChange = (rarity: string) => {
    setSelectedRarity(rarity);
    setTimeout(() => {
      filterSkins(searchQuery, selectedCategory, rarity, selectedSource);
    }, 0);
  };

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    setTimeout(() => {
      filterSkins(searchQuery, selectedCategory, selectedRarity, source);
    }, 0);
  };

  const handleSortChange = (e) => {
    const index = e.detail.value;
    const sortValue: 'price' | 'change' | 'name' =
      index === 0 ? 'price' : index === 1 ? 'change' : 'name';
    setSortBy(sortValue);
    setTimeout(() => {
      filterSkins();
    }, 0);
  };


  if(!indexData?.skins)
  {
    return (
      <View></View>
    )
  }
  

  return (
    <View className="market-page">
      {/* Header */}
      <View className="header">
        <View className="search-bar">
          <View className="search-input-wrapper" >
            <View className="search-icon">
              <View className="icon-search" />
            </View>
            <Input
              type="text"
              placeholder="搜索饰品..."
              value={searchQuery}
              onInput={(e) => setSearchQuery(e.detail.value)}
              onConfirm={handleSearch}
              className="search-input"
              // style={{width:"70%"}}
            />
          </View>

          {/* <View
            className="icon-button"
            onClick={() => setShowFilters(!showFilters)}
            style={{width:"20%"}}
          >
            筛选
          </View> */}

          {/* <View
            className="icon-button"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <View className={viewMode === 'grid' ? 'icon-list' : 'icon-grid'} />
          </View> */}
        </View>

        {/* Filter Panel */}
        {showFilters && (
          <View className="filter-panel">
            <View className="filter-section">
              <View className="filter-title">分类</View>
              <ScrollView scrollX className="filter-scroll">
                <View className="filter-buttons">
                  {categories.map((category) => (
                    <View
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`filter-button ${
                        selectedCategory === category ? 'active' : ''
                      }`}
                    >
                      {category}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="filter-section">
              <View className="filter-title">稀有度</View>
              <ScrollView scrollX className="filter-scroll">
                <View className="filter-buttons">
                  {rarities.map((rarity) => (
                    <View
                      key={rarity}
                      onClick={() => handleRarityChange(rarity)}
                      className={`filter-button ${
                        selectedRarity === rarity ? 'active' : ''
                      }`}
                    >
                      {rarity}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="filter-section">
              <View className="filter-title">来源</View>
              <View className="filter-buttons">
                {sources.map((source) => (
                  <View
                    key={source}
                    onClick={() => handleSourceChange(source)}
                    className={`filter-button ${
                      selectedSource === source ? 'active' : ''
                    }`}
                  >
                    {source}
                  </View>
                ))}
              </View>
            </View>

            <View className="filter-section">
              <View className="filter-title">排序</View>
              <Picker
                mode="selector"
                range={sortOptions}
                value={sortBy === 'price' ? 0 : sortBy === 'change' ? 1 : 2}
                onChange={handleSortChange}
              >
                <View className="sort-select">
                  {sortBy === 'price'
                    ? '价格排序'
                    : sortBy === 'change'
                    ? '涨跌幅排序'
                    : '名称排序'}
                </View>
              </Picker>
            </View>
          </View>
        )}
      </View>

      {/* Results Count */}
      <View className="results-count">
        <View className="count-text">找到 {skins.length} 个饰品</View>
      </View>

      {/* Skins List */}
      <ScrollView scrollY className="skins-list">
        {cases.length === 0 ? (
          <View className="empty-state">
            <View className="empty-text">没有找到匹配的饰品</View>
          </View>
        ) : viewMode === 'grid' ? (
          <View className="grid-view">
            {cases.map((skin:any) => (
              <View
                key={skin.id}
                onClick={() => handleSkinClick(skin.id)}
                className="grid-item"
              >
                <View className="item-image-wrapper">
                  <Image
                    src={skin.img_url}
                    className="item-image"
                    mode="aspectFill"
                  />
                  {/* <View className="favorite-button">
                    <View className="icon-star" />
                  </View>
                  <View className="quality-badge">
                    <View className="quality-text">{"quality"}</View>
                  </View> */}
                </View>

                <View className="item-content">
                  <View className="item-name">{skin.name}</View>
                  <View className="item-skin">{skin.id}</View>
                  <View className="item-footer">
                    <View className="item-price">
                      ${Number((getSkinsById(indexData.skins,skin.id) ? getSkinsById(indexData.skins,skin.id).price : 0  )).toFixed(2)}
                    </View>
                    <View
                      className={`item-change ${
                        skin?.change24h >= 0 ? 'positive' : 'negative'
                      }`}
                    >
                      <View
                        className={'icon-trending-up'}
                      />
                      ± {Number((getSkinsById(indexData.skins,skin.id) ? getSkinsById(indexData.skins,skin.id).averageSub*100 : 0  )).toFixed(2)}%
                    </View>

                    <View className="item-change">
                      {Number((getSkinsById(indexData.skins,skin.id) ? getSkinsById(indexData.skins,skin.id).offers : 0  )).toFixed(0)} Offers
                    </View>
                  
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="list-view">
            {skins.map((skin) => (
              <View
                key={skin.id}
                onClick={() => handleSkinClick(skin.id)}
                className="list-item"
              >
                <Image
                  src={skin.img_url}
                  className="list-item-image"
                  mode="aspectFill"
                />

                <View className="list-item-content">
                  <View className="list-item-name">{skin.name}</View>
                  <View className="list-item-skin">{skin.id}</View>

                  <View className="list-item-info">
                    <View className="list-item-price">
                      ¥{skin?.price.toFixed(2)}
                    </View>
                    <View
                      className={`list-item-change ${
                        skin?.change24h >= 0 ? 'positive' : 'negative'
                      }`}
                    >
                      <View
                        className={
                          skin?.change24h >= 0
                            ? 'icon-trending-up-small'
                            : 'icon-trending-down-small'
                        }
                      />
                      {Math.abs(skin?.change24h).toFixed(1)}%
                    </View>
                    <View className="list-item-id">{skin?.marketId}</View>
                  </View>
                </View>

                <View className="list-item-favorite">
                  <View className="icon-star-small" />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Market;
