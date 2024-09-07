import React, { useState } from 'react';
import axios from 'axios';

const Shoppanel = () => {
  const [firstFloorShop, setFirstFloorShop] = useState([
    { id: 'F10' },
    { id: 'F11' },
    { id: 'F12' },
    { id: 'F13' },
    { id: 'F14' },
    { id: 'F15' },
    { id: 'F16' },
    { id: 'F17' },
    { id: 'F18' },
    { id: 'F19' },
  ]);

  const [secondFloorShop, setSecondFloorShop] = useState([
    { id: 'F20' },
    { id: 'F21' },
    { id: 'F22' },
    { id: 'F23' },
    { id: 'F24' },
    { id: 'F25' },
    { id: 'F26' },
    { id: 'F27' },
    { id: 'F28' },
    { id: 'F29' },
  ]);

  const [thirdFloorShop, setThirdFloorShop] = useState([
    { id: 'F40' },
    { id: 'F41' },
    { id: 'F42' },
    { id: 'F43' },
    { id: 'F44' },
    { id: 'F45' },
    { id: 'F46' },
    { id: 'F47' },
    { id: 'F48' },
    { id: 'F49' },
  ]);


  const [forthFloorShop, setForthFloorShop] = useState([
    { id: 'F30' },
    { id: 'F31' },
    { id: 'F32' },
    { id: 'F33' },
    { id: 'F34' },
    { id: 'F35' },
    { id: 'F36' },
    { id: 'F37' },
    { id: 'F38' },
    { id: 'F39' },
  ]);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleClosePopup = () => {
    setSelectedShop(null);
  };

  const handleSaveShop = async (updatedShop) => {
    try {
      await axios.post('http://localhost:5000/shops', updatedShop);
      // Update shop list after saving
      [setFirstFloorShop, setSecondFloorShop, setThirdFloorShop, setForthFloorShop].forEach(setShops => {
        setShops(shops => shops.map(shop =>
          shop.id === updatedShop.id ? updatedShop : shop
        ));
      });
      handleClosePopup();
    } catch (error) {
      console.error('Error saving shop:', error);
    }
  };

  const ShopFormPopup = ({ shop, onClose, onSave }) => {
    const [name, setName] = useState(shop.name);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ ...shop, name });
    };

    return (
      <div className='fixed inset-8 rounded-2xl flex items-center justify-center bg-gray-800 bg-opacity-50'>
        <div className='bg-white w-[50vw] p-6 rounded-xl shadow-lg'>
          <div className='flex flex-row w-full h-auto justify-between items-center'>
               <h3 className='text-2xl font-russoone font-thin mb-4'>Add a Shop</h3>
               <button type='button' onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2'>
                Cancel
              </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Shop Name
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
              />
            </div>
            <div className='flex justify-end'>
              <button type='button' onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2'>
                Cancel
              </button>
              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col min-h-screen w-[100vw] bg-primary items-center mt-16'>

        <div className='fixed h-[12rem] w-[100vw] bg-primary flex flex-col items-center cursor-default justify-between z-40'>

              {/* Search Query and Upper bar */}

              <div className='fixed h-[6rem] w-[100vw] bg-primary flex items-center justify-center z-40'>
                <div className='flex h-[6rem] w-[20vw] bg-primary items-center justify-center'>
                      <h2 className='font-ibmplexsans text-2xl text-secondary font-semibold' style={{
                      fontWeight:'300'
                      }}>
                        System Performance
                      </h2>
                </div>
                <div className='flex h-[6rem] w-[80vw] bg-primary items-center justify-center p-5 '>
                      <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
                        <h2 className='font-ibmplexsans text-md text-center text-secondary'>
                            Total Shop Areas :
                        </h2>
                        <div className='flex h-[2rem] w-[6vw] bg-baseextra2 items-center justify-center p-5 rounded-xl'>

                        </div>

                      </div>
                      <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
                            <h2 className='font-ibmplexsans text-md text-center text-secondary'>
                                Allocated Shops :
                            </h2>
                            <div className='flex h-[2rem] w-[6vw] bg-baseextra2 items-center justify-center p-5 rounded-xl'>

                           </div>

                      </div>
                      <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
                            <h2 className='font-ibmplexsans text-md text-center text-secondary'>
                                Remaining Shops :
                            </h2>
                            <div className='flex h-[2rem] w-[6vw] bg-baseextra2 items-center justify-center p-5 rounded-xl'>

                            </div>

                      </div> 
                      <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
                            <h2 className='font-ibmplexsans text-md text-center text-secondary'>
                                Active Shops :
                            </h2>
                            <div className='flex h-[2rem] w-[6vw] bg-baseextra2 items-center justify-center p-5 rounded-xl'>

                            </div>

                      </div>


                </div>
            
           </div>

              {/* Operation Bar*/}
              
            <div className='flex h-[12rem] w-[100vw] bg-primary items-center justify-between p-12 drop-shadow-lg'>
              

            </div>



        </div>

        <div className='flex h-[5rem] w-[100vw] bg-primary'/>



      <div className='grid grid-cols-2 h-auto w-full p-5 pt-32'>
        {[firstFloorShop, secondFloorShop, thirdFloorShop, forthFloorShop].map((floorShop, floorIndex) => (
          <div key={floorIndex} className='relative flex h-auto w-auto p-5'>
            <div className='flex flex-col h-auto w-[50vw] justify-start items-start p-5 border-2 border-secondary rounded-2xl'>
              <div className='flex w-full h-auto items-start'>
                <h2 className='font-russoone text-3xl text-baseextra4 text-start ml-10'>
                  Floor {floorIndex + 1}:
                </h2>
              </div>
              <div className='flex flex-col w-full h-auto items-start justify-start p-5 space-y-5'>
                <div className='grid grid-cols-5 gap-2 w-full justify-start items-start'>
                  {floorShop.slice(0, 5).map((shop) => (
                    <div
                      key={shop.id}
                      onClick={() => handleShopClick(shop)}
                      className={`flex flex-col h-28 w-28 p-2 rounded-b-xl cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out ${
                        shop.name ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {shop.id || 'Empty'}
                    </div>
                  ))}
                </div>
                <div className='flex flex-col w-[40vw] h-10 bg-gray-500'/>
                <div className='grid grid-cols-5 gap-2 w-full justify-center'>
                  {floorShop.slice(5, 10).map((shop) => (
                    <div
                      key={shop.id}
                      onClick={() => handleShopClick(shop)}
                      className={`flex flex-col h-28 w-28 p-2 rounded-t-xl cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out ${
                        shop.name ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {shop.id || 'Empty'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {selectedShop && (
          <ShopFormPopup
            shop={selectedShop}
            onClose={handleClosePopup}
            onSave={handleSaveShop}
          />
        )}
      </div>
    </div>
  );
};

export default Shoppanel;
