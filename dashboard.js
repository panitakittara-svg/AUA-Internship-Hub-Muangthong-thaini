// =============================================
// AUA Internship Hub
// Dashboard.js V2
// =============================================

// ================= DATA =================

let tasks = JSON.parse(localStorage.getItem("aua_tasks")) || [];

let events = JSON.parse(localStorage.getItem("aua_events")) || [];

let editTaskIndex = -1;

let editEventIndex = -1;

let calendar;

// ================= DEFAULT DATA =================

if(tasks.length === 0){

tasks = [

{
title:"Prepare Teaching Materials",
description:"Prepare learning materials for next week's English class.",
deadline:"2026-07-20",
priority:"Medium",
status:"To Do"
},

{
title:"Observe English Class",
description:"Observe and record classroom activities.",
deadline:"2026-07-22",
priority:"Low",
status:"In Progress"
}

];

}

if(events.length === 0){

events = [

{
title:"Orientation",
date:"2026-07-10",
time:"09:00",
description:"Intern Orientation"
},

{
title:"Meeting with Mentor",
date:"2026-07-15",
time:"13:00",
description:"Weekly Meeting"
},

{
title:"Mid Evaluation",
date:"2026-08-15",
time:"09:00",
description:"Performance Evaluation"
}

];

}

// ================= SAVE =================

function saveData(){

localStorage.setItem("aua_tasks",JSON.stringify(tasks));

localStorage.setItem("aua_events",JSON.stringify(events));

}
// ================= TOAST =================

function showToast(message){

const toast = document.createElement("div");

toast.className = "toast";

toast.innerHTML = `
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

// ================= START =================

window.addEventListener("load",()=>{

renderTasks();

renderEvents();

renderCalendar();

});
// =============================================
// TASK SYSTEM
// =============================================

const taskModal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const saveTaskBtn = document.getElementById("saveTask");

// =============================

function openTaskModal(){

taskModal.style.display = "flex";

}

function closeTaskModal(){

taskModal.style.display = "none";

}

window.closeTaskModal = closeTaskModal;

// =============================

addTaskBtn.onclick = ()=>{

editTaskIndex = -1;

document.getElementById("taskTitle").value = "";

document.getElementById("taskDeadline").value = "";

document.getElementById("taskPriority").value = "Medium";

document.getElementById("taskStatus").value = "To Do";

openTaskModal();

};

// =============================

saveTaskBtn.onclick = ()=>{

const title = document.getElementById("taskTitle").value.trim();

const deadline = document.getElementById("taskDeadline").value;

const priority = document.getElementById("taskPriority").value;

const status = document.getElementById("taskStatus").value;

if(title==="" || deadline===""){

showToast("Please complete all fields");

return;

}

const task={

title,

description:"Complete the assigned internship activity.",

deadline,

priority,

status

};

if(editTaskIndex===-1){

tasks.push(task);

showToast("Task Added Successfully");

}else{

tasks[editTaskIndex]=task;

showToast("Task Updated");

}

saveData();

renderTasks();

closeTaskModal();

};
// =============================
// EDIT TASK
// =============================

function editTask(index){

editTaskIndex=index;

const task=tasks[index];

document.getElementById("taskTitle").value=task.title;

document.getElementById("taskDeadline").value=task.deadline;

document.getElementById("taskPriority").value=task.priority;

document.getElementById("taskStatus").value=task.status;

openTaskModal();

}

// =============================
// DELETE TASK
// =============================

function deleteTask(index){

if(!confirm("Delete this task?")) return;

tasks.splice(index,1);

saveData();

renderTasks();

showToast("Task Deleted");

}

window.editTask=editTask;

window.deleteTask=deleteTask;

// =============================
// RENDER TASK
// =============================

function renderTasks(){

const container=document.getElementById("taskList");

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

<p>

${task.description}

</p>

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

<button
class="edit-btn"
onclick="editTask(${index})">

<i class="fa-solid fa-pen"></i>

Edit

</button>

<button
class="delete-btn"
onclick="deleteTask(${index})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</div>

</div>

`;

});

}
// =============================================
// IMPORTANT DATE SYSTEM
// =============================================

const eventModal = document.getElementById("eventModal");
const addEventBtn = document.getElementById("addEventBtn");
const saveEventBtn = document.getElementById("saveEvent");

// =============================

function openEventModal(){

eventModal.style.display="flex";

}

function closeEventModal(){

eventModal.style.display="none";

}

window.closeEventModal=closeEventModal;

// =============================

addEventBtn.onclick=()=>{

editEventIndex=-1;

document.getElementById("eventTitle").value="";

document.getElementById("eventDate").value="";

document.getElementById("eventTime").value="";

document.getElementById("eventDescription").value="";

openEventModal();

};

// =============================

saveEventBtn.onclick=()=>{

const title=document.getElementById("eventTitle").value.trim();

const date=document.getElementById("eventDate").value;

const time=document.getElementById("eventTime").value;

const description=document.getElementById("eventDescription").value.trim();

if(title==="" || date===""){

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

events.push(event);

showToast("Important Date Added");

}else{

events[editEventIndex]=event;

showToast("Important Date Updated");

}

saveData();

renderEvents();

renderCalendar();

closeEventModal();

};
// =============================
// EDIT EVENT
// =============================

function editEvent(index){

editEventIndex=index;

const event=events[index];

document.getElementById("eventTitle").value=event.title;

document.getElementById("eventDate").value=event.date;

document.getElementById("eventTime").value=event.time;

document.getElementById("eventDescription").value=event.description;

openEventModal();

}

// =============================
// DELETE EVENT
// =============================

function deleteEvent(index){

if(!confirm("Delete this important date?")) return;

events.splice(index,1);

saveData();

renderEvents();

renderCalendar();

showToast("Important Date Deleted");

}

window.editEvent=editEvent;

window.deleteEvent=deleteEvent;

// =============================
// RENDER EVENT
// =============================

function renderEvents(){

const list=document.getElementById("eventList");

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

<div style="margin-top:10px;display:flex;gap:8px;">

<button
class="edit-btn"
onclick="editEvent(${index})">

Edit

</button>

<button
class="delete-btn"
onclick="deleteEvent(${index})">

Delete

</button>

</div>

</li>

`;

});

}
// =============================================
// FULL CALENDAR
// =============================================

document.addEventListener("DOMContentLoaded",()=>{

renderCalendar();

});

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

body.innerHTML=`

<h2>${event.title}</h2>

<p><strong>Date :</strong> ${event.start.toLocaleDateString("en-GB")}</p>

<p><strong>Time :</strong> ${event.extendedProps.time}</p>

<p style="margin-top:15px">

${event.extendedProps.description}

</p>

`;

document.getElementById("courseModal").style.display="flex";

}

});

calendar.render();

}
// =============================================
// COURSE MODAL
// =============================================

function openModal(course){

const body=document.getElementById("modalBody");

switch(course){

case "young":

body.innerHTML=`

<h2>English for Young Learners</h2>

<p><strong>Age :</strong> 9–11 Years</p>

<p>Develop English through fun activities, games and interactive learning.</p>

<h3>Skills</h3>

<div class="skill-list">

<span>Listening</span>

<span>Speaking</span>

<span>Reading</span>

<span>Writing</span>

<span>Vocabulary</span>

<span>Grammar</span>

</div>

<h3>Course Options</h3>

<div class="price-card">

<h4>1 Semester</h4>

<p>32 Hours</p>

<strong>14,400 THB</strong>

</div>

<div class="price-card">

<h4>2 Semesters</h4>

<p>64 Hours</p>

<strong>28,800 THB</strong>

</div>

<div class="price-card">

<h4>1 Level</h4>

<p>128 Hours</p>

<strong>57,600 THB</strong>

</div>

`;

break;
    case "junior":

body.innerHTML=`

<h2>Junior English for Communication</h2>

<p><strong>Age :</strong> 12–14 Years</p>

<p><strong>Levels :</strong> A1 – B2</p>

<p>

Develop communication skills and build confidence in English through practical activities.

</p>

<h3>Course Focus</h3>

<div class="skill-list">

<span>Listening</span>

<span>Speaking</span>

<span>Reading</span>

<span>Writing</span>

<span>Grammar</span>

</div>

<div class="price-card">

<h4>Course Duration</h4>

<p>120 Hours (24 Weeks)</p>

<strong>33,000 THB</strong>

</div>

`;

break;

case "communication":

body.innerHTML=`

<h2>English for Communication</h2>

<p><strong>Age :</strong> 15 Years and Above</p>

<p><strong>Levels :</strong> A1, A2, B1, B1+, B2, C1</p>

<h3>Course Focus</h3>

<div class="skill-list">

<span>Listening</span>

<span>Speaking</span>

<span>Reading</span>

<span>Writing</span>

<span>Grammar</span>

<span>Vocabulary</span>

</div>

<div class="price-card">

<h4>A1 – B1+</h4>

<p>80 Hours (16 Weeks)</p>

<strong>22,000 THB</strong>

</div>

<div class="price-card">

<h4>B2 – C1</h4>

<p>120 Hours (24 Weeks)</p>

<strong>33,000 THB</strong>

</div>

`;

break;

default:

body.innerHTML=`

<h2>English for Business</h2>

<p><strong>Minimum Level :</strong> B1+</p>

<p>

Business English for professional communication in the workplace.

</p>

<h3>Course Focus</h3>

<div class="skill-list">

<span>Business Communication</span>

<span>Email Writing</span>

<span>Presentation</span>

<span>Meeting</span>

<span>Negotiation</span>

<span>Customer Service</span>

</div>

<div class="price-card">

<h4>Business English</h4>

<p>Professional Workplace Communication</p>

<strong>34,800 THB</strong>

</div>

`;

}

document.getElementById("courseModal").style.display="flex";

}

window.openModal=openModal;

function closeModal(){

document.getElementById("courseModal").style.display="none";

}

window.closeModal=closeModal;
// =============================================
// SMOOTH SCROLL
// =============================================

document.querySelectorAll(".menu a").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

// =============================================
// LOGOUT
// =============================================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

if(confirm("Are you sure you want to logout?")){

localStorage.removeItem("currentUser");

window.location.href="login.html";

}

});

}

// =============================================
// CLOSE MODAL
// =============================================

window.onclick=function(e){

if(e.target===taskModal){

closeTaskModal();

}

if(e.target===eventModal){

closeEventModal();

}

const courseModal=document.getElementById("courseModal");

if(courseModal && e.target===courseModal){

closeModal();

}

};

// =============================================
// AUTO SAVE
// =============================================

setInterval(()=>{

saveData();

},30000);

// =============================================
// READY
// =============================================

console.log("====================================");
console.log("AUA Internship Hub Ready");
console.log("Dashboard Loaded Successfully");
console.log("====================================");