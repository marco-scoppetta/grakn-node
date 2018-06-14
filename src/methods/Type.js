
const methods = {
  setAbstract: function (bool) { return this.graknGrpcService.setAbstract(this.id, bool); },
  plays: function (role) {
    if (role) {
      return this.graknGrpcService.setRolePlayedByType(this.id, role);
    } else {
      return this.graknGrpcService.getRolesPlayedByType(this.id);
    }
  },
  key: function (attributeType) { return this.graknGrpcService.setKeyType(this.id, attributeType); },
  attribute: function (attributeType) { return this.graknGrpcService.setAttributeType(this.id, attributeType); },
  attributes: function () { return this.graknGrpcService.getAttributeTypes(this.id); },
  keys: function () { return this.graknGrpcService.getKeyTypes(this.id); },
  instances: function () { return this.graknGrpcService.getInstances(this.id); },
  isAbstract: function () { return this.graknGrpcService.isAbstract(this.id); },
  deletePlays: function (role) { return this.graknGrpcService.unsetRolePlayedByType(this.id, role); },
  deleteAttribute: function (attributeType) { return this.graknGrpcService.unsetAttributeType(this.id, attributeType); },
  deleteKey: function (attributeType) { return this.graknGrpcService.unsetKeyType(this.id, attributeType); },
};

module.exports = {
  get: function () {
    return methods;
  }
};
