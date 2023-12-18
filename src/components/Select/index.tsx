

interface Props{
   title:string;
   options?:{label:string; value:string}[]
}
const Input:React.FC<Props> = (props:any) => {
  const {title,options} =props
  return (
    <label className='input-label'>
        <small>{title || 'VIDEO PROVIDER'}</small><br/>
        <select>
         {
          options.map((option:{label:string; value:string},i:number) => 
          
          <option key={i} value={option.value}>{option.label}</option>)
         }
        </select>
    </label>
  )
}

export default Input