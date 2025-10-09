import { Button } from '@/components/button'
import { CurrencyInput } from '@/components/currency-input'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function Target() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)

  const params = useLocalSearchParams<{ id?: string }>()
  const targetDatabase = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Atenção', 'Preencha o nome e o valor.')
    }

    if (params.id) {
    } else {
      create()
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount })
      Alert.alert('Nova Meta', 'Meta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          onChangeText={setName}
          value={name}
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
        />
        <CurrencyInput
          onChangeValue={setAmount}
          label="Valor alvo"
          value={amount}
        />
        <Button onPress={handleSave} title="Salvar" isProcessing={isLoading} />
      </View>
    </View>
  )
}
