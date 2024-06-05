# Task 1 (5 Marks)

## Problem Description

Complete the following HTML and JavaScript codes, so that when the button `Submit` is clicked, the min and the max of the sequence of numbers (which is separated by ",") entered in the input text box will be displayed in the `span` elements.

## Solution

When the document is first loaded, first obtain the `Submit` button and attach its on-click behaviour to the button element. This allows the button to perform the expected actions when it is clicked.

```js
function run() {
  const submitBtn = document.getElementById("button1");
  submitBtn.onclick = handleSubmitButtonClick;
}
```

The functionality to obtain user input and parse the input into a list of numbers is already handled. To obtain the minimum and maximum elements of the list of numbers, the in-built JavaScript functions `Math.min()` and `Math.max()` provides the expected functionality. As these functions both expect a sequence of arguments (e.g. `Math.min(arg1, arg2, arg3, ...)`), the input array of numbers can be spread out (via the `...` operator; i.e., `...arr`) so that the functions can be called.

```js
function getMinMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
```
