import { View, Text } from '@tarojs/components'
import { PropsWithChildren } from 'react'
import './index.scss'

interface CardProps {
  title?: string
  subtitle?: string
  shadow?: 'none' | 'small' | 'medium' | 'large'
  border?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
  children?: PropsWithChildren
}

export default function Card({
  title,
  subtitle,
  shadow = 'medium',
  border = true,
  padding = 'medium',
  children
}: CardProps) {
  const className = `card card-shadow-${shadow} ${border ? 'card-border' : ''} card-padding-${padding}`
  
  return (
    <View className={className}>
      {(title || subtitle) && (
        <View className='card-header'>
          {title && <Text className='card-title'>{title}</Text>}
          {subtitle && <Text className='card-subtitle'>{subtitle}</Text>}
        </View>
      )}
      <View className='card-body'>
        {children}
      </View>
    </View>
  )
}