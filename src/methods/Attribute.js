
const methods = {
  dataType: function () { return this.graknGrpcService.getDataTypeOfAttribute(this.id); },
  getValue: function () { return this.graknGrpcService.getValue(this.id); },
  ownerInstances: function () { return this.graknGrpcService.getOwners(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
