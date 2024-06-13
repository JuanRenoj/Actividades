import React from 'react'
interface HeaderProps{
    open:boolean,
    setOpen:(params:boolean)=>void,
    titlePage?:string
}
function Header({open,setOpen,titlePage}:HeaderProps) {
    console.log("header",open)
  return (
    <div className='header' >
      <div className='div-menu'>
        <i className='bx bx-menu'  onClick={()=>setOpen(!open)} role='button'></i> 
        <span>Menu</span>
      </div>
      <div className='div-title-page'>
        <span>
            {titlePage}
        </span>
      
      </div>
   
    </div>
  )
}

export default Header
