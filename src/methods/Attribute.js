
const methods = {
  dataType: function () { return this.txService.getDataTypeOfAttribute(this.id); },
  getValue: function () { return this.txService.getValue(this.id); },
  ownerInstances: function () { return this.txService.getOwners(this.id); },
  isEntity: () => false,
  isRelationship: () => false,
  isAttribute: () => true
};

module.exports = {
  get: function () {
    return methods;
  }
};
