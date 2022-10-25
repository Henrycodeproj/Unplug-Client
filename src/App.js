import './App.css';
import  { Signup } from './components/homepage/Signup.jsx';
import { Navbar } from './components/navigation/navbar.jsx'
import { Errorpage } from './components/config/ErrorPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext} from './components/Contexts/appContext.jsx';
import { ExpiredVerification } from "./components/config/ExpiredVerified.jsx";
import { Confirmation } from "./components/config/ConfirmationPage.jsx";
import { UserAuthentication } from './components/config/userAuth.jsx';
import { Profile } from "./components/AuthViews/ProfileViews/profile.jsx";
import { Display } from './components/AuthViews/DisplayPage/Display.jsx';
import { NotFound } from "./components/config/NotFound.jsx";

function App() {
  return (
    <Router basename='/unplug-client'>
      <AppContext>
       <Navbar/>
        <Routes>
          <Route path="/" element ={<Signup/>}/>
          <Route element = {<UserAuthentication/>}>
              <Route path="/display" element = {<Display/>}/>
              <Route path="/#/profile/:userId" element = {<Profile/>}/>
          </Route>
          <Route path = "/#/invalid/expired/" element = {<ExpiredVerification/>}/>
          <Route path = "/#/valid" element = {<Confirmation/>}/>
          <Route path = "/#/error" element ={<NotFound/> }/>
          <Route path = "*" element ={<Errorpage/> }/>
        </Routes>
      </AppContext>
    </Router>
  );
}

export default App;
