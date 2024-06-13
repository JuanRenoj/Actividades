import React from 'react'
interface Props<T>{
    item:T
   
    onClick:(params:T)=>void
  
}
function ButtonEditar<T>({onClick,item}:Props<T>) {
  return (
    <button  className='btn-secondary' onClick={()=>onClick(item)}>
  <i className='bx bxs-edit'></i>
    </button>
  )
}

export default ButtonEditar