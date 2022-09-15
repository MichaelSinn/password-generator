// [Starting ASCII, Range]
const upperPool = [65, 26];
const lowerPool = [97, 26];
const numPool = [48, 10];
const symbPool = [33, 15];

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

      randomChar = String.fromCharCode(Math.floor(Math.random() * currentPool[1]) + currentPool[0])
      password = password + randomChar;

      //password = password + currentPool.charAt(Math.floor(Math.random() * currentPool.length)); // Choose a random character from the current pool and add it to the password
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
    lenInput = prompt("How long would you like your password to be? (8 - 128)", 8); // Convert the prompt to a number

    if (lenInput === null){
      return;
    }

    lenInput = lenInput * 1;

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
