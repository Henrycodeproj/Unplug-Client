import {createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
import jwt_decode from "jwt-decode";
export const accountContext = createContext()

export const AppContext = ({children}) =>{
    const socket = io("https://unplug-server.herokuapp.com/", {transports: ["websocket", "polling"]})
    
    const navigateTo = useNavigate()

    const logoutHandler = () => {
        socket.disconnect()
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        navigateTo("/")
        setOption(false)
    }

    const tokenInfo = localStorage.getItem("Token") ? jwt_decode(localStorage.getItem("Token")) : null

    //login and signup toggle state
    const [option, setOption] = useState(true)

    const [userStatus, setUserStatus] = useState(localStorage.getItem("userStatus"))

    const [user, setUser] = useState(tokenInfo?.user)

    const [posts, setPosts] = useState(null)
    
    const [activeUsers, setActiveUsers] = useState({})

    const [recentMessages, setRecentMessages] = useState([])

    const [dark, setDark] = useState(false)

    const [isNewChat, setIsNewChat] = useState([])

    const [lastPostIndex, setLastPostIndex] = useState(15);

    const [time, setTime] = useState(localStorage.getItem("User") ? user.lastActive : null)

    const [unreadNotifications, setUnreadNotifications] = useState(0)

    const [notificationID, setNotificationID] = useState(localStorage.getItem("User") ? user.id : 0)

    const [userNotification, setUserNotification] = useState([])

    const [newNotification, setNewNotification] = useState()

    const [clicked, setClicked] = useState(false)

    return(
        <accountContext.Provider 
        value = {{
            userStatus,
            setUserStatus,
            user,
            setUser,
            posts,
            setPosts,
            activeUsers,
            setActiveUsers,
            logoutHandler,
            socket,
            recentMessages,
            setRecentMessages,
            isNewChat,
            setIsNewChat,
            lastPostIndex,
            setLastPostIndex,
            time, 
            setTime,
            unreadNotifications, 
            setUnreadNotifications,
            notificationID,
            setNotificationID,
            userNotification, 
            setUserNotification,
            newNotification, 
            setNewNotification,
            clicked, 
            setClicked,
            option, 
            setOption
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
