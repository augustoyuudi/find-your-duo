import { StatusBar } from 'react-native'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Home } from './src/screens/Home'
import { Background } from './src/components/Background'
import { Loader } from './src/components/Loader'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      { isFontsLoaded ? <Home /> : <Loader /> }
    </Background>
  );
}