const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let ascendingSort = true;
let taskInput = document.querySelector("#task");
let addTaskButton = document.querySelector("#addTask");
let taskListContainer = document.querySelector(".task-list-container");
let imageDelete = document.querySelector(".delete-li");
let imageSort = document.querySelector(".sortImage");
let appInput = document.querySelector(".app__input");

//Sort fuctionality
imageSort.addEventListener("mouseover", (event) => {
  event.target.src = "./Images/down.svg";
});
imageSort.addEventListener("mouseleave", (event) => {
  event.target.src = "./Images/downCL.svg";
});

let flag = true;
imageSort.addEventListener("click", (e) => {
  if (flag == true) {
    imageSort.src = "./Images/top.svg";
    imageSort.addEventListener("mouseleave", (event) => {
      event.target.src = "./Images/topCL.svg";
    });
    imageSort.addEventListener("mouseover", (event) => {
      event.target.src = "./Images/top.svg";
    });
    flag = !flag;
  } else {
    imageSort.src = "./Images/down.svg";
    imageSort.addEventListener("mouseleave", (event) => {
      event.target.src = "./Images/downCL.svg";
    });
    imageSort.addEventListener("mouseover", (event) => {
      event.target.src = "./Images/down.svg";
    });
    flag = !flag;
  }
});

// Function to display tasks
function displayTasks() {
  if (tasks.length > 0) {
    taskListContainer.style.display = "block";
  } else {
    taskListContainer.style.display = "none";
  }

  const tasksList = document.getElementById("tasks");
  tasksList.innerHTML = "";
  let say = 1;
  for (const task of tasks) {
    const li = document.createElement("li");
    let photo = document.createElement("img");
    photo.alt = "delete button";
    photo.src = "./Images/xCL.svg";

    if (tasksList.childElementCount !== 0) {
      li.style.marginTop = "20px";
    }

    photo.classList.add("delete-image");
    li.classList.add("scroll");
    li.innerHTML = `${say}.${task}`;

    say++;
    photo.addEventListener("mouseover", (event) => {
      event.target.src = "./Images/x.svg";
    });
    photo.addEventListener("mouseleave", (event) => {
      event.target.src = "./Images/xCL.svg";
    });
    photo.addEventListener("click", () => {
      removeTask(task);
    });
    tasksList.appendChild(li);
    li.append(photo);
  }
}

// Event listener for adding task
function addTaks() {
  let checkValue = taskInput.value;
  if (checkValue.trim() !== "") {
    const taskText = taskInput.value.trim();
    tasks.push(taskText);
    taskInput.value = "";
    displayTasks();
    appInput.style.display = "none";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    appInput.style.display = "block";
  }
}

addTaskButton.addEventListener("click", addTaks);

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTaks();
  }
});

// Function to remove task
function removeTask(task) {
  const taskIndex = tasks.indexOf(task);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    displayTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function toggleSortOrder() {
  if (ascendingSort) {
    tasks.sort();
  } else {
    tasks.sort().reverse();
  }
  ascendingSort = !ascendingSort;
  displayTasks();
}

//display of tasks
displayTasks();
