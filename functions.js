/* 
*
*       CLOSURE FUNCTION
 *
 
 */
// is a function can contain another function. The innner or nested function
// is private to it's outer or container function.
// nested functions form what's called a Closure. A closure can use the argument
// and variables of the outer function, but the outer function cannot use the
// argument and variables of the inner function
// closures are a powerful but tricky concept so it's okay if it takes a while
// to understand.
function paint(color) {
  let mix = 'white'

  function brush(style) {
    // the variables (color and mix) in the outer function (paint) are accessible
    // to the inner function (brush).
    // but the variables (style and paintText) in the inner function (brush)
    // are not accessible to the outer function (paint)
    const paintText = `Painting ${color} and ${mix} in ${style} style`
    return paintText
  }
  return brush
}

const paintBrush = paint('blue') // returns a function that accepts a paint style
const result = paintBrush('thick') // call the function returned by the paint
// print the result returned by paintBrush
console.log(result) // prints "Painting blue and white in thick style"

// another way to call paint
// we know paint('red') returns a function, so we can invoke or call it directly.
console.log(paint('red')('stroke')) // "Painting red and white in stroke style"

/*
 *   Recursive function
 *
 */

// a function can also call itself, such a function is called a recursive function
// recursion is powerful and tricky programming concept that often take beginners
// a while to master. We will devote a lesson to it later.

// this function prints even numbers up to the num parameter.
const evenTo = function (num) {
  if (num == 2) {
    console.log(2)
  } else {
    evenTo(num - 2) // here we're calling the evenTo function inside evenTo
    console.log(num)
  }
}
// evenTo(8) // prints 2 4 6 8

/*
 *     Self-invoking function
 *
 */
// it's possible to define a function and immediately invoke it
let total = (function (a, b) {
  return a + b
})(10, 20)
console.log(total) // prints 30

// this might look confusing but if you break it down, you will see what's going on
// the code above is identical to this
let sum = function (a, b) {
  return a + b
}
let newTotal = sum(20, 20)
console.log(newTotal) // prints 40
