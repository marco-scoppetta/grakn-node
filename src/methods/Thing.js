const methods = {
  isInferred: function () { return this.graknGrpcService.isInferred(this.id); },
  type: function () { return this.graknGrpcService.getDirectType(this.id); },
  relationships: function (...roles) {
    if (roles.length > 0) {
      return this.graknGrpcService.getRelationshipsByRoles(this.id, roles);
    } else {
      return this.graknGrpcService.getRelationships(this.id);
    }
  },
  plays: function () { return this.graknGrpcService.getRolesPlayedByThing(this.id); },
  attributes: function (...attributes) {
    if (attributes.length > 0) {
      return this.graknGrpcService.getAttributesByTypes(this.id, attributes);
    } else {
      return this.graknGrpcService.getAttributes(this.id);
    }
  },
  keys: function (...keys) {
    if (keys.length > 0) {
      return this.graknGrpcService.getKeysByTypes(this.id, keys);
    } else {
      return this.graknGrpcService.getKeys(this.id);
    }
  },
  // Note: in Java Core API this method is called `attributeRelationship`
  // because the `attribute` method has a behaviour that does not apply to JS.
  // So in here we just have `attribute`.
  attribute: function (attribute) { return this.graknGrpcService.setAttribute(this.id, attribute); },
  deleteAttribute: function (attribute) { return this.graknGrpcService.unsetAttribute(this.id, attribute); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
