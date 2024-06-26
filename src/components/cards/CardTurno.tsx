import React,{ReactNode} from 'react'

import { ItemDate } from '../../util/ItemDate'
import { TurnoType } from '../../interfaces/Turno';
import { DayInterval } from '../../util/DayInterva';

interface CardProps{
  item:TurnoType
  children:ReactNode
}
function CardTurno ( {item,children}:CardProps) {
const date=ItemDate(item.fecha);
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
          <span>{`Encargado: ${item.encargados}`}</span>

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
