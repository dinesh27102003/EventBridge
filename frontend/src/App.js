import logo from './logo.svg';
import './App.css';
import GlobalStyle from './globalStyles';
import Home from './pages/Home';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import ParticipatedEvents from './Components/ParticipatedEvents/ParticipatedEvents';
import HostedEvents from './Components/HostedEvents/HostedEvents';


function App() {
  return (
    <BrowserRouter>
      
    <GlobalStyle/>
   
    <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/dashboard/createevent" element={<CreateEvent/>}></Route>
        <Route path="/dashboard/participatedevents" element={<ParticipatedEvents/>}></Route>
        <Route path="/dashboard/hostedevents" element={<HostedEvents/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
