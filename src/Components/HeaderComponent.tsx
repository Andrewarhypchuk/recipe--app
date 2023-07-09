import { NavLink } from "react-router-dom";
import { useAppSelector } from "../Utiles/Hooks/useSelector-hook";
import { selectLogged } from "../Redux/userSettings-slice";
import LogOut from "./LogOutComponent";

import styles from '../Styles/start-page.module.css'

const Header = () => {
    const isLogged = useAppSelector(selectLogged);

    return <div className={styles.headerContainer} >
                 <NavLink className={styles.headerContainer__item} to={"/"} >Home</NavLink>
                 <NavLink className={styles.headerContainer__item} to={"all-recipes"} >All recipes</NavLink>
                 {isLogged && <NavLink className={styles.headerContainer__item} to={"saved-recipes"} >Your recipes</NavLink>}
                 {isLogged && <NavLink className={styles.headerContainer__item} to={"cooking"} >Cooking</NavLink>}
                 {!isLogged && <NavLink className={styles.headerContainer__item} to={"login"} >Login</NavLink> }
                 {isLogged && <LogOut />}
           </div>

};

export default Header