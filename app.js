
'use strict';
const myNote = document.getElementById("notes");
const renderArea = document.getElementById("renderArea");

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
