// 3. Write a function named findMax that takes an array of numbers and returns the largest number from the array.

function findMax(numbers) {
    return Math.max(...numbers);
}

// Example
console.log(findMax([3, 7, 2, 9, 5]));
console.log(findMax([30, -7, -2, -100, 25]));
