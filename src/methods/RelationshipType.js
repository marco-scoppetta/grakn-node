const MethodBuilder = require("../util/MethodBuilder");
const GrpcIterator = require("../util/GrpcIterator");
const ConceptFactory = require("../ConceptFactory");

const methods = {
  getRelatedRoles: function () {
    const getRelatedRolesMethod = MethodBuilder.getRelatedRoles(this.id);
    return this.communicator.send(getRelatedRolesMethod).then(async result => {
      const iterator = new GrpcIterator.GrpcConceptIterator(
        result.getConceptresponse().getIteratorid(),
        this.communicator
      );
      let role = await iterator.nextResult().catch(e => { throw e; });
      ConceptFactory.createConcept(role, this.communicator);
      const roles = [];
      while (role) {
        result.push(ConceptFactory.createConcept(role, this.communicator));
        role = await iterator.nextResult().catch(e => { throw e; });
      }
      return roles;
    });
  },
  setRelatedRole: function () { },
  unsetRelatedRole: function () { }
};

module.exports = {
  get: function () {
    return methods;
  }
};
