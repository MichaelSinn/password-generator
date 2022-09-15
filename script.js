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
let generateBtn = document.querySelector("#generate");


let generatePassword = function (len, upper, lower, num, symb){
  let password = "ERROR";
  let upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerPool = "abcdefghijklmnopqrstuvwxyz";
  let numPool = "1234567890";
  let symbPool = "~!@#$%^&*?/.";

  let pool = [upperPool, lowerPool, numPool, symbPool];

  while (true && len >= 4){
    password = "";
    let containsNum = false;
    let containsUpper = false;
    let containsLower = false;
    let containsSymb = false;
    for (let i = 0; i < len; i++){
      let poolIndex = Math.floor(Math.random()*pool.length);
      let currentPool = pool[poolIndex];

      switch (poolIndex){
        case 0:
          containsUpper = true;
          break;
        case 1:
          containsLower = true;
          break;
        case 2:
          containsNum = true;
          break;
        case 3:
          containsSymb = true;
          break;
      }

      password = password + currentPool.charAt(Math.floor(Math.random() * currentPool.length));
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

  // Ask the prompts here for the various inputs 

  // Currently default values for testing
  let lenInput = 8;
  let upperInput = true;
  let lowerInput = true;
  let numInput = true;
  let symbInput = true;

  let password = generatePassword(lenInput, upperInput, lowerInput, numInput, symbInput);
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
