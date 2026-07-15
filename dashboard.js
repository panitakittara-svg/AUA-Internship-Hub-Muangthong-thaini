import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ======================================
// AUTH
// ======================================

onAuthStateChanged(auth,(user)=>{

    if(!user){

        location.href="login.html";

    }

});

// ======================================
// DATA
// ======================================

let tasks=[];
let announcements=[];
let events=[];

let calendar=null;

let editTaskIndex=-1;
let editAnnouncementIndex=-1;
let editEventIndex=-1;

// ======================================
// TOAST
// ======================================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=`

<i class="fa-solid fa-circle-check"></i>

<span>${message}</span>

`;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

// ======================================
// LOAD TASK
// ======================================

function loadTasks(){

onSnapshot(collection(db,"tasks"),(snapshot)=>{

tasks=[];

snapshot.forEach((docItem)=>{

tasks.push({

id:docItem.id,

...docItem.data()

});

});

renderTasks();

});

}
// ======================================
// LOAD ANNOUNCEMENTS
// ======================================

function loadAnnouncements(){

onSnapshot(collection(db,"announcements"),(snapshot)=>{

announcements=[];

snapshot.forEach((docItem)=>{

announcements.push({

id:docItem.id,

...docItem.data()

});

});

renderAnnouncements();

});

}

// ======================================
// LOAD EVENTS
// ======================================

function loadEvents(){

onSnapshot(collection(db,"events"),(snapshot)=>{

events=[];

snapshot.forEach((docItem)=>{

events.push({

id:docItem.id,

...docItem.data()

});

});

renderEvents();

renderCalendar();

});

}

// ======================================
// START
// ======================================

window.addEventListener("load",()=>{

loadTasks();

loadAnnouncements();

loadEvents();

});

// ======================================
// TASK MODAL
// ======================================

const taskModal=document.getElementById("taskModal");

const addTaskBtn=document.getElementById("addTaskBtn");

const saveTaskBtn=document.getElementById("saveTask");

function openTaskModal(){

taskModal.style.display="flex";

}

function closeTaskModal(){

taskModal.style.display="none";

}

window.closeTaskModal=closeTaskModal;

// ======================================
// ADD TASK
// ======================================

if(addTaskBtn){

addTaskBtn.onclick=()=>{

editTaskIndex=-1;

document.getElementById("taskTitle").value="";

document.getElementById("taskDeadline").value="";

document.getElementById("taskPriority").value="Medium";

document.getElementById("taskStatus").value="To Do";

openTaskModal();

};

}
// ======================================
// SAVE TASK
// ======================================

if(saveTaskBtn){

saveTaskBtn.onclick = async ()=>{

const title=document.getElementById("taskTitle").value.trim();
const deadline=document.getElementById("taskDeadline").value;
const priority=document.getElementById("taskPriority").value;
const status=document.getElementById("taskStatus").value;

if(title===""||deadline===""){

showToast("Please complete all fields");

return;

}

const task={

title,

description:"Complete assigned internship task.",

deadline,

priority,

status

};

if(editTaskIndex===-1){

await addDoc(collection(db,"tasks"),task);

showToast("Task Added");

}else{

await updateDoc(

doc(db,"tasks",tasks[editTaskIndex].id),

task

);

showToast("Task Updated");

}

closeTaskModal();

};

}

// ======================================
// EDIT TASK
// ======================================

function editTask(index){

editTaskIndex=index;

const task=tasks[index];

document.getElementById("taskTitle").value=task.title;
document.getElementById("taskDeadline").value=task.deadline;
document.getElementById("taskPriority").value=task.priority;
document.getElementById("taskStatus").value=task.status;

openTaskModal();

}

// ======================================
// DELETE TASK
// ======================================

async function deleteTask(index){

if(!confirm("Delete this task?")) return;

await deleteDoc(

doc(db,"tasks",tasks[index].id)

);

showToast("Task Deleted");

}

window.editTask=editTask;
window.deleteTask=deleteTask;

// ======================================
// RENDER TASK
// ======================================

function renderTasks(){

const container=document.getElementById("taskList");

if(!container) return;

container.innerHTML="";

tasks.forEach((task,index)=>{

container.innerHTML+=`

<div class="task-card">

<div class="task-top">

<h3>${task.title}</h3>

<span class="priority ${task.priority.toLowerCase()}">

${task.priority}

</span>

</div>

<p>${task.description}</p>

<div class="task-footer">

<div>

<strong>${task.deadline}</strong>

<small>Deadline</small>

</div>

<div class="status">

${task.status}

</div>

</div>

<div class="task-action">

<button class="edit-btn"
onclick="editTask(${index})">

<i class="fa-solid fa-pen"></i>

Edit

</button>

<button class="delete-btn"
onclick="deleteTask(${index})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</div>

</div>

`;

});

}
// ======================================
// ANNOUNCEMENT
// ======================================

const announcementModal=document.getElementById("announcementModal");

const addAnnouncementBtn=document.getElementById("addAnnouncementBtn");

const saveAnnouncementBtn=document.getElementById("saveAnnouncement");

// -----------------------------

function openAnnouncementModal(){

announcementModal.style.display="flex";

}

function closeAnnouncementModal(){

announcementModal.style.display="none";

}

window.closeAnnouncementModal=closeAnnouncementModal;

// -----------------------------

if(addAnnouncementBtn){

addAnnouncementBtn.onclick=()=>{

editAnnouncementIndex=-1;

document.getElementById("announcementTitle").value="";

document.getElementById("announcementContent").value="";

openAnnouncementModal();

};

}

// -----------------------------

if(saveAnnouncementBtn){

saveAnnouncementBtn.onclick=async()=>{

const title=document.getElementById("announcementTitle").value.trim();

const content=document.getElementById("announcementContent").value.trim();

if(title===""||content===""){

showToast("Please complete all fields");

return;

}

const announcement={

title,

content,

createdAt:new Date().toISOString()

};

if(editAnnouncementIndex===-1){

await addDoc(

collection(db,"announcements"),

announcement

);

showToast("Announcement Added");

}else{

await updateDoc(

doc(

db,

"announcements",

announcements[editAnnouncementIndex].id

),

announcement

);

showToast("Announcement Updated");

}

closeAnnouncementModal();

};

}

// -----------------------------

function editAnnouncement(index){

editAnnouncementIndex=index;

const item=announcements[index];

document.getElementById("announcementTitle").value=item.title;

document.getElementById("announcementContent").value=item.content;

openAnnouncementModal();

}

async function deleteAnnouncement(index){

if(!confirm("Delete this announcement?")) return;

await deleteDoc(

doc(

db,

"announcements",

announcements[index].id

)

);

showToast("Announcement Deleted");

}

window.editAnnouncement=editAnnouncement;

window.deleteAnnouncement=deleteAnnouncement;

// -----------------------------

function renderAnnouncements(){

const container=document.getElementById("announcementList");

if(!container) return;

container.innerHTML="";

announcements.forEach((item,index)=>{

container.innerHTML+=`

<div class="announcement-card">

<span class="badge">NEW</span>

<h3>${item.title}</h3>

<p>${item.content}</p>

<div class="task-action">

<button
class="edit-btn"
onclick="editAnnouncement(${index})">

<i class="fa-solid fa-pen"></i>

Edit

</button>

<button
class="delete-btn"
onclick="deleteAnnouncement(${index})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</div>

</div>

`;

});

}
// ======================================
// IMPORTANT DATE
// ======================================

const eventModal=document.getElementById("eventModal");
const addEventBtn=document.getElementById("addEventBtn");
const saveEventBtn=document.getElementById("saveEvent");

function openEventModal(){

eventModal.style.display="flex";

}

function closeEventModal(){

eventModal.style.display="none";

}

window.closeEventModal=closeEventModal;

// -----------------------------

if(addEventBtn){

addEventBtn.onclick=()=>{

editEventIndex=-1;

document.getElementById("eventTitle").value="";
document.getElementById("eventDate").value="";
document.getElementById("eventTime").value="";
document.getElementById("eventDescription").value="";

openEventModal();

};

}

// -----------------------------

if(saveEventBtn){

saveEventBtn.onclick=async()=>{

const title=document.getElementById("eventTitle").value.trim();

const date=document.getElementById("eventDate").value;

const time=document.getElementById("eventTime").value;

const description=document.getElementById("eventDescription").value.trim();

if(title===""||date===""){

showToast("Please complete all fields");

return;

}

const event={

title,
date,
time,
description

};

if(editEventIndex===-1){

await addDoc(

collection(db,"events"),

event

);

showToast("Important Date Added");

}else{

await updateDoc(

doc(

db,

"events",

events[editEventIndex].id

),

event

);

showToast("Important Date Updated");

}

closeEventModal();

};

}

// -----------------------------

function editEvent(index){

editEventIndex=index;

const event=events[index];

document.getElementById("eventTitle").value=event.title;

document.getElementById("eventDate").value=event.date;

document.getElementById("eventTime").value=event.time;

document.getElementById("eventDescription").value=event.description;

openEventModal();

}

async function deleteEvent(index){

if(!confirm("Delete this important date?")) return;

await deleteDoc(

doc(

db,

"events",

events[index].id

)

);

showToast("Important Date Deleted");

}

window.editEvent=editEvent;

window.deleteEvent=deleteEvent;
// ======================================
// RENDER EVENTS
// ======================================

function renderEvents(){

const list=document.getElementById("eventList");

if(!list) return;

list.innerHTML="";

events.forEach((event,index)=>{

list.innerHTML+=`

<li>

<strong>

${new Date(event.date).toLocaleDateString("en-GB")}

</strong>

<br>

${event.title}

<br>

<small>${event.time}</small>

<div class="task-action">

<button
class="edit-btn"
onclick="editEvent(${index})">

<i class="fa-solid fa-pen"></i>

Edit

</button>

<button
class="delete-btn"
onclick="deleteEvent(${index})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</div>

</li>

`;

});

}
// ======================================
// FULL CALENDAR
// ======================================

function renderCalendar(){

const calendarEl=document.getElementById("calendar");

if(!calendarEl) return;

if(calendar){

calendar.destroy();

}

calendar=new FullCalendar.Calendar(calendarEl,{

initialView:"dayGridMonth",

height:650,

headerToolbar:{

left:"prev,next today",

center:"title",

right:"dayGridMonth,timeGridWeek,listWeek"

},

events:events.map((event,index)=>({

id:index,

title:event.title,

start:event.date,

backgroundColor:"#0F2D5C",

borderColor:"#0F2D5C",

textColor:"#FFFFFF",

extendedProps:{

time:event.time,

description:event.description

}

})),

eventClick:function(info){

const event=info.event;

const body=document.getElementById("modalBody");

if(!body) return;

body.innerHTML=`

<h2>${event.title}</h2>

<p><strong>Date :</strong>
${event.start.toLocaleDateString("en-GB")}</p>

<p><strong>Time :</strong>
${event.extendedProps.time}</p>

<p style="margin-top:15px">

${event.extendedProps.description}

</p>

`;

document.getElementById("courseModal").style.display="flex";

}

});

calendar.render();

}
// ======================================
// PRODUCT MODAL
// ======================================

function openModal(course){

const body=document.getElementById("modalBody");

if(!body) return;

switch(course){

case "young":

body.innerHTML = `
<h2>English for Young Learners</h2>

<p><strong>Age:</strong> 9–11 Years</p>

<p><strong>Levels:</strong> 3 Levels (V1, V2, V3)</p>

<p><strong>Learning:</strong> Project-based Learning</p>

<p><strong>Hours:</strong> 128 Hours</p>

<p><strong>Tuition Fee:</strong> 57,600 THB</p>

<p><strong>Hours:</strong> 64 Hours</p>

<p><strong>Tuition Fee:</strong> 28,800 THB</p>

<p><strong>Hours:</strong> 32 Hours</p>

<p><strong>Tuition Fee:</strong> 14,400 THB</p>

<p>
Develop English through enjoyable activities while improving listening,
speaking, reading and writing skills.
</p>
`;

break;

break;

case "junior":

body.innerHTML = `
<h2>Junior English for Communication</h2>

<p><strong>Age:</strong> 12–14 Years</p>

<p><strong>Levels:</strong> A1 / A1+ / A2 / B1 / B1+ / B2</p>

<p><strong>Hours:</strong> 120 Hours</p>

<p><strong>Duration:</strong> 6 Parts / 24 Weeks</p>


<p><strong>Tuition Fee:</strong> 33,000 THB</p>

<p>
Develop communication skills through practical activities and real-life English.
</p>
`;

break;

break;

case "communication":

body.innerHTML = `

<h2>English for Communication</h2>

<p><strong>Levels:</strong> A1 / A2 / B1 / B1+ / B2 / C1</p>

<p><strong>Hours:</strong> A1-B1+ : 80 Hours (16 Weeks)<br>
B2-C1 : 120 Hours (24 Weeks)</p>

<p><strong>Placement Test:</strong> Oxford Placement Test 600 THB</p>

<p><strong>Tuition Fee:</strong><br>
A1-B1+ : 22,000 THB<br>
B2-C1 : 33,000 THB
</p>

<p><strong>Book Fee:</strong><br>
Onsite : 440 THB<br>
Online : 530 THB
</p>

<p>
Develop English communication skills in listening, speaking, reading and writing for everyday life with practical activities.
</p>

`;

break;

default:

body.innerHTML = `

<h2>English for Business</h2>

<p><strong>Recommended Level:</strong> B1+ or above</p>

<p><strong>Tuition Fee:</strong> 34,800 THB</p>

<p><strong>Target Learners:</strong> Working professionals, business owners, university students preparing for work, and anyone who wants to improve professional English.</p>

<p><strong>Course Focus:</strong></p>

<ul>
<li>Business Communication</li>
<li>Email Writing</li>
<li>Meetings & Discussions</li>
<li>Presentations</li>
<li>Negotiation Skills</li>
<li>Professional Vocabulary</li>
</ul>

<p>
This course helps learners build confidence in using English in real workplace situations and supports career growth in an international environment.
</p>

`;

break;

}

document.getElementById("courseModal").style.display="flex";

}

window.openModal=openModal;

// ======================================

function closeModal(){

document.getElementById("courseModal").style.display="none";

}

window.closeModal=closeModal;

// ======================================
// LOGOUT
// ======================================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

if(confirm("Are you sure you want to logout?")){

await signOut(auth);

location.href="login.html";

}

});

}

// ======================================
// CLOSE MODAL
// ======================================

window.onclick=function(e){

if(taskModal && e.target===taskModal){

closeTaskModal();

}

if(eventModal && e.target===eventModal){

closeEventModal();

}

if(announcementModal && e.target===announcementModal){

closeAnnouncementModal();

}

const courseModal=document.getElementById("courseModal");

if(courseModal && e.target===courseModal){

closeModal();

}

};

// ======================================

console.log("AUA Internship Hub Ready");