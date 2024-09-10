import React from 'react';


//import image files
import logo from '../Assests/PixelPlaza.png';
import { Link } from 'react-router-dom';


const Navbar = () => {


    //navbar 

  return (
       <div className='fixed flex-col h-[5rem] justify-center items-center w-[100vw] bg-secondary z-50'>
            
            <div className='flex h-[4.5rem] justify-center items-center w-[100vw] p-5 z-50'>

            <div className='flex w-[25vw] h-auto justify-center items-center'>
                    <img src= {logo} alt='' style={{
                        width:'100px'
                    }}/>
                </div>

                <div className='flex h-auto w-[50vw] items-center justify-center'>
                    <ul className='flex text-xl text-primary font-russoone space-x-10'>
                        <li  className='hover:scale-110 hover:text-baseextra2 cursor-pointer transition-transform duration-200 ease-in-out'><Link to={`/`}>Dashboard</Link>{''}</li>
                        <li  className='hover:scale-110 hover:text-baseextra2 cursor-pointer transition-transform duration-200 ease-in-out'><Link to={`/Shops`}>Shop Panel</Link>{''}</li>
                        <li className='hover:scale-110 hover:text-baseextra2 cursor-pointer transition-transform duration-200 ease-in-out'><Link to={`/MapModel`}>Map Model</Link>{''}</li>
                        <li className='hover:scale-110 hover:text-baseextra2 cursor-pointer transition-transform duration-200 ease-in-out'>Settings{''}</li>

                    </ul>
                </div>

                <div className='flex h-auto w-[25vw] items-center justify-center p-5'>
                   <h2 className='font-ibmplexsans text-md hover:text-baseextra2 text-primary cursor-pointer transition-transform duration-200 ease-in-out'>Log Out</h2>
                </div>

            </div>
            <div className='flex h-[0.5rem] bg-baseextra2'/>
                


       </div>

  )
}

export default Navbar
