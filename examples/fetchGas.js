const OpenBlaze = require('../build/index');
const config = require('./config.json');
(async () => {
  // Private key into a Keypair (PrivateKey and Public key)
  let Vkey = OpenBlaze.PrivToKeypair(config.privkey);

  const client = new OpenBlaze.Client({
    node: config.node,
    Keypair: Vkey,
  });

  // Queries from your node selected above
  let res = await client.fetchGas('transfer', false);

  // Verfies with all nodes that this data is correct
  res = await client.fetchGas('transfer', true);

  console.log(res);
})();
