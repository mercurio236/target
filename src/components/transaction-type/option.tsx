import { MaterialIcons } from '@expo/vector-icons'
import { ColorValue, Pressable, PressableProps, Text } from 'react-native'
import { s } from './styles'
import { colors } from '@/theme'

type Props = PressableProps & {
  isSelected: boolean
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  selectedColor: ColorValue
}

export function Option({
  icon,
  isSelected,
  selectedColor,
  title,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[s.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[s.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  )
}
