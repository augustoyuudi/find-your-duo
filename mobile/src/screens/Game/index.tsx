import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles'
import { THEME } from '../../theme'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameRouteParams } from '../../@types/navigation'
import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'

export function Game() {
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameRouteParams

  function returnToPreviousView() {
    navigation.goBack()
  }

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
      </SafeAreaView>
    </Background>
  )
}