const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  getWhen: function() {},
  getThen: function() {},
  isType: () => false
};

module.exports = {
  get: function() {
    return methods;
  }
};
