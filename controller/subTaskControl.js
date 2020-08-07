const shortid = require("shortid");
const { formatResponse } = require("../library/formatResponse");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");
const EXCLUDE = "-__v -_id";
const MemoryTable = require("../models/MemoryTable");
const Historic_SubTask = require("../models/Historic_SubTask");

/**check for valid taskId */
const validTaskId = async (taskId) => {
  //console.log("validate taskid::", taskId);
  let validtaskId = await Task.findOne({ taskId: taskId });
  return !validtaskId
    ? formatResponse(true, 404, "TaskId Not Found", taskId)
    : true;
};

exports.createSubTask = async (req, res) => {
  console.log("Create subtask control");
  const { name, taskId, status, userId } = req.body;

  /**check for valid taskId */
  let isTaskIdValid = await validTaskId(taskId);
  //console.log("isTaskIdValid::", isTaskIdValid);
  if (isTaskIdValid.error)
    return res.status(isTaskIdValid.status).json(isTaskIdValid);

  /**Check for existing subtask name */
  let subTaskExists = await SubTask.findOne({ name: name, taskId: taskId });
  if (subTaskExists)
    return res
      .status(400)
      .json(formatResponse(true, 400, "Sub Task Name Exists", name));

  /**Create new subtask */
  let uniqueSubTaskId = shortid.generate();
  let createdTimeStamp = Date.now();
  let updateId = `${userId}:${uniqueSubTaskId}:${createdTimeStamp}`;
  /**subtask schema */
  let newSubTask = new SubTask({
    name: name,
    subTaskId: uniqueSubTaskId,
    taskId: taskId,
    status: status,
    userId: userId,
  });
  /**historic subtask schema */
  let newHistoricSchema = new Historic_SubTask({
    updateId: updateId,
    name: name,
    subTaskId: uniqueSubTaskId,
    status: status,
    userId: userId,
    taskId: taskId,
    operation: "create",
    createdOn: createdTimeStamp,
  });
  /**memory table schema */
  let memory = new MemoryTable({
    userId: userId,
    entity: "SubTask",
    updatedOn: createdTimeStamp,
    updateId: updateId,
    operation: "create",
  });
  //console.log("history-schema:;", newHistoricSchema);

  SubTask.create(newSubTask, (error, createdSubTask) => {
    console.error("Error Creating SubTask", error);
    if (error !== null) {
      res
        .status(500)
        .json(formatResponse(true, 500, "SubTask Creation Error", error));
    } else {
      console.log("SubTask Create Success");
      let response = createdSubTask.toObject();
      delete response._id;
      delete response.__v;
      res
        .status(200)
        .json(formatResponse(false, 200, "Sub Task Created", response));
    }
  });
  /**maintain history */
  let createdTaskHistory = await Historic_SubTask.create(newHistoricSchema);
  let memorySnapShot = await MemoryTable.create(memory);
  console.log(
    "HISTORY UPDATED____",
    createdTaskHistory.updateId,
    memorySnapShot.updateId
  );
};
exports.getSubTasks = async (req, res) => {
  console.log("get all subtasks control");
  const { taskId } = req.body;

  /**check for valid taskId */
  let isTaskIdValid = await validTaskId(taskId);
  //console.log("isTaskIdValid::", isTaskIdValid);
  if (isTaskIdValid.error)
    return res.status(isTaskIdValid.status).json(isTaskIdValid);

  /**fetch all subtasks for a taskid */
  SubTask.find({ taskId: taskId })
    .select(EXCLUDE)
    .lean()
    .exec((error, allsubTasks) => {
      console.log("error getting subtasks", error);
      if (error !== null) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Error Fetching Subtasks", error));
      } else {
        console.log("Fetch SubTask Success");
        res
          .status(200)
          .json(formatResponse(false, 200, "Fetched Subtasks", allsubTasks));
      }
    });
};
exports.updateSubTask = async (req, res) => {
  console.log("Update sub task control::");
  const { subTaskId, taskId, update, operation, userId } = req.body;
  /**----Sanity check--------------- */
  /**check for valid taskId */
  let isTaskIdValid = await validTaskId(taskId);
  //console.log("isTaskIdValid::", isTaskIdValid);
  if (isTaskIdValid.error)
    return res.status(isTaskIdValid.status).json(isTaskIdValid);
  /**check for valid subtaskid */
  let subTaskExists = await SubTask.findOne({ subTaskId: subTaskId });
  if (!subTaskExists) {
    return res
      .status(404)
      .json(formatResponse(true, 404, "SubTask Id Not Found", subTaskId));
  }

  /**Check passed start operation */
  /**operation based flow */
  let query = { taskId: taskId, subTaskId: subTaskId };
  /**update subtask */
  if (operation === "edit") {
    /**check for empty update object */
    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json(
          formatResponse(true, 400, "Noting to update", "pass valid property")
        );
    } else {
      //console.log("Final update option::", update);
      SubTask.updateOne(query, update, (error, updatedSubTask) => {
        if (error !== null) {
          res
            .status(500)
            .json(formatResponse(true, 500, "Error Updating Task", error));
        } else {
          let { n } = updatedSubTask;
          res
            .status(200)
            .json(
              formatResponse(false, 200, "SubTask Updated", `${n}-doc updated`)
            );
        }
      });
      /**maintain history */
      let uniqueSubTaskId = subTaskId;
      let createdTimeStamp = Date.now();
      let updateId = `${userId}:${uniqueSubTaskId}:${createdTimeStamp}`;
      /**historic task schema */
      let newHistoricSchema = new Historic_SubTask({
        updateId: updateId,
        name: update.name,
        status: status,
        subTaskId: subTaskId,
        userId: userId,
        operation: operation,
        createdOn: createdTimeStamp,
      });
      /**memory table schema */
      let memory = new MemoryTable({
        userId: userId,
        entity: "SubTask",
        updatedOn: createdTimeStamp,
        updateId: updateId,
        operation: operation,
      });
      //console.log("history-schema:;", newHistoricSchema);
      /**maintain history */
      let createdTaskHistory = await Historic_SubTask.create(newHistoricSchema);
      let memorySnapShot = await MemoryTable.create(memory);
      console.log(
        "HISTORY UPDATED____",
        createdTaskHistory.updateId,
        memorySnapShot.updateId
      );
    }
  }
  /**delete subtask */
  if (operation === "delete") {
    //console.log("Delete subtask");
    /**maintain history */
    /**get info about task being deleted */
    let toBeDeletedSubTask = await SubTask.findOne({
      subTaskId: subTaskId,
    });
    let uniqueSubTaskId = subTaskId;
    let createdTimeStamp = Date.now();
    let updateId = `${userId}:${uniqueSubTaskId}:${createdTimeStamp}`;
    /**historic task schema */
    let newHistoricSchema = new Historic_SubTask({
      updateId: updateId,
      name: toBeDeletedSubTask.name,
      status: toBeDeletedSubTask.status,
      subTaskId: toBeDeletedSubTask.subTaskId,
      taskId: toBeDeletedSubTask.taskId,
      userId: userId,
      operation: operation,
      createdOn: createdTimeStamp,
    });
    /**memory table schema */
    let memory = new MemoryTable({
      userId: userId,
      entity: "SubTask",
      updatedOn: createdTimeStamp,
      updateId: updateId,
      operation: operation,
    });
    //console.log("history-schema:;", newHistoricSchema);
    /**maintain history */
    let createdTaskHistory = await Historic_SubTask.create(newHistoricSchema);
    let memorySnapShot = await MemoryTable.create(memory);
    console.log(
      "HISTORY UPDATED____",
      createdTaskHistory.updateId,
      memorySnapShot.updateId
    );
    SubTask.deleteOne(query, (error, deletedSubTask) => {
      if (error !== null) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Error Deleting Task", error));
      } else {
        let { n } = deletedSubTask;
        res
          .status(200)
          .json(
            formatResponse(false, 200, "SubTask Deleted", `${n}-doc deleted`)
          );
      }
    });
  }
};
