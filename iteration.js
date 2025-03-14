// Example 1: Using a for loop to iterate over an array
const array = [1, 2, 3, 4, 5];
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

// Example 2: Using a for...of loop to iterate over an array
for (const element of array) {
    console.log(element);
}

// Example 3: Using a for...in loop to iterate over an object's properties
const object = { a: 1, b: 2, c: 3 };
for (const key in object) {
    if (object.hasOwnProperty(key)) {
        console.log(`${key}: ${object[key]}`);
    }
}

// Example 4: Using the forEach method to iterate over an array
array.forEach((element) => {
    console.log(element);
});

// Example 5: Using the map method to iterate over an array and create a new array
const newArray = array.map((element) => element * 2);
console.log(newArray);

// Example 6: Using the filter method to iterate over an array and create a new array with elements that pass a test
const filteredArray = array.filter((element) => element > 2);
console.log(filteredArray);

// Example 7: Using the reduce method to iterate over an array and reduce it to a single value
const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);

// Example 8: Using a while loop to iterate until a condition is met
let i = 0;
while (i < array.length) {
    console.log(array[i]);
    i++;
}

// Example 9: Using a do...while loop to iterate until a condition is met
i = 0;
do {
    console.log(array[i]);
    i++;
} while (i < array.length);