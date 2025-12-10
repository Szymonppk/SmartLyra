import { DefaultInput, RedStoneButton } from "../components/common/CommonComponents";

function RegisterPage() {
    
    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-zinc-800 gap-3'>
            
            
            <h1 className="
                text-[3vh] 
                font-black 
                text-stone-300 
                drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]
            ">
                Create Account
            </h1>

            
            <div className="bg-stone-500 h-[80vh] w-[50vh] rounded-xl flex flex-col gap-2 justify-start py-20 items-center shadow-2xl shadow-black/60 border-4 border-stone-600">
                
                
                <label className="text-stone-800 font-bold text-[1.5vh] w-[25vh] text-left ml-1">Email</label>
                <DefaultInput placeholder="Enter email..." type="email"/>

                
                <label className="text-stone-800 font-bold text-[1.5vh] w-[25vh] text-left ml-1 mt-1">Username</label>
                <DefaultInput placeholder="Choose username..."/>

               
                <label className="text-stone-800 font-bold text-[1.5vh] w-[25vh] text-left ml-1 mt-1">Password</label>
                <DefaultInput placeholder="Create password..." type="password"/>

                
                <label className="text-stone-800 font-bold text-[1.5vh] w-[25vh] text-left ml-1 mt-1">Confirm Password</label>
                <DefaultInput placeholder="Repeat password..." type="password"/>

                <RedStoneButton className="mt-4">
                    Register
                </RedStoneButton>

                
                <p className="text-[1.2vh] text-stone-700 hover:text-stone-900 cursor-pointer underline underline-offset-2 mt-2">
                    Already have an account? Log in
                </p>

            </div>
        </div>
    );
}

export default RegisterPage;