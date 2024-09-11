import axios from 'axios';
import React, { useEffect, useState } from 'react'

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faCalendar, faClose, faFile, faIdCardAlt, faPortrait, faShop,} from '@fortawesome/free-solid-svg-icons';

const Mapmodel = () => {
 
        const [shops, setShops] = useState([]);


        useEffect(()=>{

          const fetchShopsDetails= async() => {
                
                try {
                        
                const response = await axios.get('http://localhost:5000/api/shops/get');
                setShops(response.data);        
                console.log('Data fetching Successfully');


                } catch (error) {
                console.log("Error Fetching data :", error);
                alert('Error Fetchign Data to the frontend');
                }



          };

         fetchShopsDetails();

        }, []);



  return (
    <div className='relative h-auto w-auto'>
        <div className='flex items-center flex-col justify-center z-50'>
                <div className='flex h-[5rem] w-[100vw] bg-transparent'/>
                <div className='flex h-[5rem] w-[100vw] bg-baseextra2 justify-center items-center'>
        </div>
        <div className='flex flex-col h-[200vh] w-[100vw] justify-center items-center bg-transparent p-20 overflow-y-scroll overflow-x-hidden'>


                <div className='flex flex-col h-auto w-auto'>
                        <h2 className='font-ibmplexsans text-3xl  text-secondary' style={{
                                fontWeight:400
                        }}>
                                Floor 01
                        </h2>
                {/* Floor 01 Shopping Map */}

                <div className='flex flex-col w-[85vw] h-[80vh] bg-primary items-center justify-center border-4 border-secondary mt-10 rounded-xl p-0'>
                        <div className='flex w-[85vw] h-[30vh] bg-transparent   items-center justify-center rounded-t-xl space-x-5'>
                                {/* Floor1 1st Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        
                                        <div className='flex flex-col w-[15vw] h-[16vh] bg-blue-500 rounded-r-lg items-start justify-start p-2'>

                                                <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F10')?.floorID}
                                                </h2>

                                                <h2 className='font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F10')?.shopName}
                                                </h2>


                                        </div>
                                                                                
                                        <div className='flex w-[15vw] h-[9vh] bg-transparent'>
                                                <div className='flex w-[12vw] h-[9vh] bg-blue-500 rounded-b-full'/>
                                        </div>

                                </div>


                                {/* Floor1 2nd Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer  hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col w-[15vw] h-[20vh] bg-red-700 p-2'>
                                                <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F11')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F11')?.shopName || 'Empty'}
                                                </h2>
                                        </div>
                                        <div className='flex w-[15vw] h-[25vh] bg-red-700 rounded-b-3xl'/>
        	                </div>

                                {/* Floor1 3rd Shop */}                
                                <div className= 'flex flex-col w-[30vw] h-[25vh] bg-transparent hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col w-[30vw] h-[15vh] bg-green-600  p-2'>

                                              <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F12')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F12')?.shopName || 'Empty'}
                                                </h2>
                                        </div>

                                        <div className='flex w-[30vw] h-[10vh] bg-transparent'>

                                           <div className='flex w-[8vw] h-[10vh] bg-green-600 rounded-b-xl '/>
                                           <div className='flex w-[14vw] h-[10vh] bg-transparent'/>
                                           <div className='flex w-[8vw] h-[10vh] bg-green-600  rounded-b-xl'/>


                                        </div>

                                </div>

                                
                                {/* Floor1 4th Shop */}    
                                <div className= 'flex w-[5vw] h-[25vh] bg-blue-300 rounded-b-3xl hover:scale-105 cursor-pointer hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col h-auto w-auto p-2'>
                                        <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F13')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F13')?.shopName || 'Empty'}
                                                </h2>
                                        </div>

                                </div>
                               {/* Floor1 5th Shop */}   
                                <div className= 'flex flex-col w-[10vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col w-[10vw] h-[15vh] bg-baseextra4 p-2'>
                                               <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F14')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F14')?.shopName || 'Empty'}
                                                </h2>

                                        </div>
                                        
                                        <div className='flex w-[10vw] h-[10vh] bg-baseextra4 justify-center items-center rounded-b-3xl'>
                                                <div className='flex w-[5vw] bg-primary h-[10vh] rounded-t-full'/>



                                        </div>

                                </div>




                        </div>
                        <div className='flex w-[85vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center'>
                                <div className='flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2'>
                                   <FontAwesomeIcon icon={faAngleDoubleLeft} className='mx-2 h-8 text-primary'/>
                                   <h2 className='flex font-ibmplexsans text-primary  text-md'>
                                   to the staircases and lift area for 02, 03, 04 Floors
                                   </h2>
                                </div>
                                <div className='flex w-[15vw] h-[15vh] bg-transparent items-center justify-center'>
                                  <div className='flex w-20 h-20 bg-orange-500 rounded-full'/>
                                </div>

                                <div className='flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2'>
                                <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-2 h-8 text-primary'/>
                                <h2 className='flex font-ibmplexsans text-primary text-md'>
                                    Exit and Entrance
                                </h2>
                                
                                        
                                </div>

                        </div>
                        
                        <div className='flex w-[85vw] h-[30vh] bg-transparent   items-center justify-center rounded-t-xl space-x-5 p-0'>

                                {/* Floor1 6th Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        
                                        <div className='flex w-[15vw] h-[15vh] bg-red-800  items-start justify-start'>
                                          <div className='flex bg-primary w-[8vw] h-[15vh] rounded-br-full'/>

                                        </div>
                                                                                
                                        <div className='flex flex-col w-[15vw] h-[10vh] bg-red-800 p-2'>
                                                <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F15')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F15')?.shopName || 'Empty'}
                                                </h2>
                                        </div>

                                </div>



                                {/* Floor1 7th Shop */}                
                                <div className= 'flex flex-col w-[25vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        
                                        <div className='flex w-[25vw] h-[15vh] bg-blue-500 rounded-t-full '/>

                                        <div className='flex w-[25vw] h-[10vh] bg-transparent'>

                                           <div className='flex flex-col w-[25vw] h-[10vh] bg-blue-500 p-2'>
      
                                                 <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F16')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F16')?.shopName || 'Empty'}
                                                </h2>

                                           </div>




                                        </div>

                                </div>

                                
                                {/* Floor1 8th Shop */}
                                <div className= 'flex flex-col w-[10vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        <div className='flex w-[10vw] h-[20vh] bg-baseextra4 rounded-t-3xl'>

                                        </div>
                                        <div className='flex flex-col w-[10vw] h-[25vh] bg-baseextra4 p-2'>
                                               <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F17')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F17')?.shopName || 'Empty'}
                                                </h2>
                                        </div>
        	                </div>

                                
                                {/* Floor1 9th Shop */}    
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer rounded-b-3xl hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out'>
                                        <div className='flex w-[15vw] h-[15vh] bg-orange-600 rounded-t-full items-center justify-center'>
                                           <div className='flex w-[15vw] h-[15vh] bg-primary rounded-b-full'/>
                                        </div>

                                        <div className='flex flex-col w-[15vw] h-[15vh] bg-orange-600  p-2'>
                                                <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F18')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F18')?.shopName || 'Empty'}
                                                </h2>
                                        </div>
                                                


                                </div>
                               {/* Floor1 10th Shop */}   
                                <div className= 'flex flex-col w-[10vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-transform duration-300 ease-in-out '>
                                        <div className='flex w-[10vw] h-[15vh] bg-gray-700 rounded-t-full'/>
       
                                        <div className='flex flex-col w-[10vw] h-[10vh] bg-gray-700 p-2'>


                                                                <h2 className='font-russoone text-2xl text-primary'>
                                                                {shops.find(shop => shop.floorID === 'F19')?.floorID}
                                                                </h2>
                                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                                {shops.find(shop => shop.floorID === 'F19')?.shopName || 'Empty'}
                                                                </h2>
 


                                        </div>

                                </div>


                        </div>
                </div>

                </div>
               <div className='flex w-[80vw] h-auto mt-12 justify-start'>
                     <h2 className='font-ibmplexsans text-3xl  text-secondary' style={{
                                fontWeight:400
                        }}>
                                Floor 02
                        </h2>
               </div>



                {/* Floor 02 Shopping Map */}
                <div className='flex flex-col w-[85vw] h-[80vh] items-center justify-center border-4 border-secondary mt-10 rounded-xl p-0'>
                        <div className='flex w-[85vw] h-[30vh] bg-transparent   items-center justify-center rounded-t-xl space-x-5'>
                                {/* Floor1 1st Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        
                                        <div className='flex flex-col w-[15vw] h-[16vh] bg-baseextra4 p-2'>
                                             <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F20')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F20')?.shopName || 'Empty'}
                                                </h2>
                                        </div>
                                                                                
                                        <div className='flex flex-col w-[15vw] h-[9vh] bg-baseextra4 items-center justify-end'>
                                                <div className='bg-primary w-[10vw] h-[8vh] rounded-t-full'/>

                                        </div>

                                </div>


                                {/* Floor1 2nd Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col w-[15vw] h-[20vh] bg-baseextra4 p-2'>
                                               <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F21')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F21')?.shopName || 'Empty'}
                                                </h2>
                                        </div>
                                        <div className='flex w-[15vw] h-[25vh] bg-baseextra4 rounded-b-full'/>
        	                </div>

                                {/* Floor1 3nd Shop */}                
                                <div className= 'flex flex-col w-[20vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col items-center justify-end w-[20vw] h-[15vh] bg-baseextra4 '>
                                                <div className='flex w-[4vw] bg-primary h-[5vh] rounded-t-xl'/>
                                        </div>

                                        <div className='flex w-[20vw] h-[10vh] bg-transparent'>

                                           <div className='flex w-[7vw] h-[10vh] bg-baseextra4 rounded-b-full '/>
                                           <div className='flex w-[6vw] h-[10vh] bg-transparent'/>
                                           <div className='flex w-[7vw] h-[10vh] bg-baseextra4 rounded-b-full'/>


                                        </div>

                                </div>

                                
                                {/* Floor1 4th Shop */}    
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-baseextra4 rounded-b-3xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                           <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F23')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F23')?.shopName || 'Empty'}
                                                </h2>
                                </div>
                               {/* Floor1 5th Shop */}   
                                <div className= 'flex flex-col w-[10vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        <div className='flex flex-col w-[10vw] h-[15vh] bg-baseextra4 p-2'>

                                                <h2 className='font-russoone text-2xl text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F24')?.floorID}
                                                </h2>
                                                <h2 className=' font-ibmplexsans text-md text-primary'>
                                                    {shops.find(shop => shop.floorID === 'F24')?.shopName || 'Empty'}
                                                </h2>
                                        </div>
                                        
                                        <div className='flex w-[10vw] h-[10vh] bg-baseextra4 justify-center items-center rounded-b-3xl'>
                                                <div className='flex w-[10vw] bg-primary h-[10vh] rounded-t-full'/>



                                        </div>

                                </div>




                        </div>

                        <div className='flex w-[85vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center'>
                                <div className='flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2'>
                                   <FontAwesomeIcon icon={faAngleDoubleLeft} className='mx-2 h-8 text-primary'/>
                                   <h2 className='flex font-ibmplexsans text-primary  text-md'>
                                   to the staircases and lift area for  03, 04 Floors
                                   </h2>
                                </div>
                                <div className='flex w-[15vw] h-[15vh] bg-transparent items-center justify-center'>
                                  <div className='flex w-20 h-20 bg-orange-500 rounded-full'/>
                                </div>

                                <div className='flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2'>
                                <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-2 h-8 text-primary'/>
                                <h2 className='flex font-ibmplexsans text-primary text-md'>
                                   to the Floor 01 , Exit and Entrance
                                </h2>
                                
                                        
                                </div>

                        </div>
                        
                        <div className='flex w-[85vw] h-[30vh] bg-transparent  items-center justify-center rounded-b-xl space-x-5'>

                                {/* Floor1 6th Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        
                                        <div className='flex w-[15vw] h-[15vh] bg-baseextra4 items-end justify-end'>
                                          <div className='flex bg-primary w-[8vw] h-[15vh] rounded-bl-full'/>

                                        </div>
                                                                                
                                        <div className='flex w-[15vw] h-[10vh] bg-baseextra4'>

                                        </div>

                                </div>


                                {/* Floor1 7th Shop */}
                                <div className= 'flex flex-col w-[15vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        <div className='flex w-[15vw] h-[20vh] bg-baseextra4 rounded-t-3xl'>

                                        </div>
                                        <div className='flex w-[15vw] h-[25vh] bg-baseextra4'/>
        	                </div>

                                {/* Floor1 8th Shop */}                
                                <div className= 'flex flex-col w-[30vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        <div className='flex w-[30vw] h-[15vh] bg-baseextra4 '>
                                                <div className='flex flex-col w-[10vw] h-[15vh] items-center justify-start'>
                                                        <div className='bg-primary h-[8vh] w-[8vw] rounded-b-full'/>
                                                </div>
                                                <div className='flex w-[10vw] h-[15vh] items-center justify-start'>
                                                        
                                               </div>
                                               <div className='flex flex-col w-[10vw] h-[15vh] items-center justify-start'>
                                                       <div className='bg-primary h-[8vh] w-[8vw] rounded-b-full'/>
                                                </div>

                                        </div>

                                        <div className='flex w-[30vw] h-[10vh] bg-baseextra4'>




                                        </div>

                                </div>

                                
                                {/* Floor1 9th Shop */}    
                                <div className= 'flex w-[5vw] h-[25vh] bg-baseextra4 rounded-b-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>

                                </div>
                               {/* Floor1 10th Shop */}   
                                <div className= 'flex flex-col w-[10vw] h-[25vh] bg-transparent cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                        <div className='flex w-[10vw] h-[15vh] bg-baseextra4'/>
                                        
                                        <div className='flex w-[10vw] h-[10vh] bg-baseextra4 justify-center items-center rounded-b-3xl'>
                                            



                                        </div>

                                </div>


                        </div>
                </div>


        </div>


         </div>
      
    </div>
  )
}

export default Mapmodel;
