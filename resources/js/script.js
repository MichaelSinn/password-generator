/*
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria - DONE
WHEN prompted for password criteria
THEN I select which criteria to include in the password - DONE
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters - DONE
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters - DONE
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected - DONE
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria - DONE
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page - DONE

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
  let password;

  while (true){
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

    if ((containsNum || !num) && // Checks if the password contains a number, or if a number is not required
      (containsLower || !lower) && // Checks if the password contains a lowercase letter, or if a lowercase letter is not required
      (containsUpper || !upper) && // Checks if the password contains a uppercase letter, or if a uppercase letter is not required
      (containsSymb || !symb)){ // Checks if the password contains a symbol, or if a symbol is not required
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
  let lenInput;

  // Ask the prompts here for the various inputs
  while (true){
    lenInput = prompt("How long would you like your password to be? (8 - 128)") * 1; // Convert the prompt to a number

    if (!isNaN(lenInput) && lenInput >=8 && lenInput <= 128){
      break;
    }

    alert("Length must a number between 8 and 128.");
  }
  
  while (true){
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

    if (numInput || symbInput || lowerInput || upperInput){
      break;
    }

    alert("You must choose at least one type of character to include in your password.")
  }

  let password = generatePassword(lenInput, poolInput, upperInput, lowerInput, numInput, symbInput);
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
