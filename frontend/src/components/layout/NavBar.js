import Logo from './Logo';
import NavProfileSection from './NavProfileSection';

function NavBar()
{
    return (
        <>
           <div className='w-full bg-stone-400 h-[24vh] rounded-r-[40px] flex align-center justify-between px-8'>
                <Logo/>
                <NavProfileSection/>
           </div>
        </>
    );
}

export default NavBar;