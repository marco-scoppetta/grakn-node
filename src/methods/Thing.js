const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  isInferred: function () {
    const isInferredMethod = MethodBuilder.isInferred(this.id);
    return this.communicator.send(isInferredMethod)
      .then(resp => resp.getConceptresponse().getBool())
      .catch(e => { throw e; });
  },
  getDirectionType: function () { },
  getRelationships: function () { },
  getRelationshipsByRole: function () { },
  getRolesPlayedByThing: function () { },
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
