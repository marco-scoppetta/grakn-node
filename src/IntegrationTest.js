const GraknClient = require('./GraknClient');


const client = new GraknClient();

const tx = client.open();
console.log('tx instantiated');