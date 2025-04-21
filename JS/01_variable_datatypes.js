
//standard way of conversesion 
let num = "333";
let convertNum = Number(num);

console.log(num);

//shortcuts for the conversion
let num1 = "333";
let convertNum1 = +num1;

console.log(num1);


let num2 
let convertedNum = parseInt(num1);

console.log(convertedNum);

let str = 123;
let convertIntoString = String(str);
console.log(convertIntoString);

//operations 

//do not write like 3+4-34/4 always write in parenthesis and it should be readable

let a = 10;
let b = 2;
let sum  = a+b;
let procduct = a*b;
let quotient  = a/b;
let remainder = a % b;
let power  = a**b;

console.log(sum);
console.log(procduct);
console.log(quotient);
console.log(remainder);
console.log(power);

//camparison

let x = 9;
let y = 8;

console.log(x == y);
console.log(!x === y);
console.log(x>y);
console.log(x<y);

//Genrate random number betwen 1 to 6 
console.log(Math.ceil(Math.random()*6));

//genrate number between 0 to 6;
console.log(Math.floor(Math.random())*7);

let nilesh  ="nilesh";

console.log(nilesh.toUpperCase());
console.log(nilesh.indexOf('s'));
console.log(nilesh.slice(4,6));

let myName = "nilesh";

let greeting = `Hello,${myName} from chaicode`;
console.log(greeting);


let arr = [10,20,30,40];

arr.splice(1,4,4,4,44,4,4,4,4,15,17) 

console.log(arr);