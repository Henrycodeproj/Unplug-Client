import { motion } from "framer-motion";
import {useState, useContext } from 'react';
import { Button, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { accountContext } from "../Contexts/appContext";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';


export const Login = ({setOption, option, active, inactive}) => {

  const {setUser} = useContext(accountContext)

    const [loginInfo, setLoginInfo] = useState({
        login_username:"",
        login_password:""
      })

    const navigateTo = useNavigate()

    const [serverError, setServerError] = useState('')

    const [loginLoading, setLoginLoading] = useState(false)

    const handleInfo = (e)=> {
      const {name, value} = e.target
      setLoginInfo({...loginInfo, [name]:value})
    }
    
    const handleSubmit = (e) =>{
      setLoginLoading(true)
      e.preventDefault()
      const Url = 'http://localhost:3001/login'
      axios.post(Url, loginInfo,{
        //withCredentials:true,
      })
      .then(res => {
        if (res.data.accessToken){
          localStorage.setItem("Token", res.data.accessToken)
          localStorage.setItem("userStatus", true)
          localStorage.setItem("User", JSON.stringify(res.data.user))
          setUser(JSON.parse(localStorage.getItem("User")))
          setLoginLoading(false)
          navigateTo("/display")
        }
      }).catch(error =>{
        console.log(error.response.data.message)
        setServerError(error.response.data.message)
      })
    }

    return (
    <motion.div
    className="cheker"
    initial={{ opacity: 0.25, }}
    animate={{ opacity: 1}}
    transition = {{ duration:1 }}
    >
        <div className='space'>
          <h1 className='signup-title' style= {option ? active: inactive} onClick = {()=> setOption(!option)}>Sign Up</ h1>
          <h1 className='signup-title' style= {option ? inactive: active} onClick={()=> setOption(!option)}>Sign In</h1>
        </div>
        {serverError && 
        <Alert variant='filled' severity="error" color="secondary" onClose={()=>setServerError('')}>{serverError}</Alert>
        }
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-username-container">
                    <h3>Username</h3>
                    <label className="class">
                            <input
                            className="login_input" 
                            type="text" 
                            name="login_username" 
                            onChange={handleInfo} 
                            style={{width:'100%'}}
                            />
                    <PersonIcon style={{fontSize:'25px', marginBottom:'5px', color:'rgb(198, 196, 196)'}}/>
                    </label>
                </div>
                <div className='login-password-container'>
                    <h3>Password</h3>
                    <label className="class">
                            <input
                            className="login_input" 
                            type="password" 
                            name="login_password" 
                            onChange={handleInfo} 
                            style={{width:'100%'}}
                            />
                    <LockIcon style={{fontSize:'25px', marginBottom:'5px', color:'rgb(198, 196, 196)'}}/>
                    </label>
                </div>
                <div className="submit-section-login">
                  <Button variant="contained" color="secondary" type = "submit">Login</Button>
                  <span>{loginLoading && <CircularProgress color="inherit" />}</span>
                </div>
            </form>
        </div>
    </motion.div>
    )
}