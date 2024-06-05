/**
 * Parses an array of strings into an array of numbers
 *
 * @param {string[]} arr The array of strings to parse into numbers
 * @returns The array of successfully parsed numbers
 */
function parse(arr) {
  const res = [];
  arr.forEach(s => {
    const num = parseInt(s, 10);
    if (!isNaN(num)) {
      res.push(num);
    }
  });
  return res;
}

/**
 * Obtains the minimum and maximum numbers in a given array
 *
 * @param {number[]} arr The array of numbers to obtain min-max from
 * @returns An object mapping 'min' to the array minimum and 'max' to the array maximum
 */
function getMinMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}

/**
 * Handles the 'Submit' button click event
 *
 * @description
 * Displays the minimum and maximum elements of the input to their respective spans.
 */
function handleSubmitButtonClick() {
  // Locate HTML elements
  const textbox1 = document.getElementById("textbox1");
  const min = document.getElementById("min");
  const max = document.getElementById("max");

  // Calculate and display min-max elements
  const minMax = getMinMax(parse(textbox1.value.split(',')));
  min.innerHTML = minMax["min"];
  max.innerHTML = minMax["max"];
}

/**
 * Handles document events on display
 */
function run() {
  const submitBtn = document.getElementById("button1");
  submitBtn.onclick = handleSubmitButtonClick;
}

document.addEventListener("DOMContentLoaded", run);
