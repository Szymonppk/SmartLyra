import NavBar from '../components/layout/NavBar';
import HomeSection from '../components/layout/HomeSection';
import { DefaultBackground } from '../components/common/CommonComponents';
function HomePage(){
    
    return (
        <DefaultBackground>
            <NavBar/>
            <HomeSection/>
        </DefaultBackground>
    );
}

export default HomePage;