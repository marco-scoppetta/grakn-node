
const methods = {
  dataType: function () { return this.graknGrpcService.getDataTypeOfAttribute(this.id); },
  getValue: function () { return this.graknGrpcService.getValue(this.id); },
  ownerInstances: function () { return this.graknGrpcService.getOwners(this.id); },
  isEntity: () => false,
  isRelationship: () => false,
  isAttribute: () => true
};

module.exports = {
  get: function () {
    return methods;
  }
};
