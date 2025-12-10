import Fretboard from '../music/Fretboard'
import RecordingSection from './RecordingSection';

function HomeSection()
{
    return(
        <div className="h-screen w-full flex flex-col">
            <RecordingSection/>
            <Fretboard/>
            
        </div>
    );
}

export default HomeSection;