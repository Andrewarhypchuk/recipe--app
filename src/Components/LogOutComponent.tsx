import { useNavigate } from "react-router";
import { useAppDispatch } from "../Utiles/Hooks/useDispatch-hook";
import { logout } from "../Redux/userSettings-slice";

import styles from '../Styles/start-page.module.css';


const LogOut = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logOutHandler = ()=>{
     dispatch(logout())
     navigate('login')
    }

    return <button  className={styles.headerContainer__item} onClick={logOutHandler}>
                  Log out     
           </button>
};

export default LogOut;