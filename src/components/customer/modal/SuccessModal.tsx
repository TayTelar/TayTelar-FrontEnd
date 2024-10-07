import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../../../assets/customer/sass/components/_successmodal.scss';
import successImage from '../../../assets/customer/images/image-1.webp';
import rightImage from '../../../assets/customer/images/right_mark.png';
import { useNavigate } from 'react-router-dom';

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    content: string;
    buttonText: string;
    navigateTo?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, title, content, buttonText, navigateTo }) => {

    const navigate = useNavigate();

    const buttonClick = () => {
        if (navigateTo) {
            navigate(navigateTo); 
            onClose(); 
        } else {
            onClose(); 
        }
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableScrollLock={true}
            >
                <div className="success_modal">
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        style={{ position: 'absolute', right: 2, top: 2 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className="left">
                        <img src={successImage} alt="Success" />
                    </div>
                    <div className="right">
                        <img src={rightImage} alt="" />
                        <h3>
                            {title}
                        </h3>
                        <p>
                            {content}
                        </p>
                        <button onClick={buttonClick} autoFocus>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
};

export default SuccessModal;
