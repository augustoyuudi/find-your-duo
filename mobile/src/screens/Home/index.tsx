import { useState, useEffect } from 'react'
import { View, Image, FlatList } from 'react-native'
import { styles } from './styles'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { GameCard, IGameCard } from '../../components/GameCard'

export function Home() {
  const [games, setGames ] = useState<IGameCard[]>([])

  useEffect(() => {
    fetch('http://192.168.1.3:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard
            data={item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gamesList}
      />
    </View>
  )
}