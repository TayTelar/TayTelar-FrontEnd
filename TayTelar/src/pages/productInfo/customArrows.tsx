import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { InstallDesktop } from '@mui/icons-material';

export const CustomPrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} style={{ display: 'block', position: 'relative',top:'400px',left:'0', transform: 'rotate(270deg)', zIndex: 2 }}>
      <ArrowBackIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};

export const CustomNextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} style={{ display: 'block', position: 'absolute',top: '-5px', right: '60%', transform: 'rotate(270deg)', zIndex: 2 }}>
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};
export const CustomLeftArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} style={{ display: 'block', position: 'relative',transform:'45deg', zIndex: 2 }}>
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};
export const CustomRightArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} style={{ display: 'block', position: 'absolute',top: '-5px', right: '60%', transform: 'rotate(270deg)', zIndex: 2 }}>
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};
