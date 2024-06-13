import React,{useState} from 'react'
interface ConfirmProps{
onDelete:(id:string)=>void,
closeToast:()=>void,
id:string
}

function Confirm({ onDelete, closeToast,id }:ConfirmProps) {

   
        const handleClick = () => {
          onDelete(id);
          closeToast();
        };
      
        return (
          <div className='div-comfirm'>
            <label className='title-confirm'>
           Esta de seguro de eliminar 
            </label>
            <div className='div-confirm-button'>  
            <span role='button' className="btn-no" onClick={closeToast}>No</span>
            <span role='button' className='btn-yes' onClick={handleClick}>Si</span>
          
            </div>
          </div>
        );
      }

export default Confirm
