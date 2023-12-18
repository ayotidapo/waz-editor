import React from 'react'
import Button from '../Button'
import {ReactComponent as Close} from '../../assets/times.svg'
import './embed-image.css'

interface Props{
    toggleModal:(view:string)=>void;
    uploadImageFn:(file:any)=>void;
}

const EmbedImage:React.FC<Props> = (props) => {
const {toggleModal,uploadImageFn} = props
  return (
    <section className='upload-section'>
          <h4>Embed <Button className='close_btn'><Close  onClick={()=>toggleModal('')}/></Button></h4>
          <p>Upload Image</p>
          <small>FILE UPLOAD</small>
          <div className='upload-area'>
           <label className='upload-btn hand'>
            <input type='file' style={{display:'none'}} onChange={e=>uploadImageFn(e.target.files?.[0])}/>
            Import Image from Device
           </label>
          </div>
          <div style={{marginTop:'.5rem'}}>
            <Button className='primary-btn'>Embed</Button>
            <Button className='default_btn'>Cancel</Button>
          </div>
    </section>
  )
}

export default EmbedImage