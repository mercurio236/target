import { TransactionTypes } from '@/utils/transactions-types'
import { View } from 'react-native'
import { s } from './styles'
import { Option } from './option'
import { colors } from '@/theme'

type Props = {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={s.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypes.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        icon="arrow-downward"
        title="Guardar"
        isSelected={selected === TransactionTypes.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  )
}
