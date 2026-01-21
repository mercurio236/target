import { Button } from '@/components/button'
import { CurrencyInput } from '@/components/currency-input'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

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
      update()
    } else {
      create()
    }
  }

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount })
      Alert.alert('Sucesso!', 'Meta atualizada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert('Error', 'Não foi possível atualizar a meta')
      console.log(error)
      setIsLoading(false)
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

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id)
      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      Alert.alert('Error', 'Não foi possível carregar os detalhes da meta')
      console.log(error)
    }
  }

  function handleRemove() {
    if (!params.id) {
      return
    }

    Alert.alert('Remover', 'Deseja realmente remover?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: remove,
      },
    ])
  }

  async function remove() {
    try {
      setIsLoading(true)

      await targetDatabase.remove(Number(params.id))

      Alert.alert('Meta', 'Meta removida!', [
        { text: 'Ok', onPress: () => router.replace('/') },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a meta')
      console.log(error)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id))
    }
  }),
    [params.id]

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar style='dark'/>
      <PageHeader
        title="Meta"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
        rightButton={
          params.id ? { icons: 'delete', onPress: handleRemove } : undefined
        }
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
