

interface Props{
   title:string;
   name:string;
   options?:{label:string; value:string}[];
   onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
const Input:React.FC<Props> = (props:any) => {
  const {title,options,name,onChange} =props
  return (
    <label className='input-label'>
        <small>{title || 'VIDEO PROVIDER'}</small><br/>
        <select name={name} onChange={onChange}>
         {
          options.map((option:{label:string; value:string},i:number) => 
          
          <option key={i} value={option.value}>{option.label}</option>)
         }
        </select>
    </label>
  )
}

export default Input