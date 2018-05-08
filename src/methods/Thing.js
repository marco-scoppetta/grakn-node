const methods = {
  isInferred: function () { return this.txService.isInferred(this.id); },
  getDirectType: function () { return this.txService.getDirectType(this.id); },
  getRelationships: function () { return this.txService.getRelationships(this.id); },
  getRelationshipsByRole: function () { return this.txService.getRelationshipsByRole(this.id); },
  getRolesPlayedByThing: function () { return this.txService.getRolesPlayedByThing(this.id); },
  getAttributes: function () { return this.txService.getAttributes(this.id); },
  getAttributesByTypes: function () { return this.txService.getAttributesByTypes(this.id); },
  getKeys: function () { return this.txService.getKeys(this.id); },
  getKeysByTypes: function () { return this.txService.getKeysByTypes(this.id); },
  setAttribute: function () { return this.txService.setAttribute(this.id); },
  unsetAttribute: function () { return this.txService.unsetAttribute(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
