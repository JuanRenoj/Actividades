import React, { useState } from 'react'
import perfil from "../../assets/img/fatima.jpg";
interface SideBarProps{
    open:boolean
    center:string 
    setCenter:(params:string)=>void
    setOpen:(params:boolean)=>void

}
function SideBar({open,center,setCenter,setOpen}:SideBarProps) {
    const [view, setView] = useState<boolean>(false);
   
     const MENU_ITEM="menu-item";
     const  ACTIVE="menu-item active"
    const handleCenter = (screen:string) => {
      setCenter(screen)
      setOpen(!open)
    }
    
    console.log("sidebar",open)
  return (
    <div className={`${open ? "sidebar open " : "sidebar"}`} >
        <div className='header-sidebar'>
            <span className='icon-close-menu' onClick={()=>setOpen(!open)}>
                <div className='line-one'></div>
                <div className='line-two'></div>
            </span>
            <img src={perfil} alt="img" className='img-sidebar'  />
            <span className='slogan-name'>Ministerios Liturgicos</span>
        </div>
    
        <div className='body-sidebar'>
            <ul className='menu'>
                <li className={`${center ==="Actividad" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Actividad")}>
                    <i className='bx bx-calendar'></i><span>Actividad</span></li>
                <li className='menu-item' onClick={()=>setView(!view)}>
                    <i className='bx bxs-group'></i>
                    <span>Ministerios</span>
                    <i className={`${view ? "bx bx-chevron-up":"bx bx-chevron-down"} icon-sub-menu`}></i>  
                </li>
                <div className={`${view ?"sub-menu sub-menu-open":"sub-menu"}`}>
                <ul >
                    <li className={`${center ==="Lectores" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Lectores")}>Lectores</li>
                    <li className={`${center ==="Coros" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Coros")}>Coros</li>
                    <li className={`${center ==="Delegados" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Delegados")}>Delegados</li>
                    <li className={`${center ==="Ministros" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Ministros")}>Ministros</li>
                    <li className={`${center ==="Monaguillos" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Monaguillos")}>Monaguillos</li>
                    
                                 </ul>
                </div>
              
                <li className={`${center ==="Documentos" ? ACTIVE:MENU_ITEM}`} onClick={()=>handleCenter("Documentos")}><i className='bx bxs-file'></i><span>Documentos</span></li>
            </ul>
        </div>
        <div className="footer-sidebar">
            <span>All Rights Reserved, 2024</span>
            <span>Created By @Juan_renoj</span>
            
        </div>
   
    </div>
  )
}

export default SideBar
