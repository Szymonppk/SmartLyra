import { DefaultHeader, DefaultBackground,DefaultInput, RedStoneButton } from '../components/common/CommonComponents';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const navigate = useNavigate();
    return (
        <DefaultBackground className='
            items-center
            justify-center
            gap-3
        '>
            <DefaultHeader>
                Log In
            </DefaultHeader>

            <div className='
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
                <label className='
                    text-stone-800
                    font-bold
                    text-[1.5vh]
                    w-[80%]
                    text-center
                    
                '>
                    Username
                </label>
                <DefaultInput placeholder='Enter username...' />

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
                    placeholder='Enter password...'
                    type='password'
                />

                <RedStoneButton>Login</RedStoneButton>

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
                <p onClick={()=>navigate('/register')} className='
                    text-[1.2vh]
                    text-stone-700
                    hover:text-stone-900
                    cursor-pointer
                    underline
                    underline-offset-2
                '>
                    Create new account
                </p>
            </div>

        </DefaultBackground>
    );
}

export default LoginPage;