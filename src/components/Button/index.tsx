import { Children } from 'react';
import './button.css';




interface Props {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClick?: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

}

const Button = (props:any) => {
  const { children, className:classname, ...rest} = props;


 

  return (
    <button {...rest} className={`button hand ${classname || ''}`}>
      {children}
    </button>
  );
};

export default Button;
