import "../Posts/Posting.css"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {useState, useContext, useRef, useEffect} from "react"
import { accountContext } from "../../Contexts/appContext";
import { Button } from "@mui/material";
import { TextAreaEmojis } from "../../ReusablesComponents/TextAreaEmojis";
import { LoadingCircle } from "../../ReusablesComponents/LoadingCircle";
import { format } from "date-fns"
import { motion } from "framer-motion"

export const Posts = ({lastPostIndex, setLastPostIndex})=>{

    const {user, setPosts} = useContext(accountContext)
    const ref = useRef()
    const postRef = useRef();

    const [status, setStatus] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [postingStatus, setPostingStatus] = useState(false)
    const [dateTime, setDateTime] = useState()
    const [addEventTime, setAddEventTime] = useState(false)
    const [userInfo] = useState(JSON.parse(localStorage.getItem("User")))
    
    const currentDate = new Date()
    const currentDateFormatted = format(currentDate, "yyyy-MM-dd'T'HH:mm")

    const formHandler = async (e) => {
        setPostingStatus(true)
        e.preventDefault()
        const data = {
            user: user.id,
            post: status,
            date: dateTime ? dateTime : null
        }
        const url = "https://unplug-server.herokuapp.com/posts/"
        const res = await axios.post(url, data, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        if (res.status === 200){
            ref.current.value = ''
            setPosts(prevPosts => [res.data.newestPost, ...prevPosts])
            setLastPostIndex(lastPostIndex + 1)
            setStatus('')
            setPostingStatus(false)
            setDateTime(null)
            setAddEventTime(false)
        } 
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (
            postRef.current 
          && !postRef.current.contains(event.target) 
          && (event.target.offsetWidth >= postRef.current.offsetWidth + 50
          || event.target.offsetHeight >= postRef.current.offsetHeight + 10)
          ) {
            setAddEventTime(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [postRef]);

    const handleDateandTime = (event) => {
      setDateTime(event.target.value)
    }

    if (user === null) return(
        <LoadingCircle
        loadingState={user}
        />
    )
    
    return (
        <div className="add_post_container" ref = {postRef}>
            <Avatar 
            className ="input_picture"
            src = {`https://ucarecdn.com/${userInfo.profilePicture}/`}
            />
            <div className = "post_form_container">
                <div className="post_form">
                    <TextareaAutosize
                    className="status_post_textarea"
                    placeholder={`Hi ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, what are you doing on campus today?`}
                    onChange = {(e) => setStatus(e.target.value)}
                    ref = {ref}
                    minRows = {3}
                    maxRows = {6}
                    />
                </div>
                <div className="bottom_posts_container">
                        <div className="bottom_icon_bar_wrapper">
                            <div className="input_icons_bar">
                                <TextAreaEmojis
                                input = {ref.current}
                                anchor = {anchorEl}
                                setAnchor = {setAnchorEl}
                                title = {true}
                                setMessage = {setStatus}
                                />
                                {
                                addEventTime
                                ? <TextField
                                id="datetime-local"
                                label="What time and day?"
                                type="datetime-local"
                                defaultValue={`${currentDateFormatted}`}
                                sx={{ width: 250 }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange = {handleDateandTime}
                                /> 
                                :
                                <motion.div
                                whileHover={{scale: 1.1}}
                                > 
                                <div 
                                style={{
                                  display:"flex", 
                                  alignItems:"center"
                                }}
                                onClick = {()=> setAddEventTime(true)}
                                >
                                <CalendarMonthIcon 
                                sx={{
                                   color: "black", 
                                   marginRight:"5px", 
                                   cursor:"pointer" 
                                }} 
                                />
                                <h3 style = {{color:"black", cursor:"pointer"}}>Date</h3>
                              </div>
                              </motion.div>
                                }
                                <LocationOnIcon sx = {{color:"gray"}}/>
                            </div>
                        </div>
                    <Button 
                    variant="contained"
                    color = "secondary"
                    onClick={status ? (e) => formHandler(e): null}>
                    Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}
