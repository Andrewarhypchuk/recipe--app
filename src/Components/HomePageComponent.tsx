import foodImage from '../Assets/Images/food-foto.jpeg';

import styles from '../Styles/home-page.module.css';


const HomePage = () => {

    return <div className={styles.homePageContainer} >

        <div className={styles.homePageContainer__title} >Welcome to our recipe website!<br></br>

            We are delighted to have you here, where you'll find delicious and creative recipes for every taste. Regardless of your culinary expertise, we have something special for everyone.

            Indulge yourself at home, prepare tasty dishes for your family and friends, or experiment with new ideas. Our website will provide you with inspiring recipes, detailed instructions, and helpful tips.

            And the best part is, you can contribute by adding your own recipes! Remember your favorite dishes, share them with other users, and create your culinary community.

            Don't forget to check out our regular updates and new recipes. There's always something fresh for you to expand your culinary repertoire.

            We wish you a pleasant time on our website and unforgettable culinary adventures!

            Best regards,
            
            The Recipe Website Team
            </div>
        <img className={styles.homePageContainer__foto} src={foodImage} alt='foodImage' />
    </div>

};

export default HomePage;