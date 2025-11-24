import { create } from 'zustand'

// 用户状态类型
interface UserState {
  userInfo: {
    id: string
    name: string
    avatar: string
    token: string
  } | null
  isLoggedIn: boolean
  login: (userInfo: UserState['userInfo']) => void
  logout: () => void
  updateUserInfo: (userInfo: Partial<UserState['userInfo']>) => void
}

// 应用状态类型
interface AppState {
  theme: 'light' | 'dark'
  language: 'zh-CN' | 'en-US'
  loading: boolean
  setTheme: (theme: AppState['theme']) => void
  setLanguage: (language: AppState['language']) => void
  setLoading: (loading: boolean) => void
}

// 计数器状态类型
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: (count: number) => void
}

// 用户 Store
export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  isLoggedIn: false,
  login: (userInfo) => set({ userInfo, isLoggedIn: true }),
  logout: () => set({ userInfo: null, isLoggedIn: false }),
  updateUserInfo: (userInfo) =>
    set((state) => ({
      userInfo: state.userInfo ? { ...state.userInfo, ...userInfo } : null
    }))
}))

// 应用 Store
export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  language: 'zh-CN',
  loading: false,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setLoading: (loading) => set({ loading })
}))

// 计数器 Store
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count })
}))