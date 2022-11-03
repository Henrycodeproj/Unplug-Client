import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { motion } from 'framer-motion';
import { Avatar} from "@mui/material"
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export const SidebarOptions = ({viewedUser, user}) => {
  const joinDate = new Date(viewedUser.createdAt)
  const lastActive = new Date(viewedUser.lastActiveDate)

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber + 1);
  
    // Using the browser's default locale.
    return date.toLocaleString([], { month: 'long' });
  }
  return (
        <div 
        className = "profile_sidebox_container"
        style = {{
            maxWidth:"350px",
            maxHeight:"350px",
            borderRadius:"20px", 
            padding:"1rem"
        }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}>
                <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.2 }}
                >
                <ListItem className = "profile_sidebox_listItems" sx = {{cursor:"pointer"}}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={ viewedUser._id === user.id ? 'Upload Photos': 'Photos'} />
                </ListItem >
                </motion.div>

                <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.2 }}
                >
                <ListItem className = "profile_sidebox_listItems">
                  <ListItemAvatar>
                    <Avatar>
                      <FireplaceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="First Joined" secondary= {`${getMonthName(joinDate.getMonth())}  ${joinDate.getDate()}  ${joinDate.getFullYear()}`} />
                </ListItem>
                </motion.div>

                <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.2 }}
                >
                <ListItem className = "profile_sidebox_listItems">
                  <ListItemAvatar>
                    <Avatar>
                      <TravelExploreIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Last Seen Online" secondary= {`${getMonthName(lastActive.getMonth())}  ${lastActive.getDate()}  ${lastActive.getFullYear()}`} />
                </ListItem>
                </motion.div>
            </List>
        </div>
  )
}

export default SidebarOptions
