import './modal.css';

import cx from 'classnames';


interface Props {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  toggleModal?: (view:string) => void;

}

const Modal: React.FC<Props> = (props) => {
  const { open, toggleModal, className} = props;

 

  return (
    <div className={`close_modal_wrapper ${open && 'open_modal_wrapper'} `} >
   
      <section className={`modal_container ${className}`}>{props.children}</section>
    </div>
  );
};

export default Modal;
