import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from '../context/AuthContext';

function HomePage(){
    const {user, isAuth} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuth){
            navigate('/login')
        }
    })
    return (
        <div className="container mt-5">
            <h2>Bienvenido! </h2>{user.email} {user.rol==1?'Administrador':'Empleado'}
        </div>
    )
}

export default HomePage;