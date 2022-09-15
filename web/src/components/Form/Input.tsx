import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
  return (
    <input
      {...props}
      className='px-4 py-3 bg-zinc-900 rounded text-sm placeholder:text-zinc-500'
    />
  )
}