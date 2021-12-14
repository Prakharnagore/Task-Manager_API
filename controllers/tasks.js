const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  // try {
  const tasks = await Task.find({});
  res.status(200).json({ tasks: tasks });
  // res.status(200).json({ tasks,amount:tasks.length });
  /*  res
      .status(200)
      .json({ status: "success", data: { tasks, nbHits: tasks.length } }); */
  // } catch (error) {
  //   res.status(500).json({ msg: error }); //500 - general server error
  //}
});

const createTask = asyncWrapper(async (req, res) => {
  //try {
  const task = await Task.create(req.body);
  res.status(201).json(task); // 201- succesfull post request
  //} catch (error) {
  // res.status(500).json({ msg: error }); //500 - general server error
  //}
});

const getTask = asyncWrapper(async (req, res, next) => {
  //try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    console.log(createCustomError(`No task with id:${taskID}`, 404));
    return next(createCustomError(`No task with id:${taskID}`, 404));
    // const error = new Error("NOT FOUND");
    // error.status = 404;
    // return next(error);
    //return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  return res.status(201).json(task);
  // } catch (error) {
  //  res.status(500).json({ msg: error }); //500 - general server error
  //}
});
const deleteTask = asyncWrapper(async (req, res) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id:${taskID}`, 404));
    //  return res.status(404).json({ msg: `No task with id : ${task}` });
  }
  res.status(200).json({ task });
  // res.status(200).send()
  // res.status.json({ task: null, status: "success" });
  //} catch (error) {
  //   res.status(500).json({ msg: error }); //500 - general server error
  // }
});

const updateTask = asyncWrapper(async (req, res) => {
  //try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id:${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
  // } catch (error) {
  //  res.status(500).json({ msg: error }); //500 - general server error
  // }
});
/*
const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, // addition property to for when we work with put 
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error }); //500 - general server error
  }
};
*/
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
