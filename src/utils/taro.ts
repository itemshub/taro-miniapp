import Taro from '@tarojs/taro'

/**
 * 显示 Toast 消息
 * @param title 消息内容
 * @param icon 图标类型
 * @param duration 持续时间
 */
export const showToast = (title: string, icon: 'success' | 'error' | 'loading' | 'none' = 'none', duration = 2000) => {
  Taro.showToast({
    title,
    icon,
    duration
  })
}

/**
 * 显示加载提示
 * @param title 加载提示文字
 */
export const showLoading = (title = '加载中...') => {
  Taro.showLoading({
    title
  })
}

/**
 * 隐藏加载提示
 */
export const hideLoading = () => {
  Taro.hideLoading()
}

/**
 * 显示模态对话框
 * @param title 标题
 * @param content 内容
 * @param showCancel 是否显示取消按钮
 */
export const showModal = (title: string, content: string, showCancel = true) => {
  return new Promise((resolve, reject) => {
    Taro.showModal({
      title,
      content,
      showCancel,
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: reject
    })
  })
}

/**
 * 页面跳转
 * @param url 跳转地址
 */
export const navigateTo = (url: string) => {
  Taro.navigateTo({ url })
}

/**
 * 页面重定向
 * @param url 跳转地址
 */
export const redirectTo = (url: string) => {
  Taro.redirectTo({ url })
}

/**
 * 返回上一页
 * @param delta 返回页面数
 */
export const navigateBack = (delta = 1) => {
  Taro.navigateBack({ delta })
}

/**
 * 切换到 Tab 页面
 * @param url Tab 页面地址
 */
export const switchTab = (url: string) => {
  Taro.switchTab({ url })
}

/**
 * 获取系统信息
 */
export const getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    Taro.getSystemInfo({
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 获取定位信息
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'wgs84',
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 设置存储数据
 * @param key 键
 * @param data 数据
 */
export const setStorage = (key: string, data: any) => {
  return Taro.setStorage({ key, data })
}

/**
 * 获取存储数据
 * @param key 键
 */
export const getStorage = (key: string) => {
  return Taro.getStorage({ key })
}

/**
 * 清除存储数据
 * @param key 键（可选，不传则清除所有）
 */
export const clearStorage = (key?: string) => {
  if (key) {
    return Taro.removeStorage({ key })
  } else {
    return Taro.clearStorage()
  }
}