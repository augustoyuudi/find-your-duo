import { View, TouchableOpacity, Text } from 'react-native'
import { GameController } from 'phosphor-react-native'
import { styles } from './style'
import { THEME } from '../../theme';
import { AdInfo } from '../AdInfo'

export interface IAd {
  id: string;
  endHour: string;
  startHour: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: IAd,
  onConnect: () => void
}

export function Ad({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <AdInfo
        label='Nome'
        value={data.name}
      />
      <AdInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <AdInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.startHour} - ${data.endHour}`}
      />
      <AdInfo
        label='Chamada de áudio'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onConnect()}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  )
}