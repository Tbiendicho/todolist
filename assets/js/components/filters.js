const filters = {

    showarchivedTasks: false,

    init: function () {

        // Binders

        const filterElement = document.querySelector('.filters__task.filters__task--archived');
        filterElement.addEventListener('click', filters.handleFilterTasks);

        const filterChoiceElement = document.querySelectorAll('.filters__task--completion__select');
        for (currentFilterChoice of filterChoiceElement) {
            currentFilterChoice.addEventListener('change', filters.handleFilterChoice);
        }

        filterCategoryElement = document.querySelector('.filters__task__select');
        filterCategoryElement.addEventListener('change', filters.handleFilterCategory);

    },

    // this method will show archived or unarchived tasks
    handleFilterTasks: function () {

        const tasksToDoElement = document.querySelectorAll('.task--todo, .task--complete');
        const tasksArchivedElement = document.querySelectorAll('.task--archive');

        if (filters.showarchivedTasks === false) {

            for (const task of tasksToDoElement) {
                if (task.id != "task-template") {
                    task.style.display = "none";
                }
            }

            for (const task of tasksArchivedElement) {
                task.style.display = "block";
            }

        } else {

            for (const task of tasksArchivedElement) {
                task.style.display = "none";
            }

            for (const task of tasksToDoElement) {
                if (task.id != "task-template") {
                    task.style.display = "block";
                }
            }
        }

        filters.showarchivedTasks = !filters.showarchivedTasks;

    },

    // this method will show completed or active tasks
    handleFilterChoice: function (evt) {
        
        const completionIndex = (evt.currentTarget.selectedIndex);

        const tasksArchivedElement = document.querySelectorAll('.task--archive');
        for (const task of tasksArchivedElement) {
            task.style.display = "none";
        }

        // here, 0 = all, 1 = complete and 2 = incomplete
        if (completionIndex == 2) {
            tasksToDo = document.querySelectorAll('.task--todo');
            for (currentTaskToDo of tasksToDo) {
                currentTaskToDo.style.display = "none";
            }
            tasksCompleted = document.querySelectorAll('.task--complete');
            for (currentTaskCompleted of tasksCompleted) {
                currentTaskCompleted.style.display = "block";
            }
            filters.showarchivedTasks = false;
        } else if (completionIndex == 1) {
            tasksCompleted = document.querySelectorAll('.task--complete');
            for (currentTaskCompleted of tasksCompleted) {
                currentTaskCompleted.style.display = "none";
            }
            tasksToDo = document.querySelectorAll('.task--todo');
            for (currentTaskToDo of tasksToDo) {
                if (currentTaskToDo.id != "task-template") {
                    currentTaskToDo.style.display = "block";
                }
            }
            filters.showarchivedTasks = false;
        } else if (completionIndex == 0){
            allTasks = document.querySelectorAll('.task');
            for (currentTask of allTasks) {
                if (currentTask.id != "task-template" && !currentTask.classList.contains('task--archive')) {
                    currentTask.style.display = "block";
                }
            }
            filters.showarchivedTasks = false;
        }
        
    },

    // this method will sort and show tasks by their categories
    handleFilterCategory: function (evt) {

        const categoryIndex = (evt.currentTarget.selectedIndex);
        const chosenCategory = categoriesList.categoriesList[categoryIndex];
        const allTasks = document.querySelectorAll('.task');
        for (currentTask of allTasks) {
            if (currentTask.id != "task-template") {
            currentTask.style.display = "block";
            }

            if (chosenCategory != "Toutes") {
                if (currentTask.dataset.category != chosenCategory && !currentTask.classList.contains('task--add')) {
                    currentTask.style.display = "none";
                }
            };
            if (currentTask.classList.contains('task--archive')) {
                currentTask.style.display = "none";
            };
        }
    }
}