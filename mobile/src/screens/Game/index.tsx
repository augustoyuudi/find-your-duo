import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles'
import { THEME } from '../../theme'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameRouteParams } from '../../@types/navigation'
import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'
import { Ad, IAd } from '../../components/Ad'
import { AdModal } from '../../components/AdModal'

export function Game() {
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameRouteParams
  const [ads, setAds] = useState<IAd[]>([])
  const [selectedAd, setSelectedAd] = useState('')

  function returnToPreviousView() {
    navigation.goBack()
  }

  function getDiscordByAdId(id: string) {
    fetch(`http://192.168.1.3:3333/ads/${id}/discord`)
      .then(response => response.json())
      .then(data => setSelectedAd(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.1.3:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={returnToPreviousView}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.logo_right} />
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Ad data={item} onConnect={() => getDiscordByAdId(item.id)} />
          )}
          horizontal
          style={styles.ads}
          contentContainerStyle={[
            ads.length > 0 ? styles.ad : styles.emptyAds,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyAd}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <AdModal
          discord={selectedAd}
          visible={selectedAd.length > 0}
          onClose={() => setSelectedAd('')}
        />
      </SafeAreaView>
    </Background>
  )
}