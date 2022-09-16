// [Starting ASCII value, Range]
const upperPool = [65, 26];
const lowerPool = [97, 26];
const numPool = [48, 10];
const symbPool = [33, 15];

let generateBtn = document.querySelector("#generate");

let generatePassword = function (len, pool, upper, lower, num, symb){
  let password; // Define password as part of the function scope

  while (true){ // Loop over this code until the password contains all required characters
    password = ""; // Reset the password to be empty

    // Assume that none of the character requirements are met
    let containsNum = false;
    let containsUpper = false;
    let containsLower = false;
    let containsSymb = false;

    for (let i = 0; i < len; i++){
      let currentPool = pool[Math.floor(Math.random()*pool.length)]; // Select a random pool from the list of pools

      // Switch between the different types of pool the currentPool can be, can then mark down that the password now contains one of that type of character
      switch (currentPool){
        case upperPool:
          containsUpper = true;
          break;
        case lowerPool:
          containsLower = true;
          break;
        case numPool:
          containsNum = true;
          break;
        case symbPool:
          containsSymb = true;
          break;
      }

      password = password + String.fromCharCode(Math.floor(Math.random() * currentPool[1]) + currentPool[0]); // Choose a random character from the current pool and add it to the password
    }
    // Checks if the password contains a certain type of character, or if that character is not required
    if ((containsNum || !num) &&
      (containsLower || !lower) &&
      (containsUpper || !upper) &&
      (containsSymb || !symb)){
        return password; // Exit the while loop and return the password if it contains all the required characters
    }
  }
};

// Write password to the #password input
function writePassword() {
  // Stores the different requirements the user has for the password
  let upperInput = false;
  let lowerInput = false;
  let numInput = false;
  let symbInput = false;
  let lenInput;

  // Stores a list of pools that will be used in the password generation
  let poolInput = [];

  while (true){ // Loop until either user cancels or you receive a valid input
    lenInput = prompt("How long would you like your password to be? (8 - 128)", 8); // Convert the prompt to a number
    if (lenInput === null) return; // Exits if you press cancel

    lenInput = lenInput * 1; // Attempts to cast the lenInput to a number
    if (!isNaN(lenInput) && // Checks if the input is a number
    lenInput >=8 && // Checks if the input is 8 or great
    lenInput <= 128 &&  // Checks if the input is 128 or less
    (lenInput % Math.floor(lenInput) === 0)) break; // Checks that the input is an integer, and breaks the loop if all requirements are true

    alert("Error: Length must an integer number between 8 and 128."); // Tell the user why they cannot continue
  }
  
  while (true){ // Loop until at least one type of character has been chosen
    upperInput = confirm("Would you like upper case letters in your password?");
    if (upperInput) poolInput.push(upperPool); // Add the pool of uppercase letters to the pool of characters being used

    lowerInput = confirm("Would you like lower case letters in your password?");
    if (lowerInput) poolInput.push(lowerPool); // Add the pool of lowercase letters to the pool of characters being used

    numInput = confirm("Would you like numbers in your password?");
    if (numInput) poolInput.push(numPool); // Add the pool of numbers to the pool of characters being used

    symbInput = confirm("Would you like symbols in your password?");
    if (symbInput) poolInput.push(symbPool); // Add the pool of symbols to the pool of characters being used

    if (numInput || symbInput || lowerInput || upperInput) break; // If at least one character type has been selected, break the loop

    alert("Error: You must choose at least one type of character to include in your password."); // Tell the user why they cannot continue
  }

  let password = generatePassword(lenInput, poolInput, upperInput, lowerInput, numInput, symbInput); // Store the generated password in 'password'
  let passwordText = document.querySelector("#password");

  passwordText.value = password; // Output the password to the HTML
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
