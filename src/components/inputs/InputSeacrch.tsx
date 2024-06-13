import React, { ChangeEvent } from 'react'
interface Props{
    value:string    
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
function InputSeacrch({value,onChange}:Props) {
  return (
<div className='div-input-search'>
    <i className='bx bx-search icon-search'></i>
    <input type='search'className='input-search' value={value} onChange={onChange} />
</div> 
  )
}

export default InputSeacrch
