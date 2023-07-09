import { Outlet } from "react-router";
import { useAppSelector } from "../Utiles/Hooks/useSelector-hook";
import { selectCookingModeRecipe } from "../Redux/cookingMode-slice";
import { selectLogged } from "../Redux/userSettings-slice";
import NoAccess from "./NoAccessComponent";
const ProtectedCookModeRoute = () => {

    const isCookingModeRecipe = useAppSelector(selectCookingModeRecipe);
    const isLogged = useAppSelector(selectLogged);

    return isCookingModeRecipe && isLogged  ? <Outlet /> : <NoAccess  text='You did not choose recipe for cooking! Log in and choose a recipe!' />
}

export default ProtectedCookModeRoute;