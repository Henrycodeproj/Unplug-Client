import logo from '../../images/logo.png'
import {Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { accountContext } from '../Contexts/appContext'
import { motion } from "framer-motion";
import NotificationsIcon from '@mui/icons-material/Notifications';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Tooltip from "@mui/material/Tooltip";



import "../navigation/navbar.css"

export const Navbar = () =>{

    const navigateTo = useNavigate()
    const {userStatus, user, logoutHandler, socket} = useContext(accountContext)

    const [profile, setProfile] = useState(null)
    const [notification, setNotification] = useState(null)
    
    const navlogoutHandler = () => {
        socket.emit("logout", {userID:user.id})
        logoutHandler()
        setProfile(false)
    }

    const test = [1,2]
    const open = Boolean(profile)

    const openProfile = (e) =>{
        setProfile(e.currentTarget)
    }
    const closeProfile = () =>{
        setProfile(null)
    }

    const notificationOpen = Boolean(notification)

    const handleClick = (event) => {
        setNotification(event.currentTarget);
      };
    
    const handleClose = () => {
        setNotification(null);
    };
    

    if (userStatus){
        return(
            <nav>

            <img className ="unplug_logo" src ={logo} alt ="logo" onClick={()=> !userStatus ? navigateTo("/"): navigateTo("/display")}/>

            <div className="profile_section">
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon className = "notification_bell" onClick = {(e) => handleClick(e)}/>
                    <Popover
                    open={notificationOpen}
                    anchorEl={notification}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    >
                    <div className = "Notifications_container">
                    <MenuItem sx={{ minWidth:"200px", display:"flex", alignItems:"center", gap:3, justifyContent:"space-evenly"}}>
                        <h2>Notifications</h2>
                        <span><RecordVoiceOverIcon/></span>
                    </MenuItem>
                    <Divider/>
                    {test.map((item)=>
                    <div>
                    <MenuItem sx={{ minWidth:"200px", justifyContent:"space-around" }}>
                        <Avatar src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh4moBSRCeyvWaJI8pPsFRCczpc9rB-f53ew&usqp=CAU"/>
                        <p>Hello liked your post</p>
                    </MenuItem>
                    <Divider/>
                    </div>)}
                    </div>
                    </Popover>
                </Badge>
                <div>
                    <IconButton
                        onClick={openProfile}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar 
                        src ="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" 
                        sx={{ width: 35, height: 35 }}
                        className='faker1'
                        >
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={profile}
                        open={open}
                        onClose={closeProfile}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        sx = {{width:'400px'}}
                    >
                        <MenuItem sx={{ minWidth:"180px" }} 
                        onClick={()=> {closeProfile(); navigateTo(`/profile/${user.id}`, {replace:true})}}>
                            <AccountCircleIcon className='profile_menu_icon' sx={{mr:2}}/>
                                <div>Profile</div>
                        </MenuItem>
                        <MenuItem sx={{ minWidth:"180px" }} 
                        onClick={closeProfile}>
                            <SettingsIcon className='profile_menu_icon' sx={{mr:2}}/>
                                <div>Settings</div>
                        </MenuItem>
                        <MenuItem sx={{ minWidth:"180px" }} onClick={()=>navlogoutHandler()}>
                            <LogoutIcon className = "profile_menu_icon" sx={{mr:2}}/>
                                <div>Logout</div>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
        )
    }
    
    return(
        <nav>
            {
                !userStatus ?
                <motion.div
                whileHover= {{ scale:1.1, }}
                >
                <img className ="unplug_logo" style = {{maxWidth:"100%"}} src ={logo} alt ="logo" onClick={()=>navigateTo("/")}/>
                </motion.div> 
                :
                <img className ="unplug_logo" src ={logo} alt ="logo" onClick = {()=>navigateTo("/display")}/>
            }
            <div className="profile_section">
                <div><Button variant = "contained" color ="secondary"><a href = "mailto:lihenryhl.work@gmail.com" style = {{color:"white", textDecoration:"none"}}>Contact</a></Button></div>
            </div>
        </nav>
    )
}