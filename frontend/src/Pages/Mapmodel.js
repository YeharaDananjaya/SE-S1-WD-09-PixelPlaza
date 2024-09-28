import axios from 'axios';
import React, { useEffect, useState , useRef} from 'react';
import Aos from 'aos';
import { getBotResponse } from '../Utils/botResponses.js';
import 'aos/dist/aos.css'; 


//import image files
import logo from '../Assests/PixelPlaza.png';
import background from '../Assests/background.png';
import bot from '../Assests/Graident Ai Robot.png';


// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight,  faBuildingCircleArrowRight, faCaretDown, faListSquares,  faRobot, faUndo } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';




const Mapmodel = () => {

  const [shops, setShops] = useState([]);
  const [showMain02, setShowMain02] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [currentFloor, setCurrentFloor] = useState('floor1');
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const floor1Ref = useRef(null);
  const floor2Ref = useRef(null);
  const floor3Ref = useRef(null);
  const floor4Ref = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: input }]);
      setInput('');

      // Get bot response based on user input
      const botResponse = getBotResponse(input);
      setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }
  };


  const scrollToFloor = (floor) => {
    if (floor === 'floor1' && floor1Ref.current) {
      floor1Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (floor === 'floor2' && floor2Ref.current) {
      floor2Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (floor === 'floor3' && floor3Ref.current){
      floor3Ref.current.scrollIntoView({ behavior: 'smooth'});
    } else if (floor === 'floor4' && floor4Ref.current){
      floor4Ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  };

  useEffect(()=>{
    Aos.init({
      duration: 1000
    });
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

      <div className="fixed flex-col h-[100vh] justify-center flex items-center w-[25vw] bg-baseextra6 left-0 top-0 z-40" style={{
        boxShadow:' 4px 1px 10px rgba(0, 0, 0, 0.8)'
      }}>
      
          {/* Welocoming Section for the Map Model*/}

          {!showMain02 && !showChatBot ? (

            // Welcoming Section
                  <div id='main01' className='flex flex-col h-auto w-[25vw] justify-center items-center' data-aos='fade-up' style={{
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

                                      <button onClick={()=> setShowChatBot(true)} className='flex h-[3rem] w-[18vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
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
          ) : showMain02 && !showChatBot ? (

            // Filter Section
                <div id='main02' className='flex flex-col h-auto w-[25vw] justify-center items-center' data-aos='fade-right' data-aos-delay='300' style={{
                  }}>
                        <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                        <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                              <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                                  <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                    <div className='flex bg-primary h-0.5 w-[4vw]'/>
                                    <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                    <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                    <div className='flex bg-primary h-0.5 w-[4vw]'/>

                                  </div>
                              </div>
                              
                            
                                  <h2 className='w-[20vw] h-auto mt-2 text-center text-shadow-md font-russoone text-4xl text-primary'style={{
                                        textShadow: 'inset 0 1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                                  }}>
                                    Filter Options
                                  </h2>

                                  <div className='flex flex-col w-[20vw] mt-6 h-[60vh] items-center justify-start p-2 space-y-5'>

                                      <div className='flex items-center bg-white  rounded-full pr-1 h-12 w-[20vw] px-4 space-x-1' style={{
                                        boxShadow: 'inset 0 1px 8px rgba(0, 0, 0, 0.8)'
                                      }}>
                                        <input 
                                          type='text' 
                                          placeholder='Search...' 
                                          className='flex-grow outline-none bg-transparent text-sm pr-3'
                                        />
                                        <button className='flex text-gray-500 items-center h-[2rem] justify-center bg-black w-[6vw] rounded-full hover:scale-105 transition-transform duration-300 ease-in-o' style={{
                                            boxShadow: 'inset 0 2px 8px rgba(0, 255, 255, 1)'
                                        }}>
                                              <h2 className='flex text-sm font-ibmplexsans text-primary'>
                                                Search
                                              </h2>
                                        </button>
                                      </div>  

                                          <h2 className='flex w-[20vw] text-center font-ibmplexsans justify-center pl-2 items-center text-xl text-primary' style={{
                                            fontWeight:'200'
                                          }}>Shops Categories{''} <div className='flex bg-primary w-[5vw] ml-3' style={{
                                            height:'0.01rem'
                                          }}/></h2>

                                        <div className='flex items-center bg-white rounded-full pr-1 h-12 w-[20vw] px-4 space-x-1' style={{
                                            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 1)'
                                        }}>
                                            <div className='relative'>
                                              <button className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                                                <FontAwesomeIcon icon={faCaretDown} /><span className='mx-4 font-ibmplexsans'>DropDown Categories</span>
                                              </button>
                                              {/* Dropdown menu */}
                                            {/* <div className='absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10'>
                                                <ul className='py-1'>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 1</li>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 2</li>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 3</li>
                                                </ul>
                                              </div> */}
                                            </div>
                                        </div>  

                                        <div className='flex bg-transparent w-[20vw] ml-3 items-center h-auto justify-center'>
                                            <div className='flex bg-primary w-[5vw] ml-3' style={{
                                            height:'0.01rem'
                                          }}/>
                                            <h2 className='flex w-[20vw] text-center font-ibmplexsans justify-center  items-center text-xl text-primary' style={{
                                            fontWeight:'200'
                                          }}>Shops Categories
                                        </h2></div>

                                        <div className='flex items-center bg-white rounded-full pr-1 h-12 w-[20vw] px-4 space-x-1' style={{
                                            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 1)'
                                        }}>
                                            <div className='relative'>
                                              <button className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                                                <FontAwesomeIcon icon={faCaretDown} /><span className='mx-4 font-ibmplexsans'>DropDown Categories</span>
                                              </button>
                                              {/* Dropdown menu */}
                                            {/* <div className='absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10'>
                                                <ul className='py-1'>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 1</li>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 2</li>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 3</li>
                                                </ul>
                                              </div> */}
                                            </div>
                                        </div>  


                                        <h2 className='flex w-[20vw] text-center font-ibmplexsans justify-center pl-2 items-center text-xl text-primary' style={{
                                        fontWeight:'200'
                                      }}>Floor Sections{''} <div className='flex bg-primary w-[5vw] ml-3' style={{
                                        height:'0.01rem'
                                      }}/></h2>

                                        <div className='grid grid-cols-2 gap-5'>

                                          <button onClick={()=> {setCurrentFloor('floor1'); scrollToFloor('floor1');}} className='flex h-[2.5rem] w-[8vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-primary' style={{
                                              fontWeight:'300'
                                            }}>Floor 1</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-primary'/>
                                          </button>


                                          <button onClick={()=> { setCurrentFloor('floor2'); scrollToFloor('floor2');}} className='flex h-[2.5rem] w-[8vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-primary' style={{
                                              fontWeight:'300'
                                            }}>Floor 2</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-primary'/>
                                          </button>

                                          
                                          <button onClick={()=> {setCurrentFloor('floor3'); scrollToFloor('floor3');}} className='flex h-[2.5rem] w-[8vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-primary' style={{
                                              fontWeight:'300'
                                            }}>Floor 3</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-primary'/>
                                          </button>


                                          <button onClick={()=> {setCurrentFloor('floor4'); scrollToFloor('floor4');}} className='flex h-[2.5rem] w-[8vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-primary' style={{
                                              fontWeight:'300'
                                            }}>Floor 4</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-primary'/>
                                          </button>
                                        </div> 

                                        <div className='flex bg-primary w-[10vw]' style={{
                                          height:'0.05rem'
                                        }}/> 



                                  </div>

                                  <div className='flex w-[20vw] h-auto items-center mt-5 justify-center p-2 space-x-2'>
                                          <button onClick={()=> {setShowMain02(false); 
                                                                setShowChatBot(true);}} className='flex h-[2.5rem] w-[10vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.7), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-primary' style={{
                                              fontWeight:'300'
                                            }}>Use Chatbot</h2><FontAwesomeIcon icon={faRobot} className='mx-2 text-primary'/>
                                          </button>

                                          <button onClick={()=>setShowMain02(false)} className='flex h-[2.5rem] w-[8vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                            boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)' 
                                          }}>
                                          <h2 className='flex font-ibmplexsans text-md text-secondary' style={{
                                              fontWeight:'300'
                                            }}>Back</h2><FontAwesomeIcon icon={faUndo} className='mx-2'/>

                                          </button>
                                  </div>

                                  <div className='flex w-[15vw] h-auto mt-2 justify-center items-center space-x-2'>
                                    <div className='flex bg-primary h-0.5 w-[4vw]'/>
                                    <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                    <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                    <div className='flex bg-primary h-0.5 w-[4vw]'/>

                                  </div>


                        </div>
                  </div>   
          ) : showChatBot && !showMain02 ? (

          //  ChatBot Section
              <div id='main02' className='flex flex-col h-auto w-[25vw] justify-center items-center' data-aos='fade-right' data-aos-delay='300' style={{
              }}>
                    <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                    <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                          <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                              <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>
                                <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>

                              </div>
                          </div>
                          
                        
                            <div className='flex w-auto h-auto items-center justify-center'>

                                 <div className='flex flex-col h-auto w-auto items-center justify-center'>
                                      <h2 className='mt-2 text-center items-center text-shadow-md font-russoone text-4xl text-primary'style={{
                                            textShadow: 'inset 0 1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                                      }}>
                                        Ask Me
                                      </h2>
                                      <h2 className='text-center items-center font-ibmplexsans text-primary'style={{
                                        fontSize:'9px'
                                      }}>
                                        Pixel PLaza ChatBot Experience
                                      </h2>

                                </div>

                                <img src={bot} alt='' className='h-16'/>

                            </div>


                              <div className='flex flex-col w-[24vw] h-[60vh] items-center justify-center p-2 space-y-5'>

                              <div className='flex flex-col w-[24vw] h-[50vh] overflow-y-auto bg-white p-4 rounded-xl shadow-inner space-y-2 scrollbar-none' style={{
                                              boxShadow:'inset 0 3px 10px rgba(0, 0, 0, 0.8)'
                                            }}>
                                                  {/* Example message from chatbot */}
                                                  <div className='self-start bg-transparent flex w-[20vw] h-auto text-black rounded-lg'>
                                                      <div className='flex bg-transparent w-[5vw] h-[12vh]'>
                                                          <img src={bot} alt='' className='max-h-18 w-auto' style={{
  
                                                          }}/>
                                                      </div>
                                                      <div className='flex flex-col bg-primary  rounded-2xl w-[14vw] h-[45vh]' style={{
                                                        boxShadow : 'inset 0 1px 5px rgba(0, 0, 0, 0.8)'
                                                      }}>

                                                          <div className='flex flex-col w-[14vw] h-[40vh] rounded-2xl items-start p-2 justify-start'>

                                                                <h2 className='flex flex-col font-ibmplexsans text-xs text-secondary' style={{
                                                                  fontWeight:'200'
                                                                }}>
                                                                    Welcome to {''}<span className='flex flex-col font-russoone text-lg text-baseextra6 text-shadow-DEFAULT'>
                                                                      PixelPlaza
                                                                </span>
                                                                </h2>

                                                                
                                                                <div className='bg-baseextra2 w-[8vw] mt-1 rounded-full' style={{
                                                                  height:'0.1rem'
                                                                }}/>

                                                                <p className='font-ibmplexsans w-[12vw] mt-1 text-secondary' style={{
                                                                  fontSize:'10px'
                                                                }}>
                                                                {''}<span className='text-colorButton1' style={{fontSize:'15px', fontWeight:'300'}}>E</span>xplore our shopping complex with a variety of stores, tasty dining options, and fun activities. I’m here to help you find great deals and make your shopping experience enjoyable. Happy shopping!
                                                                </p>

                                                                <div className='bg-baseextra2 w-[8vw] mt-2 rounded-full' style={{
                                                                  height:'0.1rem'
                                                                }}/>

                                                                <h2 className='flex flex-col mt-2 font-ibmplexsans text-xs text-secondary' style={{
                                                                    fontWeight:'400'
                                                                  }}>
                                                                      Here are the Floor Sections
                                                                </h2>

                                                                <div className='grid grid-cols-2 w-auto bg-transparent gap-4 items-center justify-center' style={{
                                                                }}>

                                                                      <button onClick={()=> {setCurrentFloor('floor1'); scrollToFloor('floor1');}} className='flex h-[1.8rem] w-[5vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-primary' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 1</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-primary'/>
                                                                      </button>


                                                                      <button onClick={()=> { setCurrentFloor('floor2'); scrollToFloor('floor2');}} className='flex h-[1.8rem] w-[5vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-primary' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 2</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-primary'/>
                                                                      </button>

                                                                      
                                                                      <button onClick={()=> {setCurrentFloor('floor3'); scrollToFloor('floor3');}} className='flex h-[1.8rem] w-[5vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-primary' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 3</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-primary'/>
                                                                      </button>


                                                                      <button onClick={()=> {setCurrentFloor('floor4'); scrollToFloor('floor4');}} className='flex h-[1.8rem] w-[5vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-primary' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 4</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-primary'/>
                                                                      </button>

                                                                </div>  

                                                          </div>

                                                      </div>  
                                                  </div>
                                                 
                                                  
                                                  {/* Render dynamic messages here */}
                                                  {chatMessages.map((msg, index) => (
                                                        <div
                                                          key={index}
                                                          className={`${
                                                            msg.sender === 'user'
                                                              ? 'self-end bg-blue-500 text-white'
                                                              : 'self-start bg-transparent flex w-[20vw] h-auto text-black rounded-lg'
                                                          } p-2 rounded-lg shadow`}
                                                        >
                                                          {msg.sender === 'bot' && (
                                                            <div className='flex bg-transparent w-[5vw] h-[12vh]'>
                                                              <img src={bot} alt='' className='max-h-18' />
                                                            </div>
                                                          )}
                                                          <div className={msg.sender === 'bot' ? 'flex bg-primary rounded-2xl w-[15vw] h-auto' : ''}>
                                                            {msg.text}
                                                          </div>
                                                        </div>
                                                      ))}
                                                </div>

                                                {/* Chat Input */}
                                                <div className='flex w-[24vw] space-x-2'>
                                                              <input
                                                                type='text'
                                                                value={input}
                                                                onChange={e => setInput(e.target.value)}
                                                                className='w-[80%] p-2 border rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                                placeholder='Type a message...'
                                                              />
                                                              <button
                                                                onClick={handleSendMessage}
                                                                className='w-[15%] p-2 bg-secondary text-white rounded-lg shadow hover:bg-blue-900 transition duration-300'
                                                                style={{
                                                                  boxShadow: 'inset 0 3px 8px rgba(0, 255, 255, 0.8)',
                                                                }}
                                                              >
                                                                <FontAwesomeIcon icon={faMessage} className='text-primary' />
                                                              </button>
                                                            </div>



                              </div>
                              

                              <div className='flex w-[20vw] h-auto items-center mt-5 justify-center p-2 space-x-2'>
                                      <button onClick={()=> {
                                                          setShowChatBot(false);
                                                          setShowMain02(true);
                                      }} className='flex h-[2.5rem] w-[10vw]  bg-secondary items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.7), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                      }}>
                                        <h2 className='flex font-ibmplexsans text-sm text-primary' style={{
                                          fontWeight:'300'
                                        }}>Use Filters</h2><FontAwesomeIcon icon={faListSquares} className='mx-2 text-primary'/>
                                      </button>

                                      <button onClick={()=>setShowChatBot(false)} className='flex h-[2.5rem] w-[8vw] bg-primary items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                        boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)' 
                                      }}>
                                      <h2 className='flex font-ibmplexsans text-md text-secondary' style={{
                                          fontWeight:'300'
                                        }}>Back</h2><FontAwesomeIcon icon={faUndo} className='mx-2'/>

                                      </button>
                              </div>

                              <div className='flex w-[15vw] h-auto mt-2 justify-center items-center space-x-2'>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>
                                <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                <div className='flex bg-primary h-2 w-2 rounded-full'/>
                                <div className='flex bg-primary h-0.5 w-[4vw]'/>

                              </div>


                    </div>
              </div>

          ) : null}


      </div>

         <div className='flex w-[25vw] h-auto'/>

        <div className="flex flex-col h-auto w-[75vw] justify-center items-center bg-transparent overflow-y-hidden">

            {/* Floor 01 Section */}

                    <div className=' flex flex-col h-auto w-[75vw] items-center justify-center'>
                      {currentFloor === 'floor1' && (
                      <div className="flex flex-col h-auto w-[75vw] justify-center items-center">
                        <div className='flex flex-col bg-transparent h-[5vh] w-[75vw]'/>


                                    <div ref={floor1Ref} className='flex flex-col w-auto items-center justify-center' data-aos='fade-right' data-aos-delay='500'>

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
                      
                                      <div className="flex flex-col w-[75vw] h-[80vh] bg-primary drop-shadow-lg items-center justify-center mt-10 rounded-2xl p-0"
                                      style={{
                                        scale:'85%',
                                        boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                      }}>
                                        <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                          {shops.slice(0, 5).map((shop, index) => (
                                            <div
                                              key={index}
                                              className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                              style={{
                                                boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                              }}>
                                                <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                          
                                                    <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                      <div
                                                            className='flex h-2 w-2 rounded-full'
                                                            style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                        />
                                                      <div
                                                            className='flex h-2 w-2 rounded-full'
                                                            style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                        />
                                                      <div
                                                            className='flex h-2 w-2 rounded-full'
                                                            style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                        />
                          
                                                    </div> 
                                                    
                                                    <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                        <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                          fontWeight:'500'
                                                        }}>
                                                            {shop?.shopID}
                                                        </h2>
                          
                                                    </div>                          
                                                    
                                                    <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                    boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                    }}>
                                                        <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                          fontWeight:'200'
                                                        }}>
                                                            {shop?.shopName}
                                                        </h2>
                          
                                                    </div>
                          
                          
                                                </div>
                          
                                                <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                                  boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                                }}/>
                                            </div>
                                          ))}
                                        </div>
                          
                                        <div className="flex w-[75vw] h-[15vh] bg-gray-600 bg-opacity-70 items-center justify-center">
                                          <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                            boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                          }}>
                                            <FontAwesomeIcon
                                              icon={faAngleDoubleLeft}
                                              className="mx-4 h-8 text-primary"
                                            />
                                            <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                              fontWeight:'100'
                                            }}>
                                              To The Staircases and Lift Area for 02, 03, 04 Floors
                                            </h2>
                                          </div>
                                          <div className="flex w-[14vw] h-[15vh] bg-transparent items-center justify-center">
                                            <div className="flex w-20 h-20 bg-orange-500 rounded-full drop-shadow-xl" style={{
                                              boxShadow:'inset 0 4px 10px rgba(0, 0, 0, 0.8)'
                                            }} />
                                          </div>
                          
                                          <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2" style={{
                                            boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                          }}>
                                            <FontAwesomeIcon
                                              icon={faAngleDoubleRight}
                                              className="mx-4 h-8 text-primary"
                                            />
                                            <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                              fontWeight:'100'
                                            }}>
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
                                                  <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                          
                                                      <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                        <div
                                                              className='flex h-2 w-2 rounded-full'
                                                              style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                          />
                                                        <div
                                                              className='flex h-2 w-2 rounded-full'
                                                              style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                          />
                                                        <div
                                                              className='flex h-2 w-2 rounded-full'
                                                              style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                          />
                          
                                                      </div> 
                                                      
                                                      <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                          <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                            fontWeight:'500'
                                                          }}>
                                                              {shop?.shopID}
                                                          </h2>
                          
                                                      </div>                          
                                                      
                                                      <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                      boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                      }}>
                                                          <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                            fontWeight:'200'
                                                          }}>
                                                              {shop?.shopName}
                                                          </h2>
                          
                                                      </div>
                          
                          
                                                  </div>
                          
                                                  <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                                    boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                                  }}/>
                                              </div>
                                              ))}
                                        </div>
                                      </div> 

                                    </div>


                    

                      </div>
                          )}
                    </div>

            {/* Floor 02 Section */}

                    <div className=' flex flex-col h-auto w-[75vw] items-center justify-center'>
                          <div className='flex bg-transparent h-[5vh] w-[75vw]'/>
                            {currentFloor === 'floor2' && (

                                <div ref={floor2Ref} className='flex flex-col w-auto h-auto items-center justify-center' data-aos='fade-right' data-aos-delay='500'>

                                    <div className='flex flex-col w-[60vw] h-[10vh] items-center justify-center'>
                                        <h2
                                          className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-secondary"
                                          style={{
                                            fontWeight: 200,
                                          }}
                                        >
                                          Floor 02
                                        </h2>
                                    </div>

                                  <div id='floor2' className="flex flex-col w-[75vw] h-[80vh] items-center bg-primary justify-center mt-10 rounded-xl p-0"
                                  style={{
                                    scale:'85%',
                                    boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                  }}>
                                    <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                      {shops.slice(10, 15).map((shop, index) => (
                                            <div
                                            key={index}
                                            className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                            style={{
                                              boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                            }}>
                                              <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

                                                  <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                    <div
                                                          className='flex h-2 w-2 rounded-full'
                                                          style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                      />
                                                    <div
                                                          className='flex h-2 w-2 rounded-full'
                                                          style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                      />
                                                    <div
                                                          className='flex h-2 w-2 rounded-full'
                                                          style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                      />

                                                  </div> 
                                                  
                                                  <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                      <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                        fontWeight:'500'
                                                      }}>
                                                          {shop?.shopID}
                                                      </h2>

                                                  </div>                          
                                                  
                                                  <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                  boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                  }}>
                                                      <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                        fontWeight:'200'
                                                      }}>
                                                          {shop?.shopName}
                                                      </h2>

                                                  </div>


                                              </div>

                                              <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                                boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                              }}/>
                                          </div>
                                      ))}
                                    </div>

                                    <div className="flex w-[75vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center">
                                        <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                          boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                        }}>
                                          <FontAwesomeIcon
                                            icon={faAngleDoubleLeft}
                                            className="mx-4 h-8 text-primary"
                                          />
                                          <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                            fontWeight:'100'
                                          }}>
                                            to the staircases and lift area for 03, 04 Floors
                                          </h2>
                                        </div>
                                        <div className="flex w-[14vw] h-[15vh] bg-transparent items-center justify-center">
                                          <div className="flex w-20 h-20 bg-orange-500 rounded-full drop-shadow-xl" style={{
                                            boxShadow:'inset 0 4px 10px rgba(0, 0, 0, 0.8)'
                                          }} />
                                        </div>

                                        <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2" style={{
                                          boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                        }}>
                                          <FontAwesomeIcon
                                            icon={faAngleDoubleRight}
                                            className="mx-4 h-8 text-primary"
                                          />
                                          <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                            fontWeight:'100'
                                          }}>
                                            Exit and Entrance
                                          </h2>
                                        </div>
                                      </div>

                                    <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
                                      {shops.slice(15, 20).map((shop, index) => (
                                          <div
                                          key={index}
                                          className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                          style={{
                                            boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                          }}>
                                            <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

                                                <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                  <div
                                                        className='flex h-2 w-2 rounded-full'
                                                        style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                    />
                                                  <div
                                                        className='flex h-2 w-2 rounded-full'
                                                        style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                    />
                                                  <div
                                                        className='flex h-2 w-2 rounded-full'
                                                        style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                    />

                                                </div> 
                                                
                                                <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                    <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                      fontWeight:'500'
                                                    }}>
                                                        {shop?.shopID}
                                                    </h2>

                                                </div>                          
                                                
                                                <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                }}>
                                                    <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                      fontWeight:'200'
                                                    }}>
                                                        {shop?.shopName}
                                                    </h2>

                                                </div>


                                            </div>

                                            <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                              boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                            }}/>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                </div>

                            )}


                    </div>

            {/* Floor 03 Section */}

                    <div className=' flex flex-col h-auto w-[75vw] items-center justify-center'>
                            {currentFloor === 'floor3' && (

                                <div ref={floor3Ref} className='flex flex-col w-auto h-auto items-center justify-center' data-aos='fade-right' data-aos-delay='500'>

                                    <div className='flex flex-col w-[60vw] h-[10vh] items-center justify-center'>
                                        <h2
                                          className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-secondary"
                                          style={{
                                            fontWeight: 200,
                                          }}
                                        >
                                          Floor 03
                                        </h2>
                                    </div>

                                  <div id='floor2' className="flex flex-col w-[75vw] h-[80vh] bg-primary items-center justify-center mt-10 rounded-xl p-0"
                                  style={{
                                    scale:'85%',
                                    boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                  }}>
                                    <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                      {shops.slice(20, 25).map((shop, index) => (
                                            <div
                                            key={index}
                                            className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                            style={{
                                              boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                            }}>
                                              <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

                                                  <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                    <div
                                                          className='flex h-2 w-2 rounded-full'
                                                          style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                      />
                                                    <div
                                                          className='flex h-2 w-2 rounded-full'
                                                          style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                      />
                                                    <div
                                                          className='flex h-2 w-2 rounded-full'
                                                          style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                      />

                                                  </div> 
                                                  
                                                  <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                      <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                        fontWeight:'500'
                                                      }}>
                                                          {shop?.shopID}
                                                      </h2>

                                                  </div>                          
                                                  
                                                  <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                  boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                  }}>
                                                      <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                        fontWeight:'200'
                                                      }}>
                                                          {shop?.shopName}
                                                      </h2>

                                                  </div>


                                              </div>

                                              <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                                boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                              }}/>
                                          </div>
                                      ))}
                                    </div>

                                    <div className="flex w-[75vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center">
                                        <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                          boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                        }}>
                                          <FontAwesomeIcon
                                            icon={faAngleDoubleLeft}
                                            className="mx-4 h-8 text-primary"
                                          />
                                          <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                            fontWeight:'100'
                                          }}>
                                          To The Staircases and Lift Area for 02 ,01 Floors
                                          </h2>
                                        </div>
                                        <div className="flex w-[14vw] h-[15vh] bg-transparent items-center justify-center">
                                          <div className="flex w-20 h-20 bg-orange-500 rounded-full drop-shadow-xl" style={{
                                            boxShadow:'inset 0 4px 10px rgba(0, 0, 0, 0.8)'
                                          }} />
                                        </div>

                                        <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2" style={{
                                          boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                        }}>
                                          <FontAwesomeIcon
                                            icon={faAngleDoubleRight}
                                            className="mx-4 h-8 text-primary"
                                          />
                                          <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                            fontWeight:'100'
                                          }}>
                                            Exit and Entrance
                                          </h2>
                                        </div>
                                      </div>

                                    <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
                                      {shops.slice(25, 30).map((shop, index) => (
                                          <div
                                          key={index}
                                          className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                          style={{
                                            boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                          }}>
                                            <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

                                                <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                  <div
                                                        className='flex h-2 w-2 rounded-full'
                                                        style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                    />
                                                  <div
                                                        className='flex h-2 w-2 rounded-full'
                                                        style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                    />
                                                  <div
                                                        className='flex h-2 w-2 rounded-full'
                                                        style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                    />

                                                </div> 
                                                
                                                <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                    <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                      fontWeight:'500'
                                                    }}>
                                                        {shop?.shopID}
                                                    </h2>

                                                </div>                          
                                                
                                                <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                }}>
                                                    <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                      fontWeight:'200'
                                                    }}>
                                                        {shop?.shopName}
                                                    </h2>

                                                </div>


                                            </div>

                                            <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                              boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                            }}/>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                </div>

                            )}


                   </div>

            {/* Floor 04 Section */}

                    <div className=' flex flex-col h-auto w-[75vw] items-center justify-center'>
                                  {currentFloor === 'floor4' && (

                                      <div ref={floor4Ref} className='flex flex-col w-auto h-auto items-center justify-center' data-aos='fade-right' data-aos-delay='500'>

                                          <div className='flex flex-col w-[60vw] h-[10vh] items-center justify-center'>
                                              <h2
                                                className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-secondary"
                                                style={{
                                                  fontWeight: 200,
                                                }}
                                              >
                                                Floor 04
                                              </h2>
                                          </div>

                                        <div id='floor4' className="flex flex-col w-[75vw] h-[80vh] bg-primary items-center justify-center mt-10 rounded-xl p-0"
                                        style={{
                                          scale:'85%',
                                          boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                        }}>
                                          <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                            {shops.slice(30, 35).map((shop, index) => (
                                                  <div
                                                  key={index}
                                                  className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                                  style={{
                                                    boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                                  }}>
                                                    <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

                                                        <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                          <div
                                                                className='flex h-2 w-2 rounded-full'
                                                                style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                            />
                                                          <div
                                                                className='flex h-2 w-2 rounded-full'
                                                                style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                            />
                                                          <div
                                                                className='flex h-2 w-2 rounded-full'
                                                                style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                            />

                                                        </div> 
                                                        
                                                        <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                            <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                              fontWeight:'500'
                                                            }}>
                                                                {shop?.shopID}
                                                            </h2>

                                                        </div>                          
                                                        
                                                        <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                        boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                        }}>
                                                            <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                              fontWeight:'200'
                                                            }}>
                                                                {shop?.shopName}
                                                            </h2>

                                                        </div>


                                                    </div>

                                                    <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                                      boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                                    }}/>
                                                </div>
                                            ))}
                                          </div>

                                          <div className="flex w-[75vw] h-[15vh] bg-secondary bg-opacity-30 items-center justify-center">
                                              <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                                boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                              }}>
                                                <FontAwesomeIcon
                                                  icon={faAngleDoubleLeft}
                                                  className="mx-4 h-8 text-primary"
                                                />
                                                <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                                  fontWeight:'100'
                                                }}>
                                                  To The Staircases and Lift Area for 03, 02 ,01 Floors
                                                </h2>
                                              </div>
                                              <div className="flex w-[14vw] h-[15vh] bg-transparent items-center justify-center">
                                                <div className="flex w-20 h-20 bg-orange-500 rounded-full drop-shadow-xl" style={{
                                                  boxShadow:'inset 0 4px 10px rgba(0, 0, 0, 0.8)'
                                                }} />
                                              </div>

                                              <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-r-full mr-2" style={{
                                                boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                              }}>
                                                <FontAwesomeIcon
                                                  icon={faAngleDoubleRight}
                                                  className="mx-4 h-8 text-primary"
                                                />
                                                <h2 className="flex font-ibmplexsans text-primary text-md" style={{
                                                  fontWeight:'100'
                                                }}>
                                                  To the Top Floor
                                                </h2>
                                              </div>
                                            </div>

                                          <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
                                            {shops.slice(35, 40).map((shop, index) => (
                                                <div
                                                key={index}
                                                className="flex flex-col w-[14vw] h-[25vh] items-center justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                                style={{
                                                  boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5)'
                                                }}>
                                                  <div className="flex flex-col w-[14vw] h-[17vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

                                                      <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                        <div
                                                              className='flex h-2 w-2 rounded-full'
                                                              style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                          />
                                                        <div
                                                              className='flex h-2 w-2 rounded-full'
                                                              style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                          />
                                                        <div
                                                              className='flex h-2 w-2 rounded-full'
                                                              style={{ backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                          />

                                                      </div> 
                                                      
                                                      <div className='flex w-[5vw] h-auto justify-center items-center bg-primary rounded-2xl mt-2 overflow-hidden'>
                                                          <h2 className='font-ibmplexsans text-xs text-center text-secondary' style={{
                                                            fontWeight:'500'
                                                          }}>
                                                              {shop?.shopID}
                                                          </h2>

                                                      </div>                          
                                                      
                                                      <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                      boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)'
                                                      }}>
                                                          <h2 className='font-ibmplexsans text-lg text-center text-primary' style={{
                                                            fontWeight:'200'
                                                          }}>
                                                              {shop?.shopName}
                                                          </h2>

                                                      </div>


                                                  </div>

                                                  <div className='flex w-[5vw] h-[8vh] items-center justify-center bg-primary rounded-t-2xl' style={{
                                                    boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)'
                                                  }}/>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                      </div>

                                  )}


                    </div>                

        </div>


    </div>
  );
};

export default Mapmodel;
