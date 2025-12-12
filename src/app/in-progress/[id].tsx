import { Button } from '@/components/button'
import { List } from '@/components/list'
import { Loading } from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { Progress } from '@/components/progress'
import { Transaction } from '@/components/transaction'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { numberToCurrency } from '@/utils/numberToCurrency'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, Text, View } from 'react-native'

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
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  })

  const params = useLocalSearchParams<{ id: string }>()
  const targetDatabase = useTargetDatabase()

  async function fetchDatails() {
    try {
      const response = await targetDatabase.show(Number(params.id))
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      })
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.')
      console.log(error)
    }
  }

  async function fetchData(){
    const fetchDetailsPromise = fetchDatails()

    await Promise.all([fetchDetailsPromise])
    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if(isFetching){
    return <Loading/>
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icons: 'edit',
          onPress: () => router.navigate(`/target?id=${params.id}`),
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

      <Button
        title="Nova transações"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  )
}
