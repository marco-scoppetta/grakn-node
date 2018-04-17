const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  putAttribute: function() {},
  getAttributes: function() {},
  getDataTypeOfType: function() {},
  getDataTypeOfAttribute: function() {},
  getRegex: function() {},
  setRegex: function() {}
};

module.exports = {
  get: function() {
    return methods;
  }
};
