import React, { ChangeEvent } from 'react'
interface InputProps{
    value:string 
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
    type:"number"|"text"|"datte"|"radio"|"datetime-local"|"time"|"date"
    label:string
    disabled?:boolean
    required?:boolean
}
function TextInput({value,onChange,type,label,required,disabled}:InputProps) {
  return (
    <div className='div-input'>
        <label htmlFor="input">{label}</label>
        <input 
        value={value} 
        type={type} 
        onChange={onChange} 
        disabled={disabled}
        required={required}
        />
      
    </div>
  )
}

export default TextInput
