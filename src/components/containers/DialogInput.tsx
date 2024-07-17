import React,{ChangeEvent, useState} from 'react'
interface Props{
onAccess:(tab:string,access:string)=>void,
closeToast:()=>void,
tab:string
}

function DialogInput({ onAccess, closeToast,tab}:Props) {
const [value, setValue] = useState<string>("")
   
        const handleClick = () => {
            
          onAccess(tab,value);
          closeToast();
        };
      
        return (
          <div className='div-comfirm'>
            <label className='title-confirm'>
         Ingrese el codigo de acceso
            </label>
            <div className='div-input-confirm'>  
            
         <input value={value} onChange={(e)=>setValue(e.target.value)} />
          <span role='button' className="btn-no" onClick={handleClick}>Aceptar</span>
            </div>
          </div>
        );
      }

export default DialogInput
