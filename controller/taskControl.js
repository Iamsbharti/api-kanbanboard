const TaskList = require("../models/TaskList");
const shortid = require("shortid");
const { formatResponse } = require("../library/formatResponse");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");
const User = require("../models/User");
const EXCLUDE = "-__v -_id";
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
  //console.log("isUserIdValid::", isUserIdValid);
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
exports.updateTask = async (req, res) => {
  //console.log("Update task control::");
  const { taskListId, userId, taskId, update, operation } = req.body;
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

  /**check for valid taskId */
  let isTaskIdValid = await validTaskId(taskId);
  //console.log("isTaskIdValid::", isTaskIdValid);
  if (isTaskIdValid.error)
    return res.status(isTaskIdValid.status).json(isTaskIdValid);

  let query = { taskListId: taskListId, userId: userId, taskId: taskId };
  if (operation === "edit") {
    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json(
          formatResponse(true, 400, "Noting to update", "pass valid property")
        );
    } else {
      //console.log("Final update option::", update);
      Task.updateOne(query, update, (error, updatedTask) => {
        if (error !== null) {
          res
            .status(500)
            .json(formatResponse(true, 500, "Error Updating Task", error));
        } else {
          let { n } = updatedTask;
          res
            .status(200)
            .json(
              formatResponse(false, 200, "Task Updated", `${n}-doc updated`)
            );
        }
      });
      /**maintain history */
      let uniqueTaskId = taskId;
      let createdTimeStamp = Date.now();
      let updateId = `${userId}:${uniqueTaskId}:${createdTimeStamp}`;
      /**historic task schema */
      let newHistoricSchema = new Historic_Task({
        updateId: updateId,
        name: update.name,
        status: update.status,
        taskId: uniqueTaskId,
        taskListId: taskListId,
        userId: userId,
        operation: "edit",
        createdOn: createdTimeStamp,
      });
      /**memory table schema */
      let memory = new MemoryTable({
        userId: userId,
        entity: "Task",
        updatedOn: createdTimeStamp,
        updateId: updateId,
        operation: "edit",
      });
      console.log("history-schema:;", newHistoricSchema);
      /**maintain history */
      let createdTaskHistory = await Historic_Task.create(newHistoricSchema);
      let memorySnapShot = await MemoryTable.create(memory);
      console.log(
        "HISTORY UPDATED____",
        createdTaskHistory.updateId,
        memorySnapShot.updateId
      );
    }
  }
  if (operation === "delete") {
    //console.log("Delete task");
    /**maintain history */
    /**get info about task being deleted */
    let toBeDeletedTask = await Task.findOne({
      taskId: taskId,
    });
    let uniqueTaskId = taskId;
    let createdTimeStamp = Date.now();
    let updateId = `${userId}:${uniqueTaskId}:${createdTimeStamp}`;
    /**historic task schema */
    let newHistoricSchema = new Historic_Task({
      updateId: updateId,
      name: toBeDeletedTask.name,
      status: toBeDeletedTask.status,
      taskId: uniqueTaskId,
      taskListId: toBeDeletedTask.taskListId,
      userId: userId,
      operation: operation,
      createdOn: createdTimeStamp,
    });
    /**memory table schema */
    let memory = new MemoryTable({
      userId: userId,
      entity: "Task",
      updatedOn: createdTimeStamp,
      updateId: updateId,
      operation: operation,
    });
    console.log("history-schema:;", newHistoricSchema);
    /**maintain history and memory map*/
    let createdTaskHistory = await Historic_Task.create(newHistoricSchema);
    let memorySnapShot = await MemoryTable.create(memory);
    console.log(
      "HISTORY UPDATED____",
      createdTaskHistory.updateId,
      memorySnapShot.updateId
    );
    /**delete/cleanup subsequent subtasks */
    let deletedSubTasks = await SubTask.deleteMany({ taskId: taskId });
    deletedSubTasks &&
      Task.deleteOne(query, (error, deletedTask) => {
        if (error !== null) {
          res
            .status(500)
            .json(formatResponse(true, 500, "Error Deleting Task", error));
        } else {
          let { n } = deletedTask;
          res
            .status(200)
            .json(
              formatResponse(false, 200, "Task Deleted", `${n}-doc deleted`)
            );
        }
      });
  }
};
