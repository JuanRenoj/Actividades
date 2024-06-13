import React, { ReactNode } from 'react'
interface DivProps{
    children:ReactNode
}
function DataContainer({children}:DivProps) {
  return (
    <div className='container-data'>
      {children}
    </div>
  )
}

export default DataContainer
