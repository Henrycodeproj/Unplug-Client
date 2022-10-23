import axios from "axios"
import "./ReportOption.css"
import { accountContext } from "../../../Contexts/appContext";
import { useState, useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ReportIcon from '@mui/icons-material/Report';

export const ReportOption = ({post, reportOpen, setReportOpen}) => {

  const {user} = useContext(accountContext)

  const [reason, setReason] = useState('')

  const handleReportClose = () => {
    setReportOpen(false)
  };

  const sendReport = async (postID) =>{
    console.log(postID)
    const Url = `http://localhost:3001/posts/report/${postID}`
    const response = await axios.post(Url, {
      headers:{
        "authorization":localStorage.getItem("Token")
      },
      data:{
        reason:reason,
        postId: postID,
        reportingUserID:user.id
      }
    })
    console.log(response)
  } 
  
  return(
    <>
        <Dialog
        open={reportOpen}
        onClose={handleReportClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        <div style = {{display:"flex", alignItems:"center"}}>
          <ReportIcon sx = {{marginRight:"10px", color:"red", fontSize:"25px"}}/>
          {"Reason for your Report"}
        </div>
        </DialogTitle>
        <DialogContent sx={{width: "300px", height: "auto"}}>
          <h4>Suggestions</h4>
          <h5 className="report_reasons">1. Offensive?</h5>
          <h5 className="report_reasons">2. Racisms or Hate Speech?</h5>
          <h5 className="report_reasons">3. Inappropriate?</h5>
          <h5 className="report_reasons">4. Harrasment?</h5>
          <TextareaAutosize
            onChange={(e)=> setReason(e.target.value)}
            className="report_textarea"
            aria-label="empty textarea"
            placeholder="What is the reason for your report?"
            minRows={4}
            value = {reason}
          />
        </DialogContent>
        <DialogActions>
          <Button
          variant = "outlined"
          color = "secondary"
          className = "outlined_submit_button" 
          onClick={ reason ? () => 
          {
            sendReport(post._id)
            handleReportClose()
            setReason('')
          }
          :null
          }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
