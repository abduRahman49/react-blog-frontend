import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    
    const login = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <h1>Login</h1>
            { error && <p className="error">{error}</p> }
            <input placeholder="Your email address"
                   type="text"
                   value={email}
                   onChange={ e => {setEmail(e.target.value)} }  />
            <input placeholder="Your password"
                   type="password"
                   value={password}
                   onChange={ e => {setPassword(e.target.value)} } />
            <button onClick={login}>Login</button>
            <Link to='/create-account'>Don't have an account ? Create one here</Link>
        </>
    );
}

export default LoginPage;