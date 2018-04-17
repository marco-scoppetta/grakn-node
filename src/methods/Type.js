const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  getInstances: function() {},
  isType: () => true
};

module.exports = {
  get: function() {
    return methods;
  }
};
