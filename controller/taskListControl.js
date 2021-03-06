const TaskList = require("../models/TaskList");
const shortid = require("shortid");
const { formatResponse } = require("../library/formatResponse");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");
const User = require("../models/User");
const EXCLUDE = "-__v -_id";
const Historic_TaskList = require("../models/Historic_TaskList");
const MemoryTable = require("../models/MemoryTable");
const Historic_Task = require("../models/Historic_Task");
/**Check for valid userId */
const validUserId = async (userId) => {
  ////console.log("validate UserId:", userId);
  let validuserId = await User.findOne({ userId: userId });
  return !validuserId
    ? formatResponse(true, 404, "UserId Not Found", userId)
    : true;
};
/**Check for valid taskListId */
const validTaskListId = async (taskListId) => {
  ////console.log("validate tasklist id:", taskListId);
  let validTaskListId = await TaskList.findOne({ taskListId: taskListId });
  return !validTaskListId
    ? formatResponse(true, 404, "TaskListId Not Found", taskListId)
    : true;
};
/**check for valid taskId */
const validTaskId = async (taskId) => {
  //console.log("validate taskid::", taskId);
  let validtaskId = await Task.findOne({ taskId: taskId });
  return !validtaskId
    ? formatResponse(true, 404, "TaskId Not Found", taskId)
    : true;
};
exports.createTaskList = async (req, res) => {
  //console.log("Task List control");
  const { name, userId } = req.body;
  /**Verify userId */
  let isUserIdValid = await validUserId(userId);
  //console.log("isUserIdValid::", isUserIdValid);
  if (isUserIdValid.error)
    return res.status(isUserIdValid.status).json(isUserIdValid);
  /**Check for existing task name */
  let nameExists = await TaskList.findOne({ name: name, userId: userId });
  if (nameExists)
    return res
      .status(400)
      .json(formatResponse(true, 400, "Task Name already exists", name));

  /**create a new tasklist unique to a userId */
  let uniqueTaskListId = shortid.generate();
  let newList = new TaskList({
    name: name,
    userId: userId,
    taskListId: uniqueTaskListId,
  });
  /**historic tasklist schema */
  let createdTimeStamp = Date.now();
  let updateId = `${userId}:${uniqueTaskListId}:${createdTimeStamp}`;
  let newHistoricSchema = new Historic_TaskList({
    updateId: updateId,
    name: name,
    taskListId: uniqueTaskListId,
    userId: userId,
    operation: "create",
    createdOn: createdTimeStamp,
  });
  /**memory table updates */
  let memory = new MemoryTable({
    userId: userId,
    entity: "TaskList",
    updatedOn: createdTimeStamp,
    updateId: updateId,
    operation: "create",
  });
  //console.log("history-schema:;", newHistoricSchema);
  TaskList.create(newList, (error, createdList) => {
    //console.log("error", error, createdList);
    if (error !== null) {
      console.error("Error Creating TaskList:", error);
      res
        .status(500)
        .json(formatResponse(true, 500, "Task List Create Error", error));
    } else {
      let response = createdList.toObject();
      delete response.__v;
      delete response._id;
      res
        .status(200)
        .json(formatResponse(false, 200, "Task List Created", response));
    }
  });
  /**maintain history */
  let createdTaskListHistory = await Historic_TaskList.create(
    newHistoricSchema
  );
  let memorySnapShot = await MemoryTable.create(memory);
  console.log(
    "HISTORY UPDATED____",
    createdTaskListHistory.updateId,
    memorySnapShot.updateId
  );
};
exports.getAllTaskList = async (req, res) => {
  //console.log("get all task list control");
  const { userId } = req.body;
  const { skip } = req.query;

  /**Verify userId */
  let isUserIdValid = await validUserId(userId);
  ////console.log("isUserIdValid::", isUserIdValid);
  if (isUserIdValid.error)
    return res.status(isUserIdValid.status).json(isUserIdValid);

  /**fetch all task list for the userid */
  /**skip and limit are used for pagination purpose */
  TaskList.find({ userId: userId })
    .select(EXCLUDE)
    .lean(parseInt(skip, 10) || 0)
    .limit(5)
    .exec((error, allList) => {
      // //console.log("error", error, allList);
      if (error !== null) {
        res
          .status(500)
          .json(
            formatResponse(true, 500, "Error Fetching TaskLists", error.message)
          );
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Task List Fetched", allList));
      }
    });
};
exports.createTask = async (req, res) => {
  //console.log("create task control");
  const { name, userId, taskListId, status } = req.body;

  /**verify taskListId */
  let isTaskListValid = await validTaskListId(taskListId);
  // //console.log("isTaskListValid::", isTaskListValid);
  if (isTaskListValid.error)
    return res.status(isTaskListValid.status).json(isTaskListValid);

  /**Verify userId */
  let isUserIdValid = await validUserId(userId);
  ////console.log("isUserIdValid::", isUserIdValid);
  if (isUserIdValid.error)
    return res.status(isUserIdValid.status).json(isUserIdValid);

  /**check for existing name */
  let taskNameExists = await Task.findOne({
    name: name,
    taskListId: taskListId,
    userId: userId,
  });
  if (taskNameExists)
    return res
      .status(400)
      .json(formatResponse(true, 400, "Task Name Exists", name));

  /**Create new task */
  let uniqueTaskId = shortid.generate();
  let createdTimeStamp = Date.now();
  let updateId = `${userId}:${uniqueTaskId}:${createdTimeStamp}`;
  /**task schema */
  let newTask = new Task({
    name: name,
    taskId: uniqueTaskId,
    taskListId: taskListId,
    userId: userId,
    status: status,
    createdOn: createdTimeStamp,
  });
  /**historic task schema */
  let newHistoricSchema = new Historic_Task({
    updateId: updateId,
    name: name,
    taskId: uniqueTaskId,
    taskListId: taskListId,
    userId: userId,
    status: status,
    operation: "create",
    createdOn: createdTimeStamp,
  });
  /**memory table schema */
  let memory = new MemoryTable({
    userId: userId,
    entity: "Task",
    updatedOn: createdTimeStamp,
    updateId: updateId,
    operation: "create",
  });
  //console.log("history-schema:;", newHistoricSchema);
  Task.create(newTask, (error, createdTask) => {
    //console.log("error", error, createdTask);
    if (error !== null) {
      res
        .status(500)
        .json(formatResponse(true, 500, "Error creating Task", error));
    } else {
      let response = createdTask.toObject();
      delete response._id;
      delete response.__v;
      res
        .status(200)
        .json(formatResponse(false, 200, "Task Created", response));
    }
  });
  /**maintain history */
  let createdTaskHistory = await Historic_Task.create(newHistoricSchema);
  let memorySnapShot = await MemoryTable.create(memory);
  console.log(
    "HISTORY UPDATED____",
    createdTaskHistory.updateId,
    memorySnapShot.updateId
  );
};
exports.getAllTasks = async (req, res) => {
  //console.log("get all tasks control");
  const { taskListId, userId } = req.body;

  /**verify taskListId */
  let isTaskListValid = await validTaskListId(taskListId);
  //console.log("isTaskListValid::", isTaskListValid);
  if (isTaskListValid.error)
    return res.status(isTaskListValid.status).json(isTaskListValid);

  /**Verify userId */
  let isUserIdValid = await validUserId(userId);
  //console.log("isUserIdValid::", isUserIdValid);
  if (isUserIdValid.error)
    return res.status(isUserIdValid.status).json(isUserIdValid);

  /**fetch all tasks realated to listId and UserId */
  let query = { taskListId: taskListId, userId: userId };
  Task.find(query)
    .select(EXCLUDE)
    .lean()
    .exec((error, allTasks) => {
      //console.log("error", error, allTasks);
      if (error !== null) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Error Fetching Tasks", error));
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Fetched Tasks", allTasks));
      }
    });
};
exports.updateTaskList = async (req, res) => {
  //console.log("Update task list control:");
  const { update, taskListId, operation, userId } = req.body;
  //console.log(update, taskListId, operation);

  /**verify taskListId */
  let isTaskListValid = await validTaskListId(taskListId);
  //console.log("isTaskListValid::", isTaskListValid);
  if (isTaskListValid.error)
    return res.status(isTaskListValid.status).json(isTaskListValid);

  /**Verify userId */
  let isUserIdValid = await validUserId(userId);
  //console.log("isUserIdValid::", isUserIdValid);
  if (isUserIdValid.error)
    return res.status(isUserIdValid.status).json(isUserIdValid);

  /**based on operation value */
  if (operation === "edit") {
    //Update lastlist name
    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json(
          formatResponse(true, 400, "Noting to update", "pass valid property")
        );
    } else {
      let query = { taskListId: taskListId, userId: userId };
      TaskList.updateOne(query, update, (error, updatedList) => {
        //console.log("updated list::", error, updatedList);
        if (error !== null) {
          res
            .status(500)
            .json(formatResponse(true, 500, "TaskList Update Error", null));
        } else {
          let { n } = updatedList;
          //console.log("Updated--", n);
          res
            .status(200)
            .json(
              formatResponse(false, 200, "TaskList Updated", `${n}-doc updated`)
            );
        }
      });
      /**maintain history */
      let uniqueTaskListId = taskListId;
      let createdTimeStamp = Date.now();
      let updateId = `${userId}:${uniqueTaskListId}:${createdTimeStamp}`;
      /**historic task schema */
      let newHistoricSchema = new Historic_TaskList({
        updateId: updateId,
        name: update.name,
        taskListId: uniqueTaskListId,
        userId: userId,
        operation: operation,
        createdOn: createdTimeStamp,
      });
      /**memory table schema */
      let memory = new MemoryTable({
        userId: userId,
        entity: "TaskList",
        updatedOn: createdTimeStamp,
        updateId: updateId,
        operation: operation,
      });
      //console.log("history-schema:;", newHistoricSchema);
      /**maintain history */
      let createdTaskHistory = await Historic_TaskList.create(
        newHistoricSchema
      );
      let memorySnapShot = await MemoryTable.create(memory);
      console.log(
        "HISTORY UPDATED____",
        createdTaskHistory.updateId,
        memorySnapShot.updateId
      );
    }
  }
  if (operation === "delete") {
    //console.log("delete task and related task and subtasks");
    let query = { taskListId: taskListId, userId: userId };
    /**maintain history before delete*/
    /**get info about tasklist being deleted */
    let toBeDeletedTaskList = await TaskList.findOne({
      taskListId: taskListId,
    });
    let uniqueTaskListId = taskListId;
    let createdTimeStamp = Date.now();
    let updateId = `${userId}:${uniqueTaskListId}:${createdTimeStamp}`;
    /**historic task schema */
    let newHistoricSchema = new Historic_TaskList({
      updateId: updateId,
      name: toBeDeletedTaskList.name,
      taskListId: uniqueTaskListId,
      userId: userId,
      operation: operation,
      createdOn: createdTimeStamp,
    });
    /**memory table schema */
    let memory = new MemoryTable({
      userId: userId,
      entity: "TaskList",
      updatedOn: createdTimeStamp,
      updateId: updateId,
      operation: operation,
    });
    console.log("history-schema:;", newHistoricSchema);
    /**maintain history */
    let createdTaskHistory = await Historic_TaskList.create(newHistoricSchema);
    let memorySnapShot = await MemoryTable.create(memory);
    console.log(
      "HISTORY UPDATED____",
      createdTaskHistory.updateId,
      memorySnapShot.updateId
    );
    /**find taskId and to delete it's subtasks */
    //console.log("Fetching task ids for userid and taskList Id");
    let taskDetails = await Task.find(query).select("taskId").lean().exec();
    let taskIdsArray = [];
    //console.log("taskDetails::", taskDetails);
    taskDetails.map((task) => taskIdsArray.push(task.taskId));
    //console.log("TasksIds::", taskIdsArray);

    /**delete subtasks based on taskid */
    //console.log("Deleting subtasks based on fetched taskId");
    taskIdsArray.map((task) =>
      SubTask.deleteMany({ taskId: task.taskId }, (error, deleted) => {
        if (error !== null) {
          //console.log("Error deleting SubTasks::", error);
        } else {
          let { n } = deleted;
          //console.log("Subtask Delted::", `${n}-docs deleted`);
        }
      })
    );
    /**delete tasks based on userid and taskListID */
    //console.log("sub tasks deleted now deleting tasks");
    let deletedTask = await Task.deleteMany(query);
    console.log(
      "Deleted task before deleting tasklist::",
      deletedTask.n + "-docs deleted"
    );
    /**delete taskList */
    //console.log("Dependencies deleted ,now delete tasklist");
    TaskList.deleteOne(query, (error, deletedList) => {
      //console.log("Error-deleted::", error, deletedList);
      if (error != null) {
        res
          .status(500)
          .json(formatResponse(true, 500, "TaskLIst Delete Error", error));
      } else {
        let { n } = deletedList;
        res
          .status(200)
          .json(
            formatResponse(false, 200, "TaskList deleted", `${n}-docs deleted`)
          );
      }
    });
  }
  /**memory snapshots updates */
};
