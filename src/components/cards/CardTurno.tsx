import React,{ReactNode} from 'react'

import { ItemDate } from '../../util/ItemDate'
import { TurnoType } from '../../interfaces/Turno';
import { DayInterval } from '../../util/DayInterva';

interface CardProps{
  item:TurnoType
  children:ReactNode
  type:"coro" | "delegado" | "ministros" | "monaguillos" | "lectores"
}
function CardTurno ( {item,children,type}:CardProps) {
const date=ItemDate(item.fecha);
const encargados = (params:string) => {
 
  if(params !== undefined ){
    return params
  }
  return "No definido"
  
}


  return (
    <div className='card'>
        <div className='div-fecha'>
            <span>{date.dayName}</span>
            <span className='span-fecha'>{date.day}</span>           
            <span>{date.monthName}</span>
            <span>{date.year}</span>
        </div>
        <div className='card-body'>
        <div className='card-header'>
          <span>{item.nombre}</span>
       
        </div>
        <div className='card-info'>
          <span>Lugar y Hora:</span>
          <span>{item.lugar}</span>
          <span>{`${item.hora} Hrs`}</span>   
            
          {type ==="delegado" ?   <span>{`Delegado: ${encargados(item.delegados!)}`}</span> : null }     
          {type ==="lectores" ?   <span>{`Lectores: ${encargados(item.lectores!)}`}</span> : null }     
          {type ==="ministros" ?   <span>{`Ministros: ${encargados(item.ministros!)}`}</span> : null }     
          {type ==="monaguillos" ?   <span>{`Monaguillos: ${encargados(item.monaguillos!)}`}</span> : null }     
          {type ==="coro" ?   <span>{`Coros: ${encargados(item.coros!)}`}</span> : null }   

           <span className='label-observacion'>{`Obs.: ${item.estado}`}</span>
           <span className='intervalDay'>{DayInterval(item.fecha,item.hora)}</span>
        </div>
      
        <div className='card-footer'>          
       {children}
        </div>
        </div>
      </div>
  )
}

export default CardTurno
