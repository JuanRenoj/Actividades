import React,{useState} from 'react'
import { GrupoType } from '../../interfaces/Grupo'
interface Props{
    item:GrupoType[]
    onClick:(params:string)=>void
}
function SubDropDown({item,onClick}:Props) {

const names= (integrantes:string):string[] => {
    console.log(integrantes)
  let result:string[]=[]
  if(integrantes !==undefined){
  result=integrantes.split(",");
  }
  return result
}


  return (
    <div>
    {item.length > 0 ?
    item.map((data,index)=>(
        <div key={index}>
        <span className='subOptionDown' onClick={()=>onClick(data.nombre)}>
        {data.nombre}      
        </span>
        <div>
            {names(data.integrantres).map((xname)=>(
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
