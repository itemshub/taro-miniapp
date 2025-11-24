import { defineConfig } from '@tarojs/cli'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default defineConfig({
  projectName: 'taro-project',
  date: '2025-10-25',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-platform-h5',
    '@tarojs/plugin-platform-weapp',
    '@tarojs/plugin-platform-alipay',
    '@tarojs/plugin-platform-swan',
    '@tarojs/plugin-platform-tt',
    '@tarojs/plugin-platform-qq',
    '@tarojs/plugin-platform-jd',
    '@tarojs/plugin-framework-react'
  ],
  defineConstants: {},
  alias: {
    '@/components': resolve(__dirname, 'src/components'),
    '@/utils': resolve(__dirname, 'src/utils'),
    '@/store': resolve(__dirname, 'src/store'),
    '@/styles': resolve(__dirname, 'src/styles'),
    '@/types': resolve(__dirname, 'src/types'),
    '@/assets': resolve(__dirname, 'src/assets'),
    '@/pages': resolve(__dirname, 'src/pages')
  },
  copy: {
    patterns: [
      {
        from: 'src/assets',
        to: 'dist/assets'
      }
    ],
    options: {}
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: true
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false
        config: {
          namingPattern: 'module', // 转换模式
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: true, // 默认为 false
        config: {
          namingPattern: 'module', // 转换模式
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    devServer: {
      port: 10086,
      open: false,
      host: '0.0.0.0',
      https: false
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: true
      }
    }
  }
})