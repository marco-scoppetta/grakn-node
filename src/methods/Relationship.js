
const methods = {
  addRelationship: function () { return this.txService.addRelationship(this.id); },
  getRolePlayers: function () { return this.txService.getRolePlayers(this.id); },
  getRolePlayersByRoles: function () { return this.txService.getRolePlayersByRoles(this.id); },
  setRolePlayer: function () { return this.txService.setRolePlayer(this.id); },
  unsetRolePlayer: function () { return this.txService.unsetRolePlayer(this.id); },
  isEntity: () => false,
  isRelationship: () => true,
  isAttribute: () => false
};

module.exports = {
  get: function () {
    return methods;
  }
};
