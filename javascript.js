// Easy Access to Check Boxes
let check_submit = document.getElementById("auto-submit");
let check_clear = document.getElementById("auto-clear");
 
function grabBoxes(operator) {
event.preventDefault();
let row = event.path[1];
let inputBoxes = row.children;
let box1 = inputBoxes[0]; // Grab
let box2 = inputBoxes[1]; // The
let box3 = inputBoxes[3]; // Nodes

let copied = inputBoxes[5]; /////////// The "Copied!" notification; 
copied.style.visibility = "visible"; // grab to make it visible

// remove any commas and convert back to float after //

let b1_value = parseFloat(box1.value.toString().replace(",",""));
let b2_value = parseFloat(box2.value.toString().replace(",",""));

// Output the result using either * or / or +, as defined by the operator //

let mathsholder;
switch(operator) {
case "times": mathsholder = b1_value * b2_value; break;
case "div": mathsholder = b1_value / b2_value; break;
case "add": mathsholder = b1_value + b2_value; break;
case "minus": mathsholder = b1_value - b2_value; break;
default: mathsholder = 0;
}

box3.value = mathsholder.toFixed(5);
navigator.clipboard.writeText(box3.value);
row.dataset.memory = box3.value; // save the answer before clearing
setTimeout( () => { copied.style.visibility = "hidden"; }, 1000); // make the "Copied!" notification hidden again
check_clear.checked && clearBoxes(copied, row, box1, box2, box3);
}

function clearBoxes(row, ...boxes) { 
setTimeout( () => {for (box of boxes) { box.value = "" }}, 3000); 
}

function restoreResult() {
event.preventDefault();
let inputBoxes = event.path[1].children;
let box3 = inputBoxes[3]; // Grab the Last Node
box3.value = event.path[1].dataset.memory; // retrieve the saved answer
}

function autoSubmit() {
let button = event.path[1].children[2];
check_submit.checked && button.click();
}

function checkBoxes() {
event.preventDefault();
check_clear.checked = !check_clear.checked;
check_submit.checked = !check_submit.checked;
}