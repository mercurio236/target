import { Button } from '@/components/button'
import { CurrencyInput } from '@/components/currency-input'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <CurrencyInput value={0} label='Valor (R$)' />
        <Input label='Motivo (opcional)' placeholder='Ex: Investir em CDB de 110% no banco XPTO'/>
      </View>

      <Button title='Salvar'/>
    </View>
  )
}
