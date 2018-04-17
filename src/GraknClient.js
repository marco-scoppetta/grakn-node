const grpc = require("grpc");
const messages = require("./autogenerated/grakn_pb");
const services = require("./autogenerated/grakn_grpc_pb");
const ConceptFactory = require("./ConceptFactory");
const GrpcCommunicator = require("./util/GrpcCommunicator");
const GrpcIterator = require("./util/GrpcIterator");

function GraknClient(uri, keyspace, credentials) {
  this.client = new services.GraknClient(
    uri,
    grpc.credentials.createInsecure()
  );
  this.keyspace = keyspace;
  this.credentials = credentials;
  this.communicator = null;
}

GraknClient.prototype._executeQuery = async function executeQuery(query) {
  this.result = [];
  const txRequest = new messages.TxRequest();
  const executeQuery = new messages.ExecQuery();
  const queryRequest = new messages.Query();
  queryRequest.setValue(query);
  executeQuery.setQuery(queryRequest);
  txRequest.setExecquery(executeQuery);
  return await this.communicator
    .send(txRequest)
    .then(resp => this._parseResponse(resp));
};

GraknClient.prototype._parseResponse = async function parseResponse(resp) {
  if (resp.hasDone()) return [];
  if (resp.hasIteratorid()) {
    const iterator = new GrpcIterator(resp.getIteratorid(), this.communicator);
    const executeQueryResult = [];
    let nextResult = await iterator.nextResult();
    while (nextResult) {
      executeQueryResult.push(this._parseResult(nextResult));
      nextResult = await iterator.nextResult();
    }
    return executeQueryResult;
  }
};

GraknClient.prototype._parseResult = function parseResult(queryResult) {
  if (queryResult.hasOtherresult()) {
    // compute or aggregate query
    this.result = JSON.parse(queryResult.getOtherresult());
  } else {
    const answerMap = new Map();
    queryResult
      .getAnswer()
      .getAnswerMap()
      .forEach((grpcConcenpt, key) => {
        answerMap.set(
          key,
          ConceptFactory.createConcept(grpcConcenpt, this.communicator)
        );
      });
    return answerMap;
  }
};

GraknClient.prototype._openTx = async function() {
  const openRequest = new messages.Open();
  const txRequest = new messages.TxRequest();
  const messageKeyspace = new messages.Keyspace();
  messageKeyspace.setValue(this.keyspace);

  openRequest.setKeyspace(messageKeyspace);
  openRequest.setTxtype(messages.TxType.WRITE);
  openRequest.setUsername(this.credentials.username);
  openRequest.setPassword(this.credentials.password);
  txRequest.setOpen(openRequest);

  await this.communicator.send(txRequest);
};

GraknClient.prototype._init = async function() {
  this.communicator = new GrpcCommunicator(this.client.tx());
  await this._openTx();
};

GraknClient.prototype.execute = async function execute(query) {
  try {
    if (!this.communicator) {
      await this._init();
    }
    return await this._executeQuery(query);
  } catch (e) {
    console.error(e);
  }
};

module.exports = GraknClient;
