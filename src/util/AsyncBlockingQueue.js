function AsyncBlockingQueue() {
  // invariant: at least one of the arrays is empty
  this.resolvers = [];
  this.promises = [];
}

AsyncBlockingQueue.prototype._addPromise = function() {
  this.promises.push(
    new Promise(resolve => {
      this.resolvers.push(resolve);
    })
  );
};
AsyncBlockingQueue.prototype.add = function(element) {
  // if (this.resolvers.length) this.resolvers.shift()(t);
  // else this.promises.push(Promise.resolve(t));
  if (!this.resolvers.length) this._addPromise();
  this.resolvers.shift()(element);
};
AsyncBlockingQueue.prototype.pop = function() {
  if (!this.promises.length) this._addPromise();
  return this.promises.shift();
};
// now some utilities:
AsyncBlockingQueue.prototype.isEmpty = function() {
  // there are no values available
  return !this.promises.length; // this.length == 0
};
AsyncBlockingQueue.prototype.isBlocked = function() {
  // it's waiting for values
  return !!this.resolvers.length; // this.length < 0
};
AsyncBlockingQueue.prototype.getLength = function() {
  return this.promises.length - this.resolvers.length;
};

module.exports = AsyncBlockingQueue;
