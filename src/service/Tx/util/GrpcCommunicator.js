const AsyncBlockingQueue = require("./AsyncBlockingQueue");

function GrpcCommunicator(stream) {
  this.stream = stream;
  this.response = new AsyncBlockingQueue();
  this.rejectOnError = null;
  this.resolveOnEnd = null

  this.stream.on("data", resp => {
    this.response.add(resp);
  });

  this.stream.on("error", err => {
    this.rejectOnError(err)
  });

  this.stream.on('status', (e) => {
    this.rejectOnError(e)
  })
}

GrpcCommunicator.prototype.send = async function (request) {
  return new Promise(async (resolve, reject) => {
    this.rejectOnError = reject;
    this.stream.write(request);
    const response = await this.response.pop();
    resolve(response);
  })
};

GrpcCommunicator.prototype.end = function end() {
  this.stream.end();
  return new Promise((resolve) => {
    this.stream.on('end', resolve);
  });
}

module.exports = GrpcCommunicator;