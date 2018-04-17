const MethodBuilder = require("../MethodBuilder");

const methods = {
  putAttribute: function() {},
  getAttributes: function() {},
  getDataTypeOfType: function() {},
  getDataTypeOfAttribute: function() {},
  getRegex: function() {},
  setRegex: function() {}
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
