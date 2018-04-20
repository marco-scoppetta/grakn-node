const methods = {
  isInferred: function () {
    return this.txService.isInferred(this.id);
  },
  getDirectType: function () { },
  getRelationships: function () {
    return this.txService.getRelationships(this.id);
  },
  getRelationshipsByRole: function () { },
  getRolesPlayedByThing: function () {
    return this.txService.getRolesPlayedByThing(this.id);
  },
  getAttributes: function () { },
  getAttributesByTypes: function () { },
  getKeys: function () { },
  getKeysByTypes: function () { },
  setAttribute: function () { },
  unsetAttribute: function () { }
};

module.exports = {
  get: function () {
    return methods;
  }
};
