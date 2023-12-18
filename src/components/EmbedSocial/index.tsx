import React, { useState } from 'react'
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
},
{
  label:'Twitter',
  value:'twitter'
},
{
  label:'Instagram',
  value:'instagram'
},
{
  label:'Tiktok',
  value:'tiktok'
}
]

interface Props{
    toggleModal:(view:string)=>void
}


const EmbedSocial:React.FC<Props> = (props) => {
  
  const {toggleModal} = props

  const [inputs,setInputs]=useState({platform:'',url:'',code:''});

  const [isEnabled,setIsEnabled]=useState(false);

  const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value,checked,type} = e.target;

    if(type==='checkbox') {
      checked ? setIsEnabled(true) : setIsEnabled(false)
      return
    }

      setInputs(inputs=>({
        ...inputs,[name]:value
      })
    )
  }

  const onEmbed = () =>{
    toggleModal('');
    console.log(isEnabled,inputs)
  }

  return (
    <section className='upload-section'>
      <h4>Embed <Button className='close_btn'><Close onClick={()=>props.toggleModal('')}/></Button></h4>

      <Input type='select' title='SOCIAL MEDIA PLATFORM' name='platform' value={inputs?.platform}  options={options} onChange={onChange}/>  
      <Input type='text' title='URL' name='url' value={inputs?.url} onChange={onChange}/>
      <Input type='text' title='CODE' name='code' value={inputs?.code} onChange={onChange}/>

      <div className='disable-div'>
        <small>Disable caption</small>
        <label style={{marginLeft:'auto'}} className='hand'>
          <input type='checkbox' className='toggle-check' name='isEnabled' style={{display:'none'}} onChange={onChange}/>
          
          <span className='toggle'></span>
        </label>
      </div>
      <div style={{marginTop:'.5rem'}}>
        <Button className='primary-btn' onClick={onEmbed}>Embed</Button>
        <Button className='default_btn'>Cancel</Button>
      </div>
    </section>
  )
}

export default EmbedSocial