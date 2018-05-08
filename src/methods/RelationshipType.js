
const methods = {
  getRelatedRoles: function () { return this.txService.getRelatedRoles(this.id); },
  setRelatedRole: function () { return this.txService.setRelatedRole(this.id); },
  unsetRelatedRole: function () { return this.txService.unsetRelatedRole(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
