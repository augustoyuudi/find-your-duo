import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import logo from './assets/logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { Input } from './components/Form/Input'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <main className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>
      <ul className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <li key={game.id}>
              <GameBanner
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
              />
            </li>
          )
        })}
      </ul>
      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

            <form className='mt-8 flex flex-col gap-4'>
              <fieldset className='flex flex-col gap-2'>
                <label htmlFor="game">Qual o game?</label>
                <Input id='game' placeholder='Selecione o game que deseja jogar' />
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
                      <label htmlFor="domingo" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>D</label>
                    </li>
                    <li>
                      <input id='segunda' type="checkbox" className='hidden peer' />
                      <label htmlFor="segunda" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>S</label>
                    </li>
                    <li>
                      <input id='terca' type="checkbox" className='hidden peer' />
                      <label htmlFor="terca" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>T</label>
                    </li>
                    <li>
                      <input id='quarta' type="checkbox" className='hidden peer' />
                      <label htmlFor="quarta" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>Q</label>
                    </li>
                    <li>
                      <input id='quinta' type="checkbox" className='hidden peer' />
                      <label htmlFor="quinta" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>Q</label>
                    </li>
                    <li>
                      <input id='sexta' type="checkbox" className='hidden peer' />
                      <label htmlFor="sexta" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>S</label>
                    </li>
                    <li>
                      <input id='sabado' type="checkbox" className='hidden peer' />
                      <label htmlFor="sabado" className='flex items-center justify-center w-8 h-8 rounded bg-zinc-900 peer-checked:bg-violet-500'>S</label>
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

              <fieldset className='mt-2 flex gap-2 text-sm' >
                <Input id='chat' type="checkbox" />
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
      </Dialog.Root>
    </main>
  )
}

export default App
