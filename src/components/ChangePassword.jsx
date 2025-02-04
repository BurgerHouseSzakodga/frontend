import { useState, useContext } from 'react';
import { AuthContext } from '../context/contexts';
import { apiClient } from '../api/axios';
import passwordIcon from "/assets/password.svg";
import '../sass/components/change-password.css';


function ChangePassword() {
    const [passwords, setPasswords] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.put('/api/user/password', passwords);
            setStatus('Jelszó sikeresen módosítva!');
            setError(null);
            // Reset form
            setPasswords({
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Hiba történt a jelszó módosítása során');
            setStatus(null);
        }
    };

    return (
        <div className="change-password">
           
            
            <form onSubmit={handleSubmit}>
            <h3>Jelszó módosítása</h3>
            {status && <div className="alert success">{status}</div>}
            {error && <div className="alert error">{error}</div>}
                <div>
                    <label htmlFor="current_password">Jelenlegi jelszó:</label>
                     <img src={passwordIcon} />
                    <input
                        type="password"
                        id="current_password"
                        name="current_password"
                        value={passwords.current_password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="new_password">Új jelszó:</label>
                     <img src={passwordIcon} />
                    <input
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={passwords.new_password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="new_password_confirmation">Új jelszó megerősítése:</label>
                     <img src={passwordIcon} />
                    <input
                        type="password"
                        id="new_password_confirmation"
                        name="new_password_confirmation"
                        value={passwords.new_password_confirmation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Jelszó módosítása</button>
            </form>
        </div>
    );
}

export default ChangePassword;