const GrpcIteratorFactory = require("./util/GrpcIteratorFactory");

function ResponseConverter(conceptFactory, communicator) {
    this.iteratorFactory = new GrpcIteratorFactory(communicator);
    this.conceptFactory = conceptFactory;
}

/**
 * This method creates and consumes an iterator (until server returns Done) and build Concept object from
 * every response.
 * 
 * Used both with ConceptResponse and TxResponse, they both carry IteratorId, but nested differently.
 * 
 * @param {*} grpcResponse gRPC response that will contain iteratorId
 * @param {*} txService txService implementation needed to be injected to new concepts that will be built
 */
ResponseConverter.prototype.conceptsFromIterator = async function (grpcResponse) {
    const iteratorId = (grpcResponse.hasConceptresponse()) ? grpcResponse.getConceptresponse().getIteratorid() : grpcResponse.getIteratorid();
    const iterator = this.iteratorFactory.createConceptIterator(iteratorId);
    const concepts = [];
    let concept = await iterator.nextResult();
    while (concept) {
        concepts.push(this.conceptFactory.createConcept(concept));
        concept = await iterator.nextResult();
    }
    return concepts;
}

ResponseConverter.prototype.conceptFromResponse = function (response) {
    const concept = response.getConceptresponse().getConcept();
    return this.conceptFactory.createConcept(concept)
}

ResponseConverter.prototype.conceptFromOptional = function (response) {
    const optionalConcept = response.getConceptresponse().getOptionalconcept();
    return (optionalConcept.hasPresent()) ? this.conceptFactory.createConcept(optionalConcept.getPresent()) : null;
}

ResponseConverter.prototype.consumeRolePlayerIterator = async function (grpcConceptResponse) {
    const iteratorId = grpcConceptResponse.getConceptresponse().getIteratorid();
    const iterator = this.iteratorFactory.createRolePlayerIterator(iteratorId);
    const rolePlayers = [];
    let grpcRolePlayer = await iterator.nextResult();
    while (grpcRolePlayer) {
        rolePlayers.push({
            role: this.conceptFactory.createConcept(grpcRolePlayer.getRole()),
            player: this.conceptFactory.createConcept(grpcRolePlayer.getPlayer())
        });
        grpcRolePlayer = await iterator.nextResult();
    }
    return rolePlayers;
}

ResponseConverter.prototype.dataTypeToString = function (dataType) {
    switch (dataType) {
        case 0: return "String";
        case 1: return "Boolean";
        case 2: return "Integer";
        case 3: return "Long";
        case 4: return "Float";
        case 5: return "Double";
        case 6: return "Date";
    }
}

ResponseConverter.prototype.getAttributeValueFromResponse = function (resp) {
    const attrValue = resp.getConceptresponse().getAttributevalue();
    if (attrValue.hasString()) return attrValue.getString();
    if (attrValue.hasBoolean()) return attrValue.getBoolean();
    if (attrValue.hasInteger()) return attrValue.getInteger();
    if (attrValue.hasLong()) return attrValue.getLong();
    if (attrValue.hasFloat()) return attrValue.getFloat();
    if (attrValue.hasDouble()) return attrValue.getDouble();
    if (attrValue.hasDate()) return attrValue.getDate();
}

module.exports = ResponseConverter;