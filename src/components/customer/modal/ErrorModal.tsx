import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import x_mark from '../../../assets/customer/images/x_mark.png';
import '../../../assets/customer/sass/components/_error.scss';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    content: string;
    buttonText: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose, title, content, buttonText }) => {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="error_modal">
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        style={{ position: 'absolute', right: 2, top: 2 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img src={x_mark} alt="" />
                    <h2>
                        {title}
                    </h2>
                    <p>
                        {content}
                    </p>
                    <button onClick={onClose} autoFocus className='submit_btn'>
                        {buttonText}
                    </button>
                </div>

            </Dialog>
        </React.Fragment>
    );
};

export default ErrorModal;
