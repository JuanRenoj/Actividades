import React,{ReactNode} from 'react'
interface Props{
    children: ReactNode
}
function ModuleHeader({children}:Props) {
  return (
    <div className='div-header'>
     {
        children
     } 
    </div>
  )
}

export default ModuleHeader
