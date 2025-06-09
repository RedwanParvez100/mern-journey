// 5. Write a function named countWords that takes a string and returns the number of words in the string.

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

// Example
console.log(countWords("Hello world!"));
console.log(countWords("This is a Module Ten Assignment"));
console.log(countWords(" All good Dude? "));
