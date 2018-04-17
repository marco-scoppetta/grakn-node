const MethodBuilder = require("../MethodBuilder");

const methods = {
  getRelatedRoles: function() {
    const getRelatedRolesMethod = MethodBuilder.getRelatedRoles(this.id);
    return this.communicator.send(getRelatedRolesMethod);
  },
  setRelatedRole: function() {},
  unsetRelatedRole: function() {}
};

module.exports = {
  getMethods: function() {
    return methods;
  }
};
