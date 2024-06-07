import React from 'react'
import { ActividadType } from '../../interfaces/Activadad'
import { ItemDate } from '../../util/ItemDate'
interface CardProps{
  item:ActividadType
}
function CardActividad ( {item}:CardProps) {
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
          <span>{item.hora}</span>        
        </div>
        <div className='card-footer'>          
        <span>{item.estado}</span>
        </div>
        </div>
      </div>
  )
}

export default CardActividad
