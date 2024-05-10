'use client'

import { MouseEventHandler } from 'react'

type ButtonPropsType = {
  type: 'submit' | 'reset' | 'button'
  title: string
  color?: 'success'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const buttonColors = {
  success: 'bg-cyan-500',
}

const Button = (props: ButtonPropsType) => {
  const { type, title, color, onClick } = { ...props }

  return (
    <>
      <button
        className={`py-2 px-5 rounded-md hover:opacity-75 ${color ? buttonColors[color] : ''}`}
        type={type}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  )
}

export default Button
