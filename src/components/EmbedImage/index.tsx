import React from 'react'
import Button from '../Button'
import {ReactComponent as Close} from '../../assets/times.svg'
import './embed-image.css'

interface Props{
    toggleModal:(view:string)=>void;
    previewImgFn:(file:any)=>void;
    embedImage:()=>void;
    previewImg?:string | ArrayBuffer | null | undefined
}

const EmbedImage:React.FC<Props> = (props) => {
const {previewImg,toggleModal,previewImgFn,embedImage} = props
  return (
    <section className='upload-section'>
          <h4>Embed <Button className='close_btn'><Close  onClick={()=>toggleModal('')}/></Button></h4>
          <p>Upload Image</p>
          <small>FILE UPLOAD</small>
          <div className='upload-area'>
           {previewImg ? 
            <img src={previewImg as string || ''} alt='preview-img' width={200} height={125}/> : 
            <label className='upload-btn hand'>
                    <input type='file' style={{display:'none'}} onChange={e=>previewImgFn(e.target.files?.[0])}/>
                    Import Image from Device
            </label>
           }
          
          </div>
          <div style={{marginTop:'.5rem'}}>
            <Button className='primary-btn' onClick={embedImage}>Embed</Button>
            <Button className='default_btn'>Cancel</Button>
          </div>
    </section>
  )
}

export default EmbedImage