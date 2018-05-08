
const methods = {
  getRelationshipTypesThatRelateRole: function () { return this.txService.getRelationshipTypesThatRelateRole(this.id); },
  getTypesThatPlayRole: function () { return this.txService.getTypesThatPlayRole(this.id); },
};

module.exports = {
  get: function () {
    return methods;
  }
};
