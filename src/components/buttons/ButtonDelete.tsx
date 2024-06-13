import React from 'react'
interface Props<T>{
    item:T

    onClick:(params:T)=>void
  
}
function ButtonDelete<T>({onClick,item}:Props<T>) {
  return (
    <button  className='btn-secondary-outline' onClick={()=>onClick(item)}>
      <i className='bx bxs-trash-alt'></i>
    </button>
  )
}

export default ButtonDelete