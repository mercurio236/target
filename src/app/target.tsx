import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { Text, View } from 'react-native'

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" placeholder='Ex: Viagem para praia, Apple Watch'/>
        <Button title="Salvar" />
      </View>
    </View>
  )
}
