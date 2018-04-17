const MethodBuilder = require("../MethodBuilder");

const methods = {
  getInstances: function() {},
  isType: function() {
    return true;
  }
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
