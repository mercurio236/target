import { Button } from '@/components/button'
import { List } from '@/components/list'
import { Loading } from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { Progress } from '@/components/progress'
import { Transaction, TransactionProps } from '@/components/transaction'
import { TransactionType } from '@/components/transaction-type'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase'
import { numberToCurrency } from '@/utils/numberToCurrency'
import { TransactionTypes } from '@/utils/transactions-types'
import dayjs from 'dayjs'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useState } from 'react'
import { Alert, View } from 'react-native'

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  })

  const params = useLocalSearchParams<{ id: string }>()
  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id),
      )
      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format('DD/MM/YYYY [às] HH:mm:ss'),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        })),
      )
    } catch (error) {
      Alert.alert('Error', 'Não foi possível carregar as informações.')
      console.log(error)
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDatails()
    const fetchTransitionsPromise = fetchTransactions()

    await Promise.all([fetchDetailsPromise, fetchTransitionsPromise])
    setIsFetching(false)
  }

  function handleTransactionRemove(id: string) {
    Alert.alert('Remover', 'Deseja realmente remover?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => transactionRemove(id),
      },
    ])
  }

  async function transactionRemove(id: string) {
    try {
      await transactionsDatabase.remove(Number(id))
      fetchData()
      Alert.alert('Transação', 'Transação removida com sucesso!')
    } catch (error) {
      Alert.alert('Error', 'Não foi possível remover a transação')
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar style='dark'/>
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
          <Transaction
            data={item}
            onRemove={() => handleTransactionRemove(item.id)}
          />
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
