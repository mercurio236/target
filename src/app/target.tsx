import { PageHeader } from '@/components/page-header'
import { Text, View } from 'react-native'

export default function Target() {
  return (
    <View style={{flex:1, padding:24}}>
      <PageHeader
        title="Meta"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <Text>Targer</Text>
    </View>
  )
}
