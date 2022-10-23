import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingCircle = ({loadingState}) => {
  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loadingState}
    >
    <CircularProgress color="inherit" />
    </Backdrop>
  )
}

