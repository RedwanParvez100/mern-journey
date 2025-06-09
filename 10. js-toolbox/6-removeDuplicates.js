// 6. Write a function named removeDuplicates that takes an array and returns a new array with duplicate elements removed.

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Example
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 10, 5, 10]));
console.log(removeDuplicates([true, false, true, true]));
console.log(removeDuplicates(["apple", "banana", "apple", "orange"]));
