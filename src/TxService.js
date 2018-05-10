const messages = require("./autogenerated/grakn_pb");
const GrpcIterator = require("./util/GrpcIterator");
const TxRequestBuilder = require("./util/TxRequestBuilder");

/**
 * This module executes the methods provided by the gRPC Tx service defined
 * inside grakn.proto and returns responses in JS data types.
 * It has 2 collaborators:
 *  - a communicator which handles gRPC requests/responses over a duplex Stream
 *  - a factory to build {Concept} objects from gRPC responses 
 */

function TxService(communicator, factory) {
    this.communicator = communicator;
    this.conceptFactory = factory;
}

// Concept

TxService.prototype.delete = function (id) {
    const deleteTxRequest = TxRequestBuilder.delete(this.id);
    return this.communicator.send(deleteTxRequest)
        .catch(e => { throw e; });
};

// Schema concept
TxService.prototype.getLabel = function (id) {
    const getLabelTxRequest = TxRequestBuilder.getLabel(id);
    return this.communicator
        .send(getLabelTxRequest)
        .then(resp =>
            resp.getConceptresponse()
                .getLabel()
                .getValue()
        ).catch(e => { throw e; });
}

TxService.prototype.setLabel = function (id, label) {
    const setLabelTxRequest = TxRequestBuilder.setLabel(id, label);
    return this.communicator.send(setLabelTxRequest)
        .catch(e => { throw e; });
    )
};

TxService.prototype.isImplicit = function (id) {
    const isImplicitTxRequest = TxRequestBuilder.isImplicit(id);
    return this.communicator
        .send(isImplicitTxRequest)
        .then(resp => resp.getConceptresponse().getBool())
        .catch(e => { throw e; });
}

TxService.prototype.getSubConcepts = function (id) {
    const getSubConceptsTxRequest = TxRequestBuilder.getSubConcepts(id);
    return this.communicator.send(getSubConceptsTxRequest)
        .then(async grpcConceptResponse => {
            return await _consumeConceptIterator(grpcConceptResponse, this);
        })
        .catch(e => { throw e; });
};
TxService.prototype.getSuperConcepts = function (id) {
    const getSuperConceptsTxRequest = TxRequestBuilder.getSuperConcepts(id);
    return this.communicator.send(getSuperConceptsTxRequest)
        .then(async grpcConceptResponse => {
            return await _consumeConceptIterator(grpcConceptResponse, this);
        })
        .catch(e => { throw e; });
};
TxService.prototype.getDirectSuperConcept = function (id) { };
TxService.prototype.setDirectSuperConcept = function (id) { };

// Rule 

TxService.prototype.getWhen = function (id) { };
TxService.prototype.getThen = function (id) { };

// Role

TxService.prototype.getRelationshipTypesThatRelateRole = function (id) {
    const txRequest = TxRequestBuilder.getRelationshipTypesThatRelateRole(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
}
TxService.prototype.getTypesThatPlayRole = function (id) {
    const txRequest = TxRequestBuilder.getTypesThatPlayRole(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
}

// Type

TxService.prototype.getInstances = function (id) {
    const txRequest = TxRequestBuilder.getInstances(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.getAttributeTypes = function (id) {
    const txRequest = TxRequestBuilder.getAttributeTypes(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.setAttributeType = function (id) { };
TxService.prototype.unsetAttributeType = function (id) { };
TxService.prototype.getKeyTypes = function (id) {
    const txRequest = TxRequestBuilder.getKeyTypes(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.setKeyType = function (id) { };
TxService.prototype.unsetKeyType = function (id) { };
TxService.prototype.isAbstract = function (id) { };
TxService.prototype.setAbstract = function (id) { };
TxService.prototype.getRolesPlayedByType = function (id) {
    const txRequest = TxRequestBuilder.getRolesPlayedByType(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.setRolePlayedByType = function (id) { };
TxService.prototype.unsetRolePlayedByType = function (id) { };

// Entity type

TxService.prototype.addEntity = function (id) { };

// Relationship Type

TxService.prototype.getRelatedRoles = function (id) {
    const txRequest = TxRequestBuilder.getRelatedRoles(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
}

TxService.prototype.setRelatedRole = function (id) { };
TxService.prototype.unsetRelatedRole = function (id) { };


// Attribute type
TxService.prototype.putAttribute = function (id) { };
TxService.prototype.getAttribute = function (id) { };
TxService.prototype.getDataTypeOfType = function (id) { };
TxService.prototype.getDataTypeOfAttribute = function (id) { };
TxService.prototype.getRegex = function (id) { };
TxService.prototype.setRegex = function (id) { };


//Thing

TxService.prototype.isInferred = function (id) {
    const txRequest = TxRequestBuilder.isInferred(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
}

TxService.prototype.getDirectType = function (id) { };

TxService.prototype.getRelationships = function (id) {
    const txRequest = TxRequestBuilder.getRelationships(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
}

TxService.prototype.getRelationshipsByRole = function (id) {
    const txRequest = TxRequestBuilder.getRelationshipsByRole(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};

TxService.prototype.getRolesPlayedByThing = function (id) {
    const txRequest = TxRequestBuilder.getRolesPlayedByThing(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
}

TxService.prototype.getAttributes = function (id) {
    const txRequest = TxRequestBuilder.getRolesPlayedByThing(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.getAttributesByTypes = function (id) {
    const txRequest = TxRequestBuilder.getAttributesByTypes(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.getKeys = function (id) {
    const txRequest = TxRequestBuilder.getAttributesByTypes(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.getKeysByTypes = function (id) {
    const txRequest = TxRequestBuilder.getAttributesByTypes(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.setAttribute = function (id) { };
TxService.prototype.unsetAttribute = function (id) { };

// Relationship

TxService.prototype.addRelationship = function (id) { };
TxService.prototype.getRolePlayers = function (id) { };
TxService.prototype.getRolePlayersByRoles = function (id) {
    const txRequest = TxRequestBuilder.getAttributesByTypes(id);
    return this.communicator.send(txRequest)
        .then(async response => await _consumeConceptIterator(response, this))
        .catch(e => { throw e; });
};
TxService.prototype.setRolePlayer = function (id) { };
TxService.prototype.unsetRolePlayer = function (id) { };


// Attribute

TxService.prototype.getValue = function (id) { };
TxService.prototype.getOwners = function (id) { };


// ====== UTILS METHODS =====//


/**
 * This method creates and consumes an iterator (until server returns Done) and build Concept object from
 * every response.
 * @param {*} grpcConceptResponse gRPC response that will contain iteratorId
 * @param {*} txService txService implementation needed to be injected to new concepts that will be built
 */
async function _consumeConceptIterator(grpcConceptResponse, txService) {
    const iterator = new GrpcIterator.GrpcConceptIterator(
        result.getConceptresponse().getIteratorid(),
        txService.communicator
    );
    const concepts = [];
    let concept = await iterator.nextResult().catch(e => { throw e; });
    while (concept) {
        concepts.push(txService.conceptFactory.createConcept(concept, txService));
        concept = await iterator.nextResult().catch(e => { throw e; });
    }
    return concepts;
}


// OPEN TRANSACTION

TxService.prototype.openTx = async function (keyspace, txType, credentials) {
    const openRequest = new messages.Open();
    const txRequest = new messages.TxRequest();
    const messageKeyspace = new messages.Keyspace();
    messageKeyspace.setValue(keyspace);

    openRequest.setKeyspace(messageKeyspace);
    openRequest.setTxtype(messages.TxType.WRITE);
    openRequest.setUsername(credentials.username);
    openRequest.setPassword(credentials.password);
    txRequest.setOpen(openRequest);

    await this.communicator.send(txRequest)
        // Explicitly catch and re-throw exception otherwise it will be swallowed by promises
        .catch((e) => {
            throw e;
        });
};


// EXEC QUERY

TxService.prototype.execute = async function executeQuery(query) {
    this.result = [];
    const txRequest = new messages.TxRequest();
    const executeQuery = new messages.ExecQuery();
    const queryRequest = new messages.Query();
    queryRequest.setValue(query);
    executeQuery.setQuery(queryRequest);
    txRequest.setExecquery(executeQuery);
    return await this.communicator
        .send(txRequest)
        .then(resp => this._parseResponse(resp))
        .catch((e) => {
            throw e;
        });
};

TxService.prototype._parseResponse = async function parseResponse(resp) {
    if (resp.hasDone()) return [];
    if (resp.hasIteratorid()) {
        const iterator = new GrpcIterator.GrpcQueryIterator(
            resp.getIteratorid(),
            this.communicator
        );
        const executeQueryResult = [];
        let nextResult = await iterator.nextResult();
        while (nextResult) {
            executeQueryResult.push(this._parseResult(nextResult));
            nextResult = await iterator.nextResult();
        }
        return executeQueryResult;
    }
};

TxService.prototype._parseResult = function parseResult(queryResult) {
    if (queryResult.hasOtherresult()) {
        // compute or aggregate query
        return JSON.parse(queryResult.getOtherresult());
    } else {
        const answerMap = new Map();
        queryResult
            .getAnswer()
            .getAnswerMap()
            .forEach((grpcConcenpt, key) => {
                answerMap.set(
                    key,
                    this.conceptFactory.createConcept(grpcConcenpt, this));
            });
        return answerMap;
    }
};

module.exports = TxService;