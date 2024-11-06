/**
 * Check if an input is a string and not an empty string
 * @param {any} input 
 * @returns {boolean} -returs true if input is string and also not an empty one
 */
const isValidString = input => typeof input === 'string' && input.trim() !== ''



/**
 * Counts the number of words in a sentence or string
 * @param {string} str - The sentence
 * @returns {number} - The number of words that forms the sentence passed
 */
const wordCount = str => {
    if (isValidString(str)) {
        return str.trim().split(/\s/g).length
    }
    else {
        return 'Invalid input'
    }
}



/**
 * Checks if a number is palindrome or not
 * @param {string} str - The string we want to check if it's palindrom or not
 * @returns {boolean} - Returns true if string is palindrome else false
 */
const isPalindrome = str => {
    if (isValidString(str)) {
        return str.toLowerCase() === str.split('').reverse().join('').toLowerCase()
    } else {
        return 'Invalid input'
    }
}



/**
 * Reverses a string
 * @param {string} str - string that we want to reverse
 * @returns {string} - Reverse of the input
 */
const reverse = str => {
    if (isValidString(str)){
        return str.split('').reverse().join('')
    } else{
        return 'Invalid input'
    }

}



/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string that it first charcter needs to be capitalized
 * @returns {string} - First letter of input string capitalized
 */
const capitalize = str => {
    if (isValidString(str)){
        return str[0].toUpperCase() + str.substring(1)
    } else {
        return 'Invalid input'
    }
}


// console.log(capitalize('true'))
// console.log(reverse('Henry'))
// console.log(isPalindrome('rotator'))
// console.log(wordCount('Henry'))


const compose = (...allFunctions) => initialValue => allFunctions.reduceRight(
    (resultAcc, currentFunction) => currentFunction(resultAcc), initialValue
)

const reverseAndCapitalize = compose(capitalize,reverse)

console.log(reverseAndCapitalize('rotator is a boy'))

module.exports = { isValidString, wordCount, isPalindrome, reverse, capitalize };
