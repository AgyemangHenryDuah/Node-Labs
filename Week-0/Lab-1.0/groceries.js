//Importing neccesary modules
const fs = require('fs')
const path = require("path")


//getting path to data files
const groceryFilePath = path.resolve(__dirname,'grocery_list.json')
const priceFilePath = path.resolve(__dirname,'priceList.json')


let totalCost = 0 // to accumulate costs from different items
let output = ['Grocery List:','--------------------------------'] // Holds output strings format


/**
 * 
 * @param {strin} filepath - path to the data file that has the data we want to read
 * @returns {Array} - read data
 */
const readFile = filepath =>{
    try {
        return fs.readFileSync(filepath, 'utf-8')
    } catch (error) {
        console.log(`Couldn't read the ${filepath} file`)
        return null;
    }
}


/**
 * 
 * @param {object} data - Data to be converted to JSON object
 * @returns {object} - JSON version of the parsed data
 */
const parseData = data =>{
    try {
        return JSON.parse(data)
    } catch (error) {
        console.log("Coulsn't parse JSON data", error)
        return null;
    }
}


/**
 * 
 * @param {string} item - Item we want to get it's total cost
 * @param {number} price - Price of th item
 * @returns {number} - product of quantity of the item and it's price
 */
const getCost = (item, price) =>{
    if (!price){
        console.log(`Price for ${item.name} not found`)
    }
    return item.quantity * price
}


/**
 * 
 * @param {string} fileName 
 * @param {Array} data 
 * @returns - void
 */
const generateReceipt = (fileName,data) => {
    try {
        fs.writeFileSync(`./${fileName}`, data);
        console.log(`Data successfully written to ${fileName}`);
    } catch (error) {
        console.error(`Couldn't write to the file ${fileName}`, error);
    }
}


//Reading raw data 
const priceData = readFile(priceFilePath)
const itemData = readFile(groceryFilePath)


//Parsing read data to JSON objects to work with
const prices = parseData(priceData)
const items = parseData(itemData).items





//Iterating through all items in the grocery list to get cost, and add it's cost to the grand total
items.forEach( item =>{
    const cost = getCost(item, prices[item.name])
    totalCost += cost
    output.push(`${item.name} - ${item.quantity} ${item.unit} - ${cost}`)
}
)


//Pushing last two lines of the output format to the output strings collector
output.push('--------------------------------');
output.push(`Total: $${totalCost.toFixed(2)}`);


//Writing the output string collector elements to the receipt
generateReceipt('shopping_receipt.txt',output.join('\n'))
