import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { styles } from './styles'
import { Background } from '../../components/Background'
import { GameRouteParams } from '../../@types/navigation'

export function Game() {
  const route = useRoute()
  const game = route.params as GameRouteParams

  return (
    <Background>
      <SafeAreaView style={styles.container}>

      </SafeAreaView>
    </Background>
  )
}