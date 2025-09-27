import { Text, View } from 'react-native'
import { HomeHeader } from '../components/home-header'
import { Target } from '@/components/target'

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
}

const target = [{
  name: 'Comprar uma cadeira ergonômica',
  current: '900,00',
  percentage: '75%',
  target: '1200,00',
}]

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <Target data={target[0]} />
    </View>
  )
}
