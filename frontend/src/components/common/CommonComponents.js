export const RedStoneButton = ({ children, onClick, className = "" }) =>{

    const baseStyle = "h-[4vh] w-[18vh] border-2 border-red-700 text-black font-semibold text-[1.5vh] text-center rounded-md shadow-md hover:shadow-lg shadow-black/40 transition-transform hover:scale-95";

    return (
        <button onClick={onClick} className={`${baseStyle} ${className}`}>
            {children}
        </button>
    );
};

export const DefaultInput = ({type = "text", placeholder, className=""}) =>{

    const baseStyle = "h-[4vh] w-[25vh] bg-stone-200 border-2 border-stone-600 rounded-md px-3 text-stone-800 text-[1.5vh] placeholder-stone-500 focus:outline-none focus:border-stone-800 focus:bg-white shadow-inner transition-colors";

    return (
        <input 
            className={`${baseStyle} ${className}`}
            type ={type}
            placeholder={placeholder}    
        />
    );
};