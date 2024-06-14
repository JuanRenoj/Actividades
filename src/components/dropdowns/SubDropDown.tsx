import React,{useState} from 'react'
import { GrupoType } from '../../interfaces/Grupo'
import { GetNames } from '../../util/GetName'
interface Props{
    item:GrupoType[]
    onClick:(params:string)=>void
}
function SubDropDown({item,onClick}:Props) {




  return (
    <div>
    {item.length > 0 ?
    item.map((data,index)=>(
        <div key={index}>
        <span className='subOptionDown' onClick={()=>onClick(data.nombre)}>
        {data.nombre}      
        </span>
        <div>
            {GetNames(data.integrantres).map((xname)=>(
                <span>{xname}</span>
            ))}
        </div>
     </div>
    )):null
    }
     
   
    </div>
   
  )
}

export default SubDropDown
