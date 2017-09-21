const BaseQuery = require("./common/base");
const tableName = "group";

class GroupQuery extends BaseQuery {
  constructor() {
    super(tableName)
  }
}

module.exports = new GroupQuery();
