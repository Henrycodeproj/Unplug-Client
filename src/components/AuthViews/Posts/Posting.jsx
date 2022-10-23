import "../Posts/Posting.css"
import {useState, useContext, useRef} from "react"
import { accountContext } from "../../Contexts/appContext";
import { Emojis } from "../../ReusablesComponents/Emojis";
import axios from "axios"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Button} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TextAreaEmojis } from "../../ReusablesComponents/TextAreaEmojis";
import { LoadingCircle } from "../../ReusablesComponents/LoadingCircle";

export const Posts = ({lastPostIndex, setLastPostIndex})=>{

    const [status, setStatus] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    const {user, setPosts} = useContext(accountContext)
    const ref = useRef()

    const formHandler = (e) => {
        e.preventDefault()
        const data = {
            user:user.id,
            post:status,
        }
        const url = "http://localhost:3001/posts/"
        axios.post(url, data, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        .then(res => {
            if (res.status){
                ref.current.value = ''
                setPosts(prevPosts => [res.data.newestPost, ...prevPosts])
                setLastPostIndex(lastPostIndex + 1)
                setStatus('')
            } else throw Error
        })
        .catch(err=>alert(err.response.data.message))
    }

    if (user === null) return(
        <LoadingCircle
        loadingState={user}
        />
    ) 
    

    return (
        <div className="add_post_container">
            <img className ="input_picture" src = "https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg?auto=compress&cs=tinysrgb&w=1600" >
            </img>
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
