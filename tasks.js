// EDCONNECT CHALLANGES

// * 1 ##########################################################
/* 
1. Write a javascript program that prints the grades of number from 0 - 100  in descending order using the below grade scale :

0 - 35 - F
36 - 40 - E
41 - 49 - D
50 - 70 - C
71 - 85 - B
86 - 100 - A

Use console.log to log your output to the console.
Your output should look like the below:
100 - A
99 - A
98 - A
97 - A
96 - A
.....
2 - F
1 - F
0 - F


0 - 35 - F
36 - 40 - E
41 - 49 - D
50 - 70 - C
71 - 85 - B
86 - 100 - A

let grade;

let i = 100;
while (i >= 0) {
  if (i >= 86) {
    grade = "A";
    console.log(`${i} - ${grade}`);
  } else if (i >= 71) {
    grade = "B";
    console.log(`${i} - ${grade}`);
  } else if (i >= 50) {
    grade = "C";
    console.log(`${i} - ${grade}`);
  } else if (i >= 41) {
    grade = "D";
    console.log(`${i} - ${grade}`);
  } else if (i >= 36) {
    grade = "E";
    console.log(`${i} - ${grade}`);
  } else {
    grade = "F";
    console.log(`${i} - ${grade}`);
  }
  i--;
}
*/
//* 2 ##########################################################
/*
2. In this challenge, you will test your knowledge of functions.

THE PROBLEM:
One of the ways that governments around the world generate revenue is through taxes. One of such taxes is the income tax which is generally computed as the product of the tax rate times the taxable income.

The tax rate is often a function of the income or in other words individuals at different income levels will pay different taxes.

Also, in some countries like the UK, individuals get to keep a certain amount of their income
that's not taxed while the remainder is taxed at the applicable rate. So for example, let's say a person makes 100K and their tax rate is 10% or 0.1 but they are allowed to keep 30K. They will end up paying 7000 or 7K in taxes because:
100K - 30K = 70K. // they keep 30K and have 70K left.
10% of 70K = 7K. // they will pay 10% tax on what's left.

Your challenge is to complete the code below to return the function that will correctly calculate taxes for a person based on the rules below.

Amount                            Tax Rate
--------------------------------------------
<= 100,000                        10% or 0.1
> 100,000 to 500,000 (inclusive)  20% or 0.2
> 500,000                         35% or 0.3


Should return a function that accepts a number; that's the amount to be taxed
and returns the tax amount after factoring in the income not taxed and the
applicable tax rate.

SOLUTION

function getTaxCalculator(incomeNotTaxed) {
  let tax;
  function calculateTax(income) {
    tax = income - incomeNotTaxed;
    if (income <= 100000) {
      return tax * 0.1;
    }
    if (income > 100000 && income <= 500000) {
      return tax * 0.2;
    }
    if (income > 500000) {
      return tax * 0.3;
    }
  }
  return calculateTax;
}

// THIS IS FOR YOUR TESTING ONLY.
const calculateTax = getTaxCalculator(30000);
console.log(calculateTax(100000)); // should print 7000
console.log(calculateTax(350000)); // should print 64000
console.log(calculateTax(600000)); // should print 171000
*/
//* 3 ##########################################################
/*

3. In this challenge you will test your knowledge of asynchronous functions.

THE PROBLEM:
ATMs are very useful machines that give people access to their money when they
need them without having to go inside a bank. Bank customers want a fast and
reliable ATM experience.

Let's consider at a high-level the operations that an ATM machine might perform
for a simple cash withdrawal transaction.

1. Validate the customer's PIN
2. Validate that the customer has sufficient balance, if the pin is valid.
3. Update the customer's balance, if they have enough money to withdraw
4. Send notification e.g SMS to the user
5. Dispense the cash

For most customers step 5 is probably what they care most about, so it will make
sense to not to block on the notification operation which might take some time
and instead dispense the money before the notification is sent.

Asynchronous code can be very tricky to write and to understand. Synchronous code
is straightforward to follow and understand because the operations are performed
one after the other i.e sequentially.


YOUR CHALLENGE:
The withdraw function below depends on several asynchronous functions that are
already provided for you. Your task is to update the withdraw function to ensure
that the withdrawal logic executes correctly.
Since all the functions are asynchronous, very bad things can happen if the order
of execution is done correctly, e.g a person might be able to withdraw money even
if their pin is wrong, or when the don't have enough balance.

The bank is counting on your expertise to ensure that this doesn't happen!!!

Good luck!

let cashInMachine = 1000000; // Don't update this line

async function withdraw(acctNum, amount, pin) {
  try {
    // Your task is to update the function calls below so that
    // they execute in the right order.

    // HINT: These functions are all asynchronous so by default don't wont block.
    // To wait for a function to be done, add await in front of it.

    await validatePin(acctNum, pin);

    await validateBalance(acctNum, amount);

    await updateBalance(acctNum, amount);

     notify(acctNum, amount);

    await dispenseCash(amount);

    return `Dispensed ${amount}. Machine balance: ${cashInMachine}`; // Don't update this line.
  } catch (er) {
    return er;
  }
}

// STUDY THE CODE BELOW, BUT DON'T MODIFY THEM.

const fakeDB = {
  12345: {
    pin: 1111,
    balance: 2000,
  },
  45678: {
    pin: 2222,
    balance: 5000,
  },
  678910: {
    pin: 3333,
    balance: 5000,
  },
};
// returns an acccount object if present in DB, otherwise throws an error
async function getAccount(acctNum) {
  if (acctNum in fakeDB) {
    return fakeDB[acctNum];
  } else {
    throw "account not found";
  }
}
// update account balance
async function updateBalance(acctNum, amount) {
  return new Promise((resolve) => {
    setTimeout(async function () {
      const account = await getAccount(acctNum);
      account.balance -= amount;
      resolve("done");
    }, 150);
  });
}

// throw an error if pin is incorrect
async function validatePin(acctNum, pin) {
  if ((await getAccount(acctNum)).pin !== pin) {
    throw "invalid pin";
  }
}
// throw an error if account balance is insufficient
async function validateBalance(acctNum, amount) {
  if ((await getAccount(acctNum)).balance < amount) {
    throw "insufficient balance";
  }
}
// notify user of withdrawal and their current account balance
async function notify(acctNum, amount) {
  return new Promise((resolve) => {
    setTimeout(async function () {
      const acct = await getAccount(acctNum);
      console.log(
        `You withdrew ${amount}. Your current balance is ${acct.balance}`
      );
      resolve("notified");
    }, 100);
  });
}
// disburse cash from machine
async function dispenseCash(amount) {
  return new Promise((resolve) => {
    setTimeout(async function () {
      cashInMachine -= amount;
      resolve("dispensed");
    }, 50);
  });
}

// THIS IS HERE FOR YOUR TESTING ONLY
// *** PLEASE COMMENT OUT THE LINES BELOW BEFORE YOU SUBMIT ***

async function main() {
  // console.log(await withdraw(12345, 500, 1111)); // comment out before submission
  // Should  only print:
  // "invalid pin"
  // console.log(await withdraw(45678, 1000, 2221)) // comment out before submission
}
main();
*/
//* 4 ##########################################################
/*
*4. In this challenge you will test your knowledge of arrays and array methods.

THE PROBLEM:
SPAM is major problem on the internet. Email applications like gMail do a lot of
work to identify spam and remove them from user's inbox.

YOUR CHALLENGE:
Complete the code below to correctly process a set of messages. The ones identified
as spam should be placed in a spam folder, otherwise they should be placed in the
inbox folder. You are provided with a spam detector function "isSpam" that will
return true if a message is spammy, and false otherwise.

Good luck!


// This is your spam detection function.
// It will return true is a message is spam, and false otherwise
// DON'T UPDATE THE NEXT LINE
const isSpam = message => /money/.test(message.content)

//  Accepts an array of messages and returns an object with two properties
//  spam, and inbox.
//  spam and inbox are array of spam and not spam messages respectively and are
//  sorted
function processMessages(messages) {
  // Hint: to sort the messages by time, you will use the sortFn below as your
  // compare fuunction.
  // the function accepts two message arguments (a and b) to be compared,
  // and you will be comparing the time property i.e a.time and b.time

  const sortFn = (a, b) => {
    return messages.sort((a, b) => a.time - b.time)
  }
  // use the isSpam function provided above to determine if a message is a spam
  const inbox = [] // code your here.
  const spam = [] // code your here.

  messages
    // .sort((a, b) => a.time - b.time)
    .sort(sortFn(a, b))
    .filter(message => {
      if (!isSpam(message)) {
        inbox.push(message)
      }
      if (isSpam(message)) {
        spam.push(message)
      }
    })

  // DON'T UPDATE THE LINE BELOW.
  return {
    inbox,
    spam,
  }
}
// THIS IS HERE FOR YOUR TEST ONLY
const messages = [
  { content: 'click here to make a lot of money', time: 10 },
  { content: 'hello are are you', time: 4 },
  { content: 'I just won some money, send your account number', time: 2 },
  { content: 'do you want to have launch', time: 11 },
  { content: 'we received your application', time: 3 },
]
const { spam, inbox } = processMessages(messages)
// should print
// [ "I just won some money, send your account number",
//   "click here to make a lot of money"]
console.log(spam.map(s => s.content))

// should print
// ["we received your application",
//"hello are are you",
//  "do you want to have launch"]
console.log(inbox.map(s => s.content))
 */
//* 5 ##########################################################
/*
* 5. You are developing an ecommerce application which allows users to add items to a virtual shopping cart. Once the user is done shopping, we will need to know the total amount of money to charge the user based on what was purchased.


// The cart array stores all of the items selected in the shopping cart

let cart = []

// The quantity array stores the quantity of the items in the cart.
// The cart and quantity arrays are connected based on the index i.e
// given cart = ["bread", "apple"] and quantity = [2, 1]
// we can tell that we have two pieces of bread and 1 apple.
// The item at index 0 in cart i.e cart[0] is "bread", so we get the quantity
// at the same index in the quantity array i.e quantity[0]

let quantity = []

// The prices multidimensional array stores the prices of the items in the
// store. There are 6 items that can be purchased from the store:
// "bread", "apple", "noodles", "beef", "milk" and "coke".
// The price for "bread" is 20, the price for "apple" is 50 and so on.

const prices = [
  ['bread', 20],
  ['apple', 50],
  ['noodles', 100],
  ['beef', 40],
  ['milk', 32],
  ['coke', 25],
]

// Given an item, Complete the code to add the item to the cart and quantity
// arrays.
// Don't touch this section, we will cover functions later.
function addItemToCart(item) {
  // item is a variable that represents the item that is being added to the
  // cart. Valid items are items present in the prices array i.e "bread",
  // "apple", "noodles", "beef", "milk" and "coke".
  // An invalid item e.g "rice"  should throw an error ‘item not recognized’

  let isValidItem = false
  // TODO(1): Write code to set isValidItem to true if item is present in the prices array

  // TODO(2): Throw error "item not recognized" if isValidItem !== true i.e false

  let foundItem = false
  // TODO(3): Write code to check if item is in the cart array, and if so set
  // foundItem = true, and increase the quantity of the item by 1
  // Hint: Use the index where the item was found in the cart to increase the
  // quanity in the quantity array

  // TODO(4): Write code to add item to cart and set quantity to 1, if item is
  // was not found in the cart i.e foundItem is not true.
  // Hint: To set the quantity for the recently added item to 1,
  // do quantity.push(1)
  const validItem = []
  for (let price of prices) {
    validItem.push(price[0])
  }
  const itemIsPresent = validItem.includes(item)
  if (!itemIsPresent) {
    throw 'Item not recognized'
  } else {
    isValidItem = true
  }
  let itemQty = 1
  if (isValidItem !== true) {
    throw 'Item not recognized'
  } else {
    let itemAlreadyInCart = cart.includes(item)
    if (itemAlreadyInCart) {
      foundItem = true
      quantity[cart.indexOf(item)] += itemQty
    }
    if (foundItem !== true) {
      cart.push(item)
      quantity.push(itemQty)
    }
  }
}

// Write the code to calculate the total cost of all items in the cart based on
// the items in the cart and the quantity of the items purchased. The total
// cost should be stored in the total variable
// Don't touch the next line, we will cover functions later.
function getTotal() {
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i]
    let qty = quantity[i]
    let subtotal = 0
    // TODO(7) : Loop through the prices array to get the price of item, then
    // compute and set subtotal by multiplying the price and qty.
    // Hint: Each array in prices has the item at index 0, and the price at
    // index 1
    for (let i = 0; i < prices.length; i++) {
      for (let j = 0; j < cart.length; j++) {
        // console.log(prices[i][0], cart[j])
        if (prices[i][0] == cart[j]) {
          let price = prices[i][1]
          subtotal += quantity[j] * price
        }
      }
      total = subtotal
    }
    // TODO(8): Add subtotal to total (this should after the loop above)
  }
  return total // Do not edit or remove this line.
}

// THIS IS FOR YOUR TESTING ONLY.
try {
  addItemToCart('apple')
  addItemToCart('apple')
  addItemToCart('beef')
  addItemToCart('milk')
  console.log(addItemToCart('rice')) // This should print 'item not recognized'
} catch (e) {
  console.log(e)
}
console.log(cart.length) // This should print 3
console.log(quantity[0]) // This should print 2
console.log(getTotal()) // This should print 172

*/
// * 6 ##########################################################
/* 
*6. Write a JavaScript program to recursively calculate the factorial of a number.

// Note: In mathematics, the factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 x 4 x 3 x 2 x 1 = 120

// ENSURE YOU ACTUALLY WRITE A RECURSIVE FUNCTION. OTHERWISE YOUR TEST WILL FAIL EVEN WHEN THE ANSWER IS CORRECT.
// YOUR FUNCTION INVOCATION COUNT IS TRACKED TO MAKE SURE OF THIS!

function factorial(n) {
  if (n === 0 || n === 1) return n;
  return n * factorial(n - 1);
}

console.log(factorial(12)); // 479001600
console.log(factorial(8)); // 40320

// ##########################################################

// Write a JavaScript program to get the first n Fibonacci numbers (you should return a number array).

// Note: The Fibonacci Sequence is the series of numbers starting from 0 and 1
// such that each subsequent number is the sum of the previous two e.g
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34,...

// So, The first 6 Fibonnaci numbers F_n are
// F_0, F_1, F_2, F_3, F_4, F_5, F_6
//  0,   1,   1,   2,   3,  5,   6

// ENSURE YOU ACTUALLY WRITE A RECURSIVE FUNCTION. OTHERWISE YOUR TEST WILL FAIL EVEN WHEN THE ANSWER IS CORRECT.
// YOUR FUNCTION INVOCATION COUNT IS TRACKED TO MAKE SURE OF THIS!

function fibonacci(n) {
  if (n <= 1) return [0, 1];
  else {
    fibArray = fibonacci(n - 1);
    fibArray.push(
      fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2]
    );
    return fibArray;
  }
}

console.log(fibonacci(0)); // [0]
console.log(fibonacci(1)); // [0, 1]
console.log(fibonacci(4)); // [0, 1, 1, 2, 3]
console.log(fibonacci(6)); // [0, 1, 1, 2, 3, 5, 8]
*/
//* 7 ##########################################################
/* 
*7.  Write a function that returns an array containing the names of the remaining tasks a student has to complete before moving on to the next module.

The function signature has been provided for you. Your function will receive two parameters: totalTasks and completedTasks. The return value from the remainingTasks function should be an array containing the items in the totalTasks array, that is not in the completedTasks array.

const totalTasks = [
  'Array',
  'String',
  'Functions',
  'Loop',
  'Hoisting',
  'Recursion',
]
const completedTasks = ['Array', 'String', 'Recursion']
function remainingTasks(totalTasks, completedTasks) {
  const remainingTask = []
  //Check for the difference btw the two arrays
  const difference = totalTasks.filter(task => !completedTasks.includes(task))
  remainingTask.push(difference)
  return remainingTask.flat()
}
const task = remainingTasks(totalTasks, completedTasks)
console.log(task)
  */
