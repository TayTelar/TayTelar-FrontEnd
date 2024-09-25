
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CustomPrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{ 
        display: 'block', 
        position: 'relative',
        top: '480px',
        left: '0',
        transform: 'rotate(270deg)',
        zIndex: 10
      }}
    >
      <ArrowBackIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};

export const CustomNextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        position: 'absolute',
        top: '-5px',
        right: '60%',
        transform: 'rotate(270deg)',
        zIndex: 2
      }}
    >
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};

export const CustomLeftArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        position: 'absolute',
        transform: 'rotate(180deg)',
        left:'2rem',
       
        zIndex: 2
      }}
    >
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '25px'}} />
    </div>
  );
};

export const CustomRightArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        position: 'absolute',
        top: '-5px',
        right: '60%',
        transform: 'rotate(270deg)',
        zIndex: 2
      }}
    >
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '16px' }} />
    </div>
  );
};
