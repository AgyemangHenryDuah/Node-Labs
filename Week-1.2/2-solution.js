/**
 * Checks if the input is a valid array of numbers
 * @param {array} arr - The array to check
 * @returns {boolean} - Returns true if the input is an array of numbers, false otherwise
 */
const isValidArray = arr => Array.isArray(arr) && arr.length > 0 && arr.every(num => typeof num === 'number');



/**
 * Calculates the average of all the elements in an array of numbers
 * @param {array} arr - The array containing the number
 * @returns {number} - The average of all the numbers in the array
 */
const average = arr => {

    let result = 0;
    if (isValidArray(arr)){
        for (let i = arr.length - 1; i >= 0; i--) {
            result += arr[i]
        }

        return result / arr.length;
    } else{
        return 'Invalid input'
    
    }

}


/**
 * Sums all the elements in an array containing numbers
 * @param {array} arr - The array containing numbers 
 * @returns {number} - The sum of all the elements in the input
 */
const sum = arr => {
    if (isValidArray(arr)){
        let result = 0;
    for (let i = arr.length-1; i >= 0; i--){
        result += arr[i]
    }
    return result;
    } else {
        return 'Invalid array input'
    }
}



/**
 * Filters an array with only even 
 * @param {array} arr - The array that needs to be filtered
 * @returns {array} - The filtered array with only even numbers
 */
const filterEven = arr => {
    if (isValidArray(arr)){
        let result = [];
    for (let i = 0; i <= arr.length-1; i++){
        if ((arr[i]% 2) === 0){
            result.push(arr[i])
        }
    }
    return result;
    } else {
        return 'Invalid input'
    }
}



/**
 * Doubles each element in an array
 * @param {array} arr - The array we want to double its elements
 * @returns {array}- The final array with double elements
 */
const double = arr => {
    if (isValidArray(arr)){
        for (let i = arr.length-1; i >= 0; i--){
            arr.push(arr[i])
        }
        return arr.sort((a,b) => a-b);
    } else {
        return 'Invalid input'
    }
}



const compose = (...allfunctions) => arr => allfunctions.reduceRight(
    (valueAcc, currentFunction) => currentFunction(valueAcc), arr
)


const doubleFetchEvenSum = compose(sum,filterEven,double)

console.log(doubleFetchEvenSum([1,2,3,4,5,6,7,8,9,10]))
module.exports = { isValidArray, average, sum, filterEven, double };
