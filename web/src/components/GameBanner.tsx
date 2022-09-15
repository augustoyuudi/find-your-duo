interface Props {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: Props) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt="" />
      <p className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0' >
        <strong className='font-bold text-white'>{ props.title }</strong>
        <span className='block text-zinc-300 text-sm'>{ props.adsCount } anúncio(s) </span>
      </p>
    </a>
  )
}