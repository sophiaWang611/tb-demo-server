const _ = require("underscore");

function groupObject(mainList, childList, columnInMain, columnInChild, childName) {
  var tempMap = {}, returnVal = [];
  _.each(childList, (childObj)=>{
    let keyValue = childObj[columnInChild];
    let tempArr = tempMap[keyValue];
    if (!tempArr) {
      tempArr = [];
      tempMap[keyValue] = tempArr;
    }
    tempArr.push(childObj);
  });
  _.each(mainList, (mainObj)=>{
    let keyValue = mainObj[columnInMain], tempObj = _.clone(mainObj);
    tempObj[childName] = tempMap[keyValue] || [];
    returnVal.push(tempObj);
  });
  return returnVal;
}

module.exports = {
  groupObject: groupObject
};
