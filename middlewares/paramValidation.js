const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
let options = { abortEarly: false };

exports.loginParamValidation = (req, res, next) => {
  //console.log("Login Param Validation");
  let loginSchema = joi.object({
    email: joi.string().email().min(4).required(),
    password: joi.string().min(8).required(),
  });

  let { error } = loginSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};

exports.recoverPwdValidation = (req, res, next) => {
  //console.log("Recovery Password validation");
  let recoverySchema = joi.object({
    email: joi.string().email().min(5).required(),
  });
  let { error } = recoverySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          "Input Param Not Valid",
          error.details[0].message
        )
      );

  next();
};
exports.resetPwdValidation = (req, res, next) => {
  //console.log("reset pwd validation");
  let resetPwdSchema = joi.object({
    recoveryCode: joi.string().min(6).required(),
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(new RegExp("^[A-Za-z0-9]\\w{8,64}$"))
      .required(),
  });

  let { error } = resetPwdSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};

exports.signupParamValidation = (req, res, next) => {
  //console.log("signupParamValidation");
  let signUpSchema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
    email: joi.string().min(5).email().required(),
    mobile: joi.number().min(10).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  let { error } = signUpSchema.validate(req.body, options);
  //console.log("validation error", error);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.taskListValidation = (req, res, next) => {
  //console.log("task list param validation");
  let taskListSchema = joi.object({
    name: joi.string().min(3).required(),
    userId: joi.string().required(),
  });

  let { error } = taskListSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.getTaskListValidation = (req, res, next) => {
  //console.log("get task list param validation");
  let taskListSchema = joi.object({
    userId: joi.string().required(),
  });
  let { error } = taskListSchema.validate(req.body);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.createTaskValidation = (req, res, next) => {
  //console.log("Create task param validation");
  let createTask = joi.object({
    name: joi.string().min(3).required(),
    taskListId: joi.string().required(),
    userId: joi.string().required(),
    status: joi.valid("done", "open"),
  });
  let { error } = createTask.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.getTaskValidation = (req, res, next) => {
  //console.log("get task param validation");
  let getTaskSchema = joi.object({
    taskListId: joi.string().required(),
    userId: joi.string().required(),
  });
  let { error } = getTaskSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.createSubTaskValidation = (req, res, next) => {
  //console.log("Create sub task validation");
  let subTask = joi.object({
    name: joi.string().min(3).required(),
    taskId: joi.string().required(),
    status: joi.valid("done", "open").required(),
    userId: joi.string().required(),
  });
  let { error } = subTask.validate(req.body, options);
  //console.log("Error::", error);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.getSubTaskValidation = (req, res, next) => {
  //console.log("get subtask param validation");
  let subTaskSchema = joi.object({
    taskId: joi.string().required(),
  });
  let { error } = subTaskSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.updateTaskListValidation = (req, res, next) => {
  //console.log("update task list validation::");
  let updateTaskList = joi.object({
    taskListId: joi.string().required(),
    operation: joi.valid("delete", "edit").required(),
    userId: joi.string().required(),
    update: joi.object().optional(),
  });
  let { error } = updateTaskList.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.updateTaskValidation = (req, res, next) => {
  //console.log("Update task validation");
  let updateTask = joi.object({
    taskListId: joi.string().required(),
    operation: joi.valid("delete", "edit").required(),
    taskId: joi.string().required(),
    userId: joi.string().required(),
    update: joi.object().optional(),
  });
  let { error } = updateTask.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.updateSubTaskValidation = (req, res, next) => {
  //console.log("Update sub task validation");
  let updateSubTask = joi.object({
    operation: joi.valid("delete", "edit").required(),
    taskId: joi.string().required(),
    subTaskId: joi.string().required(),
    update: joi.object().optional(),
    userId: joi.string().required(),
  });
  let { error } = updateSubTask.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
exports.getFriendRequestsValidation = (req, res, next) => {
  //console.log("get fr param validation");
  const frSchema = joi.object({
    senderId: joi.string().required(),
  });
  let { error } = frSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json(
        formatResponse(true, "Not Valid Input Params", error.details[0].message)
      );
  }
  next();
};
exports.revertValidation = (req, res, next) => {
  //console.log("Fetch historic data validation");
  const frSchema = joi.object({
    userId: joi.string().required(),
  });
  let { error } = frSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json(
        formatResponse(true, "Not Valid Input Params", error.details[0].message)
      );
  }
  next();
};
