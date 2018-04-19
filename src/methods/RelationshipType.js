const MethodBuilder = require("../util/MethodBuilder");
const GrpcIterator = require("../util/GrpcIterator");

const methods = {
  getRelatedRoles: function () {
    const getRelatedRolesMethod = MethodBuilder.getRelatedRoles(this.id);
    return this.communicator
      .send(getRelatedRolesMethod)
      .then(async result => {
        const iterator = new GrpcIterator.GrpcConceptIterator(
          result.getConceptresponse().getIteratorid(),
          this.communicator
        );
        return await _buildRoles(iterator, this.conceptFactory);
      });
  },
  setRelatedRole: function () { },
  unsetRelatedRole: function () { }
};

async function _buildRoles(iterator, factory) {
  const roles = [];
  let role = await iterator.nextResult().catch(e => { throw e; });
  while (role) {
    roles.push(factory.createConcept(role, this.communicator, factory));
    role = await iterator.nextResult().catch(e => { throw e; });
  }
  return roles;
}

module.exports = {
  get: function () {
    return methods;
  }
};
