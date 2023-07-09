import { Outlet } from "react-router";
import { useAppSelector } from "../Utiles/Hooks/useSelector-hook";
import { selectLogged } from "../Redux/userSettings-slice";
import NoAccess from "./NoAccessComponent";



const ProtectedLogInRoute = () => {

    const isLogged = useAppSelector(selectLogged);

    return isLogged ? <Outlet /> : <NoAccess  />
}

export default ProtectedLogInRoute;