import { useState, useEffect, useRef } from 'react';
import micImage from '../../images/recording/microphone.png';
import soundwave from '../../images/recording/soundwave.png';
import playIcon from '../../images/recording/play.png';
import downloadIcon from '../../images/recording/download.png';
import save from '../../images/recording/save.svg';

function RecordingSection() {
    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Timer
    useEffect(() => {
        let interval = null;

        if (isRecording) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRecording]);


    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(audioBlob);

                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setSeconds(0);
            setAudioUrl(null);
        } catch (err) {
            console.error('Couldn\'t access microphone', err);
            alert('Couldn\'t access microphone');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };


    const handleMicClick = () => {
        if (isRecording) {
            stopRecording()
        }
        else {
            startRecording();
        }

    };

    const handlePlayAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            alert('Record something first 🎤');
        }
    };

    const handleDownloadAudio = () => {
        
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = 'recording.wav';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleSaveAudio = async () => {
        
        if (!audioBlob) {
            alert("Record something first 🎤");
            return;
        }

        const token = localStorage.getItem('smartlyra_token');

        if (!token) {
            alert('To save recording you need to be logged in');
            return;
        }

        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.wav');

        try {
            const response = await fetch('http://localhost:8001/api/recordings/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Server response', data);
                alert('Recording sent successfully!');
            }
            else {
                console.error('Upload failed', response);
                alert('Error during sending the recording');
            }

        }
        catch (err) {
            console.error('Network error:', err);
            alert('Something is wrong with server connection');
        }
    };

    return (
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
                    onClick={handlePlayAudio}
                    alt='microphone'
                    className='w-[10vh] h-[10vh] cursor-pointer  transition-transform hover:scale-125'
                />
                <img
                    src={downloadIcon}
                    onClick={handleDownloadAudio}
                    alt='download'
                    className='w-[10vh] h-[10vh] cursor-pointer transition-transform hover:scale-125'

                />
                <img
                    src={save}
                    alt='save'
                    onClick={handleSaveAudio}
                    className='w-[10vh] h-[10vh] cursor-pointer transition-transform hover:scale-125'

                />
            </div>


        </div>

    );
}

export default RecordingSection;