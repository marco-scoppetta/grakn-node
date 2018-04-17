const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  isInferred: function() {},
  getDirectionType: function() {},
  getRelationships: function() {},
  getRelationshipsByRole: function() {},
  getRolesPlayedByThing: function() {},
  getAttributes: function() {},
  getAttributesByTypes: function() {},
  getKeys: function() {},
  getKeysByTypes: function() {},
  setAttribute: function() {},
  unsetAttribute: function() {},
  isType: () => false,
  isThing: () => true,
  isSchemaConcept: () => false
};

module.exports = {
  get: function() {
    return methods;
  }
};
