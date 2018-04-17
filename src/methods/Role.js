const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  getRelationshipTypesThatRelateRole: function() {},
  getTypesThatPlayRole: function() {},
  isType: () => false
};

module.exports = {
  get: function() {
    return methods;
  }
};
