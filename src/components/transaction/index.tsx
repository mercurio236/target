import { TransactionTypes } from '@/utils/transactions-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { s } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/theme'

export type TransactionProps = {
  id: string
  value: string
  date: string
  description?: string
  type: TransactionTypes
}

type Props = {
  data: TransactionProps
  onRemove: VoidFunction
}

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={s.container}>
      <MaterialIcons
        name={
          data.type === TransactionTypes.Input
            ? 'arrow-upward'
            : 'arrow-downward'
        }
        size={20}
        color={
          data.type === TransactionTypes.Input
            ? colors.blue[500]
            : colors.red[400]
        }
      />
      <View style={s.info}>
        <Text style={s.value}>{data.value}</Text>
        <Text style={s.description} numberOfLines={1}>
            {data.date} {data.description && `• ${data.description}`}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons name='close' size={18} color={colors.gray[500]}/>
      </TouchableOpacity>
    </View>
  )
}
