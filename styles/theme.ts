import { theme as chakraTheme, ITheme } from '@chakra-ui/core'

export const theme: ITheme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body:
      "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
  },
  fontSizes: {
    ...chakraTheme.fontSizes,
    xs: '14px',
    sm: '15px',
    md: '16px'
  }
}
