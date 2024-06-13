import React,{ReactNode,useState,ChangeEvent} from 'react'
import { GrupoType } from '../../interfaces/Grupo'
import style from "./stylesInputs/selectGroup.module.css"
interface Props{
    children?:ReactNode,
    item:GrupoType[],
   
    onClick:(params:string)=>void
    value:string 
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
    
    label:string
    disabled?:boolean
    required?:boolean
   }
function SelectGruop({item,value,onClick,onChange,label,disabled,required}:Props) {
    const [open, setopen] = useState<boolean>(false)
    setTimeout(()=>{
  if(open){
   // setopen(!open)
  }
    },10000)

   const closeDrop = (params:string) => {
     onClick(params)
    // setopen(!open)
   }
   
    
    const names= (integrantes:string):string[] => {
        console.log(integrantes)
      let result:string[]=[]
      if(integrantes !==undefined){
      result=integrantes.split(",");
      }
      return result
    }
    
    return (
  <div className={style.container}>
    
    <div className={style.wrap}>
     <label htmlFor="input">{label}</label>
     <div className={style.contentInputSelect}>
       <div className={style.inputSelect}>       
            <input  
            className={style.input}          
            value={value} 
            type="text"
            onChange={onChange} 
            disabled={disabled}
            required={required}
            />      
        </div>
      <div className={style.divButton} onClick={()=>setopen(!open)}>
            <i className={`${open ? "bx bx-chevron-up" : "bx bx-chevron-down"}`} ></i>
      </div>
    </div>
   
    </div>

   

    
    <div className={style.dropdown}>
          <div className={`${open ? style.open: style.close }`}>
            <div className={style.dropDownMenu}>
            {item.length > 0 ?
              item.map((data,index)=>(
                <div key={index} className={style.itemDropDown} onClick={()=>closeDrop(data.nombre)}>
                  <span className={style.optionDropDown} >
                 
                        {data.nombre}      
                  </span>
                  <div className={style.subMenuDropDown}>
                    {names(data.integrantres).map((xname)=>(
                      <span>{xname}</span>
            ))}
        </div>
     </div>
    )):null
    } 
       </div>
   
      
        </div> 
             
            </div>
          </div>
        

         
    )
}

export default SelectGruop
