import grpc from "grpc";
import messages from "./grakn_pb";
import services from "./grakn_grpc_pb";

const DEFAULT_URI = 'localhost:48555';
const DEFAULT_KEYSPACE = 'grakn';

function GraknClient(uri = DEFAULT_URI , keyspace = DEFAULT_KEYSPACE){
    this.client = new services.GraknClient(uri, grpc.credentials.createInsecure());
    this.keyspace = keyspace
}


GraknClient.prototype.open() = function(){
    const openRequest = new messages.Open();
    this.client.tx(openRequest)
}

export default GraknClient;
