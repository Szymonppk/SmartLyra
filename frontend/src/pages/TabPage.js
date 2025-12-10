function TabPage() {
    const items = Array.from({ length: 100 }, (_, i) => i);

    return (
        <div className='
            w-full h-full
            flex flex-col items-center justify-center
            bg-zinc-800
            gap-3
        '>
            <h1 className='
                text-[3vh] font-black
                text-stone-300
                drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]
            '>
                Tabs
            </h1>

            <div className='
                w-[80%] max-w-[1300px] h-[90vh]
                flex flex-wrap justify-center content-start
                gap-3 p-10
                overflow-y-auto
                bg-stone-500
                rounded-xl
                border-4 border-stone-600
                shadow-2xl shadow-black/60
            '>
                {items.map((item) => (
                    <div key={item} className='
                        w-24 h-24
                        flex items-center justify-center
                        bg-stone-700
                        rounded-lg
                        text-white
                        shadow-md
                    '>
                        {item + 1}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default TabPage;