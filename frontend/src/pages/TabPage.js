import { DefaultHeader, DefaultBackground } from "../components/common/CommonComponents";
import NavBar from "../components/layout/NavBar";
import { useState, useEffect } from "react";

function TabPage() {
    const [tabs, setTabs] = useState([]);

    
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");

   
    const [currentString, setCurrentString] = useState("");
    const [currentFret, setCurrentFret] = useState("");
    const [notes, setNotes] = useState([]);

    const fetchTabs = async () => {
        const token = localStorage.getItem('smartlyra_token');
        try {
            const response = await fetch('http://localhost:8001/api/tabs', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) setTabs(await response.json());
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchTabs(); }, []);

    const addNote = () => {
        if (currentString && currentFret) {
            const s = parseInt(currentString);
            const f = parseInt(currentFret);
            if (s >= 1 && s <= 6 && f >= 0 && f <= 24) {
                setNotes([...notes, { string: s, fret: f }]);
                setCurrentFret(""); 
            } else {
                alert("String must be 1-6, Fret 0-24");
            }
        }
    };

    const handleSave = async () => {
        if (!title || !genre || notes.length === 0) {
            alert("Fill Title, Genre and add at least one note!");
            return;
        }

        const token = localStorage.getItem('smartlyra_token');
        const payload = { title, artist, genre, content: notes };

        try {
            const res = await fetch('http://localhost:8001/api/tabs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Tab created successfully!");
                setNotes([]); setTitle(""); setArtist(""); setGenre("");
                fetchTabs();
            } else {
                alert("Error saving tab");
            }
        } catch (e) { console.error(e); }
    };

    return (
        <DefaultBackground className='flex flex-col items-center gap-5'>
            <NavBar />
            <DefaultHeader>Guitar Tabs Library</DefaultHeader>

            <div className='w-[90%] max-w-[1200px] flex flex-col md:flex-row gap-5 h-[80vh]'>

                
                <div className='flex-1 bg-stone-800 p-6 rounded-xl border-2 border-stone-600 overflow-y-auto shadow-lg h-full min-h-0'>
                    <h2 className="text-emerald-400 font-bold text-xl mb-6 border-b border-stone-600 pb-2">
                        Create New Tab
                    </h2>

                    <div className="flex flex-col gap-4 mb-8">
                        <div>
                            <label className="text-stone-400 text-xs uppercase font-bold">Song Title</label>
                            <input className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:border-emerald-500 outline-none"
                                value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-stone-400 text-xs uppercase font-bold">Artist</label>
                            <input className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:border-emerald-500 outline-none"
                                value={artist} onChange={e => setArtist(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-stone-400 text-xs uppercase font-bold">Genre</label>
                            <input className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:border-emerald-500 outline-none"
                                value={genre} onChange={e => setGenre(e.target.value)} />
                        </div>
                    </div>

                    <div className="bg-stone-900 p-4 rounded-lg mb-6 border border-stone-700">
                        <h3 className="text-stone-300 text-sm font-bold mb-3">Add Note Sequencer</h3>
                        <div className="flex gap-2 items-end">
                            <div>
                                <label className="text-stone-500 text-[10px]">String (1-6)</label>
                                <input type="number" className="w-20 p-2 rounded bg-stone-700 text-white border border-stone-600"
                                    value={currentString} onChange={e => setCurrentString(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-stone-500 text-[10px]">Fret (0-24)</label>
                                <input type="number" className="w-20 p-2 rounded bg-stone-700 text-white border border-stone-600"
                                    value={currentFret} onChange={e => setCurrentFret(e.target.value)} />
                            </div>
                            <button onClick={addNote} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded font-bold transition h-[42px]">
                                + Add
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 min-h-[50px] bg-stone-900/50 p-3 rounded border border-stone-700/50">
                        {notes.length === 0 && <span className="text-stone-600 text-sm italic py-2">Added notes will appear here...</span>}
                        {notes.map((n, i) => (
                            <div key={i} className="bg-stone-700 text-emerald-300 px-2 py-1 rounded text-xs font-mono border border-stone-600 flex items-center gap-2">
                                <span>S:{n.string}</span>
                                <span className="text-white">|</span>
                                <span>F:{n.fret}</span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold shadow-lg transition transform active:scale-95">
                        💾 Save Tab to Library
                    </button>
                </div>

               
                <div className='flex-1 bg-stone-500 rounded-xl border-4 border-stone-600 shadow-2xl overflow-y-auto flex flex-col h-full min-h-0'>
                    
     
                    <h2 className="text-white font-bold text-xl sticky top-0 bg-stone-500 p-6 pb-4 border-b border-stone-400/30 z-20">
                        Your Library
                    </h2>

               
                    <div className="p-6 pt-2 flex flex-col gap-4">
                        {tabs.length === 0 ? (
                            <div className="text-center text-stone-300 mt-10 opacity-70">Library is empty. Create your first tab!</div>
                        ) : (
                            tabs.map((tab) => (
                                <div key={tab.id} className="bg-stone-700 p-4 rounded-lg shadow-md hover:bg-stone-600 hover:shadow-xl transition duration-200 cursor-pointer group border border-stone-600">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-emerald-400 font-bold text-lg group-hover:text-emerald-300">{tab.title}</div>
                                            <div className="text-stone-300 text-sm italic">{tab.artist || "Unknown Artist"}</div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="bg-stone-800 text-xs text-stone-400 px-2 py-1 rounded">#{tab.id}</span>
                                            <span className="text-[10px] text-stone-400 mt-1">{new Date(tab.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="bg-stone-900 p-2 rounded flex gap-1 overflow-hidden opacity-80 group-hover:opacity-100 transition">
                                        {tab.content.slice(0, 10).map((n, i) => (
                                            <div key={i} className="flex flex-col items-center bg-stone-800 px-1 rounded border border-stone-700 min-w-[20px]">
                                                <span className="text-[8px] text-stone-500">{n.string}</span>
                                                <span className="text-[10px] text-emerald-500 font-bold leading-3">{n.fret}</span>
                                            </div>
                                        ))}
                                        {tab.content.length > 10 && <span className="text-stone-500 text-xs self-center ml-1">...</span>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </DefaultBackground>
    );
}

export default TabPage;