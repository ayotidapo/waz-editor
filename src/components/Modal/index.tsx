import './modal.css';

import cx from 'classnames';


interface Props {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClose?: () => void;

}

const Modal: React.FC<Props> = (props) => {
  const { open, onClose, className} = props;

  const onCloseModal = () => {
    onClose?.();
  };

  return (
    <div className={`close_modal_wrapper ${open && 'open_modal_wrapper'} `}>
   
      <section className={`modal_container ${className}`}>{props.children}</section>
    </div>
  );
};

export default Modal;
