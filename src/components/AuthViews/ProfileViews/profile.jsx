
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext, useRef } from "react"
import { SocialMediaBar } from "./SocialMediaBar"
import { Avatar, Tooltip } from "@mui/material"
import { accountContext } from "../../Contexts/appContext"
import { AnimatePresence, motion } from "framer-motion"
import { SendMessageProfile } from "./SendMessageProfile"
import axios from "axios"
import "./profile.css"
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import * as React from 'react';
import SidebarOptions from "./SidebarOptions";
import AddSocialDialog from "./AddSocialDialog"

export const Profile = ()=> {
    const { user } = useContext(accountContext) 
    const { userId } = useParams()

    const [viewedUser, setViewedUser] = useState(null)
    const [userDescription, setUserDescription] = useState(null)
    const [fullDescription, setFullDescription] = useState(false)
    const [socialMediaModal, setSocialMediaModal] = useState(false)
    const [deleteMedia, setDeleteMedia] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [affiliation, setAffiliation] = useState('')
    const [sendMessage, setSendMessage] = useState(false)
    const [message, setMessage] = useState("")
    const [currentPostConvoID, setCurrentPostConvoID] = useState(null)

    useEffect(()=>{
        const URL = `http://localhost:3001/user/information/${userId}`
        axios.get(URL,{
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => {
          setViewedUser(res.data)
          setUserDescription(res.data.selfDescription)
        })
        .catch(err => console.log(err))
    },[userId])

    const submitDescription = async () => {
      const url = `http://localhost:3001/user/update/description/${user.id}`
      const data = {description: userDescription}
      const response = await axios.patch(url, data, {
        headers:{
          "authorization": localStorage.getItem("Token")
        }
      })
      setViewedUser(response.data)
      setState(prev => prev['bottom'] = !prev['bottom'])
    }

    const submitAffliliationHandler = async (event) => {
      if (event.key === "Enter" && affiliation) {
        const url = `http://localhost:3001/user/update/college/${user.id}`
        const data = { affiliation: affiliation }
        const response = await axios.patch(url, data, {
          headers:{
            "authorization": localStorage.getItem("Token")
          }
        })
      if (response) {
        setViewedUser(response.data)
        setClicked(false)
        setAffiliation('')
        const localUserInfo = JSON.parse(localStorage.getItem("User"))
        localUserInfo["collegeAffiliation"] = response.data.collegeAffiliation
        localStorage.setItem("User", JSON.stringify(localUserInfo))
        }
      }
    }
    
    const submitButtonAffliliationHandler = async (e) => {
      if (affiliation) {
        const url = `http://localhost:3001/user/update/college/${user.id}`
        const data ={ affiliation: affiliation }
        const response = await axios.patch(url, data, {
          headers:{
            "authorization": localStorage.getItem("Token")
          },
      })
      if (response) {
        setViewedUser(response.data)
        setClicked(false)
        setAffiliation('')
        const localUserInfo = JSON.parse(localStorage.getItem("User"))
        localUserInfo["collegeAffiliation"] = response.data.collegeAffiliation
        localStorage.setItem("User", JSON.stringify(localUserInfo))
      }
    }
    }

    const expandDescription = () => {
      setFullDescription(true)
    }

    const closeExpandedDescription = () => {
      setFullDescription(false)
    }
    const handleOpenSocialMedia = () => {
      setSocialMediaModal(true)
    }
    const handleDeleteMedia = () => {
      setDeleteMedia(clicked => !clicked)
    } 
    const handleClick = () => {
      setClicked(prevState => !prevState)
    }

    const sendMessageHandler = async () => {
      setSendMessage(true)
      const Url = "http://localhost:3001/conversation/create"
      const data = {user1:user.id, user2:viewedUser._id}
      const newConvoId = await axios.post(Url, data, {
        headers:{
            "authorization": localStorage.getItem("Token")
        }
      })
      if (newConvoId) setCurrentPostConvoID(newConvoId.data._id)
    }
    const [state, setState] = useState({bottom: false});

    const toggleDrawer = (anchor, open) => (event) => {  
      setState({ [anchor]: open });
    };  

    const list = (anchor) => (
      <Box
        sx={anchor === 'bottom' ? 'auto' : 250 }
        role="presentation"
        onClick={toggleDrawer(anchor, true)}
      >
        <List>
            <ListItem>
              <h1>Add a Description</h1>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem>
              <TextareaAutosize
                className = "description_box"
                minRows= {10}
                onChange = {e => setUserDescription(e.target.value)}
                value = {userDescription}
              />
            </ListItem>
            <ListItem>
              <Button variant = "contained" onClick = {submitDescription}>Submit</Button>
            </ListItem>
        </List>
      </Box>
    );       

    return(
        <>
        {viewedUser &&
            <div className="profile_background">
                <div className="outer_profile_container">
                    <div className = "top_profile_container">
                        <div className="Profile_picture_section">
                            <Avatar sx = {{width:'250px', height:'250px', borderStyle:"solid", borderColor:"white", borderRadius:"50%", borderWidth:'5px'}} src = "https://cdn.mos.cms.futurecdn.net/3kZ3hc2YMB6LXiPohtyfKa.jpg"/>
                            <div>
                                <h1 className = "profile_username">
                                    {
                                      viewedUser._id !== user.id && viewedUser.username ?
                                      viewedUser.username.charAt(0).toUpperCase() + viewedUser.username.slice(1)
                                      :"Dashboard" 
                                    }
                                </h1>
                                <AnimatePresence>
                                <div style = {{display:"flex", alignItems:"center", margin:"10px 0", gap:"5%"}}>
                                  {
                                  viewedUser._id === user.id && clicked ?
                                  <div style = {{display:"flex", flexDirection:"column"}}>
                                    <h4 style = {{marginBottom:"5%"}}>You can press enter on the keyboard or hit the check to change or edit your college.
                                    </h4>
                                    <div style = {{display:"flex"}}>
                                      <motion.div
                                      initial={{ opacity: 0}}
                                      animate={{ opacity: 1}}
                                      exit={{ opacity: 0 }}
                                      transition = {{duration: 1}}
                                      >
                                      <input
                                      value={clicked ? affiliation : viewedUser.collegeAffiliation}
                                      onChange = {e => setAffiliation(e.target.value)}
                                      style = {{caretColor:"black"}}
                                      autoFocus 
                                      onKeyDown={e => submitAffliliationHandler(e)}
                                      />
                                      </motion.div>
                                      <CheckCircleIcon sx = {{color:"green", cursor:"pointer"}} 
                                      onClick = {e  => submitButtonAffliliationHandler(e)}/>
                                      <CancelIcon sx = {{color:"gray", cursor:"pointer"}} onClick = {()=> setClicked(prevState => !prevState)}/>
                                    </div>
                                  </div>
                                  :
                                  <motion.div
                                  initial={{ opacity: 0}}
                                  animate={{ opacity: 1}}
                                  exit={{ opacity: 0 }}
                                  transition = {{duration: 1}}>
                                  <h3 onClick={handleClick} style = {{textTransform:"uppercase", color:"gray"}}>
                                    {viewedUser.collegeAffiliation ? '@'+viewedUser.collegeAffiliation :"@UCSC"}
                                  </h3>
                                  </motion.div>
                                  }
                                </div>
                                </AnimatePresence>
                                {
                                  viewedUser._id !== user.id &&
                                  <Button sx={{margin:"10px 0"}} variant="contained" endIcon={<SendIcon/>} onClick = {sendMessageHandler}>
                                    Send Message
                                  </Button>
                                }
                                {
                                  viewedUser._id !== user.id && sendMessage && 
                                  <SendMessageProfile 
                                  viewedUser = {viewedUser}
                                  sendMessage ={sendMessage}
                                  setSendMessage = {setSendMessage}
                                  message = {message}
                                  setMessage = {setMessage}
                                  currentPostConvoID = {currentPostConvoID}
                                  setCurrentPostConvoID = {setCurrentPostConvoID}
                                  />
                                }
                            </div>
                        </div>
                        <SidebarOptions
                        viewedUser={viewedUser}
                        user = {user}
                        />
                    </div>
                    <div>
                        <div style ={{display:"flex", alignItems:"center", gap:"10px"}}>
                        <h1>A Little About Me</h1>
                          {
                          viewedUser._id === user.id &&
                          <div>
                            {
                            ['bottom'].map((anchor) => (
                              <React.Fragment key={anchor}>
                                <Tooltip title = "Add/Change Self Description">
                                  <EditIcon className = "About_Me_Edit_Button" onClick={toggleDrawer(anchor, true)} sx = {{fontSize:"1.7rem", cursor:"pointer"}}/>
                                </Tooltip>
                                <SwipeableDrawer
                                  anchor={anchor}
                                  open={state[anchor]}
                                  onClose={toggleDrawer(anchor, false)}
                                  onOpen={toggleDrawer(anchor, true)}
                                >
                                  {list(anchor)}
                                </SwipeableDrawer>
                              </React.Fragment>
                              )
                            )}
                          </div>
                          }
                        </div>
                        <div className = "profile_page_description" style = {{lineHeight:"2rem", fontSize:"1.2rem"}}>
                          {viewedUser.selfDescription ?
                           <div>
                            <p style = {{maxHeight:"192px", overflow:"hidden"}}>{viewedUser.selfDescription}</p>
                            {
                              viewedUser.selfDescription.trim().split(' ').length > 100 &&
                              <Tooltip title = "Expand Description">
                                <MoreHorizIcon sx ={{cursor:"pointer", fontSize:"1.7rem", fontWeight:"700"}} onClick =  {expandDescription}/>
                              </Tooltip> 
                            }
                            {
                              fullDescription &&
                              <Dialog
                              open={fullDescription}
                              onClose={closeExpandedDescription}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              >
                              <div style = {{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center", 
                                padding:"5px", 
                                borderBottomStyle:"solid", 
                                borderBottomWidth:"1px",
                                borderBottomColor:"rgba(0,0,0,.5)"
                              }}>
                                <h1>Description</h1>
                                <CloseIcon/>
                              </div>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description" sx = {{fontSize:"1.3rem"}}>
                                    {viewedUser.selfDescription}
                                  </DialogContentText>
                                </DialogContent>
                              </Dialog> 
                            }
                           </div>
                           : "There is no current description."
                          }
                        </div>
                    </div>
                    <div>
                      <div className = "Connect_title_bar" style = {{display:"flex", alignItems:"center", gap:"1%"}}>
                        <h1>Connect With Me</h1>
                        {
                          viewedUser._id === user.id &&
                          <div className="social_options">
                          <AddIcon className = "add_social_button" sx = {{fontSize:"1.7rem", cursor:"pointer"}} onClick={handleOpenSocialMedia} />
                          <RemoveIcon sx = {{cursor:"pointer", fontSize:"2rem"}} onClick = {handleDeleteMedia}/>
                          </div>
                        }
                      </div>
                      <SocialMediaBar 
                        viewedUser = {viewedUser}
                        setViewedUser = {setViewedUser}
                        deleteMedia = {deleteMedia}
                        user = {user}
                      />
                      <AddSocialDialog
                        socialMediaModal = {socialMediaModal}
                        setSocialMediaModal = {setSocialMediaModal}
                        user = {user}
                        setViewedUser = {setViewedUser}
                      />
                    </div>
                </div>
            </div>
        }
        </>
    ) 
}
