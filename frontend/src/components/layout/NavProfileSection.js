import React, {useState} from 'react';
import profileIcon from '../../images/navbar/profile.png';
import { RedStoneButton } from '../common/CommonComponents';

function NavProfileSection()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    
    return(
        <div className='relative flex items-center justify-center gap-3'>
            <div className='hidden lg:flex items-center gap-3'>
                <RedStoneButton>
                    Tabs
                </RedStoneButton>
                 <RedStoneButton>
                    Recordings
                </RedStoneButton>
            
            <img 
                src={profileIcon} 
                className='h-[10vh] transition-transform hover:scale-95 cursor-pointer'
                onClick={()=> setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (

                <div className='
                        absolute 
                        top-full 
                        right-0 
                        mt-2 
                        w-32 
                        bg-stone-800 
                        border border-stone-600 
                        rounded-lg 
                        shadow-xl 
                        z-50 
                        overflow-hidden
                        flex flex-col
                        hidden
                        lg:flex'
                >
                    <button className='px-4 py-3 text-left text-red-500 font-semibold hover:bg-stone-700 transition-colors'>
                        Profile
                    </button>
                    <button className='px-4 py-3 text-left text-red-500 font-semibold hover:bg-stone-700 transition-colors'>
                        Login
                    </button>
               
                
                </div>
            )}
            </div>
            <button
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className='lg:hidden group p-2 rounded-md hover:bg-black/10 transition-colors'>
                <svg 
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none' 
                    viewBox='0 0 24 24' 
                    strokeWidth={2} 
                    stroke='currentColor' 
                    className='w-[4vh] h-[4vh] text-red-600 group-hover:text-black transition-colors'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                </svg>
            </button>
            {isMenuOpen && (
                <div className='
                    absolute 
                    top-full 
                    right-0 
                    mt-2 
                    w-32 
                    bg-stone-800 
                    border border-stone-600 
                    rounded-lg 
                    shadow-xl 
                    z-50 
                    overflow-hidden
                    flex flex-col
                    lg:hidden'
                >
                    <button className='px-4 py-3 text-left text-stone-200 hover:bg-stone-700 transition-colors border-b border-stone-700'>
                        Recordings
                    </button>
                    <button className='px-4 py-3 text-left text-stone-200 hover:bg-stone-700 transition-colors border-b border-stone-700'>
                        Tabs
                    </button>
                    <button className='px-4 py-3 text-left text-red-500 font-semibold hover:bg-stone-700 transition-colors'>
                        Profile
                    </button>
                    <button className='px-4 py-3 text-left text-red-500 font-semibold hover:bg-stone-700 transition-colors'>
                        Login
                    </button>
                </div>

            )}
        </div>
        
    );

}

export default NavProfileSection;