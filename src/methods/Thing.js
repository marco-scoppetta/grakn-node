const methods = {
  isInferred: function () { return this.txService.isInferred(this.id); },
  type: function () { return this.txService.getDirectType(this.id); },
  relationships: function (...roles) {
    if (roles.length > 0) {
      return this.txService.getRelationshipsByRoles(this.id, roles);
    } else {
      return this.txService.getRelationships(this.id);
    }
  },
  plays: function () { return this.txService.getRolesPlayedByThing(this.id); },
  attributes: function (...attributes) {
    if (attributes.length > 0) {
      return this.txService.getAttributesByTypes(this.id, attributes);
    } else {
      return this.txService.getAttributes(this.id);
    }
  },
  keys: function (...keys) {
    if (keys.length > 0) {
      return this.txService.getKeysByTypes(this.id, keys);
    } else {
      return this.txService.getKeys(this.id);
    }
  },
  // Note: in Java Core API this method is called `attributeRelationship`
  // because the `attribute` method has a behaviour that does not apply to JS.
  // So in here we just have `attribute`.
  attribute: function (attribute) { return this.txService.setAttribute(this.id); },
  deleteAttribute: function () { return this.txService.unsetAttribute(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
