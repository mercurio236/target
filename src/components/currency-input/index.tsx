import { colors } from '@/theme'
import { Text, View } from 'react-native'
import Input, { CurrencyInputProps } from 'react-native-currency-input'
import { s } from './styles'

type Props = CurrencyInputProps & {
  label: string
}

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.label}>{label}</Text>
      <Input
        style={s.input}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter='.'
        separator=','
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  )
}
