import React from 'react';

const AnimatedSoundwave = () => {
    const color= "#EF4444"
    return (
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="animate-wave-bar" x="10" y="25" width="8" height="10" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-100" x="30" y="15" width="8" height="30" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-200" x="50" y="5" width="8" height="50" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-300" x="70" y="20" width="8" height="20" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-400" x="90" y="10" width="8" height="40" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-300" x="110" y="25" width="8" height="10" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-200" x="130" y="5" width="8" height="50" rx="4" fill={color}/>
            <rect className="animate-wave-bar delay-100" x="150" y="15" width="8" height="30" rx="4" fill={color}/>
            <rect className="animate-wave-bar" x="170" y="25" width="8" height="10" rx="4" fill={color}/>
        </svg>
    );
};

export default AnimatedSoundwave;