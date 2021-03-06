const tasksList = {

  deletedTask: false,

  init: function() {
    tasksList.loadTasksFromAPI();
  },

  // ---------------------------------------------------------
  // Binders
  // ---------------------------------------------------------

  bindAllTasksEvents: function() {
    // catching all the tasks of the list
    const tasksElements = document.querySelectorAll(".tasks .task");
    // applying binders on all elements
    for (const taskElement of tasksElements) {
      task.bindSingleTaskEvents(taskElement);
    }
  },

  // ---------------------------------------------------------
  // DOM
  // ---------------------------------------------------------

  // adding a new task on the taskList
  insertTaskIntoTasksList: function(newTaskElement, boolean) {
    const tasksListElement = document.querySelector(".tasks");
    // adding the task at the top of the list
    tasksListElement.prepend(newTaskElement);

    if (boolean == true) {
      let allTasks = document.querySelectorAll(".task--todo, .task--complete, .task--archive");
      for (const task of allTasks) {
        if (task.id != "task-template") {
          task.remove();
        }
      }

      tasksList.loadTasksFromAPI();

      allTasks = document.querySelectorAll(".task--todo, .task--complete");
      for (const task of allTasks) {
          task.style.display="block";
        }
    };
  },

  // ---------------------------------------------------------
  // AJAX
  // ---------------------------------------------------------

  loadTasksFromAPI: function() {

    let myInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // client can accept json
                'Content-Type': 'application/json', // client can send json
            },
        };

    fetch(app.apiRootUrl + "/tasks/list", myInit) // we send the request
    .then(
      function(response) { // we recieve a json response
        return response.json(); // we catch the json and send a new promise
      }
    )
    .then(
      function(jsonData) { // we definitly catch the json datas

        for (const singleTask of jsonData) {
          // creating all tasks one by one with the method task.createTaskElement()
          const taskElement = task.createTaskElement(singleTask.title, singleTask.category.name, singleTask.id, singleTask.completion);
          tasksList.insertTaskIntoTasksList(taskElement, false);

          if (singleTask.status === 2) {
            let taskElementById = document.querySelector("[data-id='" +  singleTask.id + "']");
            taskElementById.classList.remove('task--todo');
            taskElementById.classList.add('task--archive');
            if (tasksList.deletedTask == false) {
              taskElementById.style.display = "none";
            } else {
              taskElementById.style.display = "block";
              tasksList.deletedTask = false;
            }
          }
        }
        const templateElement = document.querySelector("#task-template");
        templateElement.style.display="none";
      }
    );
  },
}