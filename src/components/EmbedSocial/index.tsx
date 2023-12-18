import React from 'react'
import Button from '../Button'
import {ReactComponent as Close} from '../../assets/times.svg'
import Input from '../Input';



const options=[{
  label:'',
  value:''
},
{
  label:'Facebook',
  value:'facebook'
}]

interface Props{
    toggleModal:(view:string)=>void
}


const EmbedSocial:React.FC<Props> = (props) => {

  return (
    <section className='upload-section'>
      <h4>Embed <Button className='close_btn'><Close onClick={()=>props.toggleModal('')}/></Button></h4>

      <Input type='select' title='SOCIAL MEDIA PLATFORM' name='videoProvider' options={options} />  
      <Input type='text' title='URL' name='socialUrl' value={'socialUrl'} />
      <Input type='text' title='CODE' name='iframeCode' value={'www.fkfkkf.com'} />
      <div className='disable-div'>
        <small>Disable caption</small>
        <label style={{marginLeft:'auto'}} className='hand'>
          <input type='checkbox' className='toggle-check' style={{display:'none'}}/>
          
          <span className='toggle'></span>
        </label>
      </div>
      <div style={{marginTop:'.5rem'}}>
        <Button className='primary-btn'>Embed</Button>
        <Button className='default_btn'>Cancel</Button>
      </div>
    </section>
  )
}

export default EmbedSocial