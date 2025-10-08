import { Button } from '@/components/button'
import { CurrencyInput } from '@/components/currency-input'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { TransactionType } from '@/components/transaction-type'
import { TransactionTypes } from '@/utils/transactions-types'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input)
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput value={0} label="Valor (R$)" />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
        />
      </View>

      <Button title="Salvar" />
    </View>
  )
}
