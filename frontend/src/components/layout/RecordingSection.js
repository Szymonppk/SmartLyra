import micImage from '../../images/recording/microphone.png';
import soundwave from '../../images/recording/soundwave.png';
import play from '../../images/recording/play.png';
import download from '../../images/recording/download.png';
import save from '../../images/recording/save.svg';

function RecordingSection()
{
    return(
        <div className='w-full flex-1 flex items-center justify-center flex-col md:flex-row flex-wrap gap-6 md:gap-3 p-4'>
            
            <img 
                src={micImage}
                alt='microphone'
                className='w-[20vh] h-[20vh] cursor-pointer transition-transform hover:scale-125'   
            />
            <img 
                src={soundwave}
                className='w-[40vh] h-[20vh]'
           
           />
           <div className='flex flex-row gap-8'>
           <img 
                src={play}
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