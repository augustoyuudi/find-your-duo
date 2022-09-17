import { useState } from 'react'
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
  const [hasSelectedGame, setHasSelectedGame] = useState(false)

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <form className='mt-8 flex flex-col gap-4'>
          <fieldset className='flex flex-col gap-2'>
            <label htmlFor="game">Qual o game?</label>
            <Select.Root
              onValueChange={() => setHasSelectedGame(true)}
            >
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
            <Input id='name' placeholder='Como te chamam dentro do game?' />
          </fieldset>

          <div className='grid grid-cols-2 gap-6'>
            <fieldset className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
            </fieldset>
            <fieldset className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu discord?</label>
              <Input id='discord' type="text" placeholder='Usuário #0000' />
            </fieldset>
          </div>

          <div className='flex gap-6'>
            <fieldset className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ol className='grid grid-cols-4 gap-2'>
                <li>
                  <input id='domingo' type="checkbox" className='hidden peer' />
                  <label htmlFor="domingo" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>D</label>
                </li>
                <li>
                  <input id='segunda' type="checkbox" className='hidden peer' />
                  <label htmlFor="segunda" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>S</label>
                </li>
                <li>
                  <input id='terca' type="checkbox" className='hidden peer' />
                  <label htmlFor="terca" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>T</label>
                </li>
                <li>
                  <input id='quarta' type="checkbox" className='hidden peer' />
                  <label htmlFor="quarta" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>Q</label>
                </li>
                <li>
                  <input id='quinta' type="checkbox" className='hidden peer' />
                  <label htmlFor="quinta" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>Q</label>
                </li>
                <li>
                  <input id='sexta' type="checkbox" className='hidden peer' />
                  <label htmlFor="sexta" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>S</label>
                </li>
                <li>
                  <input id='sabado' type="checkbox" className='hidden peer' />
                  <label htmlFor="sabado" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500 peer-checked:text-white text-zinc-500'>S</label>
                </li>
              </ol>
            </fieldset>
            <fieldset className='flex flex-col gap-2 flex-1'>
              <label htmlFor="startHour">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input id='startHour' type="time" placeholder='De' />
                <Input id='endHour' type="time" placeholder='Até' />
              </div>
            </fieldset>
          </div>

          <fieldset className='mt-2 flex items-center gap-2 text-sm' >
            <Checkbox.Root id='chat' className='w-6 h-6 p-1 rounded bg-zinc-900'>
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