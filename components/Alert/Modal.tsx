import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({children }) => {
    return ReactDOM.createPortal(
        <div>
            {children}
        </div>,
        document.body
    );
};

export default Modal;