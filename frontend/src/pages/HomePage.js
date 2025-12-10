import NavBar from '../components/layout/NavBar';
import HomeSection from '../components/layout/HomeSection';

function HomePage(){
    
    return (
        <div className='
             w-full 
             h-full 
             flex 
             flex-col 
             bg-zinc-800
        '>
            <NavBar/>
            <HomeSection/>
        </div>
    );
}

export default HomePage;