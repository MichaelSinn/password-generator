/*
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page

Application user experience is intuitive and easy to navigate.
Application user interface style is clean and polished.
Application resembles the mock-up functionality provided in the Challenge instructions.
*/

// Assignment Code
const upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerPool = "abcdefghijklmnopqrstuvwxyz";
const numPool = "1234567890";
const symbPool = "~!@#$%^&*?/.";

let generateBtn = document.querySelector("#generate");


let generatePassword = function (len, pool, upper, lower, num, symb){
  let password = "ERROR";

  while (true && len >= 4){
    password = "";

    let containsNum = false;
    let containsUpper = false;
    let containsLower = false;
    let containsSymb = false;

    for (let i = 0; i < len; i++){
      let currentPool = pool[Math.floor(Math.random()*pool.length)]; // Select a random pool from the list of pools

      if (currentPool === upperPool){
        containsUpper = true;
      }else if (currentPool === lowerPool){
        containsLower = true;
      }else if (currentPool === numPool){
        containsNum = true;
      }else if (currentPool === symbPool){
        containsSymb = true;
      }

      password = password + currentPool.charAt(Math.floor(Math.random() * currentPool.length)); // Choose a random character from the current pool and add it to the password
    }

    if ((containsNum || !num) && 
      (containsLower || !lower) && 
      (containsUpper || !upper) && 
      (containsSymb || !symb)){
      break;
    }
  }

  return password;
};

// Write password to the #password input
function writePassword() {

  let upperInput = false;
  let lowerInput = false;
  let numInput = false;
  let symbInput = false;
  let poolInput = [];

  // Ask the prompts here for the various inputs
  let lenInput = prompt("How long would you like your password to be? (8 - 128)") * 1;

  if(confirm("Would you like upper case letters in your password?")){
    upperInput = true;
    poolInput.push(upperPool);
  }
  if(confirm("Would you like lower case letters in your password?")){
    lowerInput = true;
    poolInput.push(lowerPool);
  }
  if(confirm("Would you like numbers in your password?")){
    numInput = true;
    poolInput.push(numPool);
  }
  if(confirm("Would you like symbols in your password?")){
    symbInput = true;
    poolInput.push(symbPool);
  }

  let password = generatePassword(lenInput, poolInput, upperInput, lowerInput, numInput, symbInput);
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
