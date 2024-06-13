import React from 'react'
interface Props{
    title:string
}
function LabelTitle({title}:Props) {
  return (
    <div>
      <h5>{title}</h5>
    </div>
  )
}

export default LabelTitle
