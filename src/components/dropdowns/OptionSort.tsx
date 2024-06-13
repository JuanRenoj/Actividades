import React from 'react'
interface OptionSortProps{
    onClick:(params:string)=>void
    title:string    
    column:string
}
function OptionSort({title,column,onClick}:OptionSortProps) {
  return (
    <span onClick={()=>onClick(column)}>
    {title}
    </span>
  )
}

export default OptionSort
