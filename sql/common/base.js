const knex = require("./knex");
const _ = require("underscore");

class BaseQuery {
  constructor(tableName) {
    this.tableName = tableName;
  }
  getAll() {
    return knex(this.tableName).select();
  }
  del(id) {
    if (_.isUndefined(id) || _.isNaN(Number(id))) {
      throw new Error("参数错误：" + id + "不能为空");
    }
    return knex(this.tableName).where("id", id).del();
  }
  getById(id) {
    if (_.isUndefined(id) || _.isNaN(Number(id))) {
      throw new Error("参数错误：主键Id不能为空");
    }
    return knex(this.tableName).where("id", id);
  }
  upById(id, upData) {
    if (_.isUndefined(id) || _.isNaN(Number(id))) {
      throw new Error("参数错误：主键Id不能为空");
    }
    if (_.isEmpty(upData)) {
      throw new Error("参数错误：更新的内容不能为空");
    }
    upData.id && (upData = _.omit(upData, "id"));
    return knex(this.tableName).update(upData).where("id", id);
  }
  insert(newData) {
    if (_.isEmpty(newData)) {
      throw new Error("参数错误：更新的内容不能为空");
    }
    return knex(this.tableName).insert(newData);
  }
}

BaseQuery.prototype.knex = knex;

module.exports = BaseQuery;
