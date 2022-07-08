// starter variables
let date_direction = "ltr";
let date_1 = "settle";
let date_2 = "trade";
let check_submit = document.getElementById("auto-submit");
let check_clear = document.getElementById("auto-clear");

function dateFixer(date) {
let dd = date.split("/");
if (dd[1].length===1) {dd[1] = `0${dd[1]}`}
if (dd[0].length===1) {dd[0] = `0${dd[0]}`}

// return an array with the dates formatted three different ways:
// dd[2] = Year
// dd[0] = Month
// dd[1] = Day
return [ 
[dd[2], dd[0], dd[1]].join("-"), 
[dd[0], dd[1], dd[2].slice(2)].join("/"), 
[`20${dd[2]}`, dd[0], dd[1]].join("-")
];
}

function updateScreen(newDate) {
let output = document.getElementById(date_2);
let copied = document.getElementById("copied");
let fixedDate = dateFixer(newDate);
output.value = fixedDate[0];
output.dataset.memory = fixedDate[1];
navigator.clipboard.writeText(output.dataset.memory); // copy date to clipboard automatically 
copied.style.visibility="visible";
setTimeout( () => { copied.style.visibility="hidden"; }, 1000);
}

function findDate() {
event.preventDefault();
let parts = document.getElementById(date_1).value;
if (parts === "") {updateScreen(""); return;}
parts = parts.split("-");
// Fix year if user types YY instead of YYYY
if (parts[0].startsWith('00')) { parts[0] = parts[0].replace('00', '20'); }
let oldDate = `${parseInt(parts[1])}/${parseInt(parts[2])}/${parts[0]}`;
let newDate = price_table.find(x => x[date_1] === oldDate);
newDate ? updateScreen(newDate[date_2]) : alert('Invalid date entered');
}

function flipper() {
let button = document.getElementById("button");
if (date_direction==="ltr") {
button.innerText = "<<"; date_1 = "trade"; date_2 = "settle"; date_direction = "rtl";
} else {
button.innerText = ">>"; date_1 = "settle"; date_2 = "trade"; date_direction="ltr";
}
}

function pasteDate() {
let output = document.getElementById(date_1);
let local_event = event.target;
let pasted = dateFixer(local_event.value)[2];
output.value = pasted;
check_clear.checked && setTimeout( () => { local_event.value = "" }, 1000);
autoDate();
}

function autoDate() {
let button = document.getElementById("button");
check_submit.checked && button.click();
}
 

// Math Functionality Javascript Goes Here
 
 
function grabBoxes(operator) {
event.preventDefault();
let row = event.path[1];
let inputBoxes = row.children;
let box1 = inputBoxes[0]; // Grab
let box2 = inputBoxes[1]; // The
let box3 = inputBoxes[3]; // Nodes
let copied = inputBoxes[5]; // (the copied text)
copied.style.visibility = "visible";
// remove any commas and convert back to float after //
let b1_value = parseFloat(inputBoxes[0].value.toString().replace(",",""));
let b2_value = parseFloat(inputBoxes[1].value.toString().replace(",",""));
// Output the result using either * or / or +, as defined by the operator //
let mathsholder;
switch(operator) {
case "times":
mathsholder = b1_value * b2_value;
break;
case "div":
mathsholder = b1_value / b2_value;
break;
case "add":
mathsholder = b1_value + b2_value;
break;
case "minus":
mathsholder = b1_value - b2_value;
break;
default:
mathsholder = 0;
}
box3.value = mathsholder.toFixed(5);
navigator.clipboard.writeText(box3.value);
row.dataset.memory = box3.value; // save the answer before clearing
setTimeout( () => { copied.style.visibility = "hidden"; }, 1000);
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