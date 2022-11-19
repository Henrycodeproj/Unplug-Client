import Zoom from '@mui/material/Zoom';
import { Button,Avatar, Tooltip } from '@mui/material/';
import { motion} from "framer-motion"
import "./HeroSection.css"

export const HeroSection = ({setOption, setClicked}) => {
    const avatarStyling = {
    border:"solid",
    borderColor:"white",
    width:"45px",
    height:"45px"
    }
    const getStartedHandler = () => {
      setClicked(true)
      setOption(true)
    }
    const loginButtonHandler = () => {
      setClicked(true)
      setOption(false)
    }

  return (
    <div className = "hero_section_container">
            <h1 className = "hero_section_headline">
                A Revolutionary Way to Connect With Your Peers.
            </h1>
              <p style = {{color:"white", fontSize:"1rem", lineHeight:"1.5rem"}}>
                Neworking in college made easy.
                A platform that addresses the different types of personalities in college students and seeks to help break the ice to foster real in-person interactions.
                Posting live on-campus activities to encourage others to join and mingle.
              </p>
              <div className = "avatar_container_wrapper">
              <motion.div
              whileHover={{scale:1.3, y:-10}}
              >
                <Tooltip title = "Boardgame night in my dorm tonight!" TransitionComponent={Zoom} placement="top" arrow>
                <Avatar src = "https://images.pexels.com/photos/3781529/pexels-photo-3781529.jpeg?auto=compress&cs=tinysrgb&w=1600" sx = {avatarStyling}/>
                </Tooltip>
              </motion.div>
              <motion.div
              whileHover={{scale:1.3, y:-10}}
              >
                <Tooltip title="Looking for a buddy to study Physics 1A with!" TransitionComponent={Zoom} placement="top" arrow>
                  <Avatar src = "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1600" sx = {avatarStyling}/>
                </Tooltip>
              </motion.div>
              <motion.div
              whileHover={{scale:1.3, y:-10}}
              >
                <Tooltip title = "Grabbing lunch tomorrow if anyone wants join me!" TransitionComponent={Zoom} placement="top" arrow>
                  <Avatar src = "https://images.pexels.com/photos/5537546/pexels-photo-5537546.jpeg?auto=compress&cs=tinysrgb&w=1600" sx = {avatarStyling}/>
                </Tooltip>
              </motion.div>
              <motion.div
              whileHover={{scale:1.3, y:-10}}
              >
                <Tooltip title = "Playing Pool at 5:30 on the east of campus today!" TransitionComponent={Zoom} placement="top" arrow>
                  <Avatar src = "https://images.pexels.com/photos/13798632/pexels-photo-13798632.jpeg?auto=compress&cs=tinysrgb&w=1600" sx = {avatarStyling}/>
                </Tooltip>
              </motion.div>
              </div>
            <div style = {{display:"flex", gap:"1rem"}}>
            <Button className = "signup_action_buttons" variant="contained" sx = {{padding:"5px 1.5rem", borderRadius:"100px", fontSize:"1rem"}} color ="secondary" onClick = {() => getStartedHandler()}>Get Started</Button>
            <Button className = "signup_action_buttons" variant="contained" sx = {{padding:"5px 1.5rem", borderRadius:"100px", fontSize:"1rem"}} onClick = {() => loginButtonHandler()} severity="warning">Login</Button>
            </div>
          </div>
  )
}
