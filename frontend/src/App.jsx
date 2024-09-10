import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import RegistrationForm from "./components/register";
import LoginForm from "./components/login";
import GetEmpleados from "./components/listarEmpleados";
import GetSolicitudes from "./components/listarSolicitudes";
import NavigationBar from './components/navBar'
import HomePage from './components/home'
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar/>
        <div className='mt-4'>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/register' element={<RegistrationForm/>}></Route>
            <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/empleados' element={<GetEmpleados/>}></Route>
            <Route path='/solicitudes' element={<GetSolicitudes/>}></Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
