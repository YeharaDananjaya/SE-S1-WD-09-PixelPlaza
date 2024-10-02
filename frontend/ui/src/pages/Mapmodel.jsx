import axios from 'axios';
import React, { useEffect, useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'; 
import { handleChatInput } from '../utils/chatFunctions.jsx'; 


//import image files
import logo from '../assets/PixelPlaza.png';
import background from '../assets/background.png';
import bot from '../assets/Graident Ai Robot.png';
import hood from '../assets/shopHood.jpg';


// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight,  faBuildingCircleArrowRight, faCaretDown, faClose, faGlobe, faListSquares,  faMailForward,   faPhone,  faRobot, faUndo} from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';


const Mapmodel = () => {

  const [shops, setShops] = useState([]);
  const [showMain02, setShowMain02] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [currentFloor, setCurrentFloor] = useState('floor1');
  const [selectedShop, setSelectedShop] = useState(null);
  const [fetchProducts , setFetchProducts] = useState([]);
  const [promotions,setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isModVisible, setIsModVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  //navigate hook
  const navigate = useNavigate();

  //floor references
  const floor1Ref = useRef(null);
  const floor2Ref = useRef(null);
  const floor3Ref = useRef(null);
  const floor4Ref = useRef(null);


  //Floors scrolling section
  const scrollToFloor = (floor) => {
    if (floor === 'floor1' && floor1Ref.current) {
      floor1Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (floor === 'floor2' && floor2Ref.current) {
      floor2Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (floor === 'floor3' && floor3Ref.current) {
      floor3Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (floor === 'floor4' && floor4Ref.current) {
      floor4Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };




  //purchase item api
  const handleItemClick = (item_id) =>{
    navigate(`/purchase/${item_id}`)
};

//category hadling

const handleCategoryClick = (category) => {
  navigate(`/itemlist?category=${category}`);
};


  // Search Function
  const handleSearch = (query) => {
    setSearchQuery(query); 

    if (query) {
      
      const filtered = shops.filter((shop) =>
        shop.shopName && shop.shopName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredShops(filtered.map((shop) => shop.shopID)); 
    } else {
      setFilteredShops([]); 
    }
  };

  //chat bot handling
  const submitChat = (event) => {
    event.preventDefault(); 
    handleChatInput(message, setChatMessages, handleSearch, filteredShops, setMessage, shops);
  };
  


// Category Filter Function
const handleCategory = (category) => {
  setSelectedCategory(category); // Set the selected category

  if (category) {
    const filtered = shops.filter((shop) =>
      shop.category && shop.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredShops(filtered.map((shop) => shop.shopID)); // Set filtered shop IDs based on the category
  } else {
    setFilteredShops([]); // Reset filtered shops if no category is selected
  }
};




  //a function to toggle the dropdown menu

  const toggleDropDown = () => {

    setDropDownOpen(!dropDownOpen)

  };
  
//function for Animation on scroll
  useEffect(()=>{
    Aos.init({
      duration: 1000
    });
  });
  
  //

  //fetch shop details
  useEffect(() => {
    const fetchShopsDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/shops/get');
        setShops(response.data);
        console.log('Data fetching Successfully');
      } catch (error) {
        console.log('Error Fetching data :', error);
        alert('Error Fetching Data to the frontend');
      }
    };

    fetchShopsDetails();
  }, []);


  //Fetching Shop Details Logic

  const handleClickShopView = async (shopID) => {
    try {
      const shopResponse = await axios.get(`http://localhost:3000/api/shops/getByShopID/${shopID}`);
      console.log('Shop Response:', shopResponse.data); 
      setSelectedShop(shopResponse.data);
  
      const productsResponse = await axios.get(`http://localhost:3000/api/products/shop/${shopID}`);
      console.log('Products Response:', productsResponse.data);  
      setFetchProducts(productsResponse.data);



      
      setIsModVisible(true);
    } catch (error) {
      console.error('Error Fetching Shop Details:', error);
    }
  };


  const handlePromotions = async(shopID) => {

    try {

      const promotionsResponse = await axios.get(`http://localhost:3000/api/promotions/shop/${shopID}`);
      console.log('Products Response:', promotionsResponse.data);  
      setPromotions(promotionsResponse.data);
      setIsModVisible(true);
      
    } catch (error) {

      console.error('Error Fetching Shop Details:', error);

    }

  }
  
  //for the popup window
  const closeModal = () => {

    setIsModVisible(false);
    setSelectedShop(null); 
    setFetchProducts(null);

  };




  return (
    <div className="relative h-auto flex w-auto">
      {/* Sidebar */}

      <div className="fixed flex-col h-[100vh] justify-center flex items-center w-[25vw] bg- left-0 top-0 z-50" style={{
        boxShadow:' 4px 1px 10px rgba(0, 0, 0, 0.8)'
      }}>
      
          {/* Welocoming Section for the Map Model*/}

          {!showMain02 && !showChatBot ? (

            // Welcoming Section
                  <div id='main01' className='flex flex-col h-auto w-[25vw] bg-baseextra8 justify-center items-center' data-aos='fade-up' style={{
                    backgroundImage:`url(${background})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center'
                  }}>
                        <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                        <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                              <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                                  <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                    
                                    <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>
                                    <div className='flex bg-baseextra6 h-4 w-4 rounded-full'/>
                                    <div className='flex bg-baseextra6 h-4 w-4 rounded-full'/>
                                    <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>

                                  </div>

                                <div className='flex h-auto w-auto items-center'>
                                    <img src= {logo} alt='pixel plaza logo'/>
                                </div>

                                <div className='flex h-auto w-[20vw] justify-center items-center space-x-2'>
                                  <div className='flex bg-baseextra6 w-[1vw]' style={{
                                    height:'0.02rem'
                                  }}/>
                                  <h2 className='text-center font-ibmplexsans text-xs text-baseextra6' style={{
                                    fontWeight:'200',
                                    textShadow: '0px 2px 3px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                                  }}>
                                      Your Unlimited Shopping Experience
                                  </h2>
                                </div>

                              </div>
                              
                            
                                  <h2 className='flex w-[20vw] mt-12 text-center text-shadow-md font-russo text-4xl text-baseextra6'style={{
                                        textShadow: 'inset 0 1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                                  }}>
                                    SHOPPING MAP
                                  </h2>

                              <div className='flex flex-col w-[20vw] mt-6 h-auto items-center justify-center p-2 space-y-2'>
                                      <button onClick={()=> setShowMain02(true)} className='flex h-[3rem] w-[18vw] bg-baseextra6 items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                        boxShadow:'inset 0 4px 12px rgba(0, 0, 0, 0.8)'
                                      }}>
                                        <h2 className='flex font-ibmplexsans text-md text-baseextra7' style={{
                                          fontWeight:'300'
                                        }}>Use Menu Manually</h2><FontAwesomeIcon icon={faListSquares} className='mx-2 text-baseextra7'/>
                                      </button>

                                      <button onClick={()=> setShowChatBot(true)} className='flex h-[3rem] w-[18vw] bg-baseextra6 items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                        boxShadow:'inset 0 4px 12px rgba(0, 0, 0, 0.8)'
                                      }}>
                                      <h2 className='flex font-ibmplexsans text-md text-baseextra7' style={{
                                          fontWeight:'300'
                                        }}>Use Chat Bot</h2><FontAwesomeIcon icon={faRobot} className='mx-2 text-baseextra7'/>

                                      </button>
                              </div>

                              <div className='flex flex-col w-[20vw] mt-6 h-[20vh] items-center justify-center p-2 space-y-2'>
                                            

                              </div>


                        </div>
                  </div>
          ) : showMain02 && !showChatBot ? (

            // Filter Section
                <div id='main02' className='flex flex-col h-auto w-[25vw] justify-center bg-baseextra8 items-center' data-aos='fade-right' data-aos-delay='300' style={{
                  }}>
                        <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                        <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                              <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                                  <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                    <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>
                                    <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                    <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                    <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>

                                  </div>
                              </div>
                              
                            
                                  <h2 className='w-[20vw] h-auto mt-2 text-center text-shadow-md font-russo text-4xl text-baseextra6'style={{
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
                                          value={searchQuery}
                                          placeholder='Search...' 
                                          onChange={(e) => handleSearch(e.target.value)}
                                          className='flex-grow bg-transparent border-none text-sm pr-3'
                                        />
                                        <button
                                        onClick={()=> handleSearch('')} className='flex text-gray-500 items-center h-[2rem] justify-center bg-black w-[6vw] rounded-full hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                            boxShadow: 'inset 0 2px 8px rgba(0, 255, 255, 1)'
                                        }}>
                                              <h2 className='flex text-sm font-ibmplexsans text-baseextra6'>
                                                Refresh
                                              </h2>
                                        </button>
                                      </div>  

                                          <h2 className='flex w-[20vw] text-center font-ibmplexsans justify-center pl-2 items-center text-xl text-baseextra6' style={{
                                            fontWeight:'200'
                                          }}>Shops Categories{''} <div className='flex bg-baseextra6 w-[5vw] ml-3' style={{
                                            height:'0.01rem'
                                          }}/></h2>

                                        <div className='flex items-center bg-white rounded-full pr-1 h-12 w-[20vw] px-4 space-x-1' style={{
                                            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 1)'
                                        }}>
                                            <div className='relative'>
                                              <button onClick={toggleDropDown} className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                                                <FontAwesomeIcon icon={faCaretDown} /><span className='mx-4 font-ibmplexsans'>DropDown Categories</span>
                                              </button>
                                              {/* Dropdown menu */}
                                              {dropDownOpen && (
                                                <div className='absolute -left-4 mt-2 w-[20vw] bg-white rounded-md shadow-lg z-10' style={{
                                                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 1)'
                                                }}>
                                                  <ul className='py-1 font-ibmplexsans text-md text-baseextra7'>
                                                  <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleCategory('')}>
                                                    All Categories
                                                  </li>
                                                    {['Fashion', 'Electronics', 'Home & Garden', 'Health & Beauty', 'Sport & Outdoor', 'Groceries', 'Gaming & Entertainment'].map((category) => (
                                                      <li key={category} className='px-4 py-2 hover:bg-orange-500 cursor-pointer' onClick={() => handleCategory(category)}>
                                                        {category}
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              )}
                                            </div>
                                        </div>  

                                        <div className='flex bg-transparent w-[20vw] ml-3 items-center h-auto justify-center'>
                                            <div className='flex bg-baseextra6 w-[5vw] ml-3' style={{
                                            height:'0.01rem'
                                          }}/>
                                            <h2 className='flex w-[20vw] text-center font-ibmplexsans justify-center  items-center text-xl text-baseextra6' style={{
                                            fontWeight:'200'
                                          }}>Available Promotions
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


                                        <h2 className='flex w-[20vw] text-center font-ibmplexsans justify-center pl-2 items-center text-xl text-baseextra6' style={{
                                        fontWeight:'200'
                                      }}>Floor Sections{''} <div className='flex bg-baseextra6 w-[5vw] ml-3' style={{
                                        height:'0.01rem'
                                      }}/></h2>

                                        <div className='grid grid-cols-2 gap-5'>

                                          <button onClick={()=> {setCurrentFloor('floor1'); scrollToFloor('floor1');}} className='flex h-[2.5rem] w-[8vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-baseextra6' style={{
                                              fontWeight:'300'
                                            }}>Floor 1</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-baseextra6'/>
                                          </button>


                                          <button onClick={()=> { setCurrentFloor('floor2'); scrollToFloor('floor2');}} className='flex h-[2.5rem] w-[8vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-baseextra6' style={{
                                              fontWeight:'300'
                                            }}>Floor 2</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-baseextra6'/>
                                          </button>

                                          
                                          <button onClick={()=> {setCurrentFloor('floor3'); scrollToFloor('floor3');}} className='flex h-[2.5rem] w-[8vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-baseextra6' style={{
                                              fontWeight:'300'
                                            }}>Floor 3</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-baseextra6'/>
                                          </button>


                                          <button onClick={()=> {setCurrentFloor('floor4'); scrollToFloor('floor4');}} className='flex h-[2.5rem] w-[8vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-baseextra6' style={{
                                              fontWeight:'300'
                                            }}>Floor 4</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 text-baseextra6'/>
                                          </button>
                                        </div> 

                                        <div className='flex bg-baseextra6 w-[10vw]' style={{
                                          height:'0.05rem'
                                        }}/> 



                                  </div>

                                  <div className='flex w-[20vw] h-auto items-center mt-5 justify-center p-2 space-x-2'>
                                          <button onClick={()=> {setShowMain02(false); 
                                                                setShowChatBot(true);}} className='flex h-[2.5rem] w-[10vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.7), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                          }}>
                                            <h2 className='flex font-ibmplexsans text-sm text-baseextra6' style={{
                                              fontWeight:'300'
                                            }}>Use Chatbot</h2><FontAwesomeIcon icon={faRobot} className='mx-2 text-baseextra6'/>
                                          </button>

                                          <button onClick={()=>setShowMain02(false)} className='flex h-[2.5rem] w-[8vw] bg-baseextra6 items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                            boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)' 
                                          }}>
                                          <h2 className='flex font-ibmplexsans text-md text-baseextra7' style={{
                                              fontWeight:'300'
                                            }}>Back</h2><FontAwesomeIcon icon={faUndo} className='mx-2'/>

                                          </button>
                                  </div>

                                  <div className='flex w-[15vw] h-auto mt-2 justify-center items-center space-x-2'>
                                    <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>
                                    <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                    <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                    <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>

                                  </div>


                        </div>
                  </div>   
          ) : showChatBot && !showMain02 ? (

          //  ChatBot Section
              <div id='main02' className='flex flex-col h-auto w-[25vw] bg-baseextra8 justify-center items-center' data-aos='fade-right' data-aos-delay='300' style={{
              }}>
                    <div className='flex bg-transparent h-[10vh] w-[25vw]'/>

                    <div className='flex flex-col h-[90vh] w-[25vw] justify-center items-center'>

                          <div className='flex flex-col h-auto w-[20vw] justify-center items-center'>

                              <div className='flex w-[15vw] h-auto justify-center items-center space-x-2'>
                                <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>
                                <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>

                              </div>
                          </div>
                          
                        
                            <div className='flex w-auto h-auto items-center justify-center'>

                                 <div className='flex flex-col h-auto w-auto items-center justify-center'>
                                      <h2 className='mt-2 text-center items-center text-shadow-md font-russo text-4xl text-baseextra6'style={{
                                            textShadow: 'inset 0 1px 1px 2px rgba(0, 0, 0, 0.7), -1px -1px 10px rgba(0, 0, 0, 0.7)' 
                                      }}>
                                        Ask Me
                                      </h2>
                                      <h2 className='text-center items-center font-ibmplexsans text-baseextra6'style={{
                                        fontSize:'9px'
                                      }}>
                                        Pixel PLaza ChatBot Experience
                                      </h2>

                                </div>

                                <img src={bot} alt='' className='h-16'/>

                            </div>


                              <div className='flex flex-col w-[24vw] h-[60vh] items-center justify-center p-2 space-y-5'>

                              <div className='flex flex-col w-[23vw] h-[50vh] overflow-y-auto bg-white p-4 rounded-xl shadow-inner space-y-2 scrollbar-none' style={{
                                              boxShadow:'inset 0 3px 10px rgba(0, 0, 0, 0.8)'
                                            }}>
                                                  {/* Example message from chatbot */}
                                                  <div className='self-start bg-transparent flex w-[20vw] h-auto text-black rounded-lg'>
                                                      <div className='flex bg-transparent w-[5vw] h-[12vh]'>
                                                          <img src={bot} alt='' className='max-h-18 w-auto' style={{
  
                                                          }}/>
                                                      </div>
                                                      <div className='flex flex-col bg-transparent  rounded-2xl w-[14vw] h-[40vh]' style={{
                                                        boxShadow : 'inset 0 1px 5px rgba(0, 0, 0, 0.8)'
                                                      }}>

                                                          <div className='flex flex-col w-[14vw] h-auto rounded-2xl items-start p-2 justify-start'>

                                                                <h2 className='flex flex-col font-ibmplexsans text-xs text-baseextra7' style={{
                                                                  fontWeight:'200'
                                                                }}>
                                                                    Welcome to {''}<span className='flex flex-col font-russo text-lg text-baseextra8 text-shadow-DEFAULT'>
                                                                      PixelPlaza
                                                                </span>
                                                                </h2>

                                                                
                                                                <div className='bg-baseextra2 w-[8vw] mt-1 rounded-full' style={{
                                                                  height:'0.1rem'
                                                                }}/>

                                                                <p className='font-ibmplexsans w-[12vw] mt-1 text-baseextra7' style={{
                                                                  fontSize:'10px'
                                                                }}>
                                                                {''}<span className='text-colorButton1' style={{fontSize:'15px', fontWeight:'300'}}>E</span>xplore our shopping complex with a variety of stores, tasty dining options, and fun activities. I’m here to help you find great deals and make your shopping experience enjoyable. Happy shopping!
                                                                </p>

                                                                <div className='bg-baseextra8 w-[8vw] mt-2 rounded-full' style={{
                                                                  height:'0.1rem'
                                                                }}/>

                                                                <h2 className='flex flex-col mt-2 font-ibmplexsans text-xs text-baseextra7' style={{
                                                                    fontWeight:'400'
                                                                  }}>
                                                                      Here are the Floor Sections
                                                                </h2>

                                                                <div className='grid grid-cols-2 w-auto mt-2 bg-transparent gap-3 items-center justify-center' style={{
                                                                }}>

                                                                      <button onClick={()=> {setCurrentFloor('floor1'); scrollToFloor('floor1');}} className='flex h-[1.8rem] w-[5vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 1</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-baseextra6'/>
                                                                      </button>


                                                                      <button onClick={()=> { setCurrentFloor('floor2'); scrollToFloor('floor2');}} className='flex h-[1.8rem] w-[5vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 2</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-baseextra6'/>
                                                                      </button>

                                                                      
                                                                      <button onClick={()=> {setCurrentFloor('floor3'); scrollToFloor('floor3');}} className='flex h-[1.8rem] w-[5vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 3</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-baseextra6'/>
                                                                      </button>


                                                                      <button onClick={()=> {setCurrentFloor('floor4'); scrollToFloor('floor4');}} className='flex h-[1.8rem] w-[5vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                      }}>
                                                                        <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                          fontWeight:'300',
                                                                          fontSize:'10px'
                                                                        }}>Floor 4</h2><FontAwesomeIcon icon={faBuildingCircleArrowRight} className='mx-2 h-3 text-baseextra6'/>
                                                                      </button>

                                                                </div>  

                                                                <div className='bg-baseextra8 w-[8vw] mt-3 rounded-full' style={{
                                                                  height:'0.1rem'
                                                                }}/>

                                                          </div>

                                                      </div>  
                                                  </div>
                                                 
                                                  
                                                        {/* Render dynamic messages here */}
                                                        {chatMessages.map((msg, index) => (
                                                              <div
                                                                key={index}
                                                                className={`${
                                                                  msg.sender === 'user'
                                                                    ? 'self-end flex rounded-xl bg-blue-500 text-white p-2'
                                                                    : 'self-start bg-transparent flex w-[25vw] h-auto text-black'
                                                                } p-2`}
                                                              >
                                                                {msg.sender === 'bot' && (
                                                                  <div className='flex bg-transparent w-[5vw] h-[12vh]'>
                                                                    <img src={bot} alt='Bot Avatar' className='max-h-18' />
                                                                  </div>
                                                                )}
                                                                <div
                                                                  className={`${
                                                                    msg.sender === 'bot'
                                                                      ? 'flex flex-col p-2 shadow-lg border-2 bg-transparent rounded-2xl w-[15vw] h-auto'
                                                                      : ''
                                                                  }`}
                                                                  style={{ fontSize: '0.8rem' }}
                                                                >

                                                                <span className='text-center font-ibmplexsans'>{msg.text}</span>
                                                                  {msg.sender === 'bot' && (
                                                                        <div className="flex gap-4 mt-5">
              
                                                                          <button onClick={()=> {setCurrentFloor('floor1'); scrollToFloor('floor1');}} className='flex h-[1.3rem] w-[3vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                          }}>
                                                                            <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                              fontWeight:'300',
                                                                              fontSize:'10px'
                                                                            }}>F1</h2>
                                                                          </button>


                                                                          <button onClick={()=> { setCurrentFloor('floor2'); scrollToFloor('floor2');}} className='flex h-[1.3rem] w-[3vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                          }}>
                                                                            <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                              fontWeight:'300',
                                                                              fontSize:'10px'
                                                                            }}>F2</h2>
                                                                          </button>

                                                                          
                                                                          <button onClick={()=> {setCurrentFloor('floor3'); scrollToFloor('floor3');}} className='flex h-[1.3rem] w-[3vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                          }}>
                                                                            <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                              fontWeight:'300',
                                                                              fontSize:'10px'
                                                                            }}>F3</h2>
                                                                          </button>


                                                                          <button onClick={()=> {setCurrentFloor('floor4'); scrollToFloor('floor4');}} className='flex h-[1.3rem] w-[3vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                                                              boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.3), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                                                          }}>
                                                                            <h2 className='flex font-ibmplexsans text-baseextra6' style={{
                                                                              fontWeight:'300',
                                                                              fontSize:'10px'
                                                                            }}>F4</h2>
                                                                          </button>
                                                                        </div>
                                                                  )}
                                                                </div>


                                                              </div>
                                                            ))}

                                                </div>

                                                            {/* Chat Input */}
                                                           <div className='flex w-[24vw] space-x-2'>
                                                           <input
                                                              type="text"
                                                              value={message}
                                                              onChange={(e) => setMessage(e.target.value)}
                                                              onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                  submitChat(e);
                                                                }
                                                              }}
                                                              placeholder="Type your shop name..."
                                                              className="p-2 border rounded-md w-full"
                                                            />
                                                            <button
                                                              onClick={submitChat} // Call submitChat to handle button click
                                                              className='w-[15%] p-2 bg-baseextra7 text-white rounded-lg shadow hover:bg-blue-900 transition duration-300'
                                                              style={{
                                                                boxShadow: 'inset 0 3px 8px rgba(0, 255, 255, 0.8)',
                                                              }}
                                                            >
                                                              <FontAwesomeIcon icon={faMessage} className='text-baseextra6' />
                                                            </button>
                                                            </div>



                              </div>
                              

                              <div className='flex w-[20vw] h-auto items-center mt-5 justify-center p-2 space-x-2'>
                                      <button onClick={()=> {
                                                          setShowChatBot(false);
                                                          setShowMain02(true);
                                      }} className='flex h-[2.5rem] w-[10vw]  bg-baseextra7 items-center justify-center rounded-full drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                          boxShadow: 'inset 0 3px 10px rgba(0, 255, 255, 0.8), 1px 2px 10px rgba(0, 0, 0, 0.7), 5px 2px 10px rgba(0, 0, 0, 0.2)'

                                      }}>
                                        <h2 className='flex font-ibmplexsans text-sm text-baseextra6' style={{
                                          fontWeight:'300'
                                        }}>Use Filters</h2><FontAwesomeIcon icon={faListSquares} className='mx-2 text-baseextra6'/>
                                      </button>

                                      <button onClick={()=>setShowChatBot(false)} className='flex h-[2.5rem] w-[8vw] bg-baseextra6 items-center justify-center rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{
                                        boxShadow:'inset 0 6px 7px rgba(0, 0, 0, 0.2)' 
                                      }}>
                                      <h2 className='flex font-ibmplexsans text-md text-baseextra7' style={{
                                          fontWeight:'300'
                                        }}>Back</h2><FontAwesomeIcon icon={faUndo} className='mx-2 text-baseextra7'/>

                                      </button>
                              </div>

                              <div className='flex w-[15vw] h-auto mt-2 justify-center items-center space-x-2'>
                                <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>
                                <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                <div className='flex bg-baseextra6 h-2 w-2 rounded-full'/>
                                <div className='flex bg-baseextra6 h-0.5 w-[4vw]'/>

                              </div>


                    </div>
              </div>

          ) : null}


      </div>

      <div className='flex h-auto w-auto'>

             <div className='flex w-[25vw] h-auto'/>

            <div className="flex flex-col h-auto w-[75vw] justify-center items-center bg-baseextra6 overflow-y-hidden">

                {/* Floor 01 Section */}

                        <div className=' flex flex-col h-auto w-[75vw] items-center justify-center'>
                          {currentFloor === 'floor1' && (
                          <div className="flex flex-col h-auto w-[75vw] justify-center items-center">
                            <div className='flex flex-col bg-transparent h-[5vh] w-[75vw]'/>


                                        <div ref={floor1Ref} className='flex flex-col w-auto items-center justify-center' data-aos='fade-right' data-aos-delay='500'>

                                          <div className='flex flex-col w-[60vw] h-[10vh] items-center justify-center'>
                                          <h2
                                            className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-baseextra7"
                                            style={{
                                              fontWeight: 200,
                                            }}
                                          >
                                            Floor 01
                                          </h2>
                                          </div>
                          
                                          <div className="flex flex-col w-[75vw] h-[80vh] bg-baseextra6 drop-shadow-lg items-center justify-center mt-10 rounded-2xl p-0"
                                          style={{
                                            scale:'85%',
                                            boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                          }}>
                                            <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                              {shops.slice(0, 5).map((shop, index) => {

                                              const isFiltered = filteredShops.includes(shop.shopID);
                                              const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                return (
                                                <div
                                                  key={index}
                                                  onClick={() => {
                                                    handleClickShopView(shop?.shopID);
                                                    handlePromotions(shop?.shopID);
                                                  }}
                                                  className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                    (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                      ? 'opacity-100 scale-100' 
                                                      : 'opacity-35 scale-90'
                                                  }`}
                                                  style={{
                                                    boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                  }}>
                                                    <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                              
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
                                                        
                                                        <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                            <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                              fontWeight:'500'
                                                            }}>
                                                                {shop?.shopID}
                                                            </h2>
                              
                                                        </div>                          
                                                        
                                                        <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                        boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                        }}>
                                                            <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                              fontWeight:'200'
                                                            }}>
                                                                {shop?.shopName ? (
                                                                  shop.shopName
                                                                ) :(
                                                                  <span style={{
                                                                    fontSize:'0.8rem'
                                                                  }}>Temporarily Unavailable</span>
                                                                )}
                                                            </h2>
                              
                                                        </div>
                              
                              
                                                    </div>
                              
                                                    <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                            <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                              
                                                              {/*Hood of the Shop */}
                                                              <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                
                                                              }}>
                                                                
                                                                <img src={hood} alt='' style={{width:'200px' }}/>

                                                              </div>

                                                              {/*Under Hood of the Shop */}
                                                                <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                  

                                                                        {/*Side Bars of the Shops */}
                                                                        <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                    <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                      width:'0.6rem'
                                                                                    }}/>

                                                                        </div>



                                                                          {/*center section of the Shops */}
                                                                        <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                              <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                      boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                      backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                  }}>

                                                                                      <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                              </div>  


                                                                        </div>


                                                                        {/*Side BArs of the Shops */}
                                                                        <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                            <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                          width:'0.6rem'
                                                                                        }}/>



                                                                        </div>



                                                                </div>



                                                            </div>
                                                    
                                                        
                                                        
                                                        
                                                    </div>

                                                    <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                </div>
                                              );
                                              })}
                                            </div>
                              
                                            <div className="flex w-[75vw] h-[15vh] bg-gray-600 bg-opacity-70 items-center justify-center">
                                              <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                                boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                              }}>
                                                <FontAwesomeIcon
                                                  icon={faAngleDoubleLeft}
                                                  className="mx-4 h-8 text-baseextra6"
                                                />
                                                <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
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
                                                  className="mx-4 h-8 text-baseextra6"
                                                />
                                                <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
                                                  fontWeight:'100'
                                                }}>
                                                  Exit and Entrance
                                                </h2>
                                              </div>
                                            </div>
                              
                                            <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2 p-0">
                                                
                                                  {shops.slice(5, 10).map((shop, index) => {

                                                      const isFiltered = filteredShops.includes(shop.shopID);
                                                      const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                      return (
                                                      <div
                                                        key={index}
                                                        onClick={() => {
                                                          handleClickShopView(shop?.shopID);
                                                          handlePromotions(shop?.shopID);
                                                        }}
                                                        className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                          (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                            ? 'opacity-100 scale-100' 
                                                            : 'opacity-35 scale-90'
                                                        }`}
                                                        style={{
                                                          boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                        }}>
                                                          <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                              
                                                              <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                                  <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                                    fontWeight:'500'
                                                                  }}>
                                                                      {shop?.shopID}
                                                                  </h2>

                                                              </div>                          
                                                              
                                                              <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                              boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                              }}>
                                                                  <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                                    fontWeight:'200'
                                                                  }}>
                                                                      {shop?.shopName ? (
                                                                        shop.shopName
                                                                      ) :(
                                                                        <span style={{
                                                                          fontSize:'0.8rem'
                                                                        }}>Temporarily Unavailable</span>
                                                                      )}
                                                                  </h2>

                                                              </div>


                                                          </div>

                                                            <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                                  <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                                    
                                                                    {/*Hood of the Shop */}
                                                                      <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                      
                                                                      }}>
                                                                      
                                                                      <img src={hood} alt='' style={{width:'200px' }}/>

                                                                      </div>

                                                                    {/*Under Hood of the Shop */}
                                                                      <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                        

                                                                              {/*Side Bars of the Shops */}
                                                                              <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                          <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                            width:'0.6rem'
                                                                                          }}/>

                                                                              </div>



                                                                                {/*center section of the Shops */}
                                                                              <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                                    <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                            boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                            backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                        }}>

                                                                                            <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                                    </div>  


                                                                              </div>


                                                                              {/*Side BArs of the Shops */}
                                                                              <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                                  <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                                width:'0.6rem'
                                                                                              }}/>



                                                                              </div>



                                                                      </div>



                                                                  </div>
                                                          
                                                              
                                                              
                                                              
                                                            </div>

                                                            <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                      </div>
                                                      );
                                                      })}
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
                                              className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-baseextra7"
                                              style={{
                                                fontWeight: 200,
                                              }}
                                            >
                                              Floor 02
                                            </h2>
                                        </div>

                                      <div id='floor2' className="flex flex-col w-[75vw] h-[80vh] items-center bg-baseextra6 justify-center mt-10 rounded-xl p-0"
                                      style={{
                                        scale:'85%',
                                        boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                      }}>
                                        <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                          {shops.slice(10, 15).map((shop, index) => {

                                              const isFiltered = filteredShops.includes(shop.shopID);
                                              const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                              return (
                                              <div
                                                key={index}
                                                onClick={() => {
                                                  handleClickShopView(shop?.shopID);
                                                  handlePromotions(shop?.shopID);
                                                }}
                                                className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                  (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                    ? 'opacity-100 scale-100' 
                                                    : 'opacity-35 scale-90'
                                                }`}
                                                style={{
                                                  boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                }}>
                                                  <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                      
                                                      <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                          <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                            fontWeight:'500'
                                                          }}>
                                                              {shop?.shopID}
                                                          </h2>

                                                      </div>                          
                                                      
                                                      <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                      boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                      }}>
                                                          <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                            fontWeight:'200'
                                                          }}>
                                                              {shop?.shopName ? (
                                                                shop.shopName
                                                              ) :(
                                                                <span style={{
                                                                  fontSize:'0.8rem'
                                                                }}>Temporarily Unavailable</span>
                                                              )}
                                                          </h2>

                                                      </div>


                                                  </div>

                                                    <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                          <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                            
                                                            {/*Hood of the Shop */}
                                                              <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                              
                                                              }}>
                                                              
                                                              <img src={hood} alt='' style={{width:'200px' }}/>

                                                              </div>

                                                            {/*Under Hood of the Shop */}
                                                              <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                

                                                                      {/*Side Bars of the Shops */}
                                                                      <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                  <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                    width:'0.6rem'
                                                                                  }}/>

                                                                      </div>



                                                                        {/*center section of the Shops */}
                                                                      <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                            <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                    boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                    backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                }}>

                                                                                    <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                            </div>  


                                                                      </div>


                                                                      {/*Side BArs of the Shops */}
                                                                      <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                          <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                        width:'0.6rem'
                                                                                      }}/>



                                                                      </div>



                                                              </div>



                                                          </div>
                                                  
                                                      
                                                      
                                                      
                                                    </div>

                                                    <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                              </div>
                                              );
                                              })}
                                        </div>

                                        <div className="flex w-[75vw] h-[15vh] bg-baseextra7 bg-opacity-30 items-center justify-center">
                                            <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                              boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                            }}>
                                              <FontAwesomeIcon
                                                icon={faAngleDoubleLeft}
                                                className="mx-4 h-8 text-baseextra6"
                                              />
                                              <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
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
                                                className="mx-4 h-8 text-baseextra6"
                                              />
                                              <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
                                                fontWeight:'100'
                                              }}>
                                                Exit and Entrance
                                              </h2>
                                            </div>
                                          </div>

                                        <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
                                                      {shops.slice(15, 20).map((shop, index) => {

                                                        const isFiltered = filteredShops.includes(shop.shopID);
                                                        const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                        return (
                                                        <div
                                                          key={index}
                                                          onClick={() => {
                                                            handleClickShopView(shop?.shopID);
                                                            handlePromotions(shop?.shopID);
                                                          }}
                                                          className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                            (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                              ? 'opacity-100 scale-100' 
                                                              : 'opacity-35 scale-90'
                                                          }`}
                                                          style={{
                                                            boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                          }}>
                                                            <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                                
                                                                <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                                    <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                                      fontWeight:'500'
                                                                    }}>
                                                                        {shop?.shopID}
                                                                    </h2>

                                                                </div>                          
                                                                
                                                                <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                                boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                                }}>
                                                                    <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                                      fontWeight:'200'
                                                                    }}>
                                                                        {shop?.shopName ? (
                                                                          shop.shopName
                                                                        ) :(
                                                                          <span style={{
                                                                            fontSize:'0.8rem'
                                                                          }}>Temporarily Unavailable</span>
                                                                        )}
                                                                    </h2>

                                                                </div>


                                                            </div>

                                                              <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                                    <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                                      
                                                                      {/*Hood of the Shop */}
                                                                        <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                        
                                                                        }}>
                                                                        
                                                                        <img src={hood} alt='' style={{width:'200px' }}/>

                                                                        </div>

                                                                      {/*Under Hood of the Shop */}
                                                                        <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                          

                                                                                {/*Side Bars of the Shops */}
                                                                                <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                            <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                              width:'0.6rem'
                                                                                            }}/>

                                                                                </div>



                                                                                  {/*center section of the Shops */}
                                                                                <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                                      <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                              boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                              backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                          }}>

                                                                                              <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                                      </div>  


                                                                                </div>


                                                                                {/*Side BArs of the Shops */}
                                                                                <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                                    <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                                  width:'0.6rem'
                                                                                                }}/>



                                                                                </div>



                                                                        </div>



                                                                    </div>
                                                            
                                                                
                                                                
                                                                
                                                              </div>

                                                              <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                        </div>
                                                        );
                                                        })}
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
                                              className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-baseextra7"
                                              style={{
                                                fontWeight: 200,
                                              }}
                                            >
                                              Floor 03
                                            </h2>
                                        </div>

                                      <div id='floor2' className="flex flex-col w-[75vw] h-[80vh] bg-baseextra6  items-center justify-center mt-10 rounded-xl p-0"
                                      style={{
                                        scale:'85%',
                                        boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                      }}>
                                        <div className="flex w-[75vw] h-[30vh] bg-transparent items-center  justify-center rounded-t-xl space-x-2">
                                                {shops.slice(20, 25).map((shop, index) => {

                                                const isFiltered = filteredShops.includes(shop.shopID);
                                                const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                return (
                                                <div
                                                  key={index}
                                                  onClick={() => {
                                                    handleClickShopView(shop?.shopID);
                                                    handlePromotions(shop?.shopID);
                                                  }}
                                                  className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                    (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                      ? 'opacity-100 scale-100' 
                                                      : 'opacity-35 scale-90'
                                                  }`}
                                                  style={{
                                                    boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                  }}>
                                                    <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                        
                                                        <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                            <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                              fontWeight:'500'
                                                            }}>
                                                                {shop?.shopID}
                                                            </h2>

                                                        </div>                          
                                                        
                                                        <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                        boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                        }}>
                                                            <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                              fontWeight:'200'
                                                            }}>
                                                                {shop?.shopName ? (
                                                                  shop.shopName
                                                                ) :(
                                                                  <span style={{
                                                                    fontSize:'0.8rem'
                                                                  }}>Temporarily Unavailable</span>
                                                                )}
                                                            </h2>

                                                        </div>


                                                    </div>

                                                      <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                            <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                              
                                                              {/*Hood of the Shop */}
                                                                <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                
                                                                }}>
                                                                
                                                                <img src={hood} alt='' style={{width:'200px' }}/>

                                                                </div>

                                                              {/*Under Hood of the Shop */}
                                                                <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                  

                                                                        {/*Side Bars of the Shops */}
                                                                        <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                    <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                      width:'0.6rem'
                                                                                    }}/>

                                                                        </div>



                                                                          {/*center section of the Shops */}
                                                                        <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                              <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                      boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                      backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                  }}>

                                                                                      <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                              </div>  


                                                                        </div>


                                                                        {/*Side BArs of the Shops */}
                                                                        <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                            <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                          width:'0.6rem'
                                                                                        }}/>



                                                                        </div>



                                                                </div>



                                                            </div>
                                                    
                                                        
                                                        
                                                        
                                                      </div>

                                                      <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                </div>
                                                );
                                                })}
                                        </div>

                                          <div className="flex w-[75vw] h-[15vh] bg-baseextra7 bg-opacity-30 items-center justify-center">
                                            <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                              boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                            }}>
                                              <FontAwesomeIcon
                                                icon={faAngleDoubleLeft}
                                                className="mx-4 h-8 text-baseextra6"
                                              />
                                              <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
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
                                                className="mx-4 h-8 text-baseextra6"
                                              />
                                              <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
                                                fontWeight:'100'
                                              }}>
                                                Exit and Entrance
                                              </h2>
                                            </div>
                                          </div>

                                        <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
                                                    {shops.slice(25, 30).map((shop, index) => {

                                                    const isFiltered = filteredShops.includes(shop.shopID);
                                                    const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                    return (
                                                    <div
                                                      key={index}
                                                      onClick={() => {
                                                        handleClickShopView(shop?.shopID);
                                                        handlePromotions(shop?.shopID);
                                                      }}
                                                      className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                        (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                          ? 'opacity-100 scale-100' 
                                                          : 'opacity-35 scale-90'
                                                      }`}
                                                      style={{
                                                        boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                      }}>
                                                        <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                            
                                                            <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                                <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                                  fontWeight:'500'
                                                                }}>
                                                                    {shop?.shopID}
                                                                </h2>

                                                            </div>                          
                                                            
                                                            <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                            boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                            }}>
                                                                <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                                  fontWeight:'200'
                                                                }}>
                                                                    {shop?.shopName ? (
                                                                      shop.shopName
                                                                    ) :(
                                                                      <span style={{
                                                                        fontSize:'0.8rem'
                                                                      }}>Temporarily Unavailable</span>
                                                                    )}
                                                                </h2>

                                                            </div>


                                                        </div>

                                                          <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                                <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                                  
                                                                  {/*Hood of the Shop */}
                                                                    <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                    
                                                                    }}>
                                                                    
                                                                    <img src={hood} alt='' style={{width:'200px' }}/>

                                                                    </div>

                                                                  {/*Under Hood of the Shop */}
                                                                    <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                      

                                                                            {/*Side Bars of the Shops */}
                                                                            <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                        <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                          width:'0.6rem'
                                                                                        }}/>

                                                                            </div>



                                                                              {/*center section of the Shops */}
                                                                            <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                                  <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                          boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                          backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                      }}>

                                                                                          <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                                  </div>  


                                                                            </div>


                                                                            {/*Side BArs of the Shops */}
                                                                            <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                                <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                              width:'0.6rem'
                                                                                            }}/>



                                                                            </div>



                                                                    </div>



                                                                </div>
                                                        
                                                            
                                                            
                                                            
                                                          </div>

                                                          <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                    </div>
                                                    );
                                                    })}
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
                                                    className="font-ibmplexsans mt-[6rem] text-3xl ml-2 text-baseextra7"
                                                    style={{
                                                      fontWeight: 200,
                                                    }}
                                                  >
                                                    Floor 04
                                                  </h2>
                                              </div>

                                            <div id='floor4' className="flex flex-col w-[75vw] h-[80vh] bg-baseextra6 items-center justify-center mt-10 rounded-xl p-0"
                                            style={{
                                              scale:'85%',
                                              boxShadow:'inset 0 3px 17px rgba(0, 0, 0, 0.9)'
                                            }}>
                                              <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-t-xl space-x-2">
                                                {shops.slice(30, 35).map((shop, index) => {

                                                        const isFiltered = filteredShops.includes(shop.shopID);
                                                        const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                        return (
                                                        <div
                                                          key={index}
                                                          onClick={() => {
                                                            handleClickShopView(shop?.shopID);
                                                            handlePromotions(shop?.shopID);
                                                          }}
                                                          className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                            (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                              ? 'opacity-100 scale-100' 
                                                              : 'opacity-35 scale-90'
                                                          }`}
                                                          style={{
                                                            boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                          }}>
                                                            <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                                
                                                                <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                                    <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                                      fontWeight:'500'
                                                                    }}>
                                                                        {shop?.shopID}
                                                                    </h2>

                                                                </div>                          
                                                                
                                                                <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                                boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                                }}>
                                                                    <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                                      fontWeight:'200'
                                                                    }}>
                                                                        {shop?.shopName ? (
                                                                          shop.shopName
                                                                        ) :(
                                                                          <span style={{
                                                                            fontSize:'0.8rem'
                                                                          }}>Temporarily Unavailable</span>
                                                                        )}
                                                                    </h2>

                                                                </div>


                                                            </div>

                                                              <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                                    <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                                      
                                                                      {/*Hood of the Shop */}
                                                                        <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                        
                                                                        }}>
                                                                        
                                                                        <img src={hood} alt='' style={{width:'200px' }}/>

                                                                        </div>

                                                                      {/*Under Hood of the Shop */}
                                                                        <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                          

                                                                                {/*Side Bars of the Shops */}
                                                                                <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                            <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                              width:'0.6rem'
                                                                                            }}/>

                                                                                </div>



                                                                                  {/*center section of the Shops */}
                                                                                <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                                      <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                              boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                              backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                          }}>

                                                                                              <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                                      </div>  


                                                                                </div>


                                                                                {/*Side BArs of the Shops */}
                                                                                <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                                    <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                                  width:'0.6rem'
                                                                                                }}/>



                                                                                </div>



                                                                        </div>



                                                                    </div>
                                                            
                                                                
                                                                
                                                                
                                                              </div>

                                                              <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                        </div>
                                                        );
                                                        })}
                                              </div>

                                              <div className="flex w-[75vw] h-[15vh] bg-baseextra7 bg-opacity-30 items-center justify-center">
                                                  <div className="flex w-[35vw] h-[10vh] bg-slate-800 items-center justify-center rounded-l-full ml-2" style={{
                                                    boxShadow:'inset 0 4px 10px rgba(255, 255, 255, 0.5)'
                                                  }}>
                                                    <FontAwesomeIcon
                                                      icon={faAngleDoubleLeft}
                                                      className="mx-4 h-8 text-baseextra6"
                                                    />
                                                    <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
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
                                                      className="mx-4 h-8 text-baseextra6"
                                                    />
                                                    <h2 className="flex font-ibmplexsans text-baseextra6 text-md" style={{
                                                      fontWeight:'100'
                                                    }}>
                                                      To the Top Floor
                                                    </h2>
                                                  </div>
                                                </div>

                                              <div className="flex w-[75vw] h-[30vh] bg-transparent items-center justify-center rounded-b-xl space-x-2">
                                                {shops.slice(35, 40).map((shop, index) => {

                                                        const isFiltered = filteredShops.includes(shop.shopID);
                                                        const isCategorized = selectedCategory && shop.category && shop.category.toLowerCase() === selectedCategory && selectedCategory.toLowerCase();


                                                        return (
                                                        <div
                                                          key={index}
                                                          onClick={() => {
                                                            handleClickShopView(shop?.shopID);
                                                            handlePromotions(shop?.shopID);
                                                          }}
                                                          className={`flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
                                                            (isFiltered || isCategorized || filteredShops.length === 0 || !selectedCategory) 
                                                              ? 'opacity-100 scale-100' 
                                                              : 'opacity-35 scale-90'
                                                          }`}
                                                          style={{
                                                            boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 0px 18px 25px rgba(0, 0, 0, 0.8)'
                                                          }}>
                                                            <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">

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
                                                                
                                                                <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                                    <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                                      fontWeight:'500'
                                                                    }}>
                                                                        {shop?.shopID}
                                                                    </h2>

                                                                </div>                          
                                                                
                                                                <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                                boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                                }}>
                                                                    <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                                      fontWeight:'200'
                                                                    }}>
                                                                        {shop?.shopName ? (
                                                                          shop.shopName
                                                                        ) :(
                                                                          <span style={{
                                                                            fontSize:'0.8rem'
                                                                          }}>Temporarily Unavailable</span>
                                                                        )}
                                                                    </h2>

                                                                </div>


                                                            </div>

                                                              <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                                    <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                                      
                                                                      {/*Hood of the Shop */}
                                                                        <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                        
                                                                        }}>
                                                                        
                                                                        <img src={hood} alt='' style={{width:'200px' }}/>

                                                                        </div>

                                                                      {/*Under Hood of the Shop */}
                                                                        <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                          

                                                                                {/*Side Bars of the Shops */}
                                                                                <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                            <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                              width:'0.6rem'
                                                                                            }}/>

                                                                                </div>



                                                                                  {/*center section of the Shops */}
                                                                                <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                                      <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                              boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                              backgroundColor: shop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                          }}>

                                                                                              <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                                      </div>  


                                                                                </div>


                                                                                {/*Side BArs of the Shops */}
                                                                                <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                                    <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                                  width:'0.6rem'
                                                                                                }}/>



                                                                                </div>



                                                                        </div>



                                                                    </div>
                                                            
                                                                
                                                                
                                                                
                                                              </div>

                                                              <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                        </div>
                                                        );
                                                        })}
                                              </div>
                                            </div>

                                          </div>

                                      )}


                        </div>                

            </div>


      </div>



                   {/* Shop Detail Modal */}
                      {isModVisible && selectedShop &&  (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex w-[100vw] items-center justify-center z-40">

                            <div className='flex w-[25vw] bg-transparent h-auto'/>


                            <div className='flex flex-col items-center justify-center w-[75vw] h-auto'>
                              

                                      {/* Shop Detail Modal */}
                                      {isModVisible && selectedShop && fetchProducts && (
                                            <div className="bg-white flex rounded-3xl items-center justify-center mt-16  w-[70vw] h-[80vh] relative" style={{
                                               boxShadow:'inset 0 20px 10px rgba(0, 0, 0, 0.2)',
                                            }}>

                                              {/* Button for close the menu */}
                                              <button
                                                className="absolute top-3 right-3 bg-red-700 text-white h-10 w-10 items-center justify-center rounded-full hover:scale-105 transition-transform duration-300 ease-in-out" style={{
                                                  boxShadow:'inset 0 5px 3px rgba(0, 0, 0, 0.2),  0 2px 4px 5px rgba(0, 0, 0, 0.2) ',
                                                  
                                                }}
                                                onClick={closeModal}
                                              >
                                                <FontAwesomeIcon icon={faClose} alt ='' className='h-5' />
                                              </button>

                                              
                                              {/* Button for Visit to the shop */}
                                              <button
                                                className="absolute top-3 right-16 bg-red-500 text-white h-10 w-32 items-center justify-center rounded-full hover:scale-105 transition-transform duration-300 ease-in-out" style={{
                                                  boxShadow:'inset 0 5px 3px rgba(0, 0, 0, 0.2),  0 2px 4px 5px rgba(0, 0, 0, 0.2) ',
                                                  
                                                }}
                                                onClick={closeModal}
                                              >
                                                Visit Shop
                                              </button>

                                                 <div className='flex bg-transparent w-[70vw] rounded-3xl h-[70vh] overflow-hidden'>

                                                          {/* Section for preview shop detials -> shop name, model, related shop model */}
                                                          <div className='flex flex-col  items-center justify-center bg-transparent w-[25vw] h-[70vh]'>

                                                              <div className='flex flex-col w-[20vw] h-[20vh] items-start justify-start'>

                                                                 {/* Div section for shopid, shopName and shop image */}
                                                                  <div className='flex w-[20vw] h-auto items-center justify-between'>

                                                                    <div className='flex flex-col w-auto h-auto items-start justify-between'>

                                                                       <h2 className='font-ibmplexsans text-md text-baseextra7' style={{
                                                                          fontWeight:'200'
                                                                        }}>
                                                                          {selectedShop.shopID}
                                                                        </h2>

                                                                        <h2 className='font-ibmplexsans text-2xl text-baseextra7'style={{
                                                                          fontWeight:'500'
                                                                        }}>
                                                                          {selectedShop.shopName}
                                                                        </h2>

                                                                        <div className='flex mt-2 bg-slate-900 rounded-full w-[8vw] focus:w-[10vw]' style={{
                                                                          height:'0.1rem'
                                                                        }}/>





                                                                    </div>

                                                                    <div className='flex flex-col w-20 h-20 mt-2 items-center overflow-hidden rounded-full justify-center' style={{
                                                                       boxShadow:'2px 4px 5px rgba(0, 0, 0, 0.6) ',
                                                                    }}>

                                                                        <img src={selectedShop.shopKeeperPhoto} alt='' className='scale-110 mt-1'/>



                                                                    </div>


                                                                  </div>

                                                                  <p className='flex flex-col w-[15vw] font-ibmplexsans text-baseextra7' style={{
                                                                    fontSize:'0.65rem'
                                                                  }}>
                                                                    Here’s a preview of the {selectedShop.shopName}. You will need to visit the store to make your purchase
                                                                    </p>

                                                                  


                                                              </div>  
                                                                 {/* Div section for display the shop model */}
                                                              <div className='flex flex-col w-[20vw] h-[30vh] items-center justify-center scale-125'>

                                                                    <div className="flex flex-col w-[14vw] h-[26vh] items-center border-t-8 border-t-cyan-700 justify-end bg-baseextra4 opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                                                      style={{
                                                                        boxShadow: 'inset 0 10px 20px rgba(255, 255, 255, 0.5), 1px 22px 25px rgba(0, 0, 0, 0.8)'
                                                                      }}>
                                                                        <div className="flex flex-col w-[14vw] h-[12vh] items-center justify-start bg-transparent overflow-hidden opacity-100 rounded-t-3xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                                                  
                                                                            <div className='flex w-[5vw] h-auto justify-center items-center mt-3 space-x-2'>
                                                                              <div
                                                                                    className='flex h-2 w-2 rounded-full'
                                                                                    style={{ backgroundColor: selectedShop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                                                />
                                                                              <div
                                                                                    className='flex h-2 w-2 rounded-full'
                                                                                    style={{ backgroundColor: selectedShop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                                                />
                                                                              <div
                                                                                    className='flex h-2 w-2 rounded-full'
                                                                                    style={{ backgroundColor: selectedShop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)' }}
                                                                                />
                                                  
                                                                            </div> 
                                                                            
                                                                            <div className='flex w-[5vw] h-auto justify-center items-center bg-baseextra6 rounded-2xl mt-2 overflow-hidden'>
                                                                                <h2 className='font-ibmplexsans text-xs text-center text-baseextra7' style={{
                                                                                  fontWeight:'500'
                                                                                }}>
                                                                                    {selectedShop?.shopID}
                                                                                </h2>
                                                  
                                                                            </div>                          
                                                                            
                                                                            <div className='flex w-[10vw] h-auto justify-center items-center bg-rgba(0, 0, 0, 0.5) rounded-lg mt-1 overflow-hidden' style={{
                                                                            boxShadow:'inset 0 2px 6px rgba(0, 255, 255, 0.5)',
                                                                            }}>
                                                                                <h2 className='font-ibmplexsans text-lg text-center text-baseextra6' style={{
                                                                                  fontWeight:'200'
                                                                                }}>
                                                                                    {selectedShop?.shopName ? (
                                                                                      selectedShop.shopName
                                                                                    ) :(
                                                                                      <span style={{
                                                                                        fontSize:'0.8rem'
                                                                                      }}>Temporarily Unavailable</span>
                                                                                    )}
                                                                                </h2>
                                                  
                                                                            </div>
                                                  
                                                  
                                                                        </div>
                                                  
                                                                        <div className='flex flex-col w-[14vw] h-[13vh] items-center justify-end bg-transparent overflow-hidden opacity-100'>

                                                                                <div className='flex flex-col w-[10vw] items-center justify-end bg-transparent h-[12vh]'>
                                                                                  
                                                                                  {/*Hood of the Shop */}
                                                                                  <div className='flex bg-transparent overflow-hidden w-[10vw] rounded-t-full h-[2vh]' style={{
                                                                                    
                                                                                  }}>
                                                                                    
                                                                                    <img src={hood} alt='' style={{width:'200px' }}/>

                                                                                  </div>

                                                                                  {/*Under Hood of the Shop */}
                                                                                    <div className='flex w-[10vw] items-center justify-end bg-transparent h-[10vh]'>
                                                                                      

                                                                                            {/*Side Bars of the Shops */}
                                                                                            <div className='flex flex-col w-[1vw] items-end justify-center bg-transparent h-[10vh]'>

                                                                                                        <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                                          width:'0.6rem'
                                                                                                        }}/>

                                                                                            </div>



                                                                                              {/*center section of the Shops */}
                                                                                            <div className='flex flex-col w-[8vw] items-center justify-end bg-transparent h-[10vh]'>

                                                                                                  <div className='flex w-[5vw] h-[8vh] items-center border-t-8 border-t-baseextra6 justify-start rounded-t-2xl' style={{
                                                                                                          boxShadow:'inset 0 10px 6px rgba(0, 0, 0, 0.2)',
                                                                                                          backgroundColor: selectedShop.shopID ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.2)'
                                                                                                      }}>

                                                                                                          <div className='flex items-center ml-2 justify-start bg-baseextra7 h-2 w-2 rounded-full'/>

                                                                                                  </div>  


                                                                                            </div>


                                                                                            {/*Side BArs of the Shops */}
                                                                                            <div className='flex flex-col w-[1vw] items-start justify-center bg-transparent h-[10vh]'>

                                                                                                <div className='flex bg-gradient-to-t from-slate-500 to-cyan-600 h-[10vh]' style={{
                                                                                                              width:'0.6rem'
                                                                                                            }}/>



                                                                                            </div>



                                                                                    </div>



                                                                                </div>
                                                                        
                                                                            
                                                                            
                                                                            
                                                                        </div>

                                                                        <div className='flex w-[14vw] h-[1vh] bg-gradient-to-t from-slate-500 to-cyan-600'/>


                                                                    </div>

                                                              </div>

                                                                 {/* Div section for display lower section */}
                                                              <div className='flex flex-col mt-6 w-[20vw] h-[20vh] items-center justify-center space-y-5'>

                                                                  <h2 className='flex items-center font-ibmplexsans text-md text-baseextra7' style={{
                                                                    fontWeight:'300'
                                                                  }}>
                                                                    <div className='bg-slate-900 w-[5vw]' style={{
                                                                      height:'0.1rem'
                                                                    }}/>{''}<span className='mx-4'>More Details Of This Shop</span>
                                                                  </h2>

                                                                  <div className='grid grid-cols-3  gap-3 mt-2'>
                                                                    <div className='flex h-12 w-12 border-cyan-900 bg-baseextra6 items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:border-2 transition-transform duration-300 ease-in-out' style={{ boxShadow:'inset 0 4px 3px rgba(0, 0, 0, 0.2),  1px 1px 10px rgba(0, 0, 0, 0.2)'}}>
                                                                        <FontAwesomeIcon icon={faGlobe} className='h-6 text-baseextra7'/>
                                                                    </div>
                                                                    <div className='flex h-12 w-12 border-cyan-900 bg-baseextra6 items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:border-2 transition-transform duration-300 ease-in-out' style={{ boxShadow:'inset 0 4px 3px rgba(0, 0, 0, 0.2),  1px 1px 10px rgba(0, 0, 0, 0.2)'}}>
                                                                      <FontAwesomeIcon icon={faPhone} className='h-6 text-baseextra7'/>
                                                                    </div>
                                                                    <div className='flex h-12 w-12 border-cyan-900 bg-baseextra6 items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:border-2 transition-transform duration-300 ease-in-out ' style={{ boxShadow:'inset 0 4px 3px rgba(0, 0, 0, 0.2),  1px 1px 10px rgba(0, 0, 0, 0.2)'}}>
                                                                       <FontAwesomeIcon icon={faMailForward} className='h-6 text-baseextra7'/>
                                                                    </div>


                                                                  </div>   

                                                                  <div className='flex w-[10vw] mt-3 items-center justify-cente space-x-2'>
                                                                      <div className='bg-gray-900 w-[3vw] rounded-full' style={{height:'0.02rem'}}/>
                                                                      <div className='bg-gray-900 w-2 h-2 rounded-full'/>
                                                                      <div className='bg-gray-900 w-2 h-2 rounded-full'/>
                                                                      <div className='bg-gray-900 w-[3vw] rounded-full' style={{height:'0.02rem'}}/>
                                                                  </div>  

                                                              </div>  


                                                          </div> 


                                                          {/* Section for preview shop products, promotions and others */}
                                                          <div className='flex bg-transparent w-[45vw] items-center space-x-2 justify-center h-[70vh]'>

                 
                                                             {/* Divider */}    
                                                            <div className='flex bg-gray-300 h-[60vh] rounded-t-full rounded-b-full' style={{width:'0.2rem'}}/>


                                                              {/* shop products, promotions and others */}                                    
                                                            <div className='flex flex-col w-[45vw] items-start justify-start h-[70vh] bg-transparent p-3 space-y-4'>

                                                                    <h2 className='flex items-center text-center font-ibmplexsans text-lg text-baseextra7' style={{
                                                                      fontWeight:'300'
                                                                    }}>About {selectedShop.shopName}{''}<div className='bg-slate-900 w-[5vw] mx-2' style={{
                                                                      height:'0.1rem'
                                                                    }}/></h2>

                                                                    <p className='font-ibmplexsans w-[35vw] text-baseextra7 text-start' style={{fontSize:'0.8rem'}}>
                                                                   {selectedShop.description}                                                                   
                                                                    </p>
                                                                    

                                                                    {/* Top Selling row */}
                                                                    <div className='flex justify-between items-center w-[42vw]'>

                                                                        <h2 className='flex items-center text-center font-ibmplexsans text-lg text-baseextra7' style={{
                                                                          fontWeight:'400'
                                                                        }}>Top Selling Products From Us {''}<div className='bg-slate-900 w-[5vw] mx-2' style={{
                                                                          height:'0.1rem'
                                                                        }}/></h2>

                                                                        <button
                                                                        onClick={()=> handleCategoryClick(selectedShop.category)} className='flex bg-baseextra4 text-xs items-center justify-center text-baseextra6 font-ibmplexsans w-[8vw] h-[2rem] rounded-full hover:scale-110 transition-transform duration-300 ease-in-out' style={{boxShadow:'inset 0 2px 5px rgba(0, 255, 255, 0.8),   1px 3px 10px rgba(0, 0, 0, 0.3) '}}>
                                                                          More Products
                                                                        </button>

                                                                    </div>



                                                                    {/* Top Selling Product */}
                                                                    <div className='grid grid-cols-5 gap-4'>
                                                                        {fetchProducts.map((item, index) => (
                                                                         
                                                                         <div
                                                                           key={index}
                                                                           onClick={()=> handleItemClick(item._id)}
                                                                          className='flex flex-col bg-transparent h-32 rounded-xl items-center justify-start cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out' style={{boxShadow:'inset 0 5px 6px rgba(0, 0, 0, 0.2),  2px 4px 10px rgba(0, 0, 0, 0.2)' ,width:'116px'}}>

                                                                            {/* item image componenet */}
                                                                            <div className='flex  h-20 rounded-t-xl items-center justify-center overflow-hidden' style={{width:'116px'}}>
                                                                              <img src={item.images[0]} alt={item.name} style={{width:'120px'}}/>

                                                                            </div>  

                                                                            <h2 className='flex h-8 font-ibmplexsans text-baseextra7 items-center text-center justify-center overflow-hidden' style={{width:'100px', fontSize:'0.6rem'}}>
                                                                                {item.name}
                                                                            </h2>  

                                                                        </div>
                                                                        ))}

                                                                    </div> 


                                                                    {/* Top Selling row */}
                                                                    <div className='flex justify-between items-center w-[42vw]'>



                                                                            {/* Row for top selling product */}
                                                                            <h2 className='flex items-center text-center font-ibmplexsans text-lg text-baseextra7' style={{
                                                                              fontWeight:'400'
                                                                            }}>Top Ongoing Promotions This Week{''}<div className='bg-slate-900 w-[5vw] mx-2' style={{
                                                                              height:'0.1rem'
                                                                            }}/></h2>

                                                                              <h2 className='flex items-center text-center font-ibmplexsans text-baseextra7' style={{
                                                                              fontWeight:'400',
                                                                              fontSize: '0.5rem'
                                                                            }}>*These promotions are valid only in certain period of time</h2>

                                                                   

                                                                     </div>



                                                                    {/* Top Selling Product with Promotions */}
                                                                    <div className='grid grid-cols-5 gap-4'>
                                                                    {promotions.map((item, index) => (
                                                                    
                                                                    <div
                                                                      key={index}
                                                                      className='flex flex-col bg-transparent h-32 rounded-xl items-center justify-start cursor-pointer focus:border-4 focus:border-cyan-800 hover:scale-105 transition-transform duration-300 ease-in-out' style={{boxShadow:'inset 0 5px 6px rgba(0, 0, 0, 0.2),  2px 4px 10px rgba(0, 0, 0, 0.2)' ,width:'116px'}}>

                                                                        {/* item image componenet */}
                                                                        <div className='flex  h-20 rounded-t-xl items-center justify-center overflow-hidden' style={{width:'116px'}}>
                                                                          <img src={item.poster} alt={item.discount} style={{width:'120px'}}/>

                                                                        </div>  

                                                                        <h2 className='flex h-8 font-ibmplexsans text-baseextra7 items-center text-center justify-center overflow-hidden' style={{width:'100px', fontSize:'0.6rem'}}>
                                                                            {item.discount}% Discount
                                                                        </h2>  

                                                                    </div>
                                                                    ))}

                                                                    </div> 



                                                            </div>

                                                          </div> 

                                                  </div> 

                                              {/* Add more details here based on your API response */}
                                            </div>
                                          )}



                            </div>
                        </div>
                      )}


    </div>
  );
};

export default Mapmodel;
