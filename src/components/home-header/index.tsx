import { LinearGradient } from 'expo-linear-gradient'
import { s } from './styles'
import { colors } from '@/theme/colors'
import { Text, View } from 'react-native'
import { Separator } from '../separator'
import { Summary } from '../summary'

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
      <Separator color={colors.blue[400]} />
      <View style={s.summary}>
        <Summary
          data={{ label: 'Entradas', value: 'R$ 6,184.90' }}
          icon={{ name: 'arrow-upward', color: colors.green[500] }}
        />
        <Summary
          isLeft
          data={{ label: 'Saídas', value: '-R$ 883.65' }}
          icon={{ name: 'arrow-downward', color: colors.red[400] }}
        />
      </View>
    </LinearGradient>
  )
}
