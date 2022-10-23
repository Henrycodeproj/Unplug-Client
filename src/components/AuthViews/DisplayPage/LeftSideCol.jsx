import { Avatar } from "@mui/material"
import { accountContext } from "../../Contexts/appContext"
import { useContext, useState} from "react"
import { useNavigate } from "react-router-dom";
import { LeftSideSettingsMenu } from "./LeftSideSettingsMenu";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SettingsIcon from '@mui/icons-material/Settings';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import "./LeftSideCol.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

export const LeftColumn = ()=>{
    const {user, logoutHandler} = useContext(accountContext)
    const navigateTo = useNavigate()
    const [college] = useState(JSON.parse(localStorage.getItem("User")))
    return(
        <div className='side_header'>
            <div className="leftside_profile_card" style={{background:"rgba(139, 137, 137, 0.404)",borderTopLeftRadius:'5px', borderTopRightRadius:'5px'}}>
                <Avatar sx = {{ width:50, height:50 }} src ="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" >
                </Avatar>
                <span className='leftsidebar_online'/>
                <div className = "leftside_profile_card_name">
                    <h2 style={{textTransform:"capitalize", fontSize:"2rem"}}>{user.username}</h2>
                    <h5 style={{wordWrap:"break-word", fontSize:"1rem", color:"rgb(168, 162, 162)", textTransform:"capitalize"}}>{"@" + college.collegeAffiliation}</h5>
                </div>
            </div>
          <MenuList sx ={{borderTop:"solid", borderTopColor:"rgb(255, 255, 255, .6)", borderTopWidth:"1.5px", padding:'10px'}}>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <InboxIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Inbox</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Message</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
            <MenuItem sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <PermContactCalendarIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text" onClick ={() => navigateTo(`/profile/${user.id}`)}>Dashboard</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
            <Accordion sx = {{background:"none", boxShadow:"0 0 0 0", borderRadius:"5px"}} className ="left_accordian">
              <AccordionSummary
                className = "accordian_summary"
                expandIcon={<ExpandMoreIcon className = "expand_icon" sx = {{color:"white"}}/>}
              >
                <div style = {{minWidth:36}}>
                  <SettingsIcon fontSize="small" sx ={{color:"white"}}/>
                </div>
                <Typography sx = {{color:"white"}} className= "list_item_text">Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <LeftSideSettingsMenu/>
              </AccordionDetails>
            </Accordion>
            <MenuItem onClick={()=> logoutHandler()} sx = {{margin:"10px 0px"}} className = "leftsidebar_menuItems">
              <ListItemIcon sx ={{color:"white"}}>
                <LogoutIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText sx ={{color:"white"}} className= "list_item_text">Logout</ListItemText>
              <Typography variant="body2" sx ={{color:"white"}}>
              </Typography>
            </MenuItem>
          </MenuList>
        </div>
    )
}

