import { DefaultHeader, DefaultBackground, DefaultInput, RedStoneButton } from '../components/common/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }
        );
        setError('');
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('smartlyra_token', data.access_token); // may be changed for httpOnly
                setSuccess('Logged In! Redirecting...');
                setTimeout(() => navigate('/'), 2000);
            }
            else {
                setError('Login failed');
            }

        } catch (err) {
            setError('Server conncetion failed');
            console.error(err);
        }

    };

    return (
        <DefaultBackground className='
            items-center
            justify-center
            gap-3
        '>
            <DefaultHeader>
                Log In
            </DefaultHeader>

            <form onSubmit={handleSubmit} className='
                bg-stone-500
                h-[70vh]
                w-[80%]
                max-w-[500px]
                rounded-xl
                flex
                flex-col
                gap-3
                justify-start
                py-20
                items-center
                shadow-2xl
                shadow-black/60
                border-4
                border-stone-600
            '>
                {error && <p className="text-red-300 font-bold bg-red-900/50 px-2 rounded">{error}</p>}
                {success && <p className="text-green-300 font-bold bg-green-900/50 px-2 rounded">{success}</p>}
                <label className='
                    text-stone-800
                    font-bold
                    text-[1.5vh]
                    w-[80%]
                    text-center
                '>
                    Username
                </label>
                <DefaultInput
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Enter username...'
                    required
                />

                <label className='
                    text-stone-800
                    font-bold
                    text-[1.5vh]
                    w-[80%]
                    text-center
                    mt-2
                '>
                    Password
                </label>
                <DefaultInput
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter password...'
                    required           
                />

                <RedStoneButton type='submit'>Login</RedStoneButton>

                <p className='
                    text-[1.2vh]
                    text-stone-700
                    hover:text-stone-900
                    cursor-pointer
                    underline
                    underline-offset-2
                '>
                    Forgot password?
                </p>
                <p onClick={() => navigate('/register')} className='
                    text-[1.2vh]
                    text-stone-700
                    hover:text-stone-900
                    cursor-pointer
                    underline
                    underline-offset-2
                '>
                    Create new account
                </p>
            </form>

        </DefaultBackground>
    );
}

export default LoginPage;