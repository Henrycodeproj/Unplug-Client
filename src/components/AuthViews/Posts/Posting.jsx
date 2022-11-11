import "../Posts/Posting.css"
import {useState, useContext, useRef} from "react"
import { accountContext } from "../../Contexts/appContext";
import { Emojis } from "../../ReusablesComponents/Emojis";
import axios from "axios"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Button} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import { TextAreaEmojis } from "../../ReusablesComponents/TextAreaEmojis";
import { LoadingCircle } from "../../ReusablesComponents/LoadingCircle";

export const Posts = ({lastPostIndex, setLastPostIndex})=>{

    const {user, setPosts} = useContext(accountContext)
    const ref = useRef()

    const [status, setStatus] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [postingStatus, setPostingStatus] = useState(false)
    const [userInfo] = useState(JSON.parse(localStorage.getItem("User")))

    const formHandler = async (e) => {
        setPostingStatus(true)
        e.preventDefault()
        const data = {
            user:user.id,
            post:status,
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
        } 
    }

    if (user === null) return(
        <LoadingCircle
        loadingState={user}
        />
    )
    

    return (
        <div className="add_post_container">
            <Avatar 
            className ="input_picture"
            src = {`https://ucarecdn.com/${user.profilePicture}/`}
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
                                <AddPhotoAlternateIcon sx = {{color:"gray"}}/>
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
