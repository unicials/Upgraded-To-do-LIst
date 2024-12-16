const triggerImages = document.querySelectorAll(".trigger-image");

const closeButtons = document.querySelectorAll(".close");

triggerImages.forEach((image) => {
    image.addEventListener("click", () => {
        const modalId = image.getAttribute("data-modal-id");
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        loadTasks(modalId);
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
    });
});

window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

function addTask(modalId) {
    const inputBox = document.getElementById(`input-box${modalId.slice(-1)}`);
    const listContainer = document.getElementById(`list-container${modalId.slice(-1)}`);

    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        li.appendChild(span);
        listContainer.appendChild(li);

        inputBox.value = "";

        saveData(modalId);
    }
}

document.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(e.target.closest(".modal").id);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(e.target.closest(".modal").id);
    }
}, false);

function saveData(modalId) {
    const listContainer = document.getElementById(`list-container${modalId.slice(-1)}`);
    localStorage.setItem(modalId, listContainer.innerHTML);
}

function loadTasks(modalId) {
    const listContainer = document.getElementById(`list-container${modalId.slice(-1)}`);
    listContainer.innerHTML = localStorage.getItem(modalId) || '';
}

window.addEventListener('load', () => {
    const modalIds = ['modal1', 'modal2', 'modal3', 'modal4', 'modal5', 'modal6'];
    modalIds.forEach(modalId => loadTasks(modalId));
});

function getAllTasks() {
  const tasks = [];
  const modals = document.querySelectorAll(".modal");
  
  modals.forEach((modal, index) => {
      const listId = `list-container${index + 1}`;
      const taskList = document.getElementById(listId);

      if (taskList) {
          const taskItems = taskList.querySelectorAll("li");
          taskItems.forEach((taskItem) => {
              tasks.push(taskItem.textContent.trim());
          });
      }
  });

  return tasks;
}

function searchTasks(input) {
  const suggestionsList = document.getElementById("suggestions-list");
  suggestionsList.innerHTML = "";
  suggestionsList.style.display = "none";

  if (input.trim().length > 0) {
      const allTasks = getAllTasks();
      const filteredTasks = allTasks.filter((task) =>
          task.toLowerCase().includes(input.toLowerCase())
      );

      if (filteredTasks.length > 0) {
          filteredTasks.forEach((task) => {
              const li = document.createElement("li");
              li.textContent = task;
              li.onclick = () => selectTask(task);
              suggestionsList.appendChild(li);
          });
          suggestionsList.style.display = "block";
      }
  }
}

function selectTask(task) {
  document.querySelector(".search-input").value = task;
  document.getElementById("suggestions-list").style.display = "none";
}
