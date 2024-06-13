import React,{ReactNode} from 'react'

import { ItemDate } from '../../util/ItemDate'
import { TurnoType } from '../../interfaces/Turno';
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
          <span>{item.lugar}</span>
          <span>{`${item.hora} Hr,    Estado: ${item.estado}`}</span>        
           <span>{item.encargados}</span>
        </div>
        <div className='card-footer'>          
       {children}
        </div>
        </div>
      </div>
  )
}

export default CardTurno
