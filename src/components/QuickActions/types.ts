export interface QuickActionItem {
  id: string
  title: string
  description: string
  icon: string
  url?: string
  color: string
  badge?: number
  isEnabled?: boolean
}

export interface QuickActionsProps {
  items?: QuickActionItem[]
  columns?: number
  showBadges?: boolean
  onItemClick?: (item: QuickActionItem) => void
  customOrder?: string[]
  className?: string
}

export interface QuickActionsEvents {
  onItemClick?: (item: QuickActionItem) => void
}