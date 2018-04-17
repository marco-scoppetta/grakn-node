const MethodBuilder = require("../MethodBuilder");

const methods = {
  getRelationshipTypesThatRelateRole: function() {},
  getTypesThatPlayRole: function() {},
  isType: () => false
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
