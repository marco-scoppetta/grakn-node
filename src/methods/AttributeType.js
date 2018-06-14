
const methods = {
  putAttribute: function (value) { return this.graknGrpcService.putAttribute(this.id, value); },
  getAttribute: function (value) { return this.graknGrpcService.getAttribute(this.id, value); },
  getDataType: function () { return this.graknGrpcService.getDataTypeOfType(this.id); },
  getRegex: function () { return this.graknGrpcService.getRegex(this.id); },
  setRegex: function (regex) { return this.graknGrpcService.setRegex(this.id, regex); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
