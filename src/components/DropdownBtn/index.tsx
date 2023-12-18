import React from 'react'
import {ReactComponent as Image} from '../../assets/image.svg'
import {ReactComponent as Camera} from '../../assets/camera.svg'

import {ReactComponent as Plus} from '../../assets/plus.svg'
import Button from '../Button'
import './dropdown.css'

interface Props{
    toggleModal:(view:string)=>void
}
const DropDownBtn:React.FC<Props> = (props) => {

  const {toggleModal} = props
  return (
   <Button className='action-plus'>
        <Plus width={20} />
        <div className='drop-menu_'>
            <ul className='ul-embed'>
                <li>EMBEDS</li>
                <li onClick={()=>toggleModal('embedImage')}>
                    <Image/>
                    <span>
                        Picture<br/>
                        <small>jpeg, png</small>
                    </span>
                </li>
                <li onClick={()=>toggleModal('embedVideo')}>
                    <Camera/>
                    <span>
                        Video<br/>
                        <small>JW player,Youtube,Vimeo</small>
                    </span>
                </li>
                <li onClick={()=>toggleModal('embedSocial')}>
                    <Image/>
                    <span>
                        Social<br/>
                        <small>Instagram, Twitter, TikTok, Snapchat, Facebook</small>
                    </span>
                </li>
            </ul>
        </div>
    </Button>
  )
}

export default DropDownBtn