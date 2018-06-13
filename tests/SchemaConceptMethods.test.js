const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const environment = require('./support/GraknTestEnvironment');

let session = new gc(DEFAULT_URI, environment.newKeyspace());

describe("Schema concept methods", () => {

    test("Get/set label", async () => {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute('define person sub entity;')
        const personSchemaConcept = await tx.getSchemaConcept('person');
        expect(await personSchemaConcept.getLabel()).toBe('person');
        await personSchemaConcept.setLabel('superperson');
        const superPersonSchemaConcept = await tx.getSchemaConcept('superperson');
        expect(await superPersonSchemaConcept.getLabel()).toBe('superperson');
        const nullSchemaConcept = await tx.getSchemaConcept('person');
        expect(nullSchemaConcept).toBeNull();
    }, environment.integrationTestsTimeout());

    test("isImplicit", async () => {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute('define person sub entity;')
        const personSchemaConcept = await tx.getSchemaConcept('person');
        expect(await personSchemaConcept.isImplicit()).toBe(false);
        await tx.execute('define person has name; name sub attribute, datatype string;');
        const implicitSchemaConcept = await tx.getSchemaConcept('@has-name');
        expect(await implicitSchemaConcept.isImplicit()).toBe(true);
    }, environment.integrationTestsTimeout());

    test("Get sups and subs", async () => {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute('define person sub entity;')
        const personSchemaConcept = await tx.getSchemaConcept('person');
        const sups = await personSchemaConcept.sups();
        expect(sups.length).toBe(2);
        const label1 = await sups[0].getLabel();
        const label2 = await sups[1].getLabel();
        const supLabels = [label1, label2];
        supLabels.sort();
        expect(supLabels[0]).toBe('entity');
        expect(supLabels[1]).toBe('person');
        const entitySchemaConcept = await tx.getSchemaConcept('entity');
        const entitySubs = await entitySchemaConcept.subs();
        expect(entitySubs.length).toBe(2);
        const subLabel1 = await entitySubs[0].getLabel();
        const subLabel2 = await entitySubs[1].getLabel();
        const subLabels = [subLabel1, subLabel2];
        subLabels.sort();
        expect(subLabels[0]).toBe('entity');
        expect(subLabels[1]).toBe('person');
    }, environment.integrationTestsTimeout());

    test("Get sup", async () => {
        const tx = await session.open(session.txType.WRITE);
        const entitySchemaConcept = await tx.getSchemaConcept('entity');
        const metaType = await entitySchemaConcept.sup();
        expect(metaType.baseType).toBe('META_TYPE');
        const sup = await metaType.sup();
        expect(sup).toBeNull();
    }, environment.integrationTestsTimeout());

    test("Set sup", async () => {
        const tx = await session.open(session.txType.WRITE);
        const humanSchemaConcept = await tx.putEntityType('human');
        const maleSchemaConcept = await tx.putEntityType('male');
        const supType = await maleSchemaConcept.sup();
        expect(await supType.getLabel()).toBe('entity');
        await maleSchemaConcept.sup(humanSchemaConcept);
        const sup = await maleSchemaConcept.sup();
        expect(await sup.getLabel()).toBe('human');
    }, environment.integrationTestsTimeout());
})

