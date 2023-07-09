import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../Utiles/Hooks/useDispatch-hook";
import { useAppSelector } from "../Utiles/Hooks/useSelector-hook";
import { login, selectLogged } from "../Redux/userSettings-slice";
import User from "../Interfaces/UserInterface";

import { Button ,notification  } from 'antd';
import styles from '../Styles/login-page.module.css'

const LoginComponent = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogged = useAppSelector(selectLogged);

  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    try {
      dispatch(login(data))
    } catch (error) {
      openNotification()
    }
  }
    const handleRegisterButton = () => {
    navigate("/signin");
  }

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'No user with such name and email',
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged])

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      <div className={styles.formContainer__inputLabel}>Enter your name</div>
      <input className={styles.formContainer__input} {...register("username", {
        required: "You have to fill this field",
        minLength: {
          value: 6,
          message: 'The number of letters must be more than 6'
        }
      })} />
      {errors?.username && <div className={styles.formContainer__errorMessage}>{errors?.username?.message || "Error!"}</div>}
      <div className={styles.formContainer__inputLabel} >Enter your email</div>
      <input className={styles.formContainer__input} type="email" {...register("email", {
        required: "You have to fill this field",
        minLength: {
          value: 6,
          message: 'The number of letters must be more than 6'
        }
      })} />
      {errors?.email && <div className={styles.formContainer__errorMessage}>{errors?.email?.message || "Error!"}</div>}
      <input className={styles.formContainer__submitButton} type="submit" value='Log in' />


      <Button onClick={handleRegisterButton} className={styles.formContainer__registerButton}>I'm a new user</Button>
    </form>
  )
};

export default LoginComponent;