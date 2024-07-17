import React,{ReactNode} from 'react'

import { ItemDate } from '../../util/ItemDate'
import { TurnoType } from '../../interfaces/Turno';
import { DayInterval } from '../../util/DayInterva';

interface CardProps{
  item:TurnoType
  children?:ReactNode
  onClick:(ministrio:string,openModal:boolean,nameGroup:string)=>void
 
}
function CardTurnos ( {item,children,onClick}:CardProps) {
const date=ItemDate(item.fecha);
const encargados = (params:string) => {

  if(params !== undefined ){
    return params
  }
  return "No asignado"
  
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
          <span className='btn-group' >{`Delegado: ${encargados(item.delegados!)}`}</span>
          <span className='btn-group' onClick={()=>onClick("Lectores",true,item.lectores!)}>{`Lectores: ${encargados(item.lectores!)}`}</span>
          <span className='btn-group' onClick={()=>onClick("Ministros",true,item.ministros!)}>{`Ministros: ${encargados(item.ministros!)}`}</span>
          <span className='btn-group' onClick={()=>onClick("Monaguillos",true,item.monaguillos!)}>{`Monaguillos: ${encargados(item.monaguillos!)} `}</span>
          <span className='btn-group'>{`Coros: ${encargados(item.coros!)}`}</span> 
      

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

export default CardTurnos
