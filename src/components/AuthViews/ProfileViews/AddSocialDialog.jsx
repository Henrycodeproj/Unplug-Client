
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';


const AddSocialDialog = ({socialMediaModal, setSocialMediaModal, user, setViewedUser}) => {
    const [twitter, setTwitter] = useState(null)
    const [instagram, setInstagram] = useState(null)
    const [facebook, setFacebook] = useState(null)
    const [linkedin, setLinkedin] = useState(null)
    const [github, setGithub] = useState(null)

    const handleClose = () => {
        setSocialMediaModal(false)
    }

    const handleSubmit = async () => {
        const url = `https://unplug-server.herokuapp.com/user/update/socials/${user.id}`
        const data = {
            twitter:twitter,
            instagram:instagram,
            facebook:facebook,
            linkedin:linkedin,
            github:github
        }
        const response = await axios.patch(url, data, {
            headers:{
                "authorization": localStorage.getItem("Token")
            }
        })
        setViewedUser(response.data)
        if (response) handleClose()
    }

    function checkLinkedInUrl (url) {
        const linkedInExpression = 
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^]+\/(([\w|\d-&#?=])+\/?){1,}))$/
        if (linkedInExpression.test(url)) setLinkedin(url)
    }
    function checkInstagramUrl (url) {
        const instagramExpression = 
        /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/
        if (instagramExpression.test(url)) setInstagram(url)
    }
    function checkFacebookUrl (url) {
        const facebookExpression = 
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/
        if (facebookExpression.test(url)) setFacebook(url)
    }
    function checkTwitterUrl (url) {
        const twitterExpression = 
        /(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:\#\S+)?$/
        if (twitterExpression.test(url)) setTwitter(url)
    }
    function checkGithubUrl (url) {
        const githubExpression = 
        /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/
        if (githubExpression.test(url)) setGithub(url)
    }
    return (
          <div>
              <Dialog
                open={socialMediaModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle sx = {{ fontSize:"1.6rem", display:"flex", alignItems:"center", gap:"5%" }}>
                    Link Your Social Media
                </DialogTitle>
                <DialogContent sx = {{display:"flex", alignItems:"flex-end", gap:"5%", minWidth:"400px"}}>
                    <LinkedInIcon sx ={{ fontSize:"30px", color:"#0072b1",}}/>
                    <TextField id="standard-basic" label="LinkedIn" variant="standard" sx = {{width:"100%"}} onChange = {e => checkLinkedInUrl(e.target.value)}/>
                </DialogContent>
                <DialogContent sx = {{display:"flex", alignItems:"flex-end", gap:"5%"}}>
                    <InstagramIcon sx = {{ fontSize:"30px", color:"#bc2a8d" }}/>
                    <TextField id="standard-basic" label="Instagram" variant="standard" sx = {{width:"100%"}} onChange = {e => checkInstagramUrl(e.target.value)}/>
                </DialogContent>
                <DialogContent sx = {{display:"flex", alignItems:"flex-end", gap:"5%"}}>
                    <FacebookIcon sx = {{ fontSize:"30px", color:"#4267B2" }}/>
                    <TextField id="standard-basic" label="Facebook" variant="standard" sx = {{width:"100%"}} onChange = {e => checkFacebookUrl(e.target.value)}/>
                </DialogContent>
                <DialogContent sx = {{display:"flex", alignItems:"flex-end", gap:"5%"}}>
                    <TwitterIcon sx = {{ fontSize:"30px", color:"#00acee" }}/>
                    <TextField id="standard-basic" label="Twitter" variant="standard" sx = {{width:"100%"}} onChange = {e => checkTwitterUrl(e.target.value)}/>
                </DialogContent>
                <DialogContent sx = {{display:"flex", alignItems:"flex-end", gap:"5%"}}>
                    <GitHubIcon sx = {{ fontSize:"30px", color:"#171515" }}/>
                    <TextField id="standard-basic" label="Github" variant="standard" sx = {{width:"100%"}} onChange = {e => checkGithubUrl(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                  <Button 
                  onClick={handleSubmit}
                  variant="contained" 
                  color ="primary"
                >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
          </div>
    )
}

export default AddSocialDialog
