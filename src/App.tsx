import Footer from './Components/FooterComponent';
import Header from './Components/HeaderComponent';
import MainContent from './Components/MainContentComponent';
import './Styles/base.css';
import styles from './Styles/start-page.module.css';

function App() {
  return (
    <div className={styles.startPageContainer}>
         <Header />
         <MainContent />
         <Footer />
    </div>
  );
}

export default App;
