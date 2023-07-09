import { Route, Routes } from "react-router-dom";
import ProtectedLogInRoute from "./ProtectedRouteComponent";
import HomePage from "./HomePageComponent";
import LoginComponent from "./LogInComponent";
import AllRecipesContainer from "./AllRecipesContainerComponent";
import SignInComponent from "./SignInComponent";
import UserRecipesListComponent from "./UserRecipesContainer";

import styles from '../Styles/start-page.module.css'
import CookingMode from "./StartCookingModeComponent";
import ProtectedCookModeRoute from "./ProtectedCookModeRouteComponent";

const MainContent = () => {

    return <div className={styles.mainPageContainer} >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/all-recipes" element={<AllRecipesContainer />} />
                    <Route element={<ProtectedLogInRoute />} >
                       <Route path="/saved-recipes" element={<UserRecipesListComponent />} />
                    </Route>
                    <Route element={<ProtectedCookModeRoute />} >
                       <Route path="/cooking" element={<CookingMode />} />
                    </Route>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/signin" element={<SignInComponent />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
           </div>

};

export default MainContent;