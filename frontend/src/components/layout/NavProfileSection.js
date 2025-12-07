import profileIcon from '../../images/navbar/profile.png';

function NavProfileSection()
{
    return(
        <div className='flex items-center justify-center gap-3'>
            <button className='
                h-[4vh]
                w-[18vh]
                bg-red-600   
                text-stone-400 font-semibold text-[1.5vh] 
                text-center                      
                rounded-md                    
                shadow-md hover:shadow-lg        
                shadow-red-600/40                
                transition-transform hover:scale-95

            '>
                Login
            </button>
            
            <img src={profileIcon} className='h-[10vh] transition-transform hover:scale-95 cursor-pointer'/>
        
        </div>
        
    );

}

export default NavProfileSection;