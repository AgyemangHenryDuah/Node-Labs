//needed modules
const fs = require('fs')
const path = require("path")

//data file paths resolution
const groceryFilePath = path.resolve(__dirname,'grocery_list.json')
const priceFilePath = path.resolve(__dirname,'priceList.json')

let priceData //to read price file
let itemData // to read items file
let prices //to hold parsed json data
let items // to hold parsed items
let totalCost = 0 // to accumulate costs from different items
let output = ['Grocery List:','--------------------------------'] // Holds output strings format



try {
    priceData = fs.readFileSync(priceFilePath, 'utf-8')
    itemData = fs.readFileSync(groceryFilePath, 'utf-8')
    prices = JSON.parse(priceData)
    const itemsData = JSON.parse(itemData)
    items = itemsData.items

} catch (error) {
    console.log(`Couldn't read or parse data file/s`,error.name)
}



const getCost = (item, price) =>{

    if (!price){
        console.log(`Price for ${item.name} not found`)
    }

    return item.quantity * price
}




items.forEach( item =>{
    
    // if (!price){
    //     console.log(`${item.name} does not have a price`)
    //     return
    // }
    // const quantity = item.quantity
    // const cost = item.quantity * price
    const cost = getCost(item, prices[item.name])
    totalCost += cost

    output.push(`${item.name} - ${item.quantity} ${item.unit} - ${cost}`)
}
)


//Last two lines of the output
output.push('--------------------------------');
output.push(`Total: $${totalCost.toFixed(2)}`);


//Writing to result as the output file
try {
    fs.writeFileSync('./shopping_receipt.txt', output.join('\n'))
} catch (error) {
    console.log(`Couldn't wirte to the file`, error.name)
}
