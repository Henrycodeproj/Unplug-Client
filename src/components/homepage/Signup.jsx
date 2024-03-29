import axios from 'axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./Signup.css"
import landing from "../../images/landing.png"
import Disclaimer from './DisclaimerModal';
import CheckIcon from '@mui/icons-material/Check';
import { useState , useEffect, useContext} from 'react'
import { Button, Alert, CircularProgress } from '@mui/material/';
import { motion, AnimatePresence,} from "framer-motion"
import { Login } from './Login';
import { SideImage } from './SideImage';
import { Navigate, useNavigate } from 'react-router-dom';
import { accountContext } from '../Contexts/appContext';
import { HeroSection } from './HeroSection';

export const Signup = () =>{

    const [newUser,setnewUser] = useState({
      username:'',
      password:'',
      Confirm:'',
      email:''
    })
    
    const [createdAccount, setCreatedAccount] = useState(false)
    const [signLoading, setSignLoading] = useState(false)
    const [disclaimerClicked, setDisclaimerClicked] = useState(false)
    const [agreeDisclaimer, setAgreeDisclaimer] = useState(false)

    //state errors
    const [formErrors, setformErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [emailError, setEmailError] = useState(false)

    //states for password requirements
    const [requirements, setRequirements] = useState({uppercase:'black', numbers:'black', length:'black'})
    const [confirm, setConfirm] = useState({})
    const [valid, setValid] = useState({})
    const [passwordError, setPasswordError] = useState(false)
    const [demoMessage, setDemoMessage] = useState(true)
    const [disclaimerError, setDisclaimerError] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (formCheck(newUser) || !emailCheck(newUser.email) || disclaimerCheck()){
          return
        }
        confirmPassword(newUser)
        setSignLoading(true)

        //axios to send information if goes through checks
        if ((Object.keys(valid).length === 0 
          && Object.keys(formErrors).length === 0
          && Object.keys(confirm).length === 0)){
          const url = 'https://unplug-server.herokuapp.com/createUser'
        await axios.post(url, newUser)
        .then(response => {
          if (response.status === 201){
            setCreatedAccount(true)
          }
        })
        .catch(error =>{
          setServerError(error.response.data)
        }) 
      } else{
        setPasswordError(true)
      }
      setSignLoading(false)
    }
    // adds input values into newUser object hook
    const formHandler = (e) =>{
      const {name,value} = e.target
      if (name === 'password') passwordRequirements(value)
      
      setnewUser({...newUser, [name]:value});
    }

    const disclaimerCheck = () => {
      if (agreeDisclaimer === false) setDisclaimerError(true)
    }

    const emailCheck = (email) => {
      const check = /.edu$/;
      if(!check.test(email)){
        setEmailError(true)
        return false
      } else {
        return true
      }
    }

    const passwordRequirements = (password) =>{
      const numbers = /[0-9]/;
      const uppercase = /[A-Z]/;
      const errors = {}

      if (numbers.test(password)){
        requirements.numbers = '#005700'
        delete errors.numbers
      } else {
        requirements.numbers ='black'
        errors.numbers = false
      }

      if (uppercase.test(password)){
        requirements.uppercase = '#005700'
        delete errors.uppercase
      } else {
        requirements.uppercase ='black'
        errors.uppercase = false
      }

      if (password.length >= 6){
        requirements.length = '#005700'
        delete errors.length
      } else {
        requirements.length ='black'
        errors.length = false
      }
      setValid(errors)
    }
      
    const confirmPassword = (user)=> { //parameter is from newuser hook which is an object
      if (user.password !== user.Confirm){
        confirm.match = "Passwords do not match";
      } else {
        delete confirm.match
      }
      return confirm
    }

    //checks for any empty field and if field input is valid
    const formCheck = (inputValues) => {
      const Errors = {};
      if (!inputValues.password){
         Errors.password = 'Password field is required'
      }
      if (!inputValues.Confirm){
        Errors.Confirm = 'Confirm Password field is required'
      }
      if (!inputValues.username){
        Errors.username = 'Username is required'
      }
      if (!inputValues.email){
        Errors.email = 'Email is required'
      }

      setformErrors(Errors)

      if ((Object.keys(Errors).length) > 0){
        return true
      } else {
        return false
      }
    }
    const active ={
      borderStyle:'solid',
      borderRadius:'8px',
      backgroundColor:'rgb(149, 117, 205, .5)',
      boxShadow:'.5px .5px 5px 0px',
    }
    const inactive = {
      borderStyle:'none'
    }

    const {userStatus, clicked, setClicked, option, setOption} = useContext(accountContext)

    if (userStatus) return <Navigate to="/display"/>

    return (
      <main >
        <div className='landing-wrapper'>
          { !clicked
          ? <HeroSection
            setClicked={setClicked}
            setOption = {setOption}
            />
          :<div className='signup-container'>
          {
          demoMessage && 
          <Alert variant ="filled" severity="error" onClose={()=> setDemoMessage(false)}>
            Use this format for email (e.g example@example.edu) 
            to make an account or login with USERNAME and PASSWORD "guest".
          </Alert>
          }

            {option ?
            <motion.div
              initial={{ opacity:0.25 }}
              animate={{ opacity: 1}}
              transition={{ duration: 1 }}
            >
              <div className='space'>
              <motion.h1
              initial={{ opacity: 0.25, }}
              animate={{ opacity: 1}}
              transition = {{ duration:1 }}
              className='signup-title' style= {option ? active: inactive} onClick={()=> setOption(true)}>
                Sign Up
              </motion.h1>
              <h1 className='signup-title' style= {option ? inactive: active} onClick={()=> setOption(false)}>Sign In</h1>
              </div>
              {/* Alerts */}
              {passwordError && 
              <Alert 
              variant="filled" 
              severity="error" 
              color="secondary" 
              onClose={()=>setPasswordError(false)}
              >
                Your password is missing requirements.
              </Alert>
              }
              {serverError && <Alert variant="filled" severity="error" color="secondary" onClose = {()=> setServerError('')}>{serverError}</Alert>}
              {emailError && <Alert variant ="filled" severity="error" color= "secondary" onClose={()=>setEmailError(false)}>Your email does not end with edu.</Alert>}
              {createdAccount && <Alert variant ="filled" severity="success" onClose={()=>setCreatedAccount(false)}>You account is automatically verified, you may login with your signed up credentials. All posts expire in 3 days.</Alert>}
              {disclaimerError && <Alert variant ="filled" severity="error" onClose={()=>setDisclaimerError(false)}>
                You need to agree to terms to sign up.
              </Alert>}
              {/* start of form */}
              <form className='signup' onSubmit={submitHandler}>
                {/* username */}
                <div className='signup_input_wrapper'>
                  <label className='signup_label'>
                    <h3>Username</h3>
                      <input name = "username" 
                        value = {newUser.username} 
                        onChange={formHandler}
                        className = "signup_username"
                      />
                  </label>
                  <p className='form-errors'>{formErrors.username}</p>
                  </div>
                {/* Password section */}
                <div className='signup_input_wrapper'>
                  <label className='signup_label'>
                    <h3>Password</h3>
                      <input 
                        name = "password" 
                        type = "password"  
                        value = {newUser.password} 
                        onChange={formHandler}
                        className = "signup_username"
                      />
                  </label>
                  <p className='form-errors'>{formErrors.password}</p>
                      <p className='requirement-warning' style ={{color:`${requirements.length}`}}>
                        Password length must be 6 or more
                        {requirements.length ==='#005700' && <CheckCircleIcon className='password-checkmark'/>}
                      </p>
                      <p className='requirement-warning' style ={{color:`${requirements.uppercase}`}}>
                        One upper case letter (A-Z)
                        {requirements.uppercase ==='#005700' && <CheckCircleIcon className='password-checkmark'/>}
                      </p>
                      <p className='requirement-warning' style ={{color:`${requirements.numbers}`}}>
                        One number (0-9)
                        {requirements.numbers ==='#005700' && <CheckCircleIcon className='password-checkmark'/>}
                      </p>
                  </div>
                {/* confirm pass */}
                <div className='signup_input_wrapper'>
                  <label className='signup_label'>
                    <h3>Confirm Password</h3>
                      <input 
                        name = "Confirm" 
                        type = "password" 
                        value = {newUser.Confirm} 
                        onChange={formHandler}
                        className = "signup_username"
                      />
                  </label>
                  <p className='form-errors'>{formErrors.Confirm}</p>
                  <p className='form-errors'>{confirm.match}</p>
                  </div>
                {/*Email  */}
                <div className='signup_input_wrapper'>
                  <label className='signup_label'>
                    <h3>Email</h3>
                      <input
                        type = "email" 
                        name = "email" 
                        value = {newUser.email} 
                        onChange = {formHandler}
                        className = "signup_username"
                      />
                  </label>
                  <p className='form-errors'>{formErrors.email}</p>
                  <div style = {{display:"flex", alignItems:"center"}}>
                  <h2
                  style = {{
                    padding:"20px 0px", 
                    cursor:"pointer", 
                    color: "black",
                    textDecoration:"underline"
                  }} 
                  onClick={()=> setDisclaimerClicked(true)}>
                    Terms and Services
                  </h2>
                  {agreeDisclaimer ? <CheckIcon sx = {{fontSize:"2rem", color:"#005700"}}/> : null}
                </div>
                <Disclaimer 
                  open = {disclaimerClicked} 
                  setOpen = {setDisclaimerClicked} 
                  setAgree = {setAgreeDisclaimer}
                />
                </div>
                  <div className='submit-section'>
                  <Button variant="contained" color='secondary' type='submit' className='signup-submit-button'>Sign up</Button>
                  {signLoading && <CircularProgress color="inherit" />}
                  </div>
              </form>
            </motion.div>
            :
            <Login 
            setOption = {setOption}
            option = {option}
            active = {active}
            inactive = {inactive}
            />
            }
          </div>
          }
          <img className = "signup_sideimage_logo"src={landing} alt='landing-pic'/>
      </div>
    </main>
  )
}