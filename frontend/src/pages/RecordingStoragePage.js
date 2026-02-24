import { DefaultHeader, DefaultBackground, FileUploader } from "../components/common/CommonComponents";
import NavBar from "../components/layout/NavBar";
import { useState, useEffect } from "react";

function RecordingStoragePage() {
    const [recordings, setRecordings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [audioBlob, setAudioBlob] = useState(null);

    const fetchRecordings = async () => {
        const token = localStorage.getItem('smartlyra_token');
        if (!token) {
            alert("Please log in first.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8001/api/recordings/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRecordings(data);
                console.log(data)
            } else {
                console.error("Failed to fetch recordings");
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const uploadFile = async (fileObject) => {
        const token = localStorage.getItem('smartlyra_token');
        if (!token) {
            alert('To save recording you need to be logged in');
            return;
        }

        const formData = new FormData();
        
        formData.append('file', fileObject, fileObject.name || 'recording.wav');

        try {
            const response = await fetch('http://localhost:8001/api/recordings/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert('File uploaded successfully!');
                fetchRecordings(); 
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    };

    
    const handleFilesDropped = (droppedFiles) => {
        if (droppedFiles.length > 0) {
            const file = droppedFiles[0]; 
            uploadFile(file);
        }
    };
    
    const handleDownload = async (id, filename) => {
        const token = localStorage.getItem('smartlyra_token');
        try {
            const response = await fetch(`http://localhost:8001/api/recordings/${id}/download`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("Failed to download file");
            }
        } catch (error) {
            console.error("Download error:", error);
        }
    };

    return (
        <DefaultBackground className='flex flex-col items-center gap-3'>
            <NavBar />
            <DefaultHeader>
                Your Recordings
            </DefaultHeader>


            <div className='
                w-[80%] max-w-[1300px] h-[90vh]
                flex flex-wrap justify-center content-start
                gap-4 p-10
                overflow-y-auto
                bg-stone-500
                rounded-xl
                border-4 border-stone-600
                shadow-2xl shadow-black/60
                mb-5
            '>
                <FileUploader onFilesSelected={handleFilesDropped} className="border-none p-0">
                    <div className='w-40 h-52 bg-stone-700 flex flex-col justify-center items-center rounded-lg p-3 text-white shadow-md hover:shadow-xl hover:scale-105 transform duration-200 text-center cursor-pointer border-2 border-dashed border-stone-500 hover:border-emerald-500'>
                        <div className="text-3xl mb-2">📁</div>
                        Upload and analyze!
                        <p className="text-[10px] mt-2 opacity-50">Drag & drop .wav file</p>
                    </div>
                </FileUploader>
                {loading ? (
                    <div className="text-white text-xl animate-pulse">Loading library...</div>
                ) : recordings.length === 0 ? (
                    <>
                        <div className="text-white text-xl opacity-70 h-52 flex flex-col justify-center items-center">No recordings found. Go record or upload something! 🎤</div>
                        
                    </>
                ) : (
                    <>
                        {recordings.map((rec) => (
                            <div key={rec.id} className='
                            w-40 h-52
                            flex flex-col items-center justify-between
                            bg-stone-700
                            rounded-lg
                            p-3
                            text-white
                            shadow-md hover:shadow-xl hover:scale-105 transform duration-200
                        '>
                                <div className="text-xs text-stone-300 w-full truncate text-center mb-1" title={rec.filename}>
                                    {rec.filename}
                                </div>

                                <div className="flex-grow flex items-center justify-center">
                                    <div className={`text-center font-bold ${rec.scale_name === 'Analyzing...' ? 'text-yellow-400 animate-pulse' : 'text-emerald-400 text-lg'}`}>
                                        {rec.scale_name}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDownload(rec.id, rec.filename)}
                                    className="
                                    mt-2 w-full py-1
                                    bg-stone-600 hover:bg-stone-500
                                    rounded text-xs font-bold transition-colors
                                    flex items-center justify-center gap-2
                                "
                                >
                                    <span>⬇️ Download</span>
                                </button>

                                <div className="text-[10px] text-stone-400 mt-2">
                                    {formatDate(rec.created_at)}
                                </div>
                            </div>

                        ))}
                    </>
                )}
            </div>

        </DefaultBackground>
    );
}

export default RecordingStoragePage;