import { theme as chakraTheme, ITheme } from '@chakra-ui/core'

export const theme: ITheme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body:
      "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
  },
}
