
const methods = {
  allRolePlayers: function () {
    // TODO: implement this that returns map of Role to a set of Things that play that role in the current relationship`
  },
  rolePlayers: function (...roles) {
    if (roles.length > 0) {
      return this.txService.getRolePlayersByRoles(this.id, roles);
    } else {
      return this.txService.getRolePlayers(this.id);
    }
  },
  addRolePlayer: function (role, thing) { return this.txService.setRolePlayer(this.id, role, thing); },
  removeRolePlayer: function (role, thing) { return this.txService.unsetRolePlayer(this.id, role, thing); },
  isEntity: () => false,
  isRelationship: () => true,
  isAttribute: () => false
};

module.exports = {
  get: function () {
    return methods;
  }
};
