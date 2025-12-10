import React, {useState} from 'react';
import profileIcon from '../../images/navbar/profile.png';
import { RedStoneButton } from '../common/CommonComponents';

function NavProfileSection()
{
    const [isMenuopen, setIsMenuOpen] = useState(false);
    
    return(
        <div className='relative flex items-center justify-center gap-3'>
            <div className='hidden md:flex items-center gap-3'>
                <RedStoneButton>
                    Login
                </RedStoneButton>
            
            <img src={profileIcon} className='h-[10vh] transition-transform hover:scale-95 cursor-pointer'/>
            </div>
            <button
                 
                className="group p-2 rounded-md hover:bg-black/10 transition-colors">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-[4vh] h-[4vh] text-red-600 group-hover:text-black transition-colors"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
        
    );

}

export default NavProfileSection;