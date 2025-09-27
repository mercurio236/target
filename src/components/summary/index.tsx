import { ColorValue, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { s } from './styles'

export type SummaryProps = {
  label: string
  value: string
}

type Props = {
  data: SummaryProps
  icon: {
    name: keyof typeof MaterialIcons.glyphMap
    color: ColorValue
  }
  isLeft?: boolean
}

export function Summary({ data, icon, isLeft = false }: Props) {
  return (
    <View style={s.container}>
      <View style={[s.header, isLeft && {justifyContent:'flex-end'}]}>
        <MaterialIcons name={icon.name} color={icon.color} />
        <Text style={s.label}>{data.label}</Text>
      </View>
      <Text style={s.value}>{data.value}</Text>
    </View>
  )
}
