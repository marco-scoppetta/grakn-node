const MethodBuilder = require("../util/MethodBuilder");

const methods = {
  getLabel: function () {
    const getLabelMethod = MethodBuilder.getLabel(this.id);
    return this.communicator.send(getLabelMethod).then(resp =>
      resp
        .getConceptresponse()
        .getLabel()
        .getValue()
    )
      .catch(e => { throw e; });
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
