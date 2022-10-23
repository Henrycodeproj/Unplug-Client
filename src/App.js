import './App.css';
import  { Signup } from './components/homepage/Signup';
import { Navbar } from './components/navigation/navbar'
import { Errorpage } from './components/config/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext} from './components/Contexts/appContext';
import { ExpiredVerification } from "./components/config/ExpiredVerified";
import { Confirmation } from "./components/config/ConfirmationPage";
import { UserAuthentication } from './components/config/userAuth';
import { Profile } from "./components/AuthViews/ProfileViews/profile";
import { Display } from './components/AuthViews/DisplayPage/Display';
import { NotFound } from "./components/config/NotFound";

function App() {
  return (
    <Router>
      <AppContext>
       <Navbar/>
        <Routes>
          <Route path="/" element ={<Signup/>}/>
          <Route element = {<UserAuthentication/>}>
              <Route path="/display" element = {<Display/>}/>
              <Route path="/profile/:userId" element = {<Profile/>}/>
          </Route>
          <Route path = "/invalid/expired/" element = {<ExpiredVerification/>}/>
          <Route path = "/valid" element = {<Confirmation/>}/>
          <Route path = "/error" element ={<NotFound/> }/>
          <Route path = "*" element ={<Errorpage/> }/>
        </Routes>
      </AppContext>
    </Router>
  );
}

export default App;
