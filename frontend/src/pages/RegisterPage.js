import { DefaultHeader, DefaultBackground, DefaultInput, RedStoneButton } from '../components/common/CommonComponents';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmedPassword: ''

    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmedPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8001/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password
                }),
            });

            const data = await response.json();
            // console.log(data);

            if (response.ok) {
                setSuccess('Account created! Redirecting ...');
                setTimeout(() => navigate('/login'), 2000);

            } else {
                setError(data.detail || 'Registration failed!');
            }

        } catch (err) {
            setError("Server connection failed!");
            console.error(err);
        }
    };

    return (
        <DefaultBackground className='
            items-center justify-center
            gap-3
        '>

            <DefaultHeader>
                Create Account
            </DefaultHeader>

            <form onSubmit={handleSubmit} className='
                w-[80%] max-w-[500px] h-[80vh]
                flex flex-col justify-start items-center
                gap-2 py-10
                overflow-y-auto
                bg-stone-500
                rounded-xl
                border-4 border-stone-600
                shadow-2xl shadow-black/60
            '>
                {error && <p className="text-red-300 font-bold bg-red-900/50 px-2 rounded">{error}</p>}
                {success && <p className="text-green-300 font-bold bg-green-900/50 px-2 rounded">{success}</p>}
                <label className='
                    w-[80%] text-center ml-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Email
                </label>
                <DefaultInput
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter email...'
                    type='email'
                    required
                />

                <label className='
                    w-[80%] text-center ml-1 mt-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Username
                </label>
                <DefaultInput
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Choose username...'
                    required
                />

                <label className='
                    w-[80%] text-center ml-1 mt-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Password
                </label>
                <DefaultInput
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Create password...'
                    type='password'
                    required
                />

                <label className='
                    w-[80%] text-center ml-1 mt-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Confirm Password
                </label>
                <DefaultInput
                    name='confirmedPassword'
                    value={formData.confirmedPassword}
                    onChange={handleChange}
                    placeholder='Repeat password...'
                    type='password'
                    required
                />

                <div className='mt-4'>
                    <RedStoneButton type='submit'>
                        Register
                    </RedStoneButton>
                </div>

                <p onClick={() => navigate('/login')} className='
                    mt-2
                    text-[1.2vh]
                    text-stone-700 hover:text-stone-900
                    cursor-pointer
                    underline underline-offset-2
                '>
                    Already have an account? Log in
                </p>

            </form>
        </DefaultBackground>
    );
}

export default RegisterPage;