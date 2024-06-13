import React from 'react'
interface OptionProps{
    tabActive:string
    value:string
    onClick:(params:string)=>void
    nameTab:string
}
function OptionTab({tabActive,onClick,nameTab,value}:OptionProps) {
  return (
    <span className={`${tabActive===value ? "tab-active":""}`} onClick={()=>onClick(value)}>
      {nameTab}
    </span>
  )
}

export default OptionTab
