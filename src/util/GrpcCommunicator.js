const AsyncBlockingQueue = require("./AsyncBlockingQueue");

function GrpcCommunicator(stream) {
  this.stream = stream;
  this.response = new AsyncBlockingQueue();
  this.rejectOnError = null;

  this.stream.on("data", resp => {
    this.response.add(resp);
  });

  this.stream.on("end", () => {
    console.log("Stream from server terminated.");
  });

  this.stream.on("error", err => {
    this.rejectOnError(err)
  });

  // call.on('end', () => {
  //     // probably delete some iterators?
  // })

  this.stream.on('status', (e) => {
    // this.rejectOnError(e)
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

module.exports = GrpcCommunicator;
