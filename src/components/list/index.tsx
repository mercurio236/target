import {
  FlatListProps,
  ViewStyle,
  StyleProp,
  View,
  Text,
  FlatList,
} from 'react-native'
import { s } from './styles'
import { Separator } from '../separator'
import { colors } from '@/theme'

type Props<T> = FlatListProps<T> & {
  title: string
  emptyMessage?: string
  containerStyle?: StyleProp<ViewStyle>
}

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...rest
}: Props<T>) {
  return (
    <View style={[s.container, containerStyle]}>
      <Text style={s.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text style={s.empty}>{emptyMessage}</Text>}
        {...rest}
      />
    </View>
  )
}
