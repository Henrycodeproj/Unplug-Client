import { useContext } from "react";
import { accountContext } from "../../../Contexts/appContext";
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const DeleteOption = ({post, deleteMessageOpen, setDelteMessageOpen}) => {

    const {posts, setPosts, user} = useContext(accountContext)

    const DeleteMessageClose = () => {
        setDelteMessageOpen(false);
      };

    const postDeleteHandler = (postId) => {
      const URL = `http://localhost:3001/posts/delete/${postId}`
      const data = {userId: user.id}
      axios.delete(URL, {
        headers:{
          "authorization":localStorage.getItem("Token")
        },
        data:{
          data
        }
      })
      .then(res=> {
        const newPosts = posts.filter(post => post._id !== res.data)
        setPosts(newPosts)
      })
      .catch(err => console.log(err))
    }
  return (
    <>
        <Dialog
        open={deleteMessageOpen}
        onClose={DeleteMessageClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your post cannot be recovered if it is deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          variant="outlined" 
          color ="secondary"
          className= "outlined_submit_button"
          onClick={()=>
            {
              DeleteMessageClose()
              postDeleteHandler(post._id)
            }
          }
          >
          {"Yes"}
          </Button>
          <Button variant = "contained" onClick={DeleteMessageClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
