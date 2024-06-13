import React, { ReactNode } from 'react'
interface Props{
    children:ReactNode
}
function ContainerButtonSort({children}:Props) {
  return (
    <div   className='div-sort' >
      {children}
    </div>
  )
}

export default ContainerButtonSort  
