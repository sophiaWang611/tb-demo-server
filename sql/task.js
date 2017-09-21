const BaseQuery = require("./common/base");
const tableName = "tasks";

class TaskQuery extends BaseQuery {
  constructor() {
    super(tableName)
  }
}

module.exports = new TaskQuery();
