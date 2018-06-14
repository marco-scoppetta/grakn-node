
const methods = {
  addEntity: function () { return this.graknGrpcService.addEntity(this.id); },
};

module.exports = {
  get: function () {
    return methods;
  }
};
