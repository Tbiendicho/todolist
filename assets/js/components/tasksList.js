const tasksList = {

  init: function() {
    console.log("tasksList.init() appelé");
    tasksList.loadTasksFromAPI();
  },

  // ---------------------------------------------------------
  // Binders
  // ---------------------------------------------------------

  bindAllTasksEvents: function() {
    // récupère toutes les tâches de la liste
    const tasksElements = document.querySelectorAll(".tasks .task");
    // boucle sur chaque tâche de la liste
    for (const taskElement of tasksElements) {
      // dans la boucle, appelle task.bindSingleTaskEvents(taskElement) pour chaque tâche
      task.bindSingleTaskEvents(taskElement);
    }
  },

  // ---------------------------------------------------------
  // DOM
  // ---------------------------------------------------------

  // adding a new task on the taskList
  insertTaskIntoTasksList: function(newTaskElement) {
    const tasksListElement = document.querySelector(".tasks");
    // adding the task at the top of the list
    tasksListElement.prepend(newTaskElement);
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
          tasksList.insertTaskIntoTasksList(taskElement);

          if (singleTask.status === 2) {
            let taskElementById = document.querySelector("[data-id='" +  singleTask.id + "']");
            taskElementById.classList.remove('task--todo');
            taskElementById.classList.add('task--archive');
            taskElementById.style.display = "none";
          }
        }
      }
    );
  },
}