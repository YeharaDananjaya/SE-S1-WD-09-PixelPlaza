import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Aos from 'aos';


//import image files
import logo from '../Assests/PixelPlaza.png';
import background from '../Assests/background.png';


// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faListSquares, faRobot } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-brands-svg-icons';


const Mapmodel = () => {

  const [shops, setShops] = useState([]);
  const [showMain02, setShowMain02] = useState(false);

  useEffect(()=>{
    Aos.init();
  });

  useEffect(() => {
    const fetchShopsDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops/get');
        setShops(response.data);
        console.log('Data fetching Successfully');
      } catch (error) {
        console.log('Error Fetching data :', error);
        alert('Error Fetching Data to the frontend');
      }
    };

    fetchShopsDetails();
  }, []);

  return (
    <div className="relative h-auto flex w-auto">
      {/* Sidebar */}

      <div className="fixed flex-col h-[100vh] rounded-3xl justify-center flex items-center w-[25vw] border-r-2 bg-baseextra6 left-0 top-0 z-40">
      
      {/* Welocoming Section for the Map Model*/}
      {!showMain02 ? (
              <div id='main01' className='flex flex-col h-auto w-[25vw] justify-center items-center' style={{
                backgroundImage:`url(${background})`,
                backgroundSize:'cover',
                backgroundPosition:'center'
              }}>
                    <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                    <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                          <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                              <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>
                                <div className='flex bg-primary h-4 w-4 rounded-full'/>
                                <div className='flex bg-primary h-4 w-4 rounded-full'/>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>

                              </div>

                            <div className='flex h-auto w-auto items-center'>
                                <img src= {logo} alt='pixel plaza logo'/>
                            </div>

                            <div className='flex h-auto w-[20vw] justify-center items-center space-x-2'>
                               <div className='flex bg-primary w-[1vw]' style={{
                                height:'0.02rem'
                               }}/>
                               <h2 className='text-center font-ibmplexsans text-xs text-primary' style={{
                                fontWeight:'200',
                                textShadow: '0px 2px 3px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                               }}>
                                  Your Unlimited Shopping Experience
                               </h2>
                            </div>

                          </div>
                          
                        
                              <h2 className='flex w-[20vw] mt-12 text-center text-shadow-md font-russoone text-4xl text-primary'style={{
                                    textShadow: 'inset 0 1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                              }}>
                                SHOPPING MAP
                              </h2>

                          <div className='flex flex-col w-[20vw] mt-6 h-auto items-center justify-center p-2 space-y-2'>
                                  <button onClick={()=> setShowMain02(true)} className='flex h-[3rem] w-[18vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                    boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)'
                                  }}>
                                    <h2 className='flex font-ibmplexsans text-md text-secondary' style={{
                                      fontWeight:'300'
                                    }}>Use Menu Manually</h2><FontAwesomeIcon icon={faListSquares} className='mx-2'/>
                                  </button>

                                  <button className='flex h-[3rem] w-[18vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                    boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)'
                                  }}>
                                   <h2 className='flex font-ibmplexsans text-md text-secondary' style={{
                                      fontWeight:'300'
                                    }}>Use Chat Bot</h2><FontAwesomeIcon icon={faRobot} className='mx-2'/>

                                  </button>
                          </div>

                          <div className='flex flex-col w-[20vw] mt-6 h-[20vh] items-center justify-center p-2 space-y-2'>


                          </div>


                    </div>
              </div>
      ) : (
        // Filter Section
             <div id='main02' className='flex flex-col h-auto w-[25vw] justify-center items-center' data-aos='fade-right' data-aos-delay='300' style={{
                backgroundImage:`url(${background})`,
                backgroundSize:'cover',
                backgroundPosition:'center'
              }}>
                    <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                    <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                          <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                              <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>
                                <div className='flex bg-primary h-4 w-4 rounded-full'/>
                                <div className='flex bg-primary h-4 w-4 rounded-full'/>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>

                              </div>

                            <div className='flex h-auto w-auto items-center'>
                                <img src= {logo} alt='pixel plaza logo'/>
                            </div>

                            <div className='flex h-auto w-[20vw] justify-center items-center space-x-2'>
                               <div className='flex bg-primary w-[1vw]' style={{
                                height:'0.02rem'
                               }}/>
                               <h2 className='text-center font-ibmplexsans text-xs text-primary' style={{
                                fontWeight:'200',
                                textShadow: '0px 2px 3px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                               }}>
                                  Your Unlimited Shopping Experience
                               </h2>
                            </div>

                          </div>
                          
                        
                              <h2 className='flex w-[20vw] mt-12 text-center text-shadow-md font-russoone text-4xl text-primary'style={{
                                    textShadow: 'inset 0 1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                              }}>
                                Filter Options
                              </h2>

                          <div className='flex flex-col w-[20vw] mt-6 h-auto items-center justify-center p-2 space-y-2'>
                                  <button className='flex h-[3rem] w-[18vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                    boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)'
                                  }}>
                                    <h2 className='flex font-ibmplexsans text-md text-secondary' style={{
                                      fontWeight:'300'
                                    }}>Use Menu Manually</h2><FontAwesomeIcon icon={faListSquares} className='mx-2'/>
                                  </button>

                                  <button className='flex h-[3rem] w-[18vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                    boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)'
                                  }}>
                                   <h2 className='flex font-ibmplexsans text-md text-secondary' style={{
                                      fontWeight:'300'
                                    }}>Use Chat Bot</h2><FontAwesomeIcon icon={faRobot} className='mx-2'/>

                                  </button>
                          </div>

                          <div className='flex flex-col w-[20vw] mt-6 h-[20vh] items-center justify-center p-2 space-y-2'>


                          </div>


                    </div>
              </div>
      )}
    </div>

         <div className='flex w-[25vw] h-auto'/>

        <div className="flex flex-col h-auto w-[75vw] justify-center items-center bg-transparent overflow-x-scroll overflow-y-hidden">


          <div className="flex flex-col h-[100vh] w-[75vw] justify-center items-center">
            <div className='flex bg-transparent h-[10vh] w-[75vw]'/>
            <div className='flex flex-col w-[60vw] h-[10vh] items-center justify-center'>
                <h2
                  className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-secondary"
                  style={{
                    fontWeight: 200,
                  }}
                >
                  Floor 01
                </h2>
            </div>

            {/* Floor 01 Shopping Map */}
            <div className="flex flex-col w-[75vw] h-[80vh] bg-primary drop-shadow-lg items-center justify-center border-4 border-secondary mt-10 rounded-xl p-0"
            style={{
              scale:'85%'
            }}>
              <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                {shops.slice(0, 5).map((shop, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                    style={{
                      boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                    }}>
                    <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-full' style={{
                      boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                    }}/>
                  </div>
                ))}
              </div>

              <div className="flex w-[75vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center">
                <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2">
                  <FontAwesomeIcon
                    icon={faAngleDoubleLeft}
                    className="mx-2 h-8 text-primary"
                  />
                  <h2 className="flex font-ibmplexsans text-primary text-md">
                    to the staircases and lift area for 02, 03, 04 Floors
                  </h2>
                </div>
                <div className="flex w-[14vw] h-[15vh] bg-transparent items-center justify-center">
                  <div className="flex w-20 h-20 bg-orange-500 rounded-full" />
                </div>

                <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2">
                  <FontAwesomeIcon
                    icon={faAngleDoubleRight}
                    className="mx-2 h-8 text-primary"
                  />
                  <h2 className="flex font-ibmplexsans text-primary text-md">
                    Exit and Entrance
                  </h2>
                </div>
              </div>

              <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2 p-0">
                  
                    {shops.slice(5, 10).map((shop, index) => (
                        <div
                        key={index}
                        className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                        style={{
                          boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                        }}>
                        <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-full' style={{
                          boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                        }}/>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          {/* Floor 02 Section */}
          <div className="flex w-[75vw] h-auto mt-12 justify-start">
              <div className='flex w-[75vw] h-auto items-center justify-center'>
                    <h2
                      className="font-ibmplexsans text-3xl ml-2 text-secondary"
                      style={{
                        fontWeight: 200,
                      }}
                    >
                      Floor 02
                    </h2>
                </div>
          </div>

          {/* Floor 02 Shopping Map */}
          <div className="flex flex-col w-[75vw] h-[80vh] items-center justify-center border-4 border-secondary mt-10 rounded-xl p-0"
          style={{
            scale:'85%'
          }}>
            <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
              {shops.slice(10, 15).map((shop, index) => (
                <div
                  key={index}
                  className="flex w-[14vw] h-[25vh] items-center justify-center bg-baseextra4 rounded-2xl"
                >

                </div>
              ))}
            </div>

            <div className="flex w-[75vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center">
              <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2">
                <FontAwesomeIcon
                  icon={faAngleDoubleLeft}
                  className="mx-2 h-8 text-primary"
                />
                <h2 className="flex font-ibmplexsans text-primary text-md">
                  to the staircases and lift area for 03, 04 Floors
                </h2>
              </div>
              <div className="flex w-[14vw] h-[15vh] bg-transparent items-center justify-center">
                <div className="flex w-20 h-20 bg-orange-500 rounded-full" />
              </div>

              <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2">
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className="mx-2 h-8 text-primary"
                />
                <h2 className="flex font-ibmplexsans text-primary text-md">
                  to the Floor 01, Exit and Entrance
                </h2>
              </div>
            </div>

            <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
              {shops.slice(15, 20).map((shop, index) => (
                <div
                  key={index}
                  className="flex w-[14vw] h-[25vh] items-center justify-center bg-baseextra4 rounded-2xl"
                >
                  {/* Your content for each shop goes here */}
                </div>
              ))}
            </div>
          </div>
        </div>


    </div>
  );
};

export default Mapmodel;