export const handleChatInput = (message, setChatMessages, handleSearch, filteredShops, setMessage, shops) => {
  const lowerCaseMessage = message.trim().toLowerCase();

  // Check for multiple phrases to show all shops
  if (
    lowerCaseMessage === 'show me all the shops' ||
    lowerCaseMessage === 'display me all the shops' ||
    lowerCaseMessage === 'show all the shops' ||
    lowerCaseMessage === 'show all shops'
  ) {
    setChatMessages((prev) => [...prev, { sender: 'user', text: message }]);
    
    const botResponse = shops.length
      ? `Here are all the shops, You can view them on the map.`
      : "Sorry, there are no shops available.";
    
    handleSearch(''); // Reset filters
    setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    setMessage(''); // Clear the input field
    return; 
  }

  // Regex to match "show me" or "display me" followed by the shop name
  const regex = /^(show me|display me)\s+(.+)/i;
  const match = message.match(regex);

  if (match && match[2]) {
    const shopName = match[2].trim();
    handleSearch(shopName); // Call your search function

    // Check the filtered shops after a slight delay
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'user', text: message }]);

      const botResponse = filteredShops.length
        ? `Here is the ${shopName} shop on the map: ${filteredShops.map(shop => shop.shopName).join(', ')}.`
        : "Sorry, I couldn't find any shops matching your query.";
      
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setMessage(''); // Clear the input field
    }, 100); // Delay to ensure filteredShops updates
  } else {
    setChatMessages((prev) => [...prev, { sender: 'bot', text: "Please use the format: 'show me (Shop Name)' or 'display me (Shop Name)'." }]);
  }
};
