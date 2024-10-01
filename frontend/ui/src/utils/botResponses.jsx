// botResponses.js

// exports function
export const getBotResponse = (input) => {
    // Convert input to lowercase for case-insensitive matching
    const lowerInput = input.toLowerCase();
  
    // Regex to match "floorX" where X is a number
    const floorMatch = lowerInput.match(/floor(\d+)/);
  
    // Check if the input contains either 'show' or 'display' and a floor number
    if ((lowerInput.includes('show') || lowerInput.includes('display')) && floorMatch) {
      const floorNumber = floorMatch[1]; // Extract the floor number
      return `Here is floor${floorNumber}`;
    }
  
    // If no match is found, return default response
    return 'I am not sure how to respond to that.';
  };
  