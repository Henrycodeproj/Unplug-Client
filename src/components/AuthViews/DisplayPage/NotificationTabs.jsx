import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from "@mui/material/Avatar";
import "./Notification.css";
import { motion } from "framer-motion";
import { accountContext } from '../../Contexts/appContext';
import { Truncating } from '../../ReusablesComponents/Truncating';
import { useState, useContext } from "react";

export const NotificationTabs = ({entry}) => {
    const { 
      time, 
    } =
    useContext(accountContext);

  const [open, setOpen] = useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>  
        <motion.div
          whileTap={{ scale: 1.05 }}
        >
        <ListItemButton onClick={handleClick} 
        sx = {{
            background: entry.createdAt > time 
            ? "rgba(128, 128, 128, 0.411)" 
            : "white",
        }}
        className = "notification-tabs"
        >
        <ListItemIcon>
          <Avatar
            src={`https://ucarecdn.com/${entry.attendId.profilePicture}/`}
          />
        </ListItemIcon>
        <ListItemText primary={`${entry.attendId.username} is now attending your event`} />
        {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4, maxWidth:"350px"}}>
            <ListItemText
            primary={
                <Truncating 
                postDescription={entry.postId.Description}
                truncateNumber = {150}
                />
            } 
            />
          </ListItem>
        </List>
        </Collapse>
        </motion.div>
    </>
  )
}