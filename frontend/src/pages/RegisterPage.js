import { DefaultHeader, DefaultBackground, DefaultInput, RedStoneButton } from '../components/common/CommonComponents';

function RegisterPage() {

    return (
        <DefaultBackground className='
            items-center justify-center
            gap-3
        '>

            <DefaultHeader>
                Create Account
            </DefaultHeader>

            <div className='
                w-[80%] max-w-[500px] h-[80vh]
                flex flex-col justify-start items-center
                gap-2 py-10
                overflow-y-auto
                bg-stone-500
                rounded-xl
                border-4 border-stone-600
                shadow-2xl shadow-black/60
            '>

                <label className='
                    w-[80%] text-center ml-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Email
                </label>
                <DefaultInput
                    placeholder='Enter email...'
                    type='email'
                />

                <label className='
                    w-[80%] text-center ml-1 mt-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Username
                </label>
                <DefaultInput
                    placeholder='Choose username...'
                />

                <label className='
                    w-[80%] text-center ml-1 mt-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Password
                </label>
                <DefaultInput
                    placeholder='Create password...'
                    type='password'
                />

                <label className='
                    w-[80%] text-center ml-1 mt-1
                    text-[1.5vh] font-bold
                    text-stone-800
                '>
                    Confirm Password
                </label>
                <DefaultInput
                    placeholder='Repeat password...'
                    type='password'
                />

                <div className='mt-4'>
                    <RedStoneButton>
                        Register
                    </RedStoneButton>
                </div>

                <p className='
                    mt-2
                    text-[1.2vh]
                    text-stone-700 hover:text-stone-900
                    cursor-pointer
                    underline underline-offset-2
                '>
                    Already have an account? Log in
                </p>

            </div>
        </DefaultBackground>
    );
}

export default RegisterPage;