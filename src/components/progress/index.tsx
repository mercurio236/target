import { Text, View } from 'react-native'
import { s } from './styles'

type SaveValue = {
  current: string
  target: string
  percentage: number
}

type Props = {
  data: SaveValue
}

export function Progress({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.label}>Valor guardado</Text>

      <View style={s.status}>
        <Text style={s.value}>
          {data.current}
          <Text style={s.target}> de {data.target}</Text>
        </Text>
        <Text style={s.percentage}>{data.percentage.toFixed(0)}%</Text>
      </View>
      <View style={s.progress}>
        <View style={[s.currentProgress, { width: `${data.percentage}%` }]} />
      </View>
    </View>
  )
}
