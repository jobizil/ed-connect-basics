/*
You are developing an ecommerce application which allows users to add items to a virtual shopping cart. Once the user is done shopping, we will need to know the total amount of money to charge to the users based on what was purchased.
*/

// The cart array stores all of the items selected in the shopping cart
let cart = []

// The quantity array stores the quantity of the items in the cart.
// quantity of cart[0] = quantity[0]
// quantity of cart[1] = quantity[1], and so on
let quantity = []

// The prices multidimensional array stores the prices of the items in the store. There are 6 items that can be purchased from the store with codes 2, 7, 12, 17, 22 and 27. The price for item code 2 is 20, the price for item code 7 is 50 and so on.
const prices = [
  [2, 20],
  [7, 50],
  [12, 100],
  [17, 40],
  [22, 32],
  [27, 25],
]

// Given an itemCode, Write the code to add items to the cart and quantity arrays
// Don't touch this section, we will cover functions later.
function addItemToCart(itemCode) {
  //itemCode is a variable that represents the item that is being added to the cart. Valid item codes are 2, 7, 12, 17, 22 and 27. An invalid code should throw an error ‘item code not recognized’
  let validItemCode = []
  let itemQty = 1

  for (let i = 0; i < prices.length; i++) {
    const arr = prices[i][0]
    validItemCode.push(arr)
  }

  const isItemCode = validItemCode.includes(itemCode)

  if (!isItemCode) {
    throw 'item code not recognized'
  } else {
    const existingItem = cart.includes(itemCode)

    if (existingItem) {
      const cartIndex = cart.indexOf(itemCode)
      quantity[cartIndex] += itemQty
    } else {
      cart.push(itemCode)
      quantity.push(itemQty)
    }
  }
}

// Write the code to calculate the total cost of all items in the cart based on the items in the cart and the quantity of the items purchased. The total cost should be stored in the cost variable
// Don't touch the next line, we will cover functions later.
function getTotal() {
  let cost = 0
  for (let i = 0; i < prices.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if (prices[i][0] == cart[j]) {
        cost += quantity[j] * prices[i][1]
      }
    }
  }

  return cost // Do not edit or remove this line.
}

// THIS IS FOR YOUR TESTING ONLY.
try {
  addItemToCart(7)
  addItemToCart(7)
  addItemToCart(17)
  addItemToCart(22)
  console.log(addItemToCart(172)) // This should print 'item code not recognized'
} catch (e) {
  console.log(e)
}

console.log(cart.length) // This should print 3
console.log(quantity[0]) // This should print 2
console.log(getTotal()) // This should print 172
