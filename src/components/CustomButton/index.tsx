import { Button, View, Text } from '@tarojs/components'
import { PropsWithChildren } from 'react'
import './index.scss'

interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  full?: boolean
  onClick?: () => void
  children?: PropsWithChildren
}

export default function CustomButton({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  full = false,
  onClick,
  children
}: ButtonProps) {
  const className = `btn btn-${type} btn-${size} ${full ? 'btn-full' : ''}`
  
  return (
    <Button 
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Text className='loading-icon'>⏳</Text>}
      <Text className='btn-text'>{children}</Text>
    </Button>
  )
}