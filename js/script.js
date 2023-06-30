{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const bindRemoveEvents = () => {
    const removeButton = document.querySelectorAll(".js-remove");
    removeButton.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };
  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
  <div class = "${
    task.done && hideDoneTasks ? " list__item--hidden" : ""
  }">        <li class="list__item">
  <button class="list__button list__button--done js-done">${
    task.done ? "✓" : ""
  }</button>
  <span class="list__span ${task.done ? "list__span--done" : ""}">${task.content} </span>
  <button class="list__button list__button--remove js-remove">🗑</button> 
  </li></div>`;
    }
    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const checkAll = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleFinishedTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindButtonsEvents = () => {
    firstButton = document.querySelector(".js-toggleFinished");
    if (firstButton) {
      firstButton.addEventListener("click", () => {
        toggleFinishedTasks();
      });
    }

    secondButton = document.querySelector(".js-checkAll");
    if (secondButton) {
      secondButton.addEventListener("click", () => {
        checkAll();
      });
    }
  };

  const renderButtons = () => {
    let htmlButtons = "";

    if (tasks.length > 0) {
      htmlButtons += `<span ><button class = " section__button js-toggleFinished">${
        hideDoneTasks ? "Pokaż" : "Ukryj"
      } ukończone</button>
      
      <button class = "section__button js-checkAll"${
        tasks.every(({ done }) => done) ? "disabled" : ""
      }>Ukończ wszystkie</button></span>
  `;
    }

    document.querySelector(".js-buttons").innerHTML = htmlButtons;

    bindButtonsEvents();
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    renderButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const inputElement = document.querySelector(".js-newTask");
    const newTaskContent = inputElement.value.trim();
    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      inputElement.value = "";
      inputElement.focus();
    }
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
