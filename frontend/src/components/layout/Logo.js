import logo from '../../images/navbar/logo.png';
import { useNavigate } from 'react-router-dom';

function Logo()
{
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/')} className='flex flex-row items-center gap-2 select-none cursor-pointer group'>
           <img
                src={logo}
                alt="SmartLyra-Logo"
                className='w-[10vh] h-[10vh] object-contain drop-shadow-lg transition-transform duration-300 group-hover:rotate-12'
           /> 
           <h1 className="text-[1.5em] font-bold tracking-wide font-['Cinzel'] drop-shadow-md">
                
                <span className="text-black-500">
                    Smart
                </span>
                
                <span className="text-black-500 ml-0.5">
                    Lyra
                </span>
            </h1>

        </div>
    );
}

export default Logo;