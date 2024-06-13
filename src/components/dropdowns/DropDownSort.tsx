import React,{ReactNode, useState} from 'react'
interface DropDownProps{
 children?:ReactNode
}
function DropDownSort({children}:DropDownProps) {
  const [open, setopen] = useState<boolean>(false)
  setTimeout(()=>{
if(open){
  setopen(!open)
}
  },10000)
  return (
<div className='drop-down'>
        <div className={`${open ? " open-sort ":"close-sort"}`}>
          <div className='menu-sort'>
          {children}
           
          </div>
        </div>
        <div className='div-button-sort btn-secondary-outline' onClick={()=>setopen(!open)}>
       <span>Ordenar </span> <i className='bx bx-sort-z-a' ></i>
       </div>
      </div> 
  )
}

export default DropDownSort
