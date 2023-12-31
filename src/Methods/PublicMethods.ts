export default class PublicMethods {

  
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
  formatRupees(amount:number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2, // You can adjust this to control decimal places
    }).format(amount);
  }
  
  
  truncateText = (text: string, maxCharacters: number) => {
  if (text.length <= maxCharacters) {
    return text;
  }
  return text.slice(0, maxCharacters) + " ...";
};

  

  generateRandomString(length:number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

  getCurrentUserData() {
return localStorage.getItem('persist:user')

  }
  
  
  }
  