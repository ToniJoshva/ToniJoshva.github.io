const starterCards = [
  {question:"What does HTML stand for?", answer:"HyperText Markup Language. It gives structure to content on a web page."},
  {question:"What is CSS used for?", answer:"Cascading Style Sheets. CSS controls the look and layout of web pages."},
  {question:"What does JavaScript add to a website?", answer:"JavaScript adds behaviour and interactivity, such as responding to clicks and updating content."}
];
const STORAGE_KEY = "codealpha-flashcards-v1";
let cards = loadCards();
let current = 0;
let showingAnswer = false;
let editingIndex = null;

const $ = id => document.getElementById(id);
function loadCards(){try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(data)&&data.length?data:starterCards.slice()}catch{return starterCards.slice()}}
function saveCards(){localStorage.setItem(STORAGE_KEY,JSON.stringify(cards))}
function render(){
  $("cardCount").textContent=cards.length;
  if(!cards.length){
    $("cardText").textContent="Your deck is empty. Add a flashcard below to begin.";
    $("sideLabel").textContent="READY TO LEARN";$("cardHint").textContent="Create your first card";$("showAnswer").hidden=true;
    $("position").textContent="0/0";$("navCount").textContent="No cards yet";$("progressBar").style.width="0%";
    $("prevBtn").disabled=true;$("nextBtn").disabled=true;
  }else{
    current=Math.max(0,Math.min(current,cards.length-1));
    const card=cards[current];$("cardText").textContent=showingAnswer?card.answer:card.question;
    $("sideLabel").textContent=showingAnswer?"ANSWER":"QUESTION";
    $("cardHint").textContent=showingAnswer?"Review it, then continue":"Think about your answer first";
    $("showAnswer").textContent=showingAnswer?"Show question ↗":"Show answer ↗";$("showAnswer").hidden=false;
    $("position").textContent=`${current+1}/${cards.length}`;$("navCount").textContent=`Card ${current+1} of ${cards.length}`;
    $("progressBar").style.width=`${((current+1)/cards.length)*100}%`;
    $("prevBtn").disabled=current===0;$("nextBtn").disabled=current===cards.length-1;
  }
  $("manageList").innerHTML="";
  if(!cards.length){$("manageList").innerHTML='<p class="empty">No flashcards yet. Add one using the form above.</p>';return}
  cards.forEach((card,index)=>{
    const item=document.createElement("div");item.className="manage-item";
    const copy=document.createElement("div");copy.className="item-copy";
    const title=document.createElement("strong");title.textContent=card.question;
    const answer=document.createElement("small");answer.textContent=card.answer;
    copy.append(title,answer);
    const edit=document.createElement("button");edit.className="mini-btn";edit.textContent="Edit";edit.type="button";edit.addEventListener("click",()=>startEdit(index));
    const del=document.createElement("button");del.className="mini-btn";del.textContent="Delete";del.type="button";del.setAttribute("aria-label",`Delete card ${index+1}`);del.addEventListener("click",()=>deleteCard(index));
    item.append(copy,edit,del);$("manageList").append(item);
  });
}
function resetForm(){editingIndex=null;$("cardForm").reset();$("saveBtn").textContent="＋ Add flashcard";$("cancelEdit").hidden=true}
function startEdit(index){editingIndex=index;$("questionInput").value=cards[index].question;$("answerInput").value=cards[index].answer;$("saveBtn").textContent="Save changes";$("cancelEdit").hidden=false;$("questionInput").focus()}
function deleteCard(index){cards.splice(index,1);if(current>=cards.length)current=Math.max(0,cards.length-1);showingAnswer=false;saveCards();render();if(editingIndex===index)resetForm()}
$("showAnswer").addEventListener("click",()=>{showingAnswer=!showingAnswer;render()});
$("prevBtn").addEventListener("click",()=>{if(current>0){current--;showingAnswer=false;render()}});
$("nextBtn").addEventListener("click",()=>{if(current<cards.length-1){current++;showingAnswer=false;render()}});
$("cardForm").addEventListener("submit",event=>{
  event.preventDefault();const question=$("questionInput").value.trim(),answer=$("answerInput").value.trim();
  if(!question||!answer)return;
  if(editingIndex!==null){cards[editingIndex]={question,answer};current=editingIndex}
  else{cards.push({question,answer});current=cards.length-1}
  showingAnswer=false;saveCards();resetForm();render();
});
$("cancelEdit").addEventListener("click",resetForm);
render();