import React from 'react'
interface HeaderProps{
    open:boolean,
    setOpen:(params:boolean)=>void
}
function Header({open,setOpen}:HeaderProps) {
    console.log("header",open)
  return (
    <div className='header' >
     <i className='bx bx-menu'  onClick={()=>setOpen(!open)} role='button'></i> 
     <span>Menu</span>
    </div>
  )
}

export default Header
