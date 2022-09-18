import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Routes } from './src/routes'
import { Background } from './src/components/Background'
import { Loader } from './src/components/Loader'
import './src/services/notifications'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

export default function App() {
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    })

    return () => {
      if (getNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
      }

      if (responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])

  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      { isFontsLoaded ? <Routes /> : <Loader /> }
    </Background>
  );
}