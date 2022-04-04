function getDisplay(){
  return document.getElementById('display').innerText;
}

function setDisplay(displayString){
  document.getElementById('display').innerText = displayString;
}

function isOperator(character){
  if (character.length != 1) {
    throw "Error: only single character should be passed into isOperator function";
  }
  if (character.match(/\+|\-|\*|\//)) {
    return true;
  }
  else {
    return false;
  }
}

function executeCalculation (calcString) {
  // Format: add space between negatives so eval function can handle double negatives
  let outputString = ""
  for (let i = 0; i < calcString.length; i++){
    outputString += calcString[i];
    if(calcString[i] == "-"){
      outputString += " ";
    }
  }
  setDisplay(eval(outputString));
}

function repeatDecimal(display, value) {
  // Returns true if more than one decimal inputted since last arithmetic operator
  // This function is only called when the current value is "."
  if (value != "."){
    throw "Error: this function should only be called when decimal point inputted";
  }
  calcArr = display.split("");

  // Decrement through calcArr; if decimal found before arithmetic operator, return true
  for (let i = calcArr.length - 1; i >= 0; i --){
    if (calcArr[i] == "."){
      return true;
    }
    else if (isOperator(calcArr[i])){
      return false;
    }
  }
}

function buttonClicked(value) {
  let display = getDisplay();

  // Handle click
  if(value == "AC"){
    setDisplay(0);
  }
  else if (value == "="){
    executeCalculation(display);
  }
  else if (display == 0 && value.match(/\+|\*|\//)){
    // can't start calculation with +, *, or /: do nothing
  }
  else if  (display == 0){
    setDisplay(value);
  }

  // "-" entered AND last entry is operator (+, -, *, /)
  else if (value == "-" && isOperator(display[display.length - 1])){
    if ((display.length == 1 && display[0] == "-") || display.length > 1 && isOperator(display[display.length - 2])) {
      // More than two "-"s in a row: do nothing
    }
    else {
      // Append display with "-"
      document.getElementById('display').innerText += value;
    }
  }
  else if ((display.length > 0) && (value == ".") && repeatDecimal(display, value)){
    // Repeat decimal: do not append display
  }
  else if ((display.length > 0) && isOperator(display[display.length - 1]) && isOperator(value) ) {
    // Repeat operator: replace last operator(s) with current operator
    let arr = display.split("");
    for (let i = display.length - 1; i >= 0; i--){
      //get to a number
      if(!isOperator(arr[i])){
        arr.push(value);
      }
      else {
        arr.pop();
      }
      display = arr.join("");
      setDisplay(display);
    }
  }
  // Append display with button clicked
  else {
    document.getElementById('display').innerText += value;
  }
}
