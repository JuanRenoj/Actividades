import React from 'react'
interface Props{
    title:string    
    onClick:(params:boolean)=>void
    showModal:boolean
}
function ButtonAdd({title,onClick,showModal}:Props) {
  return (
    <button  className='btn-secondary' onClick={()=>onClick(!showModal)}>
      {title}
    </button>
  )
}

export default ButtonAdd
