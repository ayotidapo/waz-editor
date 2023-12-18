import React from 'react'

import './input.css'
import Select from '../Select'

interface Props{
    title:string;
    name:string;
    value?:string;
    options?:{label:string; value:string}[];
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    type:string;
}

const Input:React.FC<Props> = (props) => {
   const {type, options, title ,...rest} = props

if (type ==='select') return(
    <Select title={title} options={options} {...rest}/>
)

return (
    <label className='input-label'>
        <small>{title}</small><br/>
        <input type='text'  className='input-x' {...rest}/>
    </label>
  )
}

export default Input