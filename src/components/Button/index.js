import React from 'react'

const Button = (
    {children,disabled}
) => {
  return (
    <button className='w-full h-full text-center bg-blue-500' disabled={disabled}>{children}</button>
  )
}

export default Button