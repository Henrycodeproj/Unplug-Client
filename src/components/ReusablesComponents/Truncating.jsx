import {useState} from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Tooltip from "@mui/material/Tooltip";
import "./Truncating.css";

export const Truncating = ({postDescription, truncateNumber}) => {

    const [truncate, setTruncate] = useState(false)

    const showTruncate = () => {
        setTruncate(true)
    }

    const hideTruncate = () => {
        setTruncate(false)
    }

  return (
    <>
    {!truncate ?
        <p style={{whiteSpace:"pre-line"}}>
            {postDescription.substring(0, truncateNumber)}
            {
            postDescription.length > truncateNumber ?
            <Tooltip title ="Expand">
                <span style = {{cursor:"pointer"}} onClick={showTruncate}>...</span> 
            </Tooltip> 
            :null
            }
        </p>
        :
        <p style={{whiteSpace:"pre-line"}}>
            {postDescription}
            <div>
                <Tooltip title = "Condense">
                <ExpandLessIcon className="Expand_Less" sx ={{fontSize:"30px", cursor:"pointer"}} onClick={hideTruncate}/>
                </Tooltip>
            </div> 
        </p>
    }
    </>
  )
}