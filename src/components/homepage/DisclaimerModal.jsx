import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import format from 'date-fns/format';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Disclaimer({open, setOpen, setAgree}) {
  const date = new Date()
  const changedDate = format(date, "E, LLL d, y")

  const handleClose = () => {
    setOpen(false);
  };

  function handleAgreement () {
    setAgree(true)
    handleClose()
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx = {{fontSize:"2rem"}}>{"Disclaimer for Unplug"}</DialogTitle>
        <DialogTitle>{`Date: ${changedDate}`}</DialogTitle>
        <DialogContent>
            <DialogContentText sx = {{color:"black"}}>
                1. The information contained on this website is for general purpose only and is not part of; hosted; or sponsored by the University of California of Santa Cruz.
            </DialogContentText>
            <DialogContentText sx = {{color:"black"}}>
                2. The owner of this website is not liable for your safety, well-being, damages, and trauma from any events from YOUR own interactions through this website.
            </DialogContentText>
            <DialogContentText sx = {{color:"black"}}>
                3. You acknowledge full responsiblity for your own actions. 
            </DialogContentText>
            <DialogContentText sx = {{color:"black"}}>
                4. For your safety, Always go in groups and only in meet in public places.
            </DialogContentText>
            <DialogContentText sx = {{color:"black"}}>
                5. Because this website doesn't check current active students, it is possible that alumni may have access to this website or other students allowing NON UCSC students access to post events or interact with the site.
            </DialogContentText>
            <DialogContentText >
            This website is for informational purposes only and does not constitute professional advice. The information provided on this website is not intended to be a substitute for professional advice, diagnosis, or treatment.

            We strive to keep the information on this website accurate and up-to-date, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is strictly at your own risk.

            In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.

            Through this website, you are able to link to other websites which are not under our control. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.

            The content of this website may be changed or updated without notice.

            By accessing and using this website, you accept and agree to the terms of this disclaimer. If you do not agree with any part of this disclaimer, please do not use this website.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx = {{width:"100%"}} variant="contained" onClick={() => handleAgreement()} >Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
