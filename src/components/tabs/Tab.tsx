import React, { ReactNode } from 'react'
interface TabProps{
    children?:ReactNode
}
function Tab({children}:TabProps) {
  return (
    <div className='div-tabs'>
      {children}
    </div>
  )
}

export default Tab
