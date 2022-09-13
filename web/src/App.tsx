import { MagnifyingGlassPlus } from 'phosphor-react'
import logo from './assets/logo.svg'

function App() {
  return (
    <main className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>
      <ul className='grid grid-cols-6 gap-6 mt-16'>
        <li>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/lol.png" alt="" />
            <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
              <strong className='font-bold text-white'>League of legends</strong>
              <span className='block text-zinc-300 text-sm'>4 anúncios</span>
            </p>
          </a>
        </li>
        <li>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/lol.png" alt="" />
            <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
              <strong className='font-bold text-white'>League of legends</strong>
              <span className='block text-zinc-300 text-sm'>4 anúncios</span>
            </p>
          </a>
        </li>
        <li>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/lol.png" alt="" />
            <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
              <strong className='font-bold text-white'>League of legends</strong>
              <span className='block text-zinc-300 text-sm'>4 anúncios</span>
            </p>
          </a>
        </li>
        <li>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/lol.png" alt="" />
            <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
              <strong className='font-bold text-white'>League of legends</strong>
              <span className='block text-zinc-300 text-sm'>4 anúncios</span>
            </p>
          </a>
        </li>
        <li>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/lol.png" alt="" />
            <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
              <strong className='font-bold text-white'>League of legends</strong>
              <span className='block text-zinc-300 text-sm'>4 anúncios</span>
            </p>
          </a>
        </li>
        <li>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/lol.png" alt="" />
            <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
              <strong className='font-bold text-white'>League of legends</strong>
              <span className='block text-zinc-300 text-sm'>4 anúncios</span>
            </p>
          </a>
        </li>
      </ul>
      <div className='bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 pt-1'>
        <section className='bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black'>Não encontrou seu duo?</strong>
            <p className='text-zinc-400'>Publique um anúncio para encontrar novos players!</p>
          </div>
          <button className='px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </section>
      </div>
    </main>
  )
}

export default App
