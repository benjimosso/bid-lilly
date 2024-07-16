function convertToSubcurrency(amount: number, factor = 100) {
    console.log("subcurrency function: ", Math.round(amount * factor));
    return Math.round(amount * factor);
  }
  
  export default convertToSubcurrency;