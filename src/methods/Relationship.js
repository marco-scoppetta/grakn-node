const MethodBuilder = require("../MethodBuilder");

const methods = {
  addRelationship: function() {},
  getRolePlayers: function() {},
  getRolePlayersByRoles: function() {},
  setRolePlayer: function() {},
  unsetRolePlayer: function() {}
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
