
'use strict';
const myNote = document.getElementById("notes");
const password = document.getElementById("pwdArea");
const pSpan = document.getElementById("pwordSpan");

let short_words;

function copyPwd() {
  let temp = password.select();
  navigator.clipboard.writeText(password.value);
}

fetch("./short_words.json")
.then(response => {
   return response.json();
})
.then(jsondata => {
  short_words = jsondata.short_words;
});

function pword() {
  if (pSpan.classList.contains("d-none")) {
    pSpan.classList.remove("d-none");
    pSpan.classList.add("d-inline-block");
    password.value = genPassword();
  } else {
    pSpan.classList.remove("d-inline-block");
    pSpan.classList.add("d-none");
    password.value = '';
  }
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
    if (!elems.includes(temp)) {
      elems.push(temp);
    }
  }
  temp = Math.floor(Math.random() * elems.length);
  elems[temp] = elems[temp].toUpperCase();
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

