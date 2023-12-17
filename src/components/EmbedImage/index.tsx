import React from 'react'
import Button from '../Button'
import {ReactComponent as Close} from '../../assets/times.svg'
import './embed-image.css'

const EmbedImage = () => {
  return (
    <section className='upload-section'>
          <h4>Embed <Button className='close_btn'><Close/></Button></h4>
          <p>Upload Image</p>
          <small>FILE UPLOAD</small>
          <div className='upload-area'>
           <label className='upload-btn hand'>
            <input type='file' style={{display:'none'}}/>
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