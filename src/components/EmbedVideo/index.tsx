import React, { useState } from 'react'
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
},
{
  label:'Vimeo',
  value:'vimeo'
}
]


interface Props{
    toggleModal:(view:string)=>void;
    insertEmbed:(url:string,type:string)=>void;
}

const EmbedVideo:React.FC<Props> = (props) => {

  const {insertEmbed, toggleModal}=props

  const [inputs,setInputs]=useState({videoProvider:'',videoUrl:''});

  const {videoProvider, videoUrl} = inputs

  const onEmbed =()=>{
    insertEmbed('video','https://www.youtube.com/watch?v=t12a6z090AU');
    toggleModal('')
    console.log(inputs)
  }


   const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name,value} = e.target
   
        setInputs(inputs=>({
          ...inputs,[name]:value
        })
      )
   }



  return (
    <section className='upload-section'>
      <h4>Embed <Button className='close_btn'><Close  onClick={()=>toggleModal('')}/></Button></h4>

      <Input type='select' title='VIDEO PROVIDER' name='videoProvider' value={videoProvider} options={options} onChange={onChange}/>
      
      <Input type='text' title='URL' name='videoUrl' value={videoUrl} onChange={onChange}/>

       
      
      <div style={{marginTop:'.5rem'}}>
        <Button className='primary-btn' onClick={onEmbed}>Embed</Button>
        <Button className='default_btn'>Cancel</Button>
      </div>
    </section>
  )
}

export default EmbedVideo