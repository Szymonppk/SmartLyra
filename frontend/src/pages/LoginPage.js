import { DefaultInput, RedStoneButton } from "../components/common/CommonComponents";

function LoginPage(){
    
    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-zinc-800 gap-3'>
            <h1 className="
                text-[3vh] 
                font-black 
                text-stone-300 
                drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]
            ">
                Log In
            </h1>

            <div className="bg-stone-500 h-[70vh] w-[50vh] rounded-xl flex flex-col gap-3  justify-start py-20 items-center shadow-2xl shadow-black/60 border-4 border-stone-600">
                <label className="text-stone-800 font-bold text-[1.5vh] w-[25vh] text-left ml-1">Username</label>
                <DefaultInput placeholder = "Enter username..."/>
                <label className="text-stone-800 font-bold text-[1.5vh] w-[25vh] text-left ml-1 mt-2">Password</label>
                <DefaultInput placeholder = "Enter password..." type = "password"/>
                <RedStoneButton>Login</RedStoneButton>
                <p className="text-[1.2vh] text-stone-700 hover:text-stone-900 cursor-pointer underline underline-offset-2">
                    Forgot password?
                </p>
            </div>
            
        </div>
    );
}

export default LoginPage;