
const methods = {
  addRelationship: function () { return this.txService.addRelationship(this.id); },
  relates: function (role) {
    if (role) {
      return this.txService.getRelatedRoles(this.id);
    } else {
      return this.txService.setRelatedRole(this.id, role);
    }
  },
  deleteRelates: function (role) { return this.txService.unsetRelatedRole(this.id, role); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
