import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const createAccount = async () => {
        try {

            if (password !== confirmPassword) {
                setError('Password and confirm password don\'t match');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
           <h1>Create Account</h1>
           { error && <p className="error">{error}</p> }
            <input placeholder="Your email address"
                   type="text"
                   value={email}
                   onChange={ e => {setEmail(e.target.value)} }  />
            <input placeholder="Your password"
                   type="password"
                   value={password}
                   onChange={ e => {setPassword(e.target.value)} } />
            
            <input placeholder="Re-enter your password"
                   type="password"
                   value={confirmPassword}
                   onChange={ e => {setConfirmPassword(e.target.value)} } />
            <button onClick={createAccount}>Create account</button>
            <Link to='/login'>Already have an account ? Log in here</Link>
        </>
    );
}

export default CreateAccountPage;