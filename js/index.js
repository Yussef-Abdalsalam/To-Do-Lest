// -----------> HTML Elamnt
let root = document.querySelector(":root")
let mode = document.querySelector("#mode")
let modal = document.querySelector("#modal")
let statusAnput = document.querySelector("#status")
let categoryAnput = document.querySelector("#category")
let titleAnput = document.querySelector("#title")
let descriptionAnput = document.querySelector("#description")
let newTaskbtn = document.querySelector("#newTask")
let addBtn = document.querySelector("#addBtn")
let searchInput = document.querySelector("#searchInput")
let gridBtn = document.querySelector("#gridBtn")
let barsBtn = document.querySelector("#barsBtn")
let tasksContainer = document.querySelector(".tasks")
let nambar = document.querySelector("#remainingCounter");
let nam = [100];
const sections = document.querySelector("section")

// -----------> Add Vrapls
let cotenar = {
    nextUp: document.getElementById("nextUp"),
    inProgress: document.getElementById("inProgress"),
    done: document.getElementById("done"),
}

let countrsEL = {
    nextUp: document.querySelector("#nextUp").querySelector("span"),
    inProgress: document.querySelector("#inProgress").querySelector("span"),
    done: document.querySelector("#done").querySelector("span"),
}

let countrs = {
    nextUp: 0,
    inProgress: 0,
    done: 0
}

let abditIndex;
const titleRegex = /^[A-Za-z0-9].{3,}$/;
const descriptionRegex = /^.{10,100}$/;

let tasksArr = getTasksFormLocal();
displayAllTasks();



// -----------> Functions
function showModal() {
    window.scroll(0, 0);
    document.body.style.overflow = "hidden";
    modal.classList.replace("d-none", "d-flex")
    clearForm()
}

function hideModal() {
    modal.classList.replace("d-flex", "d-none")
    document.body.style.overflow = "auto";
}

function addTask() {
    if (valedete(titleAnput, titleRegex) && valedete(descriptionAnput, descriptionRegex)) {
        let task = {
            status: statusAnput.value,
            category: categoryAnput.value,
            title: titleAnput.value,
            description: descriptionAnput.value,
            bgColor: "--main-black"
        }
        tasksArr.push(task);
        setTasksLocal()
        displayTask(tasksArr.length - 1)
        hideModal()
        clearForm()
    }
}

function setCountr(status) {
    countrsEL[status].innerHTML = +countrsEL[status].innerHTML + 1
}

function displayTask(index) {
    let taskHTML = `
    <div class="task"  style="background-color:${tasksArr[index].bgColor} ;">
      <h3 class="text-capitalize">${tasksArr[index].title}</h3>
      <p class="description text-capitalize">${tasksArr[index].description}</p>
      <h4 class="category ${tasksArr[index].category} text-capitalize">${tasksArr[index].category}</h4>
      <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
        <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
        <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
        <li><i class="bi bi-palette-fill" onclick="changeBgColor(event, ${index})"></i></li>
      </ul>
    </div>`;
    cotenar[tasksArr[index].status].querySelector(".tasks").innerHTML += taskHTML;
    setCountr(tasksArr[index].status)
}

function setTasksLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function getTasksFormLocal() {
    return JSON.parse(localStorage.getItem("tasks")) || []
}

function displayAllTasks() {
    for (let i = 0; i < tasksArr.length; i++) {
        displayTask(i)
    }
}

function deleteTask(index) {
    tasksArr.splice(index, 1);
    setTasksLocal()
    // rest Containers
    restContainers()
    // rest Coenters
    restCoenters()
    displayAllTasks()
}
function restContainers() {
    for (key in cotenar) {
        cotenar[key].querySelector(".tasks").innerHTML = "";
    }
}

function restCoenters() {
    for (key in countrsEL) {
        countrsEL[key].innerHTML = 0;
    }
}

function searchTasks() {
    restContainers()
    restCoenters()
    let taem = searchInput.value;
    for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].title.toLowerCase().includes(taem.toLowerCase()) ||
            tasksArr[i].category.toLowerCase().includes(taem.toLowerCase())) {
            displayTask(i);
        }
    }
}

function clearForm() {
    statusAnput.value = "nextUp";
    categoryAnput.value = "education";
    titleAnput.value = "";
    descriptionAnput.value = "";
    try {
        addBtn.classList.replace("d-none", "d-block");
        updateBtn.classList.replace("d-block", "d-none");
    } catch (error) {

    }

}

// 
function getTaskInfo(index) {
    showModal()
    abditIndex = index;
    statusAnput.value = tasksArr[index].status;
    categoryAnput.value = tasksArr[index].category;
    titleAnput.value = tasksArr[index].title;
    descriptionAnput.value = tasksArr[index].description;
    addBtn.classList.replace("d-block", "d-none");
    updateBtn.classList.replace("d-none", "d-block");
}

function editTask() {
    tasksArr[abditIndex].status = statusAnput.value;
    tasksArr[abditIndex].category = categoryAnput.value;
    tasksArr[abditIndex].title = titleAnput.value;
    tasksArr[abditIndex].description = descriptionAnput.value;
    setTasksLocal();
    restContainers();
    restCoenters();
    displayAllTasks();

    addBtn.classList.replace("d-none", "d-block");
    updateBtn.classList.replace("d-block", "d-none");

    hideModal();
    clearForm()
}

function valedete(element, regex) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.parentElement.nextElementSibling.classList.replace("d-block", "d-none");
        return true;
    }
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.parentElement.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
}

function generateRandomColor() {
    let color = "#";
    let hexCharsArr = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ];
    for (let i = 1; i <= 6; i++) {
        let random = hexCharsArr[Math.trunc(Math.random() * hexCharsArr.length)];
        color += random;
    }
    return `${color}55`;
}

function changeBgColor(event, index) {
    const newColor = generateRandomColor();
    tasksArr[index].bgColor = newColor;
    setTasksLocal();
    event.target.closest(".task").style.backgroundColor = newColor;
}

function changeMode() {
    if (mode.classList.contains("bi-brightness-high-fill")) {
        root.style.setProperty("--main-black", "#fff")
        root.style.setProperty("--sec-black", "#eee")
        root.style.setProperty("--text-color", "#000")
        mode.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill")
    }else{
        root.style.setProperty("--main-black", "#0d1117")
        root.style.setProperty("--sec-black", "#161b22")
        root.style.setProperty("--text-color", "#a5a6a7")
        mode.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill")
    }
}

function Textarea() {
    if (nam != 0) {
        nam--;
        nambar.innerHTML = nam;
    } else if (nam === 0) {
        nambar.parentElement.classList.add("nonm")
    }
}

// -----------> Events
newTaskbtn.addEventListener("click", showModal)
addBtn.addEventListener("click", addTask)

mode.addEventListener("click", changeMode)

modal.addEventListener("click", function (event) {
    if (event.target.id === "modal") {
        hideModal()
    }
})

document.addEventListener("keyup", function (event) {
    if (event.code === "Escape") {
        hideModal()
    }
})

searchInput.addEventListener("input", searchTasks)

updateBtn.addEventListener("click", editTask)

titleAnput.addEventListener("input", function () {
    valedete(titleAnput, titleRegex)
})

descriptionAnput.addEventListener("input", function () {
    valedete(descriptionAnput, descriptionRegex)
})
descriptionAnput.addEventListener("input", Textarea)