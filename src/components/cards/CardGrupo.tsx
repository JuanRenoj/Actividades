import React,{ReactNode} from 'react'

import { ItemDate } from '../../util/ItemDate'
import { GrupoType } from '../../interfaces/Grupo'
interface CardProps{
  item:GrupoType
  children:ReactNode
}
function CardGrupo ( {item,children}:CardProps) {

  return (
    <div className='card'>
        <div className='div-fecha'>
          
            <span className='span-fecha'><i className='bx bxs-group'></i></span>           
            
        </div>
        <div className='card-body'>
        <div className='card-header'>
          <span className='span-fecha ' >{item.nombre}</span>
       
        </div>
        <div className='card-info'>
          <span>{item.integrantres}</span>
        
        </div>
        <div className='card-footer'>          
          {children}
        </div>
        </div>
      </div>
  )
}

export default CardGrupo
