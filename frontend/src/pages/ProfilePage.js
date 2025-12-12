import { DefaultBackground } from "../components/common/CommonComponents";
import NavBar from "../components/layout/NavBar";
import ProfileSection from "../components/layout/ProfileSection";

function ProfilePage()
{
    return (
        <DefaultBackground>
            <NavBar/>
            <ProfileSection/>
        </DefaultBackground>
    );
}

export default ProfilePage;