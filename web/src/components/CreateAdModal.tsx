import { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import { Check, GameController, CaretDown } from 'phosphor-react'
import { Input } from './Form/Input'

interface Props {
  games: Game[]
}

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal({ games }: Props) {
  const weekDays = [
    {
      id: 'domingo',
      label: 'D'
    },
    {
      id: 'segunda',
      label: 'S'
    },
    {
      id: 'terca',
      label: 'T'
    },
    {
      id: 'quarta',
      label: 'Q'
    },
    {
      id: 'quinta',
      label: 'Q'
    },
    {
      id: 'sexta',
      label: 'S'
    },
    {
      id: 'sabado',
      label: 'S'
    },
  ]

  const [selectedDays, setSelectedDays] = useState(new Set())
  const [isVoiceChatSelected, setIsVoiceChatSelected] = useState(false)

  function updateSelectedDays(value: number): void {
    selectedDays.add(value)
    setSelectedDays(selectedDays)
  }

  function toggleVoiceChat() {
    setIsVoiceChatSelected(!isVoiceChatSelected)
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    // TODO: validate data before form submission

    try {
      await fetch(`http://localhost:3333/games/${data.gameId}/ads`,{
        method: 'POST',
        body: JSON.stringify({
          ...data,
          yearsPlaying: Number(data.yearsPlaying),
          weekDays: Array.from(selectedDays),
          useVoiceChannel: isVoiceChatSelected
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      alert('Formulário enviado com sucesso!')
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[32rem] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <form className='mt-8 flex flex-col gap-4' onSubmit={onSubmit}>
          <fieldset className='flex flex-col gap-2'>
            <label htmlFor="game">Qual o game?</label>
            <Select.Root name='gameId'>
              <Select.Trigger
                className={`
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                bg-zinc-900
                  rounded
                  text-sm
                  select-placeholder:text-zinc-500
                text-white
                `}
              >
                <Select.Value placeholder='Selecione o game que deseja jogar' />
                <Select.Icon className='text-zinc-400'>
                  <CaretDown size={24} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className='bg-zinc-900 rounded shadow'>
                  <Select.Viewport>
                    {games.map(game => (
                      <Select.Item key={game.id} value={game.id} className='text-white px-4 py-3 hover:bg-zinc-800 hover:cursor-pointer'>
                        <Select.ItemText>{game.title}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </fieldset>

          <fieldset className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
          </fieldset>

          <div className='grid grid-cols-2 gap-6'>
            <fieldset className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
            </fieldset>
            <fieldset className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu discord?</label>
              <Input name='discord' id='discord' type="text" placeholder='Usuário #0000' />
            </fieldset>
          </div>

          <div className='flex gap-6'>
            <fieldset className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ol className='grid grid-cols-4 gap-2'>
                {weekDays.map((day, index) => (
                  <li key={day.id}>
                    <input
                      id={day.id}
                      type="checkbox"
                      className='hidden peer'
                      onChange={() => updateSelectedDays(index)}
                    />
                    <label htmlFor={day.id} className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>{day.label}</label>
                  </li>
                ))}
              </ol>
            </fieldset>
            <fieldset className='flex flex-col gap-2 flex-1'>
              <label htmlFor="startHour">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input name='startHour' id='startHour' type="time" placeholder='De' />
                <Input name='endHour' id='endHour' type="time" placeholder='Até' />
              </div>
            </fieldset>
          </div>

          <fieldset className='mt-2 flex items-center gap-2 text-sm' >
            <Checkbox.Root
              id='chat'
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              checked={isVoiceChatSelected}
              onCheckedChange={toggleVoiceChat}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="chat">Costumo me conectar ao chat de voz</label>
          </fieldset>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
            >
              Cancelar
            </Dialog.Close>
            <button
              type='submit'
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}