import React, { ReactNode } from 'react'
interface Props{
    children:ReactNode
}
function ContainerSelect({children}:Props) {
  return (
    <div className='container-select'>
      {children}
    </div>
  )
}

export default ContainerSelect
