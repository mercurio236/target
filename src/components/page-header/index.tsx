import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { s } from './styles'
import { router } from 'expo-router'
import { colors } from '@/theme'

type Props = {
  title: string
  subtitle?: string
  rightButton?: {
    onPress: VoidFunction
    icons: keyof typeof MaterialIcons.glyphMap
  }
}

export function PageHeader({ title, subtitle, rightButton }: Props) {
  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <MaterialIcons size={32} name="arrow-back" color={colors.black} />
        </TouchableOpacity>
        {rightButton && (
          <TouchableOpacity onPress={rightButton.onPress}>
            <MaterialIcons
              name={rightButton.icons}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={s.title}>{title}</Text>
      {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
    </View>
  )
}
