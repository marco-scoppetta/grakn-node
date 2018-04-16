const AsyncBlockingQueue = require("./AsyncBlockingQueue");

function GrpcCommunicator(stream) {
  this.stream = stream;
  this.response = new AsyncBlockingQueue();

  this.stream.on("data", resp => {
    this.response.add(resp);
  });

  this.stream.on("end", () => {
    console.log("Stream from server terminated.");
  });

  this.stream.on("error", err => {
    console.log("BAD ERROR: " + err);
  });

  // call.on('end', () => {
  //     // probably delete some iterators?
  // })

  // call.on('status', () => {
  //     // do we need this callback?
  // })
}

GrpcCommunicator.prototype.send = async function(request) {
  this.stream.write(request);
  try {
    const newresponse = await this.response.pop();
    return newresponse;
  } catch (e) {
    console.log(e);
  }
};

module.exports = GrpcCommunicator;
