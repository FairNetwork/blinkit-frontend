import Button from '../../button/Button';
import './user.scss';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const navigate = useNavigate();

    const isLoggedIn = true;

    const handleClick = () => {
        if (isLoggedIn) {
            // ToDo add logout
        } else {
            navigate('/log-in');
        }
    };

    return (
        <div className="user">
            <div className="user__login-button">
                <Button onClick={handleClick}>{isLoggedIn ? 'Abmelden' : 'Anmelden'}</Button>
            </div>
        </div>
    );
};

User.displayName = 'User';

export default User;
