import {useState, useEffect, useRef} from 'react';
import micImage from '../../images/recording/microphone.png';
import soundwave from '../../images/recording/soundwave.png';
import playIcon from '../../images/recording/play.png';
import download from '../../images/recording/download.png';
import save from '../../images/recording/save.svg';

function RecordingSection()
{
    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(()=>{
        let interval = null;

        if(isRecording){
            interval = setInterval(()=>{
                setSeconds((prevSeconds) => prevSeconds + 1);
            },1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    const formatTime = (totalSeconds) =>{
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    };

    const handleMicClick = () =>{
        if(!isRecording)
        {
            setSeconds(0);
        }
        setIsRecording(!isRecording);
    };

    return(
        <div className='w-full flex-1 flex items-center justify-center flex-col md:flex-row flex-wrap gap-6 md:gap-3 p-4'>
            
            <div className='flex flex-col items-center justify-center gap-2'>
                <img
                    src={micImage}
                    alt='microphone'
                    onClick={handleMicClick} 
                    className={`w-[20vh] h-[20vh] cursor-pointer transition-transform hover:scale-125 ${isRecording ? 'scale-110 drop-shadow-xl animate-pulse' : ''}`}
                />
                
                {isRecording && <div className={`text-2xl font-mono font-bold text-gray-700 transition-opacity duration-300 ${isRecording || seconds > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    {formatTime(seconds)}
                </div>}
            </div>
            <img 
                src={soundwave}
                className='w-[40vh] h-[20vh]'
           
           />
           <div className='flex flex-row gap-8'>
           <img 
                src={playIcon}
                alt='microphone'
                className='w-[10vh] h-[10vh] cursor-pointer  transition-transform hover:scale-125'   
            />
            <img 
                src={download}
                className='w-[10vh] h-[10vh] cursor-pointer transition-transform hover:scale-125'
           
           />
            <img 
                src={save}
                className='w-[10vh] h-[10vh] cursor-pointer transition-transform hover:scale-125'
           
           />
           </div>


        </div>

    );
}

export default RecordingSection;