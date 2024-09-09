import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Utils/Loading';

const Shoppanel = () => {

  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const floors = [1, 2, 3, 4];


  // Set the selected shop
  const handleShopClick = (shop) => {
    setSelectedShop(shop); 
  };


  const handleClosePopup = () => {
    setSelectedShop(null);
  };

  //this is for adding shopping compartments -- this function is not be needed lately
  const handleSubmit = async (shop) => {
    try {
      const response = await axios.post("http://localhost:5000/api/shops/addFloorID", {
        floorID: shop.floorID, // Send floorID in the request
      });

      if (response.status === 201) {
        console.log("Floor ID added successfully:", response.data);
        alert('Floor ID added successfully');
        // Optionally refresh the list or take other actions
      } else {
        console.log("Something went wrong:", response.data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
    // Close the popup after submission
    handleClosePopup();
  };


    //this is for updating shopping compartments
    const handleSaveDetails = async (updatedShop) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/shops/updateDetails/${updatedShop.floorID}`, updatedShop);
        if (response.status === 200) {
          console.log('Updated Shop:', response.data.shop);
          setSelectedShop(null);
        } else {
          console.error('Failed to update shop details:', response.data.message);
          alert("Error Updating data on this form");
        }
      } catch (error) {
        console.error('Error saving shop details:', error);
      }
    };
   useEffect(() => {

  //fetch all the shop details 
  const fetchShopDetails = async () => {
      
    try {
      const response = await axios.get('http://localhost:5000/api/shops/get');
      setShops(response.data);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error fetching customer data', error);
      alert('fetching data function is not working');
      setIsLoading(true);
    }

  };
   
  fetchShopDetails();

   }, []);

   //this is for adding floors to the application 
  const ShopFormPopup = ({ shop, onClose, onSave }) => {
    const [floorID, setFloorID] = useState(shop.floorID || '');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ ...shop, floorID }); // Include floorID in the submission
    };

    //This is for Adding floor compartments
    return (
      <div className="fixed inset-8 rounded-2xl flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-[50vw] p-6 rounded-xl shadow-lg">
          <div className="flex flex-row w-full h-auto justify-between items-center">
            <h3 className="text-2xl font-russoone font-thin mb-4">Add Shop ID</h3>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="floorID"
                className="block text-sm font-medium text-gray-700"
              >
                Floor ID
              </label>
              <input
                id="floorID"
                type="text"
                value={floorID}
                onChange={(e) => setFloorID(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };




  const UpdateShopFormPopup = ({ shop, onClose, onSave }) => {
     
    const [shopName, setShopName] = useState(shop.shopName || '');
    const [shopKeeperName, setShopKeeperName] = useState(shop.shopKeeperName || '');
    const [assignDate, setAssignDate] = useState(shop.assignDate || '');
    const [description, setDescription] = useState(shop.description || '');
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const updatedShop = {
        ...shop,
        shopName,
        shopKeeperName,
        assignDate,
        description,
      };

      onSave(updatedShop);
    };
  
    return (
      <div className="fixed inset-0 bg-secondary bg-opacity-40 flex justify-center items-center z-40">
        <div className="bg-white w-[50vw] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Update Shop Details</h3>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
  
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
                Floor ID : {shop.floorID}
              </label>

            </div>

            <div className="mb-4">
              <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
                Shop Name
              </label>
              <input
                id="shopName"
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="shopKeeperName" className="block text-sm font-medium text-gray-700">
                Shopkeeper Name
              </label>
              <input
                id="shopKeeperName"
                type="text"
                value={shopKeeperName}
                onChange={(e) => setShopKeeperName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="assignDate" className="block text-sm font-medium text-gray-700">
                Assign Date
              </label>
              <input
                id="assignDate"
                type="date"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                rows="4"
              />
            </div>
  
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

  

  return (
    <div className="flex flex-col min-h-screen w-[100vw] bg-primary items-center mt-16">
      <div className="fixed h-[10rem] w-[100vw] bg-primary flex flex-col items-center cursor-default justify-between z-40">

        {/* System Performance Bar */}
        <div className=' h-[6rem] w-[100vw] bg-primary flex items-center justify-center z-40'>
          <div className='flex h-[6rem] w-[20vw] bg-primary items-center justify-center'>
            <h2 className='font-ibmplexsans text-2xl text-secondary font-semibold' style={{ fontWeight: '300' }}>
              System Performance
            </h2>
          </div>
          <div className='flex h-[6rem] w-[80vw] bg-primary items-center justify-center p-5 '>
            <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
              <h2 className='font-ibmplexsans text-sm text-center text-secondary'>
                Total Shop Compo : 
              </h2>
              <div className='flex h-[2rem] w-[6vw] bg-baseextra2 text-primary items-center justify-center p-5 rounded-xl'>
                {shops.length}
              </div>
            </div>
            <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
              <h2 className='font-ibmplexsans text-sm text-center text-secondary'>
                Allocated Shops :
              </h2>
              <div className='flex h-[2rem] w-[6vw] bg-baseextra2 text-primary items-center justify-center p-5 rounded-xl'>
                /40
              </div>
            </div>
            <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
              <h2 className='font-ibmplexsans text-sm text-center text-secondary'>
                Remaining Shops :
              </h2>
              <div className='flex h-[2rem] w-[6vw] bg-baseextra2 items-center justify-center p-5 rounded-xl'>
                {/* Remaining Shops count */}
              </div>
            </div>
            <div className='flex h-auto w-[20vw] bg-primary items-center justify-center p-5 space-x-5'>
              <h2 className='font-ibmplexsans text-sm text-center text-secondary'>
                Active Shops :
              </h2>
              <div className='flex h-[2rem] w-[6vw] bg-baseextra2 items-center justify-center p-5 rounded-xl'>
                {/* Active Shops count */}
              </div>
            </div>
          </div>
        </div>

        {/* Operation Bar */}
        <div className="flex h-[5rem] w-[100vw] bg-primary items-center justify-center drop-shadow-lg">
          <div className="flex h-[5rem] w-[40vw] bg-baseextra2 items-center justify-center drop-shadow-lg"></div>
          <div className="flex h-[5rem] w-[60vw] bg-primary justify-center items-center p-5 drop-shadow-lg space-x-5">
            <button
              onClick={handleShopClick}
              className="h-[3rem] w-[12vw] bg-primary rounded-3xl drop-shadow-lg hover:scale-110 transition-transform duration-200 ease-out"
            >
              <span className="font-ibmplexsans text-md text-blue-700">
                Add
              </span>
            </button>
            <button
              className="h-[3rem] w-[12vw] bg-primary rounded-3xl drop-shadow-lg hover:scale-110 transition-transform duration-200 ease-out"
            >
              <span className="font-ibmplexsans text-md text-blue-700">
                Add a Shop
              </span>
            </button>
            <button className="h-[3rem] w-[12vw] bg-primary rounded-3xl drop-shadow-lg hover:scale-110 transition-transform duration-200 ease-out">
              <span className="font-ibmplexsans text-md text-blue-700">
                Remove
              </span>
            </button>
          </div>
        </div>
      </div>

     <div className='flex h-auto-auto'>

      {isLoading ? (
        <Loading/>
      ) : (

        <div className="grid grid-cols-2 h-auto w-full p-5 pt-44">
        
          {floors.map((floor, index) => {
          return (

            <div key={index} className="relative flex h-auto w-auto p-5">
            <div className="flex flex-col h-auto w-[50vw] justify-start items-start p-5 border-2 border-secondary rounded-2xl">
              <div className="flex w-full h-auto items-start">
                <h2 className="font-russoone text-3xl text-baseextra4 text-start ml-10">
                    Floor: {floor}
                </h2>
              </div>
              <div className ="flex flex-col w-full h-auto items-start justify-start p-5 space-y-5">
                <div className="grid grid-cols-5 gap-2 w-full justify-start items-start">
                  {shops.slice(index * 10, index * 10 + 5).map((shop) => (
                    <div
                      key={shop._id}
                      onClick={()=> handleShopClick(shop._id)}
                      className={`flex flex-col h-28 w-28 p-2 rounded-b-xl cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out ${
                        shop.name ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {shop.floorID || 'Empty'}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-[40vw] h-10 bg-gray-500" />
                <div className="grid grid-cols-5 gap-2 w-full justify-center">
                  {shops.slice(index * 10 + 5, (index + 1) * 10).map((shop)=> (
                    <div
                      key={shop._id}
                      onClick={()=> handleShopClick(shop._id)}
                      className={`flex flex-col h-28 w-28 p-2 rounded-t-xl cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out ${
                        shop.name ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {shop.floorID || 'Empty'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>


          );


          })}


      </div>

      )}



     </div>



      {/* Render the ShopFormPopup conditionally */}
      {selectedShop && (
        <ShopFormPopup
          shop={selectedShop}
          onClose={handleClosePopup}
          onSave={handleSubmit}
        />
      )}

            {/* Render the UpdateShopFormPopup conditionally */}
        {selectedShop && (
        <UpdateShopFormPopup
          shop={selectedShop}
          onClose={handleClosePopup}
          onSave={handleSaveDetails}
        />
      )}
    </div>
  );
};

export default Shoppanel;
