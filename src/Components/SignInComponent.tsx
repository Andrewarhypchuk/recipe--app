import { useEffect }  from "react";
import { useForm ,SubmitHandler  } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../Utiles/Hooks/useDispatch-hook";
import { useAppSelector } from "../Utiles/Hooks/useSelector-hook";
import { addUser ,selectLogged } from "../Redux/userSettings-slice";
import User from "../Interfaces/UserInterface";

import { notification } from 'antd';
import styles from '../Styles/login-page.module.css';

const SignInComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLogged = useAppSelector(selectLogged);

    const { register, handleSubmit ,formState: { errors }} = useForm<User>();

    const onSubmit: SubmitHandler<User> = (data) => {
         const newUser = {
             id: Date.now().toString(),
             username: data.username,
             email: data.email,
             favoriteRecipes: [],
             savedRecipes: [],
         }
        
        try {
            dispatch(addUser(newUser));
          } catch (error) {
            openNotification()
          }
    }

    const [api, contextHolder] = notification.useNotification();
    
    const openNotification = () => {
        api.open({
          message: 'User with the same name already exists',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      };

    useEffect(()=>{
        if(isLogged){
            navigate("/");
        }
    },[isLogged])
  
    return (
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <div className={styles.formContainer__inputLabel}>Enter your name</div>
        <input className={styles.formContainer__input} {...register("username",{
                required: "You have to fill this field",
                minLength: {
                    value: 6,
                    message: 'The number of letters must be more than 6'
                }
            })} />
      {errors?.username && <div className={styles.formContainer__errorMessage}>{errors?.username?.message || "Error!"}</div>}
       <div className={styles.formContainer__inputLabel} >Enter your email</div>       
       <input className={styles.formContainer__input} type="email" {...register("email",  {
                required: "You have to fill this field",
                minLength: {
                    value: 6,
                    message: 'The number of letters must be more than 6'
                }
            })} />
      {errors?.email &&  <div className={styles.formContainer__errorMessage}>{errors?.email?.message || "Error!"}</div>}
        <input className={styles.formContainer__submitSignInButton}type="submit" value='Sign in' />
      </form>
    )
};

export default SignInComponent;