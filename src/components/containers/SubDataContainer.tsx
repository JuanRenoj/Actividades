import { ChildProcess } from 'child_process'
import React, { ReactNode } from 'react'
interface Props{
    children:ReactNode
}
function SubDataContainer({children}:Props) {
  return (
    <div className='subcontainer-data'>
      {children}
    </div>
  )
}

export default SubDataContainer
