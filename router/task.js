const express = require('express');
const router = express.Router();
const taskService = require("../service/task");

router.get('/list', function(req, res, next) {
  taskService.getTaskGroupByScrum().then((taskList)=>{
    res.json({
      taskList: taskList
    });
  });
});

module.exports = router;
