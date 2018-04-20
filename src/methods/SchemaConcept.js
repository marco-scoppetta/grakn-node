const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  getLabel: function () {
    return this.txService.getLabel(this.id);
  },
  setLabel: function () { },
  isImplicit: function () {
    const isImplicitMethod = MethodBuilder.isImplicit(this.id);
    return this.communicator
      .send(isImplicitMethod)
      .then(resp => resp.getConceptresponse().getBool())
      .catch(e => { throw e; });
  },
  getSubConcepts: function () { },
  getSuperConcepts: function () { },
  getDirectSuperConcept: function () { },
  setDirectSuperConcept: function () { }
};

module.exports = {
  get: function () {
    return methods;
  }
};
