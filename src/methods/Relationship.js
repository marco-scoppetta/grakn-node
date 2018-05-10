
const methods = {
  allRolePlayers: function () {
    // TODO: understand difference with rolePlayers() and implement
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
