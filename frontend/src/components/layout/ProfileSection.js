import { DefaultHeader } from "../common/CommonComponents";

function ProfileSection()
{
    return (
        <div className='
                       flex flex-1 flex-col items-center
                       mt-5
                       gap-3
                       '
        >
            <div className='
                            h-[30vh] 
                            w-[30vh] 
                            bg-stone-400
                            rounded-lg 
                            flex items-center justify-center'
            >
                Profile photo
            </div>
            <DefaultHeader>Username</DefaultHeader>
            <DefaultHeader>Email</DefaultHeader>
        </div>
    );
}

export default ProfileSection;