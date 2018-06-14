
const methods = {
  relationshipTypes: function () { return this.graknGrpcService.getRelationshipTypesThatRelateRole(this.id); },
  playedByTypes: function () { return this.graknGrpcService.getTypesThatPlayRole(this.id); },
};

module.exports = {
  get: function () {
    return methods;
  }
};
