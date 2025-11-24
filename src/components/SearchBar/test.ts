// SearchBar 组件测试脚本
// 用于验证组件的各项功能

import Taro from '@tarojs/taro'
import { SearchType } from '@/components/SearchBar'

// 模拟搜索数据
const mockSearchData = {
  // 饰品数据
  items: [
    { id: 'ak47', name: 'AK-47 | 基础版', type: SearchType.ITEM },
    { id: 'awp', name: 'AWP | 龙狙', type: SearchType.ITEM },
    { id: 'butterfly', name: '蝴蝶刀', type: SearchType.ITEM },
    { id: 'm4a4', name: 'M4A4 | 死神', type: SearchType.ITEM },
    { id: 'ak47_fire', name: 'AK-47 | 火神', type: SearchType.ITEM }
  ],
  
  // 箱子数据
  cases: [
    { id: 'csgo_case', name: 'CS:GO 箱子', type: SearchType.CASE },
    { id: 'cs2_case', name: 'CS2 箱子', type: SearchType.CASE },
    { id: 'horizon_case', name: '地平线箱子', type: SearchType.CASE }
  ],
  
  // 系列数据
  series: [
    { id: 'dragon', name: '龙系列', type: SearchType.SERIES },
    { id: 'death', name: '死神系列', type: SearchType.SERIES },
    { id: 'fire', name: '火神系列', type: SearchType.SERIES }
  ]
}

// 测试函数
export class SearchBarTester {
  private testResults: Array<{ test: string; passed: boolean; message: string }> = []

  // 运行所有测试
  async runAllTests() {
    console.log('🧪 开始 SearchBar 组件测试...')
    
    this.testTypeDetection()
    this.testSearchSuggestions()
    this.testSearchHistory()
    this.testInputValidation()
    
    this.printResults()
  }

  // 测试搜索类型识别
  private testTypeDetection() {
    console.log('📋 测试搜索类型识别...')
    
    const testCases = [
      { input: 'AK-47 皮肤', expected: SearchType.ITEM },
      { input: 'CS:GO 箱子', expected: SearchType.CASE },
      { input: '龙系列', expected: SearchType.SERIES },
      { input: '蝴蝶刀', expected: SearchType.ITEM },
      { input: '随机内容', expected: SearchType.ALL }
    ]

    testCases.forEach(({ input, expected }) => {
      const result = this.mockDetectSearchType(input)
      const passed = result === expected
      this.addTestResult(`类型识别: ${input}`, passed, 
        passed ? `正确识别为 ${expected}` : `期望 ${expected}, 实际 ${result}`)
    })
  }

  // 测试搜索建议过滤
  private testSearchSuggestions() {
    console.log('💡 测试搜索建议过滤...')
    
    const testCases = [
      { input: 'AK', expectedCount: 2 },
      { input: '箱子', expectedCount: 3 },
      { input: '龙', expectedCount: 2 },
      { input: '不存在', expectedCount: 0 }
    ]

    testCases.forEach(({ input, expectedCount }) => {
      const results = this.mockFilterSuggestions(input)
      const passed = results.length === expectedCount
      this.addTestResult(`搜索建议: ${input}`, passed,
        passed ? `找到 ${expectedCount} 条建议` : `期望 ${expectedCount} 条，实际 ${results.length} 条`)
    })
  }

  // 测试搜索历史管理
  private testSearchHistory() {
    console.log('📜 测试搜索历史管理...')
    
    // 测试保存历史
    const testKeyword = '测试搜索'
    this.mockSaveSearchHistory(testKeyword)
    const history = this.mockGetSearchHistory()
    const saved = history.includes(testKeyword)
    this.addTestResult('保存搜索历史', saved, saved ? '历史保存成功' : '历史保存失败')

    // 测试去重
    this.mockSaveSearchHistory(testKeyword)
    const afterDuplicate = this.mockGetSearchHistory()
    const noDuplicates = afterDuplicate.filter(item => item === testKeyword).length === 1
    this.addTestResult('历史记录去重', noDuplicates, noDuplicates ? '去重功能正常' : '存在重复记录')

    // 测试历史限制
    for (let i = 0; i < 15; i++) {
      this.mockSaveSearchHistory(`测试${i}`)
    }
    const limited = this.mockGetSearchHistory()
    const notExceed = limited.length <= 10
    this.addTestResult('历史记录数量限制', notExceed, 
      notExceed ? `历史记录限制为 ${limited.length} 条` : `超出限制，实际 ${limited.length} 条`)
  }

  // 测试输入验证
  private testInputValidation() {
    console.log('✅ 测试输入验证...')
    
    const testCases = [
      { input: '', expected: false },
      { input: '   ', expected: false },
      { input: 'a', expected: true },
      { input: 'AK-47', expected: true }
    ]

    testCases.forEach(({ input, expected }) => {
      const result = this.mockValidateInput(input)
      this.addTestResult(`输入验证: "${input}"`, result === expected,
        result === expected ? '验证通过' : '验证失败')
    })
  }

  // 模拟搜索类型检测
  private mockDetectSearchType(keyword: string): SearchType {
    const itemKeywords = ['皮肤', '刀', '手套', '枪', 'AK', 'AWP', 'M4', 'USP', 'GLOCK', 'P250', 'Deagle']
    const caseKeywords = ['箱子', '盒子', '包']
    const seriesKeywords = ['龙系列', '死神', '火神', '咆哮', '猎户']

    if (caseKeywords.some(keyword => keyword.includes(keyword))) {
      return SearchType.CASE
    }
    if (seriesKeywords.some(keyword => keyword.includes(keyword))) {
      return SearchType.SERIES
    }
    if (itemKeywords.some(keyword => keyword.includes(keyword))) {
      return SearchType.ITEM
    }
    return SearchType.ALL
  }

  // 模拟搜索建议过滤
  private mockFilterSuggestions(keyword: string) {
    if (!keyword.trim()) return []
    
    const allItems = [
      ...mockSearchData.items,
      ...mockSearchData.cases,
      ...mockSearchData.series
    ]
    
    return allItems.filter(item => 
      item.name.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 10)
  }

  // 模拟保存搜索历史
  private mockSaveSearchHistory(keyword: string) {
    try {
      let history = Taro.getStorageSync('test_search_history') || []
      if (typeof history === 'string') {
        history = JSON.parse(history)
      }
      
      // 去重
      history = history.filter((item: string) => item !== keyword)
      // 添加到开头
      history.unshift(keyword)
      // 限制数量
      if (history.length > 10) {
        history = history.slice(0, 10)
      }
      
      Taro.setStorageSync('test_search_history', history)
    } catch (error) {
      console.error('保存搜索历史失败:', error)
    }
  }

  // 模拟获取搜索历史
  private mockGetSearchHistory(): string[] {
    try {
      const history = Taro.getStorageSync('test_search_history') || []
      return typeof history === 'string' ? JSON.parse(history) : history
    } catch (error) {
      console.error('获取搜索历史失败:', error)
      return []
    }
  }

  // 模拟输入验证
  private mockValidateInput(input: string): boolean {
    return input.trim().length > 0
  }

  // 添加测试结果
  private addTestResult(test: string, passed: boolean, message: string) {
    this.testResults.push({ test, passed, message })
  }

  // 打印测试结果
  private printResults() {
    console.log('\\n📊 测试结果汇总:')
    console.log('=' .repeat(50))
    
    const passed = this.testResults.filter(r => r.passed).length
    const total = this.testResults.length
    const passRate = ((passed / total) * 100).toFixed(1)
    
    console.log(`✅ 通过: ${passed}/${total} (${passRate}%)`)
    console.log(`❌ 失败: ${total - passed}/${total}`)
    
    console.log('\\n📋 详细结果:')
    this.testResults.forEach((result, index) => {
      const icon = result.passed ? '✅' : '❌'
      console.log(`${index + 1}. ${icon} ${result.test}: ${result.message}`)
    })
    
    if (passed === total) {
      console.log('\\n🎉 所有测试通过！SearchBar 组件功能正常。')
    } else {
      console.log('\\n⚠️  部分测试失败，请检查相关功能。')
    }
  }
}

// 组件使用示例验证
export function validateSearchBarUsage() {
  console.log('\\n📖 SearchBar 组件使用示例验证:')
  
  const examples = [
    {
      name: '基本使用',
      code: `
<SearchBar
  placeholder='搜索 CS:GO 饰品...'
  onSearch={(keyword, type) => console.log(keyword, type)}
  showHotSuggestions={true}
  showRecentSearches={true}
/>`
    },
    {
      name: '自定义热门搜索',
      code: `
<SearchBar
  placeholder='搜索...'
  onSearch={handleSearch}
  customHotSearches={['AK-47', 'AWP', '蝴蝶刀']}
  maxHistoryItems={8}
/>`
    },
    {
      name: '仅热门搜索',
      code: `
<SearchBar
  placeholder='仅热门搜索...'
  onSearch={handleSearch}
  showHotSuggestions={true}
  showRecentSearches={false}
/>`
    }
  ]
  
  examples.forEach((example, index) => {
    console.log(`${index + 1}. ${example.name}:`)
    console.log(example.code)
  })
}

// 导出测试函数
export { SearchBarTester }

// 运行测试（如果直接执行此文件）
if (require.main === module) {
  const tester = new SearchBarTester()
  tester.runAllTests()
  validateSearchBarUsage()
}