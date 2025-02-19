import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../../assets/fairfit_logo.png';
import './splashScreen.scss';

const SplashScreen = () => {
    return (
        <motion.div
            className="splash-screen"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}>
            <img src={logo} alt="logo" />
        </motion.div>
    );
};

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen;
