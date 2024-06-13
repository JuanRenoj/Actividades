import React,{ReactNode, useState} from 'react'
interface DropDownProps{
  title:string
 children?:ReactNode
}
function DropDownButton({title,children}:DropDownProps) {
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
       <span>{title} </span> <i className={`${open ? "bx bx-chevron-up":"bx bx-chevron-down"}`} ></i>
       </div>
      </div> 
  )
}

export default DropDownButton
