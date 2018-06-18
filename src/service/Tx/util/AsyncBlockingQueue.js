function AsyncBlockingQueue() {
  // invariant: at least one of the arrays is empty
  this.resolvers = [];
  this.promises = [];
}

AsyncBlockingQueue.prototype._addPromise = function () {
  this.promises.push(
    new Promise(resolve => { this.resolvers.push(resolve); })
  );
};

AsyncBlockingQueue.prototype.add = function (element) {
  if (!this.resolvers.length) this._addPromise();
  this.resolvers.shift()(element);
};

AsyncBlockingQueue.prototype.pop = function () {
  if (!this.promises.length) this._addPromise();
  return this.promises.shift();
};

module.exports = AsyncBlockingQueue;
