import React from 'react'
import Button from '../Button'
import {ReactComponent as Close} from '../../assets/times.svg'
import Input from '../Input';



const options=[{
  label:'',
  value:''
},
{
  label:'Youtube',
  value:'youtube'
}]


interface Props{
    toggleModal:(view:string)=>void
}

const EmbedVideo:React.FC<Props> = (props) => {
  return (
    <section className='upload-section'>
      <h4>Embed <Button className='close_btn'><Close  onClick={()=>props.toggleModal('')}/></Button></h4>

      <Input type='select' title='VIDEO PROVIDER' name='videoProvider' options={options} />
      
      <Input type='text' title='URL' name='videoUrl' value={'videoUrl'} />

       
      
      <div style={{marginTop:'.5rem'}}>
        <Button className='primary-btn'>Embed</Button>
        <Button className='default_btn'>Cancel</Button>
      </div>
    </section>
  )
}

export default EmbedVideo