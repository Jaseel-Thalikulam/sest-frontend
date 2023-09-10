export default class PublicMethods {
    constructor() {}
  
    properCase(inputString:string) {
      return inputString.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
      });
  }
  
   formateTimeStamp(timestamp: string|Date) {
    const date = new Date(timestamp);
    const currentDate = new Date();
    
    const isSameDay = date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();
  
    // Format the timestamp based on whether it's the same day or not
    if (isSameDay) {
      // Display time for posts uploaded on the same day
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } else {
      // Display date for posts uploaded on different days
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }
    
  }
  
  
  }
  