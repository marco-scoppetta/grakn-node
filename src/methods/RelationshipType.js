
const methods = {
  addRelationship: function () { return this.graknGrpcService.addRelationship(this.id); },
  relates: function (role) {
    if (role) {
      return this.graknGrpcService.setRelatedRole(this.id, role);
    } else {
      return this.graknGrpcService.getRelatedRoles(this.id);
    }
  },
  deleteRelates: function (role) { return this.graknGrpcService.unsetRelatedRole(this.id, role); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
