import { LinearGradient } from 'expo-linear-gradient'
import { s } from './styles'
import { colors } from '@/theme/colors'
import { Text, View } from 'react-native'
import { Separator } from '../separator'

export type HomeHeaderProps = {
  total: string
}

type Props = {
  data: HomeHeaderProps
}

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={s.container}
    >
      <View>
        <Text style={s.label}>Total que você possui</Text>
        <Text style={s.total}>{data.total}</Text>
      </View>
      <Separator color={colors.blue[400]}/>
    </LinearGradient>
  )
}
