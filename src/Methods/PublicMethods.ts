export default class PublicMethods {
    constructor() {}
  
    properCase(inputString:string) {
      return inputString.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
      });
    }
  }
  