const knexTask = require("../sql/task");
const knexGroup = require("../sql/group");
const utils = require("./common/utils");

function getTaskGroupByScrum() {
  var groups = [];
  return knexGroup.getAll().then((rows)=>{
    groups = rows;
    return knexTask.getAll();
  }).then((rows)=>{
    return utils.groupObject(groups, rows, "id", "group_id", "taskList");
  });
}

module.exports = {
  getTaskGroupByScrum: getTaskGroupByScrum
};
