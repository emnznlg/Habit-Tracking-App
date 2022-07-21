//Selectors
const habits = document.querySelectorAll(".habit-btn");
const themeBtn = document.querySelector(".theme");
const body = document.querySelector("body");
const root = document.querySelector(":root");
const modalContainer = document.querySelector(".modal-container");
const createHabitBtn = document.querySelector(".new-habit__add");
const habitContainer = document.querySelector(".habit-container");
const newHabitTitle = document.querySelector("#title");
const icons = document.querySelectorAll(".icon");
const addBtn = document.querySelector("#add-btn");
const cancelBtn = document.querySelector("#cancel-btn");

let habitObject = {};

//Functions

function theme() {
  themeBtn.classList.toggle("dark");
  root.classList.toggle("dark");
  themeBtn.classList.contains("dark") ? saveTheme("dark") : saveTheme("light");
}

function checkTheme() {
  return localStorage.getItem("themeColor");
}

function saveTheme(value) {
  localStorage.setItem("themeColor", `${value}`);
}

function saveHabitsToLocalStorage(habitObj) {
  let habits;
  if (localStorage.getItem("habits") === null) {
    habits = [];
  } else {
    habits = JSON.parse(localStorage.getItem("habits"));
  }

  habits.push(habitObj);
  localStorage.setItem("habits", JSON.stringify(habits));
}

function getHabitsFromLocalStorage() {
  let habits;
  if (localStorage.getItem("habits") === null) {
    habits = [];
  } else {
    habits = JSON.parse(localStorage.getItem("habits"));
  }

  habits.forEach((habit) => {
    const habitDiv = document.createElement("div");
    habitDiv.classList.add("habit");
    habitDiv.innerHTML = `
        <button class="habit-btn" data-id="${habit.id}" data-completed="${habit.completed}" data-title="${habit.title}">
          ${habit.icon}
        </button>
  `;
    habitContainer.insertAdjacentElement("beforeend", habitDiv);
  });
}

function openModal() {
  modalContainer.classList.add("active");
  modalContainer.setAttribute("aria-hidden", "false");
  newHabitTitle.focus();
}

function closeModal() {
  modalContainer.classList.remove("active");
  modalContainer.setAttribute("aria-hidden", "true");
  newHabitTitle.value = "";
  icons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}

function addNewHabit(title, icon, ID, completed) {
  const habitDiv = document.createElement("div");
  habitDiv.classList.add("habit");
  habitDiv.innerHTML = `
        <button class="habit-btn" data-completed=${completed} data-id="${ID}" data-title="${title}">
          ${icon}
        </button>
  `;
  habitContainer.insertAdjacentElement("beforeend", habitDiv);
  habitObject = {
    title: title,
    icon: icon,
    id: ID,
    completed: false,
  };
  saveHabitsToLocalStorage(habitObject);
  console.log(icon);
}

//Event Listeners
themeBtn.addEventListener("click", theme);

habitContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("habit-btn")) return;
  e.target.classList.toggle("completed");
});

document.addEventListener("DOMContentLoaded", function () {
  const themeColor = checkTheme();
  if (themeColor === "dark") {
    theme();
  }
  getHabitsFromLocalStorage();
});

createHabitBtn.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icons.forEach((icon) => {
      icon.classList.remove("selected");
    });
    icon.classList.add("selected");
  });
});

addBtn.addEventListener("click", () => {
  const habitTitle = newHabitTitle.value;
  let habitIcon;
  icons.forEach((icon) => {
    if (!icon.classList.contains("selected")) return;
    habitIcon = icon.innerHTML;
  });
  const habitID = Math.random();
  let habit = {
    title: habitTitle,
    icon: habitIcon,
    id: habitID,
    completed: false,
  };
  addNewHabit(habitTitle, habitIcon, habitID, habit.completed);
  closeModal();
});

window.addEventListener("click", (e) => {
  if (modalContainer.classList.contains("active")) {
    if (e.target.classList.contains("modal-container")) {
      closeModal();
    }
  }
});
