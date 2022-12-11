import React from 'react'
import {BsSearch} from "react-icons/bs"
import HeaderIcon from '../Header/Headericon';
import {
    Profile, Home, Heart,Post
} from "../Header/Headericons";

const HEADER_ITEMS=[
    {
        icon:Home,
        url:'/',
        name:"Home",
    },
    {
        icon: Post,
        url:"/",
        name:"Post",
    },{
        icon:Heart,
        url:"/",
        name:"Likes",
    },
    {
        icon:Profile,
        url:"/",
        name:"Person",
    },
];
const Headert = () => {
  return (
    <header className='w-full flex items-center justify-around h-16 bg-white shadow-lg'>
         <div className="text-xl font-semibold tracking-wider sursor-pointer select-none"> TWEETY 🐤 </div>
         <div className='flex bg-gray-100 space-x-4 items-center focus:border-gray-400 border rounded -lg px-2'>
            <BsSearch className='text-lg '/>
            <input 
             type ="search" 
             name="search" 
             id="search"
             className ='bg-gray-100 hover:bg-transparent 
              focus:bg-transparent  placeholder:text-sm 
              py-1 px-2 outline-none w-full 
              rounded-sm  transition'
              placeholder="Search"
            />
         </div>
         <div className='flex items-center space-x-6 '> 
            <div className='flex space-x-6'>
                {HEADER_ITEMS.map((item)=>(
                    <HeaderIcon
                        Icon={item.icon}
                        key={item.name}
                    />  
                    ))}
                    
            </div>
            <button  className="bg-yellow-500 h-9  py-1 px-5 text-white active:scale-95 
              transform transistion w-full disabled:bg-opacity-50 disabled:scale-100 rounded  text-sm font-semibold">Logout</button>
         </div>     
        </header>  
  )
};

export default Headert;