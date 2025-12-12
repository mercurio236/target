import { Button } from '@/components/button'
import { List } from '@/components/list'
import { Target, TargetProps } from '@/components/target'
import { Alert, StatusBar, View } from 'react-native'
import { HomeHeader } from '../components/home-header'
import { router, useFocusEffect } from 'expo-router'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { useCallback, useState } from 'react'
import { Loading } from '@/components/loading'
import { numberToCurrency } from '@/utils/numberToCurrency'

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
}

export default function Index() {
  const [isFetching, setIsFetching] = useState(true)
  const [targets, setTargets] = useState<TargetProps[]>([])
  const targetDatabase = useTargetDatabase()

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue()

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: numberToCurrency(item.amount),
      }))
    } catch (error) {
      Alert.alert('Erro', 'Não foi possivel carregar as metas.')
      console.log(error)
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets()

    const [targetData] = await Promise.all([targetDataPromise])

    setTargets(targetData)
    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        title="Metas"
        emptyMessage="Nenhuma meta. Clique em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}
