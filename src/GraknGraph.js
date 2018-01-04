const request = require('request-promise-native');

const DEFAULT_URI = 'http://localhost:4567';
const DEFAULT_KEYSPACE = 'grakn';

function Graph(uri = DEFAULT_URI , keyspace = DEFAULT_KEYSPACE){
    this.uri = uri;
    this.keyspace = keyspace
    this.queryEndpoint = `/kb/${this.keyspace}/graql`;
}

// Execute Graql query against the graph
Graph.prototype.execute = function(query, params){
    return request.post({
        uri: `${this.uri}${this.queryEndpoint}`, 
        qs: mergeParams(this.keyspace, params), 
        headers: {'Accept': 'application/graql+json'},
        body: query,
    });
}

Graph.prototype.txType = {
       READ: "READ",
       WRITE: "WRITE",
       BATCH: "BATCH"
};

/**
 * Creates a params object that will be sent in the body of each request.
 * @param {string} keyspace
 * @param {boolean} infer - Determine if inference must be used for the current query
 * @param {boolean} multi - Allow multiple queries to be executed in one single request/transaction
 * @param {boolean} defineAllVars - Define all anonymous variables in the query
 * @param {boolean} loading - Used to check if serialisation of results is needed. When set to `true`, the endpoint will not return a formatted response.
 * @param {string} txType - Transaction type. Check readme for more info.
 */
function mergeParams(keyspace, params){
    return Object.assign({keyspace}, params);
}

module.exports = Graph;