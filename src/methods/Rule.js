
const methods = {
  getWhen: function () { return this.graknGrpcService.getWhen(this.id); },
  getThen: function () { return this.graknGrpcService.getThen(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
