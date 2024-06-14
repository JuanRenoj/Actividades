import React,{useState,useEffect} from 'react'
import { ActividadType } from '../../interfaces/Activadad'
import { ItemDate } from '../../util/ItemDate'
import { DayInterval } from '../../util/DayInterva';
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
          <label htmlFor="">Lugar:</label>
          <span>{item.lugar}</span>
          <label htmlFor="">Hora:</label>
          <span>{`${item.hora} Hrs`}</span>   
         {/*   <span>{item.estado}</span>  */}    
        </div>
        <div className='card-footer'>          
        <span className='intervalDay'>{DayInterval(item.fecha,item.hora)}</span>
        </div>
        </div>
      </div>
  )
}

export default CardActividad
