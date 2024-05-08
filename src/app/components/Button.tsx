'use client'

type ButtonPropsType = {
  type: 'submit' | 'reset' | 'button'
  text: string
  color?: 'success'
  onClick?: () => {}
}

const buttonColors = {
  success: 'bg-cyan-500'
}

const Button = (props: ButtonPropsType) => {
  const { type, text, color, onClick } = { ...props }

  return (
    <>
      <button 
        className={`py-2 px-5 rounded-md hover:opacity-75 ${color ? buttonColors[color] : ''}`} 
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

export default Button