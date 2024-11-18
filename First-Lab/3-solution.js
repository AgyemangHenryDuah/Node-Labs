/**
 * Filteres an array of objects based on their ages greater than or equal to a certain age
 * @param {object} people - The object
 * @param {object} minAge - The minimum age
 * @returns {array} - The filtered array 
 */
const filterByAge = (people,minAge) => {
    if(isNaN(people.age)) return "not a number"
    if (Array.isArray(people) && typeof minAge === 'number'){
        let result = people.filter((person) => {
            return person.age >= minAge
        })
    
        return result
    } else {
        return 'Invalid input'
    }
    
}

console.log(filterByAge([{firstname: 'Henry', lastName: 'Agyemang', age: '16'}], 10))



/**
 * Finds of an object is an adult or not
 * @param {object} person - The object with age
 * @returns {boolean} - True when an object is an adult otherwise false
 */
const isAdult = person => {
    if (typeof person === 'object' && person.hasOwnProperty('age')){
        return person.age >= 18
    } else {
        return 'Invalid input'
    }
}



/**
 * Find the first and last name of an object
 * @param {object} person - The onject we want to find its first and last numes
 * @returns {string} - The first name and last name of the object
 */
const fullName = person => {

    if (typeof person === 'object' && person.firstName && person.lastName){
        return `${person.firstName} ${person.lastName}`
    } else {
        return 'Invalid input'
    }
}


module.exports = { filterByAge, isAdult, fullName }