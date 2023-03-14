import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try{
            if(password !== confirmPassword){
                setError('Password and Confirm Password do not Match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        }catch(e){
            setError(e.message);
        }
    }

    return(
        <>
            <h1>Create Account</h1>
            <div className='login-form'>
                {error && <div className='error'>{error}</div>}                
                <input placeholder='Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Your Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input placeholder='Re-enter Your Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className='button' onClick={createAccount}>Create Account</button>
                <Link to='/login'>Already have account? Log in here.</Link>
            </div>
        </>
    );       
}

export default CreateAccountPage;