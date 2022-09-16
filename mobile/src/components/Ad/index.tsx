import { View } from 'react-native'
import { styles } from './style'
import { AdInfo } from '../AdInfo'

export function Ad() {
  return (
    <View style={styles.container}>
      <AdInfo
        label='Nome'
        value='Teste'
      />
    </View>
  )
}