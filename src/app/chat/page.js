import { IoMdSend } from "react-icons/io";

export default function Chatbox () {


    return (
        <>
    <div className="h-full pb-12 md:p-4">
            <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient pt-2 md:pt-6">
               
                
            </div>
        </div>

        <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
            <input className="focus:outline-none rounded-2xl p-3  placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3" type="text" placeholder="Enter your message"
             
            />
           
            <button className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl flex justify-center items-center"
               
            >
               <IoMdSend />
            </button>
        </div>
        </>
    )
}