// 4. Write a function named filterOddNumbers that takes an array of numbers and returns a new array containing only the odd numbers.

function filterOddNumbers(numbers) {
    return numbers.filter((num) => num % 2 !== 0);
}

// Example
console.log(filterOddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(filterOddNumbers([-1, -2, 0, 1, 2]));
