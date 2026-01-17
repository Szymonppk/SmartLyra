import { DefaultHeader } from "../common/CommonComponents";
import { useState, useEffect } from "react";

function ProfileSection() {
    const [profile, setProfile] = useState({
        username: '',
        email: ''
    });
    const [error, setError] = useState('');
    
    useEffect(() => {
        async function fetchMe() {
            const token = localStorage.getItem('smartlyra_token');
            
            if(!token)
            {
                setError('Couldn\'t find token');
                return;
            }

            try {
                const response = await fetch('http://localhost:8001/api/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile({
                        username: data.username,
                        email: data.email
                    });
                    
                }
            }
            catch (err) {
                console.log(err);
                setError('Something is wrong with connection');
            }
        }
        fetchMe();
    }, []);

    

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
            <DefaultHeader>{profile.username}</DefaultHeader>
            <DefaultHeader>{profile.email}</DefaultHeader>
        </div>
    );
}

export default ProfileSection;