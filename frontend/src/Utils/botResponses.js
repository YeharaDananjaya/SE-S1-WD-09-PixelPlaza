// botResponses.js

export const getBotResponse = (input) => {
    const floorRegex = /^show me floor(\d+)$/i; // Regex to match "show me floorX"
  
    const match = input.match(floorRegex);
    if (match) {
      const floorNumber = match[1]; // Extract the floor number
      return `Here is Floor${floorNumber}`;
    }
    return 'I am not sure how to respond to that.';
  };
  