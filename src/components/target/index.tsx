import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { s } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

export type TargetProps = {
  id?: string
  name: string
  percentage: string
  current: string
  target: string
}

type Props = TouchableOpacityProps & {
  data: TargetProps
}

export function Target({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <View style={s.content}>
        <Text style={s.name} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={s.status}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>

      <MaterialIcons name='chevron-right' size={20}/>
    </TouchableOpacity>
  )
}
