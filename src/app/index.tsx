import { Button } from '@/components/button'
import { List } from '@/components/list'
import { Target } from '@/components/target'
import { View } from 'react-native'
import { HomeHeader } from '../components/home-header'
import { router } from 'expo-router'

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
}

const target = [
  {
    id: '0',
    name: 'Comprar uma cadeira ergonômica',
    current: '900,00',
    percentage: '75%',
    target: '1200,00',
  },
  {
    id: '1',
    name: 'Comprar uma cadeira ergonômica',
    current: '900,00',
    percentage: '75%',
    target: '1200,00',
  },
]

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <List
        data={target}
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
