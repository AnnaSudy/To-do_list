{
    const tasks = [
        {
            content: "ukończyć moduł 6",
            done: false,
        },
        {
            content: "zrobić obiad",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButton = document.querySelectorAll(".js-remove");
        removeButton.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class=list__item>
               <button class="list__button list__button--done js-done">${task.done ? "✓" : ""
                }</button>
               <span class="${task.done ? "list__span--done" : ""}">${task.content
                } </span>
               <button class="list__button list__button--remove js-remove"></button> 
        </li> <hr>`;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }
        inputElement.value = "";
        inputElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}