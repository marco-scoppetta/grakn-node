
const methods = {
  getInstances: function () { return this.txService.getInstances(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
