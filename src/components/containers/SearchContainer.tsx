import React, { ReactNode } from 'react'
interface Props{
    children:ReactNode
}
function SearchContainer({children}:Props) {
  return (
    <div className='div-search'>
      {
        children
      }
    </div>
  )
}

export default SearchContainer
