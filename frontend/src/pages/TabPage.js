import { DefaultHeader, DefaultBackground } from "../components/common/CommonComponents";
import NavBar from "../components/layout/NavBar";

function TabPage() {
    const items = Array.from({ length: 100 }, (_, i) => i);

    return (
        
        <DefaultBackground className='
            flex flex-col items-center
            gap-3
        '>
            <NavBar/>
            <DefaultHeader>
                Tabs
            </DefaultHeader>

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
           
        </DefaultBackground>
    );
}

export default TabPage;