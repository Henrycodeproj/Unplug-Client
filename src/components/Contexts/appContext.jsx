import {createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
export const accountContext = createContext()

export const AppContext = ({children}) =>{
    //api link https://tender-glasses-bat.cyclic.app/ 
    const socket = io("https://tender-glasses-bat.cyclic.app/", 
    {
     transports: ["websocket"],
     withCredentials: true 
    }
    )
    
    const navigateTo = useNavigate()

    const logoutHandler = () => {
        socket.disconnect()
        localStorage.removeItem("userStatus")
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
        navigateTo("/")
    }

    const [userStatus, setUserStatus] = useState(localStorage.getItem("userStatus"))

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))

    const [posts, setPosts] = useState(null)
    
    const [activeUsers, setActiveUsers] = useState([])

    const [recentMessages, setRecentMessages] = useState([])

    const [dark, setDark] = useState(false)

    const [isNewChat, setIsNewChat] = useState([])

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
            setIsNewChat
        }}>
            {children}
        </accountContext.Provider>    
        )
    }
