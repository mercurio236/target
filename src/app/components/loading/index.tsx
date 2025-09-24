import { ActivityIndicator } from 'react-native'
import { s } from './styles'
import { colors } from '@/theme/colors'

export function Loading() {
  return <ActivityIndicator color={colors.blue[500]} style={s.container} />
}
