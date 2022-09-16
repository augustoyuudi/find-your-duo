import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { GameCard, IGameCard } from '../../components/GameCard'
import { Background } from '../../components/Background'

export function Home() {
  const [games, setGames ] = useState<IGameCard[]>([])

  useEffect(() => {
    fetch('http://192.168.1.3:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  const navigation = useNavigation()

  function handleGameNavigation({ id, title, bannerUrl }: IGameCard) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleGameNavigation(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gamesList}
        />
      </SafeAreaView>
    </Background>
  )
}