
'use strict';
const myNote = document.getElementById("notes");
const renderArea = document.getElementById("renderArea");
let short_words;

fetch("./short_words.json")
.then(response => {
   return response.json();
})
.then(jsondata => {
  short_words = jsondata.short_words;
});

function pword() {
  myNote.value += `\nPassword: ${genPassword()}`;
}

function incl(arr, k) {
  // Because no Array.includes() on IE version at work.
  for (var i=0; i<arr.length; i++) {
    if (arr[i] === k) {
      return true;
    }
  }
  return false;
}

function randomElem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]; 
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * i)
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
function genPassword() {
  let elems = [];
  // Get three random words.
  while (elems.length < 3) {
    var temp = randomElem(short_words); 
    if (!incl(elems, temp)) {
      elems.push(temp);
    }
  }

  // Make one word all caps.
  temp = Math.floor(Math.random() * elems.length);
  elems[temp] = elems[temp].toUpperCase();

  // Also include a number & a special character.
  var special = ['!', '"', '^', '*', '(', ')', '-', '_', '£', '$', 
    '%', '+', '=', '[', ']', '{', '}', ',', '.', '#', '?', '/',
    '<', '>'];
  elems.push(randomElem(special));
  elems.push(Math.floor(Math.random() * 10).toString());
  shuffle(elems);
  return elems.join('');
}

function saveNote() {
  let link = document.createElement('a');
  let msg = myNote.value;
  let myDate = new Date();
  myDate = myDate.toLocaleDateString()
  let dateStr = myDate.replace('/','_');

  let fname = '';
  for (let i=0; i< msg.length; i++) {
    let ch = msg[i];
    if (ch === '\n') {
      msg = `${fname} ${myDate}\n${msg.slice(i)}`;
      break;
    } else {
      fname += ch;
    }
  }
  fname = `${fname}_${dateStr}`;
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(msg));
  link.download = fname + ".txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clearNote() {
  myNote.value = '';
}

function logText() {
  console.log(myNote.value);
}

function renderMe() {
  renderArea.innerHTML = myNote.value;
}
