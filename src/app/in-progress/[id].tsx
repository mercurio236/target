import { Button } from '@/components/button'
import { List } from '@/components/list'
import { PageHeader } from '@/components/page-header'
import { Progress } from '@/components/progress'
import { Transaction } from '@/components/transaction'
import { router, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

const details = {
  current: 'R$ 580,00',
  target: 'R$ 1790,00',
  percentage: 25,
}

const transactions = [
  {
    id: '1',
    value: 'R$ 300,00',
    date: '12/04/25',
    description: 'CDB de 110% do banco XTPO',
    type: 'input',
  },
]

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icons: 'edit',
          onPress: () => {},
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button title='Nova transações' onPress={() => router.navigate(`/transaction/${params.id}`)}/>
    </View>
  )
}
