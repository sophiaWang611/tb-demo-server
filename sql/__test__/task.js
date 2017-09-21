const knex = require("../task");
const testValue = {
  name: "Task 1",
  priority: 0,
  done: 0,
  is_parent: 1,
};

/*knex.insert(testValue).then((resp)=>{
  console.log("knex_task.insert: ", JSON.stringify(resp));
});*/

knex.getAll().then((resp)=>{
  console.log("knex_task.getAll: ", JSON.stringify(resp));
});

knex.getById(1).then((resp)=>{
  console.log("knex_task.getById 1: ", JSON.stringify(resp));
});
