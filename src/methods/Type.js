const MethodBuilder = require("../MethodBuilder");

const methods = {
  getInstances: function() {},
  isType: () => true
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
