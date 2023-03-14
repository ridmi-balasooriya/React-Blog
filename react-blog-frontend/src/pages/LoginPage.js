import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const LoginPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ]  = useState('');
    const navigate = useNavigate();

    const logIn = async() => {
        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        }catch(e){
            setError(e.message);
        }
    }


    return(
        <>
            <h1>Login to Your Account</h1>            
            <div className="login-form">
                {error && <div className="error">{error}</div>}
                <input placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Your Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="button" onClick={logIn}>Log In</button>
                <Link to='/create-account'>Don't have an account? Create on here.</Link>
            </div>
        </>
        
    );
}

export default LoginPage;