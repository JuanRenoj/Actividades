import React, { FormEvent, ReactNode } from 'react'
    interface ModalProps{
        show:boolean,
        setShow:(params:boolean)=>void,
        onSubmit:(e: FormEvent<HTMLFormElement>)=>void
        children?:ReactNode,
        title:string
    }
function ModalDetail({show,setShow,onSubmit,children,title}:ModalProps) {

  return (
    <div className={`${show ? "modal show-modal" : "modal"}`}>
      <div className='modal-container'>
        <form onSubmit={onSubmit}   className='modal-content'  autoComplete='off'>
          
           <div className='modal-header'>
            <span>{title}</span>
            <span  ><i className='bx bx-x' onClick={()=>setShow(!show)}></i></span>
           </div>
           <div className='modal-body body-detail'>
            {children}
           </div>
           <div className='modal-footer'>
            <button className='btn-secondary-outline' onClick={()=>setShow(!show)}>Salir</button>
           
           </div>
        </form>
      </div>
        
      
    </div>
  )
}

export default ModalDetail
