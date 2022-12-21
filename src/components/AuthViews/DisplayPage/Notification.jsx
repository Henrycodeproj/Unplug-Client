import ListItem from '@mui/material/ListItem';
import { useContext } from "react";
import { accountContext } from '../../Contexts/appContext';
import { NotificationTabs } from './NotificationTabs';

export const Notification = () => {
    const { 
      userNotification,
      } =
      useContext(accountContext);
  
    return (
      <>
        {userNotification.length > 0
          ? userNotification.map((entry) => (
            <NotificationTabs
            entry = {entry}
            />
            ))
          : <ListItem>No current notifications</ListItem>}
      </>
    );
  };