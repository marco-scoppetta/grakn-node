const MethodBuilder = require("../MethodBuilder");

const methods = {
  getWhen: function() {},
  getThen: function() {},
  isType: () => false
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
