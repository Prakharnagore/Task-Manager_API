# Task-Manager_API
create .env file 
MONGO_URI= {your access key}





BASE ROUTE - **YOUR-LOCAL-HOST**/api/v1/tasks

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
